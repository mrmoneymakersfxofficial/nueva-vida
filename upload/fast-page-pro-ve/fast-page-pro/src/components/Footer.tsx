'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Send,
} from 'lucide-react';
import { ve } from '@/lib/ve';
import type { SanitySiteSettings } from '@/lib/sanity.client';

/* =============================================
   LIBRO DE RECLAMACIONES ICON (Peruvian)
   ============================================= */
const LibroReclamacionesIcon = () => (
  <svg
    viewBox="0 0 32 40"
    className="w-5 h-6 shrink-0"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Book body */}
    <rect x="3" y="4" width="26" height="32" rx="2" fill="#004691" />
    {/* Book spine */}
    <rect x="3" y="4" width="5" height="32" rx="1" fill="#003466" />
    {/* Pages */}
    <rect x="10" y="8" width="16" height="2" rx="0.5" fill="white" opacity="0.7" />
    <rect x="10" y="13" width="16" height="2" rx="0.5" fill="white" opacity="0.7" />
    <rect x="10" y="18" width="12" height="2" rx="0.5" fill="white" opacity="0.7" />
    {/* Pen/quill */}
    <path d="M26 2L30 6L20 18L16 18L16 14Z" fill="#D4AF37" />
    <path d="M24 4L28 8" stroke="white" strokeWidth="0.8" strokeLinecap="round" />
  </svg>
);

/* =============================================
   DATA
   ============================================= */
const moreInfoLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Nosotros', href: '/#nosotros' },
  { label: 'Contacto', href: '/#contacto' },
];

const legalLinks = [
  { label: 'Publicaciones', href: '/' },
  { label: 'Convenios', href: '/' },
  { label: 'Política de Privacidad', href: '/' },
  { label: 'Política de Cookies', href: '/' },
];

