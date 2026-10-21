'use client';

import React, { useState } from 'react';
import styles from '@/app/contact/contact.module.css';
import { IconWhatsApp } from '@/components/icons';

export function EmailActions() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText('info@freefiletools.site').catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className={styles.buttonGrid}>
      <a
        href="mailto:info@freefiletools.site?subject=Inquiry%20from%20FreeFileTools"
        className={styles.primaryEmailBtn}
        aria-label="Send email to info@freefiletools.site"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
        <span>Send Email</span>
      </a>

      <button
        type="button"
        onClick={handleCopyEmail}
        className={`${styles.secondaryActionBtn} ${copied ? styles.copied : ''}`}
        aria-label="Copy email address info@freefiletools.site"
      >
        {copied ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Copied!</span>
          </>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            <span>Copy Email</span>
          </>
        )}
      </button>
    </div>
  );
}

export function ContactActions() {
  const [copied, setCopied] = useState(false);

  const handlePhoneClick = () => {
    // Copy number to clipboard
    if (navigator?.clipboard) {
      navigator.clipboard.writeText('+923302079066').catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);

    // If on mobile device, also launch native dialer
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = 'tel:+923302079066';
    }
  };

  return (
    <div className={styles.buttonGrid}>
      <a
        href="https://wa.me/923302079066?text=Hi%20FreeFileTools%20Team%2C%20I%20have%20an%20inquiry."
        target="_blank"
        rel="noopener noreferrer"
        className={styles.primaryWhatsAppBtn}
        aria-label="Chat on WhatsApp +92 3302079066"
      >
        <IconWhatsApp size={18} />
        <span>WhatsApp</span>
      </a>

      <button
        type="button"
        onClick={handlePhoneClick}
        className={`${styles.secondaryActionBtn} ${copied ? styles.copied : ''}`}
        aria-label="Call or copy phone number +92 3302079066"
      >
        {copied ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Copied!</span>
          </>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>Call Phone</span>
          </>
        )}
      </button>
    </div>
  );
}

export function QuickMessageComposer() {
  const [topic, setTopic] = useState('General Inquiry');
  const [message, setMessage] = useState('');

  const TOPICS = [
    'General Inquiry',
    'Report an Issue',
    'Suggest a Tool or Format',
    'Partnership / Business',
  ];

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(
      `Hello FreeFileTools Support,\n\nTopic: ${topic}\nMessage: ${message.trim() || 'I would like to inquire about your file tools.'}`
    );
    window.open(`https://wa.me/923302079066?text=${text}`, '_blank');
  };

  const handleEmailSend = () => {
    const subject = encodeURIComponent(`[${topic}] FreeFileTools Support Inquiry`);
    const body = encodeURIComponent(
      `Hello FreeFileTools Support,\n\nTopic: ${topic}\n\n${message.trim() || 'I have a question regarding your tools.'}\n\n`
    );
    window.location.href = `mailto:info@freefiletools.site?subject=${subject}&body=${body}`;
  };

  return (
    <div className={styles.composerWrapper}>
      <div className={styles.composerHeader}>
        <div className={styles.composerIconWrap}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <div>
          <h3 className={styles.composerTitle}>Send a Quick Message</h3>
          <p className={styles.composerSubtitle}>
            Select your inquiry topic and compose a quick message to dispatch instantly via WhatsApp or Email:
          </p>
        </div>
      </div>

      <div className={styles.topicButtonGroup}>
        {TOPICS.map((t) => (
          <button
            key={t}
            type="button"
            className={`${styles.topicButton} ${topic === t ? styles.topicActive : ''}`}
            onClick={() => setTopic(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your feedback, feature request, or question here (optional)..."
        className={styles.composerTextarea}
        rows={3}
      />

      <div className={styles.composerActions}>
        <button
          type="button"
          onClick={handleWhatsAppSend}
          className={styles.primaryWhatsAppBtn}
        >
          <IconWhatsApp size={18} />
          <span>Launch on WhatsApp</span>
        </button>

        <button
          type="button"
          onClick={handleEmailSend}
          className={styles.primaryEmailBtn}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
          <span>Send via Email</span>
        </button>
      </div>
    </div>
  );
}
