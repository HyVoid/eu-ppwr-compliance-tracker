import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(5,28,44,0.45)] backdrop-blur-sm animate-fade-up">
      <div className="bg-white rounded-xl shadow-[var(--shadow-lg)] max-w-md w-full p-6 space-y-4 border border-[var(--color-border)]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[rgba(211,47,47,0.1)] flex items-center justify-center text-[var(--color-negative)] shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg text-[var(--color-primary)]">
                Reset Application Data?
              </h3>
              <p className="text-[12px] text-[var(--color-muted)]">
                This action will restore default demonstration records.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-[13px] text-[var(--color-body-text)] leading-relaxed">
          All modifications in your browser localStorage will be replaced with the original baseline dataset (10 sample products, 29 components, lab reports, and PPWR compliance rules).
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[13px] font-medium text-[var(--color-primary)] bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-[13px] font-semibold text-white bg-[var(--color-negative)] rounded-lg hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
          >
            Confirm & Reset Data
          </button>
        </div>
      </div>
    </div>
  );
};
