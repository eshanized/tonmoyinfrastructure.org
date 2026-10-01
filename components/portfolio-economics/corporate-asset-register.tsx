'use client';

import { useState, useMemo } from 'react';
import { portfolioDataStore } from '@/lib/portfolio-economics/data-store';
import { formatCurrency } from '@/lib/portfolio-economics/decimal';
import type { Asset, AssetType } from '@/lib/portfolio-economics/types';
import {
  Server,
  Database,
  Network,
  Truck,
  FlaskConical,
  Search,
  ShieldCheck,
  Building,
  Info,
  DollarSign,
  TrendingDown,
} from 'lucide-react';

const assetIcons: Record<AssetType, typeof Server> = {
  Server: Server,
  Storage: Database,
  'Network Equipment': Network,
  'Optical Equipment': Network,
  'Laboratory Equipment': FlaskConical,
  'Other Equipment': Truck,
  Computer: Server,
};

export function CorporateAssetRegister({
  isInternal = false,
}: {
  isInternal?: boolean;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const assets = useMemo(() => portfolioDataStore.getAssets(), []);

  const types = useMemo(() => {
    return Array.from(new Set(assets.map((a) => a.assetType)));
  }, [assets]);

  const filteredAssets = useMemo(() => {
    return assets.filter((a) => {
      const matchesSearch =
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (a.notes && a.notes.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesType = typeFilter === 'all' || a.assetType === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [assets, searchTerm, typeFilter]);

  const totals = useMemo(() => {
    let cost = 0;
    let dep = 0;
    let book = 0;
    for (const a of assets) {
      cost += a.acquisitionCost;
      dep += a.estimatedEconomicDepreciation;
      book += a.bookValue;
    }
    return { cost, dep, book };
  }, [assets]);

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border border-border bg-card p-4">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="tiv-meta text-[11px]">ACTIVE CAPITAL ASSETS</span>
            <Building className="h-4 w-4 text-brand" />
          </div>
          <p className="mt-2 font-display text-2xl font-bold text-foreground">
            {assets.length} Units
          </p>
          <p className="mt-1 text-xs text-muted-foreground font-mono">
            Across 16 Data Centers &amp; 17 Logistics Hubs
          </p>
        </div>

        <div className="border border-border bg-card p-4">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="tiv-meta text-[11px]">HISTORICAL COST BASIS</span>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="mt-2 font-display text-2xl font-bold text-foreground">
            {formatCurrency(totals.cost, 'INR')}
          </p>
          <p className="mt-1 text-xs text-muted-foreground font-mono">
            Audited initial acquisition cash outlay
          </p>
        </div>

        <div className="border border-border bg-card p-4">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="tiv-meta text-[11px]">ECONOMIC DEPRECIATION</span>
            <TrendingDown className="h-4 w-4 text-amber-500" />
          </div>
          <p className="mt-2 font-display text-2xl font-bold text-foreground">
            {formatCurrency(totals.dep, 'INR')}
          </p>
          <p className="mt-1 text-xs text-muted-foreground font-mono">
            Straight-line useful life wear &amp; obsolescence
          </p>
        </div>

        <div className="border border-brand/40 bg-brand/5 p-4">
          <div className="flex items-center justify-between text-brand">
            <span className="tiv-meta text-[11px] font-semibold">TOTAL NET BOOK VALUE</span>
            <ShieldCheck className="h-4 w-4 text-brand" />
          </div>
          <p className="mt-2 font-display text-2xl font-bold text-brand">
            {formatCurrency(totals.book, 'INR')}
          </p>
          <p className="mt-1 text-xs text-muted-foreground font-mono">
            Accounted balance sheet asset valuation
          </p>
        </div>
      </div>

      {/* Main Asset Table */}
      <div className="border border-border bg-card">
        {/* Controls Bar */}
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="tiv-meta text-xs font-semibold">CORPORATE ASSET REGISTER</span>
            <span className="text-xs text-muted-foreground font-mono">
              ({filteredAssets.length} of {assets.length} items)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search assets or nodes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-8 rounded-none border border-border bg-background pl-8 pr-3 font-mono text-xs text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-8 rounded-none border border-border bg-background px-3 font-mono text-xs text-foreground focus:border-brand focus:outline-none"
            >
              <option value="all">All Asset Types</option>
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="border-b border-border bg-muted/40 uppercase text-[11px] text-muted-foreground">
              <tr>
                <th className="py-3 px-4 font-semibold">Asset / Infrastructure</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Deployment Location</th>
                <th className="py-3 px-4 font-semibold text-right">Acquisition</th>
                <th className="py-3 px-4 font-semibold text-right">Depreciation</th>
                <th className="py-3 px-4 font-semibold text-right text-brand">Net Book Value</th>
                <th className="py-3 px-4 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredAssets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-muted-foreground">
                    No infrastructure assets matched your query.
                  </td>
                </tr>
              ) : (
                filteredAssets.map((asset) => {
                  const Icon = assetIcons[asset.assetType] || Server;
                  const isExpanded = expandedId === asset.id;
                  return (
                    <tr
                      key={asset.id}
                      onClick={() => setExpandedId(isExpanded ? null : asset.id)}
                      className="group cursor-pointer hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-start gap-2.5">
                          <Icon className="h-4 w-4 text-brand mt-0.5 shrink-0" />
                          <div>
                            <div className="font-sans font-semibold text-foreground group-hover:text-brand transition-colors">
                              {asset.name}
                            </div>
                            <div className="text-[10px] text-muted-foreground font-mono">
                              ID: {asset.id} • Life: {asset.usefulLifeYears}y
                            </div>
                          </div>
                        </div>
                        {isExpanded && asset.notes && (
                          <div className="mt-2 text-xs font-sans text-muted-foreground bg-background/80 p-2.5 border border-border/60">
                            <strong>Accounting Notes:</strong> {asset.notes}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        <span className="inline-block border border-border px-1.5 py-0.5 text-[10px] bg-background">
                          {asset.assetType}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground font-sans">
                        {asset.location}
                      </td>
                      <td className="py-3 px-4 text-right text-foreground">
                        {formatCurrency(asset.acquisitionCost, asset.currency)}
                      </td>
                      <td className="py-3 px-4 text-right text-amber-600 dark:text-amber-400">
                        -{formatCurrency(asset.estimatedEconomicDepreciation, asset.currency)}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-brand">
                        {formatCurrency(asset.bookValue, asset.currency)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          {asset.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Anti-Valuation Methodology Footer Note */}
        <div className="border-t border-border bg-muted/20 p-4 flex items-start gap-3 text-xs text-muted-foreground">
          <Info className="h-4 w-4 text-brand mt-0.5 shrink-0" />
          <p className="leading-relaxed">
            <strong className="text-foreground">Formal Economic Accounting Principle:</strong> Under
            TIV&apos;s Portfolio Economics specification (Section 1), physical infrastructure —
            including the 16 Tier 3/4 Data Center facilities and 17 Courier Sortation Hubs — is
            valued strictly at historical acquisition cost less accumulated economic depreciation
            (Net Book Value). Speculative venture-style enterprise multiples, goodwill, or
            paper valuations are strictly prohibited across all TIV disclosures.
          </p>
        </div>
      </div>
    </div>
  );
}
