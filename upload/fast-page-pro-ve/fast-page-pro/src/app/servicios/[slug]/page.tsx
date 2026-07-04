import { fetchCMS } from '@/lib/fetchCMS';
import { ALL_SERVICE_CATEGORIES_QUERY, serviceCategoryBySlugQuery, servicesByCategorySlugQuery } from '@/lib/sanity.queries';
import type { SanityService, SanityServiceCategory } from '@/lib/sanity.client';
import type { Metadata } from 'next';
import ServiceDetailPage from '@/components/ServiceDetailPage';

export const revalidate = 0;

const FALLBACK_SLUGS = ['diseno', 'servicios-generales', 'implementacion'];

const CATEGORY_LABELS: Record<string, string> = {
  diseno: 'Diseno',
  'servicios-generales': 'Servicios Generales',
  implementacion: 'Implementacion',
};

export async function generateStaticParams() {
  try {
    const categories = await fetchCMS<SanityServiceCategory[]>(ALL_SERVICE_CATEGORIES_QUERY);
    if (categories?.length) {
      return categories
        .map(cat => {
          const slug = typeof cat.slug === 'string' ? cat.slug : (cat.slug as { current?: string })?.current;
          return slug ? { slug } : null;
        })
        .filter(Boolean) as { slug: string }[];
    }
  } catch {}
  return FALLBACK_SLUGS.map(slug => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await fetchCMS<SanityServiceCategory>(serviceCategoryBySlugQuery(slug));
  const title = category?.name || CATEGORY_LABELS[slug] || slug;

  return {
    title: `${title} | Fast Page Pro`,
    description: `Servicio de ${title} — Soluciones integrales por Fast Page Pro.`,
    openGraph: {
      title: `${title} | Fast Page Pro`,
      description: `Servicio de ${title}.`,
      images: [{ url: '/og-servicios.jpg', width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function ServiceSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [category, services] = await Promise.all([
    fetchCMS<SanityServiceCategory>(serviceCategoryBySlugQuery(slug)),
    fetchCMS<SanityService[]>(servicesByCategorySlugQuery(slug)),
  ]);

  return (
    <ServiceDetailPage
      category={category}
      services={services}
      fallbackSlug={slug}
    />
  );
}