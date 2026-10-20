import type { Metadata } from 'next'
import PromoClient from './PromoClient'

export const metadata: Metadata = {
  title: 'Zoom City — Explore the World Through Video',
  description: 'Discover cities through video reels, interactive maps, local tours and hidden gems. Download Zoom City on Android.',
  openGraph: {
    title: 'Zoom City — Explore the World Through Video',
    description: 'Discover cities through video reels, interactive maps, local tours and hidden gems.',
    images: [{ url: '/zoom-city-logo.png', width: 635, height: 569, alt: 'Zoom City' }],
  },
}

export default function PromoPage() {
  return <PromoClient />
}
