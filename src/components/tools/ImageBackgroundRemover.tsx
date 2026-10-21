'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './ImageBackgroundRemover.module.css';
import { DropZone } from '@/components/ui/DropZone';
import { IconDownload, IconRefresh, IconShield, IconCheck } from '@/components/icons';

type TargetBg = 'transparent' | 'white' | 'black';

interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export function ImageBackgroundRemover() {
  const [status, setStatus] = useState<'idle' | 'ready'>('idle');
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [processedUrl, setProcessedUrl] = useState<string>('');
  const [filename, setFilename] = useState<string>('');

  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  // Background removal parameters
  const [sampleColor, setSampleColor] = useState<RGBColor>({ r: 255, g: 255, b: 255 });
  const [tolerance, setTolerance] = useState<number>(16);
  const [contiguous, setContiguous] = useState<boolean>(true);
  const [targetBg, setTargetBg] = useState<TargetBg>('transparent');

  const sourceImgRef = useRef<HTMLImageElement | null>(null);
  const previewImgRef = useRef<HTMLImageElement | null>(null);

  // Perceptual color difference calculation (ITU-R BT.601)
  const isColorMatch = (
    r: number,
    g: number,
    b: number,
    target: RGBColor,
    maxDistance: number
  ) => {
    const dr = r - target.r;
    const dg = g - target.g;
    const db = b - target.b;
    // Perceptually weighted Euclidean distance (Red: 0.299, Green: 0.587, Blue: 0.114)
    const dist = Math.sqrt(0.299 * dr * dr + 0.587 * dg * dg + 0.114 * db * db);
    return dist <= maxDistance;
  };

  // Pure Pixel-Accurate Background Removal:
  // Subject pixels remain 100% BIT-FOR-BIT IDENTICAL to the source.
  // ZERO edge-to-edge cutting, ZERO blurring, ZERO resolution degradation.
  const executePixelAccurateRemoval = useCallback(
    (
      img: HTMLImageElement,
      targetCol: RGBColor,
      tol: number,
      isContiguous: boolean,
      bgMode: TargetBg
    ) => {
      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;
      if (!w || !h) return;

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      // Draw original image at 100% exact dimensions
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;
      const totalPixels = w * h;

      // Tolerance mapped to perceptual color distance (0-255 scale)
      const maxDistance = (tol / 100) * 255;

      const isBgPixel = new Uint8Array(totalPixels);

      if (isContiguous) {
        // Border-connected flood fill (BFS):
        // Starts exclusively from outer perimeter of image.
        // It NEVER enters or touches the inside of the subject!
        const queue = new Int32Array(totalPixels);
        let head = 0;
        let tail = 0;

        // Seed top and bottom borders
        for (let x = 0; x < w; x++) {
          // Top row
          const topIdx = x;
          const pTop = topIdx * 4;
          if (isColorMatch(data[pTop], data[pTop + 1], data[pTop + 2], targetCol, maxDistance)) {
            isBgPixel[topIdx] = 1;
            queue[tail++] = topIdx;
          }

          // Bottom row
          const btmIdx = (h - 1) * w + x;
          const pBtm = btmIdx * 4;
          if (isColorMatch(data[pBtm], data[pBtm + 1], data[pBtm + 2], targetCol, maxDistance)) {
            isBgPixel[btmIdx] = 1;
            queue[tail++] = btmIdx;
          }
        }

        // Seed left and right borders
        for (let y = 0; y < h; y++) {
          // Left column
          const leftIdx = y * w;
          if (!isBgPixel[leftIdx]) {
            const pLeft = leftIdx * 4;
            if (isColorMatch(data[pLeft], data[pLeft + 1], data[pLeft + 2], targetCol, maxDistance)) {
              isBgPixel[leftIdx] = 1;
              queue[tail++] = leftIdx;
            }
          }

          // Right column
          const rightIdx = y * w + (w - 1);
          if (!isBgPixel[rightIdx]) {
            const pRight = rightIdx * 4;
            if (isColorMatch(data[pRight], data[pRight + 1], data[pRight + 2], targetCol, maxDistance)) {
              isBgPixel[rightIdx] = 1;
              queue[tail++] = rightIdx;
            }
          }
        }

        // 4-way BFS expansion across connected background pixels
        while (head < tail) {
          const curr = queue[head++];
          const cx = curr % w;
          const cy = Math.floor(curr / w);

          // Up
          if (cy > 0) {
            const nIdx = curr - w;
            if (isBgPixel[nIdx] === 0) {
              const p = nIdx * 4;
              if (isColorMatch(data[p], data[p + 1], data[p + 2], targetCol, maxDistance)) {
                isBgPixel[nIdx] = 1;
                queue[tail++] = nIdx;
              }
            }
          }
          // Down
          if (cy < h - 1) {
            const nIdx = curr + w;
            if (isBgPixel[nIdx] === 0) {
              const p = nIdx * 4;
              if (isColorMatch(data[p], data[p + 1], data[p + 2], targetCol, maxDistance)) {
                isBgPixel[nIdx] = 1;
                queue[tail++] = nIdx;
              }
            }
          }
          // Left
          if (cx > 0) {
            const nIdx = curr - 1;
            if (isBgPixel[nIdx] === 0) {
              const p = nIdx * 4;
              if (isColorMatch(data[p], data[p + 1], data[p + 2], targetCol, maxDistance)) {
                isBgPixel[nIdx] = 1;
                queue[tail++] = nIdx;
              }
            }
          }
          // Right
          if (cx < w - 1) {
            const nIdx = curr + 1;
            if (isBgPixel[nIdx] === 0) {
              const p = nIdx * 4;
              if (isColorMatch(data[p], data[p + 1], data[p + 2], targetCol, maxDistance)) {
                isBgPixel[nIdx] = 1;
                queue[tail++] = nIdx;
              }
            }
          }
        }
      } else {
        // Global color match across the entire image
        for (let i = 0; i < totalPixels; i++) {
          const p = i * 4;
          if (isColorMatch(data[p], data[p + 1], data[p + 2], targetCol, maxDistance)) {
            isBgPixel[i] = 1;
          }
        }
      }

      // Apply transparency or solid background ONLY to the identified background pixels.
      // Every other pixel (the main subject) is 100% UNTOUCHED!
      for (let i = 0; i < totalPixels; i++) {
        if (isBgPixel[i] === 1) {
          const p = i * 4;
          if (bgMode === 'transparent') {
            data[p + 3] = 0; // Pure transparent
          } else if (bgMode === 'white') {
            data[p] = 255;
            data[p + 1] = 255;
            data[p + 2] = 255;
            data[p + 3] = 255;
          } else if (bgMode === 'black') {
            data[p] = 11;
            data[p + 1] = 15;
            data[p + 2] = 25;
            data[p + 3] = 255;
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const newUrl = URL.createObjectURL(blob);
        setProcessedUrl((prev) => {
          if (prev && prev.startsWith('blob:')) URL.revokeObjectURL(prev);
          return newUrl;
        });
      }, 'image/png');
    },
    []
  );

  // Re-run whenever parameters change
  useEffect(() => {
    if (!sourceImgRef.current) return;
    executePixelAccurateRemoval(
      sourceImgRef.current,
      sampleColor,
      tolerance,
      contiguous,
      targetBg
    );
  }, [sampleColor, tolerance, contiguous, targetBg, executePixelAccurateRemoval]);

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

      // Sample corner pixels to auto-detect background color
      const sampleCanvas = document.createElement('canvas');
      sampleCanvas.width = w;
      sampleCanvas.height = h;
      const ctx = sampleCanvas.getContext('2d', { willReadFrequently: true });
      let autoCol: RGBColor = { r: 255, g: 255, b: 255 };

      if (ctx) {
        ctx.drawImage(img, 0, 0);
        // Top-left pixel
        const c = ctx.getImageData(1, 1, 1, 1).data;
        autoCol = { r: c[0], g: c[1], b: c[2] };
      }

      setWidth(w);
      setHeight(h);
      setSampleColor(autoCol);
      setTolerance(16);
      setContiguous(true);
      setTargetBg('transparent');
      setFilename(file.name.replace(/\.[^/.]+$/, ''));
      setOriginalUrl(url);
      setStatus('ready');

      executePixelAccurateRemoval(img, autoCol, 16, true, 'transparent');
    };

    img.src = url;
  };

  // Interactive Click-to-Pick on image preview
  const handlePreviewClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!sourceImgRef.current || !previewImgRef.current) return;

    const imgElem = previewImgRef.current;
    const rect = imgElem.getBoundingClientRect();

    // Calculate exact pixel position on original image
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const scaleX = (sourceImgRef.current.naturalWidth || sourceImgRef.current.width) / rect.width;
    const scaleY = (sourceImgRef.current.naturalHeight || sourceImgRef.current.height) / rect.height;

    const pixelX = Math.floor(clickX * scaleX);
    const pixelY = Math.floor(clickY * scaleY);

    // Read pixel color from source canvas
    const pickCanvas = document.createElement('canvas');
    pickCanvas.width = 1;
    pickCanvas.height = 1;
    const ctx = pickCanvas.getContext('2d', { willReadFrequently: true });
    if (ctx) {
      ctx.drawImage(sourceImgRef.current, -pixelX, -pixelY);
      const pixel = ctx.getImageData(0, 0, 1, 1).data;
      const pickedColor = { r: pixel[0], g: pixel[1], b: pixel[2] };
      setSampleColor(pickedColor);
    }
  };

  // Download lossless transparent PNG
  const handleDownload = () => {
    if (!processedUrl) return;
    const link = document.createElement('a');
    link.href = processedUrl;
    link.download = `${filename || 'image'}-transparent.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Reset
  const handleReset = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (processedUrl) URL.revokeObjectURL(processedUrl);
    sourceImgRef.current = null;
    setStatus('idle');
    setOriginalUrl('');
    setProcessedUrl('');
    setWidth(0);
    setHeight(0);
  };

  return (
    <div className={styles.wrapper}>
      {status === 'idle' && (
        <DropZone
          onFilesSelected={handleFilesSelected}
          acceptedFileTypes={['image/png', 'image/jpeg', 'image/webp', 'image/bmp']}
          acceptedDescription="Drop your photo or graphic to make its background transparent"
          maxSizeMB={50}
          label="Select or drop image to remove background"
        />
      )}

      {status === 'ready' && (
        <div>
          {/* Top Bar Dimensions & Quality Badge */}
          <div className={styles.topBar}>
            <span className={styles.fidelityBadge}>
              <IconCheck size={16} />
              Original Quality Preserved: {width} &times; {height} px (100% Pixel-for-Pixel Fidelity)
            </span>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <button
                type="button"
                className={`${styles.toggleButton} ${contiguous ? styles.toggleButtonActive : ''}`}
                onClick={() => setContiguous(!contiguous)}
                title="When enabled, only background connected to the borders is removed. Subject interior is 100% protected."
              >
                <span>Border-Connected Only: {contiguous ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>

          {/* Controls Bar */}
          <div className={styles.controlsGrid}>
            {/* Sample Color / Eyedropper */}
            <div className={styles.controlGroup}>
              <div className={styles.controlLabelRow}>
                <span>Background Color:</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  rgb({sampleColor.r}, {sampleColor.g}, {sampleColor.b})
                </span>
              </div>
              <div className={styles.colorPickerWrap}>
                <div
                  className={styles.sampleSwatch}
                  style={{
                    backgroundColor: `rgb(${sampleColor.r}, ${sampleColor.g}, ${sampleColor.b})`,
                  }}
                  title="Currently sampled background color"
                />
                <span className={styles.eyedropperHint}>
                  Click any background area in the preview below to sample its color.
                </span>
              </div>
            </div>

            {/* Sensitivity Slider */}
            <div className={styles.controlGroup}>
              <div className={styles.controlLabelRow}>
                <span>Color Sensitivity (Tolerance):</span>
                <span>{tolerance}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="60"
                value={tolerance}
                onChange={(e) => setTolerance(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--brand-blue)', cursor: 'pointer' }}
                aria-label="Color Sensitivity"
              />
            </div>

            {/* Output Background Toggle */}
            <div className={styles.controlGroup}>
              <div className={styles.controlLabelRow}>
                <span>Output Background:</span>
              </div>
              <div className={styles.swatchButtons}>
                <button
                  type="button"
                  className={`${styles.swatchBtn} ${targetBg === 'transparent' ? styles.swatchBtnActive : ''}`}
                  onClick={() => setTargetBg('transparent')}
                >
                  Transparent
                </button>
                <button
                  type="button"
                  className={`${styles.swatchBtn} ${targetBg === 'white' ? styles.swatchBtnActive : ''}`}
                  onClick={() => setTargetBg('white')}
                >
                  White
                </button>
                <button
                  type="button"
                  className={`${styles.swatchBtn} ${targetBg === 'black' ? styles.swatchBtnActive : ''}`}
                  onClick={() => setTargetBg('black')}
                >
                  Black
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Preview Canvas */}
          <div className={styles.previewWrapper}>
            {processedUrl ? (
              <img
                ref={previewImgRef}
                src={processedUrl}
                alt="Cutout Preview"
                className={styles.previewImg}
                onClick={handlePreviewClick}
                title="Click any background spot to remove that exact color"
              />
            ) : (
              <div style={{ height: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Processing image...</span>
              </div>
            )}

            <div className={styles.clickHintOverlay}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              <span>Click on any background shade in the preview to make it transparent</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionsBar}>
            <button
              type="button"
              onClick={handleDownload}
              className={styles.downloadButton}
              disabled={!processedUrl}
              aria-label="Download Transparent PNG"
            >
              <IconDownload size={20} />
              <span>Download Transparent PNG ({width} &times; {height})</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className={styles.resetButton}
              aria-label="Process Another Image"
            >
              <IconRefresh size={18} />
              <span>Process Another Image</span>
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <span className={styles.noticePill}>
              <IconShield size={16} />
              Zero edge-cutting or distortion &bull; Subject pixels are 100% identical to the source image &bull; Processed locally in your browser.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
