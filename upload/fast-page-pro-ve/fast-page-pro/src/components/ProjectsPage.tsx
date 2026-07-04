'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import {
  MapPin, Maximize2, Calendar, Building2, Eye, ArrowRight, MessageCircle,
  ChevronLeft, ChevronRight, Play, X, Ruler, Briefcase, Users,
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import Lightbox from '@/components/Lightbox';
import type { SanityProject } from '@/lib/sanity.client';
import { getImageUrl, plainText, getVideoUrl } from '@/lib/sanity.client';
import { ve } from '@/lib/ve';

/* ═══════════════════════════════════════════════════
   PROPS
   ═══════════════════════════════════════════════════ */
interface ProjectsPageProps {
  projects?: SanityProject[] | null;
}

/* ═══════════════════════════════════════════════════
   CATEGORIES
   ═══════════════════════════════════════════════════ */
const categories = ['Todos', 'Comercial', 'Salud', 'Residencial'];

/* ═══════════════════════════════════════════════════
   FALLBACK PROJECT DATA
   ═══════════════════════════════════════════════════ */
const fallbackProjects = [
  {
    id: 1, slug: 'plaza-central', title: 'Centro Comercial Plaza Central', category: 'Comercial',
    location: 'Lima, Perú', area: '15,000 m²', year: '2023', client: 'Inversiones SAC', status: 'Completado',
    commerce: 'Retail & Gastronomía',
    description: 'Un complejo comercial de tres niveles que integra retail, entretenimiento y gastronomía bajo un concepto arquitectónico moderno y sostenible. El diseño prioriza la circulación fluida y la experiencia del visitante con espacios abiertos iluminados naturalmente. La fachada combina paneles de vidrio templado con elementos de concreto expuesto, creando una identidad visual contemporánea que se integra con el entorno urbano del distrito financiero.',
    images: [
      'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1200&q=80',
      'https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=800&q=80',
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80',
      'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80',
    ],
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: 2, slug: 'clinica-san-rafael', title: 'Clínica San Rafael', category: 'Salud',
    location: 'Bogotá, Colombia', area: '8,500 m²', year: '2022', client: 'Grupo Salud Integral', status: 'Completado',
    commerce: 'Salud & Bienestar',
    description: 'Una clínica de alta complejidad diseñada para optimizar los flujos clínicos y ofrecer un ambiente terapéutico. Las áreas de espera se concibieron como jardines interiores que promueven la calma y el bienestar de pacientes y acompañantes. La iluminación natural controlada y los materiales antimicrobianos garantizan un espacio que equilibra funcionalidad hospitalaria con confort humano.',
    images: [
      'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1200&q=80',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80',
    ],
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: 3, slug: 'residencial-los-cedros', title: 'Residencial Los Cedros', category: 'Residencial',
    location: 'La Molina, Lima', area: '3,200 m²', year: '2024', client: 'Privado', status: 'En Proceso',
    commerce: 'Residencial Premium',
    description: 'Vivienda unifamiliar contemporánea que fusiona la calidez del hogar con líneas arquitectónicas audaces. Grandes ventanales de piso a techo conectan el interior con el jardín, creando una experiencia de vida íntegra con la naturaleza circundante. La cubierta verde inclinada y los sistemas de captación pluvial reflejan un compromiso con la sostenibilidad ambiental.',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    ],
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: 4, slug: 'oficinas-torre-andina', title: 'Oficinas Torre Andina', category: 'Comercial',
    location: 'Quito, Ecuador', area: '6,000 m²', year: '2023', client: 'Corporación Andina', status: 'Completado',
    commerce: 'Corporate Offices',
    description: 'Torre de oficinas corporativas con certificación LEED Gold. El diseño incorpora bioclimatismo, paneles solares y jardines verticales. Los espacios de coworking y terrazas verdes fomentan la colaboración y el bienestar laboral. La estructura de acero y vidrio de alta eficiencia térmica reduce el consumo energético en un 35% comparado con edificaciones convencionales.',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
    ],
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: 5, slug: 'hospital-metropolitano', title: 'Hospital Metropolitano', category: 'Salud',
    location: 'Guayaquil, Ecuador', area: '22,000 m²', year: '2024', client: 'Ministerio de Salud', status: 'En Proceso',
    commerce: 'Salud Pública',
    description: 'Proyecto hospitalario de gran escala con 200 camas. El diseño modular permite futuras ampliaciones, mientras que la eficiencia energética y la iluminación natural son pilares fundamentales de la concepción espacial. Los pasillos amplios, las zonas de descanso interior y la señalización visual basada en colores naturales facilitan la orientación de pacientes y visitantes.',
    images: [
      'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80',
      'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    ],
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: 6, slug: 'casa-del-lago', title: 'Casa del Lago', category: 'Residencial',
    location: 'Cusco, Perú', area: '1,800 m²', year: '2023', client: 'Privado', status: 'Completado',
    commerce: 'Residencial de Lujo',
    description: 'Residencia de lujo junto al lago que integra materiales locales como piedra andina y madera de eucalipto en un diseño contemporáneo. La casa se organiza en volúmenes escalonados que se adaptan a la topografía del terreno. El sistema de calefacción radiante y la orientación solar pasiva permiten confort térmico durante todo el año en altitud.',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    ],
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
];

