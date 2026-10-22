import { ImageResponse } from 'next/og'

// Slika koja se prikaže kad se link zoomcity.app deli (WhatsApp, Facebook, X, LinkedIn…)
export const alt = 'Zoom City — city video reels, local tours and offline maps'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #0b1121 0%, #073B4C 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 34, color: '#FFF32B', fontWeight: 700, letterSpacing: 2 }}>ZOOM CITY</div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 76, fontWeight: 800, lineHeight: 1.05, marginTop: 28 }}>
          <span>Explore the world</span>
          <span style={{ color: '#FFF32B' }}>through video reels</span>
        </div>
        <div style={{ display: 'flex', fontSize: 32, color: '#CDCDE0', marginTop: 34 }}>
          Local tours · Offline maps · Walk, run &amp; hike tracker
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: '#8fa3b8', marginTop: 46 }}>Cities across Europe · Free on Android · zoomcity.app</div>
      </div>
    ),
    size,
  )
}
