'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, Calendar, Clock, ChevronLeft, ChevronRight, User, MessageSquare, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/card'
import { Badge } from '@/components/ui/badge'

const WHATSAPP_NUMBER = '51983554248'

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
  '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '01:00 PM', '01:30 PM', '02:00 PM',
  '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM',
]

const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<'form' | 'calendar' | 'time' | 'confirm'>('form')
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    servicio: '',
    fecha: null as Date | null,
    hora: '',
  })
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const resetState = useCallback(() => {
    setStep('form')
    setFormData({ nombre: '', telefono: '', servicio: '', fecha: null, hora: '' })
    setSelectedDate(null)
    setSubmitted(false)
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    setTimeout(resetState, 300)
  }, [resetState])

  // Auto-close after inactivity
  useEffect(() => {
    if (isOpen) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false)
        resetState()
      }, 300000) // 5 minutes
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [isOpen, resetState])

  const handleDateSelect = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (date < today) return
    setSelectedDate(date)
    setFormData(prev => ({ ...prev, fecha: date }))
  }

  const prevMonth = () => {
    const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    const today = new Date()
    if (prev.getFullYear() < today.getFullYear() || (prev.getFullYear() === today.getFullYear() && prev.getMonth() < today.getMonth())) return
    setCurrentMonth(prev)
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const generateWhatsAppUrl = () => {
    const msg = `Hola Consultorio Nueva Vida, acabo de pre-agendar una cita médica a través de la web. Aquí mis datos:\n\n` +
      `• Nombre: ${formData.nombre}\n` +
      `• Teléfono: ${formData.telefono}\n` +
      `• Especialidad: ${formData.servicio}\n` +
      `• Fecha: ${formData.fecha ? formatDate(formData.fecha) : 'No seleccionada'}\n` +
      `• Hora: ${formData.hora}\n\n` +
      `Quedo a la espera de su confirmación final. ¡Gracias!`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
  }

  const handleSubmit = () => {
    window.open(generateWhatsAppUrl(), '_blank')
    setSubmitted(true)
  }

  const daysInMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth())
  const firstDay = getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth())
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-[60]"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group"
          aria-label="Abrir WhatsApp"
        >
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
          <span className="absolute inset-0 rounded-full bg-green-500 animate-pulse opacity-10" style={{ animationDuration: '2s' }} />
          {/* Button */}
          <div className="relative w-16 h-16 rounded-full bg-[#25D366] shadow-2xl shadow-green-500/30 flex items-center justify-center hover:bg-[#20BD5A] transition-all duration-300 hover:scale-110">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          {/* Tooltip */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-marine text-white text-sm px-4 py-2 rounded-lg shadow-lg whitespace-nowrap"
              >
                ¿Agendar una cita?
                <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-marine rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </motion.div>

      {/* Widget Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-[60] w-[360px] max-w-[calc(100vw-3rem)] rounded-2xl shadow-2xl shadow-marine/20 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#25D366] to-[#128C7E] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Nueva Vida</p>
                  <p className="text-white/70 text-xs">Agenda tu cita en línea</p>
                </div>
              </div>
              <button onClick={handleClose} className="text-white/70 hover:text-white transition-colors p-1" aria-label="Cerrar">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="bg-white max-h-[70vh] overflow-y-auto">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-bold text-marine text-lg">¡Solicitud Enviada!</h3>
                    <p className="text-marine/60 text-sm">Se abrió WhatsApp con tu pre-agendamiento. Espera la confirmación del consultorio.</p>
                    <Button onClick={() => { setSubmitted(false); resetState(); }} className="bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full px-6">
                      Agendar otra cita
                    </Button>
                  </motion.div>
                ) : step === 'form' ? (
                  <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-5 space-y-4">
                    <p className="text-marine font-semibold text-sm">Ingresa tus datos para agendar:</p>
                    <div className="space-y-2">
                      <Label className="text-marine/80 text-xs font-medium">Nombre Completo *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-marine/40" />
                        <Input
                          placeholder="Tu nombre"
                          value={formData.nombre}
                          onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                          className="pl-10 rounded-xl border-marine/10 focus:border-cyan text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-marine/80 text-xs font-medium">Teléfono *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-marine/40" />
                        <Input
                          placeholder="+51 983 554 248"
                          value={formData.telefono}
                          onChange={(e) => setFormData(prev => ({ ...prev, telefono: e.target.value }))}
                          className="pl-10 rounded-xl border-marine/10 focus:border-cyan text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-marine/80 text-xs font-medium">Servicio *</Label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-marine/40" />
                        <select
                          value={formData.servicio}
                          onChange={(e) => setFormData(prev => ({ ...prev, servicio: e.target.value }))}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-marine/10 focus:border-cyan text-sm bg-white text-marine/80 appearance-none cursor-pointer"
                        >
                          <option value="">Selecciona un servicio</option>
                          {services.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                    <Button
                      onClick={() => setStep('calendar')}
                      disabled={!formData.nombre || !formData.telefono || !formData.servicio}
                      className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-xl py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Calendar className="w-4 h-4 mr-2" /> Elegir fecha y hora
                    </Button>
                  </motion.div>
                ) : step === 'calendar' ? (
                  <motion.div key="calendar" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                        <ChevronLeft className="w-5 h-5 text-marine" />
                      </button>
                      <p className="text-marine font-semibold text-sm">
                        {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                      </p>
                      <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                        <ChevronRight className="w-5 h-5 text-marine" />
                      </button>
                    </div>
                    {/* Day headers */}
                    <div className="grid grid-cols-7 gap-1">
                      {DAYS.map(d => (
                        <div key={d} className="text-center text-xs font-medium text-marine/40 py-1">{d}</div>
                      ))}
                    </div>
                    {/* Day grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {[...Array(firstDay)].map((_, i) => (
                        <div key={`empty-${i}`} />
                      ))}
                      {[...Array(daysInMonth)].map((_, i) => {
                        const day = i + 1
                        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
                        const isToday = date.getTime() === today.getTime()
                        const isPast = date < today
                        const isSelected = selectedDate && date.getTime() === selectedDate.getTime()
                        const isSunday = date.getDay() === 0

                        return (
                          <button
                            key={day}
                            onClick={() => !isPast && !isSunday && handleDateSelect(day)}
                            disabled={isPast || isSunday}
                            className={`aspect-square rounded-xl text-sm font-medium transition-all duration-200 ${
                              isPast || isSunday
                                ? 'text-marine/20 cursor-not-allowed'
                                : isSelected
                                  ? 'bg-cyan text-white shadow-md shadow-cyan/30'
                                  : isToday
                                    ? 'bg-cyan/10 text-cyan font-bold'
                                    : 'text-marine hover:bg-cyan/5'
                            }`}
                          >
                            {day}
                          </button>
                        )
                      })}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setStep('form')} className="flex-1 rounded-xl border-marine/10 text-marine text-sm">
                        Atrás
                      </Button>
                      <Button
                        onClick={() => setStep('time')}
                        disabled={!selectedDate}
                        className="flex-1 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl disabled:opacity-40 text-sm"
                      >
                        Continuar
                      </Button>
                    </div>
                  </motion.div>
                ) : step === 'time' ? (
                  <motion.div key="time" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-5 space-y-4">
                    <div className="text-center mb-3">
                      <p className="text-marine/60 text-xs">Fecha seleccionada</p>
                      <p className="text-marine font-bold">
                        {selectedDate?.getDate()} de {MONTHS[selectedDate?.getMonth() ?? 0]} {selectedDate?.getFullYear()}
                      </p>
                    </div>
                    <p className="text-marine/80 text-xs font-medium">Selecciona la hora:</p>
                    <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto pr-1">
                      {timeSlots.map(t => (
                        <button
                          key={t}
                          onClick={() => setFormData(prev => ({ ...prev, hora: t }))}
                          className={`py-2.5 px-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                            formData.hora === t
                              ? 'bg-cyan text-white shadow-md shadow-cyan/25'
                              : 'bg-muted/50 text-marine/70 hover:bg-cyan/10 hover:text-cyan'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" onClick={() => setStep('calendar')} className="flex-1 rounded-xl border-marine/10 text-marine text-sm">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Atrás
                      </Button>
                      <Button
                        onClick={() => setStep('confirm')}
                        disabled={!formData.hora}
                        className="flex-1 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl disabled:opacity-40 text-sm"
                      >
                        Confirmar <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="confirm" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-5 space-y-4">
                    <h3 className="text-marine font-bold text-sm">Resumen de tu Cita</h3>
                    <div className="bg-gradient-to-br from-cyan/5 to-royal/5 rounded-xl p-4 space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-marine/60 flex items-center gap-2"><User className="w-3.5 h-3.5" /> Nombre:</span>
                        <span className="font-medium text-marine">{formData.nombre}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-marine/60 flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> Teléfono:</span>
                        <span className="font-medium text-marine">{formData.telefono}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-marine/60 flex items-center gap-2"><MessageSquare className="w-3.5 h-3.5" /> Servicio:</span>
                        <span className="font-medium text-cyan">{formData.servicio}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-marine/60 flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> Fecha:</span>
                        <span className="font-medium text-marine">{selectedDate ? formatDate(selectedDate) : '-'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-marine/60 flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> Hora:</span>
                        <span className="font-medium text-marine">{formData.hora || '-'}</span>
                      </div>
                    </div>
                    <p className="text-marine/50 text-xs text-center">
                      Al presionar enviar, se abrirá WhatsApp con tu pre-agendamiento.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setStep('time')} className="flex-1 rounded-xl border-marine/10 text-marine text-sm">
                        Atrás
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        className="flex-1 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl font-semibold text-sm shadow-lg shadow-green-500/25"
                      >
                        <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Enviar WhatsApp
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
