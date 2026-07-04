import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock, Heart } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { ve } from '@/lib/ve'

const quickLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/salud', label: 'Portal de Salud' },
  { href: '/reservas#hero', label: 'Agendar Cita' },
]

const services = [
  { href: '/servicios/ecografia-ginecologica', label: 'Ecografía Ginecológica' },
  { href: '/servicios/ecografia-obstetrica', label: 'Ecografía Obstétrica' },
  { href: '/servicios/biopsia', label: 'Biopsia' },
  { href: '/servicios/colposcopia', label: 'Colposcopia' },
  { href: '/servicios/papanicolaou', label: 'Papanicolau' },
  { href: '/servicios/control-preventivo', label: 'Control Preventivo' },
]

export default function Footer() {
  return (
    <footer className="main-web-footer bg-[#00153D] text-white relative">
      {/* Diffusion: seamless dark gradient from CTA above */}
      <div className="footer-diffusion-top" />

      {/* Decorative container (overflow-hidden keeps blurs contained) */}
      <div className="relative overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-cyan/5 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-royal/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-28 sm:pt-16 sm:pb-20 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="relative h-10 w-[140px] flex-shrink-0">
              <Image
                src="/logo-nuevavida.webp"
                alt="Nueva Vida"
                fill
                className="object-contain brightness-0 invert"
                sizes="140px"
              />
            </div>
            <p {...ve('siteSettings', 'siteSettings', 'footerDescription')} className="text-white/70 text-sm leading-relaxed">
              Brindamos atención médica especializada con la más alta calidad y calidez humana. 
              Su salud y bienestar son nuestra prioridad.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-cyan uppercase tracking-wider text-sm">Enlaces</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 hover:text-cyan transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan/50 group-hover:bg-cyan transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-cyan uppercase tracking-wider text-sm">Servicios</h4>
            <ul className="space-y-3">
              {services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 hover:text-cyan transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan/50 group-hover:bg-cyan transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-cyan uppercase tracking-wider text-sm">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/70">
                <MapPin className="w-4 h-4 text-cyan mt-0.5 flex-shrink-0" />
                <span {...ve('siteSettings', 'siteSettings', 'address')}>Av. Principal 123, Centro Médico, Lima - Perú</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/70">
                <Phone className="w-4 h-4 text-cyan flex-shrink-0" />
                <a {...ve('siteSettings', 'siteSettings', 'phone')} href="tel:+51983554248" className="hover:text-cyan transition-colors">+51 983 554 248</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/70">
                <Mail className="w-4 h-4 text-cyan flex-shrink-0" />
                <a {...ve('siteSettings', 'siteSettings', 'email')} href="mailto:info@nuevavida.pe" className="hover:text-cyan transition-colors">info@nuevavida.pe</a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/70">
                <Clock className="w-4 h-4 text-cyan mt-0.5 flex-shrink-0" />
                <div>
                  <p {...ve('siteSettings', 'siteSettings', 'businessHours')}>Lun - Vie: 4:00 PM - 8:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-6 sm:my-8 bg-white/10" />

        {/* Bottom bar */}
        <div className="flex items-center justify-center gap-3">
          <p className="text-white/80 text-xs sm:text-sm text-center leading-relaxed">
            © {new Date().getFullYear()} Nueva Vida - Consultorio Ginecológico. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
