'use client';

import { useState } from 'react';
import {
  exportInvestmentsCsv,
  exportOperatingCostsCsv,
  exportRevenueCsv,
  exportEngineeringHoursCsv,
  exportAssetAllocationsCsv,
  importInvestmentsCsv,
  importOperatingCostsCsv,
  importRevenueCsv,
  importEngineeringHoursCsv,
} from '@/lib/portfolio-economics/csv';
import { Download, Upload, CheckCircle2, AlertCircle, FileText } from 'lucide-react';

export function CsvExchangeModal({
  periodId,
  onDataChanged,
}: {
  periodId: string;
  onDataChanged?: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'export' | 'import'>('export');
  const [importType, setImportType] = useState<
    'investments' | 'costs' | 'revenue' | 'hours'
  >('investments');
  const [csvText, setCsvText] = useState('');
  const [importMessage, setImportMessage] = useState<{
    success: boolean;
    text: string;
    errors?: string[];
  } | null>(null);

  const downloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = (type: string) => {
    switch (type) {
      case 'investments':
        downloadFile('project_investments.csv', exportInvestmentsCsv(periodId));
        break;
      case 'costs':
        downloadFile('project_costs.csv', exportOperatingCostsCsv(periodId));
        break;
      case 'revenue':
        downloadFile('project_revenue.csv', exportRevenueCsv(periodId));
        break;
      case 'hours':
        downloadFile('engineering_hours.csv', exportEngineeringHoursCsv(periodId));
        break;
      case 'assets':
        downloadFile('asset_allocations.csv', exportAssetAllocationsCsv(periodId));
        break;
    }
  };

  const handleImport = () => {
    setImportMessage(null);
    if (!csvText.trim()) {
      setImportMessage({ success: false, text: 'Please paste CSV content to import.' });
      return;
    }

    let res;
    switch (importType) {
      case 'investments':
        res = importInvestmentsCsv(csvText, 'admin');
        break;
      case 'costs':
        res = importOperatingCostsCsv(csvText, 'admin');
        break;
      case 'revenue':
        res = importRevenueCsv(csvText, 'admin');
        break;
      case 'hours':
        res = importEngineeringHoursCsv(csvText, 'admin');
        break;
    }

    if (res.success) {
      setImportMessage({
        success: true,
        text: `Successfully imported ${res.records.length} record(s) with audit logging.`,
      });
      setCsvText('');
      if (onDataChanged) onDataChanged();
    } else {
      setImportMessage({
        success: false,
        text: 'CSV validation failed. Malformed records rejected:',
        errors: res.errors,
      });
    }
  };

  return (
    <div className="border border-border bg-card p-6">
      <div className="flex flex-col gap-2 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-brand" />
            <span className="tiv-meta text-xs">DATA INTERCHANGE</span>
          </div>
          <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
            CSV Import &amp; Export Center
          </h3>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              setActiveTab('export');
              setImportMessage(null);
            }}
            className={`px-3 py-1.5 font-mono text-xs ${
              activeTab === 'export'
                ? 'bg-foreground text-background font-medium'
                : 'border border-border bg-muted/30 text-muted-foreground'
            }`}
          >
            Export CSVs
          </button>
          <button
            onClick={() => {
              setActiveTab('import');
              setImportMessage(null);
            }}
            className={`px-3 py-1.5 font-mono text-xs ${
              activeTab === 'import'
                ? 'bg-foreground text-background font-medium'
                : 'border border-border bg-muted/30 text-muted-foreground'
            }`}
          >
            Import CSV
          </button>
        </div>
      </div>

      {activeTab === 'export' ? (
        <div className="mt-6 space-y-4">
          <p className="text-xs text-muted-foreground">
            Download standard RFC 4180 CSV files representing current financial period records.
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { id: 'investments', label: 'project_investments.csv', desc: 'Cash vs economic development investment' },
              { id: 'costs', label: 'project_costs.csv', desc: 'Direct operating costs by category' },
              { id: 'revenue', label: 'project_revenue.csv', desc: 'Attributed and unattributed revenue records' },
              { id: 'hours', label: 'engineering_hours.csv', desc: 'Engineering hours by person and work type' },
              { id: 'assets', label: 'asset_allocations.csv', desc: 'Hardware & compute operational allocations' },
            ].map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between border border-border bg-background p-3"
              >
                <div>
                  <span className="font-mono text-xs font-semibold text-foreground block">{item.label}</span>
                  <span className="text-[11px] text-muted-foreground mt-1 block">{item.desc}</span>
                </div>
                <button
                  onClick={() => handleExport(item.id)}
                  className="mt-3 inline-flex items-center gap-1.5 border border-border bg-muted/30 px-2.5 py-1 text-xs font-mono text-foreground hover:border-brand hover:text-brand"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <label className="text-xs font-mono uppercase text-muted-foreground">Target Entity:</label>
            <select
              value={importType}
              onChange={(e) => setImportType(e.target.value as any)}
              className="border border-border bg-background px-3 py-1 font-mono text-xs text-foreground focus:border-brand focus:outline-none"
            >
              <option value="investments">Development Investments</option>
              <option value="costs">Operating Costs</option>
              <option value="revenue">Project Revenue</option>
              <option value="hours">Engineering Hours</option>
            </select>
          </div>

          <div>
            <textarea
              rows={6}
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              placeholder="Paste valid CSV rows with headers..."
              className="w-full border border-border bg-background p-3 font-mono text-xs text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground">
              Validates schema, entity IDs, period IDs, and decimal numbers before ingestion.
            </span>
            <button
              onClick={handleImport}
              className="inline-flex items-center gap-1.5 border border-brand bg-brand px-4 py-1.5 text-xs font-medium text-white hover:bg-brand/90"
            >
              <Upload className="h-3.5 w-3.5" />
              Validate &amp; Ingest
            </button>
          </div>

          {importMessage && (
            <div
              className={`p-3 border text-xs font-mono ${
                importMessage.success
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400'
              }`}
            >
              <div className="flex items-center gap-2">
                {importMessage.success ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 shrink-0" />
                )}
                <span>{importMessage.text}</span>
              </div>
              {importMessage.errors && (
                <ul className="mt-2 ml-6 list-disc space-y-1">
                  {importMessage.errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
