---
title: API Reference
description: Especificaciones de endpoints de la API
---

# API Reference

## Información General

| Propiedad | Valor |
|-----------|-------|
| Base URL | `https://api.aulix.com/v1` |
| Formato | JSON |
| Autenticación | Bearer Token (JWT) |
| Rate Limit | 100 requests/minuto |

## Autenticación

Todas las rutas protegidas requieren el header:

```
Authorization: Bearer <access_token>
```

---

## Endpoints

### Auth

#### POST /auth/register

Registra un nuevo usuario.

**Request Body:**

```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123",
  "firstName": "Juan",
  "lastName": "Pérez"
}
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "usuario@ejemplo.com",
    "firstName": "Juan",
    "lastName": "Pérez",
    "createdAt": "2025-01-01T00:00:00Z"
  }
}
```

**Errores:**

| Código | Descripción |
|--------|-------------|
| 400 | Datos de entrada inválidos |
| 409 | Email ya registrado |

---

#### POST /auth/login

Inicia sesión y obtiene tokens.

**Request Body:**

```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 900,
    "tokenType": "Bearer"
  }
}
```

**Errores:**

| Código | Descripción |
|--------|-------------|
| 401 | Credenciales inválidas |
| 423 | Cuenta bloqueada |

---

#### POST /auth/refresh

Renueva el access token.

**Request Body:**

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 900
  }
}
```

---

#### POST /auth/logout

Cierra la sesión actual.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**

```json
{
  "success": true,
  "message": "Sesión cerrada exitosamente"
}
```

---

### Users

#### GET /users/me

Obtiene el perfil del usuario autenticado.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "usuario@ejemplo.com",
    "firstName": "Juan",
    "lastName": "Pérez",
    "avatarUrl": "https://...",
    "role": "user",
    "createdAt": "2025-01-01T00:00:00Z"
  }
}
```

---

#### PATCH /users/me

Actualiza el perfil del usuario.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "firstName": "Juan Carlos",
  "lastName": "Pérez García"
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "firstName": "Juan Carlos",
    "lastName": "Pérez García",
    "updatedAt": "2025-01-01T00:00:00Z"
  }
}
```

---

## Formato de Respuestas

### Respuesta Exitosa

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

### Respuesta de Error

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Los datos proporcionados son inválidos",
    "details": [
      {
        "field": "email",
        "message": "El email no es válido"
      }
    ]
  }
}
```

## Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado |
| 204 | No Content - Sin contenido |
| 400 | Bad Request - Error de validación |
| 401 | Unauthorized - No autenticado |
| 403 | Forbidden - Sin permisos |
| 404 | Not Found - Recurso no encontrado |
| 409 | Conflict - Conflicto (duplicado) |
| 422 | Unprocessable Entity - Error de negocio |
| 429 | Too Many Requests - Rate limit |
| 500 | Internal Server Error - Error del servidor |

## Paginación

Para endpoints que retornan listas:

```
GET /users?page=1&limit=20&sort=createdAt&order=desc
```

| Parámetro | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| page | number | 1 | Página actual |
| limit | number | 20 | Items por página (max 100) |
| sort | string | createdAt | Campo de ordenamiento |
| order | string | desc | Dirección (asc/desc) |

## Rate Limiting

Headers de respuesta:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
```

Cuando se excede el límite:

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Demasiadas solicitudes. Intente de nuevo en 60 segundos.",
    "retryAfter": 60
  }
}
```
