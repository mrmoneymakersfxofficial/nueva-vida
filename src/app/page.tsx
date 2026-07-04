import { sanityFetch } from '@/sanity/live'
import HomePageClient from '@/components/HomePageClient'
import { HERO_QUERY, STATS_QUERY, HOME_SETTINGS_QUERY, HOME_SERVICES_QUERY, HOME_TESTIMONIALS_QUERY, HOME_MENTORSHIPS_QUERY, HOME_FACILITIES_QUERY } from '@/lib/sanity.queries'

export default async function HomePage() {
  const [
    { data: heroSlide },
    { data: stats },
    { data: siteSettings },
    { data: services },
    { data: testimonials },
    { data: mentorships },
    { data: facilities },
  ] = await Promise.all([
    sanityFetch({ query: HERO_QUERY }),
    sanityFetch({ query: STATS_QUERY }),
    sanityFetch({ query: HOME_SETTINGS_QUERY }),
    sanityFetch({ query: HOME_SERVICES_QUERY }),
    sanityFetch({ query: HOME_TESTIMONIALS_QUERY }),
    sanityFetch({ query: HOME_MENTORSHIPS_QUERY }),
    sanityFetch({ query: HOME_FACILITIES_QUERY }),
  ])

  // Coerce empty objects / nulls to safe fallbacks
  const h = heroSlide && '_id' in heroSlide ? heroSlide : null
  const s = Array.isArray(stats) ? stats : []
  const st = siteSettings && '_id' in siteSettings ? siteSettings : null
  const svc = Array.isArray(services) ? services : []
  const tst = Array.isArray(testimonials) ? testimonials : []
  const men = Array.isArray(mentorships) ? mentorships : []
  const fac = Array.isArray(facilities) ? facilities : []

  return (
    <HomePageClient
      heroSlide={h}
      stats={s}
      siteSettings={st}
      services={svc}
      testimonials={tst}
      mentorships={men}
      facilities={fac}
    />
  )
}