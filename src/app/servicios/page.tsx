'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Baby, Shield, Heart, Scissors, ArrowRight, CheckCircle2,
  Stethoscope, Clock, Calendar, Phone
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

const WHATSAPP_BASE = 'https://wa.me/51983554248'

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
        ctaLabel: 'Agendar esta Ecografía',
      },
      {
        name: 'Ecografía Morfológica (Semanas 18 a 24)',
        description: 'El examen más detallado del desarrollo de tu bebé. Analizamos minuciosamente cada uno de sus órganos, su estructura ósea y su anatomía interna para confirmar que su crecimiento marche de forma óptima.',
        ctaLabel: 'Agendar esta Ecografía',
      },
      {
        name: 'Ecografía Obstétrica con Perfil Biofísico',
        description: 'Evaluamos el bienestar de tu bebé en tiempo real. Monitoreamos sus movimientos, su respiración, el tono muscular y el volumen del líquido amniótico para asegurarnos de que el entorno intrauterino sea completamente saludable.',
        ctaLabel: 'Agendar esta Ecografía',
      },
      {
        name: 'Ecografía Doppler Avanzada',
        description: 'Vital para el control de embarazos de alta complejidad. Permite evaluar de manera precisa el flujo sanguíneo de la placenta hacia el bebé, garantizando una detección oportuna de cualquier alteración circulatoria.',
        ctaLabel: 'Agendar Evaluación Doppler',
      },
      {
        name: 'Ecografías 3D, 4D y 5D (Hiperrealismo Emocional)',
        description: 'Mucho más que un diagnóstico, una experiencia familiar inolvidable. Gracias a la tecnología HD Live de última generación, podrás ver las facciones, gestos y movimientos en tiempo real de tu bebé con una nitidez e iluminación hiperrealista.',
        ctaLabel: 'Agendar Ecografía 4D/5D',
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
        ctaLabel: 'Agendar este Examen',
      },
      {
        name: 'Histerosonografía',
        description: 'Evaluación especializada y totalmente ambulatoria de la cavidad interna del útero mediante el uso combinado de ecografía y solución salina. Es una herramienta clave, rápida y cómoda para diagnosticar pólipos, miomas o investigar causas de infertilidad.',
        ctaLabel: 'Agendar Procedimiento',
      },
      {
        name: 'Biopsia de Mama Dirigida por Ecografía',
        description: 'Ante la presencia de un nódulo mamario, ofrecemos la máxima certeza diagnóstica de forma mínimamente invasiva. Guiados por ecografía en tiempo real, extraemos una muestra milimétrica con total precisión, seguridad y mínimas molestias.',
        ctaLabel: 'Solicitar Cita para Biopsia',
      },
      {
        name: 'Biopsia de Cérvix',
        description: 'Ante hallazgos anormales en tus chequeos, realizamos una toma de muestra dirigida y sumamente delicada del tejido del cuello uterino, permitiéndonos trazar el tratamiento preventivo correcto de manera inmediata.',
        ctaLabel: 'Solicitar Cita para Biopsia',
      },
    ],
  },
  {
    id: 'procedimientos-menores',
    label: 'Procedimientos Menores',
    shortLabel: 'Procedimientos',
    icon: Heart,
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
        ctaLabel: 'Consultar por este Procedimiento',
      },
      {
        name: 'Aspiración de Quistes Mamarios',
        description: 'Un procedimiento sencillo y resolutivo que se realiza directamente en el consultorio. Bajo guía ecográfica, aliviamos la presión y el dolor mamario causados por quistes líquidos de forma inmediata.',
        ctaLabel: 'Agendar en Consultorio',
      },
      {
        name: 'Marsupialización de la Glándula de Bartholino',
        description: 'Solución definitiva y ambulatoria para la inflamación o quistes molestos en la zona íntima. Este procedimiento restablece el drenaje natural de la glándula, eliminando el dolor y devolviéndote tu calidad de vida.',
        ctaLabel: 'Agendar Procedimiento',
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
        ctaLabel: 'Agendar Evaluación Integral',
      },
      {
        name: 'Histerectomía (Abdominal y Vaginal)',
        description: 'Cuando la extracción del útero es la mejor alternativa para tu salud (por miomas o sangrados severos), evaluamos el abordaje más seguro para ti. Priorizamos la vía vaginal o mínimamente invasiva para asegurar menos dolor posoperatorio y un retorno más rápido a tus actividades.',
        ctaLabel: 'Programar Consulta Quirúrgica',
      },
      {
        name: 'Cesárea Segura y Humanizada',
        description: 'El nacimiento de tu hijo en las manos más expertas. Combinamos el máximo rigor médico y de seguridad en quirófano con un enfoque respetuoso, fomentando el apego temprano y cuidando minuciosamente tu proceso de recuperación.',
        ctaLabel: 'Agendar Cesárea',
      },
      {
        name: 'Ligadura de Trompas',
        description: 'Un procedimiento de planificación familiar definitivo realizado bajo estrictos estándares de seguridad, diseñado para aquellas mujeres que han decidido cerrar su etapa reproductiva con total convicción y tranquilidad.',
        ctaLabel: 'Programar Consulta',
      },
    ],
  },
]

