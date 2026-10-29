import React from 'react';
import {
  ComputedDeliveryProduct,
  ComputedComplianceGap,
  ComputedPackagingComponentMaster,
  GlobalParameters,
} from '../types/ppwr';
import { StatusBadge } from './StatusBadge';
import { InsightBlock } from './InsightBlock';
import { DataBar } from './DataBar';
import {
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  FileCheck,
  Boxes,
  Lock,
} from 'lucide-react';
import { ActiveTab } from './Header';

interface ExecutiveSummaryProps {
  computedDeliveries: ComputedDeliveryProduct[];
  computedGaps: ComputedComplianceGap[];
  computedComponents: ComputedPackagingComponentMaster[];
  parameters: GlobalParameters;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({
  computedDeliveries,
  computedGaps,
  computedComponents,
  parameters,
  onNavigateTab,
}) => {
  const totalProducts = computedDeliveries.length;
  const fullySigned = computedDeliveries.filter((d) => d.dimension3_DeliveryStatus === 'Fully Executed & Signed').length;
  const readyForSign = computedDeliveries.filter((d) => d.dimension3_DeliveryStatus === 'Ready for Signature').length;
  const inProgress = computedDeliveries.filter((d) => d.dimension3_DeliveryStatus === 'In Progress').length;
  const blockedCount = computedDeliveries.filter((d) => d.isBlockedByInterlock).length;

  const openGaps = computedGaps.filter((g) => g.expertResolutionStatus !== 'Closed & Verified');
  const blockingGaps = openGaps.filter((g) => g.blocksDoCSigning === 'Blocks DoC Execution');
  const overdueGaps = openGaps.filter((g) => g.escalationWarning === 'Overdue - Immediate Escalation');
  const urgentGaps = openGaps.filter((g) => g.escalationWarning === 'Urgent Warning - Follow-up Required');

  const totalCost = computedDeliveries.reduce((acc, curr) => acc + curr.accumulatedCostBase, 0);

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Executive Hero Banner */}
      <InsightBlock
        title="Executive Compliance Readiness Briefing"
        actionButton={
          <button
            onClick={() => onNavigateTab('06_doc')}
            className="flex items-center gap-1.5 px-4 py-2 text-[12px] font-semibold text-white bg-[var(--color-accent)] rounded-lg hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
          >
            <span>Open Delivery Dossier</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        }
      >
        <div className="text-[13px] leading-relaxed">
          Operational briefing for <strong>10 target product portfolios</strong> preparing for European Union Packaging and Packaging Waste Regulation (PPWR).
          Currently <strong className="text-[var(--color-primary)]">{fullySigned} products</strong> have executed compliant EU Declarations of Conformity,
          <strong className="text-[var(--color-primary)]"> {readyForSign} products</strong> are pending authorized signature, and
          <strong className="text-[var(--color-primary)]"> {inProgress} products</strong> are actively closing technical documentation dossiers.
          {blockedCount > 0 && (
            <span className="text-[var(--color-negative)] font-semibold ml-1">
              Warning: {blockedCount} product is currently blocked by the safety interlock due to unverified evidence or limit breaches.
            </span>
          )}
        </div>
      </InsightBlock>

