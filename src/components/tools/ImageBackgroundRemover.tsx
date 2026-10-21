'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './ImageBackgroundRemover.module.css';
import { DropZone } from '@/components/ui/DropZone';
import { ComparisonSlider } from '@/components/ui/ComparisonSlider';
import { IconDownload, IconRefresh, IconShield, IconCheck } from '@/components/icons';

type EngineMode = 'ai' | 'smartKeyer';
type TargetBg = 'transparent' | 'white' | 'black' | 'custom';

interface ProcessingState {
  status: 'idle' | 'ready' | 'processing';
  mode: EngineMode;
  originalUrl: string;
  processedUrl: string;
  filename: string;
  tolerance: number; // For smart keyer (5-80%)
  maskThreshold: number; // For AI mode (10-90%)
  targetBg: TargetBg;
  customBgColor: string;
  bgSampleColor: { r: number; g: number; b: number };
  width: number;
  height: number;
  isAiProcessing: boolean;
  statusMessage: string;
}

export function ImageBackgroundRemover() {
  const [state, setState] = useState<ProcessingState>({
    status: 'idle',
    mode: 'ai',
    originalUrl: '',
    processedUrl: '',
    filename: '',
    tolerance: 28,
    maskThreshold: 50,
    targetBg: 'transparent',
    customBgColor: '#2563eb',
    bgSampleColor: { r: 255, g: 255, b: 255 },
    width: 0,
    height: 0,
    isAiProcessing: false,
    statusMessage: '',
  });

  const sourceImageRef = useRef<HTMLImageElement | null>(null);
  const aiMaskCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const segmenterRef = useRef<any>(null);

  // Initialize or fetch MediaPipe segmenter safely
  const getSegmenter = useCallback(async () => {
    if (segmenterRef.current) return segmenterRef.current;
    try {
      const { SelfieSegmentation } = await import('@mediapipe/selfie_segmentation');
      const segmenter = new SelfieSegmentation({
        locateFile: (file) => `/mediapipe/${file}`,
      });
      segmenter.setOptions({
        modelSelection: 1, // 1: landscape/higher quality model
        selfieMode: false,
      });
      await segmenter.initialize();
      segmenterRef.current = segmenter;
      return segmenter;
    } catch (err) {
      console.warn('Could not initialize MediaPipe segmenter, falling back to smart keyer:', err);
      return null;
    }
  }, []);

  // 1. Boundary-Connected Smart Keyer (BFS Flood Fill from canvas borders)
  const processBoundaryKeyer = useCallback(
    (
      img: HTMLImageElement,
      targetColor: { r: number; g: number; b: number },
      tolerance: number,
      targetBg: TargetBg,
      customColor: string
    ) => {
      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;
      if (!w || !h) return;

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;

      const totalPixels = w * h;
      const visited = new Uint8Array(totalPixels);
      const queue = new Int32Array(totalPixels);
      let head = 0;
      let tail = 0;

      const { r: tr, g: tg, b: tb } = targetColor;
      // Convert 5-80 tolerance into Euclidean distance threshold
      const maxDist = (tolerance / 100) * 441.67;
      const maxDistSq = maxDist * maxDist;

      // Color distance matcher
      const matchesTarget = (idx: number) => {
        const pIdx = idx * 4;
        const dr = data[pIdx] - tr;
        const dg = data[pIdx + 1] - tg;
        const db = data[pIdx + 2] - tb;
        return dr * dr + dg * dg + db * db <= maxDistSq;
      };

      // Seed queue from 4 exterior boundaries
      for (let x = 0; x < w; x++) {
        const topIdx = x;
        if (matchesTarget(topIdx)) {
          visited[topIdx] = 1;
          queue[tail++] = topIdx;
        }
        const btmIdx = (h - 1) * w + x;
        if (matchesTarget(btmIdx)) {
          visited[btmIdx] = 1;
          queue[tail++] = btmIdx;
        }
      }

      for (let y = 0; y < h; y++) {
        const leftIdx = y * w;
        if (!visited[leftIdx] && matchesTarget(leftIdx)) {
          visited[leftIdx] = 1;
          queue[tail++] = leftIdx;
        }
        const rightIdx = y * w + (w - 1);
        if (!visited[rightIdx] && matchesTarget(rightIdx)) {
          visited[rightIdx] = 1;
          queue[tail++] = rightIdx;
        }
      }

      // BFS outward expansion stopping at subject boundaries
      while (head < tail) {
        const curr = queue[head++];
        const cx = curr % w;
        const cy = Math.floor(curr / w);

        // Up
        if (cy > 0) {
          const nIdx = curr - w;
          if (visited[nIdx] === 0 && matchesTarget(nIdx)) {
            visited[nIdx] = 1;
            queue[tail++] = nIdx;
          }
        }
        // Down
        if (cy < h - 1) {
          const nIdx = curr + w;
          if (visited[nIdx] === 0 && matchesTarget(nIdx)) {
            visited[nIdx] = 1;
            queue[tail++] = nIdx;
          }
        }
        // Left
        if (cx > 0) {
          const nIdx = curr - 1;
          if (visited[nIdx] === 0 && matchesTarget(nIdx)) {
            visited[nIdx] = 1;
            queue[tail++] = nIdx;
          }
        }
        // Right
        if (cx < w - 1) {
          const nIdx = curr + 1;
          if (visited[nIdx] === 0 && matchesTarget(nIdx)) {
            visited[nIdx] = 1;
            queue[tail++] = nIdx;
          }
        }
      }

      // Parse custom background if selected
      let customR = 255, customG = 255, customB = 255;
      if (targetBg === 'custom' && customColor) {
        const hex = customColor.replace('#', '');
        if (hex.length === 6) {
          customR = parseInt(hex.substring(0, 2), 16);
          customG = parseInt(hex.substring(2, 4), 16);
          customB = parseInt(hex.substring(4, 6), 16);
        }
      }

      // Erase ONLY visited boundary pixels; subject internal pixels are 100% UNTOUCHED!
      for (let i = 0; i < totalPixels; i++) {
        if (visited[i] === 1) {
          const pIdx = i * 4;
          if (targetBg === 'transparent') {
            data[pIdx + 3] = 0;
          } else if (targetBg === 'white') {
            data[pIdx] = 255;
            data[pIdx + 1] = 255;
            data[pIdx + 2] = 255;
            data[pIdx + 3] = 255;
          } else if (targetBg === 'black') {
            data[pIdx] = 11;
            data[pIdx + 1] = 15;
            data[pIdx + 2] = 25;
            data[pIdx + 3] = 255;
          } else if (targetBg === 'custom') {
            data[pIdx] = customR;
            data[pIdx + 1] = customG;
            data[pIdx + 2] = customB;
            data[pIdx + 3] = 255;
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const newUrl = URL.createObjectURL(blob);
        setState((prev) => {
          if (prev.processedUrl && prev.processedUrl.startsWith('blob:')) {
            URL.revokeObjectURL(prev.processedUrl);
          }
          return {
            ...prev,
            status: 'ready',
            processedUrl: newUrl,
            isAiProcessing: false,
            statusMessage: 'Processed with Boundary-Connected Smart Keyer',
          };
        });
      }, 'image/png');
    },
    []
  );

  // 2. Composite AI Neural Mask at 100% Full Original Resolution
  const compositeAiMask = useCallback(
    (
      img: HTMLImageElement,
      maskCanvas: HTMLCanvasElement,
      threshold: number,
      targetBg: TargetBg,
      customColor: string
    ) => {
      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;
      if (!w || !h) return;

      const outCanvas = document.createElement('canvas');
      outCanvas.width = w;
      outCanvas.height = h;
      const ctx = outCanvas.getContext('2d');
      if (!ctx) return;

      // Draw the neural mask scaled cleanly to native image dimensions
      ctx.drawImage(maskCanvas, 0, 0, w, h);

      // Apply contrast thresholding on the alpha mask without blurring
      const maskData = ctx.getImageData(0, 0, w, h);
      const mData = maskData.data;
      const cutoff = (threshold / 100) * 255;
      const len = mData.length;

      for (let i = 0; i < len; i += 4) {
        // Red channel in mask represents person probability
        const val = mData[i];
        if (val >= cutoff) {
          mData[i + 3] = 255;
        } else {
          // Clean falloff for sub-pixel edge smoothness
          const ratio = val / cutoff;
          mData[i + 3] = Math.round(ratio * ratio * 255);
        }
      }
      ctx.putImageData(maskData, 0, 0);

      // Composite original source image onto the neural mask:
      // 'source-in' keeps ONLY the pixels of the original image inside the mask!
      // This preserves 100% of original photo colors, sharpness, and details!
      ctx.globalCompositeOperation = 'source-in';
      ctx.drawImage(img, 0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';

      // If a solid background is requested, composite behind the cutout
      let finalCanvas = outCanvas;
      if (targetBg !== 'transparent') {
        const bgCanvas = document.createElement('canvas');
        bgCanvas.width = w;
        bgCanvas.height = h;
        const bgCtx = bgCanvas.getContext('2d');
        if (bgCtx) {
          if (targetBg === 'white') {
            bgCtx.fillStyle = '#ffffff';
          } else if (targetBg === 'black') {
            bgCtx.fillStyle = '#0b0f19';
          } else if (targetBg === 'custom') {
            bgCtx.fillStyle = customColor || '#2563eb';
          }
          bgCtx.fillRect(0, 0, w, h);
          bgCtx.drawImage(outCanvas, 0, 0);
          finalCanvas = bgCanvas;
        }
      }

      finalCanvas.toBlob((blob) => {
        if (!blob) return;
        const newUrl = URL.createObjectURL(blob);
        setState((prev) => {
          if (prev.processedUrl && prev.processedUrl.startsWith('blob:')) {
            URL.revokeObjectURL(prev.processedUrl);
          }
          return {
            ...prev,
            status: 'ready',
            processedUrl: newUrl,
            isAiProcessing: false,
            statusMessage: 'Processed with AI Neural Subject Isolation',
          };
        });
      }, 'image/png');
    },
    []
  );

  // 3. Run AI Neural Background Removal
  const runAiRemoval = useCallback(
    async (
      img: HTMLImageElement,
      threshold: number,
      targetBg: TargetBg,
      customColor: string
    ) => {
      setState((prev) => ({
        ...prev,
        isAiProcessing: true,
        statusMessage: 'Analyzing subject with AI Neural Network...',
      }));

      const segmenter = await getSegmenter();
      if (!segmenter) {
        // Fallback to Smart Keyer if MediaPipe cannot initialize
        processBoundaryKeyer(
          img,
          state.bgSampleColor,
          state.tolerance,
          targetBg,
          customColor
        );
        return;
      }

      segmenter.onResults((results: any) => {
        if (!results || !results.segmentationMask) {
          processBoundaryKeyer(
            img,
            state.bgSampleColor,
            state.tolerance,
            targetBg,
            customColor
          );
          return;
        }

        // Store mask canvas for instant threshold adjustments
        const maskCanvas = document.createElement('canvas');
        maskCanvas.width = img.naturalWidth || img.width;
        maskCanvas.height = img.naturalHeight || img.height;
        const mCtx = maskCanvas.getContext('2d');
        if (mCtx) {
          mCtx.drawImage(results.segmentationMask, 0, 0, maskCanvas.width, maskCanvas.height);
          aiMaskCanvasRef.current = maskCanvas;
          compositeAiMask(img, maskCanvas, threshold, targetBg, customColor);
        }
      });

      try {
        await segmenter.send({ image: img });
      } catch (err) {
        console.error('AI segmentation failed:', err);
        processBoundaryKeyer(
          img,
          state.bgSampleColor,
          state.tolerance,
          targetBg,
          customColor
        );
      }
    },
    [getSegmenter, compositeAiMask, processBoundaryKeyer, state.bgSampleColor, state.tolerance]
  );

  // Handle image upload
  const handleFilesSelected = (files: File[]) => {
    if (!files.length) return;
    const file = files[0];
    const originalUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      sourceImageRef.current = img;

      // Sample 4 corner pixels to determine auto background color
      const sampleCanvas = document.createElement('canvas');
      sampleCanvas.width = img.naturalWidth || img.width;
      sampleCanvas.height = img.naturalHeight || img.height;
      const ctx = sampleCanvas.getContext('2d', { willReadFrequently: true });
      let autoColor = { r: 255, g: 255, b: 255 };

      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const c1 = ctx.getImageData(2, 2, 1, 1).data;
        const c2 = ctx.getImageData(sampleCanvas.width - 3, 2, 1, 1).data;
        const c3 = ctx.getImageData(2, sampleCanvas.height - 3, 1, 1).data;
        const c4 = ctx.getImageData(sampleCanvas.width - 3, sampleCanvas.height - 3, 1, 1).data;

        // Average 4 corners
        autoColor = {
          r: Math.round((c1[0] + c2[0] + c3[0] + c4[0]) / 4),
          g: Math.round((c1[1] + c2[1] + c3[1] + c4[1]) / 4),
          b: Math.round((c1[2] + c2[2] + c3[2] + c4[2]) / 4),
        };
      }

      setState({
        status: 'ready',
        mode: 'ai',
        originalUrl,
        processedUrl: '',
        filename: file.name.replace(/\.[^/.]+$/, ''),
        tolerance: 28,
        maskThreshold: 50,
        targetBg: 'transparent',
        customBgColor: '#2563eb',
        bgSampleColor: autoColor,
        width: img.naturalWidth || img.width,
        height: img.naturalHeight || img.height,
        isAiProcessing: true,
        statusMessage: 'Starting AI Background Removal...',
      });

      // Run AI removal by default
      runAiRemoval(img, 50, 'transparent', '#2563eb');
    };

    img.src = originalUrl;
  };

  // Switch Engine Mode (AI vs Smart Keyer)
  const handleModeChange = (mode: EngineMode) => {
    setState((prev) => ({ ...prev, mode }));
    if (!sourceImageRef.current) return;

    if (mode === 'ai') {
      if (aiMaskCanvasRef.current) {
        compositeAiMask(
          sourceImageRef.current,
          aiMaskCanvasRef.current,
          state.maskThreshold,
          state.targetBg,
          state.customBgColor
        );
      } else {
        runAiRemoval(
          sourceImageRef.current,
          state.maskThreshold,
          state.targetBg,
          state.customBgColor
        );
      }
    } else {
      processBoundaryKeyer(
        sourceImageRef.current,
        state.bgSampleColor,
        state.tolerance,
        state.targetBg,
        state.customBgColor
      );
    }
  };

  // Adjust AI Mask Threshold
  const handleThresholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setState((prev) => ({ ...prev, maskThreshold: val }));
    if (sourceImageRef.current && aiMaskCanvasRef.current) {
      compositeAiMask(
        sourceImageRef.current,
        aiMaskCanvasRef.current,
        val,
        state.targetBg,
        state.customBgColor
      );
    }
  };

  // Adjust Smart Keyer Tolerance
  const handleToleranceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setState((prev) => ({ ...prev, tolerance: val }));
    if (sourceImageRef.current) {
      processBoundaryKeyer(
        sourceImageRef.current,
        state.bgSampleColor,
        val,
        state.targetBg,
        state.customBgColor
      );
    }
  };

  // Target Background selection
  const handleTargetBgChange = (targetBg: TargetBg) => {
    setState((prev) => ({ ...prev, targetBg }));
    if (!sourceImageRef.current) return;

    if (state.mode === 'ai' && aiMaskCanvasRef.current) {
      compositeAiMask(
        sourceImageRef.current,
        aiMaskCanvasRef.current,
        state.maskThreshold,
        targetBg,
        state.customBgColor
      );
    } else {
      processBoundaryKeyer(
        sourceImageRef.current,
        state.bgSampleColor,
        state.tolerance,
        targetBg,
        state.customBgColor
      );
    }
  };

  // Custom color change
  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setState((prev) => ({ ...prev, customBgColor: color, targetBg: 'custom' }));
    if (!sourceImageRef.current) return;

    if (state.mode === 'ai' && aiMaskCanvasRef.current) {
      compositeAiMask(
        sourceImageRef.current,
        aiMaskCanvasRef.current,
        state.maskThreshold,
        'custom',
        color
      );
    } else {
      processBoundaryKeyer(
        sourceImageRef.current,
        state.bgSampleColor,
        state.tolerance,
        'custom',
        color
      );
    }
  };

  // Download high-resolution PNG
  const handleDownload = () => {
    if (!state.processedUrl) return;
    const link = document.createElement('a');
    link.href = state.processedUrl;
    link.download = `${state.filename || 'cutout'}-nobg.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Reset
  const handleReset = () => {
    if (state.originalUrl) URL.revokeObjectURL(state.originalUrl);
    if (state.processedUrl) URL.revokeObjectURL(state.processedUrl);
    aiMaskCanvasRef.current = null;
    setState({
      status: 'idle',
      mode: 'ai',
      originalUrl: '',
      processedUrl: '',
      filename: '',
      tolerance: 28,
      maskThreshold: 50,
      targetBg: 'transparent',
      customBgColor: '#2563eb',
      bgSampleColor: { r: 255, g: 255, b: 255 },
      width: 0,
      height: 0,
      isAiProcessing: false,
      statusMessage: '',
    });
  };

  return (
    <div className={styles.wrapper}>
      {state.status === 'idle' && (
        <DropZone
          onFilesSelected={handleFilesSelected}
          acceptedFileTypes={['image/png', 'image/jpeg', 'image/webp']}
          acceptedDescription="Drop your PNG, JPG, or WebP photo for AI Background Removal"
          maxSizeMB={35}
          label="Select or drop photo to isolate subject"
        />
      )}

      {state.status === 'ready' && state.originalUrl && (
        <div>
          {/* Header Bar: Resolution Badge & Engine Selector */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
            <span className={styles.resolutionPill}>
              <IconCheck size={16} />
              Original Quality: {state.width} &times; {state.height} px (100% Lossless)
            </span>

            {/* Engine Tabs */}
            <div className={styles.engineTabs}>
              <button
                type="button"
                className={`${styles.engineTab} ${state.mode === 'ai' ? styles.engineTabActive : ''}`}
                onClick={() => handleModeChange('ai')}
              >
                AI Neural Mode (People & Subjects)
              </button>
              <button
                type="button"
                className={`${styles.engineTab} ${state.mode === 'smartKeyer' ? styles.engineTabActive : ''}`}
                onClick={() => handleModeChange('smartKeyer')}
              >
                Smart Boundary Keyer (Solid / Studio / Products)
              </button>
            </div>
          </div>

          {/* Controls Bar */}
          <div className={styles.controlsBar}>
            {state.mode === 'ai' ? (
              <div className={styles.controlGroup}>
                <div className={styles.controlHeader}>
                  <span>AI Edge Cutoff:</span>
                  <span>{state.maskThreshold}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={state.maskThreshold}
                  onChange={handleThresholdChange}
                  style={{ width: '100%', accentColor: 'var(--brand-blue)', cursor: 'pointer' }}
                  aria-label="AI Mask Threshold"
                />
              </div>
            ) : (
              <div className={styles.controlGroup}>
                <div className={styles.controlHeader}>
                  <span>Boundary Color Sensitivity:</span>
                  <span>{state.tolerance}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="70"
                  value={state.tolerance}
                  onChange={handleToleranceChange}
                  style={{ width: '100%', accentColor: 'var(--brand-blue)', cursor: 'pointer' }}
                  aria-label="Color Sensitivity"
                />
              </div>
            )}

            {/* Output Background Color Options */}
            <div className={styles.controlGroup}>
              <div className={styles.controlHeader}>
                <span>Output Background:</span>
              </div>
              <div className={styles.bgSwatches}>
                <button
                  type="button"
                  className={`${styles.swatchButton} ${state.targetBg === 'transparent' ? styles.swatchButtonActive : ''}`}
                  onClick={() => handleTargetBgChange('transparent')}
                >
                  Transparent
                </button>
                <button
                  type="button"
                  className={`${styles.swatchButton} ${state.targetBg === 'white' ? styles.swatchButtonActive : ''}`}
                  onClick={() => handleTargetBgChange('white')}
                >
                  White
                </button>
                <button
                  type="button"
                  className={`${styles.swatchButton} ${state.targetBg === 'black' ? styles.swatchButtonActive : ''}`}
                  onClick={() => handleTargetBgChange('black')}
                >
                  Black
                </button>
                <div className={styles.colorPickerWrap}>
                  <input
                    type="color"
                    value={state.customBgColor}
                    onChange={handleCustomColorChange}
                    className={styles.colorInput}
                    title="Choose custom background color"
                  />
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Color</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Before/After Preview */}
          <div className={styles.previewContainer}>
            {state.isAiProcessing && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 10,
                  backgroundColor: 'rgba(255, 255, 255, 0.75)',
                  backdropFilter: 'blur(3px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                }}
              >
                <span className={styles.spinner} style={{ width: '28px', height: '28px', borderWidth: '3px' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {state.statusMessage}
                </span>
              </div>
            )}

            {state.processedUrl ? (
              <ComparisonSlider
                originalUrl={state.originalUrl}
                processedUrl={state.processedUrl}
                originalAlt="Original photo"
                processedAlt="Cutout image with background removed"
              />
            ) : (
              <div style={{ height: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className={styles.spinner} />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className={styles.actionsBar}>
            <button
              type="button"
              onClick={handleDownload}
              className={styles.downloadButton}
              disabled={!state.processedUrl || state.isAiProcessing}
              aria-label="Download Cutout PNG"
            >
              <IconDownload size={20} />
              <span>Download Cutout PNG ({state.width} &times; {state.height})</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className={styles.resetButton}
              aria-label="Process Another Photo"
            >
              <IconRefresh size={18} />
              <span>Process Another Photo</span>
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <span className={styles.noticePill}>
              <IconShield size={16} />
              100% Client-Side Processing • Your original photo resolution is preserved without compression.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
