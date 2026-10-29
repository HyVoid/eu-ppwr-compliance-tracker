import React from 'react';
import {
  GlobalParameters,
  ComputedPPWRRule,
} from '../../types/ppwr';
import { StatusBadge } from '../StatusBadge';
import { InsightBlock } from '../InsightBlock';
import { Settings, ShieldCheck, Sparkles } from 'lucide-react';

interface Sheet01ParametersProps {
  parameters: GlobalParameters;
  onUpdateParameters: (newParams: Partial<GlobalParameters>) => void;
  computedRules: ComputedPPWRRule[];
  onUpdateRule: (ruleId: string, updated: Partial<ComputedPPWRRule>) => void;
  onAddRule: (rule: ComputedPPWRRule) => void;
}

export const Sheet01Parameters: React.FC<Sheet01ParametersProps> = ({
  parameters,
  onUpdateParameters,
  computedRules,
  onUpdateRule,
}) => {
  const paramRows = [
    {
      code: 'PRM_01',
      name: 'Base Currency Symbol',
      key: 'currencySymbol',
      value: parameters.currencySymbol,
      unit: 'Text Symbol (e.g. €, $, £, ¥)',
      desc: 'Controls currency prefix for all converted laboratory testing and remediation budget reports.',
      type: 'text',
    },
    {
      code: 'PRM_02',
      name: 'Foreign Exchange Multiplier',
      key: 'fxMultiplier',
      value: parameters.fxMultiplier,
      unit: 'Decimal Multiplier (0.0000)',
      desc: 'Uniform FX multiplier to convert foreign quotes (USD, CNY) into base company currency.',
      type: 'number',
      step: '0.01',
    },
    {
      code: 'PRM_03',
      name: 'Assessment Base Date',
      key: 'assessmentBaseDate',
      value: parameters.assessmentBaseDate,
      unit: 'Date (YYYY-MM-DD)',
      desc: 'Central benchmark date to evaluate whether PPWR articles are currently in force and calculate days remaining.',
      type: 'date',
    },
    {
      code: 'PRM_04',
      name: 'Heavy Metal Sum Limit',
      key: 'heavyMetalLimitPpm',
      value: parameters.heavyMetalLimitPpm,
      unit: 'PPM (mg/kg)',
      desc: 'Maximum allowable cumulative concentration of Lead (Pb), Cadmium (Cd), Mercury (Hg), and Hexavalent Chromium (Cr VI).',
      type: 'number',
    },
    {
      code: 'PRM_05',
      name: 'Component Weight Tolerance',
      key: 'weightTolerancePct',
      value: Number((parameters.weightTolerancePct * 100).toFixed(1)),
      unit: 'Percentage (%)',
      desc: 'Maximum permissible variance between declared gross component weight and itemized material breakdown sum.',
      type: 'number',
      step: '0.1',
      isPercentage: true,
    },
    {
      code: 'PRM_06',
      name: 'Escalation Warning Lead Time',
      key: 'escalationLeadDays',
      value: parameters.escalationLeadDays,
      unit: 'Days (Integer)',
      desc: 'Threshold to trigger "Urgent Warning - Follow-up Required" before remediation deadline expires.',
      type: 'number',
    },
    {
      code: 'PRM_07',
      name: 'Transport Max Void Space Ratio',
      key: 'maxTransportVoidRatio',
      value: Number((parameters.maxTransportVoidRatio * 100).toFixed(1)),
      unit: 'Percentage (%)',
      desc: 'Article 24 maximum void space threshold for transport, grouped, and e-commerce packaging (default 50%).',
      type: 'number',
      step: '1',
      isPercentage: true,
    },
    {
      code: 'PRM_08',
      name: 'Single Product Remediation Budget Cap',
      key: 'productRemediationBudgetCap',
      value: parameters.productRemediationBudgetCap,
      unit: `${parameters.currencySymbol} Amount`,
      desc: 'Budget threshold per product line to detect testing and engineering redesign cost overruns.',
      type: 'number',
      step: '100',
    },
    {
      code: 'PRM_09',
      name: 'Active Rule Library Version',
      key: 'activeRuleVersion',
      value: parameters.activeRuleVersion,
      unit: 'Version String (e.g. V2026.1)',
      desc: 'Current approved version of PPWR standards; changing this flags older component audits for mandatory re-review.',
      type: 'text',
    },
    {
      code: 'PRM_10',
      name: 'Data Completeness Threshold',
      key: 'dataCompletenessThreshold',
      value: Number((parameters.dataCompletenessThreshold * 100).toFixed(1)),
      unit: 'Percentage (%)',
      desc: 'Target ratio of complete component dossiers required to mark product data status as "Fully Submitted".',
      type: 'number',
      step: '1',
      isPercentage: true,
    },
  ];

  const handleParamChange = (key: string, rawVal: string, isPercentage?: boolean) => {
    let parsed: string | number = rawVal;
    if (isPercentage) {
      parsed = (parseFloat(rawVal) || 0) / 100;
    } else if (key === 'fxMultiplier' || key === 'heavyMetalLimitPpm' || key === 'escalationLeadDays' || key === 'productRemediationBudgetCap') {
      parsed = parseFloat(rawVal) || 0;
    }
    onUpdateParameters({ [key]: parsed });
  };

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Top Banner / Insight */}
      <InsightBlock
        title="Single-Point Control Engine (Sheet 01)"
        actionButton={
          <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-white border border-[rgba(34,81,255,0.2)] text-[12px] font-mono text-[var(--color-accent)] font-semibold shadow-xs">
            <Sparkles className="w-4 h-4" />
            <span>Active Version: {parameters.activeRuleVersion}</span>
          </div>
        }
      >
        All downstream data sheets (02 through 06) dynamically reference these 10 global parameters.
        Adjusting the assessment base date, foreign exchange rates, or heavy metal thresholds instantly propagates across all calculated fields,
        recalculating compliance screening, remaining days, and DoC execution readiness without manual cell dragging.
      </InsightBlock>

      {/* Grid: Global Parameters Table */}
      <div className="bg-white rounded-xl shadow-[var(--shadow-md)] overflow-hidden border border-[var(--color-border)] card-lift">
        <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-[var(--color-accent)]" />
            <div>
              <h2 className="font-heading font-semibold text-lg text-[var(--color-primary)]">
                Global Control Parameters (A2:D12)
              </h2>
              <p className="text-[12px] text-[var(--color-muted)]">
                Editable inputs are highlighted with light yellow background. Changes propagate instantaneously.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-muted)] bg-gray-50 px-2.5 py-1 rounded">
            10 Key Benchmark Invariants
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-[var(--table-header-bg)] border-b border-[var(--table-header-sep)] text-[var(--color-primary)] text-[11px] tracking-table-head uppercase font-semibold">
                <th className="py-3 px-4 w-24">Parameter Code</th>
                <th className="py-3 px-4 w-60">Parameter Name</th>
                <th className="py-3 px-4 w-44">Configuration Value (Editable)</th>
                <th className="py-3 px-4 w-48">Unit & Specification</th>
                <th className="py-3 px-4">Business & Legal Function</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {paramRows.map((p) => (
                <tr key={p.code} className="hover:bg-[rgba(5,28,44,0.02)] transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-[var(--color-primary)] text-[12px]">
                    {p.code}
                  </td>
                  <td className="py-3 px-4 font-medium text-[var(--color-primary)]">
                    {p.name}
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type={p.type}
                      step={p.step}
                      value={p.value}
                      onChange={(e) => handleParamChange(p.key, e.target.value, p.isPercentage)}
                      className="editable-cell w-full px-3 py-1.5 rounded font-mono font-semibold text-[13px] text-[var(--color-primary)] transition-all"
                    />
                  </td>
                  <td className="py-3 px-4 text-[12px] font-mono text-[var(--color-muted)]">
                    {p.unit}
                  </td>
                  <td className="py-3 px-4 text-[12px] text-[var(--color-body-text)] opacity-85 leading-relaxed">
                    {p.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PPWR Regulation Library Table */}
      <div className="bg-white rounded-xl shadow-[var(--shadow-md)] overflow-hidden border border-[var(--color-border)] card-lift">
        <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[var(--color-accent)]" />
            <div>
              <h2 className="font-heading font-semibold text-lg text-[var(--color-primary)]">
                PPWR Regulatory Rule Engine Register (F2:N200)
              </h2>
              <p className="text-[12px] text-[var(--color-muted)]">
                Articles benchmarked against assessment date <span className="font-mono font-semibold text-[var(--color-primary)]">{parameters.assessmentBaseDate}</span>
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-[var(--color-muted)] bg-gray-50 px-2.5 py-1 rounded">
            {computedRules.length} Approved Articles
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-[var(--table-header-bg)] border-b border-[var(--table-header-sep)] text-[var(--color-primary)] text-[11px] tracking-table-head uppercase font-semibold">
                <th className="py-3 px-4 w-28">Rule Code</th>
                <th className="py-3 px-4">PPWR Article & Requirement</th>
                <th className="py-3 px-4 w-36">Applicable Tier</th>
                <th className="py-3 px-4 w-32">Effective Date</th>
                <th className="py-3 px-4 w-44">Effective Stage (Calc)</th>
                <th className="py-3 px-4 w-44">Version Status (Calc)</th>
                <th className="py-3 px-4 w-28 text-right">Covered Comps</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {computedRules.map((rule) => {
                const isCurrent = rule.effectiveStage === 'Currently Applicable';
                return (
                  <tr key={rule.ruleId} className="hover:bg-[rgba(5,28,44,0.02)] transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-[var(--color-primary)] text-[12px]">
                      {rule.ruleId}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-[var(--color-primary)]">{rule.articleAndRequirement}</div>
                      <div className="text-[11px] text-[var(--color-muted)] mt-0.5">
                        Mandatory Evidence: {rule.mandatoryEvidenceType}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[11px] bg-gray-100 font-mono text-gray-700">
                        {rule.applicableTier}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[12px]">
                      <input
                        type="date"
                        value={rule.effectiveDate}
                        onChange={(e) => onUpdateRule(rule.ruleId, { effectiveDate: e.target.value })}
                        className="editable-cell px-2 py-0.5 rounded font-mono text-[11px] text-[var(--color-primary)]"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge
                        status={rule.effectiveStage}
                        size="sm"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge
                        status={rule.versionStatus}
                        size="sm"
                      />
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-semibold tabular-nums text-[var(--color-primary)]">
                      {rule.coveredComponentsCount}
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
