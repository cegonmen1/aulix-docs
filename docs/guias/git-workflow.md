---
title: Git Workflow
description: Guía de commits, PRs y manejo de ramas
---

# Git Workflow

## Flujo de Trabajo

Este proyecto utiliza **GitHub Flow** simplificado:

```
main (producción)
  │
  ├── feature/nueva-funcionalidad
  │     └── PR → main
  │
  ├── fix/corregir-bug
  │     └── PR → main
  │
  └── docs/actualizar-readme
        └── PR → main
```

---

## Ramas

### Rama Principal

| Rama | Propósito |
|------|-----------|
| `main` | Código en producción. Siempre estable. |

### Ramas de Trabajo

| Prefijo | Uso | Ejemplo |
|---------|-----|---------|
| `feature/` | Nueva funcionalidad | `feature/login-social` |
| `fix/` | Corrección de bugs | `fix/validacion-email` |
| `docs/` | Documentación | `docs/api-reference` |
| `refactor/` | Refactorización | `refactor/auth-service` |
| `test/` | Agregar tests | `test/user-service` |
| `chore/` | Tareas de mantenimiento | `chore/actualizar-deps` |

---

## Paso a Paso

### 1. Actualizar main

```bash
git checkout main
git pull origin main
```

### 2. Crear rama de trabajo

```bash
# Formato: <tipo>/<descripcion-corta>
git checkout -b feature/mi-nueva-funcionalidad
```

::: tip Nombres de rama
- Usa kebab-case (minúsculas con guiones)
- Sé descriptivo pero conciso
- Máximo 50 caracteres
:::

### 3. Realizar cambios

```bash
# Trabajar en los cambios...
git status
git add .
```

### 4. Hacer commits

```bash
git commit -m "feat: agregar autenticación con Google"
```

### 5. Subir la rama

```bash
git push origin feature/mi-nueva-funcionalidad
```

### 6. Crear Pull Request

1. Ve a GitHub
2. Crea un nuevo PR hacia `main`
3. Llena la plantilla del PR
4. Solicita revisión

### 7. Merge

Una vez aprobado:
- **Squash and merge** para mantener historial limpio
- Eliminar la rama después del merge

---

## Convención de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<alcance>): <descripción>

[cuerpo opcional]

[footer opcional]
```

### Tipos de Commit

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| `feat` | Nueva funcionalidad | `feat: agregar login con email` |
| `fix` | Corrección de bug | `fix: corregir validación de fecha` |
| `docs` | Documentación | `docs: actualizar README` |
| `style` | Formato (no afecta código) | `style: formatear con prettier` |
| `refactor` | Refactorización | `refactor: simplificar auth service` |
| `test` | Agregar/modificar tests | `test: agregar tests de usuario` |
| `chore` | Mantenimiento | `chore: actualizar dependencias` |
| `perf` | Mejora de rendimiento | `perf: optimizar query de búsqueda` |
| `ci` | CI/CD | `ci: agregar workflow de deploy` |

### Ejemplos

```bash
# Feature
git commit -m "feat(auth): implementar refresh token"

# Fix con issue
git commit -m "fix(users): corregir error de validación

Closes #123"

# Breaking change
git commit -m "feat(api)!: cambiar estructura de respuesta

BREAKING CHANGE: el campo 'data' ahora es obligatorio"
```

---

## Pull Requests

### Checklist antes de crear PR

- [ ] El código compila sin errores
- [ ] Los tests pasan localmente
- [ ] El código sigue los estándares del proyecto
- [ ] Se actualizó la documentación si es necesario
- [ ] El commit message sigue la convención

### Plantilla de PR

```markdown
## Descripción
Breve descripción de los cambios.

## Tipo de cambio
- [ ] Bug fix
- [ ] Nueva funcionalidad
- [ ] Breaking change
- [ ] Documentación

## ¿Cómo probar?
1. Paso 1
2. Paso 2
3. Resultado esperado

## Screenshots (si aplica)

## Checklist
- [ ] Mi código sigue el estilo del proyecto
- [ ] He realizado self-review
- [ ] He comentado código complejo
- [ ] He actualizado la documentación
- [ ] Mis cambios no generan warnings
- [ ] He agregado tests
- [ ] Tests existentes pasan
```

---

## Code Review

### Como Autor

- Responde a todos los comentarios
- Explica decisiones de diseño
- Haz los cambios solicitados o argumenta

### Como Reviewer

- Sé constructivo y respetuoso
- Sugiere, no ordenes
- Aprueba cuando esté listo

### Etiquetas de Review

| Prefijo | Significado |
|---------|-------------|
| `nit:` | Sugerencia menor, no bloquea |
| `suggestion:` | Propuesta de mejora |
| `question:` | Pregunta, necesito entender |
| `blocker:` | Debe corregirse antes de merge |

---

## Resolución de Conflictos

```bash
# 1. Actualizar main
git checkout main
git pull origin main

# 2. Volver a tu rama
git checkout feature/mi-rama

# 3. Hacer rebase
git rebase main

# 4. Resolver conflictos manualmente
# Editar archivos marcados

# 5. Continuar rebase
git add .
git rebase --continue

# 6. Forzar push (solo si ya habías subido)
git push origin feature/mi-rama --force-with-lease
```

---

## Comandos Útiles

```bash
# Ver estado
git status

# Ver historial bonito
git log --oneline --graph

# Ver diferencias
git diff

# Deshacer cambios locales
git checkout -- <archivo>

# Deshacer último commit (mantiene cambios)
git reset --soft HEAD~1

# Stash (guardar cambios temporalmente)
git stash
git stash pop

# Ver ramas
git branch -a

# Eliminar rama local
git branch -d feature/mi-rama

# Eliminar rama remota
git push origin --delete feature/mi-rama
```

---

## Siguiente

- [Estándares de código](/guias/estandares)
