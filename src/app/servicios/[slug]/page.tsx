import { fetchCMS } from '@/lib/fetchCMS'
import { serviceBySlugQuery } from '@/lib/sanity.queries'
import ServiceDetailClient from './ServiceDetailClient'

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await fetchCMS<any>(serviceBySlugQuery(slug))
  return <ServiceDetailClient service={service} slug={slug} />
}