const SWIPE_THRESHOLD = 50;

/* ═══════════════════════════════════════
   MERGED PROJECT TYPE (CMS or fallback)
   ═══════════════════════════════════════ */
type MergedProject = Omit<typeof fallbackProjects[0], 'id'> & { id: number | string; _id?: string; videoWebmUrl?: string };

/* ═══════════════════════════════════════
   VIDEO LIGHTBOX — Premium modal with Framer Motion
   ═══════════════════════════════════════ */
function VideoLightbox({ isOpen, onClose, videoUrl, videoWebmUrl }: { isOpen: boolean; onClose: () => void; videoUrl: string; videoWebmUrl?: string }) {
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const isDirectVideo = videoUrl && (videoUrl.endsWith('.mp4') || videoUrl.endsWith('.webm') || videoUrl.includes('.mp4?') || videoUrl.includes('.webm?') || videoUrl.includes('/file-'));

  const embedUrl = videoUrl
    ?.replace('youtube.com/watch?v=', 'youtube.com/embed/')
    .replace('youtu.be/', 'youtube.com/embed/')
    .replace('vimeo.com/', 'player.vimeo.com/video/');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-[150] flex items-center justify-center p-4 md:p-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-[160] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-all duration-200 active:scale-90"
            aria-label="Cerrar video"
          >
            <X size={22} strokeWidth={2} />
          </button>

          <motion.div
            className="relative w-full max-w-5xl aspect-video bg-black shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 260, damping: 25 } }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {isDirectVideo ? (
              <video
                key={videoUrl}
                ref={(el) => {
                  if (el) {
                    const tryPlay = () => { if (el.paused) el.play().catch(() => {}); };
                    tryPlay();
                    el.addEventListener('canplay', tryPlay, { once: true });
                    el.addEventListener('loadeddata', tryPlay, { once: true });
                  }
                }}
                className="w-full h-full object-contain"
                autoPlay muted loop playsInline
                controls
                preload="auto"
              >
                <source src={videoUrl} />
                {videoWebmUrl && <source src={videoWebmUrl} />}
              </video>
            ) : (
              <iframe
                src={`${embedUrl}?autoplay=1&rel=0`}
                className="w-full h-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                title="Video del proyecto"
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════
   PROJECT CARD — Cinematic collage layout
   ═══════════════════════════════════════════════════ */
function ProjectCard({
  project, isMobile, openLightboxFn,
}: {
  project: MergedProject;
  isMobile: boolean;
  openLightboxFn: (images: string[], index: number) => void;
}) {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [hoveredImg, setHoveredImg] = useState<number | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const didSwipeRef = useRef(false);

  const totalImages = project.images.length;

  const handleSwipe = useCallback(
    (info: PanInfo) => {
      if (info.offset.x < -SWIPE_THRESHOLD) {
        setCurrentImgIdx((i) => Math.min(i + 1, totalImages - 1));
      } else if (info.offset.x > SWIPE_THRESHOLD) {
        setCurrentImgIdx((i) => Math.max(i - 1, 0));
      }
    },
    [totalImages],
  );

  const specs = [
    { icon: MapPin, label: 'Ubicación', value: project.location },
    { icon: Ruler, label: 'Medida', value: project.area },
    { icon: Briefcase, label: 'Comercio', value: project.commerce },
    { icon: Users, label: 'Cliente', value: project.client },
  ];

  return (
    <article id={`project-${project.slug}`} className="group w-full max-w-7xl mx-auto" {...(project._id ? ve(project._id, 'project', 'title') : {})}>
      {/* ══════════════════════════════════════════════
          BLOCK 1: HYBRID GRID — Main 70% + Video 30% — Full Bleed
          ══════════════════════════════════════════════ */}
      <div className="flex w-full gap-0 h-[280px] sm:h-[400px] md:h-[550px]">
        {/* LEFT: Main Cover Image — 70% */}
        <div
          className="relative overflow-hidden w-[70%] h-full cursor-pointer rounded-none"
          onClick={() => openLightboxFn(project.images, 0)}
          {...(project._id ? ve(project._id, 'project', 'coverImage') : {})}
        >
          <motion.div
            className="w-full h-full"
            drag={isMobile && totalImages > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragStart={() => { didSwipeRef.current = false; }}
            onDrag={(_, info) => { if (Math.abs(info.offset.x) > 8) didSwipeRef.current = true; }}
            onDragEnd={(_, info) => {
              if (didSwipeRef.current) handleSwipe(info);
              didSwipeRef.current = false;
            }}
            onTap={() => { if (!didSwipeRef.current) openLightboxFn(project.images, currentImgIdx); }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={currentImgIdx}
                src={project.images[currentImgIdx]}
                alt={`${project.title} — Imagen principal`}
                className="w-full h-full object-cover rounded-none"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                loading="lazy"
                draggable={false}
              />
            </AnimatePresence>
          </motion.div>

          {/* Hover overlay — Abrir Galería */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2 px-6 py-3 bg-white/0 group-hover:bg-white/15 backdrop-blur-sm rounded-xl border border-transparent group-hover:border-white/25 transition-all duration-500 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100">
              <Eye size={20} strokeWidth={1.5} className="text-white" />
              <span className="text-white font-semibold text-sm tracking-wide">Galería</span>
            </div>
          </div>

          {/* Mobile dot indicators */}
          {totalImages > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 md:hidden">
              {project.images.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === currentImgIdx ? 'w-5 bg-white' : 'w-1.5 bg-white/50'}`}
                />
              ))}
            </div>
          )}

          {/* Mobile prev/next chevrons */}
          {totalImages > 1 && (
            <>
              {currentImgIdx > 0 && (
                <button onClick={(e) => { e.stopPropagation(); setCurrentImgIdx((i) => i - 1); }} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white md:hidden" aria-label="Anterior"><ChevronLeft size={18} strokeWidth={2} /></button>
              )}
              {currentImgIdx < totalImages - 1 && (
                <button onClick={(e) => { e.stopPropagation(); setCurrentImgIdx((i) => i + 1); }} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white md:hidden" aria-label="Siguiente"><ChevronRight size={18} strokeWidth={2} /></button>
              )}
            </>
          )}
        </div>

        {/* RIGHT: Video Container — 30% — Same height */}
        <div
          className="relative overflow-hidden w-[30%] h-full bg-[#001C3D] rounded-none"
          {...(project._id ? ve(project._id, 'project', 'videoMp4') : {})}
        >
          {project.video ? (
            <>
              {/* Actual <video> element — autoplay on scroll via IntersectionObserver */}
              <video
                key={project.video}
                ref={(el) => {
                  if (!el) return;
                  const tryPlay = () => { if (el.paused) el.play().catch(() => {}); };
                  tryPlay();
                  el.addEventListener('canplay', tryPlay, { once: true });
                  el.addEventListener('loadeddata', tryPlay, { once: true });
                  const observer = new IntersectionObserver(
                    (entries) => {
                      entries.forEach((entry) => {
                        if (entry.isIntersecting) { el.play().catch(() => {}); }
                        else { el.pause(); }
                      });
                    },
                    { threshold: 0.4 }
                  );
                  observer.observe(el);
                  (el as HTMLVideoElement & { _veObserver?: IntersectionObserver })._veObserver = observer;
                }}
                className="w-full h-full object-cover rounded-none"
                autoPlay muted loop playsInline
                poster={project.images[1]}
                preload="auto"
                onClick={(e) => { e.stopPropagation(); setVideoOpen(true); }}
              >
                <source src={project.video} />
                {project.videoWebmUrl && <source src={project.videoWebmUrl} />}
              </video>

              {/* Semi-transparent overlay for status badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Video label */}
              <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 pointer-events-none">
                <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-md border border-white/15 text-white text-[10px] font-medium">
                  <Play size={10} fill="white" />
                  Video
                </span>
              </div>
            </>
          ) : (
            <>
              {/* Fallback: no video — show poster image + play icon */}
              <img
                src={project.images[1]}
                alt={`${project.title} — Video`}
                className="w-full h-full object-cover rounded-none opacity-60 group-hover/video:opacity-40 transition-opacity duration-500 cursor-pointer"
                loading="lazy"
                draggable={false}
                onClick={(e) => { e.stopPropagation(); setVideoOpen(true); }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10 cursor-pointer" onClick={(e) => { e.stopPropagation(); setVideoOpen(true); }} />
              <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={(e) => { e.stopPropagation(); setVideoOpen(true); }}>
                <motion.div
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center group-hover/video:scale-110 transition-all duration-300"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg shadow-black/30">
                    <Play size={18} strokeWidth={2.5} className="text-[#004691] ml-0.5" fill="#004691" />
                  </div>
                </motion.div>
              </div>
              <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4">
                <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-md border border-white/15 text-white text-[10px] font-medium">
                  <Play size={10} fill="white" />
                  Video
                </span>
              </div>
            </>
          )}

          {/* Status Badge — top right */}
          <div className="absolute top-3 right-3 pointer-events-none">
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase ${
              project.status === 'Completado' ? 'bg-emerald-500/90 text-white' : 'bg-amber-500/90 text-white'
            }`} style={{ pointerEvents: 'none' }}>
              {project.status}
            </span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          BLOCK 2: SECONDARY GALLERY — 4x25% Full Bleed Seamless
          ══════════════════════════════════════════════ */}
      <div className="grid grid-cols-4 gap-0 w-full h-[100px] sm:h-[140px] md:h-[180px]" {...(project._id ? ve(project._id, 'project', 'gallery') : {})}>
        {project.images.map((img, i) => (
          <div
            key={i}
            className="relative overflow-hidden h-full cursor-pointer group/img rounded-none"
            onMouseEnter={() => setHoveredImg(i)}
            onMouseLeave={() => setHoveredImg(null)}
            onClick={() => openLightboxFn(project.images, i)}
          >
            <img
              src={img}
              alt={`${project.title} — Imagen ${i + 1}`}
              className={`w-full h-full object-cover rounded-none transition-transform duration-500 ${hoveredImg === i ? 'scale-105' : 'scale-100'}`}
              loading="lazy"
              draggable={false}
            />
            {/* Hover overlay */}
            <div className={`absolute inset-0 bg-black/0 group-hover/img:bg-black/25 transition-all duration-300 flex items-center justify-center ${hoveredImg === i ? 'opacity-100' : 'opacity-0'}`}>
              <Maximize2 size={20} strokeWidth={1.5} className="text-white opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════════
          BLOCK 3: TECHNICAL SHEET — Compact V4 Premium
          ══════════════════════════════════════════════ */}
      <div className="mt-6 md:mt-8 w-full">
        {/* Massive uppercase title — clickable link to detail page */}
        <Link href={`/proyectos/${project.slug}`} className="block group/title">
          <h2 className="text-[#004691] text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black tracking-tight uppercase leading-[1.05] mb-1 group-hover/title:text-[#d4a017] transition-colors duration-300">
            {project.title}
          </h2>
        </Link>

        {/* Category + Year */}
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <span className="px-3 py-1 bg-[#004691]/10 text-[#004691] text-xs font-bold rounded-lg tracking-wider uppercase">
            {project.category}
          </span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-500 text-xs font-medium tracking-wide">{project.year}</span>
        </div>

        {/* Description + Specs — 12-column grid, compact gaps */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-start">
          {/* Left Block: Description — 7 cols */}
          <div className="md:col-span-7 text-left text-gray-700 text-sm md:text-[14.5px] leading-snug space-y-1.5 mt-0" {...(project._id ? ve(project._id, 'project', 'description') : {})}>
            <p className="font-medium">
              {project.description}
            </p>
            <button
              onClick={() => openLightboxFn(project.images, 0)}
              className="mt-3 inline-flex items-center gap-2 text-[#004691] font-semibold text-sm hover:text-[#d4a017] transition-colors group/btn"
            >
              Ver galería completa <ArrowRight size={16} strokeWidth={1.5} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Block: Icon spheres — 5 cols with vertical border separator */}
          <div className="md:col-span-5 flex justify-between items-start w-full gap-2 pl-0 md:pl-4 mt-0 border-l-2 border-gray-200">
            {specs.map((spec, j) => (
              <div key={j} className="flex flex-col items-center text-center space-y-0.5 flex-1">
                {/* Sphere — enlarged */}
                <div className="w-14 h-14 md:w-16 md:h-16 bg-[#004691] rounded-full flex items-center justify-center text-white mb-2 shadow-md transition-transform duration-300 group-hover:scale-105">
                  <spec.icon size={22} strokeWidth={2.5} className="text-white" />
                </div>
                {/* Label below sphere */}
                <p className="text-gray-900 text-[10px] md:text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">
                  {spec.label}
                </p>
                {/* Value below label */}
                <p className="text-gray-500 text-[10px] md:text-[11px] leading-tight font-medium mt-0.5 text-center max-w-[80px] md:max-w-[100px]">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Separator line */}
      <div className="mt-16 md:mt-20 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* Video Lightbox */}
      <VideoLightbox
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoUrl={project.video}
        videoWebmUrl={project.videoWebmUrl}
      />
    </article>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN PROJECTS PAGE
   ═══════════════════════════════════════════════════ */
export default function ProjectsPage({ projects: cmsProjects }: ProjectsPageProps) {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [isMobile, setIsMobile] = useState(false);

  /* Merge CMS data with fallback */
  const projects: MergedProject[] = useMemo(() => {
    if (cmsProjects?.length) {
      return cmsProjects.map(p => {
        const slug = typeof p.slug === 'string' ? p.slug : (p.slug as { current?: string })?.current || '';
        const galleryUrls = p.gallery?.map(img => getImageUrl(img, 1200, 800) || '').filter(Boolean) || [];
        const coverUrl = getImageUrl(p.coverImage, 1200, 800) || '';
        const images = galleryUrls.length > 0 ? galleryUrls : (coverUrl ? [coverUrl] : fallbackProjects[0].images);
        return {
          id: p._id || '',
          slug,
          title: p.title,
          category: p.tags?.[0] || 'Proyecto',
          location: p.location || '',
          area: p.area ? `${p.area} m²` : '',
          year: p.year || '',
          client: p.client || '',
          status: p.status === 'completed' ? 'Completado' : p.status === 'in-progress' ? 'En Proceso' : 'Planificado',
          commerce: p.service?.title || '',
          description: plainText(p.description) || '',
          images,
          video: getVideoUrl(p.videoMp4) || getVideoUrl(p.videoWebm) || '',
          videoWebmUrl: getVideoUrl(p.videoWebm) || undefined,
          _id: p._id,
        };
      });
    }
    return fallbackProjects;
  }, [cmsProjects]);

  /* Lightbox state */
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* Scroll to project from hash */
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    const project = projects.find((p) => p.slug === hash);
    if (project) {
      setActiveCategory('Todos');
      const timer = setTimeout(() => {
        const el = document.getElementById(`project-${project.slug}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          el.style.transition = 'box-shadow 0.3s ease';
          el.style.boxShadow = '0 0 0 3px #d4a017, 0 0 30px rgba(212,160,23,0.3)';
          setTimeout(() => { el.style.boxShadow = ''; }, 2000);
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const filteredProjects =
    activeCategory === 'Todos' ? projects : projects.filter((p) => p.category === activeCategory);

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);

  return (
    <div>
      {/* ======== HERO HEADER ======== */}
      <section className="relative w-full bg-[#004691] overflow-hidden" style={{ minHeight: '40vh' }}>
        <div className="absolute top-0 right-0 w-60 h-60 border border-white/5 rotate-45 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-40 h-40 border border-[#d4a017]/8 -rotate-12 translate-y-1/3 -translate-x-1/4" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'url(/brand-pattern-tile.png)', backgroundRepeat: 'repeat', backgroundSize: '1086px 177px', opacity: 0.02 }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-[120px] md:pt-[130px] pb-16 md:pb-20">
          <ScrollReveal animation="fade-down" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[8px] bg-white/10 border border-white/15 mb-4">
              <Building2 size={14} strokeWidth={1.5} className="text-[#d4a017]" />
              <span className="text-white/80 text-xs tracking-widest uppercase">Portafolio</span>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.2}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.25)' }}>
              Nuestros Proyectos
            </h1>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.3}>
            <p className="text-sm md:text-base text-white max-w-2xl mx-auto leading-relaxed mb-6" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.2)' }}>
              Cada proyecto es un testimonio de nuestro compromiso con la excelencia, la innovación y la satisfacción de nuestros clientes.
            </p>
          </ScrollReveal>
        </div>
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '11px', background: 'linear-gradient(to top, #f7f8fa 0%, rgba(247,248,250,0.8) 4px, rgba(247,248,250,0.3) 7px, #004691 11px)' }} />
      </section>

      {/* ======== FILTER + GALLERY ======== */}
      <div className="brand-pattern-wrapper bg-[#f7f8fa]">
        {/* Category filter */}
        <section className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#f7f8fa] to-transparent pointer-events-none z-20 md:hidden" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#f7f8fa] to-transparent pointer-events-none z-20 md:hidden" />
          <div className="max-w-7xl mx-auto relative z-10">
            <ScrollReveal animation="fade-up" delay={0.15}>
              <div className="flex overflow-x-auto whitespace-nowrap scrollbar-none justify-start md:justify-center items-center py-8 md:py-10 border-b border-gray-200/60 px-4 md:px-0">
                {categories.map((cat, i) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative text-sm sm:text-base font-semibold tracking-[0.15em] uppercase transition-all duration-300 px-4 sm:px-6 lg:px-8 py-3 shrink-0 ${
                      activeCategory === cat ? 'text-[#004691]' : 'text-[#999] hover:text-[#4A4A4A]'
                    }`}
                  >
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] rounded-full transition-all duration-300 ${
                      activeCategory === cat ? 'w-8 bg-[#d4a017]' : 'w-0 bg-[#d4a017]'
                    }`} />
                    {cat}
                    {i < categories.length - 1 && (
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 select-none pointer-events-none hidden md:inline">/</span>
                    )}
                  </button>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Projects — Cinematic collage layout */}
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="space-y-0"
              >
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isMobile={isMobile}
                    openLightboxFn={openLightbox}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Load More CTA */}
            <div className="text-center mt-16 px-4 md:px-0">
              <ScrollReveal animation="scale">
                <button className="px-10 py-4 bg-[#004691] text-white rounded-[8px] font-semibold hover:bg-[#0062b8] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.03] inline-flex items-center gap-2">
                  Cargar Más Proyectos <ArrowRight size={18} strokeWidth={1.5} />
                </button>
              </ScrollReveal>
            </div>

            {/* WhatsApp CTA */}
            <div className="text-center mt-12 px-4 md:px-0">
              <ScrollReveal animation="fade-up" delay={0.15}>
                <a
                  href={`https://wa.me/51944106163?text=${encodeURIComponent('Hola, estuve revisando su portafolio de proyectos y me interesa cotizar un desarrollo arquitectónico similar.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-[8px] font-semibold shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
                >
                  <MessageCircle size={20} strokeWidth={1.5} />
                  Cotizar Proyecto Similar
                </a>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </div>

      <Lightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
      />
    </div>
  );
}
