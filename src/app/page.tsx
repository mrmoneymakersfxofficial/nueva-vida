'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Calendar, Baby, Stethoscope, ArrowRight, Star, CheckCircle2, Eye, Scissors, Microscope, Syringe, Activity, ChevronDown, GraduationCap, Globe, MapPin } from 'lucide-react'
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

const mentorships = [
  {
    title: 'Alta Especialización en Ginecología Funcional',
    institution: 'Sociedad Argentina de Ginecología y Estética (SARGE)',
    location: 'Buenos Aires, Argentina',
    flag: '🇦🇷',
    image: '/doctores/dr-elias-1.jpg',
    galleryImages: ['/doctores/dr-elias-1.jpg', '/doctores/dr-elias-2.jpg', '/doctores/dr-elias-banner.jpeg'],
    description: 'Certificación avanzada y entrenamiento médico en tecnologías aplicadas a la ginecología funcional, cursado bajo la tutela directa del Dr. Jorge Elías, referente e ícono de la medicina funcional en Sudamérica.',
  },
  {
    title: 'Cirugía Avanzada de Piso Pélvico',
    institution: 'Fundación Universitaria de Ciencias de la Salud (FUCS)',
    location: 'Cúcuta, Colombia',
    flag: '🇨🇴',
    image: '/doctores/dr-ochoa-1.jpg',
    galleryImages: ['/doctores/dr-ochoa-1.jpg', '/doctores/dr-ochoa-2.jpg', '/doctores/dr-ochoa-3.jpg'],
    galleryLabel: 'Ver galería quirúrgica',
    description: 'Perfeccionamiento de técnicas quirúrgicas de vanguardia en prolapso genital, incontinencia urinaria y reparación sitio específica, entrenado por el Dr. Álvaro Ochoa, uno de los máximos expositores de piso pélvico en Colombia y Sudamérica.',
  },
  {
    title: 'Medicina Fetal y Ecografía Compleja',
    institution: 'Escuela de Ultrasonido ECO IMAGEN',
    location: 'Lima, Perú',
    flag: '🇵🇪',
    image: '/doctores/dr-zapata-1.jpg',
    galleryImages: ['/doctores/dr-zapata-1.jpg', '/doctores/dr-zapata-2.jpg'],
    description: 'Sólida preparación experta en neurosonografía, ecocardiografía fetal y Doppler avanzado para el manejo de embarazos de alto riesgo, estudios realizados junto al reconocido especialista Dr. Josué Zapata.',
  },
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
  const [accordionOpen, setAccordionOpen] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImages, setLightboxImages] = useState<{ src: string; alt: string }[]>([])

  return (
    <>
      {/* ═══ HERO SECTION — FULL-BLEED 100% ═══ */}
      <section className="relative w-full min-h-screen min-h-[100dvh] flex items-center overflow-hidden" id="inicio">
        {/* BACKGROUND LAYER — Edge-to-edge image + gradient */}
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

        {/* CONTENT WRAPPER — Constrained to 1200px for readability */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-[70px] sm:pt-[78px] lg:pt-[80px] pb-20">
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

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.4 }} className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-cyan/20 to-royal/20 blur-2xl" />
                <div className="relative rounded-3xl overflow-hidden glass p-1">
                  <div className="rounded-2xl overflow-hidden">
                    <Image src="/doctores/dr-elias-1.jpg" alt="Dr. Adolfo Herencia Barrios - Especialista en Ginecología y Obstetricia" width={400} height={550} className="object-cover" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-marine/90 to-transparent">
                    <h3 className="text-white font-bold text-xl">Dr. Adolfo Herencia Barrios</h3>
                    <p className="text-cyan-light text-sm">Ginecología y Obstetricia</p>
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
        {/* Section transition: dark → white */}
        <div className="hero-fade-bottom" />
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

      {/* ═══ NUESTRO ESPECIALISTA — Dr. Adolfo Herencia Barrios ═══ */}
      <section className="py-20 lg:py-28 bg-white" id="nuestro-especialista">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-start">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-cyan/15 to-royal/15 blur-2xl" />
                <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-marine/10">
                  <Image src="/doctores/dr-elias-1.jpg" alt="Dr. Adolfo Herencia Barrios" width={500} height={620} className="object-cover w-full h-auto" priority />
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-marine/90 via-marine/40 to-transparent">
                    <span className="inline-flex items-center gap-2 bg-cyan/20 text-cyan-light text-xs font-bold px-4 py-1.5 rounded-full backdrop-blur-sm">
                      <Stethoscope className="w-3.5 h-3.5" />+10 Años de Experiencia
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-5">
                <div>
                  <span className="text-cyan font-bold text-xs uppercase tracking-widest">Médico Especialista Principal</span>
                  <h2 className="text-3xl sm:text-4xl font-bold text-marine mt-2 leading-tight">Dr. Adolfo Herencia Barrios</h2>
                  <p className="text-royal font-semibold mt-3 text-base lg:text-lg leading-relaxed">Garantizando tu bienestar en cada etapa de la vida con medicina de vanguardia, precisión diagnóstica y calidez humana.</p>
                </div>
                <div className="bg-[#F8F9FA] rounded-xl border border-[#E9ECEF] overflow-hidden">
                  <button onClick={() => setAccordionOpen(accordionOpen === 1 ? 0 : 1)} className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-marine hover:bg-[#F0F4FA] transition-colors duration-200">
                    <span className="text-sm sm:text-base">Presentación Profesional</span>
                    <ChevronDown className={`w-5 h-5 text-cyan flex-shrink-0 ml-3 transition-transform duration-300 ${accordionOpen === 1 ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {accordionOpen === 1 && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                        <div className="px-5 pb-5 text-marine/70 text-sm sm:text-[15px] leading-relaxed">Soy el Dr. Adolfo Herencia Barrios, médico gineco-obstetra comprometido firmemente con la salud integral y el bienestar de la mujer. Entiendo que acudir al ginecólogo es un acto de confianza absoluta; por ello, mi enfoque combina una atención empática y personalizada con el respaldo de más de una década de sólida experiencia clínica y quirúrgica en los principales centros hospitalarios de nuestra región. Mi práctica se distingue por una constante actualización científica a nivel internacional, orientada a ofrecer los tratamientos menos invasivos, más seguros y avanzados en la especialidad de ginecología y obstetricia.</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="bg-[#F8F9FA] rounded-xl border border-[#E9ECEF] overflow-hidden">
                  <button onClick={() => setAccordionOpen(accordionOpen === 2 ? 0 : 2)} className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-marine hover:bg-[#F0F4FA] transition-colors duration-200">
                    <span className="text-sm sm:text-base">Pilares y Especialidades de Vanguardia</span>
                    <ChevronDown className={`w-5 h-5 text-cyan flex-shrink-0 ml-3 transition-transform duration-300 ${accordionOpen === 2 ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {accordionOpen === 2 && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                        <div className="px-5 pb-5 space-y-5">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-cyan/10 flex items-center justify-center flex-shrink-0"><Globe className="w-4 h-4 text-cyan" /></div>
                              <h4 className="font-bold text-marine text-sm">Formación y Alta Especialización Internacional</h4>
                            </div>
                            <p className="text-marine/70 text-sm leading-relaxed pl-10">Con el propósito de traer la medicina del más alto nivel a mis pacientes, he complementado mi especialización con entrenamientos avanzados fuera de nuestras fronteras. Cuento con certificación en Buenos Aires, Argentina, por la <strong className="text-marine">Sociedad Argentina de Ginecología y Estética (SARGE)</strong>, especializándome en tecnologías aplicadas a la ginecología funcional; estudios de alta especialización realizados junto al <strong className="text-marine">Dr. Jorge Elías</strong> (referente de la medicina funcional en Argentina y Sudamérica). Asimismo, me capacité en la <strong className="text-marine">Fundación Universitaria de Ciencias de la Salud (FUCS)</strong> en Cúcuta, Colombia, perfeccionando técnicas avanzadas de cirugía ginecológica en prolapso genital, incontinencia urinaria de esfuerzo, reparación sitio específica e histerectomía sin prolapso, bajo la mentoría del <strong className="text-marine">Dr. Álvaro Ochoa</strong> (referente y uno de los máximos expositores de piso pélvico en Colombia y Sudamérica).</p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-cyan/10 flex items-center justify-center flex-shrink-0"><Microscope className="w-4 h-4 text-cyan" /></div>
                              <h4 className="font-bold text-marine text-sm">Histeroscopia Avanzada y Cirugía Mínimamente Invasiva</h4>
                            </div>
                            <p className="text-marine/70 text-sm leading-relaxed pl-10">Cuento con un riguroso entrenamiento intensivo de nivel avanzado (Hands-On) en histeroscopia tanto de consultorio (utilizando el reconocido equipo Bettocchi) como de quirófano con resectoscopio. Este enfoque de vanguardia me permite diagnosticar y tratar de forma directa patologías dentro del útero sin necesidad de recurrir a grandes cirugías abiertas, asegurando intervenciones rápidas, seguras y con una recuperación extraordinariamente cómoda para ti.</p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-cyan/10 flex items-center justify-center flex-shrink-0"><Baby className="w-4 h-4 text-cyan" /></div>
                              <h4 className="font-bold text-marine text-sm">Ecografía Obstétrica Compleja y Medicina Fetal</h4>
                            </div>
                            <p className="text-marine/70 text-sm leading-relaxed pl-10">El cuidado de una nueva vida exige la máxima exactitud diagnóstica. Poseo una sólida formación experta en ecografía morfológica avanzada del primer y segundo trimestre, ecografía Doppler avanzada, ecocardiografía y neurosonografía fetal, estudios realizados bajo la tutela del <strong className="text-marine">Dr. Josué Zapata</strong> (especialista en medicina fetal y estudios ecográficos de alta complejidad, en su escuela ECO IMAGEN). Esta preparación técnica, sumada a mi acreditación en Cirugía Obstétrica de Alta Complejidad por el <strong className="text-marine">Instituto Nacional Materno Perinatal (Maternidad de Lima)</strong>, me permite realizar un seguimiento minucioso y proteger la salud de la madre y del bebé, incluso en embarazos de alto riesgo.</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="bg-[#F8F9FA] rounded-xl border border-[#E9ECEF] overflow-hidden">
                  <button onClick={() => setAccordionOpen(accordionOpen === 3 ? 0 : 3)} className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-marine hover:bg-[#F0F4FA] transition-colors duration-200">
                    <span className="text-sm sm:text-base">Respaldo Académico (Garantía de Confianza)</span>
                    <ChevronDown className={`w-5 h-5 text-cyan flex-shrink-0 ml-3 transition-transform duration-300 ${accordionOpen === 3 ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {accordionOpen === 3 && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                        <div className="px-5 pb-5 space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-cyan/10 flex items-center justify-center flex-shrink-0"><GraduationCap className="w-4 h-4 text-cyan" /></div>
                            <h4 className="font-bold text-marine text-sm">Labor Docente Universitaria</h4>
                          </div>
                          <p className="text-marine/70 text-sm leading-relaxed pl-10">Comparto activamente mis conocimientos e investigo las últimas evidencias de la ciencia médica como Docente de la Facultad de Medicina Humana en la <strong className="text-marine">Universidad Privada San Juan Bautista</strong>, manteniéndome al día con las directrices de salud mundiales.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="pt-3">
                  <MagneticButton href="https://wa.me/51983554248?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20cita%20con%20el%20Dr.%20Adolfo" strength={0.15}>
                    <Button className="bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold rounded-full px-8 h-13 shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#25D366]/40">
                      <Calendar className="w-5 h-5 mr-2" />Agendar Cita con el Dr. Adolfo
                    </Button>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ SERVICES PREVIEW — EXPANDED WITH SURGICAL ═══ */}
      <section className="section-transition-light py-16 lg:py-24 bg-gradient-to-b from-[#F0F7FD] to-white" id="servicios">
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

      {/* ═══ FORMACIÓN MÉDICA DE EXCELENCIA INTERNACIONAL ═══ */}
      <section className="section-transition-light py-20 lg:py-28 bg-gradient-to-b from-[#F0F7FD] to-white" id="formacion-internacional">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
              <span className="text-cyan font-bold text-xs uppercase tracking-widest">Garantía de Confianza</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-marine mt-2">
                Formación Médica de{' '}<span className="gradient-text">Excelencia Internacional</span>
              </h2>
              <p className="text-marine/60 mt-4 text-base lg:text-lg leading-relaxed">
                El Dr. Adolfo Herencia Barrios complementa su experiencia clínica mediante capacitaciones de alto nivel y mentorías directas con los máximos exponentes de la ginecología en Sudamérica.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {mentorships.map((m, i) => (
              <ScrollReveal key={m.institution} delay={i * 0.1}>
                <article className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,32,96,0.06)] border border-[#F0F2F5] group hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={m.image} alt={m.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-marine/50 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="inline-flex items-center gap-1.5 bg-white/90 text-marine text-[11px] font-bold px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
                        <MapPin className="w-3 h-3 text-cyan" />{m.flag} {m.location}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <h3 className="text-marine font-bold text-lg leading-tight">{m.title}</h3>
                    <p className="text-cyan font-bold text-[13px] mt-1.5">{m.institution}</p>
                    <p className="text-marine/60 text-[13.5px] leading-relaxed mt-3 flex-1">{m.description}</p>
                    {m.galleryImages && (
                      <button
                        onClick={() => { setLightboxImages(m.galleryImages!.map((src) => ({ src, alt: m.title }))); setLightboxOpen(true) }}
                        className="mt-4 inline-flex items-center gap-1.5 text-cyan text-sm font-semibold hover:text-royal transition-colors duration-200"
                      >
                        <Eye className="w-4 h-4" />{m.galleryLabel || 'Ver galería'}
                      </button>
                    )}
                  </div>
                </article>
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
        {/* Section transition: white → dark */}
        <div className="cta-fade-top" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">¿Lista para cuidar de tu salud?</h2>
            <p className="text-white/80 mt-6 text-lg max-w-2xl mx-auto leading-relaxed">Agenda tu cita de manera rápida y sencilla. Nuestro equipo está listo para brindarte la atención que mereces.</p>
            <div className="mt-10">
              <MagneticButton href="/reservas" strength={0.2}>
                <Button size="lg" className="bg-white text-marine hover:bg-white/90 font-semibold rounded-full px-10 h-14 text-base shadow-2xl transition-all duration-300"><Calendar className="w-5 h-5 mr-2" />Agendar Cita Ahora</Button>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ LIGHTBOX — Mentorship Gallery ═══ */}
      <DoctorLightbox
        images={lightboxImages}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  )
}