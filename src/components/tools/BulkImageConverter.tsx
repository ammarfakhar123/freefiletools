'use client';

import React, { useState, useEffect } from 'react';
import styles from './BulkImageConverter.module.css';
import { DropZone } from '@/components/ui/DropZone';
import { IconDownload, IconRefresh, IconShield, IconTrash } from '@/components/icons';
import JSZip from 'jszip';

interface ConvertedItem {
  id: string;
  originalName: string;
  originalSize: number;
  previewUrl: string;
  blob: Blob | null;
  convertedSize: number;
  status: 'converting' | 'done';
}

type TargetFormat =
  | 'image/webp'
  | 'image/png'
  | 'image/jpeg'
  | 'image/avif'
  | 'image/x-icon'
  | 'image/bmp'
  | 'image/gif';

const FORMAT_OPTIONS: { id: TargetFormat; label: string; ext: string; desc: string }[] = [
  { id: 'image/webp', label: 'WebP', ext: 'webp', desc: 'Next-Gen & 30% Smaller' },
  { id: 'image/png', label: 'PNG', ext: 'png', desc: 'Lossless & Transparent' },
  { id: 'image/jpeg', label: 'JPG / JPEG', ext: 'jpg', desc: 'Universal Photo' },
  { id: 'image/avif', label: 'AVIF', ext: 'avif', desc: 'Modern High Efficiency' },
  { id: 'image/x-icon', label: 'ICO', ext: 'ico', desc: 'Website Favicon' },
  { id: 'image/bmp', label: 'BMP', ext: 'bmp', desc: 'Windows Bitmap' },
  { id: 'image/gif', label: 'GIF', ext: 'gif', desc: 'Standard Image' },
];

