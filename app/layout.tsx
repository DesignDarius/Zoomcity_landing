import type { Metadata, Viewport } from 'next'
import { Bebas_Neue, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const bebasNeue = Bebas_Neue({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-bebas-neue'
})

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans'
})

const TITLE = 'Zoom City — City Video Reels, Local Tours & Offline Maps'
const DESCRIPTION =
  'Discover 17 European cities through local video reels, find tours and places, and track walks, runs and hikes with maps that work offline. Free on Android.'

export const metadata: Metadata = {
  metadataBase: new URL('https://zoomcity.app'),
  title: { default: TITLE, template: '%s | Zoom City' },
  description: DESCRIPTION,
  applicationName: 'Zoom City',
  keywords: [
    'travel app',
    'city video reels',
    'city guide app',
    'local tours',
    'offline city map',
    'walking tracker',
    'hiking tracker offline',
    'running tracker',
    'GPX export',
    'travel phrasebook',
    'Europe city travel',
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: 'https://zoomcity.app/',
    siteName: 'Zoom City',
    title: TITLE,
    description: DESCRIPTION,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#073a4b',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable} ${dmSans.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
