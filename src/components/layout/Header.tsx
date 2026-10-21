'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import {
  IconBgRemover,
  IconPngSvg,
  IconSvgPng,
  IconPdfWord,
  IconWordPdf,
  IconImagePdf,
  IconCheck,
} from '@/components/icons';

export function Header() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 180);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const isToolActive = (slug: string) => pathname === `/tools/${slug}/` || pathname === `/tools/${slug}`;
  const isToolsSectionActive = pathname.startsWith('/tools');

  return (
    <div className={styles.headerWrapper}>
      <header>
        <div className={`container ${styles.inner}`}>
          {/* Brand Logo */}
          <Link href="/" className={styles.brandLink} aria-label="FreeFileTools Home">
            <img
              src="/brand/logo-full.png"
              alt="FreeFileTools Logo"
              className={styles.logoImage}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.nav} aria-label="Primary Navigation">
            {/* All Tools Dropdown with Hover Trigger */}
            <div
              className={styles.dropdownWrapper}
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`${styles.dropdownTrigger} ${isToolsSectionActive || dropdownOpen ? styles.activeGroup : ''}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
              >
                <span>All Tools</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className={`${styles.chevron} ${dropdownOpen ? styles.chevronOpen : ''}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {dropdownOpen && (
                <div
                  className={styles.dropdownMenu}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div>
                    <div className={styles.dropdownGroupTitle}>Image Tools</div>

                    <Link
                      href="/tools/bulk-image-converter/"
                      className={`${styles.dropdownItem} ${isToolActive('bulk-image-converter') ? styles.activeItem : ''}`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      <div className={styles.itemLeft}>
                        <div className={styles.itemIconWrap}>
                          <IconSvgPng size={20} />
                        </div>
                        <div className={styles.itemText}>
                          <span className={styles.itemTitle}>Bulk Image Converter</span>
                          <span className={styles.itemSubtitle}>WebP, PNG, JPG, AVIF batch</span>
                        </div>
                      </div>
                      {isToolActive('bulk-image-converter') && <IconCheck size={16} />}
                    </Link>

                    <Link
                      href="/tools/image-background-remover/"
                      className={`${styles.dropdownItem} ${isToolActive('image-background-remover') ? styles.activeItem : ''}`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      <div className={styles.itemLeft}>
                        <div className={styles.itemIconWrap}>
                          <IconBgRemover size={20} />
                        </div>
                        <div className={styles.itemText}>
                          <span className={styles.itemTitle}>Background Remover</span>
                          <span className={styles.itemSubtitle}>AI &amp; Smart Keyer</span>
                        </div>
                      </div>
                      {isToolActive('image-background-remover') && <IconCheck size={16} />}
                    </Link>

                    <Link
                      href="/tools/image-resizer/"
                      className={`${styles.dropdownItem} ${isToolActive('image-resizer') ? styles.activeItem : ''}`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      <div className={styles.itemLeft}>
                        <div className={styles.itemIconWrap}>
                          <IconSvgPng size={20} />
                        </div>
                        <div className={styles.itemText}>
                          <span className={styles.itemTitle}>Image Resizer</span>
                          <span className={styles.itemSubtitle}>High-DPI crop &amp; scale</span>
                        </div>
                      </div>
                      {isToolActive('image-resizer') && <IconCheck size={16} />}
                    </Link>

                    <Link
                      href="/tools/png-to-svg/"
                      className={`${styles.dropdownItem} ${isToolActive('png-to-svg') ? styles.activeItem : ''}`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      <div className={styles.itemLeft}>
                        <div className={styles.itemIconWrap}>
                          <IconPngSvg size={20} />
                        </div>
                        <div className={styles.itemText}>
                          <span className={styles.itemTitle}>PNG to SVG Vector</span>
                          <span className={styles.itemSubtitle}>Scalable sharp curves</span>
                        </div>
                      </div>
                      {isToolActive('png-to-svg') && <IconCheck size={16} />}
                    </Link>

                    <Link
                      href="/tools/svg-to-png/"
                      className={`${styles.dropdownItem} ${isToolActive('svg-to-png') ? styles.activeItem : ''}`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      <div className={styles.itemLeft}>
                        <div className={styles.itemIconWrap}>
                          <IconSvgPng size={20} />
                        </div>
                        <div className={styles.itemText}>
                          <span className={styles.itemTitle}>SVG to PNG Image</span>
                          <span className={styles.itemSubtitle}>High-DPI rasterization</span>
                        </div>
                      </div>
                      {isToolActive('svg-to-png') && <IconCheck size={16} />}
                    </Link>
                  </div>

                  <div>
                    <div className={styles.dropdownGroupTitle}>Document & File Tools</div>

                    <Link
                      href="/tools/image-to-pdf/"
                      className={`${styles.dropdownItem} ${isToolActive('image-to-pdf') ? styles.activeItem : ''}`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      <div className={styles.itemLeft}>
                        <div className={styles.itemIconWrap} style={{ backgroundColor: 'var(--brand-green-light)', color: 'var(--brand-green)' }}>
                          <IconImagePdf size={20} />
                        </div>
                        <div className={styles.itemText}>
                          <span className={styles.itemTitle}>Images to PDF</span>
                          <span className={styles.itemSubtitle}>Compile photos into PDF</span>
                        </div>
                      </div>
                      {isToolActive('image-to-pdf') && <IconCheck size={16} />}
                    </Link>

                    <Link
                      href="/tools/merge-pdf/"
                      className={`${styles.dropdownItem} ${isToolActive('merge-pdf') ? styles.activeItem : ''}`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      <div className={styles.itemLeft}>
                        <div className={styles.itemIconWrap} style={{ backgroundColor: 'var(--brand-blue-light)', color: 'var(--brand-blue)' }}>
                          <IconPdfWord size={20} />
                        </div>
                        <div className={styles.itemText}>
                          <span className={styles.itemTitle}>Merge PDF (Combine)</span>
                          <span className={styles.itemSubtitle}>Join files in &lt;100ms</span>
                        </div>
                      </div>
                      {isToolActive('merge-pdf') && <IconCheck size={16} />}
                    </Link>

                    <Link
                      href="/tools/pdf-to-word/"
                      className={`${styles.dropdownItem} ${styles.dropdownItemDisabled}`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      <div className={styles.itemLeft}>
                        <div className={styles.itemIconWrap} style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-muted)' }}>
                          <IconPdfWord size={20} />
                        </div>
                        <div className={styles.itemText}>
                          <span className={styles.itemTitle}>PDF to Word (.docx)</span>
                          <span className={styles.itemSubtitle}>Editable documents</span>
                        </div>
                      </div>
                      <span className={styles.comingSoonBadge}>Coming Soon</span>
                    </Link>

                    <Link
                      href="/tools/word-to-pdf/"
                      className={`${styles.dropdownItem} ${styles.dropdownItemDisabled}`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      <div className={styles.itemLeft}>
                        <div className={styles.itemIconWrap} style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-muted)' }}>
                          <IconWordPdf size={20} />
                        </div>
                        <div className={styles.itemText}>
                          <span className={styles.itemTitle}>Word (.docx) to PDF</span>
                          <span className={styles.itemSubtitle}>Universal PDF export</span>
                        </div>
                      </div>
                      <span className={styles.comingSoonBadge}>Coming Soon</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Quick Links (ONLY Live Tools) */}
            <Link
              href="/tools/bulk-image-converter/"
              className={`${styles.navLink} ${isToolActive('bulk-image-converter') ? styles.active : ''}`}
            >
              Bulk Convert
            </Link>

            <Link
              href="/tools/image-background-remover/"
              className={`${styles.navLink} ${isToolActive('image-background-remover') ? styles.active : ''}`}
            >
              BG Remover
            </Link>

            <Link
              href="/tools/png-to-svg/"
              className={`${styles.navLink} ${isToolActive('png-to-svg') ? styles.active : ''}`}
            >
              PNG to SVG
            </Link>

            <Link
              href="/tools/svg-to-png/"
              className={`${styles.navLink} ${isToolActive('svg-to-png') ? styles.active : ''}`}
            >
              SVG to PNG
            </Link>

            <Link
              href="/tools/image-to-pdf/"
              className={`${styles.navLink} ${isToolActive('image-to-pdf') ? styles.active : ''}`}
            >
              Image to PDF
            </Link>

            <Link
              href="/tools/merge-pdf/"
              className={`${styles.navLink} ${isToolActive('merge-pdf') ? styles.active : ''}`}
            >
              Merge PDF
            </Link>
          </nav>

          {/* Right Status */}
          <div className={styles.rightGroup}>
            <span className={styles.badgePill}>100% Free</span>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={styles.mobileMenuBtn}
              aria-label="Toggle navigation menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Drawer (Only Live Tools + Coming Soon) */}
        {mobileOpen && (
          <div className={styles.mobileDrawer}>
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={pathname === '/' ? styles.mobileActive : ''}
            >
              Home
            </Link>
            <Link
              href="/tools/bulk-image-converter/"
              onClick={() => setMobileOpen(false)}
              className={isToolActive('bulk-image-converter') ? styles.mobileActive : ''}
            >
              Bulk Image Converter (All Formats)
            </Link>
            <Link
              href="/tools/image-background-remover/"
              onClick={() => setMobileOpen(false)}
              className={isToolActive('image-background-remover') ? styles.mobileActive : ''}
            >
              Image Background Remover
            </Link>
            <Link
              href="/tools/image-resizer/"
              onClick={() => setMobileOpen(false)}
              className={isToolActive('image-resizer') ? styles.mobileActive : ''}
            >
              Image Resizer (Crop & Scale)
            </Link>
            <Link
              href="/tools/png-to-svg/"
              onClick={() => setMobileOpen(false)}
              className={isToolActive('png-to-svg') ? styles.mobileActive : ''}
            >
              PNG to SVG Vector
            </Link>
            <Link
              href="/tools/svg-to-png/"
              onClick={() => setMobileOpen(false)}
              className={isToolActive('svg-to-png') ? styles.mobileActive : ''}
            >
              SVG to PNG Image
            </Link>
            <Link
              href="/tools/image-to-pdf/"
              onClick={() => setMobileOpen(false)}
              className={isToolActive('image-to-pdf') ? styles.mobileActive : ''}
            >
              Images to PDF Compiler
            </Link>
            <Link
              href="/tools/merge-pdf/"
              onClick={() => setMobileOpen(false)}
              className={isToolActive('merge-pdf') ? styles.mobileActive : ''}
            >
              Merge PDF Documents
            </Link>
            <Link
              href="/tools/pdf-to-word/"
              onClick={() => setMobileOpen(false)}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <span>PDF to Word</span>
              <span className={styles.comingSoonBadge}>Coming Soon</span>
            </Link>
            <Link
              href="/tools/word-to-pdf/"
              onClick={() => setMobileOpen(false)}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <span>Word to PDF</span>
              <span className={styles.comingSoonBadge}>Coming Soon</span>
            </Link>
          </div>
        )}
      </header>
      {/* Colorful Accent Bar at the Bottom of Header */}
      <div className={styles.bottomAccentBar} />
    </div>
  );
}
