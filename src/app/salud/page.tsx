'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Baby, Stethoscope, Shield, ArrowRight, BookOpen, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import ScrollReveal from '@/components/animations/ScrollReveal'
import MagneticButton from '@/components/animations/MagneticButton'

const articles = [
  {
    slug: 'endometriosis',
    icon: Heart,
    title: 'Endometriosis',
    description: 'La endometriosis es una condición en la que el tejido que normalmente reviste el interior del útero crece fuera de él. Puede causar dolor pélvico crónico, especialmente durante la menstruación, y puede afectar la fertilidad. El diagnóstico temprano es fundamental para un tratamiento efectivo.',
    color: 'from-pink-500/10 to-rose-500/10',
  },
  {
    slug: 'sindrome-ovario-poliquistico',
    icon: Stethoscope,
    title: 'Síndrome de Ovario Poliquístico (SOP)',
    description: 'El SOP es un trastorno hormonal común que afecta a mujeres en edad reproductiva. Se caracteriza por niveles elevados de andrógenos, períodos irregulares y quistes en los ovarios. El diagnóstico y manejo adecuado pueden prevenir complicaciones a largo plazo.',
    color: 'from-blue-500/10 to-indigo-500/10',
  },
  {
    slug: 'cancer-cuello-uterino',
    icon: Shield,
    title: 'Cáncer de Cuello Uterino',
    description: 'El cáncer de cuello uterino es uno de los más prevenibles gracias a las pruebas de tamizaje como el Papanicolau y la vacuna contra el VPH. La detección temprana de lesiones precancerosas permite un tratamiento con altas tasas de curación.',
    color: 'from-emerald-500/10 to-teal-500/10',
  },
  {
    slug: 'embarazo-saludable',
    icon: Baby,
    title: 'Embarazo Saludable',
    description: 'Un embarazo saludable requiere controles prenatales regulares, una alimentación balanceada, suplementación de ácido fólico y actividad física adecuada. Las ecografías periódicas son esenciales para monitorear el desarrollo del bebé.',
    color: 'from-cyan-500/10 to-sky-500/10',
  },
  {
    slug: 'menopausia',
    icon: Heart,
    title: 'Menopausia y Climaterio',
    description: 'La menopausia marca el fin de la etapa reproductiva de la mujer. Los cambios hormonales pueden provocar síntomas como sofocos, cambios de humor y osteoporosis. Un manejo integral mejora significativamente la calidad de vida.',
    color: 'from-orange-500/10 to-amber-500/10',
  },
  {
    slug: 'infecciones-vaginales',
    icon: Shield,
    title: 'Infecciones Vaginales',
    description: 'Las infecciones vaginales son muy comunes y pueden ser causadas por hongos, bacterias o parásitos. Los síntomas incluyen flujo anormal, picor y molestias. El diagnóstico correcto garantiza un tratamiento rápido y efectivo.',
    color: 'from-violet-500/10 to-purple-500/10',
  },
]

