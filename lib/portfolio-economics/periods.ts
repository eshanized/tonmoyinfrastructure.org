// ─── Financial Period Model ────────────────────────────────────────────────
// Supports FY2026 as initial implementation, with full support for future periods
// (FY2027, FY2028, FY2029...) without hardcoding period logic.

import type { FinancialPeriod, PeriodStatus } from './types';

// Initial financial periods
const initialPeriods: FinancialPeriod[] = [
  {
    id: 'fy2026',
    fiscalYear: 'FY2026',
    startDate: '2025-04-01',
    endDate: '2026-03-31',
    status: 'Published',
    currency: 'INR',
    notes: 'Initial operational and development period for TIV software and infrastructure.',
    createdAt: '2026-04-01T00:00:00Z',
    updatedAt: '2026-09-13T00:00:00Z',
  },
  {
    id: 'fy2027',
    fiscalYear: 'FY2027',
    startDate: '2026-04-01',
    endDate: '2027-03-31',
    status: 'Open',
    currency: 'INR',
    notes: 'Active fiscal period. Data in progressive intake and verification.',
    createdAt: '2026-04-01T00:00:00Z',
    updatedAt: '2026-09-13T00:00:00Z',
  },
  {
    id: 'fy2028',
    fiscalYear: 'FY2028',
    startDate: '2027-04-01',
    endDate: '2028-03-31',
    status: 'Open',
    currency: 'INR',
    notes: 'Future fiscal planning period.',
    createdAt: '2026-04-01T00:00:00Z',
    updatedAt: '2026-09-13T00:00:00Z',
  },
];

let financialPeriodsStore: FinancialPeriod[] = [...initialPeriods];

export function getFinancialPeriods(): FinancialPeriod[] {
  return [...financialPeriodsStore];
}

export function getFinancialPeriod(idOrFiscalYear: string): FinancialPeriod | undefined {
  const norm = idOrFiscalYear.trim().toLowerCase();
  return financialPeriodsStore.find(
    (p) => p.id.toLowerCase() === norm || p.fiscalYear.toLowerCase() === norm
  );
}

export function getDefaultFinancialPeriod(): FinancialPeriod {
  // Default to FY2026 for initial view, or first published/open
  return (
    getFinancialPeriod('fy2026') ||
    financialPeriodsStore[0] || {
      id: 'fy2026',
      fiscalYear: 'FY2026',
      startDate: '2025-04-01',
      endDate: '2026-03-31',
      status: 'Published',
      currency: 'INR',
      createdAt: '2026-04-01T00:00:00Z',
      updatedAt: '2026-09-13T00:00:00Z',
    }
  );
}

export function validateFinancialPeriod(period: Partial<FinancialPeriod>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (!period.id || typeof period.id !== 'string') {
    errors.push('Period ID is required.');
  }
  if (!period.fiscalYear || !/^FY\d{4}$/i.test(period.fiscalYear)) {
    errors.push('Fiscal Year must follow format "FY20XX" (e.g. FY2026).');
  }
  if (!period.startDate || !/^\d{4}-\d{2}-\d{2}$/.test(period.startDate)) {
    errors.push('Start Date must follow YYYY-MM-DD format.');
  }
  if (!period.endDate || !/^\d{4}-\d{2}-\d{2}$/.test(period.endDate)) {
    errors.push('End Date must follow YYYY-MM-DD format.');
  }
  if (period.startDate && period.endDate && period.startDate >= period.endDate) {
    errors.push('Start Date must precede End Date.');
  }
  const validStatuses: PeriodStatus[] = ['Open', 'Closed', 'Published'];
  if (period.status && !validStatuses.includes(period.status)) {
    errors.push(`Status must be one of: ${validStatuses.join(', ')}`);
  }
  return { isValid: errors.length === 0, errors };
}

export function registerFinancialPeriod(period: FinancialPeriod): void {
  const validation = validateFinancialPeriod(period);
  if (!validation.isValid) {
    throw new Error(`Invalid financial period: ${validation.errors.join('; ')}`);
  }
  const existingIdx = financialPeriodsStore.findIndex((p) => p.id === period.id);
  if (existingIdx >= 0) {
    financialPeriodsStore[existingIdx] = period;
  } else {
    financialPeriodsStore.push(period);
  }
}
