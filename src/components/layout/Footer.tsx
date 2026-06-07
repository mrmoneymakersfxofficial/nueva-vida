import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock, Heart } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const quickLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/salud', label: 'Portal de Salud' },
  { href: '/reservas', label: 'Agendar Cita' },
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
    <footer className="bg-marine text-white relative overflow-hidden">
      {/* Decorative top gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan via-royal to-cyan" />
      
      {/* Decorative circles */}
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-cyan/5 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-royal/10 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 flex-shrink-0">
                <Image
                  src="/logo-nuevavida.png"
                  alt="Nueva Vida"
                  fill
                  className="object-contain brightness-0 invert"
                  sizes="40px"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">NUEVA VIDA</h3>
                <p className="text-white/50 text-xs tracking-wider">CONSULTORIO GINECOLÓGICO</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
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
                <span>Av. Principal 123, Centro Médico, Lima - Perú</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/70">
                <Phone className="w-4 h-4 text-cyan flex-shrink-0" />
                <a href="tel:+51999999999" className="hover:text-cyan transition-colors">+51 999 999 999</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/70">
                <Mail className="w-4 h-4 text-cyan flex-shrink-0" />
                <a href="mailto:info@nuevavida.pe" className="hover:text-cyan transition-colors">info@nuevavida.pe</a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/70">
                <Clock className="w-4 h-4 text-cyan mt-0.5 flex-shrink-0" />
                <div>
                  <p>Lun - Vie: 8:00 AM - 6:00 PM</p>
                  <p>Sáb: 8:00 AM - 1:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-white/50 text-center sm:text-left">
            © {new Date().getFullYear()} Nueva Vida - Consultorio Ginecológico. Todos los derechos reservados.
          </p>
          <p className="text-white/50 text-center sm:text-right">
            Diseño y desarrollo por{' '}
            <a 
              href="https://www.fastpagepro.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan font-semibold hover:text-cyan-light transition-colors"
            >
              fastpagepro.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
