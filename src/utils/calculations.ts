import {
  GlobalParameters,
  PPWRRule,
  ComputedPPWRRule,
  PackagingComponentMaster,
  ComputedPackagingComponentMaster,
  ManufacturerDataIntake,
  ComputedManufacturerDataIntake,
  ExpertAuditRecord,
  ComputedEvidenceCheck,
  ComplianceGap,
  ComputedComplianceGap,
  DeliveryProduct,
  ComputedDeliveryProduct,
  Dimension1DataStatus,
  Dimension2AuditStatus,
  Dimension3DeliveryStatus,
} from '../types/ppwr';

/**
 * Compute rules table with live effective stages, version check, and component counts
 */
export function computeRules(
  rules: PPWRRule[],
  params: GlobalParameters,
  components: PackagingComponentMaster[]
): ComputedPPWRRule[] {
  return rules.map((rule) => {
    const effectiveStage =
      rule.effectiveDate <= params.assessmentBaseDate
        ? 'Currently Applicable'
        : 'Future Effective Requirement';

    const versionStatus =
      rule.ruleVersion === params.activeRuleVersion
        ? 'Active Approved Version'
        : 'Outdated Version - Needs Update';

    const coveredComponentsCount = components.filter((c) => {
      if (rule.applicableTier === 'All Packaging Tiers') return true;
      return c.tier === rule.applicableTier;
    }).length;

    return {
      ...rule,
      effectiveStage,
      versionStatus,
      coveredComponentsCount,
    };
  });
}

/**
 * Compute packaging master data with key uniqueness, applicable rule count, and submission status
 */
export function computeMasterComponents(
  components: PackagingComponentMaster[],
  computedRules: ComputedPPWRRule[],
  intakes: ManufacturerDataIntake[]
): ComputedPackagingComponentMaster[] {
  // Count frequency of component IDs for key uniqueness
  const idCounts = new Map<string, number>();
  for (const c of components) {
    idCounts.set(c.componentId, (idCounts.get(c.componentId) || 0) + 1);
  }

  // Count intake records for each component
  const intakeCounts = new Map<string, number>();
  for (const intake of intakes) {
    intakeCounts.set(intake.componentId, (intakeCounts.get(intake.componentId) || 0) + 1);
  }

  // Count components per product
  const productComponentCounts = new Map<string, number>();
  for (const c of components) {
    productComponentCounts.set(c.productId, (productComponentCounts.get(c.productId) || 0) + 1);
  }

  return components.map((comp) => {
    const freq = idCounts.get(comp.componentId) || 0;
    const keyUniqueCheck = freq > 1 ? 'Duplicate Key - Needs Fix' : 'Unique OK';

    // Count currently applicable rules covering this component's tier
    const applicableRulesCount = computedRules.filter(
      (r) =>
        r.effectiveStage === 'Currently Applicable' &&
        (r.applicableTier === 'All Packaging Tiers' || r.applicableTier === comp.tier)
    ).length;

    const intakeCount = intakeCounts.get(comp.componentId) || 0;
    let dataIntakeStatus: 'Not Submitted' | 'Intake Record Received' | 'Duplicate Submission' =
      'Not Submitted';
    if (intakeCount === 1) {
      dataIntakeStatus = 'Intake Record Received';
    } else if (intakeCount > 1) {
      dataIntakeStatus = 'Duplicate Submission';
    }

    const productComponentCount = productComponentCounts.get(comp.productId) || 0;

    return {
      ...comp,
      keyUniqueCheck,
      applicableRulesCount,
      dataIntakeStatus,
      productComponentCount,
    };
  });
}

/**
 * Compute manufacturer data intakes with linked product/tier, weight sum, void space %, and fx-converted cost
 */
