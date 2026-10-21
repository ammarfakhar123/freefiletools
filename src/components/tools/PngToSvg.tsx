'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './PngToSvg.module.css';
import { DropZone } from '@/components/ui/DropZone';
import { IconDownload, IconRefresh, IconShield } from '@/components/icons';

interface VectorizerSettings {
  colorCount: number;
  detail: number;
  smoothing: number;
}

export function PngToSvg() {
  const [sourceImage, setSourceImage] = useState<{
    file: File;
    name: string;
    url: string;
    width: number;
    height: number;
  } | null>(null);

  const [settings, setSettings] = useState<VectorizerSettings>({
    colorCount: 4,
    detail: 50,
    smoothing: 40,
  });

  const [svgOutput, setSvgOutput] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFilesSelected = (files: File[]) => {
    if (!files.length) return;
    const file = files[0];
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setSourceImage({
        file,
        name: file.name.replace(/\.[^/.]+$/, ''),
        url,
        width: img.width,
        height: img.height,
      });
    };
    img.src = url;
  };

  const vectorize = useCallback(() => {
    if (!sourceImage) return;
    setIsProcessing(true);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // Scale down image for efficient vector tracing if too large
      const maxDim = 800;
      let w = img.width;
      let h = img.height;
      if (w > maxDim || h > maxDim) {
        if (w > h) {
          h = Math.round((h * maxDim) / w);
          w = maxDim;
        } else {
          w = Math.round((w * maxDim) / h);
          h = maxDim;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsProcessing(false);
        return;
      }

      ctx.drawImage(img, 0, 0, w, h);
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;

      // Color quantization & thresholding
      const colorBins = Math.max(2, Math.min(16, settings.colorCount));
      const step = Math.floor(256 / colorBins);

      // Group pixels by quantized color
      const pathsMap = new Map<string, string[]>();

      // Sample step based on detail (higher detail = smaller step)
      const sampleStep = Math.max(1, Math.round(5 - (settings.detail / 100) * 4));
      const smoothingFactor = settings.smoothing / 100;

      for (let y = 0; y < h; y += sampleStep) {
        for (let x = 0; x < w; x += sampleStep) {
          const idx = (y * w + x) * 4;
          const a = data[idx + 3];
          if (a < 32) continue; // Skip transparent pixels

          // Quantize RGB
          const r = Math.min(255, Math.floor(data[idx] / step) * step + Math.floor(step / 2));
          const g = Math.min(255, Math.floor(data[idx + 1] / step) * step + Math.floor(step / 2));
          const b = Math.min(255, Math.floor(data[idx + 2] / step) * step + Math.floor(step / 2));
          const colorKey = `rgb(${r},${g},${b})`;

          if (!pathsMap.has(colorKey)) {
            pathsMap.set(colorKey, []);
          }

          // Build vector polygon box with slight rounding if smoothing enabled
          const sw = sampleStep;
          const sh = sampleStep;
          if (smoothingFactor > 0.3) {
            pathsMap.get(colorKey)!.push(`M${x},${y} Q${x + sw / 2},${y - 0.5} ${x + sw},${y} L${x + sw},${y + sh} L${x},${y + sh} Z`);
          } else {
            pathsMap.get(colorKey)!.push(`M${x},${y}h${sw}v${sh}h-${sw}z`);
          }
        }
      }

      // Assemble standard W3C SVG XML
      let svgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" height="100%">\n`;
      pathsMap.forEach((pathList, color) => {
        svgMarkup += `  <path fill="${color}" stroke="${color}" stroke-width="0.5" d="${pathList.join(' ')}" />\n`;
      });
      svgMarkup += `</svg>`;

      setSvgOutput(svgMarkup);
      setIsProcessing(false);
    };

    img.src = sourceImage.url;
  }, [sourceImage, settings]);

  useEffect(() => {
    if (sourceImage) {
      vectorize();
    }
  }, [sourceImage, settings, vectorize]);

  const handleDownload = () => {
    if (!svgOutput || !sourceImage) return;
    const blob = new Blob([svgOutput], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${sourceImage.name}-vector.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    if (sourceImage?.url) URL.revokeObjectURL(sourceImage.url);
    setSourceImage(null);
    setSvgOutput('');
  };

  return (
    <div className={styles.wrapper}>
      {!sourceImage && (
        <DropZone
          onFilesSelected={handleFilesSelected}
          acceptedFileTypes={['image/png', 'image/jpeg', 'image/webp']}
          acceptedDescription="Drop raster PNG or JPG to convert into scalable SVG paths"
          maxSizeMB={15}
          label="Select or drop bitmap image to vectorize"
        />
      )}

      {sourceImage && (
        <div className={styles.editorGrid}>
          {/* Controls Panel */}
          <div className={styles.controlsPanel}>
            <div className={styles.controlGroup}>
              <div className={styles.controlHeader}>
                <span>Color Palette Count</span>
                <span>{settings.colorCount}</span>
              </div>
              <input
                type="range"
                min="2"
                max="16"
                step="1"
                value={settings.colorCount}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, colorCount: Number(e.target.value) }))
                }
                className={styles.rangeInput}
              />
            </div>

            <div className={styles.controlGroup}>
              <div className={styles.controlHeader}>
                <span>Detail Sensitivity</span>
                <span>{settings.detail}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={settings.detail}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, detail: Number(e.target.value) }))
                }
                className={styles.rangeInput}
              />
            </div>

            <div className={styles.controlGroup}>
              <div className={styles.controlHeader}>
                <span>Curve Smoothing</span>
                <span>{settings.smoothing}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={settings.smoothing}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, smoothing: Number(e.target.value) }))
                }
                className={styles.rangeInput}
              />
            </div>

            <button
              onClick={handleDownload}
              disabled={isProcessing || !svgOutput}
              aria-label="Download SVG vector"
            >
              <IconDownload size={20} />
              Download Scalable SVG
            </button>

            <button
              onClick={handleReset}
              className="secondary"
              aria-label="Upload different image"
            >
              <IconRefresh size={18} />
              Convert Another Image
            </button>

            <div style={{ marginTop: 'auto', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <IconShield size={16} style={{ display: 'inline', verticalAlign: 'text-bottom' }} />{' '}
              Runs 100% locally in browser memory.
            </div>
          </div>

          {/* SVG Preview Viewport */}
          <div className={styles.previewContainer}>
            {isProcessing ? (
              <div style={{ textAlign: 'center' }}>
                <div className="skeleton" style={{ width: '280px', height: '240px', margin: '0 auto 1rem' }} />
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Tracing vector paths...</p>
              </div>
            ) : svgOutput ? (
              <div
                className={styles.svgViewport}
                dangerouslySetInnerHTML={{ __html: svgOutput }}
              />
            ) : null}

            <div className={styles.metaBar}>
              <span>Original: {sourceImage.width} x {sourceImage.height}px</span>
              <span>Format: Scalable Vector (.svg)</span>
            </div>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}