      {/* KPI Quad Grid (Apple HIG / Garamond Negative Tracking) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white p-5 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-md)] card-lift">
          <div className="flex items-center justify-between text-[var(--color-muted)]">
            <span className="text-[11px] font-semibold uppercase tracking-wider">DoC Legal Execution</span>
            <FileCheck className="w-4 h-4 text-[var(--color-accent)]" />
          </div>
          <div className="font-heading font-semibold text-4xl text-[var(--color-primary)] mt-2 tracking-display tabular-nums">
            {fullySigned} <span className="text-xl text-[var(--color-muted)] font-normal">/ {totalProducts}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-[var(--color-muted)] font-mono">
            <span>{Math.round((fullySigned / totalProducts) * 100)}% Execution Rate</span>
            <span>+{readyForSign} Pending Sign</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-5 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-md)] card-lift">
          <div className="flex items-center justify-between text-[var(--color-muted)]">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Managed Components</span>
            <Boxes className="w-4 h-4 text-[var(--color-accent)]" />
          </div>
          <div className="font-heading font-semibold text-4xl text-[var(--color-primary)] mt-2 tracking-display tabular-nums">
            {computedComponents.length}
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-[var(--color-muted)] font-mono">
            <span>Primary, Secondary, Transport</span>
            <span>100% BOM Tracked</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-5 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-md)] card-lift">
          <div className="flex items-center justify-between text-[var(--color-muted)]">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Active Blocking Gaps</span>
            <AlertTriangle className={`w-4 h-4 ${blockingGaps.length > 0 ? 'text-[var(--color-negative)]' : 'text-gray-400'}`} />
          </div>
          <div className={`font-heading font-semibold text-4xl mt-2 tracking-display tabular-nums ${blockingGaps.length > 0 ? 'text-[var(--color-negative)]' : 'text-[var(--color-primary)]'}`}>
            {blockingGaps.length}
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-[var(--color-muted)] font-mono">
            <span className={overdueGaps.length > 0 ? 'text-[var(--color-negative)] font-medium' : ''}>
              {overdueGaps.length} Overdue
            </span>
            <span>{urgentGaps.length} Urgent</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-5 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-md)] card-lift">
          <div className="flex items-center justify-between text-[var(--color-muted)]">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total Compliance Cost</span>
            <TrendingUp className="w-4 h-4 text-[var(--color-accent)]" />
          </div>
          <div className="font-heading font-semibold text-4xl text-[var(--color-primary)] mt-2 tracking-display tabular-nums">
            {parameters.currencySymbol}{Math.round(totalCost).toLocaleString('en-US')}
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-[var(--color-muted)] font-mono">
            <span>Tests &amp; Redesign BOM</span>
            <span>Cap: {parameters.currencySymbol}50,000</span>
          </div>
        </div>
      </div>

      {/* Portfolio Status Matrix Grid */}
      <div className="bg-white rounded-xl shadow-[var(--shadow-md)] overflow-hidden border border-[var(--color-border)] card-lift">
        <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
          <div>
            <h2 className="font-heading font-semibold text-lg text-[var(--color-primary)]">
              Product Portfolio Compliance Matrix (10 Target SKUs)
            </h2>
            <p className="text-[12px] text-[var(--color-muted)]">
              Real-time synchronization across Data Collection (Sheet 03), Regulatory Audit (Sheet 04), and EU DoC Delivery (Sheet 06).
            </p>
          </div>
          <span className="text-[11px] font-mono text-[var(--color-muted)] bg-gray-50 px-2.5 py-1 rounded">
            Base Date: {parameters.assessmentBaseDate}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-[var(--table-header-bg)] border-b border-[var(--table-header-sep)] text-[var(--color-primary)] text-[11px] tracking-table-head uppercase font-semibold">
                <th className="py-3 px-4 w-24">Product</th>
                <th className="py-3 px-4">Product Name &amp; Description</th>
                <th className="py-3 px-4 w-32">BOM Comps</th>
                <th className="py-3 px-4 w-36">Data Completeness</th>
                <th className="py-3 px-4 w-44">Dim 1: Data Status</th>
                <th className="py-3 px-4 w-48">Dim 2: Compliance Audit</th>
                <th className="py-3 px-4 w-48">Dim 3: Delivery Status</th>
                <th className="py-3 px-4 w-32 text-right">Cost ({parameters.currencySymbol})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {computedDeliveries.map((p) => {
                const isBlocked = p.isBlockedByInterlock;
                return (
                  <tr
                    key={p.productId}
                    className={`hover:bg-[rgba(5,28,44,0.02)] transition-colors ${
                      isBlocked ? 'anomaly-row' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-mono font-bold text-[12px] text-[var(--color-primary)]">
                      {p.productId}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-[13px] text-[var(--color-primary)]">
                        {p.productName}
                      </div>
                      <div className="text-[11px] text-[var(--color-muted)] mt-0.5">
                        {p.legalEntitySigner}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-[12px] text-[var(--color-body-text)]">
                      {p.totalManagedComponents} components
                    </td>
                    <td className="py-3 px-4">
                      <DataBar
                        value={p.dataCompletenessPct}
                        max={100}
                        label={`${p.dataCompletenessPct}%`}
                        width="w-16"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={p.dimension1_DataStatus} size="sm" />
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={p.dimension2_AuditStatus} size="sm" />
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={p.dimension3_DeliveryStatus} size="md" />
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-[12px] font-medium text-[var(--color-primary)]">
                      {parameters.currencySymbol}{p.accumulatedCostBase.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation Quick Cards to 6 Sheets */}
      <div className="space-y-3">
        <h3 className="font-heading font-semibold text-lg text-[var(--color-primary)]">
          Workbook Sheet Architecture Directory
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              tab: '01_params' as ActiveTab,
              num: '01',
              title: 'Rule & Parameter Register',
              desc: 'Single-point configuration for currency, FX rates, base date, and approved PPWR articles.',
            },
            {
              tab: '02_master' as ActiveTab,
              num: '02',
              title: 'Product & Packaging Register',
              desc: 'Master relationship mapping between 10 products, 3 packaging tiers, and verified manufacturers.',
            },
            {
              tab: '03_intake' as ActiveTab,
              num: '03',
              title: 'Manufacturer Data Intake',
              desc: 'Physical metrics, void ratios, heavy metals PPM, lab report IDs, and foreign test quote conversions.',
            },
            {
              tab: '04_audit' as ActiveTab,
              num: '04',
              title: 'Evidence Audit Engine',
              desc: 'Dual-zone architecture: machine validation of completeness vs regulatory expert legal reviews.',
            },
            {
              tab: '05_gaps' as ActiveTab,
              num: '05',
              title: 'Compliance Gap Action Log',
              desc: 'Remediation management, lead time escalations, and automated blocking determination for EU DoC.',
            },
            {
              tab: '06_doc' as ActiveTab,
              num: '06',
              title: 'Delivery & DoC Dashboard',
              desc: '3-dimensional status matrix, automated safety interlock protection, and urgent action lists.',
            },
          ].map((item) => (
            <div
              key={item.tab}
              onClick={() => onNavigateTab(item.tab)}
              className="bg-white p-4 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)] hover:border-[var(--color-accent)] card-lift cursor-pointer transition-all space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[rgba(34,81,255,0.08)] text-[var(--color-accent)] font-semibold">
                  Sheet {item.num}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-300 hover:text-[var(--color-accent)]" />
              </div>
              <h4 className="font-heading font-semibold text-[15px] text-[var(--color-primary)]">
                {item.title}
              </h4>
              <p className="text-[12px] text-[var(--color-muted)] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
