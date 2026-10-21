import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { IconShield } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Privacy Policy: 100% Client-Side Processing | FreeFileTools',
  description:
    'FreeFileTools privacy policy. We process all files locally in your browser. No files are uploaded to our servers, stored, or inspected.',
  alternates: {
    canonical: 'https://freefiletools.site/privacy-policy/',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div style={{ padding: '3.5rem 0 5rem' }}>
      <div className="container">
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            marginBottom: '1.5rem',
          }}
        >
          <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
            Home
          </Link>
          <span style={{ color: 'var(--border-strong)' }}>/</span>
          <span style={{ color: 'var(--text-primary)' }}>Privacy Policy</span>
        </nav>

        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--brand-blue)',
              marginBottom: '0.5rem',
            }}
          >
            <IconShield size={16} />
            <span>Data Protection Standards</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '0.75rem' }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
            Effective Date: October 20, 2026 | Last Updated: October 20, 2026
          </p>

          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--brand-blue)',
              borderRadius: 'var(--radius-md)',
              padding: '1.75rem 2rem',
              marginBottom: '3rem',
            }}
          >
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginTop: 0, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Core Privacy Statement: Files Never Leave Your Device
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
              FreeFileTools is engineered on a zero-transmission architectural model. All image background
              removal, vectorization, rasterization, document compilation, and file format conversions
              occur exclusively inside your local web browser memory via WebAssembly and HTML5 Canvas.
              We do not upload, receive, store, or view your source files or generated output files.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', lineHeight: 1.75, color: 'var(--text-secondary)' }}>
            <section>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                1. Information We Do Not Collect
              </h2>
              <p>
                Unlike conventional cloud conversion services, FreeFileTools does not collect, record, or inspect:
              </p>
              <div style={{ paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                <p>• The contents of files, photographs, or documents you select or drop into our tools.</p>
                <p>• Metadata embedded within your files (such as EXIF camera data or author credentials).</p>
                <p>• Account registration data, passwords, or payment credentials (none are ever requested).</p>
              </div>
            </section>

            <section>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                2. Information Collected via Voluntary Contact
              </h2>
              <p>
                When you choose to communicate with us through our contact form, we receive the details
                you explicitly submit: your name, email address, WhatsApp telephone number, and the text
                of your message. This data is delivered directly to our support team exclusively to respond to your inquiry.
                We do not sell, rent, or distribute contact inquiries to third-party marketing brokers.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                3. Technical Web Server Logs
              </h2>
              <p>
                Like all websites hosted on modern edge distribution networks (such as Vercel), our hosting
                infrastructure automatically logs basic network request metadata when web assets (such as HTML,
                CSS stylesheets, or icons) are requested. This includes your IP address, browser user-agent,
                referring URL, and timestamp. These transient server logs are maintained strictly for network
                security, DDoS prevention, and uptime verification.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                4. Cookies and Local Storage
              </h2>
              <p>
                FreeFileTools does not utilize invasive tracking cookies or cross-site advertising beacons.
                We utilize your browser local storage (`localStorage`) strictly to preserve your visual theme
                preference (light mode or dark mode) across browser visits. You can clear your local storage
                or disable cookies at any time via your browser settings without affecting tool functionality.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                5. Third-Party Libraries and Model Distribution
              </h2>
              <p>
                Our machine learning models and WebAssembly libraries (such as the background removal model
                and vectorization binaries) are delivered as static immutable assets via secure Content
                Delivery Networks (CDNs). When your browser downloads these model weights, the transfer is
                conducted over encrypted HTTPS connections. Once cached in your browser, inference takes
                place offline on your machine.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                6. Children&apos;s Online Privacy Protection
              </h2>
              <p>
                FreeFileTools does not knowingly solicit or collect personal information from children under
                the age of 13. Because our tools operate without registration or user identification, any
                student or child using our utilities does so anonymously without account creation.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                7. Contact for Privacy Inquiries
              </h2>
              <p>
                If you have questions regarding this Privacy Policy or data handling practices, please contact us at:
              </p>
              <p style={{ marginTop: '0.5rem', fontWeight: 600 }}>
                Support: https://freefiletools.site/contact/<br />
                Website: https://freefiletools.site
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
