import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { IconShield, IconCheck, IconCookie } from '@/components/icons';

export const metadata: Metadata = {
  title: 'About FreeFileTools: Genuinely Free, Private Online Utilities',
  description:
    'Learn about FreeFileTools.site: our mission to provide genuinely free, unlimited file conversion tools powered by client-side WebAssembly with zero data tracking.',
  alternates: {
    canonical: 'https://freefiletools.site/about/',
  },
};

export default function AboutPage() {
  return (
    <div style={{ padding: '3.5rem 0 5rem' }}>
      <div className="container">
        {/* Breadcrumbs */}
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
          <span style={{ color: 'var(--text-primary)' }}>About Us</span>
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
            <span>Our Principles</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1.25rem' }}>
            About FreeFileTools
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            FreeFileTools was founded on a simple conviction: common digital file tasks should be
            instant, completely private, and 100% free to use with no subscriptions, no watermarks, and no paywalls.
          </p>

          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '2.25rem 2rem',
              marginBottom: '3rem',
            }}
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
              The Problem with Conventional File Converters
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
              For years, web users needing to isolate a product photo background, vectorize an emblem,
              or convert a PDF into Word faced a deeply frustrating landscape. Most online conversion
              portals operate on an extractive business model: they bait users with a "free" claim,
              only to demand email addresses, force users into weekly subscriptions, restrict downloads
              to tiny thumbnail resolutions, or stamp ugly watermarks across finished documents.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, margin: 0 }}>
              More concerningly, those services mandate uploading personal files, financial records,
              confidential client presentations, and family photos to remote server clusters.
              In an era of rampant data leaks and corporate surveillance, transmitting confidential
              documents to unknown cloud providers is an unnecessary risk.
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '2.25rem 2rem',
              marginBottom: '3rem',
            }}
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
              The Client-Side WebAssembly Revolution
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
              FreeFileTools is engineered on a modern architectural philosophy: client-side processing.
              By harnessing the capabilities of WebAssembly (WASM), WebGL, and HTML5 Canvas APIs,
              computational tasks that once demanded warehouse server farms now execute natively
              inside your web browser sandbox.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, margin: 0 }}>
              When you use our Image Background Remover, the neural network runs on your local graphics
              processor. When you vectorize a logo with PNG to SVG, the tracing equations calculate
              in your device memory. When you compile an Image to PDF or convert a Word document,
              not a single byte leaves your machine. Your privacy is protected by mathematics,
              not corporate promises.
            </p>
          </div>

          <h2 style={{ fontSize: '1.65rem', fontWeight: 700, marginBottom: '1.25rem' }}>
            Our Five Unshakeable Commitments
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginBottom: '3rem' }}>
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                gap: '1rem',
              }}
            >
              <div style={{ color: 'var(--brand-green)', flexShrink: 0, marginTop: '2px' }}>
                <IconCheck size={20} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  1. 100% Free to Use
                </strong>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  We do not charge fees, require premium plans, or impose hidden paywalls. Every tool is available for everyone.
                </span>
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                gap: '1rem',
              }}
            >
              <div style={{ color: 'var(--brand-green)', flexShrink: 0, marginTop: '2px' }}>
                <IconCheck size={20} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  2. Unlimited Daily Conversions
                </strong>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Convert ten files or ten thousand files. Because processing occurs on your hardware, we never throttle your workflow.
                </span>
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                gap: '1rem',
              }}
            >
              <div style={{ color: 'var(--brand-green)', flexShrink: 0, marginTop: '2px' }}>
                <IconCheck size={20} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  3. Zero Signups or Accounts
                </strong>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  No logins, no password forms, and no email verification. Open the website and begin immediately.
                </span>
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                gap: '1rem',
              }}
            >
              <div style={{ color: 'var(--brand-green)', flexShrink: 0, marginTop: '2px' }}>
                <IconCheck size={20} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  4. Zero Watermarks on Exports
                </strong>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Your exports belong to you. We never attach promotional stamps or forced visual branding to your files.
                </span>
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                gap: '1rem',
              }}
            >
              <div style={{ color: 'var(--brand-blue)', flexShrink: 0, marginTop: '2px' }}>
                <IconShield size={20} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  5. Total Device Privacy
                </strong>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Files remain on your device at all times. Zero server uploads, zero cloud retention, and zero external tracking.
                </span>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
            <Link href="/tools/" className="button">
              Explore All 6 Free Tools
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
