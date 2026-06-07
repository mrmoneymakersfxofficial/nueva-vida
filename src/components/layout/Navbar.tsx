'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, Clock } from 'lucide-react'
import Image from 'next/image'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import MagneticButton from '@/components/animations/MagneticButton'

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/salud', label: 'Salud' },
  { href: '/reservas', label: 'Reservas' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-marine/5' 
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Inicio - Nueva Vida">
            <div className="relative h-10 w-10 lg:h-12 lg:w-12 flex-shrink-0">
              <Image
                src="/logo-nuevavida.png"
                alt="Logotipo Nueva Vida"
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                priority
                sizes="48px"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-marine font-bold text-sm lg:text-base tracking-tight leading-tight group-hover:text-royal transition-colors">
                NUEVA VIDA
              </span>
              <span className="text-marine/60 text-[10px] lg:text-xs font-medium tracking-wider uppercase hidden sm:block">
                Consultorio Ginecológico
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? 'bg-cyan text-white shadow-md shadow-cyan/25'
                    : 'text-marine hover:bg-marine/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 text-marine/70 text-sm">
              <Clock className="w-4 h-4" />
              <span>Lun-Vie 8:00-18:00</span>
            </div>
            <MagneticButton href="/reservas" strength={0.2}>
              <Button className="bg-cyan hover:bg-cyan-light text-white font-semibold rounded-full px-6 shadow-lg shadow-cyan/25 glow-cyan transition-all duration-300">
                Agendar Cita
              </Button>
            </MagneticButton>
          </div>

          {/* Mobile Menu */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              href="tel:+51999999999"
              className="p-2 rounded-full bg-cyan/10 text-cyan hover:bg-cyan/20 transition-colors"
            >
              <Phone className="w-5 h-5" />
            </a>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="p-2 rounded-lg hover:bg-marine/5 transition-colors">
                  <Menu className="w-6 h-6 text-marine" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white p-0">
                <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="p-6 border-b border-marine/10">
                    <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative h-8 w-8 flex-shrink-0">
                        <Image
                          src="/logo-nuevavida.png"
                          alt="NV"
                          fill
                          className="object-contain"
                          sizes="32px"
                        />
                      </div>
                      <span className="text-marine font-bold text-lg">NUEVA VIDA</span>
                    </div>
                      <span className="text-marine/50 text-xs">Menú</span>
                    </div>
                  </div>
                  
                  {/* Mobile Links */}
                  <div className="flex-1 p-6 flex flex-col gap-2">
                    {navLinks.map((link, i) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                            pathname === link.href
                              ? 'bg-cyan text-white'
                              : 'text-marine hover:bg-marine/5'
                          }`}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Mobile CTA */}
                  <div className="p-6 border-t border-marine/10">
                    <Link href="/reservas" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-cyan hover:bg-cyan-light text-white font-semibold rounded-xl py-3 shadow-lg shadow-cyan/25">
                        Agendar Cita
                      </Button>
                    </Link>
                    <div className="flex items-center justify-center gap-2 mt-4 text-marine/60 text-sm">
                      <Phone className="w-4 h-4" />
                      <span>+51 999 999 999</span>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}
