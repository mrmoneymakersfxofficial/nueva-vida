import HomePage from '@/components/HomePage';
import { fetchCMS } from '@/lib/fetchCMS';
import {
  ALL_HERO_SLIDES_QUERY,
  ALL_STATS_QUERY,
  ALL_SERVICES_QUERY,
  ALL_SERVICE_CATEGORIES_QUERY,
  ALL_PROJECTS_QUERY,
  ALL_PARTNERS_QUERY,
} from '@/lib/sanity.queries';
import type {
  SanityHeroSlide,
  SanityStat,
  SanityService,
  SanityServiceCategory,
  SanityProject,
  SanityPartner,
} from '@/lib/sanity.client';

// Revalidation handled by SanityLive tag-based revalidation.
// Falls back to 60s ISR if SanityLive is not connected.
export const revalidate = 0;

export default async function Page() {
  const [heroSlides, stats, services, categories, projects, partners] = await Promise.all([
    fetchCMS<SanityHeroSlide[]>(ALL_HERO_SLIDES_QUERY),
    fetchCMS<SanityStat[]>(ALL_STATS_QUERY),
    fetchCMS<SanityService[]>(ALL_SERVICES_QUERY),
    fetchCMS<SanityServiceCategory[]>(ALL_SERVICE_CATEGORIES_QUERY),
    fetchCMS<SanityProject[]>(ALL_PROJECTS_QUERY),
    fetchCMS<SanityPartner[]>(ALL_PARTNERS_QUERY),
  ]);

  return (
    <HomePage
      heroSlides={heroSlides}
      stats={stats}
      services={services}
      categories={categories}
      projects={projects}
      partners={partners}
    />
  );
}