export default function Footer({ siteSettings }: { siteSettings?: SanitySiteSettings | null }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-white relative" id="contacto">

      {/* =============================================
          SECTION 1: CONTACT CARD (Blue — linear flow, no overlap)
          ============================================= */}
      <section className="w-full">
        <div className="w-full bg-[#004691] text-white py-12 px-4 md:px-12 rounded-none border-none relative z-10 m-0">
          <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center text-center py-10">

            {/* Column 1 — CONTACTO */}
            <div className="flex flex-col items-center text-center">
              <h4 className="text-[11px] font-bold tracking-[0.25em] uppercase text-white mb-3">
                Contacto
              </h4>
              <div className="flex items-center gap-3 mb-2 w-full justify-center md:justify-start">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Phone size={16} strokeWidth={1.5} className="text-[#D4AF37]" />
                </div>
                <a
                  href="https://wa.me/51944106163"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-white hover:text-[#D4AF37] transition-colors"
                  {...(siteSettings?._id ? ve(siteSettings._id, 'siteSettings', 'phone') : {})}
                >
                  +51 944 106 163
                </a>
              </div>
              <div className="flex items-center gap-3 w-full justify-center md:justify-start">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Send size={14} strokeWidth={1.5} className="text-[#D4AF37]" />
                </div>
                <p className="text-sm font-semibold text-white">
                  @SERTRADE_PROYECTOS
                </p>
              </div>
            </div>

            {/* Column 2 — UBICACIÓN */}
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-3">
                <MapPin size={18} strokeWidth={2} className="text-[#D4AF37]" />
              </div>
              <h4 className="text-[11px] font-bold tracking-[0.25em] uppercase text-white mb-2">
                Ubicación
              </h4>
              <p className="text-white text-base md:text-lg font-black tracking-wide leading-snug max-w-[280px] uppercase drop-shadow-sm" {...(siteSettings?._id ? ve(siteSettings._id, 'siteSettings', 'address') : {})}>
                Av. Guillermo Dansey 825,
                Lima 15082
              </p>
            </div>

            {/* Column 3 — BRAND LOGO (White on transparent) */}
            <div className="flex items-center justify-center">
              <div className="w-24 h-24 bg-transparent flex items-center justify-center p-0 md:mx-auto select-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/sertrade-logo-white.png"
                  alt="Sertrade Design"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =============================================
          SECTION 2: GOOGLE MAPS EMBED (Full bleed)
          ============================================= */}
      <section className="relative w-full">
        <div className="w-full h-[300px] sm:h-[350px] md:h-[450px]">
          <iframe
            src="https://maps.google.com/maps?q=Av+Guillermo+Dansey+825,+Lima+15082,+Peru&z=17&output=embed"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Sertrade Design — Av. Guillermo Dansey 825, Lima 15082"
          />
        </div>
      </section>

      {/* =============================================
          SECTION 3: ULTRA-COMPACT FOOTER (Nomena Style)
          ============================================= */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 text-[11px] leading-tight">

            {/* Column 1 — BRAND & SOCIALS */}
            <div>
              <div className="flex items-center gap-2.5 mb-3" {...(siteSettings?._id ? ve(siteSettings._id, 'siteSettings', 'companyName') : {})}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/sertrade-logo.png"
                  alt="Sertrade Design"
                  className="h-7 w-auto object-contain"
                />
              </div>
              <p className="text-gray-500 text-[11px] leading-[1.65] mb-4 max-w-[220px]" {...(siteSettings?._id ? ve(siteSettings._id, 'siteSettings', 'slogan') : {})}>
                Estudio de arquitectura especializado en diseño y ejecución de espacios comerciales, de salud y residenciales.
              </p>
              <div className="flex items-center gap-2" {...(siteSettings?._id ? ve(siteSettings._id, 'siteSettings', 'whatsapp') : {})}>
                {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label="Red social"
                    className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#004691] hover:text-white transition-all duration-300"
                  >
                    <Icon size={13} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2 — MÁS INFORMACIÓN */}
            <div>
              <h5 className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-900 mb-3">
                Más Información
              </h5>
              <ul className="space-y-1.5">
                {moreInfoLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[11px] text-gray-500 hover:text-[#004691] transition-colors leading-tight"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — LEGAL & LIBRO DE RECLAMACIONES */}
            <div>
              <h5 className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-900 mb-3">
                Legal
              </h5>
              <ul className="space-y-1.5">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[11px] text-gray-500 hover:text-[#004691] transition-colors leading-tight"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {/* Libro de Reclamaciones — Peru official */}
                <li className="pt-2">
                  <Link
                    href="/libro-reclamaciones"
                    className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#004691] hover:text-[#003466] transition-colors leading-tight"
                  >
                    <LibroReclamacionesIcon />
                    <span className="font-bold">Libro de Reclamaciones</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4 — SUSCRÍBETE */}
            <div>
              <h5 className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-900 mb-3">
                Suscríbete
              </h5>
              <p className="text-[11px] text-gray-500 leading-[1.65] mb-3">
                Recibe novedades y actualizaciones de nuestros proyectos.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Escribe tu correo electrónico"
                  required
                  className="w-full px-3 py-2.5 text-[11px] border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#004691] focus:ring-1 focus:ring-[#004691]/30 transition-all"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-black text-white text-[10px] font-bold tracking-[0.15em] uppercase rounded-md hover:bg-gray-900 transition-colors duration-300"
                >
                  {subscribed ? '¡Registrado!' : 'Registrarme'}
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* Sub-footer — Credits */}
        <div className="border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-gray-400 text-[10px] leading-tight">
              &copy; {new Date().getFullYear()} Sertrade Design. Todos los derechos reservados.
            </p>
            <p className="text-gray-400 text-[10px] leading-tight">
              Diseñado y desarrollado por{' '}
              <a
                href="https://www.fastpagepro.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4AF37] hover:text-[#e0b030] transition-colors font-semibold"
              >
                FastPagePro
              </a>
            </p>
          </div>
        </div>
      </section>

    </footer>
  );
}
