// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import mermaid from 'mermaid'

import './custom.css'

// Configuración de Mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true
  }
})

// Función para crear controles del diagrama
function createControls(container: HTMLElement, index: number) {
  const controls = document.createElement('div')
  controls.className = 'mermaid-controls'
  controls.innerHTML = `
    <button class="mermaid-btn" data-action="zoom-in" title="Zoom In">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        <line x1="11" y1="8" x2="11" y2="14"></line>
        <line x1="8" y1="11" x2="14" y2="11"></line>
      </svg>
    </button>
    <button class="mermaid-btn" data-action="zoom-out" title="Zoom Out">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        <line x1="8" y1="11" x2="14" y2="11"></line>
      </svg>
    </button>
    <button class="mermaid-btn" data-action="reset" title="Reset">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
        <path d="M3 3v5h5"></path>
      </svg>
    </button>
    <button class="mermaid-btn" data-action="fullscreen" title="Fullscreen">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
      </svg>
    </button>
  `
  
  let scale = 1
  let translateX = 0
  let translateY = 0
  const svgContainer = container.querySelector('.mermaid-svg-container') as HTMLElement
  
  const updateTransform = () => {
    if (svgContainer) {
      svgContainer.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`
    }
  }
  
  controls.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    const button = target.closest('.mermaid-btn') as HTMLElement
    if (!button) return
    
    const action = button.dataset.action
    
    switch (action) {
      case 'zoom-in':
        scale = Math.min(scale + 0.25, 3)
        updateTransform()
        break
      case 'zoom-out':
        scale = Math.max(scale - 0.25, 0.5)
        updateTransform()
        break
      case 'reset':
        scale = 1
        translateX = 0
        translateY = 0
        updateTransform()
        break
      case 'fullscreen':
        if (document.fullscreenElement) {
          document.exitFullscreen()
        } else {
          container.requestFullscreen()
        }
        break
    }
  })
  
  // Soporte para arrastrar
  let isDragging = false
  let startX = 0
  let startY = 0
  
  if (svgContainer) {
    svgContainer.addEventListener('mousedown', (e) => {
      isDragging = true
      startX = e.clientX - translateX
      startY = e.clientY - translateY
      svgContainer.style.cursor = 'grabbing'
    })
    
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return
      translateX = e.clientX - startX
      translateY = e.clientY - startY
      updateTransform()
    })
    
    document.addEventListener('mouseup', () => {
      isDragging = false
      if (svgContainer) {
        svgContainer.style.cursor = 'grab'
      }
    })
    
    // Zoom con rueda del mouse
    container.addEventListener('wheel', (e) => {
      e.preventDefault()
      const delta = e.deltaY > 0 ? -0.1 : 0.1
      scale = Math.min(Math.max(scale + delta, 0.5), 3)
      updateTransform()
    })
  }
  
  return controls
}

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {})
  },
  setup() {
    const route = useRoute()
    
    const initMermaid = async () => {
      await nextTick()
      const elements = document.querySelectorAll('.language-mermaid')
      elements.forEach((element, index) => {
        const code = element.querySelector('code')
        if (code) {
          // Crear contenedor wrapper
          const wrapper = document.createElement('div')
          wrapper.className = 'mermaid-wrapper'
          wrapper.id = `mermaid-wrapper-${index}`
          
          // Crear contenedor para el SVG
          const svgContainer = document.createElement('div')
          svgContainer.className = 'mermaid-svg-container'
          
          // Crear el div de mermaid
          const mermaidDiv = document.createElement('div')
          mermaidDiv.className = 'mermaid'
          mermaidDiv.id = `mermaid-${index}`
          mermaidDiv.textContent = code.textContent || ''
          
          svgContainer.appendChild(mermaidDiv)
          wrapper.appendChild(svgContainer)
          
          // Agregar controles
          const controls = createControls(wrapper, index)
          wrapper.appendChild(controls)
          
          element.parentNode?.replaceChild(wrapper, element)
        }
      })
      await mermaid.run()
    }

    onMounted(() => {
      initMermaid()
    })

    watch(() => route.path, () => {
      nextTick(() => {
        initMermaid()
      })
    })
  }
} satisfies Theme
