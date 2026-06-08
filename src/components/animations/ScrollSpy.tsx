'use client'
import { useEffect, useRef, useCallback } from 'react'
import { usePathname } from 'next/navigation'

/**
 * GlobalScrollSpy — Sistema autónomo de scroll spy + deep linking.
 * 
 * Funciona GLOBALMENTE en todas las subpáginas.
 * - IntersectionObserver detecta la sección visible
 * - MutationObserver re-observa contenido dinámico (React, AJAX)
 * - history.replaceState actualiza la URL con pathname + hash
 * - Intercepta clicks en links con href="#id" para smooth scroll
 * - Actualiza estados activos en .nav-link del navbar
 * - Soporta hash directo en URL al cargar la página
 */

interface GlobalScrollSpyProps {
  sectionSelector?: string
  offsetTop?: number
  offsetBottom?: number
}

export default function GlobalScrollSpy({
  sectionSelector = 'section[id], article[id], div[id].scroll-section',
  offsetTop = 100,
  offsetBottom = 55,
}: GlobalScrollSpyProps) {
  const pathname = usePathname()
  const isProgrammatic = useRef(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const mutationRef = useRef<MutationObserver | null>(null)

  // Update active state on navbar .nav-link elements
  const updateActiveNavLinks = useCallback((activeId: string | null) => {
    const navLinks = document.querySelectorAll('.nav-link')
    navLinks.forEach((link) => {
      const href = link.getAttribute('href')
      if (!href) return

      // If we have an active section, check if this nav link points to a section on this page
      if (activeId) {
        const currentPath = window.location.pathname
        // For homepage, check if href matches section anchor
        if (href === `/#${activeId}` || href === `#${activeId}`) {
          link.classList.add('nav-link-active')
          link.classList.remove('text-white/90', 'hover:bg-white/10', 'text-[#0A2F6B]', 'hover:bg-[#0A2F6B]/5')
          link.classList.add('bg-cyan', 'text-white', 'shadow-md', 'shadow-cyan/25')
        } else {
          link.classList.remove('nav-link-active', 'bg-cyan', 'text-white', 'shadow-md', 'shadow-cyan/25')
          // Restore appropriate non-active styles based on scroll
          const scrolled = window.scrollY > 80
          if (scrolled) {
            link.classList.add('text-[#0A2F6B]', 'hover:bg-[#0A2F6B]/5')
          } else {
            link.classList.add('text-white/90', 'hover:bg-white/10')
          }
        }
      } else {
        link.classList.remove('nav-link-active')
      }
    })
  }, [])

  // Handle hash on page load — scroll to section
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

  // Core: observe sections and update URL + active states
  const initObserver = useCallback(() => {
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
              // Update active nav link states
              updateActiveNavLinks(id)
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
  }, [sectionSelector, offsetTop, offsetBottom, updateActiveNavLinks])

  useEffect(() => {
    handleHashOnLoad()
    initObserver()

    // MutationObserver: auto-detect new sections added dynamically
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
            updateActiveNavLinks(id)
            setTimeout(() => { isProgrammatic.current = false }, 1000)
          }
        }
      }
    }

    document.addEventListener('click', handleClick)

    // Also update active nav states on scroll (for cases where IntersectionObserver
    // doesn't fire due to no section being in the threshold zone)
    const handleScroll = () => {
      if (isProgrammatic.current) return
      const hash = window.location.hash.replace('#', '')
      if (hash) {
        updateActiveNavLinks(hash)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observerRef.current?.disconnect()
      mutationRef.current?.disconnect()
      document.removeEventListener('click', handleClick)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname, handleHashOnLoad, initObserver, updateActiveNavLinks])

  return null
}
