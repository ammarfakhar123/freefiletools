'use client';

import React, { useState } from 'react';
import styles from '@/app/contact/contact.module.css';
import { IconWhatsApp } from '@/components/icons';

export function ContactActions() {
  const [copied, setCopied] = useState<boolean>(false);

  const handlePhoneClick = () => {
    // Copy number to clipboard
    if (navigator?.clipboard) {
      navigator.clipboard.writeText('+923302079066').catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);

    // If mobile, also trigger phone dialer
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = 'tel:+923302079066';
    }
  };

  return (
    <div className={styles.actionButtonGroup}>
      <a
        href="https://wa.me/923302079066?text=Hi%20FreeFileTools%20Team%2C%20I%20have%20an%20inquiry."
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsappBtn}
        aria-label="Chat on WhatsApp +92 3302079066"
      >
        <IconWhatsApp size={18} />
        <span>WhatsApp</span>
      </a>

      <button
        type="button"
        onClick={handlePhoneClick}
        className={styles.actionButton}
        style={{
          backgroundColor: copied ? 'var(--brand-green)' : 'var(--bg-surface)',
          color: copied ? '#ffffff' : 'var(--text-primary)',
          border: '1px solid var(--border-subtle)',
          cursor: 'pointer',
        }}
        aria-label="Call or copy phone number +92 3302079066"
      >
        {copied ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Copied: +92 3302079066</span>
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>Call: +92 3302079066</span>
          </>
        )}
      </button>
    </div>
  );
}
