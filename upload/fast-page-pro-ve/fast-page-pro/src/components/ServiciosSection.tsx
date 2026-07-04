'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { PencilRuler, Wrench, Zap } from 'lucide-react';
import Link from 'next/link';
import type { SanityService, SanityServiceCategory } from '@/lib/sanity.client';
import { getImageUrl, plainText } from '@/lib/sanity.client';
import { ve } from '@/lib/ve';

/* =============================================
   PROPS
   ============================================= */
interface ServiciosSectionProps {
  services?: SanityService[] | null;
  categories?: SanityServiceCategory[] | null;
}

/* =============================================
   FALLBACK DATA
   ============================================= */
const fallbackCards = [
  {
    id: 1,
    title: 'DISEÑO',
    slug: 'diseno',
    icon: PencilRuler,
    img: '/images/services/diseno.jpg',
    services: [
      'Ingeniería básica y de detalle.',
      'Modelado arquitectónico 3D.',
      'Optimización de flujos de trabajo.',
    ],
    flipTitle: 'DISEÑO',
    flipServices: [
      'Ingeniería básica y de detalle.',
      'Modelado arquitectónico 3D.',
      'Optimización de flujos de trabajo.',
    ],
    flipCtaLabel: 'CONOCER MÁS',
  },
  {
    id: 2,
    title: 'SERVICIOS GENERALES',
    slug: 'servicios-generales',
    icon: Wrench,
    img: '/images/services/servicios-generales.jpg',
    services: [
      'Drywall y acabados.',
      'Estructuras metálicas.',
      'Ampliaciones y obras civiles.',
    ],
    flipTitle: 'SERVICIOS GENERALES',
    flipServices: [
      'Drywall y acabados.',
      'Estructuras metálicas.',
      'Ampliaciones y obras civiles.',
    ],
    flipCtaLabel: 'CONOCER MÁS',
  },
  {
    id: 3,
    title: 'IMPLEMENTACIÓN',
    slug: 'implementacion',
    icon: Zap,
    img: '/images/services/implementacion.jpg',
    services: [
      'Sub-estaciones eléctricas.',
      'Instalaciones eléctricas.',
      'Instalaciones sanitarias.',
    ],
    flipTitle: 'IMPLEMENTACIÓN',
    flipServices: [
      'Sub-estaciones eléctricas.',
      'Instalaciones eléctricas.',
      'Instalaciones sanitarias.',
    ],
    flipCtaLabel: 'CONOCER MÁS',
  },
];

