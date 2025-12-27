import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Aulix SAAS",
  description: "Documentación AULIX SAAS",
  
  // Base path para GitHub Pages (nombre del repositorio)
  base: '/aulix-docs/',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Producto', link: '/producto/vision' },
      { text: 'Técnico', link: '/tecnico/arquitectura' },
      { text: 'Guías', link: '/guias/instalacion' }
    ],

    sidebar: [
      {
        text: '📦 Producto',
        collapsed: false,
        items: [
          { text: 'Visión', link: '/producto/vision' },
          { text: 'Historias de Usuario', link: '/producto/historias' },
          { text: 'Requisitos', link: '/producto/requisitos' },
          { text: 'Roadmap', link: '/producto/roadmap' }
        ]
      },
      {
        text: '🔧 Técnico',
        collapsed: false,
        items: [
          { text: 'Arquitectura', link: '/tecnico/arquitectura' },
          { text: 'Base de Datos', link: '/tecnico/base-datos' },
          { text: 'Backend', link: '/tecnico/backend' },
          { text: 'API Reference', link: '/tecnico/api' }
        ]
      },
      {
        text: '📚 Guías',
        collapsed: false,
        items: [
          { text: 'Instalación', link: '/guias/instalacion' },
          { text: 'Git Workflow', link: '/guias/git-workflow' },
          { text: 'Estándares de Código', link: '/guias/estandares' }
        ]
      },
      {
        text: '📝 Ejemplos',
        collapsed: true,
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'API Examples', link: '/api-examples' }
        ]
      }
    ],

    outline: {
      level: [2, 3],
      label: 'En esta página'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/cegonmen1/aulix-docs' }
    ],

    footer: {
      message: 'Documentación Aulix SAAS',
      copyright: '© 2025 Aulix'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/cegonmen1/aulix-docs/edit/main/docs/:path',
      text: 'Editar esta página en GitHub'
    },

    lastUpdated: {
      text: 'Última actualización',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    }
  },

  lastUpdated: true
})