/* ═══════════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════════ */

function buildWhatsAppURL(serviceName: string): string {
  const msg = `Hola Consultorio Nueva Vida, deseo solicitar información y agendar una cita para *${serviceName}*.`
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(msg)}`
}

/* ═══════════════════════════════════════════════════════════════════
   SUB-NAVBAR — Sticky scroll-spy navigation + DEBOUNCE anti-jitter
   ═══════════════════════════════════════════════════════════════════ */

function SubNavbar({ categories }: { categories: typeof categories }) {
  const [activeId, setActiveId] = useState(categories[0].id)
  const navRef = useRef<HTMLDivElement>(null)
  const blockedRef = useRef(false)

  // Scroll tab into view using ONLY horizontal scrollLeft (never touches page scroll)
  const scrollTabIntoView = useCallback((catId: string) => {
    const nav = navRef.current
    if (!nav) return
    const tab = nav.querySelector(`[data-cat="${catId}"]`) as HTMLElement | null
    if (!tab) return
    // Calculate if tab is outside visible area of nav
    const navRect = nav.getBoundingClientRect()
    const tabRect = tab.getBoundingClientRect()
    const tabCenter = tabRect.left - navRect.left + tabRect.width / 2
    const navCenter = navRect.width / 2
    const diff = tabCenter - navCenter
    if (Math.abs(diff) > 20) {
      nav.scrollBy({ left: diff, behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    categories.forEach((cat) => {
      const el = document.getElementById(cat.id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          // If user clicked a tab, observer sleeps for 1 second
          if (blockedRef.current) return

          if (entry.isIntersecting) {
            setActiveId(cat.id)
            scrollTabIntoView(cat.id)
          }
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [categories, scrollTabIntoView])

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return

    // Immediately activate the clicked tab
    setActiveId(id)
    scrollTabIntoView(id)

    // Block observer for 1 full second to prevent any scroll jitter
    blockedRef.current = true
    setTimeout(() => { blockedRef.current = false }, 1000)

    // Smooth scroll to category with 150px offset
    const offset = 150
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }, [scrollTabIntoView])

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
   SERVICE CATEGORY BLOCK — Alternating image/text layout + WhatsApp CTA
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
        className="py-16 lg:py-20 scroll-mt-[150px]"
        style={{ contentVisibility: 'auto' } as React.CSSProperties}
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
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 mt-8">
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

                      {/* ═══ WhatsApp CTA — Service-Specific Booking ═══ */}
                      <div className="mt-4 pt-4 border-t border-dashed border-marine/10 flex justify-start sm:justify-start">
                        <a
                          href={buildWhatsAppURL(service.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-marine hover:bg-cyan text-white text-[13px] font-bold rounded-full px-5 py-2.5 shadow-[0_4px_12px_rgba(0,32,96,0.1)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_15px_rgba(0,176,240,0.3)] w-full sm:w-auto justify-center"
                        >
                          <Calendar className="w-4 h-4 flex-shrink-0" />
                          <span>{service.ctaLabel}</span>
                        </a>
                      </div>
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

      {/* ═══ CTA — Premium conversion section ═══ */}
      <section id="reservar" className="py-16 lg:py-20 animated-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              ¿Necesitas orientación sobre algún servicio?
            </h2>
            <p className="text-white/80 mt-4 max-w-xl mx-auto text-lg">
              Nuestro equipo está disponible para resolver tus dudas y ayudarte a elegir el servicio adecuado para ti.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <MagneticButton href="/reservas" strength={0.2}>
                <Button className="bg-white text-marine hover:bg-white/90 font-semibold rounded-full px-8 shadow-2xl shadow-black/10 text-base">
                  <Calendar className="w-5 h-5 mr-2" />
                  Agendar Cita
                </Button>
              </MagneticButton>
              <MagneticButton href="https://wa.me/51983554248?text=Hola%20Consultorio%20Nueva%20Vida%2C%20deseo%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios." strength={0.15}>
                <Button className="bg-cyan hover:bg-cyan-light text-white font-semibold rounded-full px-8 shadow-lg shadow-cyan/30 glow-cyan text-base">
                  <Phone className="w-5 h-5 mr-2" />
                  Escribir por WhatsApp
                </Button>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
