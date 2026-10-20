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

export const metadata: Metadata = {
  title: 'Zoom City – Something Big Is Coming',
  description: 'We\'ve rebuilt Zoom City from the ground up. New features, faster performance, and a completely redesigned experience for travelers.',
  generator: 'v0.app',
  openGraph: {
    title: 'Zoom City – Something Big Is Coming',
    description: 'We\'ve rebuilt Zoom City from the ground up. New features, faster performance, and a completely redesigned experience for travelers.',
    images: [
      {
        url: '/zoom-city-logo.png',
        width: 635,
        height: 569,
        alt: 'Zoom City Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zoom City – Something Big Is Coming',
    description: 'We\'ve rebuilt Zoom City from the ground up. New features, faster performance, and a completely redesigned experience for travelers.',
    images: ['/zoom-city-logo.png'],
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
