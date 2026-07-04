'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, ChevronRight, ShoppingBag, PencilRuler, Wrench, Zap, ZoomIn } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import Lightbox from '@/components/Lightbox';
import type { SanityService, SanityServiceCategory } from '@/lib/sanity.client';
import { getImageUrl, plainText } from '@/lib/sanity.client';
import { ve } from '@/lib/ve';

/* ═══════════════════════════════════════════════════
   PROPS
   ═══════════════════════════════════════════════════ */
interface ServicesPageProps {
  services?: SanityService[] | null;
  categories?: SanityServiceCategory[] | null;
}

/* ═══════════════════════════════════════════════════
   FALLBACK DATA — 3 Modules × 3 Subservices each
   ═══════════════════════════════════════════════════ */
const fallbackServiceModules = [
  {
    id: 1,
    title: 'SERVICIO DE DISEÑO',
    slug: 'diseno',
    icon: PencilRuler,
    category: 'ARQUITECTURA',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80',
    cards: [
      {
        title: 'Oficinas Corporativas',
        image: 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800&q=80',
        subservices: ['Open office layouts', 'Coworking spaces', 'Zonificación ejecutiva', 'Sistemas tecnológicos'],
      },
      {
        title: 'Hospitales y Clínicas',
        image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80',
        subservices: ['Áreas de emergencia', 'UCI y quirófanos', 'Hospitalización', 'Flujos clínicos'],
      },
      {
        title: 'Casas Unifamiliares',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
        subservices: ['Diseño personalizado', 'Jardines y exteriores', 'Sistemas sostenibles', 'Domótica integrada'],
      },
    ],
  },
  {
    id: 2,
    title: 'SERVICIOS GENERALES',
    slug: 'servicios-generales',
    icon: Wrench,
    category: 'CONSTRUCCIÓN',
    coverImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80',
    cards: [
      {
        title: 'Estructuras Metálicas',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
        subservices: ['Diseño estructural', 'Soldadura certificada', 'Montaje industrial', 'Cubiertas metálicas'],
      },
      {
        title: 'Obras Civiles',
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
        subservices: ['Movimiento de tierras', 'Sistemas de cimentación', 'Concreto armado', 'Infraestructura urbana'],
      },
      {
        title: 'Instalaciones',
        image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80',
        subservices: ['Eléctricas', 'Sanitarias', 'Gas natural', 'HVAC y ventilación'],
      },
    ],
  },
  {
    id: 3,
    title: 'IMPLEMENTACIÓN',
    slug: 'implementacion',
    icon: Zap,
    category: 'EJECUCIÓN',
    coverImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80',
    cards: [
      {
        title: 'Sub-estaciones Eléctricas',
        image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
        subservices: ['Diseño eléctrico', 'Tableros de media tensión', 'Sistemas de respaldo', 'Puesta a tierra'],
      },
      {
        title: 'Dirección de Obra',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
        subservices: ['Control de calidad', 'Programación de obra', 'Control de costos', 'Seguridad y salud'],
      },
      {
        title: 'Commissioning',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
        subservices: ['Pruebas de rendimiento', 'Balanceo de sistemas', 'Entrega técnica', 'Manual de operación'],
      },
    ],
  },
];

/* ═══════════════════════════════════════════════════
   SERVICE MODULE — Block 1 + Block 2 + Block 3
   ═══════════════════════════════════════════════════ */
