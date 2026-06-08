'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Baby, Shield, Heart, Scissors, ArrowRight, CheckCircle2,
  Stethoscope, Clock, ChevronDown, ChevronRight,
  Microscope, Syringe, Activity
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import ScrollReveal from '@/components/animations/ScrollReveal'
import MagneticButton from '@/components/animations/MagneticButton'

/* ═══════════════════════════════════════════════════════════════════
   DATA — 4 Categorías de Servicios Especializados
   ═══════════════════════════════════════════════════════════════════ */

const categories = [
  {
    id: 'unidad-ecografia',
    label: 'Ecografía y Medicina Fetal',
    shortLabel: 'Ecografía',
    icon: Baby,
    color: '#00B0F0',
    title: 'Unidad de Ecografía de Alta Precisión y Medicina Fetal',
    lead: 'Monitoreamos el milagro de la vida con la máxima rigurosidad científica y tecnología de última generación para darte total tranquilidad.',
    images: [
      { src: '/ultrasound-service.jpg', alt: 'Ecografía ginecológica de alta resolución' },
      { src: '/service-eco-obs.jpg', alt: 'Ecografía obstétrica 4D' },
    ],
    services: [
      {
        name: 'Ecografía Genética (Semanas 11 a 14)',
        description: 'Una ventana de detección temprana indispensable. Evaluamos marcadores clave en las primeras semanas para descartar riesgos cromosómicos tempranos, brindándote la paz mental que necesitas al inicio de tu embarazo.',
      },
      {
        name: 'Ecografía Morfológica (Semanas 18 a 24)',
        description: 'El examen más detallado del desarrollo de tu bebé. Analizamos minuciosamente cada uno de sus órganos, su estructura ósea y su anatomía interna para confirmar que su crecimiento marcha de forma óptima.',
      },
      {
        name: 'Ecografía Obstétrica con Perfil Biofísico',
        description: 'Evaluamos el bienestar de tu bebé en tiempo real. Monitoreamos sus movimientos, su respiración, el tono muscular y el volumen del líquido amniótico para asegurarnos de que el entorno intrauterino sea completamente saludable.',
      },
      {
        name: 'Ecografía Doppler Avanzada',
        description: 'Vital para el control de embarazos de alta complejidad. Permite evaluar de manera precisa el flujo sanguíneo de la placenta hacia el bebé, garantizando una detección oportuna de cualquier alteración circulatoria.',
      },
      {
        name: 'Ecografías 3D, 4D y 5D (Hiperrealismo Emocional)',
        description: 'Mucho más que un diagnóstico, una experiencia familiar inolvidable. Gracias a la tecnología HD Live de última generación, podrás ver las facciones, gestos y movimientos en tiempo real de tu bebé con una nitidez e iluminación hiperrealista.',
      },
    ],
  },
  {
    id: 'prevencion-diagnostico',
    label: 'Prevención y Diagnóstico',
    shortLabel: 'Prevención',
    icon: Shield,
    color: '#0046AD',
    title: 'Prevención, Diagnóstico Avanzado y Detección Oportuna',
    lead: 'Nos anticipamos a las enfermedades mediante pruebas moleculares y procedimientos de alta fidelidad diagnóstica.',
    images: [
      { src: '/servicios/histeroscopia.png', alt: 'Histeroscopía diagnóstica avanzada' },
      { src: '/servicios/histeroscopia-1.png', alt: 'Procedimiento de histeroscopia' },
    ],
    services: [
      {
        name: 'Test de COBAS (Prueba Molecular de VPH)',
        description: 'La tecnología más avanzada del mundo para la prevención del cáncer de cuello uterino. A diferencia del Papanicolaou convencional, esta prueba de ADN detecta directamente el Virus del Papiloma Humano (VPH) de alto riesgo años antes de que pueda causar una lesión.',
      },
      {
        name: 'Histerosonografía',
        description: 'Evaluación especializada y totalmente ambulatoria de la cavidad interna del útero mediante el uso combinado de ecografía y solución salina. Es una herramienta clave, rápida y cómoda para diagnosticar pólipos, miomas o investigar causas de infertilidad.',
      },
      {
        name: 'Biopsia de Mama Dirigida por Ecografía',
        description: 'Ante la presencia de un nódulo mamario, ofrecemos la máxima certeza diagnóstica de forma mínimamente invasiva. Guiados por ecografía en tiempo real, extraemos una muestra milimétrica con total precisión, seguridad y mínimas molestias.',
      },
      {
        name: 'Biopsia de Cérvix',
        description: 'Ante hallazgos anormales en tus chequeos, realizamos una toma de muestra dirigida y sumamente delicada del tejido del cuello uterino, permitiéndonos trazar el tratamiento preventivo correcto de manera inmediata.',
      },
    ],
  },
  {
    id: 'procedimientos-menores',
    label: 'Procedimientos Menores',
    shortLabel: 'Procedimientos',
    icon: Syringe,
    color: '#00B0F0',
    title: 'Procedimientos Menores y Soluciones Ambulatorias',
    lead: 'Tratamientos rápidos y efectivos diseñados para aliviar molestias comunes, cuidando tu estética y devolviéndote el confort de inmediato.',
    images: [
      { src: '/biopsy-service.jpg', alt: 'Equipamiento clínico de procedimientos ambulatorios' },
    ],
    services: [
      {
        name: 'Exéresis de Fibroadenomas de Mama',
        description: 'Extracción quirúrgica programada de nódulos benignos en la mama. Realizamos técnicas cuidadosas y respetuosas con la anatomía femenina para garantizar resultados estéticos y una óptima cicatrización.',
      },
      {
        name: 'Aspiración de Quistes Mamarios',
        description: 'Un procedimiento sencillo y resolutivo que se realiza directamente en el consultorio. Bajo guía ecográfica, aliviamos la presión y el dolor mamario causados por quistes líquidos de forma inmediata.',
      },
      {
        name: 'Marsupialización de la Glándula de Bartholino',
        description: 'Solución definitiva y ambulatoria para la inflamación o quistes molestos en la zona íntima. Este procedimiento restablece el drenaje natural de la glándula, eliminando el dolor y devolviéndote tu calidad de vida.',
      },
    ],
  },
  {
    id: 'cirugias-especializadas',
    label: 'Cirugías Ginecológicas',
    shortLabel: 'Cirugías',
    icon: Scissors,
    color: '#002060',
    title: 'Cirugías Ginecológicas y Obstétricas Especializadas',
    lead: 'Experiencia quirúrgica respaldada por años de práctica institucional, priorizando técnicas mínimamente invasivas y recuperaciones confortables.',
    images: [
      { src: '/servicios/cirugias-1.jpg', alt: 'Cirugía ginecológica especializada' },
      { src: '/servicios/cesarea-1.jpg', alt: 'Cesárea segura y humanizada' },
    ],
    services: [
      {
        name: 'Corrección de Incontinencia Urinaria de Esfuerzo',
        description: 'Recupera la libertad de reír, saltar y hacer ejercicio sin temores. Mediante procedimientos avanzados y el refuerzo del piso pélvico, devolvemos el soporte anatómico definitivo para que retomes tu rutina con total seguridad.',
      },
      {
        name: 'Histerectomía (Abdominal y Vaginal)',
        description: 'Cuando la extracción del útero es la mejor alternativa para tu salud (por miomas o sangrados severos), evaluamos el abordaje más seguro para ti. Priorizamos la vía vaginal o mínimamente invasiva para asegurar menos dolor posoperatorio y un retorno más rápido a tus actividades.',
      },
      {
        name: 'Cesárea Segura y Humanizada',
        description: 'El nacimiento de tu hijo en las manos más expertas. Combinamos el máximo rigor médico y de seguridad en quirófano con un enfoque respetuoso, fomentando el apego temprano y cuidando minuciosamente tu proceso de recuperación.',
      },
      {
        name: 'Ligadura de Trompas',
        description: 'Un procedimiento de planificación familiar definitivo realizado bajo estrictos estándares de seguridad, diseñado para aquellas mujeres que han decidido cerrar su etapa reproductiva con total convicción y tranquilidad.',
      },
    ],
  },
]

