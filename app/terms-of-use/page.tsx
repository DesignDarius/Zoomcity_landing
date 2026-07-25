import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use — Zoom City',
  description: 'The terms and conditions for using the Zoom City application.',
}

export default function TermsOfUsePage() {
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
        .legal-section ul {
          margin: 10px 0 0 0;
          padding-left: 20px;
        }
        .legal-section li {
          margin-bottom: 4px;
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
          <h1 className="legal-title">Terms of Use</h1>
          <p className="legal-updated">Last updated: July 25, 2026</p>

          <p className="legal-intro">
            These Terms of Use (&quot;Terms&quot;) govern your use of the Zoom
            City application (the &quot;Service&quot;), operated by Zoom City
            (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By creating an
            account or otherwise using the Service, you agree to be bound by
            these Terms. If you do not agree, please do not use the Service.
          </p>

          <section className="legal-section">
            <h2>Eligibility</h2>
            <p>
              You must be at least 13 years old to create an account and use
              the Service. By using the Service, you represent that you meet
              this requirement.
            </p>
          </section>

          <section className="legal-section">
            <h2>Your Account</h2>
            <p>
              You are responsible for safeguarding your account credentials
              and for any activity that occurs under your account. You agree
              to provide accurate information when creating your account and
              to keep it up to date.
            </p>
          </section>

          <section className="legal-section">
            <h2>User-Generated Content</h2>
            <p>
              Zoom City lets you record, upload, and share video reels,
              photos, and other content tied to cities and locations
              (&quot;User Content&quot;). You retain ownership of your User
              Content. By posting it, you grant Zoom City a worldwide,
              non-exclusive, royalty-free license to host, store, reproduce,
              and display that content within the Service, solely for the
              purpose of operating and promoting the Service.
            </p>
            <p>You agree not to post User Content that:</p>
            <ul>
              <li>Is illegal, defamatory, obscene, or infringes on someone else&apos;s rights (including copyright).</li>
              <li>Is false or misleading, or misrepresents a location or place.</li>
              <li>Harasses, bullies, or threatens other users.</li>
              <li>Contains malware or is intended to disrupt the Service.</li>
            </ul>
            <p>
              We reserve the right to remove any User Content, and to
              suspend or terminate accounts, that violate these Terms.
            </p>
          </section>

          <section className="legal-section">
            <h2>Acceptable Use</h2>
            <p>
              You agree to use the Service only for its intended purpose —
              discovering and sharing authentic experiences about cities and
              places. You agree not to misuse the Service, attempt to access
              it using a method other than the interface we provide, or
              interfere with its normal operation.
            </p>
          </section>

          <section className="legal-section">
            <h2>Location and Device Permissions</h2>
            <p>
              Certain features (such as the city map, GPS tracking, and video
              recording) require access to your device&apos;s location,
              camera, microphone, or photo/video gallery. These permissions
              are optional and can be managed at any time in your device
              settings; disabling them may limit some features of the
              Service.
            </p>
          </section>

          <section className="legal-section">
            <h2>Third-Party Services</h2>
            <p>
              The Service relies on third-party providers (such as Firebase
              and Google Maps) to operate core functionality like
              authentication, storage, and mapping. Your use of the Service
              is also subject to the applicable terms of those providers.
            </p>
          </section>

          <section className="legal-section">
            <h2>Termination</h2>
            <p>
              We may suspend or terminate your access to the Service at any
              time, without prior notice, if you breach these Terms. You may
              also stop using the Service and delete your account at any
              time.
            </p>
          </section>

          <section className="legal-section">
            <h2>Disclaimer of Warranties</h2>
            <p>
              The Service is provided &quot;as is&quot; and &quot;as
              available&quot;, without warranties of any kind. We do not
              guarantee that the Service will be uninterrupted, secure, or
              error-free, or that content shared by other users is accurate.
            </p>
          </section>

          <section className="legal-section">
            <h2>Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Zoom City shall not be
              liable for any indirect, incidental, or consequential damages
              arising from your use of, or inability to use, the Service.
            </p>
          </section>

          <section className="legal-section">
            <h2>Changes to these Terms</h2>
            <p>
              We may update these Terms from time to time. We will notify you
              by updating the &quot;Last updated&quot; date at the top of
              this page. Continued use of the Service after changes take
              effect constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="legal-section">
            <h2>Governing Law</h2>
            <p>
              These Terms shall be governed by the laws of Serbia, without
              regard to its conflict of law provisions.
            </p>
          </section>

          <section className="legal-section">
            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms, you can contact us
              by email:{' '}
              <a className="legal-email" href="mailto:zoomcityapk@gmail.com">
                zoomcityapk@gmail.com
              </a>
            </p>
          </section>

          <a href="/" className="legal-back">← Back to zoomcity.app</a>
        </div>
      </main>
    </>
  )
}
