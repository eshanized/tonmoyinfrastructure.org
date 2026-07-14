// ─── Audit Trail Model ─────────────────────────────────────────────────────
// Tracks changes to financial records.
// Logs: user, role, action, entity, entityId, oldValue, newValue, timestamp.
// NEVER logs secrets or tokens.

import type { AuditLogRecord } from './types';

const auditLogStore: AuditLogRecord[] = [
  {
    id: 'audit-init-001',
    timestamp: '2026-04-01T00:00:00Z',
    user: 'eshan-roy',
    role: 'Financial Administrator',
    action: 'create',
    entity: 'FinancialPeriod',
    entityId: 'fy2026',
    newValue: { fiscalYear: 'FY2026', status: 'Published' },
  },
  {
    id: 'audit-init-002',
    timestamp: '2026-04-01T00:00:00Z',
    user: 'eshan-roy',
    role: 'Financial Administrator',
    action: 'publish',
    entity: 'PortfolioEconomics',
    entityId: 'FY2026-v1.0',
    newValue: { version: 'v1.0', period: 'FY2026' },
  },
];

export function getAuditLogs(): AuditLogRecord[] {
  return [...auditLogStore].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export function logAuditAction(
  user: string,
  role: string,
  action: AuditLogRecord['action'],
  entity: string,
  entityId: string,
  oldValue?: Record<string, unknown> | null,
  newValue?: Record<string, unknown> | null
): AuditLogRecord {
  // Sanitize values to ensure no secrets or sensitive keys are logged
  const sanitize = (val?: Record<string, unknown> | null) => {
    if (!val) return null;
    const clean: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(val)) {
      if (/password|secret|token|key|auth/i.test(k)) {
        clean[k] = '[REDACTED]';
      } else {
        clean[k] = v;
      }
    }
    return clean;
  };

  const record: AuditLogRecord = {
    id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
    user,
    role,
    action,
    entity,
    entityId,
    oldValue: sanitize(oldValue),
    newValue: sanitize(newValue),
  };

  auditLogStore.push(record);
  return record;
}
