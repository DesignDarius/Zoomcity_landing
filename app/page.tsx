import type { Metadata } from 'next'
import PromoClient from './_components/PromoClient'

// Početna = promo stranica (ranije je ovde bio odbrojavač do lansiranja 27.07.2026,
// a promo je bio skriven na /promo — sada /promo preusmerava ovde, vidi next.config.mjs)

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.uroskovcicdeveloper.zoomcity'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
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
        'Discover cities through local video reels, find tours and places, and track walks, runs and hikes with maps that work offline.',
      url: 'https://zoomcity.app/',
      downloadUrl: GOOGLE_PLAY_URL,
      installUrl: GOOGLE_PLAY_URL,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      featureList: [
        'City video reels',
        'Local tours with booking links',
        'Places by category: attractions, museums, restaurants, cafés, parks',
        'Offline city maps',
        'Walk, run and hike GPS tracker with pace, climb and steps',
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

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PromoClient />
    </>
  )
}
