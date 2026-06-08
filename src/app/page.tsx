'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Calendar, Shield, Heart, Baby, Stethoscope, ArrowRight, Star, CheckCircle2, Eye, Scissors, Microscope, Syringe, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import ScrollReveal from '@/components/animations/ScrollReveal'
import MagneticButton from '@/components/animations/MagneticButton'
import DoctorLightbox from '@/components/ui/DoctorLightbox'

/* ═══════════════════════════════════════════════════════════════════
   DATA — Services (expanded with surgical + new images)
   ═══════════════════════════════════════════════════════════════════ */
const services = [
  {
    icon: Stethoscope,
    title: 'Ecografía Ginecológica',
    description: 'Diagnóstico por imagen de alta resolución para evaluación completa del aparato reproductor femenino.',
    href: '/servicios/ecografia-ginecologica',
    image: '/ultrasound-service.jpg',
  },
  {
    icon: Baby,
    title: 'Ecografía Obstétrica',
    description: 'Control prenatal con tecnología 4D para monitorear el desarrollo de tu bebé en cada etapa.',
    href: '/servicios/ecografia-obstetrica',
    image: '/service-eco-obs.jpg',
  },
  {
    icon: Scissors,
    title: 'Cirugía Ginecológica',
    description: 'Procedimientos quirúrgicos de alta precisión con tecnología mínimamente invasiva para tu recuperación óptima.',
    href: '/servicios/cirugia-ginecologica',
    image: '/servicios/cirugias-1.jpg',
  },
  {
    icon: Activity,
    title: 'Laparoscopía',
    description: 'Cirugía laparoscópica avanzada: mínima invasión, máxima precisión y recuperación rápida.',
    href: '/servicios/laparoscopia',
    image: '/servicios/laparoscopia-3.jpg',
  },
  {
    icon: Syringe,
    title: 'Cesáreas',
    description: 'Maternidad segura con equipo especializado y tecnología de última generación para el bienestar madre e hijo.',
    href: '/servicios/cesareas',
    image: '/servicios/cesarea-1.jpg',
  },
  {
    icon: Microscope,
    title: 'Histeroscopía',
    description: 'Diagnóstico avanzado del interior uterino con equipos de alta resolución para detección precisa.',
    href: '/servicios/histeroscopia',
    image: '/servicios/histeroscopia.png',
  },
]

/* ═══════════════════════════════════════════════════════════════════
   DATA — Doctors
   ═══════════════════════════════════════════════════════════════════ */
const doctors = [
  {
    name: 'Dr. Elías',
    specialty: 'Ginecología y Obstetricia',
    description: 'Especialista en diagnóstico por imagen y control prenatal con más de 10 años de experiencia en ecografía ginecológica de alta resolución.',
    image: '/doctores/dr-elias-1.jpg',
    image2: '/doctores/dr-elias-2.jpg',
    banner: '/doctores/dr-elias-banner.jpeg',
  },
  {
    name: 'Dr. Ochoa',
    specialty: 'Cirugía Ginecológica',
    description: 'Cirujano especialista en laparoscopía y procedimientos mínimamente invasivos. Reconocido por su precisión quirúrgica y altas tasas de éxito.',
    image: '/doctores/dr-ochoa-1.jpg',
    image2: '/doctores/dr-ochoa-2.jpg',
    gallery: [
      { src: '/dr-ochoa-gallery/dr-ochoa-quir1.jpg', alt: 'Dr. Ochoa en quirófano ginecológico - Vista principal' },
      { src: '/dr-ochoa-gallery/dr-ochoa-quir2.jpg', alt: 'Precisión quirúrgica ginecológica - Dr. Ochoa' },
      { src: '/dr-ochoa-gallery/dr-ochoa-quir3.jpg', alt: 'Equipamiento y tecnología en sala de operaciones' },
      { src: '/dr-ochoa-gallery/dr-ochoa-quir4.jpg', alt: 'Equipo médico liderado por el Dr. Ochoa' },
    ],
  },
  {
    name: 'Dr. Zapata',
    specialty: 'Ginecología General',
    description: 'Médico especializado en prevención, detección temprana y tratamiento integral de patologías ginecológicas con enfoque humanista.',
    image: '/doctores/dr-zapata-1.jpg',
    image2: '/doctores/dr-zapata-2.jpg',
  },
]

