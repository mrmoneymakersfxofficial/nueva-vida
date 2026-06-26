'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, CheckCircle2, ArrowRight, ArrowLeft, MapPin, Stethoscope, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import ScrollReveal from '@/components/animations/ScrollReveal'

const services = [
  'Ecografía Ginecológica',
  'Ecografía Obstétrica',
  'Colposcopía',
  'Biopsia',
  'Papanicolau',
  'Control Preventivo',
  'Consulta General',
]

const timeSlots = [
  '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
]

export default function ReservasPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    servicio: '',
    fecha: '',
    hora: '',
    mensaje: '',
  })
  const [submitted, setSubmitted] = useState(false)

  // Scroll to #hero on mount
  useEffect(() => {
    if (window.location.hash === '#hero') {
      const el = document.getElementById('hero')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [])

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const generateWhatsAppMessage = () => {
    const msg = `Hola Consultorio Nueva Vida, deseo agendar una cita:\n\n` +
      `*Servicio:* ${formData.servicio}\n` +
      `*Fecha:* ${formData.fecha}\n` +
      `*Hora:* ${formData.hora}\n` +
      (formData.mensaje ? `*Mensaje:* ${formData.mensaje}\n` : '') +
      `\nQuedo a la espera de su confirmación. ¡Gracias!`

    return `https://wa.me/51983554248?text=${encodeURIComponent(msg)}`
  }

  const handleSubmit = () => {
    const url = generateWhatsAppMessage()
    window.open(url, '_blank')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <>
        <section className="relative w-full animated-gradient overflow-hidden pt-[60px] sm:pt-[68px] lg:pt-[70px] pb-20 lg:pb-28">
          <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center opacity-20" />
          <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-8"
            >
              <CheckCircle2 className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">¡Solicitud Enviada!</h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
              Tu solicitud de cita se envió por WhatsApp. Te confirmaremos el horario en breve. Gracias por confiar en Nueva Vida.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button onClick={() => { setSubmitted(false); setStep(1); setFormData({ servicio: '', fecha: '', hora: '', mensaje: '' }); window.location.hash = 'hero'; }} className="bg-white text-marine hover:bg-white/90 rounded-full px-8 font-semibold">
                Agendar Otra Cita
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8" onClick={() => window.location.href = '/'}>
                Volver al Inicio
              </Button>
            </div>
          </div>
          <div className="hero-fade-bottom" />
        </section>
      </>
    )
  }

  return (
    <>
      {/* Immersive Form — starts right below navbar */}
      <section id="hero" className="pt-[72px] sm:pt-[80px] lg:pt-[84px] pb-16 lg:pb-24 bg-gradient-to-b from-[#F0F7FD] to-white min-h-[80vh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Steps — 2 steps */}
          <ScrollReveal>
            <div className="flex items-center justify-center mb-12">
              {[
                { num: 1, label: 'Servicio' },
                { num: 2, label: 'Fecha y Hora' },
              ].map((s, i) => (
                <div key={s.num} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      step >= s.num ? 'bg-cyan text-white shadow-lg shadow-cyan/25' : 'bg-muted text-marine/40'
                    }`}>
                      {step > s.num ? <CheckCircle2 className="w-5 h-5" /> : s.num}
                    </div>
                    <span className={`text-xs mt-2 hidden sm:block ${step >= s.num ? 'text-cyan font-medium' : 'text-marine/40'}`}>
                      {s.label}
                    </span>
                  </div>
                  {i < 1 && (
                    <div className={`w-16 sm:w-24 h-0.5 mx-2 mb-6 sm:mb-0 transition-all duration-300 ${
                      step > s.num ? 'bg-cyan' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>

          <div className="bg-white rounded-3xl shadow-2xl shadow-marine/5 border border-marine/5 p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {/* Step 1: Service Selection */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan/10 to-royal/10 flex items-center justify-center">
                      <Stethoscope className="w-6 h-6 text-cyan" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-marine">Elige tu Servicio</h2>
                      <p className="text-marine/50 text-sm">Selecciona el servicio que necesitas</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-marine font-medium">Servicio *</Label>
                    <Select value={formData.servicio} onValueChange={(v) => updateField('servicio', v)}>
                      <SelectTrigger className="rounded-xl border-marine/10 h-12">
                        <SelectValue placeholder="Selecciona un servicio" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((s) => (
                          <SelectItem key={s} value={s} className="text-marine">{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensaje" className="text-marine font-medium">
                      <span className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-marine/50" />
                        Mensaje Adicional
                      </span>
                    </Label>
                    <Textarea
                      id="mensaje"
                      placeholder="Cuéntanos sobre tu consulta o síntomas (opcional)..."
                      value={formData.mensaje}
                      onChange={(e) => updateField('mensaje', e.target.value)}
                      className="rounded-xl border-marine/10 focus:border-cyan min-h-[90px] resize-none"
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      onClick={() => setStep(2)}
                      disabled={!formData.servicio}
                      className="bg-cyan hover:bg-cyan-light text-white font-semibold rounded-full px-8 shadow-lg shadow-cyan/25 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Siguiente <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Date & Time + Send */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan/10 to-royal/10 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-cyan" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-marine">Fecha y Hora</h2>
                      <p className="text-marine/50 text-sm">Selecciona tu horario preferido (Lun-Vie, 4:00 PM - 8:00 PM)</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fecha" className="text-marine font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-marine/50" />
                        Fecha Preferida *
                      </Label>
                      <input
                        id="fecha"
                        type="date"
                        value={formData.fecha}
                        onChange={(e) => updateField('fecha', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full h-12 rounded-xl border border-marine/10 bg-white px-4 text-marine text-sm focus:border-cyan focus:ring-1 focus:ring-cyan outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-marine font-medium">Hora Preferida *</Label>
                      <Select value={formData.hora} onValueChange={(v) => updateField('hora', v)}>
                        <SelectTrigger className="rounded-xl border-marine/10 h-12">
                          <SelectValue placeholder="Selecciona una hora" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((t) => (
                            <SelectItem key={t} value={t} className="text-marine">{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Time slots visual grid */}
                  <div className="space-y-2">
                    <Label className="text-marine/60 text-xs font-medium">Horarios disponibles</Label>
                    <div className="flex flex-wrap gap-2">
                      {timeSlots.map((t) => (
                        <button
                          key={t}
                          onClick={() => updateField('hora', t)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            formData.hora === t
                              ? 'bg-cyan text-white shadow-md shadow-cyan/25'
                              : 'bg-muted/50 text-marine/70 hover:bg-cyan/10 hover:text-cyan'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  <Card className="bg-gradient-to-r from-cyan/5 to-royal/5 border border-cyan/10">
                    <CardContent className="p-5">
                      <h3 className="font-bold text-marine mb-3 text-sm">Resumen de tu Cita</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-marine/60">Servicio:</span>
                          <span className="font-medium text-cyan">{formData.servicio}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-marine/60">Fecha:</span>
                          <span className="font-medium text-marine">{formData.fecha || '—'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-marine/60">Hora:</span>
                          <span className="font-medium text-marine">{formData.hora || '—'}</span>
                        </div>
                        {formData.mensaje && (
                          <div className="pt-2 border-t border-marine/10">
                            <span className="text-marine/60">Mensaje:</span>
                            <p className="font-medium text-marine mt-1 text-sm">{formData.mensaje}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setStep(1)} className="rounded-full px-8 border-marine/20 text-marine">
                      <ArrowLeft className="w-4 h-4 mr-2" /> Anterior
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={!formData.fecha || !formData.hora}
                      className="bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold rounded-full px-8 shadow-lg shadow-[#25D366]/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-xl hover:shadow-[#25D366]/35"
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Enviar por WhatsApp
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Info Cards */}
          <div className="grid sm:grid-cols-3 gap-4 mt-12">
            {[
              { icon: MapPin, title: 'Ubicación', text: 'Av. Principal 123, Lima' },
              { icon: Clock, title: 'Horario', text: 'Lun - Vie: 4:00 PM - 8:00 PM' },
              { icon: Calendar, title: 'Reserva Rápida', text: 'Solo 2 pasos para agendar' },
            ].map((info, i) => (
              <ScrollReveal key={info.title} delay={i * 0.1}>
                <Card className="text-center border-0 shadow-md bg-muted/50">
                  <CardContent className="p-5 space-y-2">
                    <info.icon className="w-5 h-5 text-cyan mx-auto" />
                    <h3 className="font-semibold text-marine text-sm">{info.title}</h3>
                    <p className="text-marine/60 text-xs">{info.text}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}