'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, CheckCircle2, Phone, Calendar, Shield, Heart, Stethoscope, Baby, Scissors, Microscope } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import ScrollReveal from '@/components/animations/ScrollReveal'
import MagneticButton from '@/components/animations/MagneticButton'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Stethoscope,
  Baby,
  Shield,
  Heart,
  Scissors,
  Microscope,
}

const servicesData: Record<string, {
  title: string
  subtitle: string
  description: string
  fullDescription: string
  features: string[]
  image: string
  price: string
  duration: string
  preparation: string[]
  faqs: { q: string; a: string }[]
}> = {
  'ecografia-ginecologica': {
    title: 'Ecografía Ginecológica',
    subtitle: 'Diagnóstico por Imagen',
    description: 'Estudio ultrasonográfico del aparato reproductor femenino.',
    fullDescription: 'La ecografía ginecológica es un estudio de diagnóstico por imagen que utiliza ondas sonoras de alta frecuencia para visualizar los órganos reproductivos femeninos. Permite una evaluación precisa del útero, los ovarios, las trompas de Falopio y las estructuras pélvicas circundantes. En Nueva Vida, utilizamos equipos de última generación que ofrecen imágenes de alta resolución, facilitando la detección temprana de cualquier anomalía. Este procedimiento es fundamental para el diagnóstico de quistes ováricos, miomas uterinos, endometriosis, entre otras patologías ginecológicas.',
    features: ['Evaluación ovárica completa', 'Medición endometrial', 'Detección de quistes y miomas', 'Control de folículos', 'Evaluación de masas pélvicas', 'Guía para procedimientos invasivos'],
    image: '/ultrasound-service.jpg',
    price: 'Desde S/ 180',
    duration: '30 minutos',
    preparation: ['Vejiga llena (beber 1 litro de agua 1 hora antes)', 'No es necesario ayuno', 'Traer exámenes anteriores si los tiene'],
    faqs: [
      { q: '¿Es dolorosa la ecografía ginecológica?', a: 'No, es un procedimiento indoloro y no invasivo. Solo se podría sentir una leve presión durante la exploración transvaginal.' },
      { q: '¿Cuándo se recomienda realizar una ecografía?', a: 'Se recomienda realizarla como parte del control ginecológico anual, ante dolor pélvico, sangrados anormales o sospecha de alteraciones.' },
      { q: '¿Con qué frecuencia debo realizarme una ecografía?', a: 'Se recomienda al menos una vez al año como prevención, o según indicación médica según su historial clínico.' },
    ],
  },
  'ecografia-obstetrica': {
    title: 'Ecografía Obstétrica',
    subtitle: 'Control Prenatal',
    description: 'Monitoreo del desarrollo fetal con tecnología 4D.',
    fullDescription: 'La ecografía obstétrica es el pilar fundamental del control prenatal. En Nueva Vida contamos con tecnología 4D de última generación que permite visualizar al bebé en tiempo real con una claridad excepcional. Este estudio permite evaluar el crecimiento fetal, verificar la vitalidad, determinar la posición del bebé y detectar posibles anomalías. Realizamos ecografías en cada trimestre del embarazo, adaptando el estudio a las necesidades específicas de cada etapa. Nuestro equipo se encarga de crear una experiencia emotiva para los padres, permitiéndoles ver a su bebé con detalles increíbles.',
    features: ['Ecografía 4D en tiempo real', 'Evaluación de crecimiento fetal', 'Doppler fetal', 'Control de vitalidad', 'Determinación de posición fetal', 'Video memorable para los padres'],
    image: '/ultrasound-service.jpg',
    price: 'Desde S/ 220',
    duration: '45 minutos',
    preparation: ['Vejiga llena para el primer trimestre', 'Traer ecografías anteriores', 'Traer carné de control prenatal'],
    faqs: [
      { q: '¿En qué trimestre puedo ver a mi bebé en 4D?', a: 'La mejor época para la ecografía 4D es entre las semanas 24 y 32, cuando el bebé tiene suficiente líquido amniótico y su rostro está más desarrollado.' },
      { q: '¿Cuántas ecografías necesito durante el embarazo?', a: 'Generalmente se recomienda una en cada trimestre: confirmación en el primero, morfológica en el segundo y de bienestar en el tercero.' },
    ],
  },
  'colposcopia': {
    title: 'Colposcopía',
    subtitle: 'Evaluación Cervical',
    description: 'Examen detallado del cuello uterino.',
    fullDescription: 'La colposcopía es un procedimiento diagnóstico que permite una evaluación ampliada y detallada del cuello uterino y la vagina. Utilizando un colposcopio de alta resolución, el especialista puede detectar lesiones precancerosas que no son visibles a simple vista. En Nueva Vida, realizamos este procedimiento con equipos de última generación y con la experiencia del Dr. Adolfo, quien ha realizado miles de colposcopías con excelentes resultados. Este examen es fundamental para la prevención del cáncer de cuello uterino y se recomienda como complemento del Papanicolau cuando este presenta alteraciones.',
    features: ['Ampliación óptica de hasta 40x', 'Detección de lesiones precancerosas', 'Biopsia dirigida si es necesario', 'Resultados rápidos y confiables', 'Procedimiento ambulatorio', 'Mínima molestia para la paciente'],
    image: '/biopsy-service.jpg',
    price: 'Desde S/ 250',
    duration: '30 minutos',
    preparation: ['No tener relaciones sexuales 48 horas antes', 'No usar duchas vaginales', 'No usar óvulos o cremas vaginales'],
    faqs: [
      { q: '¿Es dolorosa la colposcopía?', a: 'No es dolorosa. Puede sentir una leve molestia similar a un examen ginecológico regular. En caso de biopsia, se aplica anestesia local.' },
      { q: '¿Cuánto tiempo duran los resultados?', a: 'Los resultados de la biopsia están listos entre 5 y 7 días hábiles. Puede retirarlos en nuestro consultorio.' },
    ],
  },
  'biopsia': {
    title: 'Biopsia',
    subtitle: 'Estudio Histopatológico',
    description: 'Toma de muestras de tejido para análisis.',
    fullDescription: 'La biopsia ginecológica consiste en la extracción de una pequeña muestra de tejido para su análisis histopatológico detallado. En Nueva Vida, realizamos diferentes tipos de biopsias según la necesidad clínica: biopsia de endometrio, biopsia cervical, y biopsia vulvar. El procedimiento se realiza bajo estrictas condiciones de asepsia y el Dr. Adolfo se encarga de que sea lo menos invasivo posible. Los resultados son evaluados por laboratorios certificados con amplia experiencia en patología ginecológica, garantizando un diagnóstico preciso y confiable.',
    features: ['Biopsia de endometrio', 'Biopsia cervical dirigida', 'Análisis histopatológico completo', 'Resultado en 5-7 días', 'Procedimiento ambulatorio', 'Laboratorio certificado'],
    image: '/biopsy-service.jpg',
    price: 'Desde S/ 350',
    duration: '45 minutos',
    preparation: ['Comunicar si toma anticoagulantes', 'No tener relaciones sexuales 48h antes', 'Ayunar 6 horas si se requiere sedación'],
    faqs: [
      { q: '¿La biopsia requiere hospitalización?', a: 'No, es un procedimiento ambulatorio que se realiza en el consultorio. La paciente puede volver a casa el mismo día.' },
    ],
  },
  'papanicolaou': {
    title: 'Papanicolau',
    subtitle: 'Prevención Cervical',
    description: 'Prueba de tamizaje para detección temprana.',
    fullDescription: 'El Papanicolau es la prueba de tamizaje más importante para la detección temprana del cáncer de cuello uterino y la identificación de alteraciones celulares precursoras. En Nueva Vida, realizamos esta prueba con la técnica más moderna, que incluye detección de VPH (Virus del Papiloma Humano) de manera simultánea. El Dr. Adolfo recomienda realizar esta prueba anualmente a todas las mujeres sexualmente activas a partir de los 21 años. Es un procedimiento rápido, indoloro y que puede salvar vidas al detectar anomalías en etapas tempranas cuando son completamente tratables.',
    features: ['Toma citológica cervical', 'Detección simultánea de VPH', 'Resultado en 48 horas', 'Procedimiento indoloro', 'Recomendado anualmente', 'Prevención de cáncer cervical'],
    image: '/clinic-interior.jpg',
    price: 'Desde S/ 80',
    duration: '15 minutos',
    preparation: ['No tener relaciones sexuales 48 horas antes', 'No usar duchas vaginales', 'Ideal entre días 10-20 del ciclo menstrual'],
    faqs: [
      { q: '¿Es doloroso el Papanicolau?', a: 'No, es un procedimiento rápido e indoloro. Solo podría sentir una leve molestia similar a la de un examen regular.' },
      { q: '¿A partir de qué edad debo realizarlo?', a: 'Se recomienda a partir de los 21 años, o dentro de los 3 años posteriores al inicio de la actividad sexual.' },
    ],
  },
  'control-preventivo': {
    title: 'Control Preventivo',
    subtitle: 'Chequeo Integral',
    description: 'Evaluación integral de la salud ginecológica.',
    fullDescription: 'El control preventivo ginecológico es una evaluación integral que busca mantener la salud reproductiva de la mujer en óptimas condiciones. En Nueva Vida, nuestro control preventivo incluye una completa evaluación clínica, examen físico, ecografía basal, pruebas de laboratorio y asesoría personalizada. El Dr. Adolfo diseña un plan de prevención individualizado para cada paciente, tomando en cuenta su edad, historial médico, antecedentes familiares y estilo de vida. La prevención es la mejor herramienta para detectar cualquier alteración a tiempo y garantizar una vida saludable.',
    features: ['Examen clínico completo', 'Perfil hormonal', 'Ecografía basal', 'Plan de prevención personalizado', 'Asesoría en salud reproductiva', 'Seguimiento continuo'],
    image: '/clinic-interior.jpg',
    price: 'Desde S/ 300',
    duration: '60 minutos',
    preparation: ['Traer exámenes anteriores', 'Venir con la vejiga llena', 'Preparar lista de dudas para el médico'],
    faqs: [
      { q: '¿Con qué frecuencia debo hacer un control preventivo?', a: 'Recomendamos al menos una vez al año, o cada 6 meses si hay factores de riesgo o antecedentes importantes.' },
    ],
  },
}

