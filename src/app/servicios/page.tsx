'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Stethoscope, Baby, Shield, Heart, Scissors, Microscope, ArrowRight, Clock, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ScrollReveal from '@/components/animations/ScrollReveal'
import MagneticButton from '@/components/animations/MagneticButton'

const services = [
  {
    slug: 'ecografia-ginecologica',
    icon: Stethoscope,
    title: 'Ecografía Ginecológica',
    subtitle: 'Diagnóstico por Imagen',
    description: 'Estudio ultrasonográfico del aparato reproductor femenino que permite evaluar ovarios, útero y estructuras pélvicas con alta precisión.',
    features: ['Evaluación ovárica completa', 'Medición endometrial', 'Detección de quistes y miomas', 'Control de folículos'],
    image: '/ultrasound-service.jpg',
    price: 'Desde S/ 180',
    duration: '30 min',
  },
  {
    slug: 'ecografia-obstetrica',
    icon: Baby,
    title: 'Ecografía Obstétrica',
    subtitle: 'Control Prenatal',
    description: 'Monitoreo del desarrollo fetal con tecnología 4D. Incluye evaluación de crecimiento, vitalidad y bienestar del bebé.',
    features: ['Ecografía 4D en tiempo real', 'Evaluación de crecimiento fetal', 'Doppler fetal', 'Control de vitalidad'],
    image: '/ultrasound-service.jpg',
    price: 'Desde S/ 220',
    duration: '45 min',
  },
  {
    slug: 'colposcopia',
    icon: Shield,
    title: 'Colposcopía',
    subtitle: 'Evaluación Cervical',
    description: 'Examen detallado del cuello uterino mediante colposcopio de alta resolución para detección precoz de lesiones.',
    features: ['Ampliación óptica de 40x', 'Detección de lesiones precancerosas', 'Biopsia dirigida', 'Resultados rápidos'],
    image: '/biopsy-service.jpg',
    price: 'Desde S/ 250',
    duration: '30 min',
  },
  {
    slug: 'biopsia',
    icon: Microscope,
    title: 'Biopsia',
    subtitle: 'Estudio Histopatológico',
    description: 'Toma de muestras de tejido para análisis histopatológico, permitiendo un diagnóstico preciso de patologías.',
    features: ['Biopsia de endometrio', 'Biopsia cervical dirigida', 'Análisis histopatológico', 'Resultado en 5-7 días'],
    image: '/biopsy-service.jpg',
    price: 'Desde S/ 350',
    duration: '45 min',
  },
  {
    slug: 'papanicolaou',
    icon: Scissors,
    title: 'Papanicolau',
    subtitle: 'Prevención Cervical',
    description: 'Prueba de tamizaje fundamental para la detección temprana de cáncer de cuello uterino y alteraciones celulares.',
    features: ['Toma citológica cervical', 'Detección de VPH', 'Resultado en 48 horas', 'Procedimiento indoloro'],
    image: '/clinic-interior.jpg',
    price: 'Desde S/ 80',
    duration: '15 min',
  },
  {
    slug: 'control-preventivo',
    icon: Heart,
    title: 'Control Preventivo',
    subtitle: 'Chequeo Integral',
    description: 'Evaluación integral de la salud ginecológica que incluye examen físico, ecografía y pruebas de laboratorio.',
    features: ['Examen clínico completo', 'Perfil hormonal', 'Ecografía basal', 'Plan de prevención personalizado'],
    image: '/clinic-interior.jpg',
    price: 'Desde S/ 300',
    duration: '60 min',
  },
]

export default function ServiciosPage() {
  return (
    <>
      {/* Hero */}
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
              Contamos con equipos de última generación y un equipo de profesionales 
              dedicados a brindarte la mejor atención ginecológica.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="servicios" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <ScrollReveal key={service.slug} delay={i * 0.1}>
                <Link href={`/servicios/${service.slug}`}>
                  <Card className="group h-full border-0 shadow-xl shadow-marine/5 hover:shadow-2xl hover:shadow-cyan/15 transition-all duration-500 overflow-hidden bg-white hover:-translate-y-2">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-marine/60 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-cyan text-white border-0 font-medium">{service.subtitle}</Badge>
                      </div>
                      <div className="absolute bottom-4 right-4 flex items-center gap-3 text-white text-xs">
                        <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                          <Clock className="w-3 h-3" />{service.duration}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan/10 to-royal/10 flex items-center justify-center group-hover:from-cyan group-hover:to-royal transition-all duration-300">
                          <service.icon className="w-6 h-6 text-cyan group-hover:text-white transition-colors" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-marine">{service.title}</h3>
                          <p className="text-cyan font-semibold text-sm">{service.price}</p>
                        </div>
                      </div>
                      <p className="text-marine/60 text-sm leading-relaxed">{service.description}</p>
                      <div className="space-y-2">
                        {service.features.slice(0, 3).map((feat) => (
                          <div key={feat} className="flex items-center gap-2 text-sm text-marine/70">
                            <CheckCircle2 className="w-4 h-4 text-cyan flex-shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 flex items-center text-cyan text-sm font-medium group-hover:gap-2 transition-all duration-300">
                        Ver detalles <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="reservar" className="py-16 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-marine">¿Necesitas orientación sobre algún servicio?</h2>
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
