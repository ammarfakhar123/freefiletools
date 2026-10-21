'use client';

import React, { useState } from 'react';
import styles from './ImageToPdf.module.css';
import { DropZone } from '@/components/ui/DropZone';
import {
  IconDownload,
  IconRefresh,
  IconShield,
  IconUp,
  IconDown,
  IconTrash,
} from '@/components/icons';

interface UploadedImageItem {
  id: string;
  file: File;
  previewUrl: string;
  name: string;
}

type PageSizeOption = 'fit' | 'a4' | 'a4-landscape' | 'letter';
type MarginOption = 'none' | 'small' | 'normal';

export function ImageToPdf() {
  const [images, setImages] = useState<UploadedImageItem[]>([]);
  const [pageSize, setPageSize] = useState<PageSizeOption>('fit');
  const [margin, setMargin] = useState<MarginOption>('small');
  const [isCompiling, setIsCompiling] = useState(false);
  const [compiledPdfUrl, setCompiledPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = (newFiles: File[]) => {
    setError(null);
    const newItems: UploadedImageItem[] = newFiles.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      file,
      previewUrl: URL.createObjectURL(file),
      name: file.name,
    }));
    setImages((prev) => [...prev, ...newItems]);
    setCompiledPdfUrl(null);
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;
    const updated = [...images];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setImages(updated);
    setCompiledPdfUrl(null);
  };

  const removeItem = (index: number) => {
    URL.revokeObjectURL(images[index].previewUrl);
    setImages((prev) => prev.filter((_, i) => i !== index));
    setCompiledPdfUrl(null);
  };

  const convertImageToStandardFormat = async (
    file: File
  ): Promise<{ bytes: Uint8Array; isPng: boolean }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context unavailable'));
          return;
        }

        const isPng = file.type === 'image/png';
        if (!isPng) {
          // Fill background white for JPEGs
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, img.width, img.height);
        }
        ctx.drawImage(img, 0, 0);

        const mime = isPng ? 'image/png' : 'image/jpeg';
        canvas.toBlob(
          async (blob) => {
            if (!blob) {
              reject(new Error('Blob generation failed'));
              return;
            }
            const arrayBuffer = await blob.arrayBuffer();
            resolve({ bytes: new Uint8Array(arrayBuffer), isPng });
          },
          mime,
          0.92
        );
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error(`Failed to load image: ${file.name}`));
      };
      img.src = url;
    });
  };

  const compilePdf = async () => {
    if (images.length === 0) return;
    setIsCompiling(true);
    setError(null);

    try {
      const { PDFDocument, PageSizes } = await import('pdf-lib');
      const pdfDoc = await PDFDocument.create();

      let marginPoints = 0;
      if (margin === 'small') marginPoints = 28.35; // 10mm ~ 28pt
      if (margin === 'normal') marginPoints = 56.7; // 20mm ~ 56pt

      for (const item of images) {
        const { bytes, isPng } = await convertImageToStandardFormat(item.file);
        const embeddedImage = isPng
          ? await pdfDoc.embedPng(bytes)
          : await pdfDoc.embedJpg(bytes);

        const imgWidth = embeddedImage.width;
        const imgHeight = embeddedImage.height;

        let pageWidth = imgWidth;
        let pageHeight = imgHeight;

        if (pageSize === 'a4') {
          pageWidth = PageSizes.A4[0];
          pageHeight = PageSizes.A4[1];
        } else if (pageSize === 'a4-landscape') {
          pageWidth = PageSizes.A4[1];
          pageHeight = PageSizes.A4[0];
        } else if (pageSize === 'letter') {
          pageWidth = PageSizes.Letter[0];
          pageHeight = PageSizes.Letter[1];
        } else {
          // Fit to image
          pageWidth = imgWidth + marginPoints * 2;
          pageHeight = imgHeight + marginPoints * 2;
        }

        const page = pdfDoc.addPage([pageWidth, pageHeight]);
        const availWidth = pageWidth - marginPoints * 2;
        const availHeight = pageHeight - marginPoints * 2;

        const scaleFactor = Math.min(availWidth / imgWidth, availHeight / imgHeight);
        const drawWidth = imgWidth * scaleFactor;
        const drawHeight = imgHeight * scaleFactor;

        const xPos = marginPoints + (availWidth - drawWidth) / 2;
        const yPos = marginPoints + (availHeight - drawHeight) / 2;

        page.drawImage(embeddedImage, {
          x: xPos,
          y: yPos,
          width: drawWidth,
          height: drawHeight,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setCompiledPdfUrl(url);
    } catch (err: unknown) {
      console.error('Image to PDF compilation error:', err);
      setError(err instanceof Error ? err.message : 'Compilation failed.');
    } finally {
      setIsCompiling(false);
    }
  };

  const handleDownload = () => {
    if (!compiledPdfUrl) return;
    const link = document.createElement('a');
    link.href = compiledPdfUrl;
    link.download = `images-compiled-${images.length}-pages.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    if (compiledPdfUrl) URL.revokeObjectURL(compiledPdfUrl);
    setImages([]);
    setCompiledPdfUrl(null);
    setError(null);
  };

  return (
    <div className={styles.wrapper}>
      {/* Configuration bar */}
      <div className={styles.settingsBar}>
        <div className={styles.settingItem}>
          <label htmlFor="pageSizeSelect" className={styles.settingLabel}>Page Format</label>
          <select
            id="pageSizeSelect"
            value={pageSize}
            onChange={(e) => {
              setPageSize(e.target.value as PageSizeOption);
              setCompiledPdfUrl(null);
            }}
            className={styles.selectInput}
          >
            <option value="fit">Fit to Image Size</option>
            <option value="a4">ISO A4 Portrait</option>
            <option value="a4-landscape">ISO A4 Landscape</option>
            <option value="letter">US Letter</option>
          </select>
        </div>

        <div className={styles.settingItem}>
          <label htmlFor="marginSelect" className={styles.settingLabel}>Margin Padding</label>
          <select
            id="marginSelect"
            value={margin}
            onChange={(e) => {
              setMargin(e.target.value as MarginOption);
              setCompiledPdfUrl(null);
            }}
            className={styles.selectInput}
          >
            <option value="none">No Margins (Edge-to-Edge)</option>
            <option value="small">Small Margins (10mm)</option>
            <option value="normal">Normal Margins (20mm)</option>
          </select>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'flex-end' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {images.length} {images.length === 1 ? 'Page' : 'Pages'} Added
          </span>
        </div>
      </div>

      {/* Upload Zone */}
      <DropZone
        onFilesSelected={handleFilesSelected}
        acceptedFileTypes={['image/png', 'image/jpeg', 'image/webp']}
        acceptedDescription="Drop multiple JPG, PNG, or WebP photos to merge"
        multiple={true}
        maxSizeMB={25}
        label={images.length > 0 ? 'Click or drop more images to append' : 'Select or drop images to merge into PDF'}
      />

      {/* Thumbnails reorder grid */}
      {images.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <div className={styles.thumbnailsGrid}>
            {images.map((item, index) => (
              <div key={item.id} className={styles.thumbnailCard}>
                <span className={styles.pageNumberBadge}>#{index + 1}</span>
                <img src={item.previewUrl} alt={item.name} className={styles.imagePreview} />
                <div className={styles.cardFooter}>
                  <span className={styles.cardName} title={item.name}>
                    {item.name}
                  </span>
                  <div className={styles.cardButtons}>
                    <button
                      type="button"
                      onClick={() => moveItem(index, 'up')}
                      disabled={index === 0}
                      className={styles.smallIconButton}
                      title="Move Earlier"
                      aria-label="Move earlier"
                    >
                      <IconUp size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveItem(index, 'down')}
                      disabled={index === images.length - 1}
                      className={styles.smallIconButton}
                      title="Move Later"
                      aria-label="Move later"
                    >
                      <IconDown size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className={styles.smallIconButton}
                      title="Remove Image"
                      aria-label="Remove image"
                    >
                      <IconTrash size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.actionsBar}>
            {!compiledPdfUrl ? (
              <button
                type="button"
                onClick={compilePdf}
                disabled={isCompiling || images.length === 0}
                aria-label="Generate consolidated PDF"
              >
                {isCompiling ? 'Compiling PDF...' : `Generate PDF (${images.length} Pages)`}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleDownload}
                aria-label="Download generated PDF"
              >
                <IconDownload size={20} />
                Download Consolidated PDF
              </button>
            )}

            <button
              type="button"
              onClick={handleReset}
              className="secondary"
              aria-label="Clear all pages"
            >
              <IconRefresh size={18} />
              Reset All Pages
            </button>
          </div>
        </div>
      )}

      {error && (
        <p style={{ color: 'var(--status-error)', marginTop: '1rem', fontSize: '0.875rem' }}>
          {error}
        </p>
      )}

      <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        <IconShield size={16} style={{ display: 'inline', verticalAlign: 'text-bottom' }} />{' '}
        Compiled locally using client-side WebAssembly. No photos are uploaded to any server.
      </div>
    </div>
  );
}
