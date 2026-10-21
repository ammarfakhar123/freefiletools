'use client';

import { useEffect } from 'react';
import gsap from 'gsap';

export function GsapAnimations() {
  useEffect(() => {
    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    try {
      // Animate Hero Section elements
      gsap.fromTo(
        '.gsap-hero-title',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
      );

      gsap.fromTo(
        '.gsap-hero-desc',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.15, ease: 'power2.out' }
      );

      gsap.fromTo(
        '.gsap-hero-tool',
        { opacity: 0, scale: 0.98, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, delay: 0.25, ease: 'power2.out' }
      );

      // Animate statistics counters
      gsap.fromTo(
        '.gsap-stat-item',
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );

      // Animate tool cards on view
      const cards = document.querySelectorAll('.gsap-tool-card');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
          }
        );
      }
    } catch (e) {
      console.warn('GSAP Animation initialization note:', e);
    }
  }, []);

  return null;
}
