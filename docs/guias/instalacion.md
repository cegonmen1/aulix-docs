---
title: Guía de Instalación
description: Cómo levantar el entorno de desarrollo local
---

# Guía de Instalación

## Requisitos Previos

Asegúrate de tener instalado:

| Software | Versión Mínima | Verificar |
|----------|----------------|-----------|
| Node.js | 18.x | `node --version` |
| npm | 9.x | `npm --version` |
| Git | 2.x | `git --version` |
| Docker | 20.x | `docker --version` |
| Docker Compose | 2.x | `docker compose version` |

## Instalación Rápida

```bash
# 1. Clonar el repositorio
git clone https://github.com/cegonmen1/aulix-docs.git
cd aulix-docs

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run docs:dev
```

La documentación estará disponible en `http://localhost:5173`

---

## Instalación del Proyecto Principal

### 1. Clonar el Repositorio

```bash
git clone https://github.com/[org]/aulix.git
cd aulix
```

### 2. Configurar Variables de Entorno

```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar con tus valores
nano .env  # o code .env
```

Variables requeridas:

```bash
# App
NODE_ENV=development
PORT=3000
APP_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/aulix_dev

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRES_IN=15m
```

### 3. Levantar Servicios con Docker

```bash
# Iniciar PostgreSQL y Redis
docker compose up -d postgres redis

# Verificar que están corriendo
docker compose ps
```

### 4. Instalar Dependencias

```bash
# Backend
cd backend
npm install

# Frontend (en otra terminal)
cd frontend
npm install
```

### 5. Ejecutar Migraciones

```bash
cd backend
npm run db:migrate
npm run db:seed  # Datos de prueba (opcional)
```

### 6. Iniciar la Aplicación

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

---

## URLs de Desarrollo

| Servicio | URL |
|----------|-----|
| Frontend | `http://localhost:5173` |
| Backend API | `http://localhost:3000` |
| API Docs (Swagger) | `http://localhost:3000/docs` |
| Documentación | `http://localhost:5174` |

---

## Docker Compose Completo

Para levantar todo con Docker:

```bash
# Construir y levantar todos los servicios
docker compose up -d --build

# Ver logs
docker compose logs -f

# Detener todo
docker compose down
```

### docker-compose.yml de referencia

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: aulix_dev
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@postgres:5432/aulix_dev
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend

volumes:
  postgres_data:
  redis_data:
```

---

## Solución de Problemas

### Error: Puerto en uso

```bash
# Encontrar proceso usando el puerto
lsof -i :3000

# Matar el proceso
kill -9 <PID>
```

### Error: Base de datos no conecta

```bash
# Verificar que PostgreSQL está corriendo
docker compose ps

# Ver logs de PostgreSQL
docker compose logs postgres

# Reiniciar el contenedor
docker compose restart postgres
```

### Error: Dependencias desactualizadas

```bash
# Limpiar e instalar de nuevo
rm -rf node_modules package-lock.json
npm install
```

### Error: Permisos de Docker

```bash
# En Linux, agregar usuario al grupo docker
sudo usermod -aG docker $USER
# Reiniciar sesión
```

---

## IDEs Recomendados

### VS Code

Extensiones recomendadas:

- ESLint
- Prettier
- GitLens
- Docker
- Thunder Client (API testing)
- Prisma (si usas Prisma)

### Configuración recomendada

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

---

## Siguientes Pasos

- [Flujo de trabajo con Git](/guias/git-workflow)
- [Estándares de código](/guias/estandares)
- [Arquitectura del sistema](/tecnico/arquitectura)
