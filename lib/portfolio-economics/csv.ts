// ─── CSV Import / Export System ───────────────────────────────────────────
// Supports:
// - project_investments.csv
// - project_costs.csv
// - project_revenue.csv
// - engineering_hours.csv
// - asset_allocations.csv
// Validates imports strictly, rejecting malformed records with line-numbered error messages.

import { portfolioDataStore } from './data-store';
import { isValidProjectId } from './registry';
import { getFinancialPeriod } from './periods';
import type {
  DevelopmentInvestment,
  OperatingCost,
  ProjectRevenue,
  EngineeringHourRecord,
  AssetAllocation,
  InvestmentCategory,
  OperatingCostCategory,
  RevenueType,
  AttributionMethod,
  EngineeringWorkType,
  DataConfidence,
  AssetAllocationBasis,
} from './types';

// Helper to escape CSV cell
function escapeCell(val: unknown): string {
  if (val === null || val === undefined) return '';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

// Simple RFC 4180 CSV parser
function parseCsvLines(csvText: string): string[][] {
  const lines: string[][] = [];
  const rows = csvText.trim().split(/\r?\n/);
  for (const row of rows) {
    if (!row.trim()) continue;
    const cells: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      if (char === '"') {
        if (inQuotes && row[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        cells.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    cells.push(current.trim());
    lines.push(cells);
  }
  return lines;
}

export interface CsvImportResult<T> {
  success: boolean;
  records: T[];
  errors: string[];
}

// ─── 1. Project Investments CSV ─────────────────────────────────────────────

export function exportInvestmentsCsv(periodId?: string): string {
  const records = portfolioDataStore.getInvestments(periodId);
  const headers = [
    'id',
    'project_id',
    'financial_period_id',
    'category',
    'cash_amount',
    'economic_amount',
    'currency',
    'cash_or_non_cash',
    'rate_methodology',
    'source_id',
    'confidence',
    'approval_status',
    'notes',
  ];

  const rows = records.map((r) =>
    [
      r.id,
      r.projectId,
      r.financialPeriodId,
      r.category,
      r.cashAmount !== null ? r.cashAmount : '',
      r.economicAmount !== null ? r.economicAmount : '',
      r.currency,
      r.cashOrNonCash,
      r.rateMethodology || '',
      r.sourceId,
      r.confidence,
      r.approvalStatus,
      r.notes || '',
    ]
      .map(escapeCell)
      .join(',')
  );

  return [headers.join(','), ...rows].join('\n');
}

export function importInvestmentsCsv(
  csvText: string,
  user = 'admin'
): CsvImportResult<DevelopmentInvestment> {
  const lines = parseCsvLines(csvText);
  if (lines.length < 2) {
    return { success: false, records: [], errors: ['CSV file is empty or missing headers.'] };
  }

  const errors: string[] = [];
  const records: DevelopmentInvestment[] = [];

  // line 0 is headers
  for (let idx = 1; idx < lines.length; idx++) {
    const row = lines[idx];
    const lineNum = idx + 1;
    if (row.length < 11) {
      errors.push(`Line ${lineNum}: Insufficient columns (expected at least 11, got ${row.length}).`);
      continue;
    }

    const [
      id,
      projectId,
      periodId,
      category,
      cashStr,
      econStr,
      currency,
      cashOrNonCash,
      rateMethodology,
      sourceId,
      confidence,
      approvalStatus,
      notes,
    ] = row;

    if (!projectId || !isValidProjectId(projectId)) {
      errors.push(`Line ${lineNum}: Invalid project_id "${projectId}".`);
    }
    if (!periodId || !getFinancialPeriod(periodId)) {
      errors.push(`Line ${lineNum}: Invalid or unregistered financial_period_id "${periodId}".`);
    }

    const cashAmount = cashStr ? parseFloat(cashStr) : null;
    const economicAmount = econStr ? parseFloat(econStr) : null;

    if (cashAmount !== null && isNaN(cashAmount)) {
      errors.push(`Line ${lineNum}: Invalid cash_amount "${cashStr}".`);
    }
    if (economicAmount !== null && isNaN(economicAmount)) {
      errors.push(`Line ${lineNum}: Invalid economic_amount "${econStr}".`);
    }

    if (errors.length === 0) {
      records.push({
        id: id || `inv-${Date.now()}-${idx}`,
        projectId,
        financialPeriodId: periodId,
        category: (category as InvestmentCategory) || 'Development',
        cashAmount,
        economicAmount,
        currency: currency || 'INR',
        cashOrNonCash: (cashOrNonCash as 'cash' | 'non_cash' | 'mixed') || 'mixed',
        rateMethodology,
        sourceId: sourceId || 'src-est-mgt-2026',
        confidence: (confidence as DataConfidence) || 'Estimated',
        approvalStatus: (approvalStatus as any) || 'Draft',
        visibility: 'public',
        notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  }

  if (errors.length === 0) {
    for (const rec of records) {
      portfolioDataStore.addInvestment(rec, user);
    }
    return { success: true, records, errors: [] };
  }

  return { success: false, records: [], errors };
}

// ─── 2. Project Operating Costs CSV ─────────────────────────────────────────

export function exportOperatingCostsCsv(periodId?: string): string {
  const records = portfolioDataStore.getOperatingCosts(periodId);
  const headers = [
    'id',
    'project_id',
    'financial_period_id',
    'category',
    'amount',
    'currency',
    'direct_or_allocated',
    'source_id',
    'confidence',
    'approval_status',
    'notes',
  ];

  const rows = records.map((r) =>
    [
      r.id,
      r.projectId,
      r.financialPeriodId,
      r.category,
      r.amount,
      r.currency,
      r.directOrAllocated,
      r.sourceId,
      r.confidence,
      r.approvalStatus,
      r.notes || '',
    ]
      .map(escapeCell)
      .join(',')
  );

  return [headers.join(','), ...rows].join('\n');
}

export function importOperatingCostsCsv(
  csvText: string,
  user = 'admin'
): CsvImportResult<OperatingCost> {
  const lines = parseCsvLines(csvText);
  if (lines.length < 2) {
    return { success: false, records: [], errors: ['CSV is empty or missing headers.'] };
  }

  const errors: string[] = [];
  const records: OperatingCost[] = [];

  for (let idx = 1; idx < lines.length; idx++) {
    const row = lines[idx];
    const lineNum = idx + 1;
    if (row.length < 8) {
      errors.push(`Line ${lineNum}: Insufficient columns.`);
      continue;
    }

    const [
      id,
      projectId,
      periodId,
      category,
      amountStr,
      currency,
      directOrAllocated,
      sourceId,
      confidence,
      approvalStatus,
      notes,
    ] = row;

    if (!projectId || !isValidProjectId(projectId)) {
      errors.push(`Line ${lineNum}: Invalid project_id "${projectId}".`);
    }
    if (!periodId || !getFinancialPeriod(periodId)) {
      errors.push(`Line ${lineNum}: Invalid financial_period_id "${periodId}".`);
    }
    const amount = parseFloat(amountStr);
    if (isNaN(amount)) {
      errors.push(`Line ${lineNum}: Invalid numeric amount "${amountStr}".`);
    }

    if (errors.length === 0) {
      records.push({
        id: id || `cost-${Date.now()}-${idx}`,
        projectId,
        financialPeriodId: periodId,
        category: (category as OperatingCostCategory) || 'Other',
        amount,
        currency: currency || 'INR',
        directOrAllocated: (directOrAllocated as 'direct' | 'allocated') || 'direct',
        sourceId: sourceId || 'src-infra-inv-2026',
        confidence: (confidence as DataConfidence) || 'Estimated',
        approvalStatus: (approvalStatus as any) || 'Draft',
        visibility: 'public',
        notes,
      });
    }
  }

  if (errors.length === 0) {
    for (const rec of records) {
      portfolioDataStore.addOperatingCost(rec, user);
    }
    return { success: true, records, errors: [] };
  }

  return { success: false, records: [], errors };
}

// ─── 3. Project Revenue CSV ─────────────────────────────────────────────────

export function exportRevenueCsv(periodId?: string): string {
  const records = portfolioDataStore.getRevenues(periodId);
  const headers = [
    'id',
    'project_id',
    'financial_period_id',
    'amount',
    'currency',
    'revenue_type',
    'attribution_method',
    'source_id',
    'confidence',
    'visibility',
    'notes',
  ];

  const rows = records.map((r) =>
    [
      r.id,
      r.projectId || '',
      r.financialPeriodId,
      r.amount,
      r.currency,
      r.revenueType,
      r.attributionMethod,
      r.sourceId,
      r.confidence,
      r.visibility,
      r.notes || '',
    ]
      .map(escapeCell)
      .join(',')
  );

  return [headers.join(','), ...rows].join('\n');
}

export function importRevenueCsv(
  csvText: string,
  user = 'admin'
): CsvImportResult<ProjectRevenue> {
  const lines = parseCsvLines(csvText);
  if (lines.length < 2) {
    return { success: false, records: [], errors: ['CSV is empty or missing headers.'] };
  }

  const errors: string[] = [];
  const records: ProjectRevenue[] = [];

  for (let idx = 1; idx < lines.length; idx++) {
    const row = lines[idx];
    const lineNum = idx + 1;
    if (row.length < 8) {
      errors.push(`Line ${lineNum}: Insufficient columns.`);
      continue;
    }

    const [
      id,
      projectId,
      periodId,
      amountStr,
      currency,
      revenueType,
      attributionMethod,
      sourceId,
      confidence,
      visibility,
      notes,
    ] = row;

    if (projectId && !isValidProjectId(projectId)) {
      errors.push(`Line ${lineNum}: Invalid project_id "${projectId}".`);
    }
    if (!periodId || !getFinancialPeriod(periodId)) {
      errors.push(`Line ${lineNum}: Invalid financial_period_id "${periodId}".`);
    }
    const amount = parseFloat(amountStr);
    if (isNaN(amount)) {
      errors.push(`Line ${lineNum}: Invalid amount "${amountStr}".`);
    }

    if (errors.length === 0) {
      records.push({
        id: id || `rev-${Date.now()}-${idx}`,
        projectId: projectId || undefined,
        financialPeriodId: periodId,
        amount,
        currency: currency || 'INR',
        revenueType: (revenueType as RevenueType) || 'Direct',
        attributionMethod: (attributionMethod as AttributionMethod) || 'Direct Invoice',
        sourceId: sourceId || 'src-gl-2026',
        confidence: (confidence as DataConfidence) || 'Estimated',
        approvalStatus: 'Draft',
        visibility: (visibility as any) || 'internal',
        notes,
      });
    }
  }

  if (errors.length === 0) {
    for (const rec of records) {
      portfolioDataStore.addRevenue(rec, user);
    }
    return { success: true, records, errors: [] };
  }

  return { success: false, records: [], errors };
}

// ─── 4. Engineering Hours CSV ───────────────────────────────────────────────

export function exportEngineeringHoursCsv(periodId?: string): string {
  const records = portfolioDataStore.getEngineeringHours(periodId);
  const headers = [
    'id',
    'project_id',
    'person_id',
    'date',
    'hours',
    'work_type',
    'financial_period_id',
    'source_id',
    'confidence',
    'notes',
  ];

  const rows = records.map((r) =>
    [
      r.id,
      r.projectId,
      r.personId,
      r.date,
      r.hours,
      r.workType,
      r.financialPeriodId,
      r.sourceId,
      r.confidence,
      r.notes || '',
    ]
      .map(escapeCell)
      .join(',')
  );

  return [headers.join(','), ...rows].join('\n');
}

export function importEngineeringHoursCsv(
  csvText: string,
  user = 'admin'
): CsvImportResult<EngineeringHourRecord> {
  const lines = parseCsvLines(csvText);
  if (lines.length < 2) {
    return { success: false, records: [], errors: ['CSV is empty or missing headers.'] };
  }

  const errors: string[] = [];
  const records: EngineeringHourRecord[] = [];

  for (let idx = 1; idx < lines.length; idx++) {
    const row = lines[idx];
    const lineNum = idx + 1;
    if (row.length < 8) {
      errors.push(`Line ${lineNum}: Insufficient columns.`);
      continue;
    }

    const [
      id,
      projectId,
      personId,
      date,
      hoursStr,
      workType,
      periodId,
      sourceId,
      confidence,
      notes,
    ] = row;

    if (!projectId || !isValidProjectId(projectId)) {
      errors.push(`Line ${lineNum}: Invalid project_id "${projectId}".`);
    }
    if (!periodId || !getFinancialPeriod(periodId)) {
      errors.push(`Line ${lineNum}: Invalid financial_period_id "${periodId}".`);
    }
    const hours = parseFloat(hoursStr);
    if (isNaN(hours) || hours <= 0) {
      errors.push(`Line ${lineNum}: Hours must be a positive number.`);
    }

    if (errors.length === 0) {
      records.push({
        id: id || `eng-${Date.now()}-${idx}`,
        projectId,
        personId: personId || 'eshan-roy',
        date: date || '2026-03-31',
        hours,
        workType: (workType as EngineeringWorkType) || 'Development',
        financialPeriodId: periodId,
        sourceId: sourceId || 'src-eng-log-2026',
        confidence: (confidence as DataConfidence) || 'Verified',
        approvalStatus: 'Draft',
        notes,
      });
    }
  }

  if (errors.length === 0) {
    for (const rec of records) {
      portfolioDataStore.addEngineeringHours(rec, user);
    }
    return { success: true, records, errors: [] };
  }

  return { success: false, records: [], errors };
}

// ─── 5. Asset Allocations CSV ───────────────────────────────────────────────

export function exportAssetAllocationsCsv(periodId?: string): string {
  const records = portfolioDataStore.getAssetAllocations(periodId);
  const headers = [
    'id',
    'asset_id',
    'project_id',
    'period_id',
    'allocation_percentage',
    'allocation_basis',
    'notes',
  ];

  const rows = records.map((r) =>
    [
      r.id,
      r.assetId,
      r.projectId,
      r.periodId,
      r.allocationPercentage,
      r.allocationBasis,
      r.notes || '',
    ]
      .map(escapeCell)
      .join(',')
  );

  return [headers.join(','), ...rows].join('\n');
}