export function computeIntakes(
  intakes: ManufacturerDataIntake[],
  components: PackagingComponentMaster[],
  params: GlobalParameters
): ComputedManufacturerDataIntake[] {
  const compMap = new Map(components.map((c) => [c.componentId, c]));

  return intakes.map((intake) => {
    const comp = compMap.get(intake.componentId);
    const linkedProductId = comp ? comp.productId : 'Unregistered Component';
    const linkedTier = comp ? comp.tier : 'Unregistered Component';

    const breakdownTotalWeightG =
      (Number(intake.mainMaterialWeightG) || 0) + (Number(intake.subsidiaryMaterialWeightG) || 0);

    const outerVol = Number(intake.outerVolumeCm3) || 0;
    const innerVol = Number(intake.innerItemVolumeCm3) || 0;
    const voidSpaceRatio = outerVol <= 0 ? 0 : Math.max(0, (outerVol - innerVol) / outerVol);

    const supplementaryTestCostBase =
      (Number(intake.supplementaryTestQuoteForeign) || 0) * (Number(params.fxMultiplier) || 1.0);

    return {
      ...intake,
      linkedProductId,
      linkedTier,
      breakdownTotalWeightG: Number(breakdownTotalWeightG.toFixed(2)),
      voidSpaceRatio: Number(voidSpaceRatio.toFixed(4)),
      supplementaryTestCostBase: Number(supplementaryTestCostBase.toFixed(2)),
    };
  });
}

/**
 * Compute automated machine quality checks and synthesize with regulatory expert audits
 */
