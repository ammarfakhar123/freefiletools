import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { IconShield } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Terms of Service | FreeFileTools',
  description:
    'FreeFileTools terms of service. Understand the terms governing your use of our free, client-side online file conversion and editing utilities.',
  alternates: {
    canonical: 'https://freefiletools.site/terms-of-service/',
  },
};

export default function TermsOfServicePage() {
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
          <span style={{ color: 'var(--text-primary)' }}>Terms of Service</span>
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
            <span>Legal Agreement</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '0.75rem' }}>
            Terms of Service
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
            Effective Date: October 22, 2026 | Version: 1.0 (Initial Release) | Latest Update: None
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', lineHeight: 1.75, color: 'var(--text-secondary)' }}>
            <section>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using FreeFileTools.site (referred to as the &quot;Service&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;),
                you agree to be bound by these Terms of Service. If you do not agree to these terms, please do
                not access or use the website.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                2. Description of the Service
              </h2>
              <p>
                FreeFileTools provides free, client-side digital file conversion and processing tools, including
                image background removal, PNG to SVG vector conversion, SVG to PNG rasterization, PDF to Word
                conversion, Word to PDF conversion, and Image to PDF compilation. All file processing is performed
                locally inside your web browser. The service is provided without charging subscription fees or
                requiring user account creation.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                3. Ownership of Your Files and Intellectual Property
              </h2>
              <p>
                <strong>You retain 100% full and unconditional ownership of all files, photographs, graphics,
                and documents you process through FreeFileTools.</strong> Because our tools execute client-side
                in your browser, we never take custody of your files, we claim no copyright or intellectual
                property license over your materials, and we do not use your images or documents to train
                proprietary AI models.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                4. Acceptable Use
              </h2>
              <p>
                You agree to use FreeFileTools only for lawful purposes. You agree not to:
              </p>
              <div style={{ paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                <p>• Use the service to infringe upon the intellectual property, copyright, or trademark rights of any party.</p>
                <p>• Attempt to reverse-engineer, disrupt, or launch denial-of-service attacks against our hosting infrastructure.</p>
                <p>• Use automated bot networks to scrape or degrade the responsiveness of the website for others.</p>
              </div>
            </section>

            <section>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                5. Disclaimer of Warranties
              </h2>
              <p>
                The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis, without warranties of any kind,
                whether express or implied. While we strive to provide accurate, high-fidelity file conversions,
                we do not warrant that file conversions will be error-free or that complex desktop publishing
                layouts will convert identically. You assume all responsibility for verifying the accuracy of
                your converted files before using them in critical commercial or legal contexts.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                6. Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by applicable law, FreeFileTools and its operators shall not be
                liable for any indirect, incidental, special, consequential, or punitive damages, including loss of
                data, profits, or business opportunities, arising out of or related to your use of the Service.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                7. Modifications to Terms
              </h2>
              <p>
                We reserve the right to modify these terms at any time. Any changes will be posted directly to
                this page with an updated effective date. Continued use of the Service after changes constitutes
                acceptance of the revised terms.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                8. Contact Information
              </h2>
              <p>
                For questions regarding these Terms of Service, please reach out via email:
              </p>
              <p style={{ marginTop: '0.5rem', fontWeight: 600 }}>
                Email: info@freefiletools.site<br />
                Domain: freefiletools.site
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
