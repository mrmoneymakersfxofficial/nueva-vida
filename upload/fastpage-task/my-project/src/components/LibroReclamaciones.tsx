'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, CheckCircle2, AlertCircle, User, MapPin, Phone, Mail, MessageSquare, ChevronDown } from 'lucide-react';

/* ═══════════════════════════════════════════════════
   LIBRO DE RECLAMACIONES — Sertrade Design
   Modal profesional, minimalista y premium
   Cumple con el formato estándar del INDECOPI Perú
   ═══════════════════════════════════════════════════ */

interface FormData {
  nombre: string;
  dni: string;
  direccion: string;
  telefono: string;
  email: string;
  tipo: 'reclamo' | 'queja' | '';
  descripcion: string;
  pedido: string;
}

const INITIAL_FORM: FormData = {
  nombre: '',
  dni: '',
  direccion: '',
  telefono: '',
  email: '',
  tipo: '',
  descripcion: '',
  pedido: '',
};

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export default function LibroReclamaciones() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const update = useCallback(
    (field: keyof FormData, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    },
    [errors],
  );

  const validate = useCallback((): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.nombre.trim()) e.nombre = 'Nombre completo es requerido';
    if (!form.dni.trim()) e.dni = 'DNI es requerido';
    else if (!/^\d{8}$/.test(form.dni.trim())) e.dni = 'DNI debe tener 8 dígitos';
    if (!form.direccion.trim()) e.direccion = 'Dirección es requerida';
    if (!form.telefono.trim()) e.telefono = 'Teléfono es requerido';
    if (!form.email.trim()) e.email = 'Correo es requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Correo inválido';
    if (!form.tipo) e.tipo = 'Seleccione el tipo';
    if (!form.descripcion.trim()) e.descripcion = 'Describa su reclamo o queja';
    if (!form.pedido.trim()) e.pedido = 'Indique su pedido o solicitud';
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [form]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;
      setStatus('sending');

      // Simulate sending — replace with real API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In production, send to API:
      // await fetch('/api/libro-reclamaciones', { method: 'POST', body: JSON.stringify(form) });

      setStatus('success');
    },
    [form, validate],
  );

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setForm(INITIAL_FORM);
      setStatus('idle');
      setErrors({});
    }, 300);
  }, []);

  const today = new Date().toLocaleDateString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <>
      {/* ═══ TRIGGER BUTTON ═══ */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#004691] text-white text-sm font-medium hover:bg-[#003466] transition-all duration-300 active:scale-95 shadow-md shadow-[#004691]/20"
      >
        <FileText size={16} strokeWidth={1.8} />
        <span>Libro de Reclamaciones</span>
      </button>

      {/* ═══ MODAL OVERLAY ═══ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 pt-8 pb-8 overflow-y-auto"
            style={{ paddingTop: 'max(2rem, env(safe-area-inset-top))', paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}
            onClick={handleClose}
          >
            {/* ═══ MODAL CARD ═══ */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl shadow-black/20 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── HEADER ── */}
              <div className="relative bg-[#004691] px-6 py-5 md:px-8 md:py-6">
                {/* Decorative gold accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4a017] via-[#e0b030] to-[#d4a017]" />

                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 md:top-5 md:right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90"
                  aria-label="Cerrar"
                >
                  <X size={18} strokeWidth={2} />
                </button>

                {/* Title */}
                <div className="flex items-center gap-3 pr-12">
                  <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <FileText size={22} strokeWidth={1.8} className="text-[#d4a017]" />
                  </div>
                  <div>
                    <h2 className="text-white text-lg md:text-xl font-bold tracking-tight">
                      Libro de Reclamaciones
                    </h2>
                    <p className="text-white/50 text-xs md:text-sm mt-0.5">
                      Conforme al Código de Protección y Defensa del Consumidor — Ley N° 29571
                    </p>
                  </div>
                </div>
              </div>

              {/* ── PROVIDER INFO BAR ── */}
              <div className="bg-[#F8F9FB] border-b border-gray-100 px-6 py-4 md:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-1.5 text-xs">
                  <div>
                    <span className="text-gray-400 font-medium uppercase tracking-wider text-[10px]">Razón Social</span>
                    <p className="text-[#001C3D] font-semibold text-sm mt-0.5">Sertrade Design E.I.R.L.</p>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium uppercase tracking-wider text-[10px]">RUC</span>
                    <p className="text-[#001C3D] font-semibold text-sm mt-0.5">20610234567</p>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium uppercase tracking-wider text-[10px]">Dirección</span>
                    <p className="text-[#001C3D] font-semibold text-sm mt-0.5">Av. Javier Prado Este 4600, La Molina, Lima</p>
                  </div>
                </div>
              </div>

              {/* ── FORM BODY ── */}
              <div className="px-6 py-6 md:px-8 md:py-8">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-5">
                        <CheckCircle2 size={40} className="text-emerald-500" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-[#001C3D] text-xl font-bold mb-2">
                        Reclamo Registrado Exitosamente
                      </h3>
                      <p className="text-gray-500 text-sm max-w-sm leading-relaxed mb-6">
                        Su reclamo ha sido registrado con el código <span className="font-bold text-[#004691]">SR-{Date.now().toString(36).toUpperCase()}</span>.
                        Nuestro equipo se comunicará con usted en un plazo máximo de 30 días hábiles.
                      </p>
                      <button
                        onClick={handleClose}
                        className="px-6 py-2.5 rounded-lg bg-[#004691] text-white text-sm font-medium hover:bg-[#003466] transition-all duration-200 active:scale-95"
                      >
                        Cerrar
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      {/* ── Section: Datos del Consumidor ── */}
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <User size={16} strokeWidth={1.8} className="text-[#d4a017]" />
                          <h3 className="text-[#001C3D] text-sm font-bold uppercase tracking-wider">
                            Datos del Consumidor
                          </h3>
                          <div className="flex-1 h-px bg-gray-100" />
                          <span className="text-gray-300 text-xs">{today}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Nombre */}
                          <div className="sm:col-span-2">
                            <label className="block text-gray-500 text-xs font-medium mb-1.5 uppercase tracking-wider">
                              Nombre Completo <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="text"
                              value={form.nombre}
                              onChange={(e) => update('nombre', e.target.value)}
                              placeholder="Ej: Juan Pérez García"
                              className={`w-full px-4 py-3 rounded-xl bg-[#F8F9FB] border text-sm text-[#001C3D] placeholder-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#004691]/20 focus:border-[#004691] ${
                                errors.nombre ? 'border-red-300 bg-red-50/50' : 'border-gray-100'
                              }`}
                            />
                            {errors.nombre && (
                              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                <AlertCircle size={12} /> {errors.nombre}
                              </p>
                            )}
                          </div>

                          {/* DNI */}
                          <div>
                            <label className="block text-gray-500 text-xs font-medium mb-1.5 uppercase tracking-wider">
                              DNI <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="text"
                              maxLength={8}
                              value={form.dni}
                              onChange={(e) => update('dni', e.target.value.replace(/\D/g, ''))}
                              placeholder="8 dígitos"
                              className={`w-full px-4 py-3 rounded-xl bg-[#F8F9FB] border text-sm text-[#001C3D] placeholder-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#004691]/20 focus:border-[#004691] tabular-nums ${
                                errors.dni ? 'border-red-300 bg-red-50/50' : 'border-gray-100'
                              }`}
                            />
                            {errors.dni && (
                              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                <AlertCircle size={12} /> {errors.dni}
                              </p>
                            )}
                          </div>

                          {/* Teléfono */}
                          <div>
                            <label className="block text-gray-500 text-xs font-medium mb-1.5 uppercase tracking-wider">
                              Teléfono <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="tel"
                              value={form.telefono}
                              onChange={(e) => update('telefono', e.target.value)}
                              placeholder="Ej: 944 106 163"
                              className={`w-full px-4 py-3 rounded-xl bg-[#F8F9FB] border text-sm text-[#001C3D] placeholder-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#004691]/20 focus:border-[#004691] ${
                                errors.telefono ? 'border-red-300 bg-red-50/50' : 'border-gray-100'
                              }`}
                            />
                            {errors.telefono && (
                              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                <AlertCircle size={12} /> {errors.telefono}
                              </p>
                            )}
                          </div>

                          {/* Dirección */}
                          <div className="sm:col-span-2">
                            <label className="block text-gray-500 text-xs font-medium mb-1.5 uppercase tracking-wider flex items-center gap-1">
                              <MapPin size={12} /> Dirección <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="text"
                              value={form.direccion}
                              onChange={(e) => update('direccion', e.target.value)}
                              placeholder="Ej: Av. El Sol 123, San Juan de Lurigancho"
                              className={`w-full px-4 py-3 rounded-xl bg-[#F8F9FB] border text-sm text-[#001C3D] placeholder-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#004691]/20 focus:border-[#004691] ${
                                errors.direccion ? 'border-red-300 bg-red-50/50' : 'border-gray-100'
                              }`}
                            />
                            {errors.direccion && (
                              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                <AlertCircle size={12} /> {errors.direccion}
                              </p>
                            )}
                          </div>

                          {/* Email */}
                          <div className="sm:col-span-2">
                            <label className="block text-gray-500 text-xs font-medium mb-1.5 uppercase tracking-wider flex items-center gap-1">
                              <Mail size={12} /> Correo Electrónico <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="email"
                              value={form.email}
                              onChange={(e) => update('email', e.target.value)}
                              placeholder="Ej: correo@ejemplo.com"
                              className={`w-full px-4 py-3 rounded-xl bg-[#F8F9FB] border text-sm text-[#001C3D] placeholder-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#004691]/20 focus:border-[#004691] ${
                                errors.email ? 'border-red-300 bg-red-50/50' : 'border-gray-100'
                              }`}
                            />
                            {errors.email && (
                              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                <AlertCircle size={12} /> {errors.email}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* ── Section: Tipo ── */}
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-1 h-4 rounded-full bg-[#d4a017]" />
                          <h3 className="text-[#001C3D] text-sm font-bold uppercase tracking-wider">
                            Tipo de Reclamo
                          </h3>
                          <div className="flex-1 h-px bg-gray-100" />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { value: 'reclamo' as const, label: 'Reclamo', desc: 'Inconformidad relacionada a los productos o servicios' },
                            { value: 'queja' as const, label: 'Queja', desc: 'Malestar o descontento respecto a la atención' },
                          ].map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => update('tipo', opt.value)}
                              className={`relative text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                                form.tipo === opt.value
                                  ? 'border-[#004691] bg-[#004691]/[0.03] shadow-sm'
                                  : 'border-gray-100 bg-[#F8F9FB] hover:border-gray-200'
                              }`}
                            >
                              {form.tipo === opt.value && (
                                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#004691] flex items-center justify-center">
                                  <CheckCircle2 size={12} className="text-white" strokeWidth={3} />
                                </div>
                              )}
                              <p className={`text-sm font-bold ${form.tipo === opt.value ? 'text-[#004691]' : 'text-gray-400'}`}>
                                {opt.label}
                              </p>
                              <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                                {opt.desc}
                              </p>
                            </button>
                          ))}
                        </div>
                        {errors.tipo && (
                          <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                            <AlertCircle size={12} /> {errors.tipo}
                          </p>
                        )}
                      </div>

                      {/* ── Section: Detalle ── */}
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <MessageSquare size={16} strokeWidth={1.8} className="text-[#d4a017]" />
                          <h3 className="text-[#001C3D] text-sm font-bold uppercase tracking-wider">
                            Detalle del Reclamo
                          </h3>
                          <div className="flex-1 h-px bg-gray-100" />
                        </div>

                        <div className="space-y-4">
                          {/* Descripción */}
                          <div>
                            <label className="block text-gray-500 text-xs font-medium mb-1.5 uppercase tracking-wider">
                              Descripción <span className="text-red-400">*</span>
                            </label>
                            <textarea
                              value={form.descripcion}
                              onChange={(e) => update('descripcion', e.target.value)}
                              placeholder="Describa detalladamente los hechos que originan su reclamo o queja..."
                              rows={4}
                              className={`w-full px-4 py-3 rounded-xl bg-[#F8F9FB] border text-sm text-[#001C3D] placeholder-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#004691]/20 focus:border-[#004691] resize-none leading-relaxed ${
                                errors.descripcion ? 'border-red-300 bg-red-50/50' : 'border-gray-100'
                              }`}
                            />
                            {errors.descripcion && (
                              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                <AlertCircle size={12} /> {errors.descripcion}
                              </p>
                            )}
                          </div>

                          {/* Pedido */}
                          <div>
                            <label className="block text-gray-500 text-xs font-medium mb-1.5 uppercase tracking-wider">
                              Pedido del Consumidor <span className="text-red-400">*</span>
                            </label>
                            <textarea
                              value={form.pedido}
                              onChange={(e) => update('pedido', e.target.value)}
                              placeholder="¿Qué solución espera del proveedor?"
                              rows={3}
                              className={`w-full px-4 py-3 rounded-xl bg-[#F8F9FB] border text-sm text-[#001C3D] placeholder-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#004691]/20 focus:border-[#004691] resize-none leading-relaxed ${
                                errors.pedido ? 'border-red-300 bg-red-50/50' : 'border-gray-100'
                              }`}
                            />
                            {errors.pedido && (
                              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                <AlertCircle size={12} /> {errors.pedido}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* ── SUBMIT ── */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                        <p className="text-gray-300 text-[11px] leading-relaxed order-2 sm:order-1">
                          Ley N° 29571 — Código de Protección y Defensa del Consumidor.
                          <br />
                          Su información es tratada conforme a la Ley N° 29733 de Protección de Datos Personales.
                        </p>
                        <button
                          type="submit"
                          disabled={status === 'sending'}
                          className="order-1 sm:order-2 inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#004691] text-white text-sm font-bold uppercase tracking-wider hover:bg-[#003466] transition-all duration-200 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-[#004691]/25 hover:shadow-xl hover:shadow-[#004691]/30 relative overflow-hidden"
                        >
                          {status === 'sending' ? (
                            <>
                              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                              <span>Enviando...</span>
                            </>
                          ) : (
                            <>
                              <span>Registrar Reclamo</span>
                              <ChevronDown size={16} strokeWidth={2} className="rotate-[-90deg]" />
                            </>
                          )}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              {/* ── FOOTER ACCENT ── */}
              <div className="h-1 bg-gradient-to-r from-[#004691] via-[#d4a017] to-[#004691]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
