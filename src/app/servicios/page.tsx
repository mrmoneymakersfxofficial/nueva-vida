import { fetchCMS } from '@/lib/fetchCMS'
import { SERVICES_CATEGORIES_QUERY, SERVICES_WITH_CATEGORY_QUERY } from '@/lib/sanity.queries'
import ServiciosClient from './ServiciosClient'

export default async function ServiciosPage() {
  const [categories, allServices] = await Promise.all([
    fetchCMS<any[]>(SERVICES_CATEGORIES_QUERY),
    fetchCMS<any[]>(SERVICES_WITH_CATEGORY_QUERY),
  ])

  return <ServiciosClient categories={categories || []} allServices={allServices || []} />
}