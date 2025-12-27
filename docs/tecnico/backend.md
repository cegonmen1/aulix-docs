---
title: Backend
description: Diagramas de clase y flujos de servicios
---

# Documentación del Backend

## Diagrama de Clases

```mermaid
classDiagram
    class User {
        +UUID id
        +String email
        +String passwordHash
        +String firstName
        +String lastName
        +Boolean isActive
        +DateTime createdAt
        +validatePassword(password) Boolean
        +generateToken() String
    }
    
    class AuthService {
        +register(data) User
        +login(email, password) Token
        +logout(token) void
        +refreshToken(token) Token
        +resetPassword(email) void
    }
    
    class UserService {
        +findById(id) User
        +findByEmail(email) User
        +update(id, data) User
        +delete(id) void
        +list(filters) User[]
    }
    
    class UserRepository {
        +create(user) User
        +findById(id) User
        +findByEmail(email) User
        +update(id, data) User
        +delete(id) void
    }
    
    AuthService --> UserService
    UserService --> UserRepository
    UserRepository --> User
```

## Flujo de Autenticación

```mermaid
sequenceDiagram
    participant C as Cliente
    participant A as API Gateway
    participant AS as Auth Service
    participant DB as Database
    participant R as Redis
    
    C->>A: POST /auth/login {email, password}
    A->>AS: validateCredentials()
    AS->>DB: findUserByEmail()
    DB-->>AS: User
    AS->>AS: verifyPassword()
    AS->>R: storeSession()
    AS-->>A: {accessToken, refreshToken}
    A-->>C: 200 OK + Tokens
    
    Note over C,R: Requests autenticados
    
    C->>A: GET /api/resource + Bearer Token
    A->>R: validateToken()
    R-->>A: Session válida
    A->>AS: processRequest()
    AS-->>A: Response
    A-->>C: 200 OK + Data
```

## Estructura de Carpetas

```
src/
├── config/                 # Configuración
│   ├── database.js
│   ├── redis.js
│   └── env.js
├── modules/                # Módulos de negocio
│   ├── auth/
│   │   ├── auth.controller.js
│   │   ├── auth.service.js
│   │   ├── auth.routes.js
│   │   └── auth.middleware.js
│   ├── users/
│   │   ├── user.controller.js
│   │   ├── user.service.js
│   │   ├── user.repository.js
│   │   ├── user.routes.js
│   │   └── user.model.js
│   └── [otros módulos]/
├── shared/                 # Código compartido
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   ├── rateLimiter.js
│   │   └── validator.js
│   ├── utils/
│   │   ├── logger.js
│   │   ├── encryption.js
│   │   └── helpers.js
│   └── exceptions/
│       ├── AppError.js
│       └── HttpError.js
├── database/
│   ├── migrations/
│   └── seeds/
├── tests/
│   ├── unit/
│   └── integration/
├── app.js                  # Setup de Express/Fastify
└── server.js               # Entry point
```

## Patrones de Diseño Utilizados

### Repository Pattern

```javascript
// user.repository.js
class UserRepository {
  async create(userData) {
    return db.users.create(userData);
  }

  async findById(id) {
    return db.users.findUnique({ where: { id } });
  }

  async findByEmail(email) {
    return db.users.findUnique({ where: { email } });
  }
}
```

### Service Layer

```javascript
// user.service.js
class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(data) {
    // Validación de negocio
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictError('Email already exists');
    }
    
    // Hash password
    data.passwordHash = await hashPassword(data.password);
    delete data.password;
    
    return this.userRepository.create(data);
  }
}
```

### Controller Pattern

```javascript
// user.controller.js
class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async create(req, res, next) {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json({ data: user });
    } catch (error) {
      next(error);
    }
  }
}
```

## Manejo de Errores

```javascript
// Jerarquía de errores
class AppError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
  }
}

class ValidationError extends AppError {
  constructor(message, errors = []) {
    super(message, 400, 'VALIDATION_ERROR');
    this.errors = errors;
  }
}
```

## Variables de Entorno

```bash
# .env.example
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/aulix

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# External Services
SENDGRID_API_KEY=
STRIPE_SECRET_KEY=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
```

## Testing

```javascript
// tests/unit/user.service.test.js
describe('UserService', () => {
  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123'
      };
      
      const user = await userService.createUser(userData);
      
      expect(user).toHaveProperty('id');
      expect(user.email).toBe(userData.email);
    });

    it('should throw error if email exists', async () => {
      // ...
    });
  });
});
```
