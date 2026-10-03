'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ExternalLink, Filter, Search, Layers, Box, Cpu } from 'lucide-react';
import { StatusBadge } from '@/components/shared/status-badge';
import {
  PlatformIcon,
  ArtifactClassificationBadge,
  AffiliationBadge,
} from '@/components/shared/source-badge';
import { SectionHeader } from '@/components/shared/section-header';
import { Callout } from '@/components/shared/callout';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import type { TechnicalArtifact } from '@/lib/types';

interface OpenTechnicalWorkViewProps {
  artifacts: TechnicalArtifact[];
}

type FilterCategory =
  | 'all'
  | 'repositories'
  | 'models'
  | 'datasets'
  | 'spaces'
  | 'libraries'
  | 'tools';

export function OpenTechnicalWorkView({ artifacts }: OpenTechnicalWorkViewProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterCounts = useMemo(() => {
    return {
      all: artifacts.length,
      repositories: artifacts.filter(
        (a) =>
          a.platformType === 'repository' ||
          a.artifactType === 'Application' ||
          a.artifactType === 'Software Platform' ||
          a.artifactType === 'Software System'
      ).length,
      models: artifacts.filter(
        (a) => a.platformType === 'model' || a.artifactType === 'AI Model'
      ).length,
      datasets: artifacts.filter(
        (a) => a.platformType === 'dataset' || a.artifactType === 'Dataset'
      ).length,
      spaces: artifacts.filter(
        (a) => a.platformType === 'space' || a.artifactType === 'Space / Demo'
      ).length,
      libraries: artifacts.filter(
        (a) => a.platformType === 'library' || a.artifactType === 'Library'
      ).length,
      tools: artifacts.filter(
        (a) => a.platformType === 'tool' || a.artifactType === 'Tool'
      ).length,
    };
  }, [artifacts]);

  const filteredArtifacts = useMemo(() => {
    return artifacts.filter((item) => {
      // Category filter
      let matchesCategory = true;
      if (activeFilter === 'repositories') {
        matchesCategory =
          item.platformType === 'repository' ||
          item.artifactType === 'Application' ||
          item.artifactType === 'Software Platform' ||
          item.artifactType === 'Software System';
      } else if (activeFilter === 'models') {
        matchesCategory =
          item.platformType === 'model' || item.artifactType === 'AI Model';
      } else if (activeFilter === 'datasets') {
        matchesCategory =
          item.platformType === 'dataset' || item.artifactType === 'Dataset';
      } else if (activeFilter === 'spaces') {
        matchesCategory =
          item.platformType === 'space' || item.artifactType === 'Space / Demo';
      } else if (activeFilter === 'libraries') {
        matchesCategory =
          item.platformType === 'library' || item.artifactType === 'Library';
      } else if (activeFilter === 'tools') {
        matchesCategory =
          item.platformType === 'tool' || item.artifactType === 'Tool';
      }

      // Search filter
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        matchesSearch =
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tags?.some((t) => t.toLowerCase().includes(q)) ||
          item.artifactType.toLowerCase().includes(q) ||
          item.platform.toLowerCase().includes(q);
      }

      return matchesCategory && matchesSearch;
    });
  }, [artifacts, activeFilter, searchQuery]);

  const tabs: { id: FilterCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Artifacts', count: filterCounts.all },
    { id: 'repositories', label: 'Repositories', count: filterCounts.repositories },
    { id: 'models', label: 'Models', count: filterCounts.models },
    { id: 'datasets', label: 'Datasets', count: filterCounts.datasets },
    { id: 'spaces', label: 'Spaces', count: filterCounts.spaces },
    { id: 'libraries', label: 'Libraries', count: filterCounts.libraries },
    { id: 'tools', label: 'Tools', count: filterCounts.tools },
  ];

  return (
    <div className="space-y-10">
      {/* Controls: Search and Filter Tabs */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 border-b border-border pb-3 sm:border-0 sm:pb-0">
            {tabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-xs transition-all ${
                    isActive
                      ? 'border-brand bg-brand text-brand-foreground font-semibold'
                      : 'border-border bg-card text-muted-foreground hover:border-brand/50 hover:text-foreground'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                      isActive
                        ? 'bg-black/20 text-white dark:bg-white/20'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search box */}
          <div className="relative min-w-[220px]">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword..."
              className="w-full border border-border bg-card py-1.5 pl-9 pr-3 font-mono text-xs outline-none transition-colors focus:border-brand"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Showing <strong className="text-foreground">{filteredArtifacts.length}</strong> of {artifacts.length} technical artifacts
          </span>
          {activeFilter !== 'all' && (
            <button
              onClick={() => setActiveFilter('all')}
              className="text-brand hover:underline font-mono text-[11px]"
            >
              Reset filter
            </button>
          )}
        </div>
      </div>

      {/* Artifacts Grid */}
      {filteredArtifacts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArtifacts.map((artifact) => {
            const isExternal =
              artifact.url.startsWith('http://') || artifact.url.startsWith('https://');

            return (
              <div
                key={artifact.slug}
                className="group relative flex flex-col justify-between border border-border bg-card p-6 transition-all hover:border-brand/40"
              >
                <span className="absolute left-0 top-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />

                <div>
                  {/* Top metadata */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center border border-border bg-secondary/30 text-muted-foreground group-hover:text-brand">
                        <PlatformIcon platform={artifact.platform} size={15} />
                      </div>
                      <ArtifactClassificationBadge classification={artifact.artifactType} />
                    </div>
                    <StatusBadge status={artifact.status} />
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 font-display text-xl tracking-tight transition-colors group-hover:text-brand">
                    {artifact.name}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {artifact.description}
                  </p>

                  {/* Parameters / Architecture callout for models */}
                  {artifact.parameterCount && (
                    <div className="mt-4 border-l-2 border-purple-500/50 bg-purple-500/5 p-2.5 font-mono text-xs">
                      <span className="text-muted-foreground block text-[10px]">PARAMETER CLASS</span>
                      <span className="font-semibold text-purple-600 dark:text-purple-400">
                        {artifact.parameterCount}
                      </span>
                      {artifact.modelArchitecture && (
                        <p className="mt-1 text-[11px] text-muted-foreground line-clamp-2">
                          {artifact.modelArchitecture}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Metadata list */}
                  <dl className="mt-5 space-y-2 border-t border-border pt-4 text-xs">
                    <div className="flex justify-between">
                      <dt className="tiv-meta">Platform</dt>
                      <dd className="font-mono capitalize">{artifact.platform}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="tiv-meta">Ownership</dt>
                      <dd>
                        <AffiliationBadge affiliation={artifact.affiliation} />
                      </dd>
                    </div>
                    {artifact.language && (
                      <div className="flex justify-between">
                        <dt className="tiv-meta">Language / Runtime</dt>
                        <dd className="font-mono">{artifact.language}</dd>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <dt className="tiv-meta">License</dt>
                      <dd className="font-mono">{artifact.license}</dd>
                    </div>
                    {artifact.latestRelease && (
                      <div className="flex justify-between">
                        <dt className="tiv-meta">Tag / Release</dt>
                        <dd className="font-mono text-brand font-semibold">
                          {artifact.latestRelease}
                        </dd>
                      </div>
                    )}
                  </dl>

                  {/* Tags */}
                  {artifact.tags && artifact.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1">
                      {artifact.tags.map((t) => (
                        <span
                          key={t}
                          className="border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                  {isExternal ? (
                    <a
                      href={artifact.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
                    >
                      <span>Authoritative Source</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <Link
                      href={artifact.url}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
                    >
                      <span>Explore Specification</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  )}

                  {artifact.documentation && artifact.documentation !== artifact.url && (
                    <Link
                      href={artifact.documentation}
                      className="font-mono text-xs text-muted-foreground hover:text-foreground"
                    >
                      Project Page
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="border border-border bg-card p-12 text-center">
          <p className="text-sm text-muted-foreground">
            No technical artifacts match your filter &quot;{activeFilter}&quot;
            {searchQuery ? ` and query "${searchQuery}"` : ''}.
          </p>
          <button
            onClick={() => {
              setActiveFilter('all');
              setSearchQuery('');
            }}
            className="mt-4 inline-flex items-center gap-2 border border-border px-4 py-2 font-mono text-xs text-brand hover:border-brand"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
