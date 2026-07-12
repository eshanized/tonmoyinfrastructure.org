# TIV Website Architecture & Technical Design

This document details the architectural principles, component models, and data pipeline of the Tonmoy Infrastructure and Vision (TIV) digital platform.

---

## 1. Architectural Principles

1. **Deterministic State & Static Pre-rendering**: Every route is statically determinable at build time using Next.js `generateStaticParams`. No client-side waterfall requests for core content.
2. **First-Principles Content Verification**: All datasets are codified in strict TypeScript and validated at runtime with Zod schemas (`lib/schemas.ts`). If data violates the schema, the build immediately fails.
3. **Restraint & Dignity**: UI animations are micro-subtle (`Reveal`, `StaggerContainer`), strictly respect `prefers-reduced-motion`, and rely on vector line work rather than skeuomorphic clutter.
4. **Vector First**: All architectural schematics (Network Topology, DWDM Optical Path, Technology Stack, System Map) are coded directly as resolution-independent SVGs with CSS variable color bindings.

---

## 2. Directory Architecture

The repository uses Next.js 13 App Router conventions:

- `app/(routes)`: Route segment configuration.
  - Sub-segments provide dedicated landing pages and dynamic detail parameters (e.g. `/products/[slug]`, `/projects/[slug]`, `/infrastructure/[slug]`, `/research/publications/[slug]`).
  - Strict static parameter generators ensure 100% static coverage.
- `components/`: Modular presentation components organized by domain:
  - `components/shared`: Core design primitives (PageHeader, SectionHeader, StatusBadge, Callout, Motion, Markdown).
  - `components/projects`: ProjectDetailView rendering the canonical 15-section specifications.
  - `components/infrastructure`: Technical vector schematics.
  - `components/technology`: Architectural layer diagrams.
  - `components/navigation`: Responsive desktop dropdowns and mobile navigation drawers.
- `lib/`: Content and data access layer:
  - `lib/schemas.ts`: Canonical Zod schemas ensuring no undefined fields, invalid statuses, or malformed links.
  - `lib/content.ts`: Shipped products, research areas, publications, news articles.
  - `lib/institutional.ts`: Governance records, unaudited financial estimates, releases, legal documents.
  - `lib/types.ts`: Strict TypeScript interfaces for compile-time enforcement.

---

## 3. Data Flow & Validation

```
[lib/content.ts & institutional.ts Raw Data]
                     │
                     ▼
             [lib/schemas.ts]
      (Zod Runtime Validation Pipeline)
                     │
                     ├────────► Build Error if Schema Fails
                     │
                     ▼
          [lib/types.ts Typings]
                     │
                     ▼
         [Next.js App Router Pages]
       (generateStaticParams & SEO)
                     │
                     ▼
        [Modular Domain Components]
                     │
                     ▼
        [Static HTML/CSS/SVG Output]
```

---

## 4. Status Taxonomy

Status values across the platform are strictly typed:

- **Product Status**:
  - `Stable Release`: Production-ready, fully shipped and maintained software (OpenMail, Mercura, M31A, Octate).
  - `Research`: Scientific investigation without commercial service.
  - `Planning`: Scoped architecture prior to initial build.
  - `Archived`: Legacy systems preserved for historical reference.
- **Development Stage**:
  - `Active`: Actively maintained with continuous enhancements.
  - `Maintenance`: Bug fixes and security patches only.
  - `Planning`: Initial design specification.

---

## 5. Styling & Design Tokens

Styling utilizes Tailwind CSS configured to read semantic CSS custom properties:
- Accent: Coral Red (`--brand`: `#E5484D`)
- Surfaces: Deep Black (`--background`: `#09090b`), Secondary (`--secondary`: `#18181b`), Card (`--card`: `#111113`)
- Borders: Subtle hairline (`--border`: `rgba(255, 255, 255, 0.1)`)
- Fonts: `var(--font-display)` (Instrument Serif / Syne), `var(--font-sans)` (Inter), `var(--font-jetbrains)` (JetBrains Mono).

---

## 6. Portfolio Economics System Architecture

The Portfolio Economics engine (`lib/portfolio-economics/` and `components/portfolio-economics/`) is a factual measurement and resource-accounting system, not a project valuation system.

### Core Principles
1. **Zero Valuation Speculation**: The system measures resource consumption, engineering hours, direct and shared operating expenses, attributable revenue, and data confidence. It does not calculate arbitrary monetary project valuations.
2. **Accounting Separation**: Distinguishes between statutory financial accounting (General Ledger) and internal management analytics. Portfolio contribution is calculated as `Attributed Revenue - Operating Costs` and is never conflated with statutory net profit.
3. **Cash vs Economic Investment**: Founder systems engineering hours are measured as an economic development cost at explicit baseline rates (e.g. ₹500/hr) with documented methodology, strictly separated from cash outlays.
4. **Shared Cost Allocation**: Multi-project infrastructure costs require explicit allocation percentages that validate mathematically to 100% of the source cost without silent allocation.
5. **Traceable Lineage & Confidence**: Every financial number links to a traceable source (invoice, timesheet, contract, or allocation memo) with an explicit confidence classification (Verified, Calculated, Allocated, Estimated, or Unverified). Missing data is preserved as "Not Tracked" rather than masked as ₹0.

