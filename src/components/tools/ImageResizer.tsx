'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './ImageResizer.module.css';
import { DropZone } from '@/components/ui/DropZone';
import { IconDownload, IconRefresh, IconShield, IconCheck } from '@/components/icons';

type ResizeMode = 'dimensions' | 'percentage' | 'presets';
type FitMode = 'exact' | 'contain' | 'cover';
type OutputFormat = 'original' | 'image/jpeg' | 'image/png' | 'image/webp';

interface Preset {
  id: string;
  name: string;
  category: string;
  width: number;
  height: number;
}

const PRESETS: Preset[] = [
  { id: 'ig-square', name: 'Instagram Square', category: 'Social', width: 1080, height: 1080 },
  { id: 'ig-story', name: 'Instagram Story/Reel', category: 'Social', width: 1080, height: 1920 },
  { id: 'yt-thumb', name: 'YouTube Thumbnail', category: 'Social', width: 1280, height: 720 },
  { id: 'x-header', name: 'Twitter / X Header', category: 'Social', width: 1500, height: 500 },
  { id: 'fb-cover', name: 'Facebook Cover', category: 'Social', width: 820, height: 312 },
  { id: 'fhd', name: 'Full HD 1080p', category: 'Standard', width: 1920, height: 1080 },
  { id: '4k', name: '4K Ultra HD', category: 'Standard', width: 3840, height: 2160 },
  { id: 'passport', name: 'Passport / ID Photo', category: 'Standard', width: 600, height: 600 },
];

