import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import styles from './tool-page.module.css';
import { TOOLS, getToolBySlug, getRelatedTools, getAllToolSlugs } from '@/config/tools';
import { getToolArticle } from '@/content/articles';
import { IconShield, IconCheck } from '@/components/icons';

// Dynamically import tool components with ssr: false to prevent server-side evaluation of WASM/Canvas libraries
const ToolSkeleton = () => (
  <div
    style={{
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      padding: '2.5rem',
      textAlign: 'center',
    }}
  >
    <div className="skeleton" style={{ width: '100%', maxWidth: '480px', height: '180px', margin: '0 auto 1.5rem' }} />
    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Initializing tool interface...</p>
  </div>
);

const ImageBackgroundRemover = dynamic(
  () => import('@/components/tools/ImageBackgroundRemover').then((m) => m.ImageBackgroundRemover),
  { ssr: false, loading: () => <ToolSkeleton /> }
);
const BulkImageConverter = dynamic(
  () => import('@/components/tools/BulkImageConverter').then((m) => m.BulkImageConverter),
  { ssr: false, loading: () => <ToolSkeleton /> }
);
const PngToSvg = dynamic(
  () => import('@/components/tools/PngToSvg').then((m) => m.PngToSvg),
  { ssr: false, loading: () => <ToolSkeleton /> }
);
const SvgToPng = dynamic(
  () => import('@/components/tools/SvgToPng').then((m) => m.SvgToPng),
  { ssr: false, loading: () => <ToolSkeleton /> }
);
const PdfToWord = dynamic(
  () => import('@/components/tools/PdfToWord').then((m) => m.PdfToWord),
  { ssr: false, loading: () => <ToolSkeleton /> }
);
const WordToPdf = dynamic(
  () => import('@/components/tools/WordToPdf').then((m) => m.WordToPdf),
  { ssr: false, loading: () => <ToolSkeleton /> }
);
const ImageToPdf = dynamic(
  () => import('@/components/tools/ImageToPdf').then((m) => m.ImageToPdf),
  { ssr: false, loading: () => <ToolSkeleton /> }
);
const MergePdf = dynamic(
  () => import('@/components/tools/MergePdf').then((m) => m.MergePdf),
  { ssr: false, loading: () => <ToolSkeleton /> }
);

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return getAllToolSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const tool = getToolBySlug(params.slug);
  if (!tool) return {};

  const url = `https://freefiletools.site/tools/${tool.slug}/`;

  return {
    title: `${tool.title} | 100% Free & Unlimited`,
    description: tool.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${tool.title} | FreeFileTools`,
      description: tool.metaDescription,
      url,
      type: 'website',
      images: [
        {
          url: '/brand/logo-full.png',
          width: 1200,
          height: 400,
          alt: `${tool.title} Banner`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.title} | FreeFileTools`,
      description: tool.metaDescription,
      images: ['/brand/logo-full.png'],
    },
  };
}

