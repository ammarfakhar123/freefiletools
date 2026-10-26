import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import styles from './page.module.css';
import { GsapAnimations } from '@/components/ui/GsapAnimations';
import { HomeBulkBanner } from '@/components/home/HomeBulkBanner';
import {
  IconPngSvg,
  IconSvgPng,
  IconPdfWord,
  IconImagePdf,
  IconShield,
} from '@/components/icons';

export const metadata: Metadata = {
  title: 'Free Online File Tools — Merge PDF, Resize Images & Convert Files | FreeFileTools',
  description:
    '100% free online file tools: merge PDF, resize images, bulk convert to WebP/PNG/JPG, PNG to SVG, SVG to PNG, and Images to PDF. No signup. No watermarks. Files never leave your device.',
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: 'FreeFileTools' }],
  alternates: {
    canonical: 'https://www.freefiletools.site/',
  },
  openGraph: {
    title: 'Free Online File Tools — No Signup, No Watermarks | FreeFileTools',
    description:
      'Merge PDFs, resize images, bulk convert files, vectorize PNGs — all free, all in-browser, zero upload to any server.',
    url: 'https://www.freefiletools.site/',
    siteName: 'FreeFileTools',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online File Tools — Merge PDF, Resize & Convert | FreeFileTools',
    description:
      '100% free, no signup, no watermarks. Merge PDF, resize images, bulk convert to WebP. Files never leave your device.',
  },
};

