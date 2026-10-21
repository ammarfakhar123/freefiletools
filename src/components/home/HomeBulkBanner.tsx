'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './HomeBulkBanner.module.css';
import { IconShield, IconSvgPng } from '@/components/icons';

export function HomeBulkBanner() {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const handleFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files).filter((file) =>
      file.type.startsWith('image/') || /\.(png|jpe?g|webp|avif|bmp|ico|svg|gif)$/i.test(file.name)
    );

    if (fileArray.length > 0) {
      if (typeof window !== 'undefined') {
        (window as any).__PENDING_BULK_FILES__ = fileArray;
      }
    }
    router.push('/tools/bulk-image-converter/');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    } else {
      router.push('/tools/bulk-image-converter/');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.bannerWrapper}>
      {/* Banner Header */}
      <div className={styles.bannerHeader}>
        <div className={styles.headerTitle}>
          <IconSvgPng size={20} />
          <span>Bulk Image Converter</span>
        </div>
        <span className={styles.badge}>Batch Engine</span>
      </div>

      {/* Interactive Drop Box */}
      <div
        className={`${styles.dropBox} ${isDragOver ? styles.dragOver : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBoxClick}
        role="button"
        tabIndex={0}
        aria-label="Drop images or click to convert in bulk"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleBoxClick();
          }
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.png,.jpg,.jpeg,.webp,.avif,.bmp,.ico,.svg"
          onChange={handleInputChange}
          className={styles.inputHidden}
          tabIndex={-1}
        />

        <div className={styles.iconCircle}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>

        <div className={styles.dropTitle}>Drop Images to Convert in Bulk</div>
        <div className={styles.dropDesc}>
          Convert dozens of photos to WebP, PNG, JPG, AVIF, or ICO in milliseconds with zero quality loss.
        </div>

        <button
          type="button"
          className={styles.selectButton}
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
          <span>Select Images to Convert</span>
        </button>

        <div className={styles.formatPillsRow}>
          <span className={styles.formatPill}>WebP</span>
          <span className={styles.formatPill}>PNG</span>
          <span className={styles.formatPill}>JPG</span>
          <span className={styles.formatPill}>AVIF</span>
          <span className={styles.formatPill}>ICO</span>
          <span className={styles.formatPill}>ZIP Export</span>
        </div>
      </div>

      {/* Footer Info & Direct Redirect Link */}
      <div className={styles.footerBar}>
        <div className={styles.privacyHint}>
          <IconShield size={15} />
          <span>100% In-Browser &bull; Original Quality &bull; Unlimited</span>
        </div>

        <Link href="/tools/bulk-image-converter/" className={styles.redirectLink}>
          <span>Launch Bulk Converter</span>
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
