import React from 'react';

interface StatusBadgeProps {
  status: string;
  isInteractive?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  isInteractive = false,
  onClick,
  size = 'sm',
}) => {
  const s = status.trim();

  // Determine semantic tone
  let bgClass = 'bg-[rgba(5,28,44,0.05)] text-[var(--color-primary)] border border-[rgba(5,28,44,0.1)]';

  // Negative / Critical / Anomaly conditions
  if (
    s.includes('BLOCKED') ||
    s.includes('Non-compliance') ||
    s.includes('Exceeded') ||
    s.includes('Discrepancy') ||
    s.includes('Anomaly') ||
    s.includes('Overdue') ||
    s.includes('Blocks DoC') ||
    s.includes('Duplicate') ||
    s.includes('Overrun')
  ) {
    bgClass = 'bg-[rgba(211,47,47,0.08)] text-[var(--color-negative)] border border-[rgba(211,47,47,0.25)] font-semibold';
  }
  // Urgent / Attention conditions
  else if (
    s.includes('Urgent') ||
    s.includes('Requires Action') ||
    s.includes('Pending Supplementary') ||
    s.includes('Insufficient Evidence') ||
    s.includes('Missing') ||
    s.includes('Re-audit Required')
  ) {
    bgClass = 'bg-[rgba(5,28,44,0.08)] text-[var(--color-primary)] border border-[rgba(5,28,44,0.2)] font-medium';
  }
  // Positive / Compliant conditions (rare, earned)
  else if (
    s.includes('Verified Compliant') ||
    s.includes('Fully Executed') ||
    s.includes('Fully Submitted') ||
    s.includes('Screening Pass') ||
    s.includes('Closed & Verified') ||
    s.includes('Unique OK') ||
    s.includes('Within Budget')
  ) {
    bgClass = 'bg-[rgba(0,200,83,0.08)] text-[var(--color-positive)] border border-[rgba(0,200,83,0.25)] font-semibold';
  }
  // In progress / Under review / Normal conditions
  else if (
    s.includes('Ready for Signature') ||
    s.includes('Active Approved') ||
    s.includes('Machine Pass') ||
    s.includes('Consistent') ||
    s.includes('Compliant with') ||
    s.includes('Dual Evidence')
  ) {
    bgClass = 'bg-[rgba(34,81,255,0.08)] text-[var(--color-accent)] border border-[rgba(34,81,255,0.25)] font-medium';
  }

  const paddingClass = size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-[12px]';
  const interactiveClass = isInteractive ? 'status-cell-interactive select-none' : '';

  return (
    <span
      onClick={isInteractive ? onClick : undefined}
      className={`inline-flex items-center gap-1.5 rounded-full ${paddingClass} ${bgClass} ${interactiveClass} whitespace-nowrap transition-all`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 shrink-0" />
      <span>{status}</span>
    </span>
  );
};
