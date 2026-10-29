import React, { useState } from 'react';
import {
  ComputedDeliveryProduct,
  ComputedComplianceGap,
  DeliveryProduct,
  DocOrganizationMethod,
  AuthorizedSignerConfirmation,
  GlobalParameters,
} from '../../types/ppwr';
import { StatusBadge } from '../StatusBadge';
import { InsightBlock } from '../InsightBlock';
import { DataBar } from '../DataBar';
import {
  Award,
  ShieldAlert,
  Download,
  AlertTriangle,
  Clock,
  CheckCircle,
  FileText,
} from 'lucide-react';
import { arrayToCSV, downloadCSV } from '../../utils/csvHelper';

import { ActiveTab } from '../Header';

interface Sheet06DocIndexProps {
  computedDeliveries: ComputedDeliveryProduct[];
  topUrgentGaps: ComputedComplianceGap[];
  parameters: GlobalParameters;
  onUpdateDelivery: (productId: string, updated: Partial<DeliveryProduct>) => void;
  onSelectTab: (tab: ActiveTab) => void;
}

export const Sheet06DocIndex: React.FC<Sheet06DocIndexProps> = ({
  computedDeliveries,
  topUrgentGaps,
  parameters,
  onUpdateDelivery,
  onSelectTab,
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const blockedProducts = computedDeliveries.filter((d) => d.isBlockedByInterlock);
  const fullySignedProducts = computedDeliveries.filter(
    (d) => d.dimension3_DeliveryStatus === 'Fully Executed & Signed'
  );
  const readyProducts = computedDeliveries.filter(
    (d) => d.dimension3_DeliveryStatus === 'Ready for Signature'
  );

  const handleExportCSV = () => {
    const header = [
      'productId',
      'productName',
      'legalEntitySigner',
      'techDossierArchiveId',
      'draftDocNumberVersion',
      'docOrganizationMethod',
      'authorizedSignerConfirmation',
      'totalManagedComponents',
      'submittedDataComponents',
      'dataCompletenessPct',
      'dimension1_DataStatus',
      'expertApprovedComponents',
      'blockingOpenGapsCount',
      'overdueOrUrgentActionsCount',
      'dimension2_AuditStatus',
      'accumulatedCostBase',
      'budgetStatus',
      'dimension3_DeliveryStatus',
    ];
    const rows = computedDeliveries.map((d) => [
      d.productId,
      d.productName,
      d.legalEntitySigner,
      d.techDossierArchiveId,
      d.draftDocNumberVersion,
      d.docOrganizationMethod,
      d.authorizedSignerConfirmation,
      d.totalManagedComponents,
      d.submittedDataComponents,
      d.dataCompletenessPct,
      d.dimension1_DataStatus,
      d.expertApprovedComponents,
      d.blockingOpenGapsCount,
      d.overdueOrUrgentActionsCount,
      d.dimension2_AuditStatus,
      d.accumulatedCostBase,
      d.budgetStatus,
      d.dimension3_DeliveryStatus,
    ]);
    downloadCSV('sheet06_delivery_doc_readiness_index.csv', arrayToCSV([header, ...rows]));
  };

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Critical Interlock Warning Alert if any product is falsely marked signed */}
      {blockedProducts.length > 0 && (
        <div className="p-4 rounded-xl bg-[rgba(211,47,47,0.08)] border border-[rgba(211,47,47,0.3)] shadow-[var(--shadow-sm)] flex items-start gap-3 text-[13px] text-[var(--color-negative)] animate-fade-up">
          <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-semibold text-[14px]">
              CRITICAL SAFETY INTERLOCK ACTIVATED ({blockedProducts.length} Product Blocked)
            </div>
            <p className="opacity-95 leading-relaxed">
              Product <strong>{blockedProducts.map((p) => p.productId).join(', ')}</strong> was marked as &quot;Fully Executed &amp; Signed&quot;, but the regulatory evidence audit has NOT achieved &quot;Verified Compliant with Requirements&quot; or contains active blocking compliance gaps.
              Under EU PPWR Article 14, executing an EU Declaration of Conformity without verified technical evidence constitutes a non-compliant legal violation. The system has automatically overridden the delivery status to:
              <span className="font-mono font-bold block mt-1">BLOCKED: Evidence Incomplete - Signing Prohibited</span>
            </p>
          </div>
        </div>
      )}

      {/* Top Banner Insight */}
      <InsightBlock
        title="Three-Dimensional Delivery Readiness Model (Sheet 06)"
        actionButton={
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-[var(--color-primary)] bg-white border border-[var(--color-border)] rounded-md hover:bg-gray-50 transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Dashboard CSV</span>
          </button>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[12px] mt-1">
          <div className="bg-white/80 p-2.5 rounded border border-gray-200">
            <span className="font-semibold text-[var(--color-primary)] block">Dim 1: Data Status</span>
            <span className="text-[var(--color-muted)]">Measures raw supplier intake completeness against threshold ({parameters.dataCompletenessThreshold * 100}%).</span>
          </div>
          <div className="bg-white/80 p-2.5 rounded border border-gray-200">
            <span className="font-semibold text-[var(--color-primary)] block">Dim 2: Compliance Audit</span>
            <span className="text-[var(--color-muted)]">Requires 100% components verified by experts &amp; 0 blocking open gaps.</span>
          </div>
          <div className="bg-white/80 p-2.5 rounded border border-gray-200">
            <span className="font-semibold text-[var(--color-primary)] block">Dim 3: Delivery &amp; DoC Execution</span>
            <span className="text-[var(--color-muted)]">Protected by automated safety interlocks against premature legal signatures.</span>
          </div>
        </div>
      </InsightBlock>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)] card-lift">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-muted)]">
            Total Target Products
          </div>
          <div className="font-heading font-semibold text-3xl text-[var(--color-primary)] mt-1 tracking-display tabular-nums">
            {computedDeliveries.length}
          </div>
          <div className="text-[11px] text-[var(--color-muted)] mt-1">
            29 Managed Packaging Components
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)] card-lift">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-muted)]">
            Fully Executed &amp; Signed
          </div>
          <div className="font-heading font-semibold text-3xl text-[var(--color-accent)] mt-1 tracking-display tabular-nums">
            {fullySignedProducts.length}
          </div>
          <div className="text-[11px] text-[var(--color-muted)] mt-1">
            EU DoC Officially Executed
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)] card-lift">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-muted)]">
            Ready for Signatory
          </div>
          <div className="font-heading font-semibold text-3xl text-[var(--color-primary)] mt-1 tracking-display tabular-nums">
            {readyProducts.length}
          </div>
          <div className="text-[11px] text-[var(--color-muted)] mt-1">
            Technical Dossier Complete
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)] card-lift">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-muted)]">
            Interlock Blocked Alarms
          </div>
          <div className="font-heading font-semibold text-3xl text-[var(--color-negative)] mt-1 tracking-display tabular-nums">
            {blockedProducts.length}
          </div>
          <div className="text-[11px] text-[var(--color-muted)] mt-1">
            Audit Preconditions Unmet
          </div>
        </div>
      </div>

      {/* Main Delivery Table */}
      <div className="bg-white rounded-xl shadow-[var(--shadow-md)] overflow-hidden border border-[var(--color-border)] card-lift">
        <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[var(--color-accent)]" />
            <div>
              <h2 className="font-heading font-semibold text-lg text-[var(--color-primary)]">
                Product Delivery Status &amp; EU DoC Dossier Index (A2:Q50)
              </h2>
              <p className="text-[12px] text-[var(--color-muted)]">
                Columns B-E: Archival Identifiers (Editable in Yellow) · Columns F-Q: Three-Dimensional Status and Safety Interlock
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-[var(--table-header-bg)] border-b border-[var(--table-header-sep)] text-[var(--color-primary)] text-[11px] tracking-table-head uppercase font-semibold">
                <th className="py-3 px-3 w-20">Product ID</th>
                <th className="py-3 px-3 w-48">Product &amp; EU Entity</th>
                <th className="py-3 px-3 w-36">Tech Dossier ID</th>
                <th className="py-3 px-3 w-36">Draft DoC ID</th>
                <th className="py-3 px-3 w-40">DoC Scope Org</th>
                <th className="py-3 px-3 w-44">Legal Signer Confirmation</th>
                <th className="py-3 px-3 w-32">Data Completeness</th>
                <th className="py-3 px-3 w-32">Dim 1: Data Status</th>
                <th className="py-3 px-3 w-20 text-center">Approved</th>
                <th className="py-3 px-3 w-20 text-center">Block Gaps</th>
                <th className="py-3 px-3 w-40">Dim 2: Compliance Audit</th>
                <th className="py-3 px-3 w-32 text-right">Costs ({parameters.currencySymbol})</th>
                <th className="py-3 px-3 w-44">Budget Cap Status</th>
                <th className="py-3 px-3 w-48 font-bold">Dim 3: Delivery Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {computedDeliveries.map((item) => {
                const isSelected = selectedProductId === item.productId;
                return (
                  <tr
                    key={item.productId}
                    onClick={() => setSelectedProductId(isSelected ? null : item.productId)}
                    className={`hover:bg-[rgba(5,28,44,0.02)] transition-colors cursor-pointer ${
                      item.isBlockedByInterlock ? 'anomaly-row' : ''
                    } ${isSelected ? 'bg-[rgba(34,81,255,0.03)]' : ''}`}
                  >
                    {/* Product ID */}
                    <td className="py-2.5 px-3 font-mono font-bold text-[12px] text-[var(--color-primary)]">
                      {item.productId}
                    </td>

                    {/* Product Name & Entity */}
                    <td className="py-2.5 px-3">
                      <div className="font-medium text-[var(--color-primary)] text-[12px]">{item.productName}</div>
                      <div className="text-[10px] text-[var(--color-muted)] mt-0.5 truncate max-w-[180px]">
                        {item.legalEntitySigner}
                      </div>
                    </td>

                    {/* Tech Dossier ID */}
                    <td className="py-2.5 px-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="text"
                        placeholder="TD-2026-..."
                        value={item.techDossierArchiveId}
                        onChange={(e) =>
                          onUpdateDelivery(item.productId, { techDossierArchiveId: e.target.value })
                        }
                        className="editable-cell px-1.5 py-0.5 rounded w-full font-mono text-[11px]"
                      />
                    </td>

                    {/* Draft DoC ID */}
                    <td className="py-2.5 px-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="text"
                        placeholder="EU-DOC-..."
                        value={item.draftDocNumberVersion}
                        onChange={(e) =>
                          onUpdateDelivery(item.productId, { draftDocNumberVersion: e.target.value })
                        }
                        className="editable-cell px-1.5 py-0.5 rounded w-full font-mono text-[11px]"
                      />
                    </td>

                    {/* DoC Org Method */}
                    <td className="py-2.5 px-3" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={item.docOrganizationMethod}
                        onChange={(e) =>
                          onUpdateDelivery(item.productId, {
                            docOrganizationMethod: e.target.value as DocOrganizationMethod,
                          })
                        }
                        className="editable-cell px-1.5 py-0.5 rounded w-full text-[11px]"
                      >
                        <option value="Consolidated Single Product Declaration">Consolidated Single</option>
                        <option value="Split Primary & Transport Declarations">Split Primary/Transport</option>
                        <option value="Pending Regulatory Confirmation">Pending Confirmation</option>
                      </select>
                    </td>

                    {/* Legal Signer Confirmation */}
                    <td className="py-2.5 px-3" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={item.authorizedSignerConfirmation}
                        onChange={(e) =>
                          onUpdateDelivery(item.productId, {
                            authorizedSignerConfirmation: e.target.value as AuthorizedSignerConfirmation,
                          })
                        }
                        className={`editable-cell px-2 py-1 rounded w-full text-[11px] font-semibold ${
                          item.authorizedSignerConfirmation === 'Fully Executed & Signed'
                            ? 'text-[var(--color-primary)]'
                            : 'text-[var(--color-muted)]'
                        }`}
                      >
                        <option value="Not Signed">Not Signed</option>
                        <option value="Pending Authorized Signatory">Pending Authorized Signatory</option>
                        <option value="Fully Executed & Signed">Fully Executed & Signed</option>
                      </select>
                    </td>

                    {/* Completeness Data Bar */}
                    <td className="py-2.5 px-3">
                      <DataBar
                        value={item.dataCompletenessPct}
                        max={100}
                        label={`${item.submittedDataComponents}/${item.totalManagedComponents} (${item.dataCompletenessPct}%)`}
                        width="w-16"
                      />
                    </td>

                    {/* Dim 1: Data Status */}
                    <td className="py-2.5 px-3">
                      <StatusBadge status={item.dimension1_DataStatus} size="sm" />
                    </td>

                    {/* Approved Components Count */}
                    <td className="py-2.5 px-3 text-center font-mono font-medium text-[var(--color-primary)]">
                      {item.expertApprovedComponents} / {item.totalManagedComponents}
                    </td>

                    {/* Blocking Gaps Count */}
                    <td className="py-2.5 px-3 text-center font-mono font-bold tabular-nums">
                      <span className={item.blockingOpenGapsCount > 0 ? 'text-[var(--color-negative)]' : 'text-[var(--color-muted)]'}>
                        {item.blockingOpenGapsCount}
                      </span>
                    </td>

                    {/* Dim 2: Compliance Audit Status */}
                    <td className="py-2.5 px-3">
                      <StatusBadge status={item.dimension2_AuditStatus} size="sm" />
                    </td>

                    {/* Accumulated Cost Base */}
                    <td className="py-2.5 px-3 text-right font-mono text-[12px] font-medium text-[var(--color-primary)]">
                      {parameters.currencySymbol}
                      {item.accumulatedCostBase.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>

                    {/* Budget Cap Status */}
                    <td className="py-2.5 px-3 text-[11px]">
                      <StatusBadge status={item.budgetStatus} size="sm" />
                    </td>

                    {/* Dim 3: Final Delivery Status (WITH INTERLOCK) */}
                    <td className="py-2.5 px-3 font-semibold">
                      <StatusBadge
                        status={item.dimension3_DeliveryStatus}
                        size="md"
                        isInteractive
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* High-Priority Open Gaps Dynamic Matrix (S3# Dynamic Array Replica) */}
      <div className="bg-white rounded-xl shadow-[var(--shadow-md)] overflow-hidden border border-[var(--color-border)] card-lift">
        <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[var(--color-negative)]" />
            <div>
              <h2 className="font-heading font-semibold text-lg text-[var(--color-primary)]">
                High-Priority Escalation Action List (Sheet 06 S3# Matrix)
              </h2>
              <p className="text-[12px] text-[var(--color-muted)]">
                Dynamic live array of unclosed remediation gaps sorted by urgency (remaining days ascending).
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectTab('05_gaps')}
            className="text-[12px] font-semibold text-[var(--color-accent)] hover:underline cursor-pointer"
          >
            Manage Gaps in Log →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-[var(--table-header-bg)] border-b border-[var(--table-header-sep)] text-[var(--color-primary)] text-[11px] tracking-table-head uppercase font-semibold">
                <th className="py-3 px-4 w-24">Gap ID</th>
                <th className="py-3 px-4 w-24">Product</th>
                <th className="py-3 px-4 w-28">Component</th>
                <th className="py-3 px-4">Problem Category &amp; Plan</th>
                <th className="py-3 px-4 w-40">Responsible Lead</th>
                <th className="py-3 px-4 w-28 text-center">Remaining Days</th>
                <th className="py-3 px-4 w-44">Escalation Status</th>
                <th className="py-3 px-4 w-36">DoC Blocking</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {topUrgentGaps.map((gap) => {
                const isOverdue = gap.escalationWarning === 'Overdue - Immediate Escalation';
                return (
                  <tr
                    key={gap.gapId}
                    className={`hover:bg-[rgba(5,28,44,0.02)] transition-colors ${
                      isOverdue ? 'anomaly-row' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-mono font-bold text-[12px] text-[var(--color-primary)]">
                      {gap.gapId}
                    </td>
                    <td className="py-3 px-4 font-mono text-[12px] text-[var(--color-primary)] font-medium">
                      {gap.linkedProductId}
                    </td>
                    <td className="py-3 px-4 font-mono text-[12px] text-[var(--color-muted)]">
                      {gap.componentId}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-[var(--color-primary)]">{gap.problemCategory}</div>
                      <div className="text-[11px] text-[var(--color-muted)] mt-0.5 line-clamp-1">
                        {gap.remediationAction || gap.gapDetails}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[12px] text-[var(--color-body-text)]">
                      {gap.assignee}
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-[13px] tabular-nums">
                      <span className={isOverdue ? 'text-[var(--color-negative)]' : 'text-[var(--color-primary)]'}>
                        {gap.remainingDays > 0 ? `+${gap.remainingDays} days` : `${gap.remainingDays} days`}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={gap.escalationWarning} size="sm" />
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={gap.blocksDoCSigning} size="sm" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
