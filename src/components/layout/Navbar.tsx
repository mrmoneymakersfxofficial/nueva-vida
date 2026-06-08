'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Phone, Clock } from 'lucide-react'
import Image from 'next/image'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import MagneticButton from '@/components/animations/MagneticButton'
import { useMobileMenu } from '@/context/MobileMenuContext'

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/salud', label: 'Salud' },
  { href: '/reservas', label: 'Reservas' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { setMobileMenuOpen } = useMobileMenu()

  useEffect(() => {
    // Mark as mounted after hydration to enable entrance animation
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  // Sync Sheet open/close with context
  useEffect(() => {
    setMobileMenuOpen(isOpen)
  }, [isOpen, setMobileMenuOpen])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [isOpen])

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          FIXED NAVBAR — Rock-solid, no motion animation on y-axis
          Logo is the dominant element. Full responsive.
          ═══════════════════════════════════════════════════════ */}
      <header
        id="navbar-main"
        className={`fixed top-0 left-0 right-0 z-[40] transition-all duration-300 ${
          mounted ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-marine/5'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[60px] sm:h-[68px] lg:h-[80px]">

            {/* ═══ LOGO — DOMINANT, LARGE, ALIGNED ═══ */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0" aria-label="Inicio - Nueva Vida">
              <div className="relative flex-shrink-0
                w-11 h-11 sm:w-14 sm:h-14 lg:w-[68px] lg:h-[68px]
              ">
                <Image
                  src="/logo-nuevavida.png"
                  alt="Logotipo Nueva Vida"
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  priority
                  sizes="68px"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-marine font-bold text-[15px] sm:text-lg lg:text-[22px] tracking-tight leading-[1.1] group-hover:text-royal transition-colors">
                  NUEVA VIDA
                </span>
                <span className="text-marine/50 text-[9px] sm:text-[10px] lg:text-xs font-medium tracking-widest uppercase hidden sm:block leading-tight mt-0.5">
                  Consultorio Ginecológico
                </span>
              </div>
            </Link>

            {/* ═══ DESKTOP NAV — Center links ═══ */}
            <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? 'bg-cyan text-white shadow-md shadow-cyan/25'
                      : 'text-marine hover:bg-marine/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* ═══ DESKTOP CTA — Right side ═══ */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center gap-2 text-marine/70 text-sm">
                <Clock className="w-4 h-4" />
                <span className="hidden xl:inline">Lun-Vie 8:00-18:00</span>
                <span className="xl:hidden">8-18h</span>
              </div>
              <MagneticButton href="/reservas" strength={0.2}>
                <Button className="bg-cyan hover:bg-cyan-light text-white font-semibold rounded-full px-6 shadow-lg shadow-cyan/25 glow-cyan transition-all duration-300">
                  Agendar Cita
                </Button>
              </MagneticButton>
            </div>

            {/* ═══ MOBILE CONTROLS — Phone + Hamburger ═══ */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href="tel:+51983554248"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan/10 text-cyan hover:bg-cyan/20 transition-colors"
                aria-label="Llamar al +51 983 554 248"
              >
                <Phone className="w-[18px] h-[18px]" />
              </a>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <button
                    className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-marine/5 transition-colors"
                    aria-label="Abrir menú de navegación"
                  >
                    <Menu className="w-5 h-5 text-marine" />
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[300px] sm:w-80 bg-white p-0"
                >
                  <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
                  <div className="flex flex-col h-full">
                    {/* Mobile Sheet Header */}
                    <div className="p-5 border-b border-marine/10 flex-shrink-0">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 flex-shrink-0">
                          <Image
                            src="/logo-nuevavida.png"
                            alt="Nueva Vida"
                            fill
                            className="object-contain"
                            sizes="48px"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-marine font-bold text-lg leading-tight">NUEVA VIDA</span>
                          <span className="text-marine/50 text-[10px] tracking-widest uppercase">Menú de navegación</span>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Links */}
                    <div className="flex-1 p-5 flex flex-col gap-1.5 overflow-y-auto overscroll-contain">
                      {navLinks.map((link, i) => (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                        >
                          <Link
                            href={link.href}
                            onClick={handleLinkClick}
                            className={`flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${
                              pathname === link.href
                                ? 'bg-cyan text-white shadow-md shadow-cyan/20'
                                : 'text-marine hover:bg-marine/5'
                            }`}
                          >
                            {link.label}
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    {/* Mobile CTA */}
                    <div className="p-5 border-t border-marine/10 flex-shrink-0 space-y-4">
                      <Link href="/reservas" onClick={handleLinkClick}>
                        <Button className="w-full bg-cyan hover:bg-cyan-light text-white font-semibold rounded-xl py-3.5 shadow-lg shadow-cyan/25 text-base">
                          Agendar Cita
                        </Button>
                      </Link>
                      <a
                        href="tel:+51983554248"
                        className="flex items-center justify-center gap-2 text-marine/60 text-sm hover:text-cyan transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span>+51 983 554 248</span>
                      </a>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
