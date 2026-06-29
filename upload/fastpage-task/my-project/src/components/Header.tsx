'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, ArrowRight, Phone, Mail } from 'lucide-react';
import { ve } from '@/lib/ve';
import type { SanitySiteSettings } from '@/lib/sanity.client';

/* =============================================
   NAV ITEMS — Centered menu
   ============================================= */
const navItems = [
  { href: '/', label: 'INICIO', id: 'home' },
  { href: '/servicios', label: 'SERVICIOS', id: 'servicios' },
  { href: '/proyectos', label: 'PORTAFOLIO', id: 'proyectos' },
];

/* =============================================
   BRAND LOGO — Real Sertrade logo file
   ============================================= */
function BrandLogo({ className = '' }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/sertrade-logo-white.png"
      alt="Sertrade Design & Arquitectura"
      className={`object-contain block bg-transparent opacity-100 z-30 ${className}`}
    />
  );
}

/* =============================================
   SOCIAL MEDIA ICONS (inline SVG — lightweight)
   ============================================= */
const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/SertradeDesign',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/SertradeDesign',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@SertradeDesign',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/51944106163?text=Hola%20Sertrade%20Design',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

export default function Header({ siteSettings }: { siteSettings?: SanitySiteSettings | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  /* =============================================
     SCROLL PROGRESS BAR — useScroll + useSpring
     ============================================= */
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  /* =============================================
     SCROLL LISTENER
     ============================================= */
  useEffect(() => {
    setScrolled(window.scrollY > 50);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const id = setTimeout(closeMobileMenu, 0);
    return () => clearTimeout(id);
  }, [pathname, closeMobileMenu]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  /* =============================================
     GLASSMORPHISM STYLES
     ============================================= */
  const headerBg = scrolled
    ? 'bg-[#004691]/75 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.12)]'
    : 'bg-transparent shadow-none border-b border-transparent';

  const logoHeightPC = scrolled ? 'h-9 sm:h-10' : 'h-10 sm:h-12';

  return (
    <>
      {/* =============================================
          MAIN NAVBAR — Logo LEFT, Nav CENTER, Socials + Hamburger RIGHT
          ============================================= */}
      <header
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-[400ms] ease-in-out ${headerBg}`}
        style={{
          height: scrolled ? '68px' : '80px',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        {/* ===== SCROLL PROGRESS BAR — Gold 3px line ===== */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[3px] bg-[#D4AF37] origin-left z-50"
          style={{ scaleX }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center justify-between relative z-10">

          {/* ====== LOGO (LEFT) ====== */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0 transition-all duration-[400ms] ease-in-out">
            <div className="transition-transform duration-300 ease-in-out opacity-100" {...(siteSettings?._id ? ve(siteSettings._id, 'siteSettings', 'logoWhite') : {})}>
              <BrandLogo className={logoHeightPC} />
            </div>
            <div className="hidden sm:flex flex-col transition-all duration-[400ms] ease-in-out">
              <span className="text-white font-bold text-[17px] tracking-wide leading-none group-hover:text-[#d4a017] transition-colors duration-300">
                SERTRADE
              </span>
              <span className="text-white/50 text-[9px] tracking-[0.22em] uppercase leading-none block mt-0.5">
                Design & Arquitectura
              </span>
            </div>
          </Link>

          {/* ====== PC/TABLET NAV (CENTER) ====== */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`relative px-1 py-2 text-[13px] font-semibold uppercase tracking-[0.15em] transition-all duration-[400ms] ease-in-out after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:bg-[#d4a017] after:transition-all after:duration-[400ms] after:ease-in-out ${
                  isActive(item.href)
                    ? 'text-white after:w-full'
                    : 'text-white/80 hover:text-white hover:after:w-full'
                }`}
                style={{ textShadow: '0 1px 6px rgba(0,0,0,0.35), 0 0 12px rgba(0,0,0,0.15)' }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* ====== SOCIAL ICONS + HAMBURGER (RIGHT) ====== */}
          <div className="flex items-center gap-2">
            {/* Social icons — desktop only */}
            <div className="hidden lg:flex items-center gap-1">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex items-center justify-center w-8 h-8 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* MOBILE HAMBURGER (<768px) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-white p-2 rounded-[8px] hover:bg-white/15 transition-all duration-[400ms] ease-in-out"
              aria-label="Abrir menu"
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* =============================================
          OFF-CANVAS MOBILE DRAWER
          ============================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              onClick={closeMobileMenu}
              className="fixed inset-0 z-[1001] bg-black/50 backdrop-blur-[8px] md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30, bounce: 0 }}
              className="fixed top-0 right-0 z-[1002] w-[85vw] max-w-[360px] h-full md:hidden flex flex-col"
            >
              <div className="relative flex flex-col h-full bg-gradient-to-b from-[#0a1628] via-[#0d1f3c] to-[#0a1628]">

                {/* Close Button */}
                <div className="flex items-center justify-between px-6 pt-5 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="opacity-100" {...(siteSettings?._id ? ve(siteSettings._id, 'siteSettings', 'logoWhite') : {})}>
                      <BrandLogo className="h-9 sm:h-10" />
                    </div>
                    <span className="text-white font-bold text-base tracking-wide">SERTRADE</span>
                  </div>
                  <button
                    onClick={closeMobileMenu}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200"
                    aria-label="Cerrar menu"
                  >
                    <X size={20} strokeWidth={1.5} />
                  </button>
                </div>

                {/* Separator */}
                <div className="mx-6 h-px bg-white/10" />

                {/* Social Icons — Mobile drawer */}
                <div className="px-6 py-4 flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-white/8 text-white/60 hover:text-white hover:bg-white/15 transition-all duration-300"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-6 py-4 flex flex-col">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.08 + i * 0.06 }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMobileMenu}
                        className={`flex items-center justify-between py-4 border-b border-white/[0.06] text-lg font-bold tracking-[0.12em] uppercase transition-all duration-200 ${
                          isActive(item.href)
                            ? 'text-[#d4a017]'
                            : 'text-white hover:text-[#d4a017] hover:pl-2'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ArrowRight size={18} strokeWidth={1.5} className="transition-transform duration-200" />
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Bottom Section */}
                <div className="px-6 pb-8 space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.3 }}
                  >
                    <a
                      href={`https://wa.me/51944106163?text=${encodeURIComponent('Hola Sertrade Design, vi su página web y me gustaría recibir asesoría sobre sus servicios de arquitectura.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMobileMenu}
                      className="flex items-center justify-center gap-2.5 w-full py-[15px] bg-[#d4a017] text-[#003466] rounded-full text-[15px] font-bold tracking-wide hover:bg-[#e0b030] transition-all duration-300 shadow-lg shadow-[#d4a017]/20 hover:shadow-xl hover:scale-[1.02]"
                    >
                      CONTÁCTANOS
                      <ArrowRight size={18} strokeWidth={2} />
                    </a>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.38 }}
                    className="space-y-2.5 pt-2"
                  >
                    <a href={`https://wa.me/51944106163?text=${encodeURIComponent('Hola, quiero información sobre sus servicios.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/50 hover:text-white/80 text-sm transition-colors" {...(siteSettings?._id ? ve(siteSettings._id, 'siteSettings', 'phone') : {})}>
                      <Phone size={14} strokeWidth={1.5} />
                      <span>+51 944 106 163</span>
                    </a>
                    <a href="mailto:info@sertradedesign.com" className="flex items-center gap-3 text-white/50 hover:text-white/80 text-sm transition-colors" {...(siteSettings?._id ? ve(siteSettings._id, 'siteSettings', 'email') : {})}>
                      <Mail size={14} strokeWidth={1.5} />
                      <span>info@sertradedesign.com</span>
                    </a>
                  </motion.div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
