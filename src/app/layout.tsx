import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://freefiletools.site'),
  title: {
    default: 'Free Online File Tools: 100% Free, Unlimited & Private',
    template: '%s | FreeFileTools',
  },
  description:
    'Free online file tools with zero signup, unlimited conversions, and no watermarks. Convert images, PDFs, Word documents, and vectors directly in your browser.',
  applicationName: 'FreeFileTools',
  authors: [{ name: 'FreeFileTools Team', url: 'https://freefiletools.site' }],
  generator: 'Next.js',
  keywords: [
    'free online file tools',
    'free image background remover',
    'free png to svg',
    'free svg to png',
    'free pdf to word',
    'free word to pdf',
    'free image to pdf',
    'client side file converter',
    'no watermark file tools',
    'unlimited free converter',
  ],
  icons: {
    icon: '/brand/logo-icon.jpg',
    apple: '/brand/logo-icon.jpg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://freefiletools.site',
    siteName: 'FreeFileTools',
    title: 'Free Online File Tools: 100% Free, Unlimited & Private',
    description:
      'Unlimited free online file tools. Convert images, PDFs, Word files, and vectors locally in your browser with zero watermark and complete privacy.',
    images: [
      {
        url: '/brand/logo-full.png',
        width: 1200,
        height: 400,
        alt: 'FreeFileTools Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online File Tools: 100% Free, Unlimited & Private',
    description:
      'Free browser-based file conversion and editing tools. No signup, no limits, no watermarks, files never leave your device.',
    images: ['/brand/logo-full.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdOrg = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FreeFileTools',
    url: 'https://freefiletools.site',
    logo: 'https://freefiletools.site/brand/logo-full.png',
    description:
      'Provider of genuinely free, unlimited client-side online file conversion and editing utilities.',
  };

  const jsonLdWebSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FreeFileTools',
    url: 'https://freefiletools.site',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://freefiletools.site/tools/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Outfit:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
