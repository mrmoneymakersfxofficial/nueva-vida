import { sanityFetch } from '@/sanity/live'
import HomePageClient from '@/components/HomePageClient'

const HERO_QUERY = `*[_type == "heroSlide" && !(_id in path("drafts.**"))] | order(order asc) [0] { _id, title, subtitle, ctaLabel, ctaLink, ctaType, order }`

const STATS_QUERY = `*[_type == "stat" && !(_id in path("drafts.**"))] | order(order asc) { _id, label, value, suffix, prefix, order }`

const SETTINGS_QUERY = `*[_type == "siteSettings" && !(_id in path("drafts.**"))][0] { _id, companyName, slogan, tagline, phone, whatsapp, email, address, businessHours }`

export default async function HomePage() {
  const [{ data: heroSlide }, { data: stats }, { data: siteSettings }] = await Promise.all([
    sanityFetch({ query: HERO_QUERY }),
    sanityFetch({ query: STATS_QUERY }),
    sanityFetch({ query: SETTINGS_QUERY }),
  ])

  return (
    <HomePageClient
      heroSlide={heroSlide || null}
      stats={stats || []}
      siteSettings={siteSettings || null}
    />
  )
}