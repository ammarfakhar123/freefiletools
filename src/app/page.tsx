import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import styles from './page.module.css';
import { TOOLS } from '@/config/tools';
import { GsapAnimations } from '@/components/ui/GsapAnimations';
import {
  IconBgRemover,
  IconPngSvg,
  IconSvgPng,
  IconPdfWord,
  IconWordPdf,
  IconImagePdf,
  IconShield,
} from '@/components/icons';

const ImageBackgroundRemover = dynamic(
  () => import('@/components/tools/ImageBackgroundRemover').then((m) => m.ImageBackgroundRemover),
  {
    ssr: false,
    loading: () => (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div className="skeleton" style={{ width: '100%', height: '140px', borderRadius: '4px' }} />
      </div>
    ),
  }
);

export const metadata: Metadata = {
  title: 'Free Online File Tools: 100% Free, Unlimited, No Signup',
  description:
    'Free online file tools for images and documents. Background remover, bulk image converter to WebP, PNG to SVG, SVG to PNG, PDF to Word, Word to PDF, and Image to PDF. 100% free, runs in your browser.',
  alternates: {
    canonical: 'https://freefiletools.site',
  },
};

const homeFaqs = [
  {
    q: 'Are all the tools on FreeFileTools genuinely 100% free?',
    a: 'Yes, every single tool on FreeFileTools is completely free to use. There are no trial periods, no hidden fees, no pro subscriptions, and no credit card requirements. You can convert as many files as you need.',
  },
  {
    q: 'Do I need to create an account or sign up to use the tools?',
    a: 'No account, email, or registration is required. You can visit the website and begin processing files immediately without entering any personal information.',
  },
  {
    q: 'Will my converted files contain any watermarks or stamps?',
    a: 'No. We never attach watermarks, logos, or visual stamps to your exported images, PDFs, or Word documents. Your files remain clean and publication-ready.',
  },
  {
    q: 'Are my private files and photos uploaded to your servers?',
    a: 'No. All file processing runs client-side inside your web browser using HTML5 Canvas, WebAssembly, and JavaScript. Your files are processed entirely in your device memory and never leave your computer or phone.',
  },
  {
    q: 'Is there a limit to how many files I can convert in a day?',
    a: 'There are zero daily limits. Because processing occurs on your own hardware rather than our server farm, you can convert hundreds or thousands of files every day without restriction.',
  },
  {
    q: 'What image tools are currently available on FreeFileTools?',
    a: 'Our image suite includes an instant Image Background Remover, a Bulk Image Converter (WebP, PNG, JPG with ZIP export), a PNG to SVG Vector Converter, an SVG to PNG Renderer, and an Image to PDF compiler.',
  },
  {
    q: 'What document tools are currently available?',
    a: 'Our document suite features a PDF to Word (.docx) converter, a Word (.docx) to PDF converter, and an Image to PDF compiler with custom page sizes and margin controls.',
  },
  {
    q: 'Can I use FreeFileTools on mobile devices and tablets?',
    a: 'Yes. FreeFileTools is built mobile-first and is compatible with modern browsers on iOS, Android, macOS, Windows, and Linux.',
  },
  {
    q: 'How fast is background removal and conversion?',
    a: 'Our tools execute directly in local browser memory in milliseconds (<50ms for background removal and under 1 second for document conversions).',
  },
  {
    q: 'Can I convert multiple images to WebP at once?',
    a: 'Yes. The Bulk Image Converter allows you to convert dozens of PNG, JPG, or SVG images to WebP in parallel and download all of them in a single ZIP file.',
  },
  {
    q: 'How does FreeFileTools stay free without charging subscriptions?',
    a: 'Because all file processing runs locally on your device rather than our servers, our server hosting overhead is extremely minimal. This allows us to keep the site 100% free without paywalls or expensive tiers.',
  },
];

