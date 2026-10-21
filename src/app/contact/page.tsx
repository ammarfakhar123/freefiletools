import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import styles from './contact.module.css';
import { IconShield, IconCheck, IconWhatsApp } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Contact Us | FreeFileTools Support & Inquiries',
  description:
    'Contact the FreeFileTools team for support, questions, feedback, or partnerships. Email info@freefiletools.site or call/WhatsApp +92 3302079066.',
  alternates: {
    canonical: 'https://freefiletools.site/contact/',
  },
  openGraph: {
    title: 'Contact Us | FreeFileTools',
    description: 'Get in touch with the FreeFileTools team via email or WhatsApp.',
    url: 'https://freefiletools.site/contact/',
    type: 'website',
  },
};

export default function ContactPage() {
  const jsonLdContact = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact FreeFileTools Support',
    url: 'https://freefiletools.site/contact/',
    description: 'Direct support and contact channels for FreeFileTools users.',
    mainEntity: {
      '@type': 'Organization',
      name: 'FreeFileTools',
      url: 'https://freefiletools.site',
      email: 'info@freefiletools.site',
      telephone: '+923302079066',
    },
  };

  return (
    <div className={styles.contactWrapper}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdContact) }}
      />
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb navigation">
          <Link href="/">Home</Link>
          <span style={{ color: 'var(--border-strong)' }}>/</span>
          <span style={{ color: 'var(--text-primary)' }}>Contact Us</span>
        </nav>

        {/* Page Header */}
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          <div className={styles.categoryTag}>
            <IconShield size={16} />
            <span>Support &amp; Inquiries</span>
          </div>

          <h1 className={styles.pageTitle}>Contact FreeFileTools</h1>

          <p className={styles.pageIntro}>
            Have a question, feedback, or feature suggestion? We are here to help. Reach out directly
            via email or WhatsApp, and we will get back to you promptly.
          </p>

          {/* Contact Channels Grid */}
          <div className={styles.cardsGrid}>
            {/* Card 1: Official Email */}
            <div className={styles.contactCard}>
              <div>
                <div className={styles.cardHeader}>
                  <div className={styles.iconCircle}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <h2 className={styles.cardTitle}>Email Support</h2>
                </div>
                <p className={styles.cardDesc}>
                  For general questions, bug reports, partnership inquiries, or tool requests:
                </p>
                <div className={styles.cardValue}>info@freefiletools.site</div>
              </div>

              <a
                href="mailto:info@freefiletools.site?subject=Inquiry%20from%20FreeFileTools"
                className={styles.actionButton}
                aria-label="Send Email to info@freefiletools.site"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                <span>Send Email</span>
              </a>
            </div>

            {/* Card 2: Phone & WhatsApp */}
            <div className={styles.contactCard}>
              <div>
                <div className={styles.cardHeader}>
                  <div className={`${styles.iconCircle} ${styles.iconCircleGreen}`}>
                    <IconWhatsApp size={22} />
                  </div>
                  <h2 className={styles.cardTitle}>Phone &amp; WhatsApp</h2>
                </div>
                <p className={styles.cardDesc}>
                  Direct communication for quick assistance, urgent queries, and feedback:
                </p>
                <div className={styles.cardValue}>+92 3302079066</div>
              </div>

              <div className={styles.actionButtonGroup}>
                <a
                  href="https://wa.me/923302079066?text=Hi%20FreeFileTools%20Team%2C%20I%20have%20an%20inquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.whatsappBtn}
                  aria-label="Chat on WhatsApp +92 3302079066"
                >
                  <IconWhatsApp size={18} />
                  <span>WhatsApp</span>
                </a>

                <a
                  href="tel:+923302079066"
                  className={styles.actionButton}
                  style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)' }}
                  aria-label="Call +92 3302079066"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Call Us</span>
                </a>
              </div>
            </div>
          </div>

          {/* Privacy & File Security Notice */}
          <div className={styles.infoSection}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
              <IconCheck size={20} style={{ color: 'var(--brand-green)' }} />
              <h2 className={styles.infoSectionTitle} style={{ margin: 0 }}>
                Privacy and Support Safety
              </h2>
            </div>
            <p className={styles.infoSectionText}>
              All file conversion, background removal, and editing tools on FreeFileTools run 100% locally
              inside your browser via WebAssembly and Canvas. We never store, log, or transfer your files to any
              remote server. When contacting support, you never need to share sensitive documents or personal
              files.
            </p>

            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>How quickly does support respond?</div>
              <div className={styles.faqAnswer}>
                We typically respond to emails within 24 to 48 business hours. WhatsApp messages are usually
                answered much faster during business hours.
              </div>
            </div>

            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Can I suggest a new file tool or format?</div>
              <div className={styles.faqAnswer}>
                Yes. If there is a specific file conversion or utility you need, send us an email or message
                and our engineering team will evaluate it for upcoming releases.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
