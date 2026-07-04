import { fetchCMS } from '@/lib/fetchCMS';
import { ALL_PROJECTS_QUERY, projectBySlugQuery } from '@/lib/sanity.queries';
import type { SanityProject } from '@/lib/sanity.client';
import type { Metadata } from 'next';
import { normalizeProject, getFallbackBySlug, getFallbackSlugs } from '@/lib/projectHelpers';
import type { ProjectData } from '@/lib/projectHelpers';
import ProjectDetailPage from '@/components/ProjectDetailPage';

export const revalidate = 0;

/* ═══════════════════════════════════════════════════
   STATIC PARAMS — pre-generate all project slugs
   ═══════════════════════════════════════════════════ */
export async function generateStaticParams() {
  try {
    const projects = await fetchCMS<Pick<SanityProject, 'slug'>[]>(ALL_PROJECTS_QUERY);
    if (projects?.length) {
      return projects
        .map(p => {
          const slug = typeof p.slug === 'string' ? p.slug : (p.slug as { current?: string })?.current;
          return slug ? { slug } : null;
        })
        .filter(Boolean) as { slug: string }[];
    }
  } catch {
    // CMS unavailable — use fallback slugs
  }
  return getFallbackSlugs().map(slug => ({ slug }));
}

/* ═══════════════════════════════════════════════════
   DYNAMIC METADATA
   ═══════════════════════════════════════════════════ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cmsProject = await fetchCMS<SanityProject>(projectBySlugQuery(slug));
  const title = cmsProject?.title || getFallbackBySlug(slug)?.title || slug;

  return {
    title: `${title} | Sertrade Design`,
    description: `Proyecto de arquitectura: ${title}. Conoce más sobre este desarrollo por Sertrade Design.`,
    openGraph: {
      title: `${title} | Sertrade Design`,
      description: `Proyecto de arquitectura: ${title}. Conoce más sobre este desarrollo por Sertrade Design.`,
      images: cmsProject
        ? [normalizeProject(cmsProject).images[0] || '/og-proyectos-final.png']
        : [getFallbackBySlug(slug)?.images[0] || '/og-proyectos-final.png'],
    },
  };
}

/* ═══════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════ */
export default async function ProjectSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch the single project
  const cmsProject = await fetchCMS<SanityProject>(projectBySlugQuery(slug));
  const project = cmsProject
    ? normalizeProject(cmsProject)
    : getFallbackBySlug(slug);

  // Fetch all projects for "More Projects" section
  const allProjects = await fetchCMS<SanityProject[]>(ALL_PROJECTS_QUERY);
  const moreProjects = (allProjects || [])
    .map(normalizeProject)
    .filter(p => p.slug !== slug)
    .slice(0, 3);

  return <ProjectDetailPage project={project || null} moreProjects={moreProjects} />;
}