export function BulkImageConverter() {
  const [items, setItems] = useState<ConvertedItem[]>([]);
  const [targetFormat, setTargetFormat] = useState<TargetFormat>('image/webp');
  const [quality, setQuality] = useState<number>(0.98); // High-Definition preservation default (98%)
  const [isZipping, setIsZipping] = useState(false);

  const getFormatExtension = (format: TargetFormat) => {
    const found = FORMAT_OPTIONS.find((f) => f.id === format);
    return found ? found.ext : 'webp';
  };

  const convertSingleFile = async (
    file: File,
    format: TargetFormat,
    q: number
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return reject(new Error('Canvas error'));

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        if (format === 'image/jpeg' || format === 'image/bmp') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0);

        if (format === 'image/x-icon') {
          canvas.toBlob(
            (blob) => {
              if (blob) resolve(blob);
              else reject(new Error('ICO conversion failed'));
            },
            'image/png'
          );
          return;
        }

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              // Fallback to webp/png if browser encoder lacks specific codec
              canvas.toBlob((fallbackBlob) => {
                if (fallbackBlob) resolve(fallbackBlob);
                else reject(new Error('Conversion failed'));
              }, 'image/webp', q);
            }
          },
          format,
          q
        );
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Image failed to load'));
      };
      img.src = url;
    });
  };

  const handleFilesSelected = async (newFiles: File[]) => {
    const newItems: ConvertedItem[] = newFiles.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      originalName: file.name,
      originalSize: file.size,
      previewUrl: URL.createObjectURL(file),
      blob: null,
      convertedSize: 0,
      status: 'converting',
    }));

    setItems((prev) => [...prev, ...newItems]);

    // Process all images in parallel in memory
    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
      const itemId = newItems[i].id;
      try {
        const convertedBlob = await convertSingleFile(file, targetFormat, quality);
        setItems((prev) =>
          prev.map((item) => {
            if (item.id === itemId) {
              return {
                ...item,
                blob: convertedBlob,
                convertedSize: convertedBlob.size,
                status: 'done',
              };
            }
            return item;
          })
        );
      } catch (err) {
        console.error('File conversion failed:', file.name, err);
      }
    }
  };

  // Process files passed from the home banner
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).__PENDING_BULK_FILES__) {
      const pending: File[] = (window as any).__PENDING_BULK_FILES__;
      delete (window as any).__PENDING_BULK_FILES__;
      if (pending && pending.length > 0) {
        handleFilesSelected(pending);
      }
    }
  }, []);

  const reprocessAll = async (newFormat: TargetFormat, newQuality: number) => {
    setTargetFormat(newFormat);
    setQuality(newQuality);

    setItems((prev) =>
      prev.map((item) => ({ ...item, status: 'converting' }))
    );

    for (const item of items) {
      const response = await fetch(item.previewUrl);
      const fileBlob = await response.blob();
      const file = new File([fileBlob], item.originalName, { type: fileBlob.type });
      try {
        const convertedBlob = await convertSingleFile(file, newFormat, newQuality);
        setItems((prev) =>
          prev.map((it) => {
            if (it.id === item.id) {
              return {
                ...it,
                blob: convertedBlob,
                convertedSize: convertedBlob.size,
                status: 'done',
              };
            }
            return it;
          })
        );
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleDownloadSingle = (item: ConvertedItem) => {
    if (!item.blob) return;
    const ext = getFormatExtension(targetFormat);
    const baseName = item.originalName.replace(/\.[^/.]+$/, '');
    const url = URL.createObjectURL(item.blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${baseName}.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadZip = async () => {
    if (items.length === 0) return;
    setIsZipping(true);
    const zip = new JSZip();
    const ext = getFormatExtension(targetFormat);

    items.forEach((item) => {
      if (item.blob) {
        const baseName = item.originalName.replace(/\.[^/.]+$/, '');
        zip.file(`${baseName}.${ext}`, item.blob);
      }
    });

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = url;
    link.download = `converted-images-${ext}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsZipping(false);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleReset = () => {
    items.forEach((it) => URL.revokeObjectURL(it.previewUrl));
    setItems([]);
  };

  return (
    <div className={styles.wrapper}>
      {/* Target Format Selector Bar */}
      <div className={styles.controlsBar}>
        <div className={styles.controlItem} style={{ flex: 1 }}>
          <span className={styles.controlLabel}>Convert All Images To:</span>
          <div className={styles.formatButtonGroup} style={{ flexWrap: 'wrap' }}>
            {FORMAT_OPTIONS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`${styles.formatBtn} ${targetFormat === f.id ? styles.active : ''}`}
                onClick={() => reprocessAll(f.id, quality)}
                title={f.desc}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.controlItem}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, gap: '1rem' }}>
            <span className={styles.controlLabel}>Quality</span>
            <span>{Math.round(quality * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.6"
            max="1.0"
            step="0.01"
            value={quality}
            onChange={(e) => reprocessAll(targetFormat, Number(e.target.value))}
            style={{ width: '130px', accentColor: 'var(--brand-blue)', cursor: 'pointer' }}
          />
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {items.length} {items.length === 1 ? 'image' : 'images'}
        </div>
      </div>

      {/* Upload Zone */}
      <DropZone
        onFilesSelected={handleFilesSelected}
        acceptedFileTypes={['image/*']}
        acceptedDescription="Drop any image files: PNG, JPG, JPEG, WebP, AVIF, SVG, BMP, GIF, ICO, TIFF"
        multiple={true}
        maxSizeMB={50}
        label={items.length > 0 ? 'Click or drop more images to append' : 'Select or drop multiple images in any format to bulk convert'}
      />

      {/* Converted Items Grid */}
      {items.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <div className={styles.itemsGrid}>
            {items.map((item) => (
              <div key={item.id} className={styles.itemCard}>
                <img src={item.previewUrl} alt={item.originalName} className={styles.thumbnail} />
                <div style={{ fontSize: '0.85rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '0.25rem' }}>
                  {item.originalName}
                </div>
                <div className={styles.itemMeta}>
                  <span>Original: {(item.originalSize / 1024).toFixed(0)} KB</span>
                  <span style={{ color: 'var(--brand-green)', fontWeight: 700 }}>
                    {item.status === 'done' ? `${(item.convertedSize / 1024).toFixed(0)} KB (${getFormatExtension(targetFormat).toUpperCase()})` : 'Converting...'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', marginTop: 'auto' }}>
                  <button
                    type="button"
                    onClick={() => handleDownloadSingle(item)}
                    disabled={item.status !== 'done'}
                    style={{ flex: 1, padding: '0.35rem 0.5rem', fontSize: '0.75rem' }}
                  >
                    Download .{getFormatExtension(targetFormat)}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="secondary"
                    style={{ padding: '0.35rem', lineHeight: 1 }}
                    title="Remove"
                  >
                    <IconTrash size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.actionsBar}>
            <button
              type="button"
              onClick={handleDownloadZip}
              disabled={isZipping || items.some((it) => it.status !== 'done')}
              style={{ minWidth: '240px' }}
            >
              <IconDownload size={20} />
              {isZipping ? 'Generating ZIP...' : `Download All as ZIP (${items.length} Files)`}
            </button>
            <button type="button" onClick={handleReset} className="secondary">
              <IconRefresh size={18} />
              Clear All
            </button>
          </div>
        </div>
      )}

      <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        <IconShield size={16} style={{ display: 'inline', verticalAlign: 'text-bottom' }} />{' '}
        Fast parallel Canvas encoding. All conversions finish in milliseconds inside your browser.
      </div>
    </div>
  );
}
