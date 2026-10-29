import React, { useState } from 'react';
import {
  ComputedComplianceGap,
  ComplianceGap,
  ProblemCategory,
  EvidenceSubmissionStatus,
  ExpertResolutionStatus,
  GlobalParameters,
} from '../../types/ppwr';
import { StatusBadge } from '../StatusBadge';
import { InsightBlock } from '../InsightBlock';
import {
  AlertCircle,
  Plus,
  Trash2,
  Search,
  Filter,
  Download,
  Clock,
  ShieldAlert,
} from 'lucide-react';
import { arrayToCSV, downloadCSV } from '../../utils/csvHelper';

interface Sheet05GapLogProps {
  computedGaps: ComputedComplianceGap[];
  parameters: GlobalParameters;
  onUpdateGap: (gapId: string, updated: Partial<ComplianceGap>) => void;
  onAddGap: (gap: ComplianceGap) => void;
  onDeleteGap: (gapId: string) => void;
}

export const Sheet05GapLog: React.FC<Sheet05GapLogProps> = ({
  computedGaps,
  parameters,
  onUpdateGap,
  onAddGap,
  onDeleteGap,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [escalationFilter, setEscalationFilter] = useState<string>('ALL');
  const [blockingFilter, setBlockingFilter] = useState<string>('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newGap, setNewGap] = useState<ComplianceGap>({
    gapId: `GAP-${String(computedGaps.length + 1).padStart(3, '0')}`,
    componentId: 'CMP-001',
    triggeredRuleId: 'RUL-PPWR-01',
    problemCategory: 'Supplementary Lab Testing Required',
    gapDetails: '',
    remediationAction: '',
    estimatedCostForeign: 500.0,
    assignee: '',
    dueDate: parameters.assessmentBaseDate,
    evidenceSubmissionStatus: 'Pending Submission',
    expertResolutionStatus: 'Open',
  });

  const filteredGaps = computedGaps.filter((g) => {
    if (escalationFilter !== 'ALL' && g.escalationWarning !== escalationFilter) return false;
    if (blockingFilter !== 'ALL' && g.blocksDoCSigning !== blockingFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        g.gapId.toLowerCase().includes(q) ||
        g.componentId.toLowerCase().includes(q) ||
        g.linkedProductId.toLowerCase().includes(q) ||
        g.triggeredRuleId.toLowerCase().includes(q) ||
        g.assignee.toLowerCase().includes(q) ||
        g.gapDetails.toLowerCase().includes(q) ||
        g.remediationAction.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleExportCSV = () => {
    const header = [
      'gapId',
      'componentId',
      'linkedProductId',
      'triggeredRuleId',
      'triggeredRuleEffectiveStage',
      'problemCategory',
      'gapDetails',
      'remediationAction',
      'estimatedCostForeign',
      'remediationCostBase',
      'assignee',
      'dueDate',
      'remainingDays',
      'escalationWarning',
      'blocksDoCSigning',
      'evidenceSubmissionStatus',
      'expertResolutionStatus',
    ];
    const rows = filteredGaps.map((g) => [
      g.gapId,
      g.componentId,
      g.linkedProductId,
      g.triggeredRuleId,
      g.triggeredRuleEffectiveStage,
      g.problemCategory,
      g.gapDetails,
      g.remediationAction,
      g.estimatedCostForeign,
      g.remediationCostBase,
      g.assignee,
      g.dueDate,
      g.remainingDays,
      g.escalationWarning,
      g.blocksDoCSigning,
      g.evidenceSubmissionStatus,
      g.expertResolutionStatus,
    ]);
    downloadCSV('sheet05_compliance_gap_action_log.csv', arrayToCSV([header, ...rows]));
  };

  const handleSaveNewGap = (e: React.FormEvent) => {
    e.preventDefault();
    onAddGap(newGap);
    setIsAddModalOpen(false);
    setNewGap({
      gapId: `GAP-${String(computedGaps.length + 2).padStart(3, '0')}`,
      componentId: 'CMP-001',
      triggeredRuleId: 'RUL-PPWR-01',
      problemCategory: 'Supplementary Lab Testing Required',
      gapDetails: '',
      remediationAction: '',
      estimatedCostForeign: 500.0,
      assignee: '',
      dueDate: parameters.assessmentBaseDate,
      evidenceSubmissionStatus: 'Pending Submission',
      expertResolutionStatus: 'Open',
    });
  };

  const overdueCount = computedGaps.filter((g) => g.escalationWarning === 'Overdue - Immediate Escalation').length;
  const urgentCount = computedGaps.filter((g) => g.escalationWarning === 'Urgent Warning - Follow-up Required').length;
  const blockingCount = computedGaps.filter((g) => g.blocksDoCSigning === 'Blocks DoC Execution').length;

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Insight */}
      <InsightBlock
        title="Compliance Gap Remediation & Escalation Tracker (Sheet 05)"
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
              <span>Log Action Gap</span>
            </button>
          </div>
        }
      >
        <div className="flex flex-wrap items-center gap-4 text-[12px]">
          <div className="flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-[var(--color-negative)]" />
            <span className="font-semibold">{blockingCount} Blocking Gaps</span>
            <span className="text-[var(--color-muted)]">(Prevents EU DoC signature)</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[var(--color-negative)]" />
            <span className="font-semibold">{overdueCount} Overdue</span>
            <span className="text-[var(--color-muted)]">(& {urgentCount} Urgent within {parameters.escalationLeadDays} days)</span>
          </div>
        </div>
        <div className="mt-1 text-[12px] opacity-85">
          Only unclosed gaps mapped to currently applicable PPWR articles will trigger &quot;Blocks DoC Execution&quot;.
          Future effective requirements (e.g. 2030 recyclability) remain non-blocking so current market launch is not hindered.
        </div>
      </InsightBlock>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-[var(--shadow-sm)] border border-[var(--color-border)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search gap ID, component, assignee..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-[12px] rounded-lg border border-gray-200 focus:outline-none focus:border-[var(--color-accent)]"
            />
          </div>

          <div className="flex items-center gap-1.5 text-[12px]">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[var(--color-muted)] font-medium">Escalation:</span>
            <select
              value={escalationFilter}
              onChange={(e) => setEscalationFilter(e.target.value)}
              className="px-2.5 py-1 text-[12px] rounded-md border border-gray-200 bg-white font-medium"
            >
              <option value="ALL">All Escalation States</option>
              <option value="Overdue - Immediate Escalation">Overdue</option>
              <option value="Urgent Warning - Follow-up Required">Urgent (≤ {parameters.escalationLeadDays}d)</option>
              <option value="On Track">On Track</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-[12px]">
            <span className="text-[var(--color-muted)] font-medium">DoC Impact:</span>
            <select
              value={blockingFilter}
              onChange={(e) => setBlockingFilter(e.target.value)}
              className="px-2.5 py-1 text-[12px] rounded-md border border-gray-200 bg-white font-medium"
            >
              <option value="ALL">All Impacts</option>
              <option value="Blocks DoC Execution">Blocks DoC Execution</option>
              <option value="Non-blocking">Non-blocking</option>
            </select>
          </div>
        </div>

        <div className="text-[12px] font-mono text-[var(--color-muted)]">
          Total Gaps: <span className="font-semibold text-[var(--color-primary)]">{filteredGaps.length}</span> / {computedGaps.length}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl shadow-[var(--shadow-md)] overflow-hidden border border-[var(--color-border)] card-lift">
        <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-[var(--color-accent)]" />
            <div>
              <h2 className="font-heading font-semibold text-lg text-[var(--color-primary)]">
                Compliance Gap & Action Item Tracker Table (A2:Q1000)
              </h2>
              <p className="text-[12px] text-[var(--color-muted)]">
                Columns A-K: Action Item Manual Inputs in Yellow · Columns L-Q: Formula Calculated Warnings & Blocking Flags
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-[var(--table-header-bg)] border-b border-[var(--table-header-sep)] text-[var(--color-primary)] text-[11px] tracking-table-head uppercase font-semibold">
                <th className="py-3 px-3 w-20">Gap ID</th>
                <th className="py-3 px-3 w-24">Component</th>
                <th className="py-3 px-3 w-20">Product (Calc)</th>
                <th className="py-3 px-3 w-28">Rule ID</th>
                <th className="py-3 px-3 w-36">Problem Category</th>
                <th className="py-3 px-3">Gap Description & Required Evidence</th>
                <th className="py-3 px-3">Remediation Action Plan</th>
                <th className="py-3 px-3 w-28 text-right">Cost ({parameters.currencySymbol})</th>
                <th className="py-3 px-3 w-36">Assignee</th>
                <th className="py-3 px-3 w-28">Due Date</th>
                <th className="py-3 px-3 w-24 text-center">Remaining</th>
                <th className="py-3 px-3 w-40">Escalation Status</th>
                <th className="py-3 px-3 w-36">DoC Block (Calc)</th>
                <th className="py-3 px-3 w-32">Resolution</th>
                <th className="py-3 px-2 w-10 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filteredGaps.map((gap) => {
                const isOverdue = gap.escalationWarning === 'Overdue - Immediate Escalation';
                const isUrgent = gap.escalationWarning === 'Urgent Warning - Follow-up Required';
                const isBlocking = gap.blocksDoCSigning === 'Blocks DoC Execution';

                return (
                  <tr
                    key={gap.gapId}
                    className={`hover:bg-[rgba(5,28,44,0.02)] transition-colors ${
                      isOverdue || isBlocking ? 'anomaly-row' : ''
                    }`}
                  >
                    {/* Gap ID */}
                    <td className="py-2.5 px-3 font-mono font-semibold text-[12px] text-[var(--color-primary)]">
                      {gap.gapId}
                    </td>

                    {/* Component ID */}
                    <td className="py-2.5 px-3 font-mono text-[12px]">
                      <input
                        type="text"
                        value={gap.componentId}
                        onChange={(e) => onUpdateGap(gap.gapId, { componentId: e.target.value })}
                        className="editable-cell px-1.5 py-0.5 rounded w-full font-mono text-[12px]"
                      />
                    </td>

                    {/* Linked Product (Calc) */}
                    <td className="py-2.5 px-3 font-mono text-[11px] text-[var(--color-muted)]">
                      {gap.linkedProductId}
                    </td>

                    {/* Triggered Rule ID */}
                    <td className="py-2.5 px-3 font-mono text-[12px]">
                      <input
                        type="text"
                        value={gap.triggeredRuleId}
                        onChange={(e) => onUpdateGap(gap.gapId, { triggeredRuleId: e.target.value })}
                        className="editable-cell px-1.5 py-0.5 rounded w-full font-mono text-[11px]"
                      />
                    </td>

                    {/* Problem Category */}
                    <td className="py-2.5 px-3">
                      <select
                        value={gap.problemCategory}
                        onChange={(e) =>
                          onUpdateGap(gap.gapId, { problemCategory: e.target.value as ProblemCategory })
                        }
                        className="editable-cell px-1.5 py-0.5 rounded w-full text-[11px] font-medium"
                      >
                        <option value="Missing Raw Data">Missing Raw Data</option>
                        <option value="Data Inconsistency">Data Inconsistency</option>
                        <option value="Insufficient Evidence">Insufficient Evidence</option>
                        <option value="Supplementary Lab Testing Required">Lab Testing Required</option>
                        <option value="Packaging Design Redesign Required">Design Redesign Required</option>
                      </select>
                    </td>

                    {/* Gap Details */}
                    <td className="py-2.5 px-3 text-[12px]">
                      <input
                        type="text"
                        value={gap.gapDetails}
                        onChange={(e) => onUpdateGap(gap.gapId, { gapDetails: e.target.value })}
                        className="editable-cell px-1.5 py-0.5 rounded w-full text-[12px]"
                      />
                    </td>

                    {/* Remediation Action */}
                    <td className="py-2.5 px-3 text-[12px] font-medium text-[var(--color-primary)]">
                      <input
                        type="text"
                        value={gap.remediationAction}
                        onChange={(e) => onUpdateGap(gap.gapId, { remediationAction: e.target.value })}
                        className="editable-cell px-1.5 py-0.5 rounded w-full text-[12px]"
                      />
                    </td>

                    {/* Estimated Cost Base (Calc) */}
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        step="50"
                        value={gap.estimatedCostForeign}
                        onChange={(e) =>
                          onUpdateGap(gap.gapId, { estimatedCostForeign: parseFloat(e.target.value) || 0 })
                        }
                        className="editable-cell px-1.5 py-0.5 rounded w-full text-right font-mono text-[12px]"
                      />
                    </td>

                    {/* Assignee */}
                    <td className="py-2.5 px-3 text-[12px]">
                      <input
                        type="text"
                        value={gap.assignee}
                        onChange={(e) => onUpdateGap(gap.gapId, { assignee: e.target.value })}
                        className="editable-cell px-1.5 py-0.5 rounded w-full text-[12px]"
                      />
                    </td>

                    {/* Due Date */}
                    <td className="py-2.5 px-3 font-mono text-[11px]">
                      <input
                        type="date"
                        value={gap.dueDate}
                        onChange={(e) => onUpdateGap(gap.gapId, { dueDate: e.target.value })}
                        className="editable-cell px-1 py-0.5 rounded font-mono text-[11px]"
                      />
                    </td>

                    {/* Remaining Days (Calc) */}
                    <td className="py-2.5 px-3 text-center font-mono font-semibold tabular-nums text-[12px]">
                      <span className={isOverdue ? 'text-[var(--color-negative)]' : isUrgent ? 'text-[var(--color-primary)] font-bold' : ''}>
                        {gap.remainingDays > 0 ? `+${gap.remainingDays}d` : `${gap.remainingDays}d`}
                      </span>
                    </td>

                    {/* Escalation Warning */}
                    <td className="py-2.5 px-3">
                      <StatusBadge status={gap.escalationWarning} size="sm" />
                    </td>

                    {/* Blocks DoC Signing */}
                    <td className="py-2.5 px-3">
                      <StatusBadge status={gap.blocksDoCSigning} size="sm" />
                    </td>

                    {/* Resolution Status */}
                    <td className="py-2.5 px-3">
                      <select
                        value={gap.expertResolutionStatus}
                        onChange={(e) =>
                          onUpdateGap(gap.gapId, {
                            expertResolutionStatus: e.target.value as ExpertResolutionStatus,
                          })
                        }
                        className="editable-cell px-2 py-1 rounded w-full text-[11px] font-semibold"
                      >
                        <option value="Open">Open</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Closed & Verified">Closed & Verified</option>
                      </select>
                    </td>

                    {/* Delete */}
                    <td className="py-2.5 px-2 text-center">
                      <button
                        onClick={() => onDeleteGap(gap.gapId)}
                        title="Delete gap item"
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

      {/* Add Gap Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(5,28,44,0.45)] backdrop-blur-sm animate-fade-up">
          <div className="bg-white rounded-xl shadow-[var(--shadow-lg)] max-w-lg w-full p-6 space-y-4 border border-[var(--color-border)]">
            <h3 className="font-heading font-semibold text-lg text-[var(--color-primary)]">
              Register New Compliance Gap
            </h3>
            <form onSubmit={handleSaveNewGap} className="space-y-3 text-[12px]">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--color-muted)] font-medium mb-1">Gap Record ID</label>
                  <input
                    type="text"
                    required
                    value={newGap.gapId}
                    onChange={(e) => setNewGap({ ...newGap, gapId: e.target.value })}
                    className="w-full px-3 py-1.5 rounded border border-gray-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[var(--color-muted)] font-medium mb-1">Associated Component ID</label>
                  <input
                    type="text"
                    required
                    value={newGap.componentId}
                    onChange={(e) => setNewGap({ ...newGap, componentId: e.target.value })}
                    className="w-full px-3 py-1.5 rounded border border-gray-200 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--color-muted)] font-medium mb-1">Triggered Rule Code</label>
                  <input
                    type="text"
                    required
                    value={newGap.triggeredRuleId}
                    onChange={(e) => setNewGap({ ...newGap, triggeredRuleId: e.target.value })}
                    className="w-full px-3 py-1.5 rounded border border-gray-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[var(--color-muted)] font-medium mb-1">Problem Category</label>
                  <select
                    value={newGap.problemCategory}
                    onChange={(e) => setNewGap({ ...newGap, problemCategory: e.target.value as ProblemCategory })}
                    className="w-full px-3 py-1.5 rounded border border-gray-200"
                  >
                    <option value="Missing Raw Data">Missing Raw Data</option>
                    <option value="Data Inconsistency">Data Inconsistency</option>
                    <option value="Insufficient Evidence">Insufficient Evidence</option>
                    <option value="Supplementary Lab Testing Required">Supplementary Lab Testing Required</option>
                    <option value="Packaging Design Redesign Required">Packaging Design Redesign Required</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[var(--color-muted)] font-medium mb-1">Gap Description & Evidence Requirement</label>
                <textarea
                  required
                  rows={2}
                  value={newGap.gapDetails}
                  onChange={(e) => setNewGap({ ...newGap, gapDetails: e.target.value })}
                  className="w-full px-3 py-1.5 rounded border border-gray-200"
                />
              </div>

              <div>
                <label className="block text-[var(--color-muted)] font-medium mb-1">Remediation Action Plan</label>
                <textarea
                  required
                  rows={2}
                  value={newGap.remediationAction}
                  onChange={(e) => setNewGap({ ...newGap, remediationAction: e.target.value })}
                  className="w-full px-3 py-1.5 rounded border border-gray-200"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[var(--color-muted)] font-medium mb-1">Est Cost ({parameters.currencySymbol})</label>
                  <input
                    type="number"
                    step="50"
                    required
                    value={newGap.estimatedCostForeign}
                    onChange={(e) => setNewGap({ ...newGap, estimatedCostForeign: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-1.5 rounded border border-gray-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[var(--color-muted)] font-medium mb-1">Assignee</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lead Engineer"
                    value={newGap.assignee}
                    onChange={(e) => setNewGap({ ...newGap, assignee: e.target.value })}
                    className="w-full px-3 py-1.5 rounded border border-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-[var(--color-muted)] font-medium mb-1">Due Date</label>
                  <input
                    type="date"
                    required
                    value={newGap.dueDate}
                    onChange={(e) => setNewGap({ ...newGap, dueDate: e.target.value })}
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
                  Save Gap
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
