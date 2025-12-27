---
title: Arquitectura
description: Diagramas de arquitectura de alto nivel
---

# Arquitectura del Sistema

## Diagrama de Contexto (C4 - Nivel 1)

```mermaid
C4Context
    title Diagrama de Contexto - Aulix SAAS

    Person(user, "Usuario", "Usuario de la plataforma")
    Person(admin, "Administrador", "Administrador del sistema")
    
    System(aulix, "Aulix SAAS", "Sistema principal")
    
    System_Ext(email, "Servicio de Email", "SendGrid/AWS SES")
    System_Ext(payment, "Pasarela de Pago", "Stripe")
    System_Ext(storage, "Almacenamiento", "AWS S3")
    
    Rel(user, aulix, "Usa")
    Rel(admin, aulix, "Administra")
    Rel(aulix, email, "Envía emails")
    Rel(aulix, payment, "Procesa pagos")
    Rel(aulix, storage, "Almacena archivos")
```

## Diagrama de Contenedores (C4 - Nivel 2)

```mermaid
C4Container
    title Diagrama de Contenedores - Aulix SAAS

    Person(user, "Usuario", "Usuario final")
    
    Container_Boundary(aulix, "Aulix SAAS") {
        Container(spa, "Frontend", "React/Vue", "Aplicación SPA")
        Container(api, "API Backend", "Node.js/Python", "API REST/GraphQL")
        Container(worker, "Workers", "Node.js", "Jobs en background")
        ContainerDb(db, "Base de Datos", "PostgreSQL", "Datos del sistema")
        ContainerDb(cache, "Cache", "Redis", "Sesiones y cache")
    }
    
    Rel(user, spa, "Usa", "HTTPS")
    Rel(spa, api, "Consume", "HTTPS/JSON")
    Rel(api, db, "Lee/Escribe")
    Rel(api, cache, "Lee/Escribe")
    Rel(worker, db, "Lee/Escribe")
```

## Arquitectura de Alto Nivel

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENTE                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │   Web App   │  │  Mobile App │  │   CLI/API   │              │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘              │
└─────────┼────────────────┼────────────────┼─────────────────────┘
          │                │                │
          ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      LOAD BALANCER                               │
│                    (Nginx / AWS ALB)                             │
└─────────────────────────────┬───────────────────────────────────┘
                              │
┌─────────────────────────────┼───────────────────────────────────┐
│                      API GATEWAY                                 │
│  ┌────────────┐  ┌─────────────────┐  ┌────────────────┐        │
│  │    Auth    │  │   Rate Limit    │  │    Logging     │        │
│  └────────────┘  └─────────────────┘  └────────────────┘        │
└─────────────────────────────┬───────────────────────────────────┘
                              │
┌─────────────────────────────┼───────────────────────────────────┐
│                       SERVICIOS                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│  │   Auth   │  │  Users   │  │  [Core]  │  │ Payments │         │
│  │ Service  │  │ Service  │  │ Service  │  │ Service  │         │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘         │
└───────┼─────────────┼─────────────┼─────────────┼───────────────┘
        │             │             │             │
┌───────┼─────────────┼─────────────┼─────────────┼───────────────┐
│       ▼             ▼             ▼             ▼               │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    BASE DE DATOS                        │    │
│  │                     (PostgreSQL)                        │    │
│  └─────────────────────────────────────────────────────────┘    │
│  ┌──────────────────┐  ┌──────────────────┐                     │
│  │      Redis       │  │   File Storage   │                     │
│  │   (Cache/Queue)  │  │    (AWS S3)      │                     │
│  └──────────────────┘  └──────────────────┘                     │
└─────────────────────────────────────────────────────────────────┘
```

## Stack Tecnológico

### Frontend

| Tecnología | Uso |
|------------|-----|
| React/Vue/Angular | Framework principal |
| TypeScript | Tipado estático |
| TailwindCSS | Estilos |
| Vite | Build tool |

### Backend

| Tecnología | Uso |
|------------|-----|
| Node.js / Python | Runtime |
| Express / FastAPI | Framework |
| PostgreSQL | Base de datos |
| Redis | Cache y colas |

### Infraestructura

| Tecnología | Uso |
|------------|-----|
| Docker | Containerización |
| Kubernetes / ECS | Orquestación |
| AWS / GCP | Cloud provider |
| GitHub Actions | CI/CD |

## Decisiones de Arquitectura (ADRs)

### ADR-001: Arquitectura de Microservicios vs Monolito

**Contexto**: Necesitamos decidir la arquitectura inicial.

**Decisión**: Comenzar con un **monolito modular** para el MVP.

**Razones**:
- Menor complejidad inicial
- Más rápido de desarrollar
- Fácil de refactorizar a microservicios después

**Consecuencias**:
- Código bien organizado en módulos
- Preparar interfaces para futura separación
