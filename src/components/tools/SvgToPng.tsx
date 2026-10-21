'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './SvgToPng.module.css';
import { DropZone } from '@/components/ui/DropZone';
import { IconDownload, IconRefresh, IconShield } from '@/components/icons';

interface SvgMeta {
  file: File;
  name: string;
  svgText: string;
  baseWidth: number;
  baseHeight: number;
}

export function SvgToPng() {
  const [svgMeta, setSvgMeta] = useState<SvgMeta | null>(null);
  const [scale, setScale] = useState<1 | 2 | 4>(2);
  const [customWidth, setCustomWidth] = useState<number>(0);
  const [bgType, setBgType] = useState<'transparent' | 'solid'>('transparent');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [renderedPngUrl, setRenderedPngUrl] = useState<string>('');
  const [targetDimensions, setTargetDimensions] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

  const handleFilesSelected = (files: File[]) => {
    if (!files.length) return;
    const file = files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (!text) return;

      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'image/svg+xml');
      const svgEl = doc.querySelector('svg');

      let w = 800;
      let h = 800;

      if (svgEl) {
        const viewBox = svgEl.getAttribute('viewBox');
        if (viewBox) {
          const parts = viewBox.split(/[\s,]+/).filter(Boolean).map(Number);
          if (parts.length === 4 && parts[2] > 0 && parts[3] > 0) {
            w = parts[2];
            h = parts[3];
          }
        } else {
          const attrW = parseFloat(svgEl.getAttribute('width') || '0');
          const attrH = parseFloat(svgEl.getAttribute('height') || '0');
          if (attrW > 0 && attrH > 0) {
            w = attrW;
            h = attrH;
          }
        }
      }

      setSvgMeta({
        file,
        name: file.name.replace(/\.svg$/i, ''),
        svgText: text,
        baseWidth: Math.round(w),
        baseHeight: Math.round(h),
      });
      setCustomWidth(Math.round(w * 2));
    };

    reader.readAsText(file);
  };

  const renderToCanvas = useCallback(() => {
    if (!svgMeta) return;

    let targetW = customWidth > 0 ? customWidth : svgMeta.baseWidth * scale;
    const aspectRatio = svgMeta.baseHeight / svgMeta.baseWidth;
    let targetH = Math.round(targetW * aspectRatio);

    // Limit maximum dimensions to 10,000px for browser canvas stability
    if (targetW > 10000) targetW = 10000;
    if (targetH > 10000) targetH = 10000;

    setTargetDimensions({ w: targetW, h: targetH });

    const canvas = document.createElement('canvas');
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    if (bgType === 'solid') {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, targetW, targetH);
    } else {
      ctx.clearRect(0, 0, targetW, targetH);
    }

    const svgBlob = new Blob([svgMeta.svgText], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();

    img.onload = () => {
      ctx.drawImage(img, 0, 0, targetW, targetH);
      URL.revokeObjectURL(url);
      const pngData = canvas.toDataURL('image/png');
      setRenderedPngUrl(pngData);
    };

    img.src = url;
  }, [svgMeta, scale, customWidth, bgType, bgColor]);

  useEffect(() => {
    if (svgMeta) {
      renderToCanvas();
    }
  }, [svgMeta, scale, customWidth, bgType, bgColor, renderToCanvas]);

  const handleDownload = () => {
    if (!renderedPngUrl || !svgMeta) return;
    const link = document.createElement('a');
    link.href = renderedPngUrl;
    link.download = `${svgMeta.name}-${targetDimensions.w}x${targetDimensions.h}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setSvgMeta(null);
    setRenderedPngUrl('');
  };

  return (
    <div className={styles.wrapper}>
      {!svgMeta && (
        <DropZone
          onFilesSelected={handleFilesSelected}
          acceptedFileTypes={['image/svg+xml', '.svg']}
          acceptedDescription="Drop SVG vector file to render high-resolution PNG"
          maxSizeMB={10}
          label="Select or drop SVG vector graphic"
        />
      )}

      {svgMeta && (
        <div className={styles.editorGrid}>
          {/* Controls */}
          <div className={styles.controlsPanel}>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Resolution Multiplier
              </div>
              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  className={`${styles.scaleButton} ${scale === 1 ? styles.active : ''}`}
                  onClick={() => {
                    setScale(1);
                    setCustomWidth(svgMeta.baseWidth);
                  }}
                >
                  1x Standard
                </button>
                <button
                  type="button"
                  className={`${styles.scaleButton} ${scale === 2 ? styles.active : ''}`}
                  onClick={() => {
                    setScale(2);
                    setCustomWidth(svgMeta.baseWidth * 2);
                  }}
                >
                  2x Retina
                </button>
                <button
                  type="button"
                  className={`${styles.scaleButton} ${scale === 4 ? styles.active : ''}`}
                  onClick={() => {
                    setScale(4);
                    setCustomWidth(svgMeta.baseWidth * 4);
                  }}
                >
                  4x Ultra HD
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="customWidthInput"
                style={{ fontSize: '0.875rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}
              >
                Custom Pixel Width
              </label>
              <input
                id="customWidthInput"
                type="number"
                min="16"
                max="8000"
                value={customWidth}
                onChange={(e) => setCustomWidth(Math.max(16, Number(e.target.value)))}
                className={styles.inputField}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Target size: {targetDimensions.w} x {targetDimensions.h}px
              </span>
            </div>

            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Background Fill
              </div>
              <div className={styles.buttonGroup} style={{ gridTemplateColumns: '1fr 1fr' }}>
                <button
                  type="button"
                  className={`${styles.scaleButton} ${bgType === 'transparent' ? styles.active : ''}`}
                  onClick={() => setBgType('transparent')}
                >
                  Transparent
                </button>
                <button
                  type="button"
                  className={`${styles.scaleButton} ${bgType === 'solid' ? styles.active : ''}`}
                  onClick={() => setBgType('solid')}
                >
                  Solid Color
                </button>
              </div>
              {bgType === 'solid' && (
                <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    style={{ width: '40px', height: '36px', border: 'none', cursor: 'pointer' }}
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className={styles.inputField}
                  />
                </div>
              )}
            </div>

            <button onClick={handleDownload} aria-label="Download PNG image">
              <IconDownload size={20} />
              Download PNG ({targetDimensions.w}x{targetDimensions.h})
            </button>

            <button onClick={handleReset} className="secondary" aria-label="Upload different SVG">
              <IconRefresh size={18} />
              Convert Another SVG
            </button>

            <div style={{ marginTop: 'auto', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <IconShield size={16} style={{ display: 'inline', verticalAlign: 'text-bottom' }} />{' '}
              Local HTML5 Canvas execution. Zero server upload.
            </div>
          </div>

          {/* Preview */}
          <div className={`${styles.previewContainer} ${bgType === 'transparent' ? styles.checkerBg : ''}`}>
            {renderedPngUrl ? (
              <img
                src={renderedPngUrl}
                alt="Rendered PNG Output"
                className={styles.renderedImage}
              />
            ) : (
              <div className="skeleton" style={{ width: '280px', height: '240px' }} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