export default function ServiceDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const service = servicesData[slug]
  
  if (!service) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-marine">Servicio no encontrado</h1>
          <p className="text-marine/60">El servicio que buscas no existe.</p>
          <Link href="/servicios">
            <Button className="bg-cyan hover:bg-cyan-light text-white rounded-full">Ver todos los servicios</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Breadcrumb + Hero */}
      <section id="hero" className="relative w-full animated-gradient overflow-hidden pt-[60px] sm:pt-[68px] lg:pt-[70px] pb-20 lg:pb-28">
        <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
              <span>/</span>
              <Link href="/servicios" className="hover:text-white transition-colors">Servicios</Link>
              <span>/</span>
              <span className="text-white">{service.title}</span>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <Badge className="bg-cyan/20 text-cyan-light border-0">{service.subtitle}</Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">{service.title}</h1>
            <p className="text-white/80 mt-4 text-lg max-w-2xl">{service.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section id="contenido" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              <ScrollReveal>
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <Image src={service.image} alt={service.title} width={800} height={450} className="object-cover w-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-marine/30 to-transparent" />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-marine">Sobre este servicio</h2>
                  <p className="text-marine/70 leading-relaxed text-lg">{service.fullDescription}</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-marine">Características</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {service.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                        <CheckCircle2 className="w-5 h-5 text-cyan flex-shrink-0" />
                        <span className="text-marine/80">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* FAQs */}
              <ScrollReveal delay={0.3}>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-marine">Preguntas Frecuentes</h2>
                  <div className="space-y-4">
                    {service.faqs.map((faq) => (
                      <Card key={faq.q} className="border-0 shadow-md bg-muted/30">
                        <CardContent className="p-6 space-y-2">
                          <h3 className="font-semibold text-marine">{faq.q}</h3>
                          <p className="text-marine/60 text-sm leading-relaxed">{faq.a}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <ScrollReveal direction="right">
                <Card className="border-0 shadow-xl bg-gradient-to-b from-cyan to-royal text-white sticky top-28">
                  <CardContent className="p-8 space-y-6">
                    <div>
                      <p className="text-white/80 text-sm">Precio desde</p>
                      <p className="text-3xl font-bold">{service.price}</p>
                    </div>
                    <Separator className="bg-white/20" />
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="w-5 h-5" />
                      <span>Duración: {service.duration}</span>
                    </div>
                    <MagneticButton href="/reservas" strength={0.2}>
                      <Button className="w-full bg-white text-marine hover:bg-white/90 font-semibold rounded-xl py-3 h-auto text-base">
                        <Calendar className="w-5 h-5 mr-2" /> Agendar Cita
                      </Button>
                    </MagneticButton>
                    <MagneticButton href="https://wa.me/51983554248" strength={0.15}>
                      <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 rounded-xl py-3 h-auto">
                        <Phone className="w-5 h-5 mr-2" /> WhatsApp
                      </Button>
                    </MagneticButton>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.2}>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-bold text-marine text-lg">Preparación</h3>
                    <ul className="space-y-3">
                      {service.preparation.map((prep) => (
                        <li key={prep} className="flex items-start gap-2 text-sm text-marine/70">
                          <Shield className="w-4 h-4 text-cyan mt-0.5 flex-shrink-0" />
                          <span>{prep}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
