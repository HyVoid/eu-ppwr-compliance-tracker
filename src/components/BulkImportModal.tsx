import React, { useState } from 'react';
import {
  X,
  FileSpreadsheet,
  Download,
  Upload,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import {
  CSV_TEMPLATES,
  arrayToCSV,
  downloadCSV,
  parseMasterComponentsCSV,
  parseIntakesCSV,
  parseGapsCSV,
} from '../utils/csvHelper';
import {
  PackagingComponentMaster,
  ManufacturerDataIntake,
  ComplianceGap,
} from '../types/ppwr';

type ImportTarget = 'masterComponents' | 'manufacturerIntakes' | 'gaps';

interface BulkImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportMaster: (items: PackagingComponentMaster[], mode: 'append' | 'replace') => void;
  onImportIntakes: (items: ManufacturerDataIntake[], mode: 'append' | 'replace') => void;
  onImportGaps: (items: ComplianceGap[], mode: 'append' | 'replace') => void;
}

export const BulkImportModal: React.FC<BulkImportModalProps> = ({
  isOpen,
  onClose,
  onImportMaster,
  onImportIntakes,
  onImportGaps,
}) => {
  const [target, setTarget] = useState<ImportTarget>('masterComponents');
  const [mode, setMode] = useState<'append' | 'replace'>('append');
  const [csvText, setCsvText] = useState('');
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [previewCount, setPreviewCount] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleDownloadTemplate = () => {
    const tpl = CSV_TEMPLATES[target];
    const content = arrayToCSV([tpl.header, tpl.sampleRow]);
    downloadCSV(tpl.filename, content);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setCsvText(text);
        validateCsv(text, target);
      };
      reader.readAsText(file);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setCsvText(val);
    validateCsv(val, target);
  };

  const validateCsv = (text: string, currentTarget: ImportTarget) => {
    setError(null);
    setPreviewCount(null);
    try {
      if (!text.trim()) return;
      if (currentTarget === 'masterComponents') {
        const parsed = parseMasterComponentsCSV(text);
        if (parsed.length === 0) {
          setError('No valid component records parsed. Please check headers.');
        } else {
          setPreviewCount(parsed.length);
        }
      } else if (currentTarget === 'manufacturerIntakes') {
        const parsed = parseIntakesCSV(text);
        if (parsed.length === 0) {
          setError('No valid intake records parsed. Please check headers.');
        } else {
          setPreviewCount(parsed.length);
        }
      } else if (currentTarget === 'gaps') {
        const parsed = parseGapsCSV(text);
        if (parsed.length === 0) {
          setError('No valid gap records parsed. Please check headers.');
        } else {
          setPreviewCount(parsed.length);
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'CSV parsing failed');
    }
  };

  const handleExecuteImport = () => {
    try {
      if (target === 'masterComponents') {
        const items = parseMasterComponentsCSV(csvText);
        if (items.length === 0) throw new Error('No valid component records to import');
        onImportMaster(items, mode);
      } else if (target === 'manufacturerIntakes') {
        const items = parseIntakesCSV(csvText);
        if (items.length === 0) throw new Error('No valid intake records to import');
        onImportIntakes(items, mode);
      } else if (target === 'gaps') {
        const items = parseGapsCSV(csvText);
        if (items.length === 0) throw new Error('No valid gap records to import');
        onImportGaps(items, mode);
      }
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Import failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(5,28,44,0.45)] backdrop-blur-sm animate-fade-up">
      <div className="bg-white rounded-xl shadow-[var(--shadow-lg)] max-w-2xl w-full p-6 space-y-5 border border-[var(--color-border)]">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-[var(--color-border)] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[rgba(34,81,255,0.08)] text-[var(--color-accent)] flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-xl text-[var(--color-primary)]">
                Bulk CSV Import
              </h3>
              <p className="text-[12px] text-[var(--color-muted)]">
                Import batch records into Packaging Master Data, Manufacturer Intake, or Compliance Gaps.
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

        {/* Step 1: Select Target Collection */}
        <div className="space-y-2">
          <label className="text-[12px] font-semibold uppercase tracking-wider text-[var(--color-primary)]">
            1. Select Import Destination Sheet
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'masterComponents', label: '02 Master Packaging', desc: 'Components & Tiers' },
              { id: 'manufacturerIntakes', label: '03 Manufacturer Intake', desc: 'Weights, Lab Reports' },
              { id: 'gaps', label: '05 Gap Action Log', desc: 'Remediation Tasks' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setTarget(opt.id as ImportTarget);
                  validateCsv(csvText, opt.id as ImportTarget);
                }}
                className={`p-3 rounded-lg text-left border transition-all cursor-pointer ${
                  target === opt.id
                    ? 'border-[var(--color-accent)] bg-[rgba(34,81,255,0.04)] shadow-sm'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`text-[12px] font-semibold ${target === opt.id ? 'text-[var(--color-accent)]' : 'text-[var(--color-primary)]'}`}>
                  {opt.label}
                </div>
                <div className="text-[11px] text-[var(--color-muted)] mt-0.5">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Download Template or Upload CSV */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-[rgba(5,28,44,0.03)] border border-[rgba(5,28,44,0.06)]">
          <div className="text-[12px]">
            <span className="font-semibold text-[var(--color-primary)]">Need a template? </span>
            <span className="text-[var(--color-muted)]">Download standard CSV schema with sample data.</span>
          </div>
          <button
            type="button"
            onClick={handleDownloadTemplate}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-[var(--color-accent)] bg-white border border-[rgba(34,81,255,0.3)] rounded-md hover:bg-blue-50 transition-colors shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV Template</span>
          </button>
        </div>

        {/* Step 3: File Input & Paste Area */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[12px] font-semibold uppercase tracking-wider text-[var(--color-primary)]">
              2. Upload File or Paste CSV Content
            </label>
            <label className="text-[12px] font-medium text-[var(--color-accent)] hover:underline cursor-pointer flex items-center gap-1">
              <Upload className="w-3.5 h-3.5" />
              <span>Choose .csv file</span>
              <input
                type="file"
                accept=".csv,text/csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {fileName && (
            <div className="text-[11px] text-[var(--color-primary)] bg-gray-100 px-2.5 py-1 rounded inline-block font-mono">
              Selected: {fileName}
            </div>
          )}

          <textarea
            value={csvText}
            onChange={handleTextChange}
            rows={5}
            placeholder={`Paste CSV content here...\nExample:\n${CSV_TEMPLATES[target].header.join(',')}\n${CSV_TEMPLATES[target].sampleRow.join(',')}`}
            className="w-full text-[12px] font-mono p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-accent)] bg-[var(--color-input-bg)]"
          />
        </div>

        {/* Feedback Message */}
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-[rgba(211,47,47,0.08)] border border-[rgba(211,47,47,0.2)] text-[12px] text-[var(--color-negative)]">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {previewCount !== null && !error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-[rgba(0,200,83,0.08)] border border-[rgba(0,200,83,0.2)] text-[12px] text-[var(--color-positive)] font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Successfully validated {previewCount} rows ready for import.</span>
          </div>
        )}

        {/* Import Mode: Append vs Replace */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-4 text-[12px]">
            <span className="font-semibold text-[var(--color-primary)]">Mode:</span>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="importMode"
                checked={mode === 'append'}
                onChange={() => setMode('append')}
                className="text-[var(--color-accent)]"
              />
              <span>Append (Add to current records)</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="importMode"
                checked={mode === 'replace'}
                onChange={() => setMode('replace')}
                className="text-[var(--color-accent)]"
              />
              <span>Replace (Overwrite sheet)</span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-[12px] font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleExecuteImport}
              disabled={previewCount === null || previewCount === 0 || !!error}
              className="px-4 py-2 text-[12px] font-semibold text-white bg-[var(--color-accent)] rounded-lg hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm cursor-pointer"
            >
              Import {previewCount ? `${previewCount} Rows` : ''}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