export function ImageResizer() {
  const [status, setStatus] = useState<'idle' | 'ready'>('idle');
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [filename, setFilename] = useState<string>('');
  const [originalMime, setOriginalMime] = useState<string>('image/png');

  const [origWidth, setOrigWidth] = useState<number>(0);
  const [origHeight, setOrigHeight] = useState<number>(0);

  const [mode, setMode] = useState<ResizeMode>('dimensions');
  const [targetWidth, setTargetWidth] = useState<number>(0);
  const [targetHeight, setTargetHeight] = useState<number>(0);
  const [lockAspect, setLockAspect] = useState<boolean>(true);
  const [percentage, setPercentage] = useState<number>(100);
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const [fitMode, setFitMode] = useState<FitMode>('exact');

  const [outputFormat, setOutputFormat] = useState<OutputFormat>('original');
  const [quality, setQuality] = useState<number>(92);
  const [estimatedSizeKb, setEstimatedSizeKb] = useState<number>(0);

  const sourceImgRef = useRef<HTMLImageElement | null>(null);

  // Stepped downsampling algorithm for high-quality resizing without pixel breakage
  const renderResizedCanvas = useCallback(
    (
      img: HTMLImageElement,
      tw: number,
      th: number,
      fit: FitMode
    ): HTMLCanvasElement => {
      const sw = img.naturalWidth || img.width;
      const sh = img.naturalHeight || img.height;

      // Handle Fit Modes (exact, contain, cover)
      let drawW = tw;
      let drawH = th;
      let offsetX = 0;
      let offsetY = 0;

      if (fit === 'contain') {
        const aspectImg = sw / sh;
        const aspectTarget = tw / th;
        if (aspectImg > aspectTarget) {
          drawW = tw;
          drawH = Math.round(tw / aspectImg);
          offsetY = Math.round((th - drawH) / 2);
        } else {
          drawH = th;
          drawW = Math.round(th * aspectImg);
          offsetX = Math.round((tw - drawW) / 2);
        }
      } else if (fit === 'cover') {
        const aspectImg = sw / sh;
        const aspectTarget = tw / th;
        if (aspectImg > aspectTarget) {
          drawH = th;
          drawW = Math.round(th * aspectImg);
          offsetX = Math.round((tw - drawW) / 2);
        } else {
          drawW = tw;
          drawH = Math.round(tw / aspectImg);
          offsetY = Math.round((th - drawH) / 2);
        }
      }

      // Step-down downsampling if downsizing by more than 2x to avoid aliasing and pixel breakage
      let currentCanvas: HTMLCanvasElement = document.createElement('canvas');
      currentCanvas.width = sw;
      currentCanvas.height = sh;
      let currentCtx = currentCanvas.getContext('2d');
      if (currentCtx) {
        currentCtx.drawImage(img, 0, 0);
      }

      let curW = sw;
      let curH = sh;

      // Half-stepping down until approaching target dimensions
      while (curW / 2 > drawW && curH / 2 > drawH) {
        const nextCanvas = document.createElement('canvas');
        nextCanvas.width = Math.round(curW / 2);
        nextCanvas.height = Math.round(curH / 2);
        const nextCtx = nextCanvas.getContext('2d');
        if (nextCtx) {
          nextCtx.imageSmoothingEnabled = true;
          nextCtx.imageSmoothingQuality = 'high';
          nextCtx.drawImage(currentCanvas, 0, 0, nextCanvas.width, nextCanvas.height);
        }
        currentCanvas = nextCanvas;
        curW = nextCanvas.width;
        curH = nextCanvas.height;
      }

      // Final target canvas
      const targetCanvas = document.createElement('canvas');
      targetCanvas.width = tw;
      targetCanvas.height = th;
      const targetCtx = targetCanvas.getContext('2d');
      if (targetCtx) {
        targetCtx.imageSmoothingEnabled = true;
        targetCtx.imageSmoothingQuality = 'high';

        if (fit === 'contain') {
          targetCtx.fillStyle = '#ffffff';
          targetCtx.fillRect(0, 0, tw, th);
        }

        targetCtx.drawImage(currentCanvas, 0, 0, curW, curH, offsetX, offsetY, drawW, drawH);
      }

      return targetCanvas;
    },
    []
  );

  // Generate preview when parameters change
  useEffect(() => {
    if (!sourceImgRef.current || targetWidth <= 0 || targetHeight <= 0) return;

    const canvas = renderResizedCanvas(
      sourceImgRef.current,
      targetWidth,
      targetHeight,
      fitMode
    );

    const mime = outputFormat === 'original' ? originalMime : outputFormat;
    const q = mime === 'image/png' ? undefined : quality / 100;

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        setEstimatedSizeKb(Math.round(blob.size / 1024));
        const url = URL.createObjectURL(blob);
        setPreviewUrl((prev) => {
          if (prev && prev.startsWith('blob:')) URL.revokeObjectURL(prev);
          return url;
        });
      },
      mime,
      q
    );
  }, [
    targetWidth,
    targetHeight,
    fitMode,
    outputFormat,
    quality,
    originalMime,
    renderResizedCanvas,
  ]);

  // Handle image upload
  const handleFilesSelected = (files: File[]) => {
    if (!files.length) return;
    const file = files[0];
    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      sourceImgRef.current = img;
      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;

      setOrigWidth(w);
      setOrigHeight(h);
      setTargetWidth(w);
      setTargetHeight(h);
      setPercentage(100);
      setOriginalMime(file.type || 'image/png');
      setFilename(file.name.replace(/\.[^/.]+$/, ''));
      setOriginalUrl(url);
      setStatus('ready');
    };

    img.src = url;
  };

  // Width input change
  const handleWidthChange = (val: number) => {
    const w = Math.max(1, Math.min(val, 16000));
    setTargetWidth(w);
    if (lockAspect && origWidth > 0 && origHeight > 0) {
      const h = Math.round((w / origWidth) * origHeight);
      setTargetHeight(h);
    }
  };

  // Height input change
  const handleHeightChange = (val: number) => {
    const h = Math.max(1, Math.min(val, 16000));
    setTargetHeight(h);
    if (lockAspect && origWidth > 0 && origHeight > 0) {
      const w = Math.round((h / origHeight) * origWidth);
      setTargetWidth(w);
    }
  };

  // Percentage change
  const handlePercentageChange = (pct: number) => {
    setPercentage(pct);
    if (origWidth > 0 && origHeight > 0) {
      const w = Math.round((origWidth * pct) / 100);
      const h = Math.round((origHeight * pct) / 100);
      setTargetWidth(w);
      setTargetHeight(h);
    }
  };

  // Preset selection
  const handlePresetSelect = (preset: Preset) => {
    setSelectedPreset(preset.id);
    setTargetWidth(preset.width);
    setTargetHeight(preset.height);
    setLockAspect(false);
  };

  // Download resized image
  const handleDownload = () => {
    if (!sourceImgRef.current || targetWidth <= 0 || targetHeight <= 0) return;

    const canvas = renderResizedCanvas(
      sourceImgRef.current,
      targetWidth,
      targetHeight,
      fitMode
    );

    const mime = outputFormat === 'original' ? originalMime : outputFormat;
    const q = mime === 'image/png' ? undefined : quality / 100;

    let ext = 'png';
    if (mime === 'image/jpeg') ext = 'jpg';
    if (mime === 'image/webp') ext = 'webp';

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${filename || 'image'}-resized-${targetWidth}x${targetHeight}.${ext}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      },
      mime,
      q
    );
  };

  const handleReset = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setStatus('idle');
    setOriginalUrl('');
    setPreviewUrl('');
    setOrigWidth(0);
    setOrigHeight(0);
    setTargetWidth(0);
    setTargetHeight(0);
    setPercentage(100);
    setSelectedPreset('');
  };

  return (
    <div className={styles.wrapper}>
      {status === 'idle' && (
        <DropZone
          onFilesSelected={handleFilesSelected}
          acceptedFileTypes={['image/png', 'image/jpeg', 'image/webp', 'image/bmp']}
          acceptedDescription="Drop your PNG, JPG, or WebP photo to resize without quality loss"
          maxSizeMB={50}
          label="Select or drop photo to resize"
        />
      )}

      {status === 'ready' && (
        <div>
          {/* Top Bar Dimensions Summary */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span className={styles.dimensionsBadge}>
              <IconCheck size={16} />
              Original: {origWidth} &times; {origHeight} px &bull; Resized: {targetWidth} &times; {targetHeight} px
            </span>

            {/* Mode Tabs */}
            <div className={styles.modeTabs}>
              <button
                type="button"
                className={`${styles.modeTab} ${mode === 'dimensions' ? styles.modeTabActive : ''}`}
                onClick={() => setMode('dimensions')}
              >
                Exact Dimensions (px)
              </button>
              <button
                type="button"
                className={`${styles.modeTab} ${mode === 'percentage' ? styles.modeTabActive : ''}`}
                onClick={() => setMode('percentage')}
              >
                Percentage Scale (%)
              </button>
              <button
                type="button"
                className={`${styles.modeTab} ${mode === 'presets' ? styles.modeTabActive : ''}`}
                onClick={() => setMode('presets')}
              >
                Social & Standard Presets
              </button>
            </div>
          </div>

          {/* Primary Controls Card */}
          <div className={styles.controlCard}>
            {mode === 'dimensions' && (
              <div className={styles.dimensionInputsGrid}>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Width (px):</label>
                  <input
                    type="number"
                    value={targetWidth}
                    onChange={(e) => handleWidthChange(Number(e.target.value))}
                    className={styles.numInput}
                    min={1}
                    max={16000}
                  />
                </div>

                <button
                  type="button"
                  className={`${styles.lockButton} ${lockAspect ? styles.lockButtonActive : ''}`}
                  onClick={() => setLockAspect(!lockAspect)}
                  title={lockAspect ? 'Aspect Ratio Locked' : 'Aspect Ratio Unlocked'}
                  aria-label="Toggle Aspect Ratio Lock"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {lockAspect ? (
                      <>
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </>
                    ) : (
                      <>
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                      </>
                    )}
                  </svg>
                </button>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Height (px):</label>
                  <input
                    type="number"
                    value={targetHeight}
                    onChange={(e) => handleHeightChange(Number(e.target.value))}
                    className={styles.numInput}
                    min={1}
                    max={16000}
                  />
                </div>

                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
                  {lockAspect ? 'Ratio Locked' : 'Free Scale'}
                </div>
              </div>
            )}

            {mode === 'percentage' && (
              <div>
                <div className={styles.percentPills}>
                  {[25, 50, 75, 125, 150, 200].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      className={`${styles.percentPill} ${percentage === pct ? styles.percentPillActive : ''}`}
                      onClick={() => handlePercentageChange(pct)}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', maxWidth: '450px' }}>
                  <input
                    type="range"
                    min="10"
                    max="400"
                    value={percentage}
                    onChange={(e) => handlePercentageChange(Number(e.target.value))}
                    style={{ flex: 1, accentColor: 'var(--brand-blue)' }}
                  />
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, minWidth: '55px' }}>{percentage}%</span>
                </div>
              </div>
            )}

            {mode === 'presets' && (
              <div className={styles.presetsGrid}>
                {PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`${styles.presetCard} ${selectedPreset === p.id ? styles.presetCardActive : ''}`}
                    onClick={() => handlePresetSelect(p)}
                  >
                    <span className={styles.presetTitle}>{p.name}</span>
                    <span className={styles.presetDim}>{p.width} &times; {p.height} px</span>
                  </button>
                ))}
              </div>
            )}

            {/* Secondary Options: Fit Mode, Format, Quality */}
            <div className={styles.secondaryOptionsGrid}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Fit Behavior:</label>
                <select
                  value={fitMode}
                  onChange={(e) => setFitMode(e.target.value as FitMode)}
                  className={styles.numInput}
                >
                  <option value="exact">Exact (Scale to fill dimensions)</option>
                  <option value="contain">Contain (Fit inside with padding)</option>
                  <option value="cover">Cover (Center Crop to fill)</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Output Format:</label>
                <select
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value as OutputFormat)}
                  className={styles.numInput}
                >
                  <option value="original">Keep Original Format</option>
                  <option value="image/jpeg">JPG / JPEG (Compact)</option>
                  <option value="image/png">PNG (Lossless & Crisp)</option>
                  <option value="image/webp">WebP (Modern High-Efficiency)</option>
                </select>
              </div>

              {(outputFormat === 'image/jpeg' || outputFormat === 'image/webp') && (
                <div className={styles.inputGroup}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600 }}>
                    <span>Export Quality:</span>
                    <span>{quality}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--brand-blue)', marginTop: '0.4rem' }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Live Preview Box */}
          <div className={styles.previewBox}>
            <div className={styles.previewImgWrap}>
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Resized Preview"
                  className={styles.previewImg}
                />
              )}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Target Output: <strong>{targetWidth} &times; {targetHeight} px</strong>
              {estimatedSizeKb > 0 && <span> &bull; Est. File Size: ~{estimatedSizeKb} KB</span>}
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionsBar}>
            <button
              type="button"
              onClick={handleDownload}
              className={styles.downloadButton}
              aria-label="Download Resized Image"
            >
              <IconDownload size={20} />
              <span>Download Resized Image ({targetWidth} &times; {targetHeight})</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className={styles.resetButton}
              aria-label="Resize Another Image"
            >
              <IconRefresh size={18} />
              <span>Resize Another Image</span>
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <span className={styles.noticePill}>
              <IconShield size={16} />
              High-DPI Multi-Step Bicubic Resampling &bull; Pixels stay crisp without distortion.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