function ServiceModule({ module, onOpenLightbox }: {
  module: typeof fallbackServiceModules[0];
  onOpenLightbox: (images: string[], index: number) => void;
}) {
  const ModuleIcon = module.icon;
  const moduleImages = module.cards.map((c) => c.image);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  const handleCardClick = useCallback((cardIdx: number) => {
    onOpenLightbox(moduleImages, cardIdx);
  }, [moduleImages, onOpenLightbox]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setActiveDot(idx);
  }, []);

  /* Reset activeDot when module enters viewport */
  useEffect(() => {
    setActiveDot(0);
  }, [module.id]);

  const scrollTo = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * el.clientWidth, behavior: 'smooth' });
  }, []);

  return (
    <section id={module.slug} className="w-full scroll-mt-20">

      {/* ══════════════════════════════════════════════
          BLOCK 1: PANORAMIC COVER — Image + Logo + Title
          ══════════════════════════════════════════════ */}
      <div
        className="relative w-full h-[220px] md:h-[280px] bg-cover bg-center flex flex-col justify-center items-center overflow-hidden rounded-none"
        style={{ backgroundImage: `url(${module.coverImage})` }}
        {...((module as { _id?: string })._id ? ve((module as { _id?: string })._id!, 'serviceCategory', 'name') : {})}
      >
        {/* Dark overlay + cinematic blur */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[#004691]/40 backdrop-blur-xl z-0" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          {/* Black circle with transparent brand logo */}
          <div className="w-12 h-12 bg-black rounded-full mb-3 shadow-lg flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/sertrade-logo.png"
              alt="Sertrade"
              className="w-7 h-7 brightness-0 invert object-contain"
            />
          </div>
          <h2 className="text-white text-2xl md:text-[2.75rem] font-black tracking-[0.2em] uppercase text-center drop-shadow-lg z-10 leading-tight">
            {module.title}
          </h2>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          BLOCK 2: CATEGORY BAR — Translucent blur strip + floating icon globe
          ══════════════════════════════════════════════ */}
      <div className="relative w-full bg-[#004691]/65 backdrop-blur-xl py-4 text-center z-20 mt-0 mb-0 flex flex-col items-center justify-center border-b border-white/10">
        {/* Floating connector globe — icon container */}
        <div className="w-10 h-10 bg-black rounded-full absolute -top-5 left-1/2 transform -translate-x-1/2 shadow-lg z-30 flex items-center justify-center text-white">
          <ModuleIcon size={18} strokeWidth={2} className="text-white" />
        </div>
        <span className="text-white text-base md:text-xl font-black tracking-widest uppercase mt-2 drop-shadow-md z-10">
          {module.category}
        </span>
      </div>

      {/* ══════════════════════════════════════════════
          BLOCK 3: TALL CARD GRID — 3 Cols Portrait + Lightbox
          ══════════════════════════════════════════════ */}
      {/* Mobile: scroll-snap full-screen carousel | Desktop: 3-col grid */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="w-full flex md:grid md:grid-cols-3 gap-0 mt-0 pt-0 relative z-10 overflow-x-auto md:overflow-x-visible whitespace-nowrap md:whitespace-normal scrollbar-none px-0 py-0 items-start snap-x snap-mandatory md:snap-none"
      >
        {module.cards.map((card, cardIdx) => (
          <div
            key={cardIdx}
            className="flex flex-col shrink-0 w-screen md:w-auto md:min-w-0 md:shrink whitespace-normal cursor-pointer snap-center md:snap-none"
            onClick={() => handleCardClick(cardIdx)}
            {...((card as { _id?: string })._id ? ve((card as { _id?: string })._id!, 'service', 'title') : {})}
          >
            {/* Tall vertical image — Portrait Pro + clickable overlay */}
            <div className="w-full h-[480px] md:h-[560px] overflow-hidden rounded-none relative group/img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-[480px] md:h-[560px] object-cover rounded-none block transition-transform duration-700 ease-out group-hover/img:scale-105"
                loading="lazy"
                {...((card as { _id?: string })._id ? ve((card as { _id?: string })._id!, 'service', 'coverImage') : {})}
              />
              {/* Zoom hint overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover/img:opacity-100 scale-75 group-hover/img:scale-100 transition-all duration-300">
                  <ZoomIn size={22} className="text-white" strokeWidth={1.5} />
                </div>
              </div>
            </div>

            {/* Immersive centered text block */}
            <div className="space-y-1 mt-3 text-center" {...((card as { _id?: string })._id ? ve((card as { _id?: string })._id!, 'service', 'description') : {})}>
              <h4 className="text-gray-900 text-sm md:text-base font-bold tracking-wide uppercase">
                {card.title}
              </h4>
              <ul className="text-[11px] md:text-xs text-gray-600 font-semibold leading-tight text-center space-y-1">
                {card.subservices.map((sub, subIdx) => (
                  <li key={subIdx} className="flex items-center justify-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#004691] shrink-0" />
                    {sub}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Instagram-style dot indicators + nav arrows — mobile only */}
      <div className="md:hidden flex items-center justify-center gap-3 pb-5">
        <button onClick={() => scrollTo(Math.max(0, activeDot - 1))} className="text-gray-400 active:text-[#004691] transition-colors" aria-label="Anterior">
          <ChevronRight size={16} className="rotate-180" />
        </button>
        <div className="flex items-center gap-1.5">
          {module.cards.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => scrollTo(dotIdx)}
              className={`rounded-full transition-all duration-300 ${
                dotIdx === activeDot
                  ? 'w-5 h-1.5 bg-[#004691]'
                  : 'w-1.5 h-1.5 bg-gray-300'
              }`}
              aria-label={`Subservicio ${dotIdx + 1}`}
            />
          ))}
        </div>
        <button onClick={() => scrollTo(Math.min(module.cards.length - 1, activeDot + 1))} className="text-gray-400 active:text-[#004691] transition-colors" aria-label="Siguiente">
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN SERVICES PAGE
   ═══════════════════════════════════════════════════ */
export default function ServicesPage({ services: cmsServices, categories: cmsCategories }: ServicesPageProps) {

  /* Merge CMS data with fallback */
  const serviceModules = useMemo(() => {
    if (cmsCategories?.length && cmsServices?.length) {
      const iconMap: Record<string, typeof PencilRuler> = { diseno: PencilRuler, 'servicios-generales': Wrench, implementacion: Zap };
      const catLabels: Record<string, string> = { diseno: 'ARQUITECTURA', 'servicios-generales': 'CONSTRUCCIÓN', implementacion: 'EJECUCIÓN' };
      return cmsCategories.map((cat, idx) => {
        const catSlug = typeof cat.slug === 'string' ? cat.slug : (cat.slug as { current?: string })?.current || '';
        const catServices = cmsServices.filter(s => {
          const sCatSlug = typeof s.category?.slug === 'string' ? s.category.slug : (s.category?.slug as unknown as { current?: string })?.current || '';
          return sCatSlug === catSlug;
        });
        return {
          id: idx + 1,
          title: cat.name?.toUpperCase() || fallbackServiceModules[idx]?.title || '',
          slug: catSlug || fallbackServiceModules[idx]?.slug || '',
          icon: iconMap[catSlug] || PencilRuler,
          category: catLabels[catSlug] || fallbackServiceModules[idx]?.category || '',
          coverImage: getImageUrl(catServices[0]?.coverImage, 1400, 600) || fallbackServiceModules[idx]?.coverImage || '',
          cards: catServices.length > 0
            ? catServices.slice(0, 3).map(s => ({
                title: s.title,
                image: getImageUrl(s.coverImage, 800, 600) || fallbackServiceModules[idx]?.cards[0]?.image || '',
                subservices: s.subservices?.map(sub => sub.title) || [],
                _id: s._id,
              }))
            : fallbackServiceModules[idx]?.cards || [],
          _id: cat._id,
        };
      });
    }
    return fallbackServiceModules;
  }, [cmsCategories, cmsServices]);

  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  const handleOpenLightbox = useCallback((images: string[], index: number) => {
    setLightbox({ images, index });
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightbox(null);
  }, []);

  return (
    <div>
      {/* ======== LIGHTBOX — Portfolio-style deep view ======== */}
      <Lightbox
        images={lightbox?.images ?? []}
        initialIndex={lightbox?.index ?? 0}
        isOpen={!!lightbox}
        onClose={handleCloseLightbox}
      />

      {/* ======== HERO HEADER ======== */}
      <section className="relative w-full bg-[#004691] overflow-hidden" style={{ minHeight: '35vh' }}>
        <div className="absolute top-0 right-0 w-80 h-80 border border-white/5 rotate-45 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-60 h-60 border border-[#d4a017]/8 -rotate-12 translate-y-1/3 -translate-x-1/4" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'url(/brand-pattern-tile.png)', backgroundRepeat: 'repeat', backgroundSize: '1086px 177px', opacity: 0.02 }}
        />
        <div className="relative max-w-7xl mx-auto px-6 text-center pt-36 md:pt-44 pb-24 md:pb-28">
          <ScrollReveal animation="fade-down" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[8px] bg-white/10 border border-white/15 mb-6">
              <ShoppingBag size={14} strokeWidth={1.5} className="text-[#d4a017]" />
              <span className="text-white/80 text-xs tracking-widest uppercase">Nuestros Servicios</span>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.2}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.25)' }}>
              Alcance de Nuestros Servicios
            </h1>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.35}>
            <p className="text-sm md:text-base text-white/90 max-w-2xl mx-auto leading-relaxed mb-4" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.2)' }}>
              Soluciones integrales de arquitectura y diseño que abarcan desde la concepción hasta la materialización de cada proyecto.
            </p>
          </ScrollReveal>
        </div>
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '11px', background: 'linear-gradient(to top, white 0%, rgba(255,255,255,0.8) 4px, rgba(255,255,255,0.3) 7px, #004691 11px)' }} />
      </section>

      {/* ======== SERVICE MODULES — 3 × 3 Grid ======== */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center py-12 md:py-16">
              <span className="text-[#C5960C] text-sm font-semibold tracking-[0.2em] uppercase block mb-3">Especialidades</span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#004691] tracking-tight">
                Áreas de Diseño
              </h2>
              <div className="w-12 h-1 bg-[#C5960C] mx-auto mt-5 rounded-full" />
            </div>
          </ScrollReveal>

          {serviceModules.map((module, i) => (
            <ScrollReveal key={module.id} animation="fade-up" delay={i * 0.1}>
              <div className="mt-10 mb-8 md:mb-12">
                <ServiceModule module={module} onOpenLightbox={handleOpenLightbox} />
              </div>
              {/* Separator between modules */}
              {i < serviceModules.length - 1 && (
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-8 md:my-12" />
              )}
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ======== CTA ======== */}
      <ScrollReveal animation="fade">
        <section className="relative py-16 md:py-20 bg-[#004691]">
          <div className="absolute top-0 left-0 right-0 pointer-events-none z-10" style={{ height: '11px', background: 'linear-gradient(to bottom, white 0%, rgba(255,255,255,0.8) 4px, rgba(255,255,255,0.3) 7px, #004691 11px)' }} />
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">¿Necesitas un servicio personalizado?</h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
              Cada proyecto es único. Contáctanos para recibir una propuesta adaptada a tus necesidades específicas.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href={`https://wa.me/51944106163?text=${encodeURIComponent('Hola, necesito un servicio personalizado de arquitectura. ¿Podrían asesorarme?')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-[#d4a017] text-[#003466] rounded-[8px] font-semibold shadow-lg inline-flex items-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(212,160,23,0.35)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <Phone size={18} strokeWidth={1.5} /> Solicitar Cotización
              </motion.a>
              <motion.a
                href="mailto:info@sertradedesign.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 border border-white/30 text-white rounded-[8px] font-medium inline-flex items-center gap-2"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <Mail size={18} strokeWidth={1.5} /> Enviar Correo
              </motion.a>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
