import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Download Zoom City',
  description: 'Download Zoom City and explore cities through video reels. Available on Android.',
  openGraph: {
    title: 'Download Zoom City',
    description: 'Download Zoom City and explore cities through video reels.',
    images: [{ url: '/zoom-city-logo.png', width: 635, height: 569, alt: 'Zoom City Logo' }],
  },
}

const GOOGLE_PLAY_URL =
  'https://play.google.com/store/apps/details?id=com.uroskovcicdeveloper.zoomcity'

export default function DownloadsPage() {
  return (
    <>
      <style>{`
        .dl-page {
          min-height: 100vh;
          background: linear-gradient(160deg, #161622 0%, #073B4C 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
          font-family: var(--font-dm-sans), sans-serif;
          box-sizing: border-box;
        }
        .dl-title {
          font-family: var(--font-bebas-neue), sans-serif;
          font-size: clamp(2.4rem, 8vw, 4rem);
          color: #FFF32B;
          letter-spacing: 0.04em;
          text-align: center;
          margin: 0 0 12px;
          line-height: 1;
        }
        .dl-desc {
          color: rgba(205, 205, 224, 0.8);
          font-size: 1rem;
          text-align: center;
          max-width: 420px;
          margin: 0 0 48px;
          line-height: 1.6;
        }
        .dl-buttons {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
          width: 100%;
          max-width: 320px;
        }
        .btn-play {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #FFF32B;
          color: #161622;
          border-radius: 14px;
          padding: 14px 28px;
          text-decoration: none;
          width: 100%;
          box-sizing: border-box;
          transition: opacity 0.2s, transform 0.15s;
        }
        .btn-play:hover {
          opacity: 0.88;
          transform: translateY(-2px);
        }
        .btn-ios {
          display: flex;
          align-items: center;
          gap: 14px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(205,205,224,0.45);
          border-radius: 14px;
          padding: 14px 28px;
          width: 100%;
          box-sizing: border-box;
          cursor: not-allowed;
        }
        .btn-label-small {
          font-size: 0.68rem;
          font-weight: 500;
          opacity: 0.7;
          line-height: 1;
        }
        .btn-label-big {
          font-size: 1.15rem;
          font-weight: 700;
          line-height: 1.2;
        }
        .dl-back {
          margin-top: 48px;
          color: rgba(205,205,224,0.45);
          font-size: 0.85rem;
          text-decoration: none;
          transition: color 0.2s;
        }
        .dl-back:hover {
          color: #FFF32B;
        }
      `}</style>

      <main className="dl-page">
        <Image
          src="/zoom-city-logo.png"
          alt="Zoom City"
          width={100}
          height={90}
          style={{ marginBottom: 28, objectFit: 'contain' }}
          priority
        />

        <h1 className="dl-title">Download Zoom City</h1>

        <p className="dl-desc">
          Explore cities through video reels. Discover local experiences, hidden gems and creators from around the world.
        </p>

        <div className="dl-buttons">
          {/* Google Play */}
          <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className="btn-play">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M3.18 23.76c.3.17.65.19.97.07L14.93 12 11.07 8.14 3.18 23.76z" fill="#161622" opacity="0.6" />
              <path d="M20.54 10.27L17.1 8.3l-3.54 3.54 3.54 3.54 3.46-1.99a1.74 1.74 0 000-3.12z" fill="#161622" />
              <path d="M3.18.24a1.74 1.74 0 00-.18.78v21.96c0 .28.06.54.18.78L14.93 12 3.18.24z" fill="#161622" opacity="0.8" />
              <path d="M3.15.24l11.78 11.76L17.1 8.3 4.12.17A1.74 1.74 0 003.15.24z" fill="#161622" opacity="0.4" />
            </svg>
            <div>
              <div className="btn-label-small">GET IT ON</div>
              <div className="btn-label-big">Google Play</div>
            </div>
          </a>

          {/* App Store — coming soon */}
          <div className="btn-ios">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div>
              <div className="btn-label-small">COMING SOON</div>
              <div className="btn-label-big">App Store</div>
            </div>
          </div>
        </div>

        <a href="/" className="dl-back">← Back to zoomcity.app</a>
      </main>
    </>
  )
}
