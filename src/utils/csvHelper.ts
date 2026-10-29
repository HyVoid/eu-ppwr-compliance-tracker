import {
  PackagingComponentMaster,
  ManufacturerDataIntake,
  ComplianceGap,
  MaterialCategory,
  PackagingTier,
  ProblemCategory,
  EvidenceSubmissionStatus,
  ExpertResolutionStatus,
} from '../types/ppwr';

/**
 * Robust CSV parser that handles commas inside quoted fields
 */
export function parseCSV(text: string): string[][] {
  const lines: string[][] = [];
  const rawLines = text.split(/\r?\n/);

  for (const rawLine of rawLines) {
    if (!rawLine.trim()) continue;
    const row: string[] = [];
    let insideQuote = false;
    let entry = '';

    for (let i = 0; i < rawLine.length; i++) {
      const char = rawLine[i];
      if (char === '"') {
        if (insideQuote && rawLine[i + 1] === '"') {
          entry += '"';
          i++; // skip escaped quote
        } else {
          insideQuote = !insideQuote;
        }
      } else if (char === ',' && !insideQuote) {
        row.push(entry.trim());
        entry = '';
      } else {
        entry += char;
      }
    }
    row.push(entry.trim());
    lines.push(row);
  }

  return lines;
}

export function arrayToCSV(rows: (string | number | null | undefined)[][]): string {
  return rows
    .map((row) =>
      row
        .map((cell) => {
          if (cell === null || cell === undefined) return '';
          const str = String(cell);
          if (str.includes(',') || str.includes('"') || str.includes('\n')) {
            return `"${str.replace(/"/g, '""')}"`;
          }
          return str;
        })
        .join(',')
    )
    .join('\n');
}

export function downloadCSV(filename: string, csvContent: string): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Templates for bulk import
export const CSV_TEMPLATES = {
  masterComponents: {
    filename: 'ppwr_template_master_components.csv',
    header: [
      'componentId',
      'productId',
      'productName',
      'packagingId',
      'tier',
      'componentName',
      'materialCategory',
      'manufacturerName',
      'legalEntitySigner',
    ],
    sampleRow: [
      'CMP-030',
      'PRD-01',
      'Luminescent Glow Serum 50ml',
      'PKG-01-PRI',
      'Primary Packaging',
      'Protective Tamper Seal',
      'Plastic-PET',
      'Precision Shrink Tech',
      'Aura Care EU B.V. (Elena Rossi)',
    ],
  },
  manufacturerIntakes: {
    filename: 'ppwr_template_manufacturer_intakes.csv',
    header: [
      'recordId',
      'componentId',
      'declaredTotalWeightG',
      'mainMaterialWeightG',
      'subsidiaryMaterialWeightG',
      'outerVolumeCm3',
      'innerItemVolumeCm3',
      'heavyMetalsPpm',
      'pcrRatio',
      'supplierDeclarationDocId',
      'labTestReportDocId',
      'supplementaryTestQuoteForeign',
      'foreignCurrencyCode',
      'submissionDate',
    ],
    sampleRow: [
      'INT-030',
      'CMP-001',
      '120.0',
      '118.0',
      '2.0',
      '180.0',
      '50.0',
      '24.5',
      '0.40',
      'DOC-SUP-2026-99',
      'RPT-SGS-2026-001',
      '0',
      'EUR',
      '2026-08-12',
    ],
  },
  gaps: {
    filename: 'ppwr_template_compliance_gaps.csv',
    header: [
      'gapId',
      'componentId',
      'triggeredRuleId',
      'problemCategory',
      'gapDetails',
      'remediationAction',
      'estimatedCostForeign',
      'assignee',
      'dueDate',
      'evidenceSubmissionStatus',
      'expertResolutionStatus',
    ],
    sampleRow: [
      'GAP-010',
      'CMP-001',
      'RUL-PPWR-01',
      'Supplementary Lab Testing Required',
      'Sample description of evidence gap',
      'Sample remediation plan',
      '500.0',
      'Testing Coordinator',
      '2026-09-01',
      'Pending Submission',
      'Open',
    ],
  },
};

