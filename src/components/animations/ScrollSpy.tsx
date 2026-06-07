'use client'
import { useEffect, useRef, useCallback } from 'react'

/**
 * ScrollSpy — Actualiza la URL hash según la sección visible en el viewport.
 * Usa IntersectionObserver para detectar cuál sección está en pantalla.
 * Actualiza via History API (replaceState) sin recargar la página.
 * Soporta scroll suave al navegar con hash links.
 */

interface ScrollSpyProps {
  /** Selectores CSS de las secciones a vigilar. Default: 'section[id]' */
  sectionSelector?: string
  /** Offset (px) desde el top para considerar una sección "visible". Default: 100 */
  offset?: number
  /** Umbral de intersección (0-1). Default: 0.15 */
  threshold?: number
}

export default function ScrollSpy({
  sectionSelector = 'section[id]',
  offset = 100,
  threshold = 0.15,
}: ScrollSpyProps) {
  const isProgrammatic = useRef(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const handleHashOnLoad = useCallback(() => {
    // Si la URL tiene un hash al cargar, scrollear a esa sección
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      const el = document.getElementById(hash)
      if (el) {
        isProgrammatic.current = true
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          setTimeout(() => { isProgrammatic.current = false }, 1000)
        }, 300)
      }
    }
  }, [])

  useEffect(() => {
    handleHashOnLoad()

    const sections = document.querySelectorAll(sectionSelector)
    if (sections.length === 0) return

    // Crear observer con rootMargin para offset del navbar
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Solo actualizar si no estamos en un scroll programático
        if (isProgrammatic.current) return

        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id')
            if (id) {
              const newHash = `#${id}`
              if (window.location.hash !== newHash) {
                window.history.replaceState(null, '', newHash || window.location.pathname)
              }
            }
          }
        }
      },
      {
        rootMargin: `-${offset}px 0px -40% 0px`,
        threshold: threshold,
      }
    )

    sections.forEach((section) => {
      observerRef.current?.observe(section)
    })

    // Interceptar clicks en links con hash
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]')
      if (target) {
        const href = (target as HTMLAnchorElement).getAttribute('href')
        if (href && href.startsWith('#')) {
          e.preventDefault()
          const id = href.replace('#', '')
          const el = document.getElementById(id)
          if (el) {
            isProgrammatic.current = true
            window.history.replaceState(null, '', href)
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            setTimeout(() => { isProgrammatic.current = false }, 1000)
          }
        }
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      observerRef.current?.disconnect()
      document.removeEventListener('click', handleClick)
    }
  }, [sectionSelector, offset, threshold, handleHashOnLoad])

  // Este componente no renderiza nada visible
  return null
}
