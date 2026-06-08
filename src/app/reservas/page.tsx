'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, Phone, User, MessageSquare, CheckCircle2, ArrowRight, MapPin, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ScrollReveal from '@/components/animations/ScrollReveal'

const services = [
  'Ecografía Ginecológica',
  'Ecografía Obstétrica',
  'Colposcopía',
  'Biopsia',
  'Papanicolau',
  'Control Preventivo',
]

const timeSlots = [
  '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '01:00 PM', '01:30 PM', '02:00 PM',
  '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM',
]

export default function ReservasPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    servicio: '',
    fecha: '',
    hora: '',
    mensaje: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const generateWhatsAppMessage = () => {
    const msg = `Hola, me gustaría agendar una cita.\n\n` +
      `*Nombre:* ${formData.nombre}\n` +
      `*Teléfono:* ${formData.telefono}\n` +
      `*Email:* ${formData.email}\n` +
      `*Servicio:* ${formData.servicio}\n` +
      `*Fecha:* ${formData.fecha}\n` +
      `*Hora:* ${formData.hora}\n` +
      (formData.mensaje ? `*Mensaje:* ${formData.mensaje}\n` : '')
    
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
        <section className="relative animated-gradient overflow-hidden pt-[60px] sm:pt-[68px] lg:pt-[70px] pb-20 lg:pb-28">
          <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center opacity-20" />
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
              Tu solicitud de cita ha sido enviada por WhatsApp. Nuestro equipo confirmará tu horario 
              en breve. Gracias por confiar en Nueva Vida.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button onClick={() => { setSubmitted(false); setStep(1); setFormData({ nombre: '', telefono: '', email: '', servicio: '', fecha: '', hora: '', mensaje: '' }) }} className="bg-white text-marine hover:bg-white/90 rounded-full px-8 font-semibold">
                Agendar Otra Cita
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8" onClick={() => window.location.href = '/'}>
                Volver al Inicio
              </Button>
            </div>
          </div>
        </section>
      </>
    )
  }

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
              Agendar Cita
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Reserva tu{' '}
              <span className="text-cyan-light">Cita Médica</span>
            </h1>
            <p className="text-white/80 mt-6 text-lg max-w-2xl mx-auto">
              Elige el servicio, selecciona tu fecha preferida y agenda tu cita en minutos. 
              Te confirmaremos por WhatsApp.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="formulario" className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Steps */}
          <ScrollReveal>
            <div className="flex items-center justify-center mb-12">
              {[
                { num: 1, label: 'Datos Personales' },
                { num: 2, label: 'Seleccionar Servicio' },
                { num: 3, label: 'Fecha y Hora' },
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
                  {i < 2 && (
                    <div className={`w-16 sm:w-24 h-0.5 mx-2 mb-6 sm:mb-0 transition-all duration-300 ${
                      step > s.num ? 'bg-cyan' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>

          <div className="bg-white rounded-3xl shadow-2xl shadow-marine/5 border border-marine/5 p-8 sm:p-12">
            <AnimatePresence mode="wait">
              {/* Step 1: Personal Data */}
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
                      <User className="w-6 h-6 text-cyan" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-marine">Datos Personales</h2>
                      <p className="text-marine/50 text-sm">Cuéntanos un poco sobre ti</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="nombre" className="text-marine font-medium">Nombre Completo *</Label>
                      <Input
                        id="nombre"
                        placeholder="Tu nombre completo"
                        value={formData.nombre}
                        onChange={(e) => updateField('nombre', e.target.value)}
                        className="rounded-xl border-marine/10 focus:border-cyan"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefono" className="text-marine font-medium">Teléfono / WhatsApp *</Label>
                      <Input
                        id="telefono"
                        type="tel"
                        placeholder="+51 983 554 248"
                        value={formData.telefono}
                        onChange={(e) => updateField('telefono', e.target.value)}
                        className="rounded-xl border-marine/10 focus:border-cyan"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-marine font-medium">Correo Electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="rounded-xl border-marine/10 focus:border-cyan"
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      onClick={() => setStep(2)}
                      disabled={!formData.nombre || !formData.telefono}
                      className="bg-cyan hover:bg-cyan-light text-white font-semibold rounded-full px-8 shadow-lg shadow-cyan/25 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Siguiente <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Service Selection */}
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
                      <Calendar className="w-6 h-6 text-cyan" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-marine">Seleccionar Servicio</h2>
                      <p className="text-marine/50 text-sm">Elige el servicio que necesitas</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-marine font-medium">Servicio *</Label>
                    <Select value={formData.servicio} onValueChange={(v) => updateField('servicio', v)}>
                      <SelectTrigger className="rounded-xl border-marine/10">
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
                    <Label htmlFor="mensaje" className="text-marine font-medium">Mensaje Adicional</Label>
                    <Textarea
                      id="mensaje"
                      placeholder="Cuéntanos sobre tu consulta o síntomas..."
                      value={formData.mensaje}
                      onChange={(e) => updateField('mensaje', e.target.value)}
                      className="rounded-xl border-marine/10 focus:border-cyan min-h-[100px]"
                    />
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setStep(1)} className="rounded-full px-8 border-marine/20 text-marine">
                      Anterior
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      disabled={!formData.servicio}
                      className="bg-cyan hover:bg-cyan-light text-white font-semibold rounded-full px-8 shadow-lg shadow-cyan/25 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Siguiente <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Date & Time */}
              {step === 3 && (
                <motion.div
                  key="step3"
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
                      <p className="text-marine/50 text-sm">Selecciona tu horario preferido</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fecha" className="text-marine font-medium">Fecha Preferida *</Label>
                      <Input
                        id="fecha"
                        type="date"
                        value={formData.fecha}
                        onChange={(e) => updateField('fecha', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="rounded-xl border-marine/10 focus:border-cyan"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-marine font-medium">Hora Preferida *</Label>
                      <Select value={formData.hora} onValueChange={(v) => updateField('hora', v)}>
                        <SelectTrigger className="rounded-xl border-marine/10">
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

                  {/* Summary */}
                  <Card className="bg-gradient-to-r from-cyan/5 to-royal/5 border border-cyan/10">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-marine mb-4">Resumen de tu Cita</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-marine/60">Paciente:</span><span className="font-medium text-marine">{formData.nombre}</span></div>
                        <div className="flex justify-between"><span className="text-marine/60">Teléfono:</span><span className="font-medium text-marine">{formData.telefono}</span></div>
                        {formData.email && <div className="flex justify-between"><span className="text-marine/60">Email:</span><span className="font-medium text-marine">{formData.email}</span></div>}
                        <div className="flex justify-between"><span className="text-marine/60">Servicio:</span><span className="font-medium text-cyan">{formData.servicio}</span></div>
                        <div className="flex justify-between"><span className="text-marine/60">Fecha:</span><span className="font-medium text-marine">{formData.fecha}</span></div>
                        <div className="flex justify-between"><span className="text-marine/60">Hora:</span><span className="font-medium text-marine">{formData.hora}</span></div>
                        {formData.mensaje && <div className="pt-2 border-t border-marine/10"><span className="text-marine/60">Mensaje:</span><p className="font-medium text-marine mt-1">{formData.mensaje}</p></div>}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setStep(2)} className="rounded-full px-8 border-marine/20 text-marine">
                      Anterior
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={!formData.fecha || !formData.hora}
                      className="bg-cyan hover:bg-cyan-light text-white font-semibold rounded-full px-8 shadow-lg shadow-cyan/25 glow-cyan disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4 mr-2" /> Enviar por WhatsApp
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Info Cards */}
          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            {[
              { icon: MapPin, title: 'Ubicación', text: 'Av. Principal 123, Lima' },
              { icon: Clock, title: 'Horario', text: 'Lun-Vie 8:00-18:00' },
              { icon: Phone, title: 'Emergencias', text: '+51 983 554 248' },
            ].map((info, i) => (
              <ScrollReveal key={info.title} delay={i * 0.1}>
                <Card className="text-center border-0 shadow-md bg-muted/50">
                  <CardContent className="p-6 space-y-2">
                    <info.icon className="w-6 h-6 text-cyan mx-auto" />
                    <h3 className="font-semibold text-marine text-sm">{info.title}</h3>
                    <p className="text-marine/60 text-sm">{info.text}</p>
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
