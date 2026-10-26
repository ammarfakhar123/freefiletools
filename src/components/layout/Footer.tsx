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
          {/* Column 1: Brand & Contact */}
          <div className={styles.colBrand}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <img
                src="/brand/logo-full.png"
                alt="FreeFileTools"
                style={{ height: '38px', width: 'auto' }}
              />
            </Link>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.85rem 0 0.5rem', color: 'var(--text-primary)' }}>
              FreeFileTools
            </h3>
            <div>
              <p className={styles.brandDesc}>
                FreeFileTools provides 8 free online file tools: <Link href="/tools/merge-pdf/">merge PDF</Link>, <Link href="/tools/image-resizer/">resize images</Link>, <Link href="/tools/bulk-image-converter/">bulk image converter</Link>, <Link href="/tools/png-to-svg/">PNG to SVG</Link>, <Link href="/tools/svg-to-png/">SVG to PNG</Link>, and <Link href="/tools/image-to-pdf/">images to PDF</Link>. No subscriptions. No signups. No watermarks. All file processing runs locally in your browser — your files never leave your device.
              </p>
            </div>

            <div className={styles.emailContainer}>
              <a
                href="mailto:info@freefiletools.site"
                className={styles.emailButton}
                aria-label="Email FreeFileTools Support"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>info@freefiletools.site</span>
              </a>
            </div>
          </div>

          {/* Column 2: Image Tools */}
          <div>
            <h4 className={styles.colTitle}>Image Tools</h4>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <Link href="/tools/bulk-image-converter/">
                  Bulk Image Converter (WebP, PNG, JPG)
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/tools/image-resizer/">
                  Image Resizer (Crop &amp; Scale)
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/tools/png-to-svg/">
                  PNG to SVG Vector Converter
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/tools/svg-to-png/">
                  SVG to PNG Renderer
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Document Tools */}
          <div>
            <h4 className={styles.colTitle}>Document Tools</h4>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <Link href="/tools/image-to-pdf/">
                  Images to PDF Compiler
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/tools/merge-pdf/">
                  Merge PDF Documents
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/contact/">
                  PDF to Word (Coming Soon)
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/contact/">
                  Word to PDF (Coming Soon)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h4 className={styles.colTitle}>Company</h4>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <Link href="/about/">About FreeFileTools</Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/contact/">Contact Us</Link>
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
            &copy; 2026 FreeFileTools.site. All rights reserved.
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Support: <a href="mailto:info@freefiletools.site" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>info@freefiletools.site</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