export function parseMasterComponentsCSV(csvText: string): PackagingComponentMaster[] {
  const rows = parseCSV(csvText);
  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => h.toLowerCase().replace(/[^a-z0-9]/g, ''));
  const getIndex = (name: string) => headers.findIndex((h) => h.includes(name));

  const idIdx = getIndex('componentid');
  const prodIdIdx = getIndex('productid');
  const prodNameIdx = getIndex('productname');
  const pkgIdIdx = getIndex('packagingid');
  const tierIdx = getIndex('tier');
  const compNameIdx = getIndex('componentname');
  const matIdx = getIndex('material');
  const mfrIdx = getIndex('manufacturer');
  const signerIdx = getIndex('signer');

  const results: PackagingComponentMaster[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const componentId = row[idIdx] || `CMP-${Date.now()}-${i}`;
    if (!componentId.trim()) continue;

    let tier: PackagingTier = 'Primary Packaging';
    const tierRaw = row[tierIdx]?.toLowerCase() || '';
    if (tierRaw.includes('sec')) tier = 'Secondary Packaging';
    else if (tierRaw.includes('trans')) tier = 'Transport Packaging';

    let materialCategory: MaterialCategory = 'Plastic-PP';
    const matRaw = row[matIdx] || '';
    if (matRaw.includes('Glass')) materialCategory = 'Glass';
    else if (matRaw.includes('PET')) materialCategory = 'Plastic-PET';
    else if (matRaw.includes('HDPE')) materialCategory = 'Plastic-HDPE';
    else if (matRaw.includes('Paper') || matRaw.includes('Cardboard')) materialCategory = 'Paper & Cardboard';
    else if (matRaw.includes('Alum')) materialCategory = 'Aluminum';
    else if (matRaw.includes('Steel')) materialCategory = 'Steel';
    else if (matRaw.includes('Composite')) materialCategory = 'Composite Material';

    results.push({
      componentId,
      productId: row[prodIdIdx] || 'PRD-01',
      productName: row[prodNameIdx] || 'Imported Product',
      packagingId: row[pkgIdIdx] || 'PKG-01-PRI',
      tier,
      componentName: row[compNameIdx] || 'Packaging Item',
      materialCategory,
      manufacturerName: row[mfrIdx] || 'Supplier',
      legalEntitySigner: row[signerIdx] || 'Authorized Representative',
    });
  }

  return results;
}

export function parseIntakesCSV(csvText: string): ManufacturerDataIntake[] {
  const rows = parseCSV(csvText);
  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => h.toLowerCase().replace(/[^a-z0-9]/g, ''));
  const getIndex = (name: string) => headers.findIndex((h) => h.includes(name));

  const recIdx = getIndex('recordid');
  const compIdx = getIndex('componentid');
  const totWIdx = getIndex('declaredtotalweight');
  const mainWIdx = getIndex('mainmaterialweight');
  const subWIdx = getIndex('subsidiarymaterial');
  const outVIdx = getIndex('outervolume');
  const inVIdx = getIndex('inneritemvolume');
  const metalsIdx = getIndex('heavymetals');
  const pcrIdx = getIndex('pcr');
  const decIdx = getIndex('supplierdeclaration');
  const repIdx = getIndex('labtestreport');
  const quoteIdx = getIndex('supplementarytestquote');
  const currIdx = getIndex('foreigncurrency');
  const dateIdx = getIndex('submissiondate');

  const results: ManufacturerDataIntake[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const componentId = row[compIdx];
    if (!componentId || !componentId.trim()) continue;

    const heavyVal = row[metalsIdx];
    const heavyMetalsPpm = heavyVal !== '' && !isNaN(Number(heavyVal)) ? Number(heavyVal) : null;

    results.push({
      recordId: row[recIdx] || `INT-${Date.now()}-${i}`,
      componentId: componentId.trim(),
      declaredTotalWeightG: Number(row[totWIdx]) || 0,
      mainMaterialWeightG: Number(row[mainWIdx]) || 0,
      subsidiaryMaterialWeightG: Number(row[subWIdx]) || 0,
      outerVolumeCm3: Number(row[outVIdx]) || 0,
      innerItemVolumeCm3: Number(row[inVIdx]) || 0,
      heavyMetalsPpm,
      pcrRatio: Number(row[pcrIdx]) || 0,
      supplierDeclarationDocId: row[decIdx] || '',
      labTestReportDocId: row[repIdx] || '',
      supplementaryTestQuoteForeign: Number(row[quoteIdx]) || 0,
      foreignCurrencyCode: row[currIdx] || 'EUR',
      submissionDate: row[dateIdx] || new Date().toISOString().split('T')[0],
    });
  }

  return results;
}

