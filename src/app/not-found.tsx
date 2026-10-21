import React from 'react';
import Link from 'next/link';
import { TOOLS } from '@/config/tools';

export default function NotFound() {
  return (
    <div style={{ padding: '5rem 0 6rem', textAlign: 'center' }}>
      <div className="container">
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '5rem',
              fontWeight: 800,
              color: 'var(--brand-blue)',
              lineHeight: 1,
              marginBottom: '1rem',
            }}
          >
            404
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>
            Page Not Found
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            The page or tool URL you requested does not exist or may have moved.
            You can return to the homepage or explore our free file utilities below.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem' }}>
            <Link href="/" className="button">
              Return to Homepage
            </Link>
            <Link href="/tools/" className="button secondary">
              Browse All Tools
            </Link>
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1.75rem',
              textAlign: 'left',
            }}
          >
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem' }}>
              Quick Links to Free Tools:
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
              {TOOLS.map((t) => (
                <Link
                  key={t.slug}
                  href={`/tools/${t.slug}/`}
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--accent-primary)',
                    textDecoration: 'none',
                    padding: '0.35rem 0',
                  }}
                >
                  {t.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