const faqs = [
  {
    q: '¿Con qué frecuencia debo acudir a un control ginecológico?',
    a: 'Se recomienda realizar un control ginecológico al menos una vez al año, o cada 6 meses si existen factores de riesgo como antecedentes familiares de cáncer, patologías crónicas o antecedentes de infecciones recurrentes. En Nueva Vida, diseñamos un plan de control personalizado para cada paciente.',
  },
  {
    q: '¿La ecografía ginecológica es dolorosa?',
    a: 'No, la ecografía ginecológica es un procedimiento completamente indoloro y no invasivo. Utiliza ondas sonoras para crear imágenes de los órganos pélvicos. Durante la ecografía transvaginal, solo podría sentir una leve presión pero sin ningún tipo de dolor.',
  },
  {
    q: '¿A partir de qué edad debo iniciar mis controles ginecológicos?',
    a: 'Se recomienda iniciar los controles ginecológicos a partir de los 21 años, o dentro de los 3 años posteriores al inicio de la actividad sexual, lo que ocurra primero. Sin embargo, ante cualquier síntoma o preocupación, puede consultar en cualquier momento.',
  },
  {
    q: '¿Qué es el Papanicolau y por qué es importante?',
    a: 'El Papanicolau es una prueba de tamizaje que detecta células anormales en el cuello uterino antes de que se conviertan en cáncer. Es la herramienta más efectiva para la prevención del cáncer cervical. Se recomienda realizarlo anualmente a todas las mujeres sexualmente activas.',
  },
  {
    q: '¿Cómo puedo prepararme para mi primera cita ginecológica?',
    a: 'Para tu primera cita, te recomendamos: anotar tus dudas, conocer tu historial menstrual (fecha de última menstruación, regularidad), traer exámenes anteriores si los tienes, no tener relaciones sexuales 48 horas antes, y venir con la vejiga llena si se realizará ecografía.',
  },
  {
    q: '¿Qué servicios ofrecen para mujeres embarazadas?',
    a: 'Ofrecemos ecografías obstétricas en 2D, 3D y 4D para el control del desarrollo fetal, Doppler fetal para evaluar el flujo sanguíneo, control prenatal completo, y seguimiento del embarazo en todas sus etapas. También brindamos asesoría sobre nutrición y preparación para el parto.',
  },
  {
    q: '¿Aceptan seguros médicos?',
    a: 'Sí, trabajamos con los principales seguros médicos. Para mayor información sobre cobertura y convenios, puedes contactarnos por WhatsApp o llamarnos directamente. Nuestro equipo administrativo te brindará toda la información necesaria.',
  },
  {
    q: '¿Cuánto tiempo tardan los resultados de los exámenes?',
    a: 'Los tiempos varían según el tipo de examen: Papanicolau 48 horas, biopsias 5-7 días hábiles, ecografías resultados inmediatos, exámenes de laboratorio 24-72 horas. Entregamos los resultados en el consultorio o los enviamos por correo electrónico según tu preferencia.',
  },
]

export default function SaludPage() {
  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative animated-gradient overflow-hidden pt-[60px] sm:pt-[68px] lg:pt-[70px] pb-20 lg:pb-28">
        <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="bg-cyan/20 text-cyan-light border-0 mb-4 px-4 py-1">
              Portal de Salud
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Información para tu{' '}
              <span className="text-cyan-light">bienestar</span>
            </h1>
            <p className="text-white/80 mt-6 text-lg max-w-2xl mx-auto">
              Artículos informativos sobre salud femenina y respuestas a las preguntas más frecuentes 
              para que tomes mejores decisiones sobre tu salud.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Health Articles */}
      <section id="articulos" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan to-royal flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-marine">Artículos de Salud</h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <ScrollReveal key={article.slug} delay={i * 0.1}>
                <Card className="group h-full border-0 shadow-lg shadow-marine/5 hover:shadow-xl hover:shadow-cyan/10 transition-all duration-500 overflow-hidden bg-white hover:-translate-y-1">
                  <CardContent className="p-6 space-y-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${article.color} flex items-center justify-center`}>
                      <article.icon className="w-7 h-7 text-marine/70" />
                    </div>
                    <h3 className="text-lg font-bold text-marine group-hover:text-royal transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-marine/60 text-sm leading-relaxed">
                      {article.description}
                    </p>
                    <div className="flex items-center text-cyan text-sm font-medium">
                      Leer más <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="preguntas" className="py-20 lg:py-28 bg-muted">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-marine">Preguntas Frecuentes</h2>
              <p className="text-marine/60 mt-4">
                Encuentra respuestas a las dudas más comunes sobre salud ginecológica.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="bg-white rounded-xl shadow-sm border-0 px-6 data-[state=open]:shadow-md transition-shadow duration-300"
                >
                  <AccordionTrigger className="text-marine font-semibold text-left hover:no-underline py-5 [&>svg]:text-cyan">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-marine/70 leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section id="contacto" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-marine">¿Tienes más preguntas?</h2>
            <p className="text-marine/60 mt-4 max-w-xl mx-auto">
              No dudes en contactarnos. Estamos aquí para orientarte y brindarte la información que necesitas.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <MagneticButton href="/reservas" strength={0.2}>
                <Button className="bg-cyan hover:bg-cyan-light text-white font-semibold rounded-full px-8 shadow-lg shadow-cyan/25 glow-cyan">
                  Agendar Consulta
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
