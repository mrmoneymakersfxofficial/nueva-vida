import { getImageUrl, plainText } from '@/lib/sanity.client';
import type { SanityProject } from '@/lib/sanity.client';

/* ═══════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════ */
export interface ProjectData {
  _id?: string;
  title: string;
  slug: string;
  category: string;
  location: string;
  area: string;
  year: string;
  client: string;
  status: string;
  description: string;
  images: string[];
}

/* ═══════════════════════════════════════════════════
   FALLBACK PROJECTS (server-safe, no 'use client')
   ═══════════════════════════════════════════════════ */
const fallbackProjects: Omit<ProjectData, '_id'>[] = [
  {
    slug: 'plaza-central', title: 'Centro Comercial Plaza Central', category: 'Comercial',
    location: 'Lima, Perú', area: '15,000 m²', year: '2023', client: 'Inversiones SAC', status: 'Completado',
    description: 'Un complejo comercial de tres niveles que integra retail, entretenimiento y gastronomía bajo un concepto arquitectónico moderno y sostenible. El diseño prioriza la circulación fluida y la experiencia del visitante con espacios abiertos iluminados naturalmente.',
    images: [
      'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1200&q=80',
      'https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=800&q=80',
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80',
      'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80',
    ],
  },
  {
    slug: 'clinica-san-rafael', title: 'Clínica San Rafael', category: 'Salud',
    location: 'Bogotá, Colombia', area: '8,500 m²', year: '2022', client: 'Grupo Salud Integral', status: 'Completado',
    description: 'Una clínica de alta complejidad diseñada para optimizar los flujos clínicos y ofrecer un ambiente terapéutico.',
    images: [
      'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1200&q=80',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80',
    ],
  },
  {
    slug: 'residencial-los-cedros', title: 'Residencial Los Cedros', category: 'Residencial',
    location: 'La Molina, Lima', area: '3,200 m²', year: '2024', client: 'Privado', status: 'En Proceso',
    description: 'Vivienda unifamiliar contemporánea que fusiona la calidez del hogar con líneas arquitectónicas audaces.',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    ],
  },
  {
    slug: 'oficinas-torre-andina', title: 'Oficinas Torre Andina', category: 'Comercial',
    location: 'Quito, Ecuador', area: '6,000 m²', year: '2023', client: 'Corporación Andina', status: 'Completado',
    description: 'Torre de oficinas corporativas con certificación LEED Gold.',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
    ],
  },
  {
    slug: 'hospital-metropolitano', title: 'Hospital Metropolitano', category: 'Salud',
    location: 'Guayaquil, Ecuador', area: '22,000 m²', year: '2024', client: 'Ministerio de Salud', status: 'En Proceso',
    description: 'Proyecto hospitalario de gran escala con 200 camas.',
    images: [
      'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80',
      'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    ],
  },
  {
    slug: 'casa-del-lago', title: 'Casa del Lago', category: 'Residencial',
    location: 'Cusco, Perú', area: '1,800 m²', year: '2023', client: 'Privado', status: 'Completado',
    description: 'Residencia de lujo junto al lago que integra materiales locales.',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    ],
  },
];

/* ═══════════════════════════════════════════════════
   HELPERS (server-safe)
   ═══════════════════════════════════════════════════ */
export function normalizeProject(p: SanityProject): ProjectData {
  const slug = typeof p.slug === 'string' ? p.slug : (p.slug as { current?: string })?.current || '';
  const galleryUrls = p.gallery?.map(img => getImageUrl(img, 1200, 800) || '').filter(Boolean) || [];
  const coverUrl = getImageUrl(p.coverImage, 1200, 800) || '';
  const images = galleryUrls.length > 0 ? galleryUrls : (coverUrl ? [coverUrl] : fallbackProjects[0].images);
  return {
    _id: p._id,
    title: p.title,
    slug,
    category: p.tags?.[0] || 'Proyecto',
    location: p.location || '',
    area: p.area ? `${p.area} m²` : '',
    year: p.year || '',
    client: p.client || '',
    status: p.status === 'completed' ? 'Completado' : p.status === 'in-progress' ? 'En Proceso' : 'Planificado',
    description: plainText(p.description) || '',
    images,
  };
}

export function getFallbackBySlug(slug: string): ProjectData | undefined {
  return fallbackProjects.find(p => p.slug === slug);
}

export function getFallbackSlugs(): string[] {
  return fallbackProjects.map(p => p.slug);
}