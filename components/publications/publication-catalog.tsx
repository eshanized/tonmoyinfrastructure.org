'use client';

import { useState, useMemo } from 'react';
import { Search, X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import type { Publication, PublicationStatus } from '@/lib/publications/types';
import { filterPublications } from '@/lib/publications/filter';
import { PublicationCard } from './publication-card';

interface PublicationCatalogProps {
  initialPublications: Publication[];
  areas: string[];
  types: string[];
  statuses: PublicationStatus[];
}

export function PublicationCatalog({
  initialPublications,
  areas,
  types,
  statuses,
}: PublicationCatalogProps) {
  const [search, setSearch] = useState('');
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title'>('newest');

  const filtered = useMemo(() => {
    return filterPublications(initialPublications, {
      search,
      area: selectedArea,
      status: selectedStatus as PublicationStatus | 'all',
      type: selectedType,
      sortBy,
    });
  }, [initialPublications, search, selectedArea, selectedStatus, selectedType, sortBy]);

  const hasActiveFilters =
    search.trim() !== '' ||
    selectedArea !== 'all' ||
    selectedStatus !== 'all' ||
    selectedType !== 'all' ||
    sortBy !== 'newest';

  const resetFilters = () => {
    setSearch('');
    setSelectedArea('all');
    setSelectedStatus('all');
    setSelectedType('all');
    setSortBy('newest');
  };

  return (
    <div className="space-y-8">
      {/* Search and filter toolbar */}
      <div className="border border-border bg-card p-4 md:p-6 space-y-4">
        {/* Top search input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search publications by title, abstract, authors, identifier, or keywords..."
            aria-label="Search publications"
            className="w-full bg-secondary/40 border border-border pl-10 pr-10 py-2.5 font-mono text-xs md:text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-brand transition-colors"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filter controls row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-border/50">
          {/* Area Filter */}
          <div>
            <label htmlFor="filter-area" className="tiv-meta text-[10px] block mb-1">
              Research Area
            </label>
            <select
              id="filter-area"
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full bg-secondary/30 border border-border px-3 py-1.5 font-mono text-xs text-foreground focus:outline-none focus:border-brand"
            >
              <option value="all">All Areas ({initialPublications.length})</option>
              {areas.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label htmlFor="filter-status" className="tiv-meta text-[10px] block mb-1">
              Status
            </label>
            <select
              id="filter-status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-secondary/30 border border-border px-3 py-1.5 font-mono text-xs text-foreground focus:outline-none focus:border-brand"
            >
              <option value="all">All Statuses</option>
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label htmlFor="filter-type" className="tiv-meta text-[10px] block mb-1">
              Publication Type
            </label>
            <select
              id="filter-type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-secondary/30 border border-border px-3 py-1.5 font-mono text-xs text-foreground focus:outline-none focus:border-brand"
            >
              <option value="all">All Types</option>
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label htmlFor="filter-sort" className="tiv-meta text-[10px] block mb-1">
              Sort Order
            </label>
            <select
              id="filter-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'title')}
              className="w-full bg-secondary/30 border border-border px-3 py-1.5 font-mono text-xs text-foreground focus:outline-none focus:border-brand"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title (A–Z)</option>
            </select>
          </div>
        </div>

        {/* Counter and Active Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/40 font-mono text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-3.5 w-3.5 text-brand" />
            <span>
              Showing <strong className="text-foreground">{filtered.length}</strong> of{' '}
              <strong className="text-foreground">{initialPublications.length}</strong> publications
            </span>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 text-xs text-brand hover:underline font-mono"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Publications list / Zero results */}
      {filtered.length === 0 ? (
        <div className="border border-border bg-card p-12 text-center">
          <div className="mx-auto max-w-md space-y-3">
            <h4 className="font-display text-lg text-foreground">No publications found</h4>
            <p className="text-sm text-muted-foreground">
              No research publications matched your current filter criteria. Try adjusting your
              search query or clearing active filters.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 inline-flex items-center gap-2 border border-border px-4 py-2 font-mono text-xs text-foreground transition-colors hover:border-brand hover:text-brand"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset all filters</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((publication) => (
            <PublicationCard key={publication.slug} publication={publication} />
          ))}
        </div>
      )}
    </div>
  );
}
