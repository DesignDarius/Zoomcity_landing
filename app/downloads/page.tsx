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

const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&color=161622&bgcolor=FFF32B&margin=12&data=${encodeURIComponent(GOOGLE_PLAY_URL)}`

export default function DownloadsPage() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .dl-page {
          min-height: 100vh;
          background: linear-gradient(160deg, #161622 0%, #073B4C 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px 24px;
          font-family: var(--font-dm-sans), sans-serif;
        }
        .dl-title {
          font-family: var(--font-bebas-neue), sans-serif;
          font-size: clamp(2.4rem, 8vw, 4rem);
          color: #FFF32B;
          letter-spacing: 0.04em;
          text-align: center;
          margin: 24px 0 12px;
          line-height: 1;
        }
        .dl-desc {
          color: rgba(205, 205, 224, 0.75);
          font-size: 1rem;
          text-align: center;
          max-width: 400px;
          margin: 0 auto 40px;
          line-height: 1.6;
        }
        .dl-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
          width: 100%;
          max-width: 480px;
        }
        /* QR block */
        .dl-qr-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .dl-qr-frame {
          border-radius: 16px;
          overflow: hidden;
          border: 3px solid #FFF32B;
          box-shadow: 0 0 24px rgba(255, 243, 43, 0.25);
          display: flex;
        }
        .dl-qr-label {
          color: rgba(205,205,224,0.55);
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        /* Divider */
        .dl-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
        }
        .dl-divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.1);
        }
        .dl-divider-text {
          color: rgba(205,205,224,0.4);
          font-size: 0.8rem;
        }
        /* Buttons */
        .dl-buttons {
          display: flex;
          flex-direction: column;
          gap: 14px;
          width: 100%;
        }
        .btn-play {
          display: block;
          transition: opacity 0.2s, transform 0.15s;
        }
        .btn-play:hover {
          opacity: 0.88;
          transform: translateY(-2px);
        }
        .btn-play img {
          width: 100%;
          height: auto;
          border-radius: 10px;
          display: block;
        }
        .btn-ios {
          display: flex;
          align-items: center;
          gap: 14px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(205,205,224,0.4);
          border-radius: 14px;
          padding: 12px 24px;
          width: 100%;
          cursor: not-allowed;
        }
        .btn-label-small {
          font-size: 0.65rem;
          font-weight: 500;
          line-height: 1;
          letter-spacing: 0.05em;
        }
        .btn-label-big {
          font-size: 1.1rem;
          font-weight: 700;
          line-height: 1.2;
        }
        .dl-back {
          margin-top: 40px;
          color: rgba(205,205,224,0.35);
          font-size: 0.82rem;
          text-decoration: none;
          transition: color 0.2s;
        }
        .dl-back:hover { color: #FFF32B; }
      `}</style>

      <main className="dl-page">
        {/* Logo */}
        <Image
          src="/zoom-city-logo.png"
          alt="Zoom City"
          width={88}
          height={80}
          style={{ objectFit: 'contain' }}
          priority
        />

        <h1 className="dl-title">Download Zoom City</h1>

        <p className="dl-desc">
          Explore cities through video reels. Discover local experiences, hidden gems and creators from around the world.
        </p>

        <div className="dl-inner">
          {/* QR Code */}
          <div className="dl-qr-block">
            <div className="dl-qr-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={QR_URL} alt="QR Code — Download Zoom City" width={180} height={180} />
            </div>
            <span className="dl-qr-label">Scan with your phone to download</span>
          </div>

          {/* Divider */}
          <div className="dl-divider">
            <div className="dl-divider-line" />
            <span className="dl-divider-text">or</span>
            <div className="dl-divider-line" />
          </div>

          {/* Buttons */}
          <div className="dl-buttons">
            {/* Google Play — official badge */}
            <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className="btn-play">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt="Get it on Google Play"
                width={646}
                height={250}
              />
            </a>

            {/* App Store — coming soon */}
            <div className="btn-ios">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div>
                <div className="btn-label-small">COMING SOON</div>
                <div className="btn-label-big">App Store</div>
              </div>
            </div>
          </div>
        </div>

        <a href="/" className="dl-back">← Back to zoomcity.app</a>
      </main>
    </>
  )
}
