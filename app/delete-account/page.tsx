import type { Metadata } from 'next'

// Google Play traži web stranicu za brisanje naloga (bez instalirane aplikacije).
// Isti izgled kao /privacy-policy. Putanja u app-i: Profile → Other → Settings → Delete account.
export const metadata: Metadata = {
  alternates: { canonical: '/delete-account' },
  title: 'Delete your account — Zoom City',
  description: 'How to delete your Zoom City account and data, in the app or by email.',
}

export default function DeleteAccountPage() {
  return (
    <>
      <style>{`
        .legal-page {
          min-height: 100vh;
          background: linear-gradient(160deg, #161622 0%, #073B4C 100%);
          font-family: var(--font-dm-sans), sans-serif;
          color: rgba(205, 205, 224, 0.85);
          padding: 56px 24px 80px;
        }
        .legal-container {
          max-width: 760px;
          margin: 0 auto;
        }
        .legal-title {
          font-family: var(--font-bebas-neue), sans-serif;
          font-size: clamp(2.2rem, 6vw, 3.2rem);
          color: #FFF32B;
          letter-spacing: 0.03em;
          margin-bottom: 8px;
          line-height: 1.05;
        }
        .legal-updated {
          color: rgba(205,205,224,0.45);
          font-size: 0.85rem;
          margin-bottom: 36px;
        }
        .legal-intro {
          font-size: 1rem;
          line-height: 1.7;
          margin-bottom: 40px;
          color: rgba(205,205,224,0.8);
        }
        .legal-section {
          margin-bottom: 30px;
        }
        .legal-section h2 {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 10px;
        }
        .legal-section h2::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #FFF32B;
          flex-shrink: 0;
        }
        .legal-section p, .legal-section li {
          font-size: 0.95rem;
          line-height: 1.7;
          color: rgba(205,205,224,0.8);
        }
        .legal-section p + p {
          margin-top: 12px;
        }
        .legal-section ul, .legal-section ol {
          margin: 10px 0 0 0;
          padding-left: 20px;
        }
        .legal-section li {
          margin-bottom: 4px;
        }
        .legal-section strong {
          color: #ffffff;
        }
        .legal-path {
          display: inline-block;
          margin-top: 6px;
          padding: 6px 12px;
          border-radius: 10px;
          background: rgba(255, 243, 43, 0.08);
          border: 1px solid rgba(255, 243, 43, 0.25);
          color: #FFF32B;
          font-weight: 600;
          font-size: 0.92rem;
        }
        .legal-email {
          color: #FFF32B;
          font-weight: 700;
          text-decoration: none;
        }
        .legal-email:hover {
          text-decoration: underline;
        }
        .legal-back {
          display: inline-block;
          margin-top: 48px;
          color: rgba(205,205,224,0.4);
          font-size: 0.85rem;
          text-decoration: none;
          transition: color 0.2s;
        }
        .legal-back:hover { color: #FFF32B; }
      `}</style>

      <main className="legal-page">
        <div className="legal-container">
          <h1 className="legal-title">Delete your account</h1>
          <p className="legal-updated">Zoom City app · Last updated: October 19, 2026</p>

          <p className="legal-intro">
            You can delete your Zoom City account and the data linked to it
            at any time, directly in the app or by sending us an email.
          </p>

          <section className="legal-section">
            <h2>Delete it in the app</h2>
            <ol>
              <li>Open Zoom City and go to <strong>Profile</strong>.</li>
              <li>Tap the <strong>Other</strong> tab, then <strong>Settings</strong>.</li>
              <li>
                Tap <strong>Delete account</strong> and confirm. Accounts with
                a password ask for it once more.
              </li>
            </ol>
            <span className="legal-path">Profile → Other → Settings → Delete account</span>
          </section>

          <section className="legal-section">
            <h2>Without the app</h2>
            <p>
              Send an email to{' '}
              <a className="legal-email" href="mailto:zoomcityapk@gmail.com?subject=Delete%20my%20account">
                zoomcityapk@gmail.com
              </a>{' '}
              from the address you use for Zoom City, with the subject
              &quot;Delete my account&quot;. We delete the account within 30
              days and confirm by email.
            </p>
          </section>

          <section className="legal-section">
            <h2>What is deleted</h2>
            <ul>
              <li>Your account: name, email address and profile photo.</li>
              <li>Your posts (videos and photos) and their files.</li>
              <li>Your comments, likes, and followers / following.</li>
              <li>Your notification token.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>What stays</h2>
            <p>
              Activities, routes and travel journals are stored only on your
              phone. They are never on our servers, and they are removed when
              you uninstall the app.
            </p>
          </section>

          <section className="legal-section">
            <h2>Questions</h2>
            <p>
              Read our <a className="legal-email" href="/privacy-policy">Privacy Policy</a>{' '}
              or contact us at{' '}
              <a className="legal-email" href="mailto:zoomcityapk@gmail.com">
                zoomcityapk@gmail.com
              </a>
              .
            </p>
          </section>

          <a href="/" className="legal-back">← Back to zoomcity.app</a>
        </div>
      </main>
    </>
  )
}
