import React, { useRef } from 'react';
import {
  Download,
  Upload,
  RotateCcw,
  FileSpreadsheet,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

export type ActiveTab =
  | 'overview'
  | '01_params'
  | '02_master'
  | '03_intake'
  | '04_audit'
  | '05_gaps'
  | '06_doc';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  lastSaved: string;
  onExportBackup: () => void;
  onImportBackup: (file: File) => void;
  onOpenBulkImport: () => void;
  onResetData: () => void;
  unclosedGapsCount: number;
  blockedProductsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  lastSaved,
  onExportBackup,
  onImportBackup,
  onOpenBulkImport,
  onResetData,
  unclosedGapsCount,
  blockedProductsCount,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportBackup(file);
      e.target.value = '';
    }
  };

  const navItems: { id: ActiveTab; label: string; sheetCode?: string; badge?: number }[] = [
    { id: 'overview', label: 'Executive Overview' },
    { id: '01_params', label: 'Rules & Parameters', sheetCode: '01' },
    { id: '02_master', label: 'Packaging Master', sheetCode: '02' },
    { id: '03_intake', label: 'Manufacturer Intake', sheetCode: '03' },
    { id: '04_audit', label: 'Evidence Audit Engine', sheetCode: '04' },
    { id: '05_gaps', label: 'Gap Action Log', sheetCode: '05', badge: unclosedGapsCount },
    { id: '06_doc', label: 'Delivery & DoC', sheetCode: '06', badge: blockedProductsCount > 0 ? blockedProductsCount : undefined },
  ];

  return (
    <header className="sticky top-0 z-40 h-[56px] bg-white border-b border-[var(--nav-border)] shadow-[var(--shadow-nav)] select-none">
      <div className="max-w-[1440px] mx-auto h-full px-6 flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-sm shadow-sm">
            <ShieldCheck className="w-5 h-5 text-blue-300" />
          </div>
          <div>
            <div className="font-heading font-semibold text-[17px] text-[var(--color-primary)] tracking-tight leading-none">
              Theseus Workshop
            </div>
            <div className="text-[10px] text-[var(--color-muted)] font-mono leading-tight tracking-wider mt-0.5">
              PPWR Packaging Compliance Tracker
            </div>
          </div>
        </div>

        {/* Center: Tabs */}
        <nav className="hidden lg:flex items-center gap-1 h-full overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative h-[56px] px-3.5 text-[12px] font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-[var(--color-primary)] font-semibold'
                    : 'text-[var(--nav-text-inactive)] hover:text-[var(--color-primary)]'
                }`}
              >
                {item.sheetCode && (
                  <span
                    className={`text-[10px] font-mono px-1 py-0.2 rounded ${
                      isActive ? 'bg-[rgba(34,81,255,0.1)] text-[var(--color-accent)]' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {item.sheetCode}
                  </span>
                )}
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      item.id === '06_doc'
                        ? 'bg-[rgba(211,47,47,0.12)] text-[var(--color-negative)] font-semibold'
                        : 'bg-[rgba(5,28,44,0.08)] text-[var(--color-primary)] font-medium'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {/* Active Tab Underline */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--color-accent)] rounded-t-sm" />
                )}
              </button>
            );
          })}
        </nav>

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
            className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-[var(--color-primary)] bg-white border border-[var(--color-border)] rounded-[var(--radius-sm)] hover:bg-[rgba(5,28,44,0.04)] active:scale-[0.98] transition-all shadow-sm cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[var(--color-accent)]" />
            <span className="hidden md:inline">Bulk CSV</span>
          </button>

          {/* Export Backup Button */}
          <button
            onClick={onExportBackup}
            title="Export complete application state as JSON backup"
            className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-[var(--color-primary)] bg-white border border-[var(--color-border)] rounded-[var(--radius-sm)] hover:bg-[rgba(5,28,44,0.04)] active:scale-[0.98] transition-all shadow-sm cursor-pointer"
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
            className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-[var(--color-primary)] bg-white border border-[var(--color-border)] rounded-[var(--radius-sm)] hover:bg-[rgba(5,28,44,0.04)] active:scale-[0.98] transition-all shadow-sm cursor-pointer"
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

      {/* Mobile/Tablet Tab Bar */}
      <div className="lg:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 bg-white border-b border-[var(--nav-border)]">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1 text-[11px] font-medium rounded-full whitespace-nowrap cursor-pointer transition-colors ${
                isActive
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {item.label}
              {item.badge !== undefined && item.badge > 0 && ` (${item.badge})`}
            </button>
          );
        })}
      </div>
    </header>
  );
};
