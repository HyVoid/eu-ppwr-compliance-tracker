import React, { useState } from 'react';
import {
  ComputedEvidenceCheck,
  ExpertAuditRecord,
  ExpertEvidenceConclusion,
  GlobalParameters,
} from '../../types/ppwr';
import { StatusBadge } from '../StatusBadge';
import { InsightBlock } from '../InsightBlock';
import {
  CheckSquare,
  Search,
  Filter,
  Download,
  ShieldCheck,
  Cpu,
  UserCheck,
} from 'lucide-react';
import { arrayToCSV, downloadCSV } from '../../utils/csvHelper';

interface Sheet04EvidenceCheckProps {
  computedChecks: ComputedEvidenceCheck[];
  parameters: GlobalParameters;
  onUpdateAudit: (componentId: string, updated: Partial<ExpertAuditRecord>) => void;
}

export const Sheet04EvidenceCheck: React.FC<Sheet04EvidenceCheckProps> = ({
  computedChecks,
  parameters,
  onUpdateAudit,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredChecks = computedChecks.filter((c) => {
    if (statusFilter !== 'ALL' && c.finalComplianceStatus !== statusFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        c.componentId.toLowerCase().includes(q) ||
        c.productName.toLowerCase().includes(q) ||
        c.componentName.toLowerCase().includes(q) ||
        c.machineDiagnostic.toLowerCase().includes(q) ||
        c.finalComplianceStatus.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleExportCSV = () => {
    const header = [
      'componentId',
      'product',
      'componentName',
      'tier',
      'mandatoryCompleteness',
      'weightConsistency',
      'heavyMetalsScreening',
      'voidSpaceScreening',
      'evidenceIndexStatus',
      'machineDiagnostic',
      'expertConclusion',
      'auditRuleVersion',
      'auditorNameDate',
      'expertNotes',
      'finalComplianceStatus',
    ];
    const rows = filteredChecks.map((c) => [
      c.componentId,
      `${c.productId} | ${c.productName}`,
      c.componentName,
      c.tier,
      c.mandatoryCompleteness,
      c.weightConsistency,
      c.heavyMetalsScreening,
      c.voidSpaceScreening,
      c.evidenceIndexStatus,
      c.machineDiagnostic,
      c.expertConclusion,
      c.auditRuleVersion,
      c.auditorNameDate,
      c.expertNotes,
      c.finalComplianceStatus,
    ]);
    downloadCSV('sheet04_evidence_audit_engine.csv', arrayToCSV([header, ...rows]));
  };

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Insight */}
      <InsightBlock
        title="Dual-Track Evidence Quality & Regulatory Audit Engine (Sheet 04)"
        actionButton={
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-[var(--color-primary)] bg-white border border-[var(--color-border)] rounded-md hover:bg-gray-50 transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        }
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-2 font-mono text-[12px]">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="font-semibold text-[var(--color-primary)]">Left Zone (Cols A–H):</span>
            <span className="text-[var(--color-muted)]">Automated Machine Diagnostic</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[12px]">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="font-semibold text-[var(--color-primary)]">Right Zone (Cols I–L):</span>
            <span className="text-[var(--color-muted)]">Independent Expert Legal Review</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[12px]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="font-semibold text-[var(--color-primary)]">Col M:</span>
            <span className="text-[var(--color-muted)]">Synthesized Compliance Status</span>
          </div>
        </div>
        <div className="mt-1 text-[12px] opacity-80">
          Rule-Version Synchronization: If the active approved rule version is bumped from {parameters.activeRuleVersion}, any historical audits will automatically trigger a mandatory re-review flag.
        </div>
      </InsightBlock>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-[var(--shadow-sm)] border border-[var(--color-border)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search component, product, diagnostic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-[12px] rounded-lg border border-gray-200 focus:outline-none focus:border-[var(--color-accent)]"
            />
          </div>

          <div className="flex items-center gap-1.5 text-[12px]">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[var(--color-muted)] font-medium">Final Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1 text-[12px] rounded-md border border-gray-200 bg-white font-medium"
            >
              <option value="ALL">All Compliance States</option>
              <option value="Verified Compliant with Requirements">Verified Compliant</option>
              <option value="Under Review">Under Review</option>
              <option value="Insufficient Evidence">Insufficient Evidence</option>
              <option value="Non-compliance Identified">Non-compliance Identified</option>
              <option value="Pending Review">Pending Review</option>
            </select>
          </div>
        </div>

        <div className="text-[12px] font-mono text-[var(--color-muted)]">
          Audited Components: <span className="font-semibold text-[var(--color-primary)]">{filteredChecks.length}</span> / {computedChecks.length}
        </div>
      </div>

      {/* Main Dual-Zone Table */}
      <div className="bg-white rounded-xl shadow-[var(--shadow-md)] overflow-hidden border border-[var(--color-border)] card-lift">
        <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-[var(--color-accent)]" />
            <div>
              <h2 className="font-heading font-semibold text-lg text-[var(--color-primary)]">
                Data Quality & Compliance Evidence Audit Engine Table (A2:M500)
              </h2>
              <p className="text-[12px] text-[var(--color-muted)]">
                Left (A-H): Automated Formula Checks · Right (I-L): Expert Input in Yellow · Col M: Synthesized Final Status
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              {/* Dual Zone Header Band */}
              <tr className="border-b border-gray-200 text-[10px] font-mono uppercase tracking-wider">
                <th colSpan={7} className="py-1 px-4 bg-[rgba(5,28,44,0.03)] text-[var(--color-primary)]">
                  <span className="inline-flex items-center gap-1 font-semibold">
                    <Cpu className="w-3.5 h-3.5 text-blue-600" />
                    Automated Machine Quality Diagnostic Zone (Formula Generated)
                  </span>
                </th>
                <th colSpan={4} className="py-1 px-4 bg-[rgba(255,253,231,0.8)] text-amber-900 border-l border-r border-amber-200">
                  <span className="inline-flex items-center gap-1 font-semibold">
                    <UserCheck className="w-3.5 h-3.5 text-amber-700" />
                    Regulatory Expert Manual Audit Zone (Editable Inputs)
                  </span>
                </th>
                <th className="py-1 px-4 bg-[rgba(5,28,44,0.05)] text-[var(--color-primary)] font-semibold">
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    Final Result
                  </span>
                </th>
              </tr>

              {/* Column Level Header */}
              <tr className="bg-[var(--table-header-bg)] border-b border-[var(--table-header-sep)] text-[var(--color-primary)] text-[11px] tracking-table-head uppercase font-semibold">
                <th className="py-3 px-3 w-20">Comp ID</th>
                <th className="py-3 px-3 w-36">Product</th>
                <th className="py-3 px-3 w-32">Completeness</th>
                <th className="py-3 px-3 w-32">Weight Logic</th>
                <th className="py-3 px-3 w-32">Heavy Metals</th>
                <th className="py-3 px-3 w-32">Void Space</th>
                <th className="py-3 px-3 w-44">Machine Diagnostic</th>
                {/* Expert Zone */}
                <th className="py-3 px-3 w-48 border-l border-amber-200 bg-[rgba(255,253,231,0.5)]">Expert Conclusion</th>
                <th className="py-3 px-3 w-24 bg-[rgba(255,253,231,0.5)]">Rule Ver</th>
                <th className="py-3 px-3 w-40 bg-[rgba(255,253,231,0.5)]">Auditor & Date</th>
                <th className="py-3 px-3 border-r border-amber-200 bg-[rgba(255,253,231,0.5)]">Expert Assessment Notes</th>
                {/* Final Combined */}
                <th className="py-3 px-3 w-48">Final Compliance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filteredChecks.map((item) => (
                <tr
                  key={item.componentId}
                  className={`hover:bg-[rgba(5,28,44,0.02)] transition-colors ${
                    item.isAnomaly ? 'anomaly-row' : ''
                  }`}
                >
                  {/* Comp ID */}
                  <td className="py-2.5 px-3 font-mono font-semibold text-[12px] text-[var(--color-primary)]">
                    {item.componentId}
                  </td>

                  {/* Product */}
                  <td className="py-2.5 px-3">
                    <div className="font-mono text-[11px] text-[var(--color-muted)]">{item.productId}</div>
                    <div className="font-medium text-[12px] text-[var(--color-primary)] truncate max-w-[130px]" title={item.productName}>
                      {item.productName}
                    </div>
                  </td>

                  {/* Completeness */}
                  <td className="py-2.5 px-3">
                    <StatusBadge status={item.mandatoryCompleteness} size="sm" />
                  </td>

                  {/* Weight Logic */}
                  <td className="py-2.5 px-3">
                    <StatusBadge status={item.weightConsistency} size="sm" />
                    {item.weightDeviationPct > 0 && (
                      <div className="text-[10px] font-mono text-[var(--color-muted)] mt-0.5">
                        Dev: {item.weightDeviationPct}%
                      </div>
                    )}
                  </td>

                  {/* Heavy Metals */}
                  <td className="py-2.5 px-3">
                    <StatusBadge status={item.heavyMetalsScreening} size="sm" />
                    {item.heavyMetalsValue !== null && (
                      <div className="text-[10px] font-mono text-[var(--color-muted)] mt-0.5">
                        {item.heavyMetalsValue} PPM
                      </div>
                    )}
                  </td>

                  {/* Void Space */}
                  <td className="py-2.5 px-3">
                    <StatusBadge status={item.voidSpaceScreening} size="sm" />
                    {item.tier !== 'Primary Packaging' && (
                      <div className="text-[10px] font-mono text-[var(--color-muted)] mt-0.5">
                        Ratio: {item.voidSpaceValue}%
                      </div>
                    )}
                  </td>

                  {/* Machine Diagnostic */}
                  <td className="py-2.5 px-3">
                    <StatusBadge status={item.machineDiagnostic} size="sm" />
                  </td>

                  {/* Expert Conclusion (Editable in Yellow) */}
                  <td className="py-2.5 px-3 border-l border-amber-200 bg-[rgba(255,253,231,0.3)]">
                    <select
                      value={item.expertConclusion}
                      onChange={(e) =>
                        onUpdateAudit(item.componentId, {
                          expertConclusion: e.target.value as ExpertEvidenceConclusion,
                        })
                      }
                      className="editable-cell px-2 py-1 rounded w-full text-[12px] font-semibold text-[var(--color-primary)]"
                    >
                      <option value="Pending Review">Pending Review</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Insufficient Evidence">Insufficient Evidence</option>
                      <option value="Non-compliance Identified">Non-compliance Identified</option>
                      <option value="Verified Compliant with Requirements">Verified Compliant</option>
                    </select>
                  </td>

                  {/* Rule Ver */}
                  <td className="py-2.5 px-3 bg-[rgba(255,253,231,0.3)] font-mono text-[11px]">
                    <input
                      type="text"
                      value={item.auditRuleVersion}
                      onChange={(e) =>
                        onUpdateAudit(item.componentId, { auditRuleVersion: e.target.value })
                      }
                      className="editable-cell px-1.5 py-0.5 rounded w-full font-mono text-[11px]"
                    />
                  </td>

                  {/* Auditor & Date */}
                  <td className="py-2.5 px-3 bg-[rgba(255,253,231,0.3)] text-[11px]">
                    <input
                      type="text"
                      placeholder="e.g. M. Vance 2026-08-15"
                      value={item.auditorNameDate}
                      onChange={(e) =>
                        onUpdateAudit(item.componentId, { auditorNameDate: e.target.value })
                      }
                      className="editable-cell px-1.5 py-0.5 rounded w-full text-[11px]"
                    />
                  </td>

                  {/* Notes */}
                  <td className="py-2.5 px-3 border-r border-amber-200 bg-[rgba(255,253,231,0.3)] text-[12px]">
                    <input
                      type="text"
                      placeholder="Audit commentary..."
                      value={item.expertNotes}
                      onChange={(e) =>
                        onUpdateAudit(item.componentId, { expertNotes: e.target.value })
                      }
                      className="editable-cell px-1.5 py-0.5 rounded w-full text-[12px]"
                    />
                  </td>

                  {/* Final Compliance Status */}
                  <td className="py-2.5 px-3">
                    <StatusBadge
                      status={item.finalComplianceStatus}
                      size="md"
                      isInteractive
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
