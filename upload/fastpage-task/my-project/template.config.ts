/**
 * ═══════════════════════════════════════════════════════════
 *  FASTPAGEPRO — PLANTILLA STARTER
 *  Configuración rápida para adaptar a cualquier negocio.
 *
 *  Instrucciones:
 *  1. Edita los valores de este archivo con los datos de tu cliente.
 *  2. Reemplaza los logos e imágenes en /public/ con los del nuevo negocio.
 *  3. Ejecuta: npm install && npm run dev
 *  4. Configura tu proyecto Sanity (ver SETUP.md).
 * ═══════════════════════════════════════════════════════════
 */

export const TEMPLATE_CONFIG = {
  /* ─── NEGOCIO ─── */
  businessName: 'Sertrade Design',
  businessNameShort: 'Sertrade',
  slogan: 'Arquitectura & Construcción',
  tagline: 'Soluciones integrales de arquitectura, diseño y construcción.',
  description: 'Empresa líder en arquitectura, diseño de interiores y construcción con más de 14 años de experiencia en proyectos comerciales, residenciales y de salud.',

  /* ─── CONTACTO ─── */
  phone: '+51 944 106 163',
  phoneRaw: '51944106163',           // Sin + ni espacios — para links wa.me
  whatsapp: '51944106163',
  email: 'info@sertradedesign.com',
  address: 'Lima, Perú',
  businessHours: 'Lun - Vie: 8:00 - 18:00',

  /* ─── REDES SOCIALES ─── */
  facebookUrl: '',
  instagramUrl: '',
  linkedinUrl: '',
  tiktokUrl: '',
  youtubeUrl: '',

  /* ─── COLORES ─── */
  colors: {
    primary: '#004691',              // Azul principal
    primaryLight: '#0062b8',         // Azul hover
    accent: '#d4a017',               // Dorado
    accentDark: '#bfa032',           // Dorado hover
    dark: '#001C3D',                 // Azul oscuro (fondo video, cards)
    text: '#1a1a1a',
    textMuted: '#6b7280',
  },

  /* ─── SEO ─── */
  siteUrl: 'https://midominio.com',
  seoTitle: 'Sertrade Design — Arquitectura & Construcción',
  seoDescription: 'Soluciones integrales de arquitectura, diseño y construcción.',

  /* ─── NAVEGACIÓN ─── */
  navItems: [
    { label: 'Inicio', href: '/' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Portafolio', href: '/proyectos' },
    { label: 'Contacto', href: '/contacto' },
  ] as const,

  /* ─── IDIOMA / LOCALE ─── */
  locale: 'es',
  timezone: 'America/Lima',
} as const;

export type TemplateConfig = typeof TEMPLATE_CONFIG;