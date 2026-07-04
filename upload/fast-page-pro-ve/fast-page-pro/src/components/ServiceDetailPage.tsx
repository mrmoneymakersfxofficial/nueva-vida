'use client';

import { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PencilRuler, Wrench, Zap, Phone, Mail, ChevronRight, ZoomIn } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import Lightbox from '@/components/Lightbox';
import type { SanityService, SanityServiceCategory } from '@/lib/sanity.client';
import { getImageUrl, plainText } from '@/lib/sanity.client';
import { ve } from '@/lib/ve';

/* ═══════════════════════════════════════════════════
   PROPS
   ═══════════════════════════════════════════════════ */
interface ServiceDetailPageProps {
  category?: SanityServiceCategory | null;
  services?: SanityService[] | null;
  fallbackSlug?: string;
}

/* ═══════════════════════════════════════════════════
   FALLBACK DATA
   ═══════════════════════════════════════════════════ */
const fallbackServiceModules: Record<string, {
  title: string;
  slug: string;
  icon: typeof PencilRuler;
  category: string;
  coverImage: string;
  cards: Array<{ title: string; image: string; subservices: string[] }>;
}> = {
  diseno: {
    title: 'SERVICIO DE DISENO',
    slug: 'diseno',
    icon: PencilRuler,
    category: 'ARQUITECTURA',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80',
    cards: [
      { title: 'Oficinas Corporativas', image: 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800&q=80', subservices: ['Open office layouts', 'Coworking spaces', 'Zonificacion ejecutiva', 'Sistemas tecnologicos'] },
      { title: 'Hospitales y Clinicas', image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80', subservices: ['Areas de emergencia', 'UCI y quirofanos', 'Hospitalizacion', 'Flujos clinicos'] },
      { title: 'Casas Unifamiliares', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', subservices: ['Diseno personalizado', 'Jardines y exteriores', 'Sistemas sostenibles', 'Domotica integrada'] },
    ],
  },
  'servicios-generales': {
    title: 'SERVICIOS GENERALES',
    slug: 'servicios-generales',
    icon: Wrench,
    category: 'CONSTRUCCION',
    coverImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80',
    cards: [
      { title: 'Estructuras Metalicas', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', subservices: ['Diseno estructural', 'Soldadura certificada', 'Montaje industrial', 'Cubiertas metalicas'] },
      { title: 'Obras Civiles', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80', subservices: ['Movimiento de tierras', 'Sistemas de cimentacion', 'Concreto armado', 'Infraestructura urbana'] },
      { title: 'Instalaciones', image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80', subservices: ['Electricas', 'Sanitarias', 'Gas natural', 'HVAC y ventilacion'] },
    ],
  },
  implementacion: {
    title: 'IMPLEMENTACION',
    slug: 'implementacion',
    icon: Zap,
    category: 'EJECUCION',
    coverImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80',
    cards: [
      { title: 'Sub-estaciones Electricas', image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80', subservices: ['Diseno electrico', 'Tableros de media tension', 'Sistemas de respaldo', 'Puesta a tierra'] },
      { title: 'Direccion de Obra', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', subservices: ['Control de calidad', 'Programacion de obra', 'Control de costos', 'Seguridad y salud'] },
      { title: 'Commissioning', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', subservices: ['Pruebas de rendimiento', 'Balanceo de sistemas', 'Entrega tecnica', 'Manual de operacion'] },
    ],
  },
};

/* ═══════════════════════════════════════════════════
   SERVICE DETAIL PAGE
   ═══════════════════════════════════════════════════ */
export default function ServiceDetailPage({ category, services, fallbackSlug }: ServiceDetailPageProps) {
  const moduleData = useMemo(() => {
    const slug = fallbackSlug || '';
    const fallback = fallbackServiceModules[slug] || fallbackServiceModules['diseno'];

    if (category && services && services.length > 0) {
      return {
        title: category.name?.toUpperCase() || fallback.title,
        slug: typeof category.slug === 'string' ? category.slug : (category.slug as { current?: string })?.current || slug,
        icon: fallback.icon,
        category: fallback.category,
        coverImage: getImageUrl(services[0]?.coverImage, 1400, 600) || fallback.coverImage,
        cards: services.slice(0, 3).map(s => ({
          title: s.title,
          image: getImageUrl(s.coverImage, 800, 600) || fallback.cards[0]?.image || '',
          subservices: s.subservices?.map(sub => sub.title) || [],
          _id: s._id,
        })),
        categoryId: category._id,
        categoryDescription: plainText(category.description as any),
      };
    }

    return { ...fallback, categoryId: category?._id, categoryDescription: plainText(category?.description as any) };
  }, [category, services, fallbackSlug]);

  const ModuleIcon = moduleData.icon;
  const cardImages = moduleData.cards.map(c => c.image);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  const handleCardClick = useCallback((cardIdx: number) => {
    setLightbox({ images: cardImages, index: cardIdx });
  }, [cardImages]);

  const handleCloseLightbox = useCallback(() => setLightbox(null), []);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setActiveDot(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  const scrollTo = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * el.clientWidth, behavior: 'smooth' });
  }, []);

  return (
    <div>
      <Lightbox images={lightbox?.images ?? []} initialIndex={lightbox?.index ?? 0} isOpen={!!lightbox} onClose={handleCloseLightbox} />

      {/* ═══ BLOCK 1: PANORAMIC COVER ═══ */}
      <section className="relative w-full">
        <ScrollReveal animation="fade">
          <div
            className="relative w-full h-[280px] md:h-[380px] bg-cover bg-center flex flex-col justify-center items-center overflow-hidden"
            style={{ backgroundImage: `url(${moduleData.coverImage})` }}
            {...(moduleData.categoryId ? ve(moduleData.categoryId, 'serviceCategory', 'name') : {})}
          >
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 bg-[#004691]/40 backdrop-blur-xl z-0" />
            <div className="relative z-10 flex flex-col items-center text-center px-4">
              <div className="w-14 h-14 bg-black rounded-full mb-4 shadow-lg flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/favicon.svg" alt="" className="w-8 h-8 brightness-0 invert object-contain" />
              </div>
              <h1 className="text-white text-3xl md:text-[3.25rem] font-black tracking-[0.2em] uppercase text-center drop-shadow-lg z-10 leading-tight">
                {moduleData.title}
              </h1>
              {moduleData.categoryDescription && (
                <p className="text-white/75 text-sm md:text-base max-w-2xl mx-auto mt-4 leading-relaxed text-center"
                  {...(moduleData.categoryId ? ve(moduleData.categoryId, 'serviceCategory', 'description') : {})}>
                  {moduleData.categoryDescription}
                </p>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* ═══ BLOCK 2: CATEGORY BAR ═══ */}
        <ScrollReveal animation="fade-down" delay={0.15}>
          <div className="relative w-full bg-[#004691]/65 backdrop-blur-xl py-5 text-center z-20 mt-0 mb-0 flex flex-col items-center justify-center border-b border-white/10">
            <div className="w-12 h-12 bg-black rounded-full absolute -top-6 left-1/2 transform -translate-x-1/2 shadow-lg z-30 flex items-center justify-center text-white">
              <ModuleIcon size={20} strokeWidth={2} className="text-white" />
            </div>
            <span className="text-white text-lg md:text-2xl font-black tracking-widest uppercase mt-2 drop-shadow-md z-10"
              {...(moduleData.categoryId ? ve(moduleData.categoryId, 'serviceCategory', 'icon') : {})}>
              {moduleData.category}
            </span>
          </div>
        </ScrollReveal>

        {/* ═══ BLOCK 3: TALL CARD GRID ═══ */}
        <section className="bg-white">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center pt-12 pb-4 md:pt-16 md:pb-6">
                <span className="text-[#C5960C] text-sm font-semibold tracking-[0.2em] uppercase block mb-3">Especialidades</span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#004691] tracking-tight">Areas de {moduleData.category}</h2>
                <div className="w-12 h-1 bg-[#C5960C] mx-auto mt-5 rounded-full" />
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.2}>
              <div ref={scrollRef} onScroll={handleScroll}
                className="w-full flex md:grid md:grid-cols-3 gap-0 mt-0 pt-0 relative z-10 overflow-x-auto md:overflow-x-visible whitespace-nowrap md:whitespace-normal scrollbar-none px-0 py-0 items-start snap-x snap-mandatory md:snap-none">
                {moduleData.cards.map((card, cardIdx) => {
                  const cardId = (card as { _id?: string })._id;
                  return (
                    <div key={cardIdx}
                      className="flex flex-col shrink-0 w-screen md:w-auto md:min-w-0 md:shrink whitespace-normal cursor-pointer snap-center md:snap-none"
                      onClick={() => handleCardClick(cardIdx)}
                      {...(cardId ? ve(cardId, 'service', 'title') : {})}
                    >
                      <div className="w-full h-[480px] md:h-[560px] overflow-hidden rounded-none relative group/img">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={card.image} alt={card.title}
                          className="w-full h-[480px] md:h-[560px] object-cover rounded-none block transition-transform duration-700 ease-out group-hover/img:scale-105"
                          loading="lazy"
                          {...(cardId ? ve(cardId, 'service', 'coverImage') : {})}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-all duration-300 flex items-center justify-center">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover/img:opacity-100 scale-75 group-hover/img:scale-100 transition-all duration-300">
                            <ZoomIn size={22} className="text-white" strokeWidth={1.5} />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1 mt-4 mb-8 text-center"
                        {...(cardId ? ve(cardId, 'service', 'description') : {})}>
                        <h3 className="text-gray-900 text-base md:text-lg font-bold tracking-wide uppercase">{card.title}</h3>
                        <ul className="text-[11px] md:text-xs text-gray-600 font-semibold leading-tight text-center space-y-1.5 mt-3">
                          {card.subservices.map((sub, subIdx) => (
                            <li key={subIdx} className="flex items-center justify-center gap-1.5"
                              {...(cardId ? ve(cardId, 'service', `subservices[${subIdx}].title`) : {})}>
                              <span className="w-1 h-1 rounded-full bg-[#004691] shrink-0" />
                              {sub}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>

            {/* Dot indicators — mobile */}
            <div className="md:hidden flex items-center justify-center gap-3 pb-8">
              <button onClick={() => scrollTo(Math.max(0, activeDot - 1))} className="text-gray-400 active:text-[#004691] transition-colors" aria-label="Anterior">
                <ChevronRight size={16} className="rotate-180" />
              </button>
              <div className="flex items-center gap-1.5">
                {moduleData.cards.map((_, dotIdx) => (
                  <button key={dotIdx} onClick={() => scrollTo(dotIdx)}
                    className={`rounded-full transition-all duration-300 ${dotIdx === activeDot ? 'w-5 h-1.5 bg-[#004691]' : 'w-1.5 h-1.5 bg-gray-300'}`}
                    aria-label={`Subservicio ${dotIdx + 1}`} />
                ))}
              </div>
              <button onClick={() => scrollTo(Math.min(moduleData.cards.length - 1, activeDot + 1))} className="text-gray-400 active:text-[#004691] transition-colors" aria-label="Siguiente">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* ═══ CTA SECTION ═══ */}
        <ScrollReveal animation="fade">
          <section className="relative py-16 md:py-20 bg-[#004691]">
            <div className="absolute top-0 left-0 right-0 pointer-events-none z-10" style={{ height: '11px', background: 'linear-gradient(to bottom, white 0%, rgba(255,255,255,0.8) 4px, rgba(255,255,255,0.3) 7px, #004691 11px)' }} />
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Necesitas un servicio personalizado?</h2>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">Cada proyecto es unico. Contactanos para recibir una propuesta adaptada a tus necesidades.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.a href={`https://wa.me/51944106163?text=${encodeURIComponent('Hola, necesito un servicio personalizado.')}`}
                  target="_blank" rel="noopener noreferrer"
                  className="px-8 py-3.5 bg-[#d4a017] text-[#003466] rounded-[8px] font-semibold shadow-lg inline-flex items-center gap-2"
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(212,160,23,0.35)' }} whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                  <Phone size={18} strokeWidth={1.5} /> Solicitar Cotizacion
                </motion.a>
                <motion.a href="mailto:info@example.com" target="_blank" rel="noopener noreferrer"
                  className="px-8 py-3.5 border border-white/30 text-white rounded-[8px] font-medium inline-flex items-center gap-2"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }} whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                  <Mail size={18} strokeWidth={1.5} /> Enviar Correo
                </motion.a>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </section>
    </div>
  );
}