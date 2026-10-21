import React from 'react';

interface AdSlotProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'responsive';
  className?: string;
}

/**
 * AdSlot Component
 * Clean placeholder for Google AdSense or advertising networks.
 * Renders nothing by default (null) to ensure zero layout shift (CLS 0) and pristine user experience.
 * When AdSense is approved, update active to true and insert your ad-client ID.
 */
export function AdSlot({ slotId = 'default-slot', format = 'responsive', className }: AdSlotProps) {
  const active = false; // Set to true when AdSense / display ads are enabled

  if (!active) {
    return null;
  }

  return (
    <aside
      className={`ad-slot-container ${className || ''}`}
      data-ad-slot={slotId}
      data-ad-format={format}
      style={{
        margin: '2rem auto',
        textAlign: 'center',
        minHeight: format === 'horizontal' ? '90px' : '250px',
        backgroundColor: 'var(--bg-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-label="Advertisement"
    >
      {/* Insert AdSense script/ins tag here */}
      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Advertisement</span>
    </aside>
  );
}
