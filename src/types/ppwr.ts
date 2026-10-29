/**
 * PPWR (Packaging and Packaging Waste Regulation) Compliance Data Types
 * Enterprise schema matching the 6-sheet Excel implementation architecture.
 */

export type PackagingTier = 'Primary Packaging' | 'Secondary Packaging' | 'Transport Packaging';

export type MaterialCategory =
  | 'Glass'
  | 'Plastic-PET'
  | 'Plastic-HDPE'
  | 'Plastic-PP'
  | 'Paper & Cardboard'
  | 'Aluminum'
  | 'Steel'
  | 'Composite Material'
  | 'Biodegradable Polymer'
  | 'Wood & Textile';

export interface GlobalParameter {
  id: string; // PRM_01 to PRM_10
  name: string;
  value: string | number;
  unitAndDescription: string;
}

export interface GlobalParameters {
  currencySymbol: string; // PRM_01: e.g. "€"
  fxMultiplier: number; // PRM_02: e.g. 1.08
  assessmentBaseDate: string; // PRM_03: "2026-08-12"
  heavyMetalLimitPpm: number; // PRM_04: 100
  weightTolerancePct: number; // PRM_05: 0.02 (2.0%)
  escalationLeadDays: number; // PRM_06: 7
  maxTransportVoidRatio: number; // PRM_07: 0.50 (50.0%)
  productRemediationBudgetCap: number; // PRM_08: 5000.00
  activeRuleVersion: string; // PRM_09: "V2026.1"
  dataCompletenessThreshold: number; // PRM_10: 1.00 (100.0%)
}

export interface PPWRRule {
  ruleId: string; // e.g. "RUL-PPWR-01"
  articleAndRequirement: string; // e.g. "Art. 5 Heavy metals concentration limits (Pb, Cd, Hg, Cr(VI) <= 100 ppm)"
  applicableTier: 'All Packaging Tiers' | PackagingTier;
  effectiveDate: string; // "YYYY-MM-DD"
  mandatoryEvidenceType: string;
  ruleVersion: string; // e.g. "V2026.1"
}

export interface ComputedPPWRRule extends PPWRRule {
  effectiveStage: 'Currently Applicable' | 'Future Effective Requirement';
  versionStatus: 'Active Approved Version' | 'Outdated Version - Needs Update';
  coveredComponentsCount: number;
}

export interface PackagingComponentMaster {
  componentId: string; // e.g. "CMP-001"
  productId: string; // e.g. "PRD-01"
  productName: string; // e.g. "Luminescent Glow Serum 50ml"
  packagingId: string; // e.g. "PKG-01-PRI"
  tier: PackagingTier;
  componentName: string; // e.g. "Amber Glass Dropper Bottle"
  materialCategory: MaterialCategory;
  manufacturerName: string; // e.g. "EuroGlass Vetro S.p.A."
  legalEntitySigner: string; // e.g. "Aura Care EU B.V. (Elena Rossi)"
}

export interface ComputedPackagingComponentMaster extends PackagingComponentMaster {
  keyUniqueCheck: 'Unique OK' | 'Duplicate Key - Needs Fix';
  applicableRulesCount: number;
  dataIntakeStatus: 'Not Submitted' | 'Intake Record Received' | 'Duplicate Submission';
  productComponentCount: number;
}

export interface ManufacturerDataIntake {
  recordId: string; // e.g. "INT-001"
  componentId: string; // e.g. "CMP-001"
  declaredTotalWeightG: number;
  mainMaterialWeightG: number;
  subsidiaryMaterialWeightG: number;
  outerVolumeCm3: number;
  innerItemVolumeCm3: number;
  heavyMetalsPpm: number | null; // null if not reported
  pcrRatio: number; // 0 to 1 (e.g. 0.30 for 30%)
  supplierDeclarationDocId: string; // e.g. "DOC-SUP-2026-01"
  labTestReportDocId: string; // e.g. "RPT-SGS-2026-08"
  supplementaryTestQuoteForeign: number;
  foreignCurrencyCode: string; // e.g. "USD", "CNY", "EUR"
  submissionDate: string; // "YYYY-MM-DD"
}

export interface ComputedManufacturerDataIntake extends ManufacturerDataIntake {
  linkedProductId: string;
  linkedTier: PackagingTier | 'Unregistered Component';
  breakdownTotalWeightG: number;
  voidSpaceRatio: number;
  supplementaryTestCostBase: number;
}

export type MachineDiagnostic =
  | 'Machine Pass - Pending Expert Review'
  | 'Data Missing - Pending Escalation'
  | 'Data Discrepancy or Limit Breach - Requires Action';

export type ExpertEvidenceConclusion =
  | 'Pending Review'
  | 'Under Review'
  | 'Insufficient Evidence'
  | 'Non-compliance Identified'
  | 'Verified Compliant with Requirements';

export interface ExpertAuditRecord {
  componentId: string;
  expertConclusion: ExpertEvidenceConclusion;
  auditRuleVersion: string;
  auditorNameDate: string;
  expertNotes: string;
}