const homeFaqs = [
  {
    q: 'How do I merge PDF files online for free?',
    a: (
      <>
        Go to the{' '}
        <Link href="/tools/merge-pdf/" style={{ color: 'var(--brand-blue)', textDecoration: 'underline' }}>
          Merge PDF tool
        </Link>{' '}
        on FreeFileTools. Upload two or more PDF files, drag to reorder the pages if needed, and click the Merge button.
        Your combined PDF downloads immediately to your device with zero quality loss and no watermark. No account or
        sign-up required.
      </>
    ),
    rawAnswer:
      'Go to the Merge PDF tool on FreeFileTools. Upload two or more PDF files, drag to reorder the pages if needed, and click the Merge button. Your combined PDF downloads immediately to your device with zero quality loss and no watermark. No account or sign-up required.',
  },
  {
    q: 'How do I resize an image to 25KB or 500KB online?',
    a: (
      <>
        Open the{' '}
        <Link href="/tools/image-resizer/" style={{ color: 'var(--brand-blue)', textDecoration: 'underline' }}>
          Image Resizer tool
        </Link>
        , upload your image, and select &quot;Target File Size&quot; mode. Enter 25, 50, 100, or 500 in the KB field and
        click Resize. Useful for PPSC forms, job applications, and government document requirements.
      </>
    ),
    rawAnswer:
      'Open the Image Resizer tool, upload your image, and select "Target File Size" mode. Enter 25, 50, 100, or 500 in the KB field and click Resize. Useful for PPSC forms, job applications, and government document requirements.',
  },
  {
    q: 'Can I convert multiple images to WebP in bulk?',
    a: (
      <>
        Yes. The{' '}
        <Link href="/tools/bulk-image-converter/" style={{ color: 'var(--brand-blue)', textDecoration: 'underline' }}>
          Bulk Image Converter
        </Link>{' '}
        lets you upload dozens of PNG, JPG, or SVG images at once, convert them all to WebP, PNG, or JPG simultaneously,
        and download a ZIP archive. No limit on how many images you can convert per session.
      </>
    ),
    rawAnswer:
      'Yes. The Bulk Image Converter lets you upload dozens of PNG, JPG, or SVG images at once, convert them all to WebP, PNG, or JPG simultaneously, and download a ZIP archive. No limit on how many images you can convert per session.',
  },
  {
    q: 'Do my files get uploaded to your server?',
    a: (
      <>
        No. FreeFileTools processes all files entirely within your browser using HTML5 Canvas and{' '}
        <a
          href="https://en.wikipedia.org/wiki/WebAssembly"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--brand-blue)', textDecoration: 'underline' }}
        >
          WebAssembly
        </a>
        . Your files are processed in your device&apos;s own memory and never transmitted to any external server.
      </>
    ),
    rawAnswer:
      "No. FreeFileTools processes all files entirely within your browser using HTML5 Canvas and WebAssembly. Your files are processed in your device's own memory and never transmitted to any external server.",
  },
  {
    q: 'Is there a file size limit?',
    a: (
      <>
        There is no server-side file size limit because no files are uploaded. The practical limit is your device&apos;s
        available browser memory. Most modern devices handle files up to several hundred MB without issues.
      </>
    ),
    rawAnswer:
      "There is no server-side file size limit because no files are uploaded. The practical limit is your device's available browser memory. Most modern devices handle files up to several hundred MB without issues.",
  },
  {
    q: 'How do I convert PNG to SVG for free?',
    a: (
      <>
        Open the{' '}
        <Link href="/tools/png-to-svg/" style={{ color: 'var(--brand-blue)', textDecoration: 'underline' }}>
          PNG to SVG Converter
        </Link>
        , upload your PNG image, and click Convert. The tool traces the raster image and produces a scalable SVG vector
        file. Best results with logos, icons, and high-contrast illustrations.
      </>
    ),
    rawAnswer:
      'Open the PNG to SVG Converter, upload your PNG image, and click Convert. The tool traces the raster image and produces a scalable SVG vector file. Best results with logos, icons, and high-contrast illustrations.',
  },
  {
    q: 'When will PDF to Word be available?',
    a: (
      <>
        The free PDF to Word converter is currently in development and will be released soon. It will convert PDF
        documents to fully editable .docx files while preserving tables, formatting, and images.{' '}
        <Link href="/contact/" style={{ color: 'var(--brand-blue)', textDecoration: 'underline' }}>
          Contact us
        </Link>{' '}
        to be notified.
      </>
    ),
    rawAnswer:
      'The free PDF to Word converter is currently in development and will be released soon. It will convert PDF documents to fully editable .docx files while preserving tables, formatting, and images. Contact us to be notified.',
  },
  {
    q: 'Does FreeFileTools work on mobile phones?',
    a: (
      <>
        Yes. All tools are mobile-first and work on any modern smartphone or tablet. Tested on iOS (Safari) and Android
        (Chrome). You can upload files from your phone&apos;s camera roll, files app, or cloud storage directly into any
        tool.
      </>
    ),
    rawAnswer:
      "Yes. All tools are mobile-first and work on any modern smartphone or tablet. Tested on iOS (Safari) and Android (Chrome). You can upload files from your phone's camera roll, files app, or cloud storage directly into any tool.",
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
        text: faq.rawAnswer,
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

      {/* 1. HERO SECTION (Very top of page) */}
      <section className={styles.heroSection}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroContent}>
            <div className={styles.heroTag}>
              <IconShield size={18} />
              <span>Private Browser-Based Utilities</span>
            </div>
            <h1 className={`${styles.heroTitle} gsap-hero-title`}>
              Free Online File Tools &mdash; No Signup, No Watermarks, No Uploads
            </h1>
            <p className={`${styles.heroLead} gsap-hero-desc`}>
              Merge PDF files, resize images, bulk convert to WebP, vectorize PNG to SVG &mdash; 8 free browser-based
              tools that process your files locally on your device. Zero data sent to any server. Zero accounts needed.
              Start in 10 seconds.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href="#tools" className="button">
                Browse All 8 Free Tools &rarr;
              </a>
              <a href="#how-it-works" className="button secondary">
                How It Works
              </a>
            </div>
          </div>

          {/* Bulk Image Converter Hero Banner */}
          <div className={`${styles.heroToolContainer} gsap-hero-tool`}>
            <HomeBulkBanner />
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR / STATS ROW (4 numbers below hero) */}
      <section className={styles.freeForeverBand}>
        <div className={`container ${styles.bandGrid}`}>
          <div className={`${styles.statItem} gsap-stat-item`}>
            <div className={styles.statNumber}>8</div>
            <div className={styles.statLabel}>Free Tools Available</div>
          </div>
          <div className={`${styles.statItem} gsap-stat-item`}>
            <div className={styles.statNumber}>0</div>
            <div className={styles.statLabel}>Accounts or Signups</div>
          </div>
          <div className={`${styles.statItem} gsap-stat-item`}>
            <div className={styles.statNumber}>0</div>
            <div className={styles.statLabel}>Watermarks on Exports</div>
          </div>
          <div className={`${styles.statItem} gsap-stat-item`}>
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statLabel}>Files Stay on Your Device</div>
          </div>
        </div>
      </section>

      {/* 3. TOOLS SECTION (id='tools' — the main grid of 8 tool cards) */}
      <section id="tools" className={styles.toolsDirectory}>
        <div className="container">
          <div className={styles.sectionHeadingBlock}>
            <div className={styles.sectionTag}>Complete Directory</div>
            <h2 className={styles.sectionTitle}>8 Free Online File Tools &mdash; Complete Directory</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Every tool below runs entirely inside your browser. No file uploads. No queues. No limits. Click any tool
              to start immediately.
            </p>
          </div>

          {/* 3a. IMAGE TOOLS */}
          <div className={styles.categoryBlock}>
            <div className={styles.categoryHeader}>
              <h3 className={styles.categoryTitle}>Image Tools</h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                4 Free Image Tools
              </span>
            </div>

            <div className={styles.asymmetricGrid}>
              {/* Tool Card 1: Bulk Image Converter */}
              <Link
                href="/tools/bulk-image-converter/"
                className={`${styles.toolCardFeatured} gsap-tool-card`}
              >
                <div>
                  <div className={styles.cardTop}>
                    <div className={styles.cardIcon}>
                      <IconSvgPng size={26} />
                    </div>
                    <span className={styles.cardBadge}>Batch WebP</span>
                  </div>
                  <h4 className={styles.cardTitle}>Bulk Image Converter &mdash; WebP, PNG, JPG</h4>
                  <p className={styles.cardDesc}>
                    Convert multiple images to WebP, PNG, or JPG in one batch. Upload dozens of files, convert them all
                    simultaneously, and download a ZIP archive of the results in seconds. No file size limits, no daily
                    caps, and no watermarks on your exported images.
                  </p>
                  <ul className={styles.cardBullets}>
                    <li>Convert PNG, JPG, SVG to WebP in bulk</li>
                    <li>Download all converted files as a single ZIP archive</li>
                    <li>100% in-browser &mdash; original image quality preserved</li>
                  </ul>
                </div>
                <div className={styles.cardAction}>
                  Launch Bulk Converter &rarr;
                </div>
              </Link>

              {/* Sub Right Column: Tool Cards 2, 3, 4 */}
              <div className={styles.subCardsColumn}>
                {/* Tool Card 2: Image Resizer */}
                <Link href="/tools/image-resizer/" className={`${styles.toolCardSub} gsap-tool-card`}>
                  <div>
                    <div className={styles.cardTop}>
                      <div className={styles.cardIcon}>
                        <IconSvgPng size={24} />
                      </div>
                      <span className={styles.cardBadge}>Resize to KB</span>
                    </div>
                    <h4 className={styles.cardTitle}>Image Resizer &mdash; Crop, Scale &amp; Resize to KB</h4>
                    <p className={styles.cardDesc}>
                      Resize images online free &mdash; by exact pixel dimensions, percentage, or target file size in KB.
                      Compress an image to 25KB, 50KB, 100KB, or 500KB for government forms, PPSC exams, YouTube
                      thumbnails, and social media profiles.
                    </p>
                    <ul className={styles.cardBullets}>
                      <li>Resize image to 25KB, 50KB, 100KB, or 500KB</li>
                      <li>Crop by pixel dimensions or social media presets</li>
                      <li>Works for PPSC, FPSC, NTS and all government form requirements</li>
                    </ul>
                  </div>
                  <div className={styles.cardAction}>Launch Image Resizer &rarr;</div>
                </Link>

                {/* Tool Card 3: PNG to SVG */}
                <Link href="/tools/png-to-svg/" className={`${styles.toolCardSub} gsap-tool-card`}>
                  <div>
                    <div className={styles.cardTop}>
                      <div className={styles.cardIcon}>
                        <IconPngSvg size={24} />
                      </div>
                      <span className={styles.cardBadge}>Free Vectorizer</span>
                    </div>
                    <h4 className={styles.cardTitle}>PNG to SVG Converter &mdash; Free Vector Converter Online</h4>
                    <p className={styles.cardDesc}>
                      Convert raster PNG images to infinitely scalable SVG vector files for free online. Perfect for logos,
                      icons, and illustrations. No Illustrator required &mdash; upload your PNG and get a clean SVG in
                      seconds.
                    </p>
                    <ul className={styles.cardBullets}>
                      <li>Convert PNG logos and icons to scalable SVG</li>
                      <li>Infinitely scalable output &mdash; no quality loss at any size</li>
                      <li>Free &mdash; no Illustrator, Inkscape, or Figma subscription needed</li>
                    </ul>
                  </div>
                  <div className={styles.cardAction}>Vectorize PNG &rarr;</div>
                </Link>

                {/* Tool Card 4: SVG to PNG */}
                <Link href="/tools/svg-to-png/" className={`${styles.toolCardSub} gsap-tool-card`}>
                  <div>
                    <div className={styles.cardTop}>
                      <div className={styles.cardIcon}>
                        <IconSvgPng size={24} />
                      </div>
                      <span className={styles.cardBadge}>Raster Engine</span>
                    </div>
                    <h4 className={styles.cardTitle}>SVG to PNG Converter &mdash; Render Vector to Image Free</h4>
                    <p className={styles.cardDesc}>
                      Render SVG vector files to crisp PNG images with custom scaling and transparent or solid backgrounds.
                      Convert SVG code or SVG files to PNG instantly &mdash; ideal for developers, designers, and web
                      projects.
                    </p>
                    <ul className={styles.cardBullets}>
                      <li>Convert SVG file or SVG code to PNG</li>
                      <li>Set custom output resolution and background color</li>
                      <li>Transparent PNG output fully supported</li>
                    </ul>
                  </div>
                  <div className={styles.cardAction}>Render PNG &rarr;</div>
                </Link>
              </div>
            </div>
          </div>

          {/* 3b. DOCUMENT & PDF TOOLS */}
          <div className={styles.categoryBlock}>
            <div className={styles.categoryHeader}>
              <h3 className={styles.categoryTitle}>Document &amp; PDF Tools</h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                4 Free Document Tools
              </span>
            </div>

            <div className={styles.asymmetricGrid}>
              {/* Tool Card 5: Merge PDF (FEATURED) */}
              <Link href="/tools/merge-pdf/" className={`${styles.toolCardFeatured} gsap-tool-card`}>
                <div>
                  <div className={styles.cardTop}>
                    <div className={styles.cardIcon}>
                      <IconPdfWord size={26} />
                    </div>
                    <span
                      className={styles.cardBadge}
                      style={{ backgroundColor: 'var(--brand-blue-light)', color: 'var(--brand-blue)' }}
                    >
                      &starf; Featured
                    </span>
                  </div>
                  <h4 className={styles.cardTitle}>Merge PDF Files Online Free &mdash; Combine PDFs in Seconds</h4>
                  <p className={styles.cardDesc}>
                    Merge PDF files online for free &mdash; no account, no email, no file size limit. Upload multiple PDF
                    documents, drag to reorder pages, and download your combined PDF instantly with zero quality loss.
                    Files processed in your browser &mdash; never uploaded to any server.
                  </p>
                  <ul className={styles.cardBullets}>
                    <li>Combine 2, 5, 10 or more PDF files into one</li>
                    <li>Drag-and-drop page reordering before merging</li>
                    <li>Zero quality loss &mdash; no compression applied</li>
                    <li>100% private &mdash; files processed in your browser only</li>
                  </ul>
                </div>
                <div className={styles.cardAction}>
                  Merge PDF Free &rarr;
                </div>
              </Link>

              {/* Sub Right Column: Tool Cards 6, 7, 8 */}
              <div className={styles.subCardsColumn}>
                {/* Tool Card 6: Images to PDF */}
                <Link href="/tools/image-to-pdf/" className={`${styles.toolCardSub} gsap-tool-card`}>
                  <div>
                    <div className={styles.cardTop}>
                      <div className={styles.cardIcon}>
                        <IconImagePdf size={24} />
                      </div>
                      <span className={styles.cardBadge}>Multi-Image</span>
                    </div>
                    <h4 className={styles.cardTitle}>Images to PDF Compiler &mdash; Convert Photos to PDF Free</h4>
                    <p className={styles.cardDesc}>
                      Convert multiple photos, scans, and screenshots into a single PDF document with custom margins and
                      page sizes. Combine JPG, PNG, or WebP images into a professional PDF for printing or sharing.
                    </p>
                    <ul className={styles.cardBullets}>
                      <li>Convert multiple JPG/PNG/WebP images to one PDF</li>
                      <li>Set custom margins and A4 or Letter page size</li>
                      <li>Reorder images before compiling the final PDF</li>
                    </ul>
                  </div>
                  <div className={styles.cardAction}>Compile Images to PDF &rarr;</div>
                </Link>

                {/* Tool Card 7: PDF to Word (Coming Soon) */}
                <Link href="/contact/" className={`${styles.toolCardSub} gsap-tool-card`}>
                  <div>
                    <div className={styles.cardTop}>
                      <div className={styles.cardIcon}>
                        <IconPdfWord size={24} />
                      </div>
                      <span
                        className={styles.cardBadge}
                        style={{ backgroundColor: 'var(--brand-orange-light)', color: 'var(--brand-orange)' }}
                      >
                        Coming Soon
                      </span>
                    </div>
                    <h4 className={styles.cardTitle}>PDF to Word Converter &mdash; Free Online (.docx)</h4>
                    <p className={styles.cardDesc}>
                      Convert PDF to Word (.docx) free online &mdash; no software to install. Preserves 100% of formatting,
                      tables, columns, and images from your PDF into a fully editable Word document. Free &mdash; no
                      subscription, no watermark.
                    </p>
                    <ul className={styles.cardBullets}>
                      <li>PDF to editable Word (.docx) with full formatting preserved</li>
                      <li>Tables, columns, and images converted accurately</li>
                      <li>Free &mdash; no subscription, no watermark, no Word license needed</li>
                    </ul>
                  </div>
                  <div className={styles.cardAction}>Get Early Access &rarr;</div>
                </Link>

                {/* Tool Card 8: Word to PDF (Coming Soon) */}
                <Link href="/contact/" className={`${styles.toolCardSub} gsap-tool-card`}>
                  <div>
                    <div className={styles.cardTop}>
                      <div className={styles.cardIcon}>
                        <IconPdfWord size={24} />
                      </div>
                      <span
                        className={styles.cardBadge}
                        style={{ backgroundColor: 'var(--brand-orange-light)', color: 'var(--brand-orange)' }}
                      >
                        Coming Soon
                      </span>
                    </div>
                    <h4 className={styles.cardTitle}>Word to PDF Converter &mdash; Free .docx to PDF Online</h4>
                    <p className={styles.cardDesc}>
                      Convert Word documents (.docx) to PDF free online &mdash; preserving all fonts, formatting, tables,
                      and page layout exactly as they appear in Microsoft Word. No Word license required. Free and
                      unlimited.
                    </p>
                    <ul className={styles.cardBullets}>
                      <li>Convert .docx to PDF with full layout preserved</li>
                      <li>No Microsoft Word or Office installation required</li>
                      <li>Free &mdash; unlimited conversions with no file size cap</li>
                    </ul>
                  </div>
                  <div className={styles.cardAction}>Get Early Access &rarr;</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS SECTION (3 steps) */}
      <section id="how-it-works" className={styles.howItWorksSection}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
            <div className={styles.sectionTag}>Frictionless Workflow</div>
            <h2 className={styles.sectionTitle}>How FreeFileTools Works &mdash; 3 Steps</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              No accounts. No email confirmations. No credit cards. Start converting in under 10 seconds.
            </p>
          </div>

          <div className={styles.numberedGrid}>
            <div className={styles.numberedCard}>
              <div className={styles.largeNumeral}>01</div>
              <h3 className={styles.numberedCardTitle}>Select or Drop Your Files</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Drag and drop your images, PDFs, or SVG files directly into the tool workspace, or click to browse and
                select files from your device. Paste images straight from your clipboard in supported tools.
              </p>
            </div>

            <div className={styles.numberedCard}>
              <div className={styles.largeNumeral}>02</div>
              <h3 className={styles.numberedCardTitle}>Instant Local Processing</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Your browser processes the files locally using{' '}
                <a
                  href="https://en.wikipedia.org/wiki/WebAssembly"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--brand-blue)', textDecoration: 'underline' }}
                >
                  WebAssembly
                </a>{' '}
                and HTML5 Canvas &mdash; in milliseconds, on your own device. Zero bytes are sent to any external server
                at any point.
              </p>
            </div>

            <div className={styles.numberedCard}>
              <div className={styles.largeNumeral}>03</div>
              <h3 className={styles.numberedCardTitle}>Download Your Clean Result</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Preview your finished file and click Download. Your converted or edited file saves directly to your device
                at original quality &mdash; no watermarks, no compression, no size limits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY FREEFILETOOLS SECTION (6 feature boxes) */}
      <section className={styles.whySection}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
            <div className={styles.sectionTag}>Why Choose Us</div>
            <h2 className={styles.sectionTitle}>Why Use FreeFileTools?</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Engineered from the ground up for maximum privacy, speed, and zero compromises.
            </p>
          </div>

          <div className={styles.whyGrid}>
            <div className={styles.whyCard}>
              <h3 className={styles.whyCardTitle}>100% Free &mdash; No Hidden Tiers</h3>
              <p className={styles.whyCardText}>
                Every tool is completely free. No &apos;free plan&apos; with daily limits. No pro subscription required
                to unlock features. No credit card needed at any point.
              </p>
            </div>

            <div className={styles.whyCard}>
              <h3 className={styles.whyCardTitle}>Your Files Never Leave Your Device</h3>
              <p className={styles.whyCardText}>
                All processing runs inside your browser using{' '}
                <a
                  href="https://en.wikipedia.org/wiki/HTML5"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--brand-blue)', textDecoration: 'underline' }}
                >
                  HTML5 Canvas
                </a>{' '}
                and WebAssembly. Confidential documents, private photos, and business files are never uploaded to any
                server.
              </p>
            </div>

            <div className={styles.whyCard}>
              <h3 className={styles.whyCardTitle}>No Signup or Account Required</h3>
              <p className={styles.whyCardText}>
                Open any tool and start immediately. No email address, no registration, no verification SMS. Just pick
                your tool and go.
              </p>
            </div>

            <div className={styles.whyCard}>
              <h3 className={styles.whyCardTitle}>Zero Watermarks on Output</h3>
              <p className={styles.whyCardText}>
                Your exported images, PDFs, and documents come out completely clean. No FreeFileTools logo, no stamp, no
                visible or invisible watermark embedded.
              </p>
            </div>

            <div className={styles.whyCard}>
              <h3 className={styles.whyCardTitle}>Works on Any Device</h3>
              <p className={styles.whyCardText}>
                Mobile, tablet, laptop, or desktop &mdash; all tools are fully responsive and work on iOS, Android,
                macOS, Windows, and Linux in any modern browser.
              </p>
            </div>

            <div className={styles.whyCard}>
              <h3 className={styles.whyCardTitle}>Unlimited Conversions</h3>
              <p className={styles.whyCardText}>
                Because processing runs on your own hardware rather than our servers, there are zero daily limits. Convert
                hundreds of files every day without restriction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION (8 questions with full answers) */}
      <section className={styles.faqSection}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
            <div className={styles.sectionTag}>Common Questions</div>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Everything you need to know about FreeFileTools.
            </p>
          </div>

          <div className={styles.faqList}>
            {homeFaqs.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>{faq.q}</h3>
                <div className={styles.faqAnswer}>{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
