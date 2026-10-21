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
            <div>
              <p className={styles.brandDesc}>
                FreeFileTools provides 100% free online file tools: no subscriptions, no paywalls, no watermarks,
                and unlimited conversions. All operations run client-side inside your browser for total data
                privacy and rapid execution.
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
              <span className={styles.emailSubtext}>Direct email support • We reply promptly</span>
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
                <Link href="/tools/image-resizer/">
                  Image Resizer (Crop & Scale)
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/tools/bulk-image-converter/">
                  Bulk Image Converter (WebP, PNG, JPG)
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/tools/png-to-svg/">
                  PNG to SVG Vector
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/tools/svg-to-png/">
                  SVG to PNG Converter
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
              <li className={styles.linkItem} style={{ marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Contact: <a href="mailto:info@freefiletools.site" style={{ color: 'var(--brand-blue)', fontWeight: 600 }}>info@freefiletools.site</a>
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
