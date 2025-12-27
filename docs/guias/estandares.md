---
title: Estándares de Código
description: Reglas de código, linting y naming conventions
---

# Estándares de Código

## Principios Generales

1. **Legibilidad** > Cleverness
2. **Consistencia** en todo el proyecto
3. **DRY** (Don't Repeat Yourself)
4. **KISS** (Keep It Simple, Stupid)
5. **YAGNI** (You Aren't Gonna Need It)

---

## Naming Conventions

### JavaScript/TypeScript

| Elemento | Convención | Ejemplo |
|----------|------------|---------|
| Variables | camelCase | `userName`, `isActive` |
| Constantes | UPPER_SNAKE_CASE | `MAX_RETRIES`, `API_URL` |
| Funciones | camelCase | `getUserById()`, `calculateTotal()` |
| Clases | PascalCase | `UserService`, `AuthController` |
| Interfaces | PascalCase con I (opcional) | `User`, `IUserService` |
| Types | PascalCase | `UserResponse`, `CreateUserDto` |
| Enums | PascalCase | `UserRole`, `OrderStatus` |
| Archivos | kebab-case | `user-service.ts`, `auth.middleware.ts` |

### Bases de Datos

| Elemento | Convención | Ejemplo |
|----------|------------|---------|
| Tablas | snake_case, plural | `users`, `order_items` |
| Columnas | snake_case | `first_name`, `created_at` |
| Primary Keys | `id` | `id` |
| Foreign Keys | `<tabla>_id` | `user_id`, `order_id` |
| Índices | `idx_<tabla>_<columna>` | `idx_users_email` |

### CSS/Estilos

| Método | Ejemplo |
|--------|---------|
| BEM | `.card__title--highlighted` |
| Tailwind | Clases utilitarias |

---

## Estructura de Archivos

### Componentes (Frontend)

```
components/
├── Button/
│   ├── Button.tsx
│   ├── Button.test.tsx
│   ├── Button.styles.ts  # o .css
│   └── index.ts
```

### Módulos (Backend)

```
modules/
├── users/
│   ├── user.controller.ts
│   ├── user.service.ts
│   ├── user.repository.ts
│   ├── user.model.ts
│   ├── user.routes.ts
│   ├── user.dto.ts
│   ├── user.test.ts
│   └── index.ts
```

---

## Reglas de Código

### TypeScript

```typescript
// ✅ Bien - Tipos explícitos en funciones públicas
function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ❌ Mal - Sin tipos
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ✅ Bien - Interfaces para objetos
interface User {
  id: string;
  email: string;
  name: string;
}

// ✅ Bien - Usar const para variables que no cambian
const MAX_ITEMS = 100;

// ✅ Bien - Desestructuración
const { name, email } = user;

// ❌ Mal
const name = user.name;
const email = user.email;
```

### Funciones

```typescript
// ✅ Bien - Funciones pequeñas y con un solo propósito
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ✅ Bien - Early returns
function processUser(user: User | null): string {
  if (!user) {
    return 'Usuario no encontrado';
  }
  
  if (!user.isActive) {
    return 'Usuario inactivo';
  }
  
  return `Bienvenido, ${user.name}`;
}

// ❌ Mal - Anidación excesiva
function processUser(user: User | null): string {
  if (user) {
    if (user.isActive) {
      return `Bienvenido, ${user.name}`;
    } else {
      return 'Usuario inactivo';
    }
  } else {
    return 'Usuario no encontrado';
  }
}
```

### Async/Await

```typescript
// ✅ Bien - Async/await con manejo de errores
async function fetchUser(id: string): Promise<User> {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    logger.error('Error fetching user', { id, error });
    throw new NotFoundError('User not found');
  }
}

// ✅ Bien - Operaciones paralelas
const [users, products] = await Promise.all([
  fetchUsers(),
  fetchProducts()
]);
```

---

## ESLint Configuración

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-explicit-any': 'error',
    'prefer-const': 'error',
    'no-var': 'error'
  }
};
```

## Prettier Configuración

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "bracketSpacing": true
}
```

---

## Comentarios

### Cuándo comentar

```typescript
// ✅ Bien - Explicar el "por qué", no el "qué"
// Usamos retry porque el servicio externo tiene latencia intermitente
const result = await retry(fetchExternalData, { maxRetries: 3 });

// ✅ Bien - Documentar funciones públicas
/**
 * Calcula el precio total con descuento aplicado.
 * @param items - Lista de items del carrito
 * @param discountCode - Código de descuento opcional
 * @returns Precio total después del descuento
 */
function calculateTotal(items: CartItem[], discountCode?: string): number {
  // ...
}

// ❌ Mal - Comentario obvio
// Incrementar contador
counter++;
```

### TODO y FIXME

```typescript
// TODO: Implementar paginación cuando tengamos más de 1000 usuarios
// FIXME: Este cálculo falla con números negativos
// HACK: Workaround temporal hasta que se actualice la API
```

---

## Git Hooks (Husky)

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

---

## Checklist de Code Review

- [ ] El código es legible y bien estructurado
- [ ] Los nombres son descriptivos y siguen las convenciones
- [ ] No hay código duplicado
- [ ] Las funciones hacen una sola cosa
- [ ] El manejo de errores es adecuado
- [ ] No hay console.log en producción
- [ ] Los tipos de TypeScript son correctos
- [ ] Hay tests para la nueva funcionalidad

---

## Recursos

- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)
- [Conventional Commits](https://www.conventionalcommits.org/)
