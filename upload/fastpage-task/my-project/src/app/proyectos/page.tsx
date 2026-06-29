import ProjectsPage from '@/components/ProjectsPage';
import { fetchCMS } from '@/lib/fetchCMS';
import { ALL_PROJECTS_QUERY } from '@/lib/sanity.queries';
import type { SanityProject } from '@/lib/sanity.client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portafolio de Proyectos | Sertrade Design',
  description: 'Explora nuestros más de 200 proyectos de arquitectura y construcción a nivel global. Casos de éxito en diseño comercial, salud y residencial en Perú, Colombia y Ecuador.',
  openGraph: {
    title: 'Portafolio de Proyectos | Sertrade Design',
    description: 'Más de 200 proyectos entregados. Casos de éxito en arquitectura comercial, de salud y residencial en Perú, Colombia y Ecuador.',
    images: [{ url: '/og-proyectos-final.png', width: 1200, height: 630, alt: 'Portafolio de Proyectos - Sertrade Design' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portafolio de Proyectos | Sertrade Design',
    description: 'Más de 200 proyectos entregados. Casos de éxito en arquitectura comercial, de salud y residencial en Perú, Colombia y Ecuador.',
    images: ['/og-proyectos-final.png'],
  },
};

export default async function Page() {
  const projects = await fetchCMS<SanityProject[]>(ALL_PROJECTS_QUERY);
  return <ProjectsPage projects={projects} />;
}