/* ═══════════════════════════════════════════════════════════════════
   SUB-NAVBAR — Sticky scroll-spy navigation
   ═══════════════════════════════════════════════════════════════════ */

function SubNavbar({ categories }: { categories: typeof categories }) {
  const [activeId, setActiveId] = useState(categories[0].id)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    categories.forEach((cat) => {
      const el = document.getElementById(cat.id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(cat.id)
            // Scroll active tab into view horizontally on mobile
            const tab = navRef.current?.querySelector(`[data-cat="${cat.id}"]`)
            tab?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
          }
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [categories])

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = 130 // navbar + sub-navbar height
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [])

  return (
    <div className="sticky top-[56px] sm:top-[60px] lg:top-[64px] z-[35] bg-white/90 backdrop-blur-xl border-b border-marine/5 shadow-[0_2px_20px_rgba(0,32,96,0.04)]">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          ref={navRef}
          className="flex items-center gap-1 overflow-x-auto py-2.5 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              data-cat={cat.id}
              onClick={() => handleClick(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                activeId === cat.id
                  ? 'bg-marine text-white shadow-md shadow-marine/20'
                  : 'text-marine/60 hover:text-marine hover:bg-marine/5'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{cat.label}</span>
              <span className="sm:hidden">{cat.shortLabel}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SERVICE CATEGORY BLOCK — Alternating image/text layout
   ═══════════════════════════════════════════════════════════════════ */

function CategoryBlock({
  category,
  index,
}: {
  category: (typeof categories)[0]
  index: number
}) {
  const isEven = index % 2 === 0
  return (
    <ScrollReveal>
      <div
        id={category.id}
        className="py-16 lg:py-20 scroll-mt-[160px]"
      >
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Header */}
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${category.color}15` }}
            >
              <category.icon className="w-5 h-5" style={{ color: category.color }} />
            </div>
            <Badge
              className="border-0 text-xs font-bold uppercase tracking-wider"
              style={{ backgroundColor: `${category.color}12`, color: category.color }}
            >
              {category.label}
            </Badge>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-marine mt-3 leading-tight">
            {category.title}
          </h3>
          <p className="text-marine/60 text-base sm:text-lg mt-3 leading-relaxed max-w-3xl">
            {category.lead}
          </p>

          {/* Body: Image + Accordion List */}
          <div className={`grid lg:grid-cols-5 gap-8 lg:gap-12 mt-8 ${!isEven ? 'lg:direction-rtl' : ''}`}>
            {/* Text / Accordion Side */}
            <div className={`lg:col-span-3 ${!isEven ? 'lg:order-2' : ''}`}>
              <Accordion type="single" collapsible className="space-y-3">
                {category.services.map((service, i) => (
                  <AccordionItem
                    key={i}
                    value={`${category.id}-item-${i}`}
                    className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,32,96,0.05)] border border-marine/5 px-5 data-[state=open]:shadow-md data-[state=open]:border-cyan/20 transition-all duration-300"
                  >
                    <AccordionTrigger className="text-marine font-semibold text-left hover:no-underline py-4 text-sm sm:text-base leading-snug [&>svg]:text-cyan [&>svg]:shrink-0 gap-3">
                      <span className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-cyan mt-0.5 flex-shrink-0" />
                        {service.name}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-marine/60 text-sm sm:text-base leading-relaxed pb-4 pl-8 sm:pl-[52px]">
                      {service.description}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Image Side */}
            <div className={`lg:col-span-2 ${!isEven ? 'lg:order-1' : ''}`}>
              <div className="space-y-4">
                {category.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative rounded-2xl overflow-hidden shadow-xl shadow-marine/10 group"
                  >
                    <div className="relative h-[220px] sm:h-[260px]">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-marine/40 via-transparent to-transparent" />
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white text-xs sm:text-sm font-medium drop-shadow-sm">{img.alt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════ */

export default function ServiciosPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section id="hero" className="relative w-full animated-gradient overflow-hidden pt-[60px] sm:pt-[68px] lg:pt-[70px] pb-20 lg:pb-28">
        <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="bg-cyan/20 text-cyan-light border-0 mb-4 px-4 py-1">
              Servicios Especializados
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Nuestros Servicios{' '}
              <span className="text-cyan-light">Especializados</span>
            </h1>
            <p className="text-white/80 mt-6 text-lg max-w-2xl mx-auto">
              Tecnología médica de vanguardia y calidez humana para proteger lo que más amas: tu salud y la de tu familia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ SUB-NAVBAR + CATEGORIES BODY ═══ */}
      <section id="servicios-especializados" className="bg-gradient-to-b from-[#FAFCFF] to-white">
        <SubNavbar categories={categories} />

        {/* Separator lines between categories */}
        <div>
          {categories.map((cat, i) => (
            <div key={cat.id}>
              <CategoryBlock category={cat} index={i} />
              {i < categories.length - 1 && (
                <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="border-t border-marine/5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section id="reservar" className="py-16 lg:py-20 bg-white">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-marine">
              ¿Necesitas orientación sobre algún servicio?
            </h2>
            <p className="text-marine/60 mt-4 max-w-xl mx-auto">
              Nuestro equipo está disponible para resolver tus dudas y ayudarte a elegir el servicio adecuado para ti.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <MagneticButton href="/reservas" strength={0.2}>
                <Button className="bg-cyan hover:bg-cyan-light text-white font-semibold rounded-full px-8 shadow-lg shadow-cyan/25 glow-cyan">
                  Agendar Cita
                </Button>
              </MagneticButton>
              <MagneticButton href="https://wa.me/51983554248" strength={0.15}>
                <Button variant="outline" className="border-royal text-royal hover:bg-royal hover:text-white rounded-full px-8">
                  Consultar por WhatsApp
                </Button>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
