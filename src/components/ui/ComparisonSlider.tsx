'use client';

import React, { useState, useRef, MouseEvent, TouchEvent } from 'react';
import styles from './ComparisonSlider.module.css';

interface ComparisonSliderProps {
  originalUrl: string;
  processedUrl: string;
  originalAlt?: string;
  processedAlt?: string;
}

export function ComparisonSlider({
  originalUrl,
  processedUrl,
  originalAlt = 'Original image',
  processedAlt = 'Processed image',
}: ComparisonSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleMouseDown = (e: MouseEvent) => {
    isDragging.current = true;
    updatePosition(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (e: TouchEvent) => {
    isDragging.current = true;
    if (e.touches[0]) updatePosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    if (e.touches[0]) updatePosition(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${styles.checkerPattern}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Image comparison slider"
    >
      {/* Background Layer: Processed with transparency */}
      <img
        src={processedUrl}
        alt={processedAlt}
        className={styles.imageLayer}
      />

      {/* Foreground Overlay Layer: Original */}
      <div
        className={styles.overlayLayer}
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src={originalUrl}
          alt={originalAlt}
          className={styles.overlayImage}
          style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
        />
      </div>

      {/* Divider Bar & Handle */}
      <div
        className={styles.sliderBar}
        style={{ left: `${sliderPos}%` }}
      >
        <div className={styles.sliderHandle}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>

      <span className={styles.badgeBefore}>Original</span>
      <span className={styles.badgeAfter}>Cutout</span>
    </div>
  );
}