export default function ToolPage({ params }: PageProps) {
  const tool = getToolBySlug(params.slug);
  if (!tool) {
    notFound();
  }

  const relatedTools = getRelatedTools(tool.slug);
  const articleContent = getToolArticle(tool.slug);

  // Render the specific active interactive tool component
  const renderActiveTool = () => {
    switch (tool.slug) {
      case 'image-background-remover':
        return <ImageBackgroundRemover />;
      case 'bulk-image-converter':
        return <BulkImageConverter />;
      case 'png-to-svg':
        return <PngToSvg />;
      case 'svg-to-png':
        return <SvgToPng />;
      case 'pdf-to-word':
        return <PdfToWord />;
      case 'word-to-pdf':
        return <WordToPdf />;
      case 'image-to-pdf':
        return <ImageToPdf />;
      case 'merge-pdf':
        return <MergePdf />;
      default:
        return null;
    }
  };

  // Structured Data Schemas
  const jsonLdWebApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.title,
    url: `https://freefiletools.site/tools/${tool.slug}/`,
    applicationCategory: tool.category === 'image' ? 'DesignApplication' : 'BusinessApplication',
    operatingSystem: 'All (Web Browser)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: tool.metaDescription,
    featureList: tool.features.map((f) => f.title).join(', '),
  };

  const jsonLdHowTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to use ${tool.title}`,
    description: tool.heroSubheading,
    step: tool.howToSteps.map((step) => ({
      '@type': 'HowToStep',
      position: step.step,
      name: step.title,
      text: step.text,
    })),
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const jsonLdBreadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://freefiletools.site',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tools',
        item: 'https://freefiletools.site/tools/',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: tool.shortTitle,
        item: `https://freefiletools.site/tools/${tool.slug}/`,
      },
    ],
  };

  // Basic markdown-like heading and paragraph renderer for the SEO article
  const renderArticle = (text: string) => {
    const lines = text.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let currentParagraph: string[] = [];
    let tableRows: string[][] = [];
    let isTable = false;

    const flushParagraph = (key: string) => {
      if (currentParagraph.length > 0) {
        elements.push(<p key={key}>{currentParagraph.join(' ')}</p>);
        currentParagraph = [];
      }
    };

    const flushTable = (key: string) => {
      if (tableRows.length > 0) {
        const header = tableRows[0];
        const bodyRows = tableRows.slice(2);
        elements.push(
          <div key={key} style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  {header.map((col, i) => (
                    <th key={i}>{col.replace(/\*\*/g, '').trim()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx}>{cell.replace(/\*\*/g, '').trim()}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
        isTable = false;
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        flushParagraph(`p-before-table-${index}`);
        isTable = true;
        const cols = trimmed
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim());
        tableRows.push(cols);
        return;
      } else if (isTable) {
        flushTable(`table-${index}`);
      }

      if (trimmed.startsWith('## ')) {
        flushParagraph(`p-before-h2-${index}`);
        elements.push(<h2 key={`h2-${index}`}>{trimmed.replace('## ', '')}</h2>);
      } else if (trimmed.startsWith('### ')) {
        flushParagraph(`p-before-h3-${index}`);
        elements.push(<h3 key={`h3-${index}`}>{trimmed.replace('### ', '')}</h3>);
      } else if (trimmed.startsWith('1. ') || trimmed.startsWith('2. ') || trimmed.startsWith('3. ') || trimmed.startsWith('4. ')) {
        flushParagraph(`p-before-num-${index}`);
        elements.push(
          <div key={`num-${index}`} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: 700, color: 'var(--brand-blue)' }}>{trimmed.slice(0, 2)}</span>
            <span>{trimmed.slice(3).replace(/\*\*(.*?)\*\*/g, '$1')}</span>
          </div>
        );
      } else if (trimmed.startsWith('- ')) {
        flushParagraph(`p-before-bullet-${index}`);
        elements.push(
          <div key={`bullet-${index}`} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', paddingLeft: '1rem' }}>
            <span style={{ color: 'var(--brand-blue)' }}>•</span>
            <span>{trimmed.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '$1')}</span>
          </div>
        );
      } else if (trimmed.length > 0) {
        currentParagraph.push(trimmed);
      } else {
        flushParagraph(`p-${index}`);
      }
    });

    flushParagraph('p-final');
    if (isTable) flushTable('table-final');

    return elements;
  };

  return (
    <div>
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowTo) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }}
      />

      {/* SECTION 1: Hero + Working Tool */}
      <section className={styles.toolHeroSection}>
        <div className="container">
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb navigation">
            <Link href="/">Home</Link>
            <span className={styles.breadcrumbsSeparator}>/</span>
            <Link href="/tools/">Tools</Link>
            <span className={styles.breadcrumbsSeparator}>/</span>
            <span style={{ color: 'var(--text-primary)' }}>{tool.shortTitle}</span>
          </nav>

          <div className={styles.toolHeader}>
            <div className={styles.toolTag}>
              <IconShield size={16} />
              <span>{tool.badgeText}</span>
            </div>
            <h1 className={styles.toolTitle}>{tool.title}</h1>
            <p className={styles.toolSubheading}>{tool.heroSubheading}</p>
          </div>

          {(tool.slug === 'pdf-to-word' || tool.slug === 'word-to-pdf') && (
            <div
              style={{
                maxWidth: '720px',
                margin: '0 auto 1.5rem',
                padding: '1rem 1.25rem',
                backgroundColor: '#fff3e6',
                border: '1px solid rgba(255, 115, 0, 0.3)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <span
                style={{
                  padding: '0.25rem 0.65rem',
                  backgroundColor: '#ff7300',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  borderRadius: '9999px',
                  whiteSpace: 'nowrap',
                }}
              >
                Coming Soon
              </span>
              <span style={{ fontSize: '0.88rem', color: '#7c2d12', lineHeight: 1.5 }}>
                This tool is currently undergoing an engine upgrade to deliver 100% exact layout and color preservation. Preview access is available below.
              </span>
            </div>
          )}

          {/* Working tool UI immediately usable */}
          <div>{renderActiveTool()}</div>
        </div>
      </section>

      {/* SECTION 2: 100% Free Statement */}
      <section className={styles.freeStatementSection}>
        <div className="container">
          <div className={styles.freeStatementBox}>
            <h2 className={styles.freeStatementTitle}>
              100% Free: No Pro Version, No Hidden Paywall, No Watermark
            </h2>
            <p className={styles.freeStatementText}>
              Every feature on this page is genuinely free. We do not maintain a premium plan, we do not require
              user signups or login credentials, we never stamp watermarks on your files, and we impose zero daily
              conversion limits. You can convert or process hundreds of files a day without interruption.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: How to Use (HowTo steps, numbered) */}
      <section className={styles.howToSection}>
        <div className="container">
          <div style={{ maxWidth: '640px' }}>
            <div className={styles.toolTag}>Step-by-Step Instructions</div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, marginTop: 0 }}>
              How to Use {tool.shortTitle} Online
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Follow these simple steps to process your files in seconds.
            </p>
          </div>

          <div className={styles.numberedGrid}>
            {tool.howToSteps.map((step) => (
              <div key={step.step} className={styles.howToCard}>
                <div className={styles.howToStepNumber}>0{step.step}</div>
                <h3 className={styles.howToStepTitle}>{step.title}</h3>
                <p className={styles.howToStepText}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Key Features & Benefits */}
      <section className={styles.featuresSection}>
        <div className="container">
          <div style={{ maxWidth: '640px' }}>
            <div className={styles.toolTag}>Core Capabilities</div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, marginTop: 0 }}>
              Key Features and Benefits
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Engineered for reliability, precision, and complete privacy.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            {tool.features.map((feature, i) => (
              <div key={i} className={styles.featureCard}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureText}>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Long-form SEO Article (Minimum 1500 words) */}
      <section className={styles.articleSection}>
        <div className={`container ${styles.articleWrapper}`}>
          <div className={styles.toolTag}>In-Depth Guide & Documentation</div>
          {renderArticle(articleContent)}
        </div>
      </section>

      {/* SECTION 6: FAQ (8 to 12 questions) */}
      <section className={styles.faqSection}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}>
            <div className={styles.toolTag}>Help & Answers</div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, marginTop: 0 }}>
              Frequently Asked Questions About {tool.shortTitle}
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Answers to common technical, privacy, and formatting questions.
            </p>
          </div>

          <div className={styles.faqList}>
            {tool.faq.map((item, index) => (
              <div key={index} className={styles.faqCard}>
                <h3 className={styles.faqQuestion}>{item.question}</h3>
                <p className={styles.faqAnswer}>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Related Tools Block (Internal links with descriptive anchor text) */}
      <section className={styles.relatedToolsSection}>
        <div className="container">
          <div style={{ maxWidth: '640px' }}>
            <div className={styles.toolTag}>Explore More</div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, marginTop: 0 }}>
              Related Free File Utilities
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Complementary tools to streamline your document and image workflows.
            </p>
          </div>

          <div className={styles.relatedGrid}>
            {relatedTools.map((relTool) => (
              <Link
                key={relTool.slug}
                href={`/tools/${relTool.slug}/`}
                className={styles.relatedCard}
              >
                <div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: 'var(--brand-blue)',
                    }}
                  >
                    {relTool.category === 'image' ? 'Image Tool' : 'Document Tool'}
                  </span>
                  <h3
                    style={{
                      fontSize: '1.15rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      margin: '0.4rem 0 0.5rem',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {relTool.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.5',
                      margin: 0,
                    }}
                  >
                    {relTool.metaDescription}
                  </p>
                </div>
                <div
                  style={{
                    marginTop: '1.25rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--accent-primary)',
                  }}
                >
                  Open {relTool.shortTitle}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: Privacy Reassurance Note */}
      <section className={styles.privacyReassuranceSection}>
        <div className="container">
          <div className={styles.reassuranceBox}>
            <div style={{ color: 'var(--brand-blue)', flexShrink: 0 }}>
              <IconShield size={32} />
            </div>
            <div>
              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  marginBottom: '0.35rem',
                  color: 'var(--text-primary)',
                }}
              >
                Your Files Never Leave Your Device
              </h3>
              <p className={styles.reassuranceText}>
                We prioritize your privacy above all else. FreeFileTools processes files entirely inside your web
                browser memory using WebAssembly and client-side scripts. Your photos, documents, and vectors are
                never uploaded to our servers, never stored in cloud databases, and never inspected by third parties.
                When you close this tab, all session memory is completely cleared.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
