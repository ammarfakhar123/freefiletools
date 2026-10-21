'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './ImageBackgroundRemover.module.css';
import { DropZone } from '@/components/ui/DropZone';
import { IconDownload, IconRefresh, IconShield } from '@/components/icons';

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

  // Background removal parameters: sensitivity defaults to 0 as requested
  const [sensitivity, setSensitivity] = useState<number>(0);
  const [sampleColor, setSampleColor] = useState<RGBColor>({ r: 255, g: 255, b: 255 });

  const sourceImgRef = useRef<HTMLImageElement | null>(null);
  const previewImgRef = useRef<HTMLImageElement | null>(null);

  // Perceptually weighted color difference calculation
  const isColorMatch = (
    r: number,
    g: number,
    b: number,
    target: RGBColor,
    maxDistance: number
  ) => {
    if (maxDistance === 0) {
      return r === target.r && g === target.g && b === target.b;
    }
    const dr = r - target.r;
    const dg = g - target.g;
    const db = b - target.b;
    const dist = Math.sqrt(0.299 * dr * dr + 0.587 * dg * dg + 0.114 * db * db);
    return dist <= maxDistance;
  };

  // Pure HD Pixel-Exact Background Eraser:
  // Preserves 100% full original resolution without downsampling.
  // When sensitivity is 0, zero subject pixels are ever touched.
  const executeCleanRemoval = useCallback(
    (
      img: HTMLImageElement,
      targetCol: RGBColor,
      tol: number
    ) => {
      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;
      if (!w || !h) return;

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;
      const totalPixels = w * h;

      const maxDistance = (tol / 100) * 255;
      const isBgPixel = new Uint8Array(totalPixels);

      // Border-connected flood fill (BFS):
      // Starts from the perimeter of the image and preserves all interior subject pixels
      const queue = new Int32Array(totalPixels);
      let head = 0;
      let tail = 0;

      // Seed top and bottom borders
      for (let x = 0; x < w; x++) {
        const topIdx = x;
        const pTop = topIdx * 4;
        if (isColorMatch(data[pTop], data[pTop + 1], data[pTop + 2], targetCol, maxDistance)) {
          isBgPixel[topIdx] = 1;
          queue[tail++] = topIdx;
        }

        const btmIdx = (h - 1) * w + x;
        const pBtm = btmIdx * 4;
        if (isColorMatch(data[pBtm], data[pBtm + 1], data[pBtm + 2], targetCol, maxDistance)) {
          isBgPixel[btmIdx] = 1;
          queue[tail++] = btmIdx;
        }
      }

      // Seed left and right borders
      for (let y = 0; y < h; y++) {
        const leftIdx = y * w;
        if (!isBgPixel[leftIdx]) {
          const pLeft = leftIdx * 4;
          if (isColorMatch(data[pLeft], data[pLeft + 1], data[pLeft + 2], targetCol, maxDistance)) {
            isBgPixel[leftIdx] = 1;
            queue[tail++] = leftIdx;
          }
        }

        const rightIdx = y * w + (w - 1);
        if (!isBgPixel[rightIdx]) {
          const pRight = rightIdx * 4;
          if (isColorMatch(data[pRight], data[pRight + 1], data[pRight + 2], targetCol, maxDistance)) {
            isBgPixel[rightIdx] = 1;
            queue[tail++] = rightIdx;
          }
        }
      }

      // 4-way BFS expansion across connected background
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

      // Apply transparency only to the background
      for (let i = 0; i < totalPixels; i++) {
        if (isBgPixel[i] === 1) {
          data[i * 4 + 3] = 0; // Pure Transparent
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

  useEffect(() => {
    if (!sourceImgRef.current) return;
    executeCleanRemoval(sourceImgRef.current, sampleColor, sensitivity);
  }, [sampleColor, sensitivity, executeCleanRemoval]);

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
        const c = ctx.getImageData(1, 1, 1, 1).data;
        autoCol = { r: c[0], g: c[1], b: c[2] };
      }

      setWidth(w);
      setHeight(h);
      setSampleColor(autoCol);
      setSensitivity(0); // Sensitivity defaults to 0 as requested
      setFilename(file.name.replace(/\.[^/.]+$/, ''));
      setOriginalUrl(url);
      setStatus('ready');

      executeCleanRemoval(img, autoCol, 0);
    };

    img.src = url;
  };

  // Seamless click to pick background on preview
  const handlePreviewClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!sourceImgRef.current || !previewImgRef.current) return;

    const imgElem = previewImgRef.current;
    const rect = imgElem.getBoundingClientRect();

    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const scaleX = (sourceImgRef.current.naturalWidth || sourceImgRef.current.width) / rect.width;
    const scaleY = (sourceImgRef.current.naturalHeight || sourceImgRef.current.height) / rect.height;

    const pixelX = Math.floor(clickX * scaleX);
    const pixelY = Math.floor(clickY * scaleY);

    const pickCanvas = document.createElement('canvas');
    pickCanvas.width = 1;
    pickCanvas.height = 1;
    const ctx = pickCanvas.getContext('2d', { willReadFrequently: true });
    if (ctx) {
      ctx.drawImage(sourceImgRef.current, -pixelX, -pixelY);
      const pixel = ctx.getImageData(0, 0, 1, 1).data;
      setSampleColor({ r: pixel[0], g: pixel[1], b: pixel[2] });
    }
  };

  // Download lossless transparent PNG in HD
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
    setSensitivity(0);
  };

  return (
    <div className={styles.wrapper}>
      {status === 'idle' && (
        <DropZone
          onFilesSelected={handleFilesSelected}
          acceptedFileTypes={['image/png', 'image/jpeg', 'image/webp', 'image/bmp']}
          acceptedDescription="Drop your logo or graphic to make its background transparent in HD"
          maxSizeMB={50}
          label="Select or drop image to remove background"
        />
      )}

      {status === 'ready' && (
        <div>
          {/* Simple Clean Preview Canvas */}
          <div className={styles.previewWrapper}>
            {processedUrl ? (
              <img
                ref={previewImgRef}
                src={processedUrl}
                alt="HD Transparent Background Output"
                className={styles.previewImg}
                onClick={handlePreviewClick}
                title="Click anywhere on the background to make it transparent"
              />
            ) : (
              <div style={{ height: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Processing HD image...</span>
              </div>
            )}
          </div>

          {/* Simple Clean Adjustment Slider: Starts at 0 */}
          <div className={styles.subtleSliderBar}>
            <span className={styles.sliderLabel}>Clean Sensitivity:</span>
            <input
              type="range"
              min="0"
              max="50"
              value={sensitivity}
              onChange={(e) => setSensitivity(Number(e.target.value))}
              className={styles.sliderInput}
              aria-label="Clean Sensitivity"
            />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, minWidth: '35px', textAlign: 'right' }}>
              {sensitivity}%
            </span>
          </div>

          {/* Primary Action Buttons */}
          <div className={styles.actionsBar}>
            <button
              type="button"
              onClick={handleDownload}
              className={styles.downloadButton}
              disabled={!processedUrl}
              aria-label="Download HD Transparent PNG"
            >
              <IconDownload size={20} />
              <span>Download Transparent PNG (HD)</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className={styles.resetButton}
              aria-label="Upload Another Image"
            >
              <IconRefresh size={18} />
              <span>Upload Another Image</span>
            </button>
          </div>

          <div className={styles.privacyNote}>
            <IconShield size={16} />
            <span>HD Original Quality &bull; Pixel-exact logo preservation &bull; 100% private in-browser processing</span>
          </div>
        </div>
      )}
    </div>
  );
}