export default function ServiciosSection({ services: cmsServices, categories: cmsCategories }: ServiciosSectionProps) {
  // Merge CMS data with fallback
  const cards = useMemo(() => {
    if (cmsCategories?.length && cmsServices?.length) {
      const iconMap: Record<string, typeof PencilRuler> = {
        diseno: PencilRuler,
        'servicios-generales': Wrench,
        implementacion: Zap,
      };
      return cmsCategories.map((cat, idx) => {
        const catSlug = typeof cat.slug === 'string' ? cat.slug : (cat.slug as { current?: string })?.current || '';
        const catServices = cmsServices.filter(s => {
          const sCatSlug = typeof s.category?.slug === 'string' ? s.category.slug : (s.category?.slug as unknown as { current?: string })?.current || '';
          return sCatSlug === catSlug;
        });
        // Use flipServices from CMS if available, otherwise fall back to service titles, then fallback data
        const flipServicesList = (cat.flipServices && cat.flipServices.length > 0)
          ? cat.flipServices
          : catServices.length > 0
            ? catServices.map(s => s.title)
            : fallbackCards[idx]?.flipServices || [];
        return {
          id: idx + 1,
          title: cat.name?.toUpperCase() || fallbackCards[idx]?.title || '',
          slug: catSlug || fallbackCards[idx]?.slug || '',
          icon: iconMap[catSlug] || PencilRuler,
          img: fallbackCards[idx]?.img || '/images/services/diseno.jpg',
          services: catServices.length > 0
            ? catServices.map(s => s.title)
            : (cat.description ? [cat.description] : fallbackCards[idx]?.services || []),
          flipTitle: cat.flipTitle?.toUpperCase() || cat.name?.toUpperCase() || fallbackCards[idx]?.flipTitle || '',
          flipServices: flipServicesList,
          flipCtaLabel: cat.flipCtaLabel || fallbackCards[idx]?.flipCtaLabel || 'CONOCER MÁS',
          _id: cat._id,
        };
      });
    }
    return fallbackCards;
  }, [cmsCategories, cmsServices]);

  // Unified flip state: works for both hover (desktop) and tap (mobile)
  const [flippedId, setFlippedId] = useState<number | null>(null);
  const hoverTimersRef = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      Object.values(hoverTimersRef.current).forEach(clearTimeout);
    };
  }, []);

  const handleMouseEnter = useCallback((id: number) => {
    // Only on non-touch devices
    if ('ontouchstart' in window || window.navigator.maxTouchPoints > 0) return;
    // Clear any existing leave timer
    if (hoverTimersRef.current[id]) {
      clearTimeout(hoverTimersRef.current[id]);
      delete hoverTimersRef.current[id];
    }
    // Debounce: only flip after 400ms of sustained hover
    hoverTimersRef.current[id] = setTimeout(() => {
      setFlippedId(id);
      delete hoverTimersRef.current[id];
    }, 400);
  }, []);

  const handleMouseLeave = useCallback((id: number) => {
    // Only on non-touch devices
    if ('ontouchstart' in window || window.navigator.maxTouchPoints > 0) return;
    // Clear the enter timer if still pending
    if (hoverTimersRef.current[id]) {
      clearTimeout(hoverTimersRef.current[id]);
      delete hoverTimersRef.current[id];
    }
    setFlippedId(prev => prev === id ? null : prev);
  }, []);

  const handleTap = useCallback((id: number) => {
    // Only on touch devices
    if ('ontouchstart' in window || window.navigator.maxTouchPoints > 0) {
      setFlippedId(prev => prev === id ? null : id);
    }
  }, []);

  return (
    <section className="relative w-full bg-transparent py-20" style={{ overflow: 'visible' }}>

      {/* ===== HEADER TEXT ===== */}
      <div className="relative z-10 text-center mb-12 px-4">
        <span className="text-[#C5960C] text-xs font-bold tracking-[0.2em] uppercase block mb-2">
          Nuestros Servicios
        </span>
        <h2 className="text-[#004691] text-3xl md:text-4xl font-black tracking-tight text-shadow-pro">
          Lo Que Hacemos
        </h2>
        <div className="w-12 h-1 bg-[#C5960C] mx-auto mt-3 rounded-full" />
      </div>

      {/* ===== 3D FLIP CARDS — FULL BLEED GRID ===== */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-0 md:px-6 lg:px-8" style={{ overflow: 'visible' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0" style={{ overflow: 'visible' }}>

          {cards.map((card) => {
            const IconComp = card.icon;
            const isFlipped = flippedId === card.id;
            const cardId = (card as { _id?: string })._id;
            return (
              <div
                key={cardId || card.id}
                className="w-full h-[480px] md:h-[530px] cursor-pointer"
                style={{ perspective: '1200px', overflow: 'visible', transformStyle: 'preserve-3d' }}
                onMouseEnter={() => handleMouseEnter(card.id)}
                onMouseLeave={() => handleMouseLeave(card.id)}
                onClick={() => handleTap(card.id)}
              >
                <motion.div
                  className="relative w-full h-full"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{
                    rotateY: isFlipped ? 180 : 0,
                    boxShadow: isFlipped ? '0 25px 60px rgba(0,70,145,0.35)' : '0 0px 0px rgba(0,0,0,0)',
                  }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                >
                  {/* ===== FRONT FACE ===== */}
                  <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center flex flex-col justify-center items-center p-6"
                    style={{
                      backgroundImage: `url(${card.img})`,
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                    {...(cardId ? ve(cardId, 'serviceCategory', 'name') : {})}
                  >
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-[#004691]/60" />

                    <div className="relative z-10 flex flex-col items-center text-center">
                      {/* Icon */}
                      <div className="w-16 h-16 bg-[#C5960C] rounded-xl flex items-center justify-center text-white text-2xl mb-4 shadow-lg">
                        <IconComp size={30} strokeWidth={1.5} className="text-white" />
                      </div>
                      <h3 className="text-white text-2xl font-black tracking-wider mb-2 drop-shadow-md">
                        {card.title}
                      </h3>
                      <span className="text-white/60 text-[11px] tracking-[0.15em] uppercase mt-4 block md:hidden">
                        Toca para ver ↗
                      </span>
                      <span className="text-white/60 text-[11px] tracking-[0.15em] uppercase mt-4 hidden md:block">
                        Pasa el cursor ↗
                      </span>
                    </div>
                  </div>

                  {/* ===== BACK FACE — Blur Pro Effect ===== */}
                  <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center p-8 flex flex-col justify-center items-center text-center my-auto text-white overflow-hidden"
                    style={{
                      backgroundImage: `url(${card.img})`,
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    {/* Premium blur layer + brand blue tint */}
                    <div className="absolute inset-0 bg-[#004691]/60 backdrop-blur-xl z-0" />

                    {/* Content: Title + Service List */}
                    <div className="relative z-10 w-full flex flex-col items-center">
                      <h4
                        className="text-[#D4AF37] text-xl font-black mb-6 tracking-wider text-center uppercase drop-shadow-md"
                        {...(cardId ? ve(cardId, 'serviceCategory', 'flipTitle') : {})}
                      >
                        {card.flipTitle || card.title}
                      </h4>
                      <ul
                        className="max-w-[240px] mx-auto space-y-2 text-sm font-medium text-white/95"
                        {...(cardId ? ve(cardId, 'serviceCategory', 'flipServices') : {})}
                      >
                        {card.flipServices.map((service, sIdx) => (
                          <li key={sIdx} className="drop-shadow-sm">
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button — Navigate to /servicios#slug */}
                    <div className="relative z-10 w-full flex justify-center px-2" {...(cardId ? ve(cardId, 'serviceCategory', 'flipCtaLabel') : {})}>
                      <Link
                        href={`/servicios#${card.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full py-3 bg-[#D4AF37] hover:bg-[#bfa032] text-[#004691] font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-lg active:scale-[0.98] text-center block"
                      >
                        {card.flipCtaLabel || 'CONOCER MÁS'} ↗
                      </Link>
                    </div>
                  </div>

                </motion.div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}