export function computeEvidenceChecks(
  components: PackagingComponentMaster[],
  computedIntakes: ComputedManufacturerDataIntake[],
  expertAudits: ExpertAuditRecord[],
  params: GlobalParameters
): ComputedEvidenceCheck[] {
  const intakeMap = new Map(computedIntakes.map((i) => [i.componentId, i]));
  const auditMap = new Map(expertAudits.map((a) => [a.componentId, a]));

  return components.map((comp) => {
    const intake = intakeMap.get(comp.componentId);
    const audit = auditMap.get(comp.componentId);

    // 1. Mandatory completeness check
    let mandatoryCompleteness: 'Not Submitted' | 'Partially Submitted' | 'Submitted' =
      'Not Submitted';
    if (!intake) {
      mandatoryCompleteness = 'Not Submitted';
    } else {
      const hasWeight = intake.declaredTotalWeightG > 0;
      const hasVolume = intake.outerVolumeCm3 > 0;
      const hasMetals = intake.heavyMetalsPpm !== null && intake.heavyMetalsPpm !== undefined;
      const hasDeclaration = Boolean(intake.supplierDeclarationDocId?.trim());

      if (hasWeight && hasVolume && hasMetals && hasDeclaration) {
        mandatoryCompleteness = 'Submitted';
      } else {
        mandatoryCompleteness = 'Partially Submitted';
      }
    }

    // 2. Weight logic consistency check
    let weightConsistency:
      | 'Pending Submission'
      | 'Anomaly - Total Weight Missing/Zero'
      | 'Consistent'
      | 'Discrepancy - Exceeds Weight Tolerance' = 'Pending Submission';
    let weightDeviationPct = 0;

    if (!intake || mandatoryCompleteness === 'Not Submitted') {
      weightConsistency = 'Pending Submission';
    } else if (intake.declaredTotalWeightG <= 0) {
      weightConsistency = 'Anomaly - Total Weight Missing/Zero';
    } else {
      weightDeviationPct =
        Math.abs(intake.declaredTotalWeightG - intake.breakdownTotalWeightG) /
        intake.declaredTotalWeightG;
      if (weightDeviationPct <= params.weightTolerancePct) {
        weightConsistency = 'Consistent';
      } else {
        weightConsistency = 'Discrepancy - Exceeds Weight Tolerance';
      }
    }

    // 3. Heavy metal screening check
    let heavyMetalsScreening:
      | 'Missing Lab Test Value'
      | 'Screening Pass'
      | 'Exceeded - Over 100 PPM Limit' = 'Missing Lab Test Value';
    const heavyMetalsValue = intake ? intake.heavyMetalsPpm : null;

    if (!intake || heavyMetalsValue === null || heavyMetalsValue === undefined) {
      heavyMetalsScreening = 'Missing Lab Test Value';
    } else if (heavyMetalsValue <= params.heavyMetalLimitPpm) {
      heavyMetalsScreening = 'Screening Pass';
    } else {
      heavyMetalsScreening = 'Exceeded - Over 100 PPM Limit';
    }

    // 4. Void space ratio screening check
    let voidSpaceScreening:
      | 'Pending Submission'
      | 'Exempt (Primary Packaging)'
      | 'Compliant with Threshold'
      | 'Exceeded - Void Space Exceeds Cap' = 'Pending Submission';
    const voidSpaceValue = intake ? intake.voidSpaceRatio : 0;

    if (!intake || mandatoryCompleteness === 'Not Submitted') {
      voidSpaceScreening = 'Pending Submission';
    } else if (comp.tier === 'Primary Packaging') {
      voidSpaceScreening = 'Exempt (Primary Packaging)';
    } else if (voidSpaceValue <= params.maxTransportVoidRatio) {
      voidSpaceScreening = 'Compliant with Threshold';
    } else {
      voidSpaceScreening = 'Exceeded - Void Space Exceeds Cap';
    }

    // 5. Supporting evidence index status
    const hasDec = Boolean(intake?.supplierDeclarationDocId?.trim());
    const hasReport = Boolean(intake?.labTestReportDocId?.trim());
    let evidenceIndexStatus:
      | 'Dual Evidence Indexed'
      | 'Declaration Only (No Test Report)'
      | 'Test Report Only (No Declaration)'
      | 'No Supporting Evidence Indexed' = 'No Supporting Evidence Indexed';

    if (hasDec && hasReport) {
      evidenceIndexStatus = 'Dual Evidence Indexed';
    } else if (hasDec && !hasReport) {
      evidenceIndexStatus = 'Declaration Only (No Test Report)';
    } else if (!hasDec && hasReport) {
      evidenceIndexStatus = 'Test Report Only (No Declaration)';
    } else {
      evidenceIndexStatus = 'No Supporting Evidence Indexed';
    }

    // 6. Automated machine comprehensive diagnostic
    let machineDiagnostic:
      | 'Machine Pass - Pending Expert Review'
      | 'Data Missing - Pending Escalation'
      | 'Data Discrepancy or Limit Breach - Requires Action' =
      'Data Missing - Pending Escalation';

    if (mandatoryCompleteness !== 'Submitted') {
      machineDiagnostic = 'Data Missing - Pending Escalation';
    } else {
      const isWeightOk = weightConsistency === 'Consistent';
      const isMetalsOk = heavyMetalsScreening === 'Screening Pass';
      const isVoidOk =
        voidSpaceScreening === 'Compliant with Threshold' ||
        voidSpaceScreening === 'Exempt (Primary Packaging)';

      if (isWeightOk && isMetalsOk && isVoidOk) {
        machineDiagnostic = 'Machine Pass - Pending Expert Review';
      } else {
        machineDiagnostic = 'Data Discrepancy or Limit Breach - Requires Action';
      }
    }

    // 7. Expert Audit values (from audit record)
    const expertConclusion = audit?.expertConclusion || 'Pending Review';
    const auditRuleVersion = audit?.auditRuleVersion || params.activeRuleVersion;
    const auditorNameDate = audit?.auditorNameDate || '';
    const expertNotes = audit?.expertNotes || '';

    // 8. Final Combined Status synthesis
    let finalComplianceStatus:
      | 'Pending Review'
      | 'Under Review'
      | 'Insufficient Evidence'
      | 'Non-compliance Identified'
      | 'Pending Review - Rule Version Updated, Re-audit Required'
      | 'Verified Compliant with Requirements' = 'Pending Review';

    if (machineDiagnostic === 'Data Missing - Pending Escalation') {
      finalComplianceStatus = 'Insufficient Evidence';
    } else if (machineDiagnostic === 'Data Discrepancy or Limit Breach - Requires Action') {
      finalComplianceStatus = 'Non-compliance Identified';
    } else if (
      expertConclusion === 'Verified Compliant with Requirements' &&
      auditRuleVersion !== params.activeRuleVersion
    ) {
      finalComplianceStatus = 'Pending Review - Rule Version Updated, Re-audit Required';
    } else if (!expertConclusion || expertConclusion === 'Pending Review') {
      finalComplianceStatus = 'Pending Review';
    } else {
      finalComplianceStatus = expertConclusion;
    }

    const isAnomaly =
      finalComplianceStatus === 'Non-compliance Identified' ||
      heavyMetalsScreening === 'Exceeded - Over 100 PPM Limit' ||
      weightConsistency === 'Discrepancy - Exceeds Weight Tolerance' ||
      voidSpaceScreening === 'Exceeded - Void Space Exceeds Cap';

    return {
      componentId: comp.componentId,
      productId: comp.productId,
      productName: comp.productName,
      componentName: comp.componentName,
      tier: comp.tier,
      mandatoryCompleteness,
      weightConsistency,
      weightDeviationPct: Number((weightDeviationPct * 100).toFixed(1)),
      heavyMetalsScreening,
      heavyMetalsValue,
      voidSpaceScreening,
      voidSpaceValue: Number((voidSpaceValue * 100).toFixed(1)),
      evidenceIndexStatus,
      machineDiagnostic,
      expertConclusion,
      auditRuleVersion,
      auditorNameDate,
      expertNotes,
      finalComplianceStatus,
      isAnomaly,
    };
  });
}

