'use client';

import { useState } from 'react';
import { generateReport, getPublishedVersions, publishNewReportVersion } from '@/lib/portfolio-economics/reports';
import { Printer, Download, Copy, Check, FileCheck, Layers } from 'lucide-react';

export function ReportPreviewModal({
  periodId,
  isInternal = false,
}: {
  periodId: string;
  isInternal?: boolean;
}) {
  const [selectedVersion, setSelectedVersion] = useState('v1.0');
  const [copied, setCopied] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);
  const [newVersionTag, setNewVersionTag] = useState('v1.1');
  const [publishNotes, setPublishNotes] = useState('');
  const [publishMsg, setPublishMsg] = useState<string | null>(null);

  const versions = getPublishedVersions();
  const report = generateReport(periodId, isInternal, selectedVersion);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(report.jsonPayload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePublish = () => {
    try {
      publishNewReportVersion(
        periodId,
        newVersionTag,
        'Eshan Roy (Administrator)',
        publishNotes || 'Incremental verified data update.'
      );
      setPublishMsg(`Published ${newVersionTag} successfully.`);
      setSelectedVersion(newVersionTag);
      setPublishOpen(false);
    } catch (e: any) {
      setPublishMsg(e.message);
    }
  };

  return (
    <div className="border border-border bg-card p-6">
      <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-brand" />
            <span className="tiv-meta text-xs">OFFICIAL REPORT PREVIEW</span>
          </div>
          <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
            {report.title} ({selectedVersion})
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {versions.length > 0 && (
            <select
              value={selectedVersion}
              onChange={(e) => setSelectedVersion(e.target.value)}
              className="border border-border bg-background px-2.5 py-1 font-mono text-xs text-foreground"
            >
              {versions.map((v) => (
                <option key={v.id} value={v.version}>
                  {v.fiscalYear} {v.version} ({new Date(v.publishedAt).toLocaleDateString()})
                </option>
              ))}
            </select>
          )}

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1 border border-border bg-background px-2.5 py-1 text-xs font-mono text-foreground hover:border-brand hover:text-brand"
          >
            <Printer className="h-3.5 w-3.5" />
            Print / PDF
          </button>

          <button
            onClick={handleCopyJson}
            className="inline-flex items-center gap-1 border border-border bg-background px-2.5 py-1 text-xs font-mono text-foreground hover:border-brand hover:text-brand"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied' : 'JSON'}
          </button>

          {isInternal && (
            <button
              onClick={() => setPublishOpen(!publishOpen)}
              className="inline-flex items-center gap-1 border border-brand/40 bg-brand/10 px-2.5 py-1 text-xs font-mono text-brand hover:bg-brand/20"
            >
              <FileCheck className="h-3.5 w-3.5" />
              Publish Version
            </button>
          )}
        </div>
      </div>

      {publishOpen && (
        <div className="mt-4 border border-brand/30 bg-brand/5 p-4 text-xs font-mono">
          <span className="font-semibold text-foreground block mb-2">Publish Immutable Version</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-[10px] text-muted-foreground block">Version Tag (e.g. v1.1):</label>
              <input
                type="text"
                value={newVersionTag}
                onChange={(e) => setNewVersionTag(e.target.value)}
                className="w-full border border-border bg-background px-2 py-1 text-foreground"
              />
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground block">Release Notes:</label>
              <input
                type="text"
                value={publishNotes}
                onChange={(e) => setPublishNotes(e.target.value)}
                placeholder="Audit memorandum notes..."
                className="w-full border border-border bg-background px-2 py-1 text-foreground"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setPublishOpen(false)}
              className="px-3 py-1 border border-border bg-background text-muted-foreground"
            >
              Cancel
            </button>
            <button
              onClick={handlePublish}
              className="px-3 py-1 bg-brand text-white font-medium"
            >
              Confirm &amp; Freeze
            </button>
          </div>
        </div>
      )}

      {publishMsg && (
        <p className="mt-2 text-xs font-mono text-emerald-500">{publishMsg}</p>
      )}

      {/* Report Document Content */}
      <div className="mt-6 border border-border bg-background p-6 font-sans text-sm">
        {/* Document Header */}
        <div className="border-b border-border pb-4 flex justify-between items-start">
          <div>
            <span className="tiv-meta text-xs text-brand block">TONMOY INFRASTRUCTURE AND VISION</span>
            <h2 className="text-xl font-display font-bold text-foreground mt-1">
              Portfolio Economics Report
            </h2>
            <p className="text-xs font-mono text-muted-foreground mt-1">
              Period: {report.reportingPeriod} • Version: {report.version} • Status: {report.dataStatus}
            </p>
          </div>
          <span className="border border-border px-2 py-1 text-[11px] font-mono text-muted-foreground">
            {report.classification}
          </span>
        </div>

        {/* Executive Summary */}
        <div className="mt-4">
          <span className="tiv-meta text-[10px] text-muted-foreground block">EXECUTIVE SUMMARY</span>
          <p className="mt-1 text-xs text-foreground leading-relaxed">
            {report.executiveSummary}
          </p>
        </div>

        {/* Methodology Notice */}
        <div className="mt-4 border-l-2 border-brand pl-3 text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Methodology:</strong> {report.methodologyOverview}
        </div>

        {/* Projects Summary Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-border text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="py-2">Project</th>
                <th className="py-2">Status</th>
                <th className="py-2 text-right">Dev Investment</th>
                <th className="py-2 text-right">Operating Cost</th>
                <th className="py-2 text-right">Revenue</th>
                <th className="py-2 text-right">Hours</th>
                <th className="py-2 text-right">Contribution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {report.projectsTable.map((p, idx) => (
                <tr key={idx}>
                  <td className="py-2 font-medium text-foreground">{p.project}</td>
                  <td className="py-2 text-muted-foreground">{p.status}</td>
                  <td className="py-2 text-right">{p.investment}</td>
                  <td className="py-2 text-right">{p.operatingCost}</td>
                  <td className="py-2 text-right">{p.revenue}</td>
                  <td className="py-2 text-right">{p.engineeringHours}</td>
                  <td className="py-2 text-right font-semibold">{p.contribution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Document Footer */}
        <div className="mt-6 border-t border-border pt-3 flex justify-between text-[11px] text-muted-foreground font-mono">
          <span>TIV Portfolio Economics Engine</span>
          <span>Generated: {new Date(report.generatedAt).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
