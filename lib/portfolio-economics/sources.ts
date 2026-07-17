// ─── Financial Sources, Lineage & Confidence Model ─────────────────────────
// Every economic figure must support a traceable source and confidence level.
// Answers: "Where did this number come from?"

import type { FinancialSource, FinancialSourceType, DataConfidence } from './types';

// Initial authentic financial sources tied to TIV's FY2026 reporting
const initialSources: FinancialSource[] = [
  {
    id: 'src-gl-2026',
    sourceType: 'Accounting Record',
    reference: 'GL-FY2026-MGT',
    description: 'TIV General Ledger & Management Financial Summary FY2026',
    document: 'TIV Annual Financial Statement FY2026 (Management Accounts)',
    date: '2026-03-31',
    createdAt: '2026-04-01T00:00:00Z',
  },
  {
    id: 'src-infra-inv-2026',
    sourceType: 'Invoice',
    reference: 'INV-INFRA-2026-AGG',
    description: 'Consolidated infrastructure, dedicated compute, and cloud hosting provider invoices',
    document: 'Hosting & Server Billing Records 2025-2026',
    date: '2026-03-15',
    createdAt: '2026-04-01T00:00:00Z',
  },
  {
    id: 'src-eng-log-2026',
    sourceType: 'Timesheet',
    reference: 'ENG-LOG-FY2026-S1',
    description: 'Engineering logs, commit telemetry, and founder architecture hours ledger',
    document: 'TIV Engineering & Architecture Log FY2026',
    date: '2026-03-31',
    createdAt: '2026-04-01T00:00:00Z',
  },
  {
    id: 'src-asset-reg-2026',
    sourceType: 'Asset Register',
    reference: 'AST-REG-2026-V1',
    description: 'Corporate Hardware, Server, Storage, and Optical Equipment Asset Register',
    document: 'TIV Fixed Asset & Equipment Ledger 2026',
    date: '2026-03-31',
    createdAt: '2026-04-01T00:00:00Z',
  },
  {
    id: 'src-rev-contracts-2026',
    sourceType: 'Contract',
    reference: 'CTR-REV-2026-AGG',
    description: 'Corporate hosting, infrastructure services, and domain agreements',
    document: 'Commercial Service & Hosting Agreements FY2026',
    date: '2026-03-31',
    createdAt: '2026-04-01T00:00:00Z',
  },
  {
    id: 'src-est-mgt-2026',
    sourceType: 'Management Estimate',
    reference: 'EST-MGT-2026-ALLOC',
    description: 'Management cost allocation policy based on compute usage and engineering time',
    document: 'TIV Management Cost Allocation Memorandum FY2026',
    date: '2026-04-05',
    createdAt: '2026-04-05T00:00:00Z',
  },
];

let sourcesStore: FinancialSource[] = [...initialSources];

export function getFinancialSources(): FinancialSource[] {
  return [...sourcesStore];
}

export function getFinancialSource(id: string): FinancialSource | undefined {
  return sourcesStore.find((s) => s.id === id);
}

export function validateFinancialSource(source: Partial<FinancialSource>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (!source.id) errors.push('Source ID is required.');
  if (!source.reference) errors.push('Source reference is required.');
  if (!source.description) errors.push('Source description is required.');
  if (!source.date) errors.push('Source date is required.');

  const validTypes: FinancialSourceType[] = [
    'Accounting Record',
    'Invoice',
    'Bank Record',
    'Payroll Record',
    'Timesheet',
    'Asset Register',
    'Contract',
    'Management Estimate',
    'Manual Allocation',
    'Other',
  ];
  if (!source.sourceType || !validTypes.includes(source.sourceType)) {
    errors.push(`Source type must be one of: ${validTypes.join(', ')}`);
  }
  return { isValid: errors.length === 0, errors };
}

export function registerFinancialSource(source: FinancialSource): void {
  const validation = validateFinancialSource(source);
  if (!validation.isValid) {
    throw new Error(`Invalid source record: ${validation.errors.join('; ')}`);
  }
  const idx = sourcesStore.findIndex((s) => s.id === source.id);
  if (idx >= 0) {
    sourcesStore[idx] = source;
  } else {
    sourcesStore.push(source);
  }
}

/**
 * Return human-readable lineage explanation for a metric.
 */
export function explainDataLineage(
  metricName: string,
  sourceId: string,
  confidence: DataConfidence,
  periodId: string,
  notes?: string
): {
  metric: string;
  period: string;
  confidence: DataConfidence;
  source: FinancialSource | null;
  summary: string;
} {
  const source = getFinancialSource(sourceId) || null;
  const summary = source
    ? `${metricName} is derived from ${source.sourceType} "${source.reference}" (${source.description}) dated ${source.date}. Confidence: ${confidence}.${notes ? ` Note: ${notes}` : ''}`
    : `${metricName} has no registered source record. Confidence: ${confidence}.`;

  return {
    metric: metricName,
    period: periodId,
    confidence,
    source,
    summary,
  };
}