/**
 * Compute compliance gap action items with remaining days, urgency warning, and DoC blocking flag
 */
export function computeGaps(
  gaps: ComplianceGap[],
  components: PackagingComponentMaster[],
  rules: PPWRRule[],
  params: GlobalParameters
): ComputedComplianceGap[] {
  const compMap = new Map(components.map((c) => [c.componentId, c]));
  const ruleMap = new Map(rules.map((r) => [r.ruleId, r]));

  // Reference date calculation
  const baseDateParts = params.assessmentBaseDate.split('-').map(Number);
  const baseDateObj = new Date(baseDateParts[0], baseDateParts[1] - 1, baseDateParts[2]);

  return gaps.map((gap) => {
    const comp = compMap.get(gap.componentId);
    const linkedProductId = comp ? comp.productId : 'Unknown Product';

    const rule = ruleMap.get(gap.triggeredRuleId);
    const triggeredRuleEffectiveStage: 'Currently Applicable' | 'Future Effective Requirement' =
      rule && rule.effectiveDate <= params.assessmentBaseDate
        ? 'Currently Applicable'
        : 'Future Effective Requirement';

    const remediationCostBase =
      (Number(gap.estimatedCostForeign) || 0) * (Number(params.fxMultiplier) || 1.0);

    let remainingDays = 0;
    if (gap.expertResolutionStatus === 'Closed & Verified') {
      remainingDays = 0;
    } else if (gap.dueDate) {
      const dueParts = gap.dueDate.split('-').map(Number);
      const dueDateObj = new Date(dueParts[0], dueParts[1] - 1, dueParts[2]);
      const diffTime = dueDateObj.getTime() - baseDateObj.getTime();
      remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    let escalationWarning:
      | 'Closed'
      | 'Overdue - Immediate Escalation'
      | 'Urgent Warning - Follow-up Required'
      | 'On Track' = 'On Track';

    if (gap.expertResolutionStatus === 'Closed & Verified') {
      escalationWarning = 'Closed';
    } else if (remainingDays < 0) {
      escalationWarning = 'Overdue - Immediate Escalation';
    } else if (remainingDays <= params.escalationLeadDays) {
      escalationWarning = 'Urgent Warning - Follow-up Required';
    } else {
      escalationWarning = 'On Track';
    }

    const blocksDoCSigning: 'Blocks DoC Execution' | 'Non-blocking' =
      gap.expertResolutionStatus !== 'Closed & Verified' &&
      triggeredRuleEffectiveStage === 'Currently Applicable'
        ? 'Blocks DoC Execution'
        : 'Non-blocking';

    return {
      ...gap,
      linkedProductId,
      triggeredRuleEffectiveStage,
      remediationCostBase: Number(remediationCostBase.toFixed(2)),
      remainingDays,
      escalationWarning,
      blocksDoCSigning,
    };
  });
}

/**
 * Compute the delivery dashboard with 3-dimensional status, safety interlock, and budget tracking
 */
export function computeDeliveries(
  deliveries: DeliveryProduct[],
  components: PackagingComponentMaster[],
  computedChecks: ComputedEvidenceCheck[],
  computedGaps: ComputedComplianceGap[],
  computedIntakes: ComputedManufacturerDataIntake[],
  params: GlobalParameters
): ComputedDeliveryProduct[] {
  const compByProduct = new Map<string, PackagingComponentMaster[]>();
  for (const c of components) {
    const list = compByProduct.get(c.productId) || [];
    list.push(c);
    compByProduct.set(c.productId, list);
  }

  const checkByCompId = new Map(computedChecks.map((ck) => [ck.componentId, ck]));

  return deliveries.map((delivery) => {
    const prodComponents = compByProduct.get(delivery.productId) || [];
    const productName = prodComponents[0]?.productName || delivery.productId;
    const legalEntitySigner = prodComponents[0]?.legalEntitySigner || 'Pending Designation';
    const productNameAndEntity = `${productName} (${legalEntitySigner})`;

    const totalManagedComponents = prodComponents.length;

    // Component counts from evidence checks
    let submittedDataComponents = 0;
    let partialComponents = 0;
    let expertApprovedComponents = 0;
    let nonCompliantComponents = 0;
    let insufficientComponents = 0;
    let underReviewComponents = 0;

    for (const comp of prodComponents) {
      const check = checkByCompId.get(comp.componentId);
      if (!check) continue;

      if (check.mandatoryCompleteness === 'Submitted') submittedDataComponents++;
      if (check.mandatoryCompleteness === 'Partially Submitted') partialComponents++;

      if (check.finalComplianceStatus === 'Verified Compliant with Requirements') {
        expertApprovedComponents++;
      } else if (check.finalComplianceStatus === 'Non-compliance Identified') {
        nonCompliantComponents++;
      } else if (check.finalComplianceStatus === 'Insufficient Evidence') {
        insufficientComponents++;
      } else if (check.finalComplianceStatus === 'Under Review') {
        underReviewComponents++;
      }
    }

    const dataCompletenessPct =
      totalManagedComponents === 0 ? 0 : submittedDataComponents / totalManagedComponents;

    // Dimension 1: Data Status
    let dimension1_DataStatus: Dimension1DataStatus = 'Not Submitted';
    if (dataCompletenessPct >= params.dataCompletenessThreshold) {
      dimension1_DataStatus = 'Fully Submitted';
    } else if (submittedDataComponents === 0 && partialComponents === 0) {
      dimension1_DataStatus = 'Not Submitted';
    } else if (partialComponents > 0) {
      dimension1_DataStatus = 'Pending Supplementary Info';
    } else {
      dimension1_DataStatus = 'Partially Submitted';
    }

    // Gaps for this product
    const prodGaps = computedGaps.filter((g) => g.linkedProductId === delivery.productId);
    const blockingOpenGapsCount = prodGaps.filter(
      (g) => g.blocksDoCSigning === 'Blocks DoC Execution'
    ).length;
    const overdueOrUrgentActionsCount = prodGaps.filter(
      (g) =>
        g.escalationWarning === 'Overdue - Immediate Escalation' ||
        g.escalationWarning === 'Urgent Warning - Follow-up Required'
    ).length;

    // Dimension 2: Audit Status
    let dimension2_AuditStatus: Dimension2AuditStatus = 'Pending Review';
    if (
      totalManagedComponents > 0 &&
      expertApprovedComponents === totalManagedComponents &&
      blockingOpenGapsCount === 0
    ) {
      dimension2_AuditStatus = 'Verified Compliant with Requirements';
    } else if (nonCompliantComponents > 0 || blockingOpenGapsCount > 0) {
      dimension2_AuditStatus = 'Non-compliance Identified';
    } else if (insufficientComponents > 0) {
      dimension2_AuditStatus = 'Insufficient Evidence';
    } else if (underReviewComponents > 0 || expertApprovedComponents > 0) {
      dimension2_AuditStatus = 'Under Review';
    } else {
      dimension2_AuditStatus = 'Pending Review';
    }

    // Costs
    const prodIntakes = computedIntakes.filter((i) => i.linkedProductId === delivery.productId);
    const testCosts = prodIntakes.reduce((acc, curr) => acc + curr.supplementaryTestCostBase, 0);
    const gapCosts = prodGaps.reduce((acc, curr) => acc + curr.remediationCostBase, 0);
    const accumulatedCostBase = Number((testCosts + gapCosts).toFixed(2));

    const budgetDifference = params.productRemediationBudgetCap - accumulatedCostBase;
    const isBudgetOverrun = budgetDifference < 0;
    const budgetStatus =
      budgetDifference >= 0
        ? `Within Budget (Surplus: ${params.currencySymbol}${budgetDifference.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})`
        : `Budget Overrun Warning (Exceeded: ${params.currencySymbol}${Math.abs(budgetDifference).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})`;

    // Dimension 3: Final Delivery Status + SAFETY INTERLOCK
    const hasDossier = Boolean(delivery.techDossierArchiveId?.trim());
    const hasDocDraft = Boolean(delivery.draftDocNumberVersion?.trim());
    const isSigned = delivery.authorizedSignerConfirmation === 'Fully Executed & Signed';
    const isPendingSign =
      delivery.authorizedSignerConfirmation === 'Pending Authorized Signatory';

    let dimension3_DeliveryStatus: Dimension3DeliveryStatus = 'Not Started';
    let isBlockedByInterlock = false;

    // ⚡ CRITICAL SAFETY INTERLOCK
    if (isSigned && dimension2_AuditStatus !== 'Verified Compliant with Requirements') {
      dimension3_DeliveryStatus = 'BLOCKED: Evidence Incomplete - Signing Prohibited';
      isBlockedByInterlock = true;
    } else if (
      isSigned &&
      dimension2_AuditStatus === 'Verified Compliant with Requirements' &&
      hasDossier &&
      hasDocDraft
    ) {
      dimension3_DeliveryStatus = 'Fully Executed & Signed';
    } else if (
      dimension2_AuditStatus === 'Verified Compliant with Requirements' &&
      hasDossier &&
      hasDocDraft &&
      isPendingSign
    ) {
      dimension3_DeliveryStatus = 'Ready for Signature';
    } else if (
      dimension2_AuditStatus === 'Verified Compliant with Requirements' &&
      hasDossier &&
      hasDocDraft
    ) {
      dimension3_DeliveryStatus = 'Pending Final Review';
    } else if (hasDossier || hasDocDraft || submittedDataComponents > 0) {
      dimension3_DeliveryStatus = 'In Progress';
    } else {
      dimension3_DeliveryStatus = 'Not Started';
    }

    return {
      ...delivery,
      productName,
      legalEntitySigner,
      productNameAndEntity,
      totalManagedComponents,
      submittedDataComponents,
      dataCompletenessPct: Number((dataCompletenessPct * 100).toFixed(1)),
      dimension1_DataStatus,
      expertApprovedComponents,
      blockingOpenGapsCount,
      overdueOrUrgentActionsCount,
      dimension2_AuditStatus,
      accumulatedCostBase,
      budgetStatus,
      isBudgetOverrun,
      dimension3_DeliveryStatus,
      isBlockedByInterlock,
    };
  });
}

/**
 * Filter and sort top urgent unclosed gaps (sorted by remaining days ascending)
 */
export function computeTopUrgentGaps(computedGaps: ComputedComplianceGap[]): ComputedComplianceGap[] {
  return computedGaps
    .filter((g) => g.expertResolutionStatus !== 'Closed & Verified')
    .sort((a, b) => a.remainingDays - b.remainingDays);
}

/**
 * Compute executive high-level KPIs across the entire project
 */
export function computeExecutiveKpis(
  deliveries: ComputedDeliveryProduct[],
  gaps: ComputedComplianceGap[],
  components: ComputedPackagingComponentMaster[],
  params: GlobalParameters
) {
  const totalProducts = deliveries.length;
  const fullySignedProducts = deliveries.filter(
    (d) => d.dimension3_DeliveryStatus === 'Fully Executed & Signed'
  ).length;
  const readyForSigningProducts = deliveries.filter(
    (d) => d.dimension3_DeliveryStatus === 'Ready for Signature'
  ).length;
  const blockedProducts = deliveries.filter((d) => d.isBlockedByInterlock).length;

  const totalComponents = components.length;
  const totalOpenGaps = gaps.filter((g) => g.expertResolutionStatus !== 'Closed & Verified').length;
  const overdueGaps = gaps.filter((g) => g.escalationWarning === 'Overdue - Immediate Escalation').length;
  const urgentGaps = gaps.filter((g) => g.escalationWarning === 'Urgent Warning - Follow-up Required').length;
  const totalRemediationCost = deliveries.reduce((acc, curr) => acc + curr.accumulatedCostBase, 0);

  return {
    totalProducts,
    fullySignedProducts,
    readyForSigningProducts,
    blockedProducts,
    totalComponents,
    totalOpenGaps,
    overdueGaps,
    urgentGaps,
    totalRemediationCost: `${params.currencySymbol}${totalRemediationCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  };
}
