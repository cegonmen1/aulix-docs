# 📚 Aulix SAAS - Documentación

Documentación oficial del proyecto Aulix SAAS, construida con [VitePress](https://vitepress.dev/).

## Tabla de Contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Comandos Disponibles](#comandos-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Guía de Contribución](#guía-de-contribución)
- [Formato de Documentación](#formato-de-documentación)
- [Despliegue](#despliegue)

---

## Requisitos

- **Node.js** versión 18 o superior
- **npm** o **yarn** o **pnpm**

## Instalación

1. Clona el repositorio:

```bash
git clone <url-del-repositorio>
cd Docs
```

2. Instala las dependencias:

```bash
npm install
```

## Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run docs:dev` | Inicia el servidor de desarrollo en `http://localhost:5173` |
| `npm run docs:build` | Genera la versión de producción en `docs/.vitepress/dist` |
| `npm run docs:preview` | Previsualiza la build de producción localmente |

---

## Estructura del Proyecto

::: warning OBLIGATORIO
Todos los desarrolladores deben seguir esta estructura de carpetas.
:::

```
docs/
├── .vitepress/             # Configuración de VitePress
│   └── config.mts          # Archivo de configuración principal
├── public/                 # Imágenes, logos, capturas de pantalla
├── producto/               # EL QUÉ (Para PMs, Diseñadores y Devs)
│   ├── vision.md           # Visión general del SaaS y alcance
│   ├── historias.md        # Historias de Usuario (User Stories)
│   ├── requisitos.md       # Requisitos funcionales y no funcionales
│   └── roadmap.md          # Fases de desarrollo
├── tecnico/                # EL CÓMO (Para Devs y Arquitectos)
│   ├── arquitectura.md     # Diagramas de alto nivel (C4, componentes)
│   ├── base-datos.md       # Diagramas ERD (Mermaid) y esquemas
│   ├── backend.md          # Diagramas de Clase, Flujos de Servicios
│   └── api.md              # Especificaciones de endpoints (OpenAPI o tablas)
├── guias/                  # EL PROCESO (Onboarding y Normas)
│   ├── instalacion.md      # Cómo levantar el entorno local
│   ├── git-workflow.md     # Cómo hacer commits, PRs y ramas
│   └── estandares.md       # Reglas de código (linting, naming conventions)
└── index.md                # Home page de la documentación
```

### Descripción de Secciones

| Sección | Audiencia | Contenido |
|---------|-----------|-----------|
| `producto/` | PMs, Diseñadores, Devs | Visión, historias de usuario, requisitos, roadmap |
| `tecnico/` | Desarrolladores, Arquitectos | Arquitectura, base de datos, backend, API |
| `guias/` | Todos los desarrolladores | Instalación, git workflow, estándares de código |

---

## Guía de Contribución

### Flujo de Trabajo con Git

Este proyecto sigue el flujo de trabajo **Feature Branch Workflow**. Sigue estos pasos para contribuir:

#### 1. Actualiza tu rama `main` local

```bash
git checkout main
git pull origin main
```

#### 2. Crea una nueva rama de feature

Usa el siguiente formato para nombrar tus ramas:

```bash
git checkout -b feature/<nombre-descriptivo>
```

**Ejemplos de nombres de rama:**
- `feature/agregar-documentacion-api`
- `feature/actualizar-guia-instalacion`
- `fix/corregir-enlaces-rotos`
- `docs/mejorar-ejemplos-markdown`

#### 3. Realiza tus cambios

Edita o crea los archivos `.md` necesarios en el directorio `docs/`.

#### 4. Verifica tus cambios localmente

```bash
npm run docs:dev
```

Abre `http://localhost:5173` y revisa que todo se vea correctamente.

#### 5. Haz commit de tus cambios

Usa mensajes de commit descriptivos siguiendo esta convención:

```bash
git add .
git commit -m "docs: agregar documentación de autenticación"
```

**Prefijos recomendados para commits:**
| Prefijo | Uso |
|---------|-----|
| `docs:` | Cambios en documentación |
| `fix:` | Corrección de errores |
| `feat:` | Nueva funcionalidad o sección |
| `style:` | Cambios de formato/estilo |
| `refactor:` | Reorganización de contenido |

#### 6. Sube tu rama y crea un Pull Request

```bash
git push origin feature/<nombre-descriptivo>
```

Luego, crea un **Pull Request** hacia `main` en GitHub/GitLab.

#### 7. Revisión y Merge

- Espera la revisión del equipo
- Realiza los cambios solicitados si es necesario
- Una vez aprobado, se hará merge a `main`

---

## Formato de Documentación

### Estructura Básica de un Archivo Markdown

```markdown
---
title: Título de la Página
description: Descripción para SEO
---

# Título Principal

Contenido de introducción...

## Sección 1

Contenido de la sección...

### Subsección 1.1

Más detalles...
```

### Cómo Agregar Secciones y Subsecciones

VitePress genera automáticamente el índice lateral (Table of Contents) basándose en los encabezados de tu documento.

#### Jerarquía de Encabezados

```markdown
# Título Principal (H1)
Solo uno por documento. Es el título de la página.

## Sección (H2)
Divisiones principales del contenido.
Aparecen en el índice lateral.

### Subsección (H3)
Subdivide las secciones H2.
También aparece en el índice lateral.

#### Sub-subsección (H4)
Para detalles más específicos.
Puede aparecer según configuración.

##### H5 y ###### H6
Raramente usados, para casos muy específicos.
```

#### Ejemplo Práctico de Estructura

```markdown
# Guía de Autenticación

Introducción sobre el sistema de autenticación...

## Registro de Usuarios

Explica cómo registrar usuarios nuevos.

### Validación de Email

Detalles sobre la validación del email.

### Requisitos de Contraseña

Requisitos mínimos de seguridad.

## Inicio de Sesión

Proceso de login.

### Login con Email

Método tradicional.

### Login con OAuth

Proveedores externos (Google, GitHub).

## Recuperación de Contraseña

Proceso de reset de contraseña.
```

#### Configurar Profundidad del Índice

En el frontmatter de cada archivo puedes configurar qué tan profundo aparece el índice:

```yaml
---
title: Mi Página
outline: deep        # Muestra hasta H4
# outline: [2, 3]    # Solo muestra H2 y H3
# outline: false     # Oculta el índice
---
```

O globalmente en `docs/.vitepress/config.mts`:

```typescript
export default defineConfig({
  themeConfig: {
    outline: {
      level: [2, 3],    // Muestra H2 y H3
      label: 'En esta página'
    }
  }
})
```

### Agregar Nueva Sección al Sidebar

Para agregar una nueva sección al menú lateral, edita `docs/.vitepress/config.mts`:

```typescript
sidebar: [
  {
    text: 'Producto',
    items: [
      { text: 'Visión', link: '/producto/vision' },
      { text: 'Historias de Usuario', link: '/producto/historias' },
      // Agregar nueva página aquí:
      { text: 'Nueva Página', link: '/producto/nueva-pagina' }
    ]
  },
  // Agregar nueva sección aquí:
  {
    text: 'Nueva Sección',
    items: [
      { text: 'Página 1', link: '/nueva-seccion/pagina-1' },
      { text: 'Página 2', link: '/nueva-seccion/pagina-2' }
    ]
  }
]
```

::: warning IMPORTANTE
Después de agregar una página al sidebar, debes crear el archivo `.md` correspondiente en la carpeta `docs/`.
:::


### Frontmatter

VitePress usa YAML frontmatter para metadatos:

```yaml
---
title: Mi Página
description: Descripción de la página
outline: deep          # Profundidad del índice lateral
prev: false            # Desactiva enlace "anterior"
next:                  # Personaliza enlace "siguiente"
  text: 'Siguiente Página'
  link: '/otra-pagina'
---
```

### Sintaxis de Markdown Soportada

#### Bloques de Código con Resaltado

````markdown
```javascript
const ejemplo = 'Hola Mundo';
console.log(ejemplo);
```
````

Con líneas resaltadas:

````markdown
```javascript{2,4-5}
function saludar(nombre) {
  const mensaje = `Hola, ${nombre}!`;  // Esta línea está resaltada
  console.log(mensaje);
  return mensaje;  // Líneas 4-5 resaltadas
}
```
````

#### Contenedores Personalizados

```markdown
::: info Título Personalizado
Este es un bloque de información.
:::

::: tip Consejo
Este es un consejo útil.
:::

::: warning Advertencia
Esto es una advertencia.
:::

::: danger Peligro
Esto es un mensaje de peligro.
:::

::: details Haz clic para expandir
Contenido oculto que se puede expandir.
:::
```

#### Tablas

```markdown
| Columna 1 | Columna 2 | Columna 3 |
|-----------|-----------|-----------|
| Dato 1    | Dato 2    | Dato 3    |
| Dato 4    | Dato 5    | Dato 6    |
```

#### Enlaces

```markdown
<!-- Enlaces internos (rutas relativas) -->
[Ir a API Examples](/api-examples)
[Ver sección específica](/api-examples#seccion)

<!-- Enlaces externos -->
[VitePress](https://vitepress.dev/)
```

#### Imágenes

```markdown
<!-- Imágenes locales (guardar en docs/public/) -->
![Descripción](/imagen.png)

<!-- Imágenes externas -->
![Logo](https://ejemplo.com/logo.png)
```

#### Badges/Etiquetas

```markdown
Badge <Badge type="info" text="default" />
Badge <Badge type="tip" text="^1.9.0" />
Badge <Badge type="warning" text="beta" />
Badge <Badge type="danger" text="deprecated" />
```

### Mejores Prácticas

1. **Usa encabezados jerárquicos**: Comienza con `#` y usa `##`, `###` de forma ordenada
2. **Incluye ejemplos de código**: Siempre que expliques algo técnico, añade ejemplos
3. **Sé conciso**: Párrafos cortos y directos
4. **Usa listas**: Para enumerar pasos o características
5. **Añade enlaces**: Conecta la documentación entre sí
6. **Revisa la ortografía**: Usa herramientas de revisión antes de hacer commit

---

## Despliegue

### Build de Producción

```bash
npm run docs:build
```

Los archivos estáticos se generan en `docs/.vitepress/dist/`.

### Opciones de Despliegue

#### GitHub Pages

1. Configura `docs/.vitepress/config.js`:

```javascript
export default {
  base: '/<nombre-repositorio>/'  // Si no es dominio raíz
}
```

2. Configura GitHub Actions (`.github/workflows/deploy.yml`):

```yaml
name: Deploy VitePress

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run docs:build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: docs/.vitepress/dist
```

#### Vercel

1. Conecta tu repositorio en [vercel.com](https://vercel.com)
2. Configura:
   - **Build Command**: `npm run docs:build`
   - **Output Directory**: `docs/.vitepress/dist`
   - **Install Command**: `npm install`

#### Netlify

1. Conecta tu repositorio en [netlify.com](https://netlify.com)
2. Configura:
   - **Build Command**: `npm run docs:build`
   - **Publish Directory**: `docs/.vitepress/dist`

---

## Recursos Adicionales

- [Documentación oficial de VitePress](https://vitepress.dev/)
- [Guía de Markdown de VitePress](https://vitepress.dev/guide/markdown)
- [Configuración de VitePress](https://vitepress.dev/reference/site-config)
- [Temas y Personalización](https://vitepress.dev/guide/custom-theme)

---

## Soporte

Si tienes dudas o encuentras problemas, abre un issue en el repositorio.

---

**Aulix SAAS** © 2025
