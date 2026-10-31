import React, { useRef } from 'react';
import {
  Download,
  Upload,
  RotateCcw,
  FileSpreadsheet,
  CheckCircle2,
  Menu,
  ChevronRight,
} from 'lucide-react';
import { ActiveTab } from './Header';

interface TopBarProps {
  activeTab: ActiveTab;
  lastSaved: string;
  onOpenMobileSidebar: () => void;
  onExportBackup: () => void;
  onImportBackup: (file: File) => void;
  onOpenBulkImport: () => void;
  onResetData: () => void;
}

const TAB_TITLES: Record<ActiveTab, { title: string; subtitle: string }> = {
  overview: {
    title: 'Executive Overview',
    subtitle: 'Portfolio Compliance & Delivery Readiness',
  },
  '01_params': {
    title: 'Sheet 01: Rules & Parameters',
    subtitle: 'Single-Point Control Engine & PPWR Rule Library',
  },
  '02_master': {
    title: 'Sheet 02: Packaging Master Data',
    subtitle: '10 Target Products & Multi-Tier BOM Register',
  },
  '03_intake': {
    title: 'Sheet 03: Manufacturer Intake',
    subtitle: 'Physical Metrics, Void Ratios & Lab Certificates',
  },
  '04_audit': {
    title: 'Sheet 04: Evidence Audit Engine',
    subtitle: 'Machine Diagnostic vs Regulatory Expert Review',
  },
  '05_gaps': {
    title: 'Sheet 05: Gap Action Log',
    subtitle: 'Remediation Workflow & EU DoC Blocking Flags',
  },
  '06_doc': {
    title: 'Sheet 06: Delivery & DoC Index',
    subtitle: 'Three-Dimensional Status & Active Safety Interlock',
  },
};

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  lastSaved,
  onOpenMobileSidebar,
  onExportBackup,
  onImportBackup,
  onOpenBulkImport,
  onResetData,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportBackup(file);
      e.target.value = '';
    }
  };

  const currentMeta = TAB_TITLES[activeTab];

  return (
    <header className="sticky top-0 z-30 h-[64px] bg-white border-b border-[var(--color-border)] shadow-[var(--shadow-nav)] select-none">
      <div className="h-full px-6 flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Contextual Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-[var(--color-primary)] hover:bg-gray-100 transition-colors cursor-pointer"
            title="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-[13px]">
            <span className="font-semibold text-[var(--color-primary)] hidden sm:inline">
              Theseus Workshop
            </span>
            <span className="text-[11px] font-mono text-[var(--color-muted)] hidden lg:inline bg-gray-100 px-1.5 py-0.5 rounded">
              PPWR Packaging Compliance
            </span>
            <ChevronRight className="w-4 h-4 text-gray-300 hidden sm:inline" />
            <div>
              <span className="font-heading font-semibold text-[16px] text-[var(--color-primary)]">
                {currentMeta.title}
              </span>
              <span className="text-[11px] text-[var(--color-muted)] font-normal hidden md:inline ml-2">
                — {currentMeta.subtitle}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Actions Toolbar */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Last Saved Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(5,28,44,0.03)] border border-[rgba(5,28,44,0.08)] text-[11px] text-[var(--color-muted)] font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-positive)]" />
            <span>Saved {lastSaved}</span>
          </div>

          {/* Bulk CSV Import Button */}
          <button
            onClick={onOpenBulkImport}
            title="Bulk import CSV data for Master, Intake, or Gaps"
            className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-[var(--color-primary)] bg-white border border-[var(--color-border)] rounded-[var(--radius-sm)] hover:bg-[rgba(5,28,44,0.04)] active:scale-[0.98] transition-all shadow-xs cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[var(--color-accent)]" />
            <span className="hidden md:inline">Bulk CSV</span>
          </button>

          {/* Export Backup Button */}
          <button
            onClick={onExportBackup}
            title="Export complete application state as JSON backup"
            className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-[var(--color-primary)] bg-white border border-[var(--color-border)] rounded-[var(--radius-sm)] hover:bg-[rgba(5,28,44,0.04)] active:scale-[0.98] transition-all shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[var(--color-muted)]" />
            <span className="hidden md:inline">Export</span>
          </button>

          {/* Import Backup Button */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Import application state JSON backup"
            className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-[var(--color-primary)] bg-white border border-[var(--color-border)] rounded-[var(--radius-sm)] hover:bg-[rgba(5,28,44,0.04)] active:scale-[0.98] transition-all shadow-xs cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-[var(--color-muted)]" />
            <span className="hidden md:inline">Import</span>
          </button>

          {/* Reset Data Button */}
          <button
            onClick={onResetData}
            title="Restore original 10-product demonstration dataset"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-medium text-[var(--color-muted)] hover:text-[var(--color-negative)] bg-white border border-[var(--color-border)] rounded-[var(--radius-sm)] hover:border-[rgba(211,47,47,0.3)] active:scale-[0.98] transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
};
