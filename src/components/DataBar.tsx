import React from 'react';

interface DataBarProps {
  value: number; // 0 to 100 or relative value
  max?: number;
  label?: string;
  unit?: string;
  width?: string;
  highlightExceeded?: boolean;
  threshold?: number;
}

export const DataBar: React.FC<DataBarProps> = ({
  value,
  max = 100,
  label,
  unit = '%',
  width = 'w-24',
  highlightExceeded = false,
  threshold,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const isExceeded = highlightExceeded && threshold !== undefined && value > threshold;

  return (
    <div className="inline-flex items-center gap-2 tabular-nums">
      <div className={`h-2 ${width} rounded-full bg-[rgba(5,28,44,0.08)] overflow-hidden relative`}>
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            isExceeded ? 'bg-[var(--color-negative)]' : 'bg-[var(--color-accent)]'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className={`text-[12px] font-medium ${isExceeded ? 'text-[var(--color-negative)] font-semibold' : 'text-[var(--color-body-text)]'}`}>
        {label !== undefined ? label : `${value}${unit}`}
      </span>
    </div>
  );
};