export function parseGapsCSV(csvText: string): ComplianceGap[] {
  const rows = parseCSV(csvText);
  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => h.toLowerCase().replace(/[^a-z0-9]/g, ''));
  const getIndex = (name: string) => headers.findIndex((h) => h.includes(name));

  const gapIdx = getIndex('gapid');
  const compIdx = getIndex('componentid');
  const ruleIdx = getIndex('ruleid');
  const catIdx = getIndex('category');
  const detIdx = getIndex('details');
  const actIdx = getIndex('remediation');
  const costIdx = getIndex('cost');
  const assIdx = getIndex('assignee');
  const dueIdx = getIndex('due');
  const subIdx = getIndex('submissions');
  const resIdx = getIndex('resolution');

  const results: ComplianceGap[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const componentId = row[compIdx];
    if (!componentId || !componentId.trim()) continue;

    let problemCategory: ProblemCategory = 'Supplementary Lab Testing Required';
    const catRaw = row[catIdx]?.toLowerCase() || '';
    if (catRaw.includes('missing')) problemCategory = 'Missing Raw Data';
    else if (catRaw.includes('inconsist') || catRaw.includes('discrep')) problemCategory = 'Data Inconsistency';
    else if (catRaw.includes('insuffic')) problemCategory = 'Insufficient Evidence';
    else if (catRaw.includes('design') || catRaw.includes('redesign')) problemCategory = 'Packaging Design Redesign Required';

    let evidenceSubmissionStatus: EvidenceSubmissionStatus = 'Pending Submission';
    const subRaw = row[subIdx]?.toLowerCase() || '';
    if (subRaw.includes('submit')) evidenceSubmissionStatus = 'Submitted Pending Review';
    else if (subRaw.includes('withdraw')) evidenceSubmissionStatus = 'Withdrawn';

    let expertResolutionStatus: ExpertResolutionStatus = 'Open';
    const resRaw = row[resIdx]?.toLowerCase() || '';
    if (resRaw.includes('closed') || resRaw.includes('verified')) expertResolutionStatus = 'Closed & Verified';
    else if (resRaw.includes('reject')) expertResolutionStatus = 'Rejected';

    results.push({
      gapId: row[gapIdx] || `GAP-${Date.now()}-${i}`,
      componentId: componentId.trim(),
      triggeredRuleId: row[ruleIdx] || 'RUL-PPWR-01',
      problemCategory,
      gapDetails: row[detIdx] || 'Imported compliance gap description',
      remediationAction: row[actIdx] || 'Execute corrective action',
      estimatedCostForeign: Number(row[costIdx]) || 0,
      assignee: row[assIdx] || 'Assigned Lead',
      dueDate: row[dueIdx] || new Date().toISOString().split('T')[0],
      evidenceSubmissionStatus,
      expertResolutionStatus,
    });
  }

  return results;
}
