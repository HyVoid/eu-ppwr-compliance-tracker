import React from 'react';
import { Lock, ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 py-8 border-t border-[var(--color-border)] text-[12px] text-[var(--color-muted)]">
      <div className="max-w-[1400px] mx-auto px-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-[var(--color-accent)] shrink-0" />
          <span>
            Privacy Notice: All storage features of this tool run locally in localStorage; the application does not store or transmit any user data.
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-mono">
          <span className="flex items-center gap-1">
            <ShieldAlert className="w-3 h-3 text-[var(--color-muted)]" />
            <span>PPWR Article 5–14 Architecture Model</span>
          </span>
          <span>·</span>
          <span>Client-Side Reactive Runtime</span>
        </div>
      </div>
    </footer>
  );
};
