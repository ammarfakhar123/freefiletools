import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import { IconShield, IconCheck } from '@/components/icons';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        {/* Core Promises Banner */}
        <div className={styles.corePromisesBanner}>
          <div className={styles.promiseItem}>
            <IconCheck size={18} style={{ color: 'var(--brand-green)' }} />
            <span>100% Free to Use</span>
          </div>
          <div className={styles.promiseItem}>
            <IconCheck size={18} style={{ color: 'var(--brand-green)' }} />
            <span>Unlimited Conversions</span>
          </div>
          <div className={styles.promiseItem}>
            <IconCheck size={18} style={{ color: 'var(--brand-green)' }} />
            <span>No Signup or Accounts</span>
          </div>
          <div className={styles.promiseItem}>
            <IconCheck size={18} style={{ color: 'var(--brand-green)' }} />
            <span>Zero Watermarks</span>
          </div>
          <div className={styles.promiseItem}>
            <IconShield size={18} style={{ color: 'var(--brand-blue)' }} />
            <span>Files Never Leave Your Device</span>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className={styles.footerGrid}>
          {/* Column 1: Brand & About */}
          <div className={styles.colBrand}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <img
                src="/brand/logo-full.png"
                alt="FreeFileTools"
                style={{ height: '38px', width: 'auto' }}
              />
            </Link>
            <div>
              <p className={styles.brandDesc}>
                FreeFileTools provides 100% free online file tools: no subscriptions, no paywalls, no watermarks,
                and unlimited conversions. All operations run client-side inside your browser for total data
                privacy and rapid execution.
              </p>
            </div>
            <div>
              <a
                href="mailto:muhammadammarfakhar@gmail.com?subject=Inquiry%20from%20FreeFileTools"
                className={styles.emailButton}
                aria-label="Email Us Directly"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>Email Us</span>
              </a>
            </div>
          </div>

          {/* Column 2: Image Tools */}
          <div>
            <div className={styles.colTitle}>Image Tools</div>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <Link href="/tools/image-background-remover/">
                  Image Background Remover
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/tools/bulk-image-converter/">
                  Bulk Image Converter (WebP, PNG, JPG)
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/tools/png-to-svg/">
                  PNG to SVG Converter
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/tools/svg-to-png/">
                  SVG to PNG Converter
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/tools/image-to-pdf/">
                  Image to PDF Compiler
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Document Tools */}
          <div>
            <div className={styles.colTitle}>Document Tools</div>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <Link href="/tools/image-to-pdf/">
                  Image to PDF Compiler
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/tools/merge-pdf/">
                  Merge PDF Documents
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/tools/pdf-to-word/">
                  PDF to Word (Coming Soon)
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/tools/word-to-pdf/">
                  Word to PDF (Coming Soon)
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/tools/">
                  Browse All File Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Trust & Legal */}
          <div>
            <div className={styles.colTitle}>Company & Legal</div>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <Link href="/about/">About FreeFileTools</Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/privacy-policy/">Privacy Policy</Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/terms-of-service/">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div>
            &copy; 2026 FreeFileTools.site. Genuinely free online file tools.
          </div>
          <div>
            Client-side browser processing. Zero server logs.
          </div>
        </div>
      </div>
    </footer>
  );
}