/* ═══════════════════════════════════════════════════════════════════
   DATA — Dr. Ochoa Lightbox
   ═══════════════════════════════════════════════════════════════════ */
const drOchoaGalleryImages = [
  { src: '/dr-ochoa-gallery/dr-ochoa-quir1.jpg', alt: 'Dr. Ochoa en quirófano ginecológico' },
  { src: '/dr-ochoa-gallery/dr-ochoa-quir2.jpg', alt: 'Precisión quirúrgica del Dr. Ochoa' },
  { src: '/dr-ochoa-gallery/dr-ochoa-quir3.jpg', alt: 'Tecnología de última generación en sala de operaciones' },
  { src: '/dr-ochoa-gallery/dr-ochoa-quir4.jpg', alt: 'Equipo médico del Dr. Ochoa' },
]

/* ═══════════════════════════════════════════════════════════════════
   DATA — Facilities
   ═══════════════════════════════════════════════════════════════════ */
const facilities = [
  {
    src: '/instalaciones/instalacion-1.jpg',
    alt: 'Infraestructura física del Consultorio Nueva Vida',
    caption: 'Áreas de atención modernas y cómodas',
  },
  {
    src: '/instalaciones/instalacion-2.jpg',
    alt: 'Tecnología médica de última generación',
    caption: 'Equipos de diagnóstico de alta resolución',
  },
]

const stats = [
  { value: '15+', label: 'Años de Experiencia' },
  { value: '10,000+', label: 'Pacientes Atendidas' },
  { value: '98%', label: 'Satisfacción' },
  { value: '4.9', label: 'Calificación' },
]

const testimonials = [
  {
    name: 'María García',
    text: 'El Dr. Adolfo es un profesional excepcional. Me hizo sentir cómoda en todo momento y su atención fue impecable durante todo mi embarazo.',
    rating: 5,
  },
  {
    name: 'Carolina López',
    text: 'La tecnología que manejan es de primera. La ecografía 4D fue una experiencia increíble para mi familia. Totalmente recomendado.',
    rating: 5,
  },
  {
    name: 'Ana Torres',
    text: 'Excelente atención desde la recepción hasta la consulta. El ambiente es muy acogedor y profesional. Sin duda el mejor consultorio.',
    rating: 5,
  },
]

