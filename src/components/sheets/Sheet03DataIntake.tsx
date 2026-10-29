import React, { useState } from 'react';
import {
  ComputedManufacturerDataIntake,
  ManufacturerDataIntake,
  GlobalParameters,
} from '../../types/ppwr';
import { InsightBlock } from '../InsightBlock';
import { DataBar } from '../DataBar';
import {
  Inbox,
  Plus,
  Trash2,
  Search,
  Download,
  AlertTriangle,
} from 'lucide-react';
import { arrayToCSV, downloadCSV } from '../../utils/csvHelper';

interface Sheet03DataIntakeProps {
  computedIntakes: ComputedManufacturerDataIntake[];
  parameters: GlobalParameters;
  onUpdateIntake: (recordId: string, updated: Partial<ManufacturerDataIntake>) => void;
  onAddIntake: (intake: ManufacturerDataIntake) => void;
  onDeleteIntake: (recordId: string) => void;
}

export const Sheet03DataIntake: React.FC<Sheet03DataIntakeProps> = ({
  computedIntakes,
  parameters,
  onUpdateIntake,
  onAddIntake,
  onDeleteIntake,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newIntake, setNewIntake] = useState<ManufacturerDataIntake>({
    recordId: `INT-${String(computedIntakes.length + 1).padStart(3, '0')}`,
    componentId: 'CMP-001',
    declaredTotalWeightG: 50.0,
    mainMaterialWeightG: 48.0,
    subsidiaryMaterialWeightG: 2.0,
    outerVolumeCm3: 200.0,
    innerItemVolumeCm3: 150.0,
    heavyMetalsPpm: 15.0,
    pcrRatio: 0.30,
    supplierDeclarationDocId: 'DOC-SUP-2026-NEW',
    labTestReportDocId: 'RPT-SGS-2026-NEW',
    supplementaryTestQuoteForeign: 0,
    foreignCurrencyCode: 'EUR',
    submissionDate: new Date().toISOString().split('T')[0],
  });

  const filteredIntakes = computedIntakes.filter((item) => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      item.recordId.toLowerCase().includes(q) ||
      item.componentId.toLowerCase().includes(q) ||
      item.linkedProductId.toLowerCase().includes(q) ||
      item.supplierDeclarationDocId.toLowerCase().includes(q) ||
      item.labTestReportDocId.toLowerCase().includes(q)
    );
  });

  const handleExportCSV = () => {
    const header = [
      'recordId',
      'componentId',
      'linkedProductId',
      'linkedTier',
      'declaredTotalWeightG',
      'mainMaterialWeightG',
      'subsidiaryMaterialWeightG',
      'breakdownTotalWeightG',
      'outerVolumeCm3',
      'innerItemVolumeCm3',
      'voidSpaceRatio',
      'heavyMetalsPpm',
      'pcrRatio',
      'supplierDeclarationDocId',
      'labTestReportDocId',
      'supplementaryTestQuoteForeign',
      'foreignCurrencyCode',
      'supplementaryTestCostBase',
      'submissionDate',
    ];
    const rows = filteredIntakes.map((i) => [
      i.recordId,
      i.componentId,
      i.linkedProductId,
      i.linkedTier,
      i.declaredTotalWeightG,
      i.mainMaterialWeightG,
      i.subsidiaryMaterialWeightG,
      i.breakdownTotalWeightG,
      i.outerVolumeCm3,
      i.innerItemVolumeCm3,
      i.voidSpaceRatio,
      i.heavyMetalsPpm ?? '',
      i.pcrRatio,
      i.supplierDeclarationDocId,
      i.labTestReportDocId,
      i.supplementaryTestQuoteForeign,
      i.foreignCurrencyCode,
      i.supplementaryTestCostBase,
      i.submissionDate,
    ]);
    downloadCSV('sheet03_manufacturer_data_intake.csv', arrayToCSV([header, ...rows]));
  };

  const handleSaveNewIntake = (e: React.FormEvent) => {
    e.preventDefault();
    onAddIntake(newIntake);
    setIsAddModalOpen(false);
    setNewIntake({
      recordId: `INT-${String(computedIntakes.length + 2).padStart(3, '0')}`,
      componentId: 'CMP-001',
      declaredTotalWeightG: 50.0,
      mainMaterialWeightG: 48.0,
      subsidiaryMaterialWeightG: 2.0,
      outerVolumeCm3: 200.0,
      innerItemVolumeCm3: 150.0,
      heavyMetalsPpm: 15.0,
      pcrRatio: 0.30,
      supplierDeclarationDocId: 'DOC-SUP-2026-NEW',
      labTestReportDocId: 'RPT-SGS-2026-NEW',
      supplementaryTestQuoteForeign: 0,
      foreignCurrencyCode: 'EUR',
      submissionDate: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <InsightBlock
        title="Manufacturer Technical Data & Evidence Intake (Sheet 03)"
        actionButton={
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-[var(--color-primary)] bg-white border border-[var(--color-border)] rounded-md hover:bg-gray-50 transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-[12px] font-semibold text-white bg-[var(--color-accent)] rounded-md hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Intake Record</span>
            </button>
          </div>
        }
      >
        Captures declared physical metrics (gross weight, material breakdown, volumetric dimensions) and external evidence document identifiers (supplier declarations, third-party lab test certificates).
        Foreign laboratory testing quotes are automatically converted into base currency <span className="font-mono font-semibold">({parameters.currencySymbol})</span> using parameter PRM_02 (x{parameters.fxMultiplier}).
      </InsightBlock>

      {/* Search & Counter */}
      <div className="bg-white p-4 rounded-xl shadow-[var(--shadow-sm)] border border-[var(--color-border)] flex items-center justify-between">
        <div className="relative w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search record ID, component, report ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-[12px] rounded-lg border border-gray-200 focus:outline-none focus:border-[var(--color-accent)]"
          />
        </div>
        <div className="text-[12px] font-mono text-[var(--color-muted)]">
          Total Records: <span className="font-semibold text-[var(--color-primary)]">{filteredIntakes.length}</span>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl shadow-[var(--shadow-md)] overflow-hidden border border-[var(--color-border)] card-lift">
        <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Inbox className="w-5 h-5 text-[var(--color-accent)]" />
            <div>
              <h2 className="font-heading font-semibold text-lg text-[var(--color-primary)]">
                Manufacturer Raw Data & Evidence Intake Table (A2:S1000)
              </h2>
              <p className="text-[12px] text-[var(--color-muted)]">
                Columns A-N: Supplier Raw Input (Editable in Yellow) · Columns O-S: Automated Lookups & Calculated Formulas
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-[var(--table-header-bg)] border-b border-[var(--table-header-sep)] text-[var(--color-primary)] text-[11px] tracking-table-head uppercase font-semibold">
                <th className="py-3 px-3 w-20">Record ID</th>
                <th className="py-3 px-3 w-24">Component ID</th>
                <th className="py-3 px-3 w-20">Product (Calc)</th>
                <th className="py-3 px-3 w-28 text-right">Gross Wt (g)</th>
                <th className="py-3 px-3 w-28 text-right">Main Wt (g)</th>
                <th className="py-3 px-3 w-28 text-right">Sub Wt (g)</th>
                <th className="py-3 px-3 w-28 text-right">Sum Wt (Calc)</th>
                <th className="py-3 px-3 w-28 text-right">Outer Vol (cm³)</th>
                <th className="py-3 px-3 w-28 text-right">Inner Vol (cm³)</th>
                <th className="py-3 px-3 w-36">Void Ratio (Calc)</th>
                <th className="py-3 px-3 w-28 text-right">Metals (PPM)</th>
                <th className="py-3 px-3 w-28">PCR Ratio</th>
                <th className="py-3 px-3 w-36">Declaration ID</th>
                <th className="py-3 px-3 w-36">Lab Report ID</th>
                <th className="py-3 px-3 w-28 text-right">Foreign Quote</th>
                <th className="py-3 px-3 w-32 text-right">Base Cost ({parameters.currencySymbol})</th>
                <th className="py-3 px-3 w-28">Sub Date</th>
                <th className="py-3 px-2 w-10 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filteredIntakes.map((intake) => {
                // Highlight weight discrepancy if deviation > tolerance
                const weightDiff = Math.abs(intake.declaredTotalWeightG - intake.breakdownTotalWeightG);
                const hasWeightDiscrepancy =
                  intake.declaredTotalWeightG > 0 &&
                  weightDiff / intake.declaredTotalWeightG > parameters.weightTolerancePct;

                // Highlight heavy metals over limit
                const isHeavyMetalsBreached =
                  intake.heavyMetalsPpm !== null && intake.heavyMetalsPpm > parameters.heavyMetalLimitPpm;

                // Highlight void ratio if transport packaging exceeds cap
                const isVoidExceeded =
                  intake.linkedTier === 'Transport Packaging' &&
                  intake.voidSpaceRatio > parameters.maxTransportVoidRatio;

                return (
                  <tr
                    key={intake.recordId}
                    className={`hover:bg-[rgba(5,28,44,0.02)] transition-colors ${
                      isHeavyMetalsBreached || hasWeightDiscrepancy || isVoidExceeded ? 'anomaly-row' : ''
                    }`}
                  >
                    {/* Record ID */}
                    <td className="py-2.5 px-3 font-mono font-semibold text-[12px] text-[var(--color-primary)]">
                      {intake.recordId}
                    </td>

                    {/* Component ID */}
                    <td className="py-2.5 px-3 font-mono font-medium text-[12px]">
                      <input
                        type="text"
                        value={intake.componentId}
                        onChange={(e) => onUpdateIntake(intake.recordId, { componentId: e.target.value })}
                        className="editable-cell px-1.5 py-0.5 rounded w-full font-mono text-[12px]"
                      />
                    </td>

                    {/* Linked Product ID (Calc) */}
                    <td className="py-2.5 px-3 font-mono text-[11px] text-[var(--color-muted)]">
                      {intake.linkedProductId}
                    </td>

                    {/* Gross Wt */}
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        step="0.1"
                        value={intake.declaredTotalWeightG}
                        onChange={(e) =>
                          onUpdateIntake(intake.recordId, { declaredTotalWeightG: parseFloat(e.target.value) || 0 })
                        }
                        className={`editable-cell px-1.5 py-0.5 rounded w-full text-right font-mono text-[12px] ${
                          hasWeightDiscrepancy ? 'text-[var(--color-negative)] font-bold' : ''
                        }`}
                      />
                    </td>

                    {/* Main Wt */}
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        step="0.1"
                        value={intake.mainMaterialWeightG}
                        onChange={(e) =>
                          onUpdateIntake(intake.recordId, { mainMaterialWeightG: parseFloat(e.target.value) || 0 })
                        }
                        className="editable-cell px-1.5 py-0.5 rounded w-full text-right font-mono text-[12px]"
                      />
                    </td>

                    {/* Sub Wt */}
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        step="0.1"
                        value={intake.subsidiaryMaterialWeightG}
                        onChange={(e) =>
                          onUpdateIntake(intake.recordId, { subsidiaryMaterialWeightG: parseFloat(e.target.value) || 0 })
                        }
                        className="editable-cell px-1.5 py-0.5 rounded w-full text-right font-mono text-[12px]"
                      />
                    </td>

                    {/* Sum Wt (Calc) */}
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums text-[12px] font-medium text-[var(--color-primary)]">
                      <div className="flex items-center justify-end gap-1">
                        <span>{intake.breakdownTotalWeightG.toFixed(1)}g</span>
                        {hasWeightDiscrepancy && (
                          <span title="Weight deviation exceeds tolerance">
                            <AlertTriangle className="w-3.5 h-3.5 text-[var(--color-negative)] shrink-0" />
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Outer Vol */}
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        step="1"
                        value={intake.outerVolumeCm3}
                        onChange={(e) =>
                          onUpdateIntake(intake.recordId, { outerVolumeCm3: parseFloat(e.target.value) || 0 })
                        }
                        className="editable-cell px-1.5 py-0.5 rounded w-full text-right font-mono text-[12px]"
                      />
                    </td>

                    {/* Inner Vol */}
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        step="1"
                        value={intake.innerItemVolumeCm3}
                        onChange={(e) =>
                          onUpdateIntake(intake.recordId, { innerItemVolumeCm3: parseFloat(e.target.value) || 0 })
                        }
                        className="editable-cell px-1.5 py-0.5 rounded w-full text-right font-mono text-[12px]"
                      />
                    </td>

                    {/* Void Space Ratio (Calc) */}
                    <td className="py-2.5 px-3">
                      <DataBar
                        value={Number((intake.voidSpaceRatio * 100).toFixed(1))}
                        max={100}
                        highlightExceeded={intake.linkedTier === 'Transport Packaging'}
                        threshold={parameters.maxTransportVoidRatio * 100}
                        width="w-16"
                      />
                    </td>

                    {/* Heavy Metals PPM */}
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        step="0.1"
                        placeholder="N/A"
                        value={intake.heavyMetalsPpm ?? ''}
                        onChange={(e) => {
                          const val = e.target.value === '' ? null : parseFloat(e.target.value);
                          onUpdateIntake(intake.recordId, { heavyMetalsPpm: val });
                        }}
                        className={`editable-cell px-1.5 py-0.5 rounded w-full text-right font-mono text-[12px] ${
                          isHeavyMetalsBreached ? 'text-[var(--color-negative)] font-bold' : ''
                        }`}
                      />
                    </td>

                    {/* PCR Ratio */}
                    <td className="py-2.5 px-3">
                      <input
                        type="number"
                        step="0.05"
                        min="0"
                        max="1"
                        value={intake.pcrRatio}
                        onChange={(e) =>
                          onUpdateIntake(intake.recordId, { pcrRatio: parseFloat(e.target.value) || 0 })
                        }
                        className="editable-cell px-1.5 py-0.5 rounded w-full font-mono text-[12px]"
                      />
                    </td>

                    {/* Declaration ID */}
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        placeholder="DOC-..."
                        value={intake.supplierDeclarationDocId}
                        onChange={(e) =>
                          onUpdateIntake(intake.recordId, { supplierDeclarationDocId: e.target.value })
                        }
                        className="editable-cell px-1.5 py-0.5 rounded w-full font-mono text-[11px]"
                      />
                    </td>

                    {/* Lab Report ID */}
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        placeholder="RPT-..."
                        value={intake.labTestReportDocId}
                        onChange={(e) =>
                          onUpdateIntake(intake.recordId, { labTestReportDocId: e.target.value })
                        }
                        className="editable-cell px-1.5 py-0.5 rounded w-full font-mono text-[11px]"
                      />
                    </td>

                    {/* Foreign Quote */}
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <input
                          type="number"
                          step="10"
                          value={intake.supplementaryTestQuoteForeign}
                          onChange={(e) =>
                            onUpdateIntake(intake.recordId, { supplementaryTestQuoteForeign: parseFloat(e.target.value) || 0 })
                          }
                          className="editable-cell px-1 py-0.5 rounded w-20 text-right font-mono text-[12px]"
                        />
                        <span className="text-[10px] text-[var(--color-muted)] font-mono">{intake.foreignCurrencyCode}</span>
                      </div>
                    </td>

                    {/* Base Cost (Calc) */}
                    <td className="py-2.5 px-3 text-right font-mono font-semibold text-[var(--color-primary)] text-[12px]">
                      {parameters.currencySymbol}
                      {intake.supplementaryTestCostBase.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>

                    {/* Sub Date */}
                    <td className="py-2.5 px-3 font-mono text-[11px]">
                      <input
                        type="date"
                        value={intake.submissionDate}
                        onChange={(e) => onUpdateIntake(intake.recordId, { submissionDate: e.target.value })}
                        className="editable-cell px-1 py-0.5 rounded font-mono text-[11px]"
                      />
                    </td>

                    {/* Action */}
                    <td className="py-2.5 px-2 text-center">
                      <button
                        onClick={() => onDeleteIntake(intake.recordId)}
                        title="Delete intake record"
                        className="p-1 text-gray-300 hover:text-[var(--color-negative)] transition-colors rounded cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Intake Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(5,28,44,0.45)] backdrop-blur-sm animate-fade-up">
          <div className="bg-white rounded-xl shadow-[var(--shadow-lg)] max-w-lg w-full p-6 space-y-4 border border-[var(--color-border)]">
            <h3 className="font-heading font-semibold text-lg text-[var(--color-primary)]">
              Register Manufacturer Data Intake
            </h3>
            <form onSubmit={handleSaveNewIntake} className="space-y-3 text-[12px]">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--color-muted)] font-medium mb-1">Record ID</label>
                  <input
                    type="text"
                    required
                    value={newIntake.recordId}
                    onChange={(e) => setNewIntake({ ...newIntake, recordId: e.target.value })}
                    className="w-full px-3 py-1.5 rounded border border-gray-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[var(--color-muted)] font-medium mb-1">Target Component ID</label>
                  <input
                    type="text"
                    required
                    value={newIntake.componentId}
                    onChange={(e) => setNewIntake({ ...newIntake, componentId: e.target.value })}
                    className="w-full px-3 py-1.5 rounded border border-gray-200 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[var(--color-muted)] font-medium mb-1">Declared Gross (g)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newIntake.declaredTotalWeightG}
                    onChange={(e) => setNewIntake({ ...newIntake, declaredTotalWeightG: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-1.5 rounded border border-gray-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[var(--color-muted)] font-medium mb-1">Main Material (g)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newIntake.mainMaterialWeightG}
                    onChange={(e) => setNewIntake({ ...newIntake, mainMaterialWeightG: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-1.5 rounded border border-gray-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[var(--color-muted)] font-medium mb-1">Auxiliary (g)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newIntake.subsidiaryMaterialWeightG}
                    onChange={(e) => setNewIntake({ ...newIntake, subsidiaryMaterialWeightG: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-1.5 rounded border border-gray-200 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--color-muted)] font-medium mb-1">Outer Volume (cm³)</label>
                  <input
                    type="number"
                    step="1"
                    required
                    value={newIntake.outerVolumeCm3}
                    onChange={(e) => setNewIntake({ ...newIntake, outerVolumeCm3: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-1.5 rounded border border-gray-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[var(--color-muted)] font-medium mb-1">Inner Item Volume (cm³)</label>
                  <input
                    type="number"
                    step="1"
                    required
                    value={newIntake.innerItemVolumeCm3}
                    onChange={(e) => setNewIntake({ ...newIntake, innerItemVolumeCm3: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-1.5 rounded border border-gray-200 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--color-muted)] font-medium mb-1">Heavy Metals (PPM)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Leave empty if missing"
                    value={newIntake.heavyMetalsPpm ?? ''}
                    onChange={(e) => setNewIntake({ ...newIntake, heavyMetalsPpm: e.target.value === '' ? null : parseFloat(e.target.value) })}
                    className="w-full px-3 py-1.5 rounded border border-gray-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[var(--color-muted)] font-medium mb-1">PCR Recycled Content Ratio (0-1)</label>
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    max="1"
                    value={newIntake.pcrRatio}
                    onChange={(e) => setNewIntake({ ...newIntake, pcrRatio: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-1.5 rounded border border-gray-200 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--color-muted)] font-medium mb-1">Supplier Declaration ID</label>
                  <input
                    type="text"
                    placeholder="DOC-..."
                    value={newIntake.supplierDeclarationDocId}
                    onChange={(e) => setNewIntake({ ...newIntake, supplierDeclarationDocId: e.target.value })}
                    className="w-full px-3 py-1.5 rounded border border-gray-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[var(--color-muted)] font-medium mb-1">Lab Test Report ID</label>
                  <input
                    type="text"
                    placeholder="RPT-..."
                    value={newIntake.labTestReportDocId}
                    onChange={(e) => setNewIntake({ ...newIntake, labTestReportDocId: e.target.value })}
                    className="w-full px-3 py-1.5 rounded border border-gray-200 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-[12px] rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-[12px] font-semibold text-white bg-[var(--color-accent)] rounded-lg hover:opacity-90 shadow-sm"
                >
                  Save Intake Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
