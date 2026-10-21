import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { TOOLS } from '@/config/tools';
import { IconShield } from '@/components/icons';

export const metadata: Metadata = {
  title: 'All Free Online File Tools: Images, Documents & Vectors',
  description:
    'Browse all free online file tools. Bulk image converter to WebP, Image Resizer, PNG to SVG, SVG to PNG, PDF to Word, Word to PDF, and Image to PDF. 100% free, unlimited, no signups.',
  alternates: {
    canonical: 'https://freefiletools.site/tools/',
  },
};

export default function ToolsHubPage() {
  const imageTools = TOOLS.filter((t) => t.category === 'image' && t.id !== 'image-background-remover');
  const documentTools = TOOLS.filter((t) => t.category === 'document');

  return (
    <div style={{ padding: '3.5rem 0 5rem' }}>
      <div className="container">
        {/* Breadcrumb */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            marginBottom: '1.5rem',
          }}
          aria-label="Breadcrumb navigation"
        >
          <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
            Home
          </Link>
          <span style={{ color: 'var(--border-strong)' }}>/</span>
          <span style={{ color: 'var(--text-primary)' }}>Tools Directory</span>
        </nav>

        <div style={{ maxWidth: '720px', marginBottom: '3.5rem' }}>
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
            <span>Complete Tools Catalog</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1rem' }}>
            All Free Online File Tools
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Every tool is 100% free, runs client-side inside your browser for total device privacy,
            and requires zero registration. Convert, compile, and edit in milliseconds.
          </p>
        </div>

        {/* Image Tools */}
        <section style={{ marginBottom: '4rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '0.75rem',
              borderBottom: '2px solid var(--border-subtle)',
              marginBottom: '2rem',
            }}
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Image Tools</h2>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {imageTools.length} Utilities Available
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {imageTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}/`}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.75rem',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'background-color 0.16s ease, border-color 0.16s ease',
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.5rem',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: 'var(--brand-blue-light)',
                      color: 'var(--brand-blue)',
                    }}
                  >
                    {tool.badgeText}
                  </span>
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      margin: '0.75rem 0 0.5rem',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {tool.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                      marginBottom: '1.5rem',
                    }}
                  >
                    {tool.metaDescription}
                  </p>
                </div>
                <div
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: 'var(--accent-primary)',
                  }}
                >
                  Use Tool Free
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Document Tools */}
        <section>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '0.75rem',
              borderBottom: '2px solid var(--border-subtle)',
              marginBottom: '2rem',
            }}
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Document Tools</h2>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {documentTools.length} Utilities Available
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {documentTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}/`}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.75rem',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'background-color 0.16s ease, border-color 0.16s ease',
                }}
              >
                <div>
                  {(tool.slug === 'pdf-to-word' || tool.slug === 'word-to-pdf') ? (
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.5rem',
                        borderRadius: 'var(--radius-xs)',
                        backgroundColor: '#fff3e6',
                        color: '#ff7300',
                        border: '1px solid rgba(255, 115, 0, 0.25)',
                      }}
                    >
                      Coming Soon
                    </span>
                  ) : (
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.5rem',
                        borderRadius: 'var(--radius-xs)',
                        backgroundColor: 'var(--brand-amber-light)',
                        color: 'var(--brand-amber)',
                      }}
                    >
                      {tool.badgeText}
                    </span>
                  )}
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      margin: '0.75rem 0 0.5rem',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {tool.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                      marginBottom: '1.5rem',
                    }}
                  >
                    {tool.metaDescription}
                  </p>
                </div>
                <div
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: (tool.slug === 'pdf-to-word' || tool.slug === 'word-to-pdf') ? '#ff7300' : 'var(--accent-primary)',
                  }}
                >
                  {(tool.slug === 'pdf-to-word' || tool.slug === 'word-to-pdf') ? 'Preview Tool (Coming Soon)' : 'Use Tool Free'}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