export default function HomePage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    <>
      {/* ═══ HERO SECTION ═══ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden" id="inicio">
        <div className="absolute inset-0 z-0">
          <Image src="/hero-mobile.png" alt="Nueva Vida" fill className="object-cover sm:hidden" priority quality={90} />
          <Image src="/hero-desktop.png" alt="Nueva Vida" fill className="object-cover hidden sm:block" priority quality={90} />
          <div className="absolute inset-0 bg-gradient-to-r from-marine/90 via-marine/70 to-royal/50" />
        </div>

        <div className="absolute inset-0 z-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div key={i} className="absolute w-2 h-2 rounded-full bg-cyan/30"
              style={{ left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
              animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[70px] sm:pt-[78px] lg:pt-[80px] pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="space-y-4">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan/20 text-cyan-light text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
                  Consultorio Ginecológico Especializado
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
                  Cuidamos tu{' '}<span className="text-cyan-light">Nueva Vida</span>
                </h1>
                <p className="text-lg sm:text-xl text-white/80 max-w-lg leading-relaxed">
                  Atención médica especializada con tecnología de última generación. Tu salud y bienestar están en las mejores manos.
                </p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="flex flex-wrap gap-4">
                <MagneticButton href="/reservas" strength={0.2}>
                  <Button size="lg" className="bg-cyan hover:bg-cyan-light text-white font-semibold rounded-full px-8 h-14 text-base shadow-2xl shadow-cyan/30 glow-cyan">
                    <Calendar className="w-5 h-5 mr-2" />Agendar Cita
                  </Button>
                </MagneticButton>
                <MagneticButton href="tel:+51983554248" strength={0.15}>
                  <Button size="lg" variant="outline" className="border-cyan text-cyan hover:bg-cyan hover:text-white rounded-full px-8 h-14 text-base backdrop-blur-sm transition-all duration-300">
                    <Phone className="w-5 h-5 mr-2" />Llamar Ahora
                  </Button>
                </MagneticButton>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/10">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-cyan-light">{stat.value}</div>
                    <div className="text-white/50 text-xs sm:text-sm mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Hero doctor card */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.4 }} className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-cyan/20 to-royal/20 blur-2xl" />
                <div className="relative rounded-3xl overflow-hidden glass p-1">
                  <div className="rounded-2xl overflow-hidden">
                    <Image src="/doctores/dr-ochoa-1.jpg" alt="Dr. Ochoa - Cirujano Ginecológico" width={400} height={550} className="object-cover" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-marine/90 to-transparent">
                    <h3 className="text-white font-bold text-xl">Dr. Ochoa</h3>
                    <p className="text-cyan-light text-sm">Cirugía Ginecológica Avanzada</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
            <motion.div className="w-1.5 h-1.5 rounded-full bg-cyan" animate={{ y: [0, 16, 0] }} transition={{ duration: 2, repeat: Infinity }} />
          </div>
        </motion.div>
      </section>

      {/* ═══ ABOUT SECTION ═══ */}
      <section className="py-20 lg:py-28 bg-white" id="quienes-somos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-cyan/10 to-royal/10 blur-xl" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image src="/instalaciones/instalacion-1.jpg" alt="Consultorio Nueva Vida" width={600} height={400} className="object-cover w-full" />
                </div>
                <motion.div className="absolute -bottom-6 -right-6 bg-cyan text-white rounded-2xl p-4 shadow-xl" animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                  <div className="text-center"><div className="text-3xl font-bold">15+</div><div className="text-xs opacity-80">Años</div></div>
                </motion.div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.2}>
              <div className="space-y-6">
                <div>
                  <span className="text-cyan font-semibold text-sm uppercase tracking-wider">Quiénes Somos</span>
                  <h2 className="text-3xl sm:text-4xl font-bold text-marine mt-2 leading-tight">Tu bienestar, nuestra{' '}<span className="gradient-text">misión principal</span></h2>
                </div>
                <p className="text-marine/70 text-lg leading-relaxed">
                  En <strong className="text-marine">Nueva Vida</strong>, contamos con más de 15 años de experiencia brindando atención ginecológica integral de la más alta calidad. Nuestro consultorio está equipado con tecnología de última generación para garantizar diagnósticos precisos y tratamientos efectivos.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {['Tecnología 4D', 'Ambiente Privado', 'Atención Personalizada', 'Resultados Inmediatos'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-marine/80 text-sm"><CheckCircle2 className="w-4 h-4 text-cyan flex-shrink-0" /><span>{item}</span></div>
                  ))}
                </div>
                <div className="pt-4">
                  <MagneticButton href="/salud" strength={0.15}>
                    <Button variant="outline" className="border-royal text-royal hover:bg-royal hover:text-white rounded-full px-6 transition-all duration-300">Conoce más <ArrowRight className="w-4 h-4 ml-2" /></Button>
                  </MagneticButton>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES PREVIEW — EXPANDED WITH SURGICAL ═══ */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-[#F0F7FD] to-white" id="servicios">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
              <span className="text-cyan font-semibold text-sm uppercase tracking-wider">Nuestros Servicios</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-marine mt-2">Atención especializada para tu{' '}<span className="gradient-text">salud íntima</span></h2>
              <p className="text-marine/60 mt-4 text-lg">Diagnóstico, cirugía y prevención con la más alta tecnología médica.</p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {services.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 0.06}>
                <Link href={service.href} className="block group">
                  <article className="relative rounded-2xl overflow-hidden bg-white
                    shadow-[0_4px_20px_rgba(0,32,96,0.08)]
                    group-hover:shadow-[0_20px_40px_rgba(0,32,96,0.12)]
                    group-hover:-translate-y-[6px]
                    transition-all duration-300 ease-out h-full flex flex-col">
                    <div className="relative h-40 sm:h-48 overflow-hidden">
                      <Image src={service.image} alt={service.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-marine/70 via-marine/20 to-transparent" />
                      <div className="absolute top-3 left-3 w-11 h-11 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md group-hover:bg-cyan group-hover:shadow-lg group-hover:shadow-cyan/30 transition-all duration-300">
                        <service.icon className="w-5 h-5 text-cyan group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white font-bold text-base leading-tight drop-shadow-sm">{service.title}</h3>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <p className="text-marine/60 text-[13px] leading-relaxed flex-1">{service.description}</p>
                      <div className="mt-3 pt-3 border-t border-marine/5">
                        <span className="inline-flex items-center gap-1.5 text-cyan text-sm font-semibold opacity-60 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300">
                          Conocer más <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="text-center mt-10 lg:mt-12">
            <MagneticButton href="/servicios" strength={0.15}>
              <Button className="bg-marine hover:bg-royal text-white font-semibold rounded-full px-8 shadow-lg shadow-marine/20 transition-all duration-300 hover:shadow-xl hover:shadow-marine/25">Ver Todos los Servicios <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ DR. OCHOA EXPERIENCE + LIGHTBOX ═══ */}
      <section className="py-20 lg:py-28 bg-white" id="experiencia-clinica">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="space-y-6">
                <div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 text-cyan text-xs font-bold uppercase tracking-wider">
                    Compromiso y Rigor Médico
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-marine leading-tight">
                  El Dr. Ochoa en Acción:{' '}
                  <span className="gradient-text">Alta Cirugía Ginecológica</span>
                </h2>
                <p className="text-marine/70 text-lg leading-relaxed">
                  La seguridad de nuestras pacientes es nuestra máxima prioridad. Conoce de cerca el entorno de alta tecnología y precisión quirúrgica liderado por el Dr. Ochoa en cada intervención ginecológica. Procedimientos mínimamente invasivos con resultados excepcionales.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {['Cirugía Laparoscópica', 'Mínima Invasión', 'Alta Precisión', 'Recuperación Rápida'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-marine/80 text-sm"><CheckCircle2 className="w-4 h-4 text-cyan flex-shrink-0" /><span>{item}</span></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => setLightboxOpen(true)}
                    className="inline-flex items-center gap-2 bg-marine hover:bg-royal text-white font-semibold rounded-full px-6 py-3 transition-colors duration-300"
                  >
                    <Eye className="w-4 h-4" />Ver galería de quirófano
                  </button>
                  <MagneticButton href="/reservas" strength={0.15}>
                    <Button variant="outline" className="border-marine/20 text-marine hover:bg-marine hover:text-white rounded-full px-6 transition-all duration-300">Agendar Cita <ArrowRight className="w-4 h-4 ml-2" /></Button>
                  </MagneticButton>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.15}>
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl shadow-marine/15 cursor-pointer group"
                onClick={() => setLightboxOpen(true)}
              >
                <div className="relative h-[300px] sm:h-[380px]">
                  <Image src={drOchoaGalleryImages[0].src} alt={drOchoaGalleryImages[0].alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-marine/50 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center justify-between">
                    <div>
                      <p className="text-marine font-bold text-sm">Galería del Quirófano</p>
                      <p className="text-marine/50 text-xs">{drOchoaGalleryImages.length} imágenes</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-marine flex items-center justify-center">
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ NUESTROS ESPECIALISTAS ═══ */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-[#F0F7FD] to-white" id="especialistas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
              <span className="text-cyan font-semibold text-sm uppercase tracking-wider">Nuestros Especialistas</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-marine mt-2">
                Equipo médico de{' '}<span className="gradient-text">excelencia</span>
              </h2>
              <p className="text-marine/60 mt-4 text-lg">
                Profesionales comprometidos con tu salud y bienestar, con formación especializada y experiencia comprobada.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {doctors.map((doc, i) => (
              <ScrollReveal key={doc.name} delay={i * 0.1}>
                <Card className="border-0 shadow-xl shadow-marine/8 bg-white overflow-hidden group hover:-translate-y-2 transition-all duration-300 h-full">
                  <div className="relative h-56 overflow-hidden">
                    <Image src={doc.image} alt={`Foto de perfil - ${doc.name}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-marine/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-xl">{doc.name}</h3>
                      <p className="text-cyan-light text-sm font-medium">{doc.specialty}</p>
                    </div>
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <p className="text-marine/60 text-sm leading-relaxed">{doc.description}</p>
                    {doc.gallery && (
                      <button
                        onClick={() => setLightboxOpen(true)}
                        className="inline-flex items-center gap-1.5 text-cyan text-sm font-semibold hover:underline"
                      >
                        <Eye className="w-3.5 h-3.5" />Ver galería quirúrgica
                      </button>
                    )}
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INSTALACIONES Y EQUIPAMIENTO ═══ */}
      <section className="py-20 lg:py-28 bg-white" id="instalaciones">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
              <span className="text-cyan font-semibold text-sm uppercase tracking-wider">Instalaciones</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-marine mt-2">
                Tecnología de{' '}<span className="gradient-text">última generación</span>
              </h2>
              <p className="text-marine/60 mt-4 text-lg">
                Nuestro consultorio cuenta con infraestructura moderna y equipos médicos de alta resolución para garantizar la mejor atención.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {facilities.map((facility, i) => (
              <ScrollReveal key={facility.alt} delay={i * 0.1}>
                <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-marine/8 group cursor-pointer">
                  <div className="relative h-[250px] sm:h-[320px]">
                    <Image src={facility.src} alt={facility.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 640px) 100vw, 50vw" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-marine/60 via-marine/10 to-transparent" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold text-sm drop-shadow-sm">{facility.caption}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-20 lg:py-28 bg-white" id="testimonios">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-cyan font-semibold text-sm uppercase tracking-wider">Testimonios</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-marine mt-2">Lo que dicen nuestras{' '}<span className="gradient-text">pacientes</span></h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.15}>
                <Card className="border-0 shadow-lg shadow-marine/5 bg-gradient-to-b from-white to-muted/50 h-full">
                  <CardContent className="p-8 space-y-4">
                    <div className="flex gap-1">{[...Array(t.rating)].map((_, j) => (<Star key={j} className="w-5 h-5 fill-cyan text-cyan" />))}</div>
                    <p className="text-marine/70 leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                    <div className="flex items-center gap-3 pt-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan to-royal flex items-center justify-center"><span className="text-white font-bold text-sm">{t.name.charAt(0)}</span></div>
                      <div><p className="font-semibold text-marine text-sm">{t.name}</p><p className="text-marine/50 text-xs">Paciente verificada</p></div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <section className="py-20 lg:py-28 animated-gradient relative overflow-hidden" id="cta">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">¿Lista para cuidar de tu salud?</h2>
            <p className="text-white/80 mt-6 text-lg max-w-2xl mx-auto leading-relaxed">Agenda tu cita de manera rápida y sencilla. Nuestro equipo está listo para brindarte la atención que mereces.</p>
            <div className="flex flex-wrap gap-4 justify-center mt-10">
              <MagneticButton href="/reservas" strength={0.2}>
                <Button size="lg" className="bg-white text-marine hover:bg-white/90 font-semibold rounded-full px-10 h-14 text-base shadow-2xl transition-all duration-300"><Calendar className="w-5 h-5 mr-2" />Agendar Cita Ahora</Button>
              </MagneticButton>
              <MagneticButton href="https://wa.me/51983554248?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20cita" strength={0.15}>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 h-14 text-base backdrop-blur-sm transition-all duration-300"><Phone className="w-5 h-5 mr-2" />WhatsApp</Button>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ DR. OCHOA LIGHTBOX ═══ */}
      <DoctorLightbox images={drOchoaGalleryImages} isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} />
    </>
  )
}
