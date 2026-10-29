import React from 'react';

interface InsightBlockProps {
  title?: string;
  children: React.ReactNode;
  actionButton?: React.ReactNode;
  className?: string;
}

export const InsightBlock: React.FC<InsightBlockProps> = ({
  title = 'Regulatory Insight & Action Directive',
  children,
  actionButton,
  className = '',
}) => {
  return (
    <div
      className={`insight-block p-4 rounded-r-lg mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[13px] text-[var(--color-body-text)] ${className}`}
    >
      <div className="space-y-1">
        <div className="font-semibold text-[13px] text-[var(--color-primary)] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] shrink-0" />
          <span>{title}</span>
        </div>
        <div className="text-[var(--color-body-text)] opacity-90 leading-relaxed">
          {children}
        </div>
      </div>
      {actionButton && <div className="shrink-0">{actionButton}</div>}
    </div>
  );
};