export interface ComputedEvidenceCheck {
  componentId: string;
  productId: string;
  productName: string;
  componentName: string;
  tier: PackagingTier;
  // Machine checks
  mandatoryCompleteness: 'Not Submitted' | 'Partially Submitted' | 'Submitted';
  weightConsistency:
    | 'Pending Submission'
    | 'Anomaly - Total Weight Missing/Zero'
    | 'Consistent'
    | 'Discrepancy - Exceeds Weight Tolerance';
  weightDeviationPct: number;
  heavyMetalsScreening:
    | 'Missing Lab Test Value'
    | 'Screening Pass'
    | 'Exceeded - Over 100 PPM Limit';
  heavyMetalsValue: number | null;
  voidSpaceScreening:
    | 'Pending Submission'
    | 'Exempt (Primary Packaging)'
    | 'Compliant with Threshold'
    | 'Exceeded - Void Space Exceeds Cap';
  voidSpaceValue: number;
  evidenceIndexStatus:
    | 'Dual Evidence Indexed'
    | 'Declaration Only (No Test Report)'
    | 'Test Report Only (No Declaration)'
    | 'No Supporting Evidence Indexed';
  machineDiagnostic: MachineDiagnostic;
  // Expert check (editable)
  expertConclusion: ExpertEvidenceConclusion;
  auditRuleVersion: string;
  auditorNameDate: string;
  expertNotes: string;
  // Final combined status
  finalComplianceStatus:
    | 'Pending Review'
    | 'Under Review'
    | 'Insufficient Evidence'
    | 'Non-compliance Identified'
    | 'Pending Review - Rule Version Updated, Re-audit Required'
    | 'Verified Compliant with Requirements';
  isAnomaly: boolean;
}

export type ProblemCategory =
  | 'Missing Raw Data'
  | 'Data Inconsistency'
  | 'Insufficient Evidence'
  | 'Supplementary Lab Testing Required'
  | 'Packaging Design Redesign Required';

export type EvidenceSubmissionStatus =
  | 'Pending Submission'
  | 'Submitted Pending Review'
  | 'Withdrawn';

export type ExpertResolutionStatus =
  | 'Open'
  | 'Rejected'
  | 'Closed & Verified';

export interface ComplianceGap {
  gapId: string; // e.g. "GAP-001"
  componentId: string;
  triggeredRuleId: string;
  problemCategory: ProblemCategory;
  gapDetails: string;
  remediationAction: string;
  estimatedCostForeign: number;
  assignee: string;
  dueDate: string;
  evidenceSubmissionStatus: EvidenceSubmissionStatus;
  expertResolutionStatus: ExpertResolutionStatus;
}

export interface ComputedComplianceGap extends ComplianceGap {
  linkedProductId: string;
  triggeredRuleEffectiveStage: 'Currently Applicable' | 'Future Effective Requirement';
  remediationCostBase: number;
  remainingDays: number;
  escalationWarning:
    | 'Closed'
    | 'Overdue - Immediate Escalation'
    | 'Urgent Warning - Follow-up Required'
    | 'On Track';
  blocksDoCSigning: 'Blocks DoC Execution' | 'Non-blocking';
}

export type DocOrganizationMethod =
  | 'Consolidated Single Product Declaration'
  | 'Split Primary & Transport Declarations'
  | 'Pending Regulatory Confirmation';

export type AuthorizedSignerConfirmation =
  | 'Not Signed'
  | 'Pending Authorized Signatory'
  | 'Fully Executed & Signed';

export interface DeliveryProduct {
  productId: string; // PRD-01 to PRD-10
  techDossierArchiveId: string; // e.g. "TD-2026-PRD01-V1"
  draftDocNumberVersion: string; // e.g. "EU-DOC-2026-001-Rev2"
  docOrganizationMethod: DocOrganizationMethod;
  authorizedSignerConfirmation: AuthorizedSignerConfirmation;
}

export type Dimension1DataStatus =
  | 'Not Submitted'
  | 'Partially Submitted'
  | 'Pending Supplementary Info'
  | 'Fully Submitted';

export type Dimension2AuditStatus =
  | 'Pending Review'
  | 'Under Review'
  | 'Insufficient Evidence'
  | 'Non-compliance Identified'
  | 'Verified Compliant with Requirements';

export type Dimension3DeliveryStatus =
  | 'Not Started'
  | 'In Progress'
  | 'Pending Final Review'
  | 'Ready for Signature'
  | 'Fully Executed & Signed'
  | 'BLOCKED: Evidence Incomplete - Signing Prohibited';

export interface ComputedDeliveryProduct extends DeliveryProduct {
  productName: string;
  legalEntitySigner: string;
  productNameAndEntity: string;
  totalManagedComponents: number;
  submittedDataComponents: number;
  dataCompletenessPct: number;
  dimension1_DataStatus: Dimension1DataStatus;
  expertApprovedComponents: number;
  blockingOpenGapsCount: number;
  overdueOrUrgentActionsCount: number;
  dimension2_AuditStatus: Dimension2AuditStatus;
  accumulatedCostBase: number;
  budgetStatus: string;
  isBudgetOverrun: boolean;
  dimension3_DeliveryStatus: Dimension3DeliveryStatus;
  isBlockedByInterlock: boolean;
}

export interface AppState {
  parameters: GlobalParameters;
  rules: PPWRRule[];
  masterComponents: PackagingComponentMaster[];
  manufacturerIntakes: ManufacturerDataIntake[];
  expertAudits: ExpertAuditRecord[];
  gaps: ComplianceGap[];
  deliveries: DeliveryProduct[];
  lastSaved: string;
}
