'use client'
import { useEffect, useRef, useCallback } from 'react'
import { usePathname } from 'next/navigation'

/**
 * GlobalScrollSpy — Actualiza la URL hash según la sección visible en el viewport.
 * Funciona GLOBALMENTE en todas las subpáginas (/inicio, /servicios, /salud, etc.)
 * Usa IntersectionObserver + MutationObserver para contenido dinámico.
 * Inyecta pathname + hash en la URL para evitar mezclar secciones entre páginas.
 */

interface GlobalScrollSpyProps {
  /** Selectores CSS de las secciones a vigilar. Default: 'section[id], article[id]' */
  sectionSelector?: string
  /** Offset (px) desde el top del viewport. Default: 100 */
  offsetTop?: number
  /** Porcentaje inferior del viewport descartado. Default: 55 */
  offsetBottom?: number
}

export default function GlobalScrollSpy({
  sectionSelector = 'section[id], article[id]',
  offsetTop = 100,
  offsetBottom = 55,
}: GlobalScrollSpyProps) {
  const pathname = usePathname()
  const isProgrammatic = useRef(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const mutationRef = useRef<MutationObserver | null>(null)

  const handleHashOnLoad = useCallback(() => {
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

  // Core: observe sections and update URL with pathname + hash
  const initObserver = useCallback(() => {
    // Disconnect previous observer
    if (observerRef.current) observerRef.current.disconnect()

    const sections = document.querySelectorAll(sectionSelector)
    if (sections.length === 0) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (isProgrammatic.current) return

        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id')
            if (id) {
              const currentPath = window.location.pathname
              const newUrl = `${currentPath}#${id}`
              if (window.location.href !== window.location.origin + newUrl) {
                window.history.replaceState(null, '', newUrl)
              }
            }
          }
        }
      },
      {
        rootMargin: `-${offsetTop}px 0px -${offsetBottom}% 0px`,
        threshold: 0,
      }
    )

    sections.forEach((section) => {
      observerRef.current?.observe(section)
    })
  }, [sectionSelector, offsetTop, offsetBottom])

  useEffect(() => {
    handleHashOnLoad()
    initObserver()

    // MutationObserver: auto-detect new sections added dynamically (AJAX, React, etc.)
    if (typeof MutationObserver !== 'undefined') {
      mutationRef.current = new MutationObserver(() => {
        initObserver()
      })

      mutationRef.current.observe(document.body, {
        childList: true,
        subtree: true,
      })
    }

    // Intercept hash link clicks for smooth scroll
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
            const currentPath = window.location.pathname
            window.history.replaceState(null, '', `${currentPath}#${id}`)
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            setTimeout(() => { isProgrammatic.current = false }, 1000)
          }
        }
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      observerRef.current?.disconnect()
      mutationRef.current?.disconnect()
      document.removeEventListener('click', handleClick)
    }
  }, [pathname, handleHashOnLoad, initObserver])

  // This component renders nothing
  return null
}
