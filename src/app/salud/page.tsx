import { fetchCMS } from '@/lib/fetchCMS'
import { HEALTH_ARTICLES_QUERY, HEALTH_SETTINGS_QUERY } from '@/lib/sanity.queries'
import SaludClient from './SaludClient'

export default async function SaludPage() {
  const [articles, settings] = await Promise.all([
    fetchCMS<any[]>(HEALTH_ARTICLES_QUERY),
    fetchCMS<any>(HEALTH_SETTINGS_QUERY),
  ])
  return <SaludClient articles={articles || []} settings={settings || null} />
}