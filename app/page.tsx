import type { Metadata } from 'next'
import PromoClient from './_components/PromoClient'

// Početna = promo stranica (ranije je ovde bio odbrojavač do lansiranja 27.07.2026,
// a promo je bio skriven na /promo — sada /promo preusmerava ovde, vidi next.config.mjs)

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.uroskovcicdeveloper.zoomcity'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

// Gradovi i broj tura iz app-ine baze (Firestore REST, javno čitanje) — osvežava se
// jednom dnevno, pa novi grad (npr. Beč) sam stigne na sajt bez izmene koda
export const revalidate = 86400

const FIRESTORE = 'https://firestore.googleapis.com/v1/projects/expo-zoom-start/databases/(default)/documents'
const FALLBACK_CITIES = ['Amsterdam', 'Barcelona', 'Belgrade', 'Bologna', 'Bordeaux', 'Florence', 'Frankfurt', 'Ljubljana', 'London', 'Madrid', 'Milano', 'Munich', 'Novi Sad', 'Paris', 'Pula', 'Rome', 'Valencia']
const FALLBACK_TOURS = 31

async function getAppStats(): Promise<{ cities: string[]; tourCount: number }> {
  try {
    const [cityRes, tourRes] = await Promise.all([
      fetch(`${FIRESTORE}/location?pageSize=200`, { next: { revalidate } }),
      fetch(`${FIRESTORE}:runAggregationQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          structuredAggregationQuery: {
            structuredQuery: { from: [{ collectionId: 'tour', allDescendants: true }] },
            aggregations: [{ alias: 'n', count: {} }],
          },
        }),
        next: { revalidate },
      }),
    ])
    const cityJson = (await cityRes.json()) as { documents?: { fields?: { name?: { stringValue?: string } } }[] }
    const cities = (cityJson.documents ?? [])
      .map(d => d.fields?.name?.stringValue?.trim())
      .filter((n): n is string => !!n)
      .sort((a, b) => a.localeCompare(b))
    const tourJson = (await tourRes.json()) as { result?: { aggregateFields?: { n?: { integerValue?: string } } } }[]
    const tourCount = Number(tourJson?.[0]?.result?.aggregateFields?.n?.integerValue ?? 0)
    return {
      cities: cities.length > 0 ? cities : FALLBACK_CITIES,
      tourCount: tourCount > 0 ? tourCount : FALLBACK_TOURS,
    }
  } catch {
    return { cities: FALLBACK_CITIES, tourCount: FALLBACK_TOURS }
  }
}

// Strukturirani podaci za Google — samo istinite informacije (bez ocena / broja preuzimanja
// dok ih nema na Google Play-u)
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MobileApplication',
      name: 'Zoom City',
      operatingSystem: 'Android',
      applicationCategory: 'TravelApplication',
      description:
        'Discover cities through local videos and photos, find tours and places, plan walking routes and track walks, runs and hikes with maps that work offline.',
      url: 'https://zoomcity.app/',
      downloadUrl: GOOGLE_PLAY_URL,
      installUrl: GOOGLE_PLAY_URL,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      featureList: [
        'City video reels',
        'Local tours with booking links',
        'Places by category: attractions, museums, restaurants, cafés, parks',
        'Offline city maps',
        'Walk, run, hike and ride GPS tracker with pace, steps and elevation gain from terrain data',
        'Walking route planner with turn-by-turn directions',
        'Photo posts',
        'GPX export for Strava, Garmin and OsmAnd',
        'Offline travel phrasebook translator',
      ],
    },
    {
      '@type': 'Organization',
      name: 'Zoom City',
      url: 'https://zoomcity.app/',
      logo: 'https://zoomcity.app/zoom-city-logo.png',
    },
    {
      '@type': 'WebSite',
      name: 'Zoom City',
      url: 'https://zoomcity.app/',
    },
  ],
}

export default async function HomePage() {
  const { cities, tourCount } = await getAppStats()
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PromoClient cities={cities} tourCount={tourCount} />
    </>
  )
}