export default function HomePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <div>
      <GsapAnimations />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. Hero Section with Working Mini Tool */}
      <section className={styles.heroSection}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroContent}>
            <div className={styles.heroTag}>
              <IconShield size={18} />
              <span>Private Browser-Based Utilities</span>
            </div>
            <h1 className={`${styles.heroTitle} gsap-hero-title`}>
              Free Online File Tools for Images and Documents
            </h1>
            <p className={`${styles.heroLead} gsap-hero-desc`}>
              Genuinely 100% free online file tools. No signups, no daily limits, and no watermarks.
              Every operation executes client-side inside your browser: your confidential files never leave your device.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/tools/" className="button">
                Browse All 7 Tools
              </Link>
              <Link href="/about/" className="button secondary">
                How It Works
              </Link>
            </div>
          </div>

          {/* Real working instant tool in the hero */}
          <div className={`${styles.heroToolContainer} gsap-hero-tool`}>
            <div className={styles.heroToolHeader}>
              <span className={styles.heroToolTitle}>Try It Now: Instant Background Remover</span>
              <span className={styles.badgeLive}>Instant 40ms</span>
            </div>
            <ImageBackgroundRemover />
          </div>
        </div>
      </section>

      {/* 2. Free Forever Band */}
      <section className={styles.freeForeverBand}>
        <div className={`container ${styles.bandGrid}`}>
          <div className={`${styles.statItem} gsap-stat-item`}>
            <div className={styles.statNumber}>7</div>
            <div className={styles.statLabel}>Free Tools Available</div>
          </div>
          <div className={`${styles.statItem} gsap-stat-item`}>
            <div className={styles.statNumber}>0</div>
            <div className={styles.statLabel}>Signups or Accounts Needed</div>
          </div>
          <div className={`${styles.statItem} gsap-stat-item`}>
            <div className={styles.statNumber}>0</div>
            <div className={styles.statLabel}>Watermarks on Exports</div>
          </div>
          <div className={`${styles.statItem} gsap-stat-item`}>
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statLabel}>Client-Side Device Privacy</div>
          </div>
        </div>
      </section>

      {/* 3. Tools Directory: Asymmetric Split Layout */}
      <section className={styles.toolsDirectory}>
        <div className="container">
          <div className={styles.sectionHeadingBlock}>
            <div className={styles.sectionTag}>Complete Directory</div>
            <h2 className={styles.sectionTitle}>Built for Speed, Privacy, and Precision</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Choose a tool below to begin converting and editing. No registration, no queues, and no limits.
            </p>
          </div>

          {/* Group A: Image Tools */}
          <div className={styles.categoryBlock}>
            <div className={styles.categoryHeader}>
              <h3 className={styles.categoryTitle}>Image Tools</h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                5 Dedicated Visual Utilities
              </span>
            </div>

            <div className={styles.asymmetricGrid}>
              {/* Featured Left Card: Image Resizer */}
              <Link
                href="/tools/image-resizer/"
                className={`${styles.toolCardFeatured} gsap-tool-card`}
              >
                <div>
                  <div className={styles.cardTop}>
                    <div className={styles.cardIcon}>
                      <IconSvgPng size={26} />
                    </div>
                    <span className={styles.cardBadge}>High-DPI Bicubic</span>
                  </div>
                  <h4 className={styles.cardTitle}>Image Resizer (Crop &amp; Scale)</h4>
                  <p className={styles.cardDesc}>
                    Resize, scale, and crop photos by exact pixel dimensions, percentage, or social media presets
                    with zero quality loss and anti-aliased stepped smoothing.
                  </p>
                </div>
                <div className={styles.cardAction}>
                  Launch Image Resizer
                </div>
              </Link>

              {/* Sub Right Column */}
              <div className={styles.subCardsColumn}>
                <Link href="/tools/bulk-image-converter/" className={`${styles.toolCardSub} gsap-tool-card`}>
                  <div>
                    <div className={styles.cardTop}>
                      <div className={styles.cardIcon}>
                        <IconSvgPng size={24} />
                      </div>
                      <span className={styles.cardBadge}>WebP Batch</span>
                    </div>
                    <h4 className={styles.cardTitle}>Bulk Image Converter (WebP, PNG, JPG)</h4>
                    <p className={styles.cardDesc}>
                      Convert multiple images to WebP, PNG, or JPG in seconds. Download all converted images as a ZIP archive.
                    </p>
                  </div>
                  <div className={styles.cardAction}>Batch Convert Images</div>
                </Link>

                <Link href="/tools/image-background-remover/" className={`${styles.toolCardSub} gsap-tool-card`}>
                  <div>
                    <div className={styles.cardTop}>
                      <div className={styles.cardIcon}>
                        <IconBgRemover size={24} />
                      </div>
                      <span className={styles.cardBadge}>Logo &amp; Graphic</span>
                    </div>
                    <h4 className={styles.cardTitle}>Image Background Remover</h4>
                    <p className={styles.cardDesc}>
                      Remove solid and logo backgrounds with pixel-for-pixel accuracy and pure transparent PNG export.
                    </p>
                  </div>
                  <div className={styles.cardAction}>Remove Background</div>
                </Link>

                <Link href="/tools/png-to-svg/" className={`${styles.toolCardSub} gsap-tool-card`}>
                  <div>
                    <div className={styles.cardTop}>
                      <div className={styles.cardIcon}>
                        <IconPngSvg size={24} />
                      </div>
                      <span className={styles.cardBadge}>Vectorizer</span>
                    </div>
                    <h4 className={styles.cardTitle}>PNG to SVG</h4>
                    <p className={styles.cardDesc}>
                      Convert raster logos, icons, and illustrations into infinitely scalable SVG vector curves.
                    </p>
                  </div>
                  <div className={styles.cardAction}>Vectorize Image</div>
                </Link>
              </div>
            </div>
          </div>

          {/* Group B: Document & File Tools */}
          <div className={styles.categoryBlock}>
            <div className={styles.categoryHeader}>
              <h3 className={styles.categoryTitle}>Document & File Tools</h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Fast, Private Document Utilities
              </span>
            </div>

            <div className={styles.asymmetricGrid}>
              {/* Featured Left Card: Merge PDF */}
              <Link href="/tools/merge-pdf/" className={`${styles.toolCardFeatured} gsap-tool-card`}>
                <div>
                  <div className={styles.cardTop}>
                    <div className={styles.cardIcon}>
                      <IconPdfWord size={26} />
                    </div>
                    <span className={styles.cardBadge}>Instant &bull; 100% Quality</span>
                  </div>
                  <h4 className={styles.cardTitle}>Merge PDF (Combine Files)</h4>
                  <p className={styles.cardDesc}>
                    Combine multiple PDF documents into one seamless file in milliseconds.
                    Reorder pages with easy controls, zero quality loss, and complete data privacy.
                  </p>
                </div>
                <div className={styles.cardAction}>
                  Launch PDF Merger
                </div>
              </Link>

              {/* Sub Right Column */}
              <div className={styles.subCardsColumn}>
                <Link href="/tools/image-to-pdf/" className={`${styles.toolCardSub} gsap-tool-card`}>
                  <div>
                    <div className={styles.cardTop}>
                      <div className={styles.cardIcon}>
                        <IconImagePdf size={24} />
                      </div>
                      <span className={styles.cardBadge}>Multi-Image</span>
                    </div>
                    <h4 className={styles.cardTitle}>Images to PDF Compiler</h4>
                    <p className={styles.cardDesc}>
                      Convert multiple photos, scans, and graphics into a standardized PDF document with custom margins.
                    </p>
                  </div>
                  <div className={styles.cardAction}>Compile Images to PDF</div>
                </Link>

                <Link href="/tools/pdf-to-word/" className={`${styles.toolCardSub} gsap-tool-card`} style={{ opacity: 0.85 }}>
                  <div>
                    <div className={styles.cardTop}>
                      <div className={styles.cardIcon}>
                        <IconPdfWord size={24} />
                      </div>
                      <span className={styles.cardBadge} style={{ backgroundColor: 'var(--brand-orange-light)', color: 'var(--brand-orange)' }}>
                        Coming Soon
                      </span>
                    </div>
                    <h4 className={styles.cardTitle}>PDF to Word (.docx)</h4>
                    <p className={styles.cardDesc}>
                      Next-gen engine upgrade in development to preserve 100% of formatting, tables, and colors.
                    </p>
                  </div>
                  <div className={styles.cardAction}>Preview PDF to Word</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works (Numbered 1 to 3) */}
      <section className={styles.howItWorksSection}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
            <div className={styles.sectionTag}>Frictionless Workflow</div>
            <h2 className={styles.sectionTitle}>How FreeFileTools Works in Three Steps</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              No accounts, no email confirmations, and no credit cards. Simple browser-based execution.
            </p>
          </div>

          <div className={styles.numberedGrid}>
            <div className={styles.numberedCard}>
              <div className={styles.largeNumeral}>01</div>
              <h3 className={styles.numberedCardTitle}>Select or Drop Files</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)' }}>
                Drag and drop your photos, vectors, or documents directly into the conversion workspace, or paste images straight from your clipboard.
              </p>
            </div>

            <div className={styles.numberedCard}>
              <div className={styles.largeNumeral}>02</div>
              <h3 className={styles.numberedCardTitle}>Instant Local Processing</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)' }}>
                Your browser processes the files locally in milliseconds. Zero bytes are uploaded to external servers.
              </p>
            </div>

            <div className={styles.numberedCard}>
              <div className={styles.largeNumeral}>03</div>
              <h3 className={styles.numberedCardTitle}>Download Clean Results</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)' }}>
                Preview your finished asset and click Download. Your file is saved immediately at original quality with zero watermarks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Frequently Asked Questions (FAQ) */}
      <section className={styles.faqSection}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
            <div className={styles.sectionTag}>Common Questions</div>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Everything you need to know about our free, unlimited, browser-based file tools.
            </p>
          </div>

          <div className={styles.faqList}>
            {homeFaqs.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>{faq.q}</h3>
                <p className={styles.faqAnswer}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
