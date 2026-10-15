# TIV Content System & Authoring Guidelines

This guide details the editorial principles, data models, and schema validation rules governing content on the TIV website.

---

## 1. Content Integrity Guarantees

TIV enforces strict content integrity across all published pages:

1. **Software Status Accuracy**:
   - **OpenMail, Mercura, M31A, and Octate** are **Stable Releases** built and shipped by TIV.
   - They must **never** be labeled as "upcoming", "in development", "concept", or "experimental".
   - Product status is `Stable Release`, while development maintenance is `Active`.
2. **Financial Data Integrity**:
   - All financial numbers must be explicitly labeled as unaudited management estimates.
   - Do not claim audited status or cite unverified audit firms.
3. **Personnel & Governance**:
   - Founder is **Eshan Roy** (`eshanized`).
   - Do not invent fictional board members, executive teams, or employee headcounts.
4. **No Vanity Metrics**:
   - Do not publish fictional uptime percentages (e.g. "99.999%"), invented enterprise customer counts, or fabricated industry awards.
5. **Infrastructure & Operational Claims**:
   - **TIV Data Center Ground Truth**: Tonmoy Infrastructure and Vision operates an **existing, physical sovereign data center facility** located in **Jayapura, Papua, Indonesia**. The facility physically exists and is actively operational—it must **never** be downgraded to "planned", "proposed", or "research".
   - **Operational Scope vs. Commercial Offering**: The Jayapura facility hosts TIV's internal infrastructure, authoritative DNS, and software platforms (OpenMail, Mercura, M31A, Octate). TIV does not operate a public retail self-service colocation portal; enterprise hosting and sovereign infrastructure capacity are evaluated via private inquiry.
   - **Local Operational Facility vs. Global Blueprints**: The confirmed physical facility in Jayapura must not be conflated with unverified global hyperscale claims. Do not claim TIV owns or operates 16 data centers across 11 countries, 845 PB of aggregate storage, or 99.999% SLAs unless verified by authoritative operational evidence.
   - **Logistics & Courier Architecture**: Logistics systems and freight corridors are modeled as systems architecture, cryptographic custody verification, and hardware transit telemetry research.
   - **Certifications & Compliance**: Do not claim accredited third-party compliance certifications (e.g. ISO 27001, SOC 2 Type II, PCI DSS, HIPAA, GDP) unless external audit certificates exist; describe architectures as aligned with recognized security and distribution principles.

---

## 2. Content Schemas

All content objects in `lib/content.ts` and `lib/institutional.ts` are validated using Zod schemas defined in `lib/schemas.ts`:

### Adding a Project

Projects must conform to `ProjectSchema`:

```typescript
{
  slug: string; // Unique URL slug
  title: string;
  tagline: string;
  description: string;
  category: 'Software' | 'Internet Infrastructure' | 'Network Infrastructure' | 'Research';
  status: 'Stable Release' | 'Research' | 'Planning' | 'Archived';
  developmentStage: 'Active' | 'Maintenance' | 'Planning';
  featured?: boolean;
  version?: string; // e.g. "v1.0.0"
  problem: string;
  approach: string;
  architecture: string;
  features: string[];
  roadmap: { phase: string; title: string; status: string; items: string[] }[];
  releases?: string[];
  techStack?: string[];
  repositoryUrl?: string;
  content: string; // Markdown body
}
```

### Adding a Release Note

Releases must conform to `ReleaseSchema`:

```typescript
{
  slug: string;
  project: string; // matches project slug
  version: string; // e.g. "1.0.0"
  date: string; // YYYY-MM-DD
  status: 'Released' | 'Pre-release' | 'Draft';
  summary: string;
  notes: {
    type: 'Added' | 'Fixed' | 'Changed' | 'Security' | 'Breaking' | 'Deprecated';
    items: string[];
  }[];
}
```

---

## 3. Formatting & Style Rules

- **Headings**: Sentence case for headings ("Vulnerability disclosure policy", not "Vulnerability Disclosure Policy").
- **Icons**: Use Lucide React icons through `@/components/shared/tiv-icon` or direct imports. No emoji characters allowed in UI text.
- **Numbers**: Use SI units and explicit currency markings (e.g., `₹18.4L`).

---

## 4. Corporate Address & Contact Integrity

The official office address and contact coordinates are centralized in `lib/site-config.ts` and validated via `lib/schemas.ts`:
- **Street**: `Pusat Bisnis Jayapura, Jl. Pasifik Permai`
- **City**: `Jayapura`
- **Region / Province**: `Papua`
- **Postal Code**: `99111`
- **Country**: `Indonesia`
- **Phone**: `(0967) 551888` (`tel:+62967551888`)
- **Coordinates**: `-2.543186, 140.714993`
- **Privacy Guarantee**: Private recipient email addresses are not exposed in the frontend source.

---

## 5. TIV I/O Event Identity & Disclosure Rules

- **Event Name**: Tonmoy Infrastructure and Vision I/O (display name: **TIV I/O**)
- **Category**: Technology, software, developer infrastructure, networking, and research
- **Organizer**: Tonmoy Infrastructure and Vision
- **No Speculative Fabrication**: Dates, venue, registration availability, ticket prices, attendance figures, and session rosters remain unannounced until officially verified. Truthful wording such as "To be announced" must be used.
- **Independent Identity**: TIV I/O is an independent developer conference for TIV engineering work. It is never portrayed as a Google affiliate or Google I/O clone.

---

## 6. Research Publications Authoring & MDX Specification

Research papers and academic communications are authored as MDX documents under `content/publications/*.mdx`.

### Frontmatter Schema & Requirements

Every publication must include valid YAML frontmatter matching `PublicationFrontmatterSchema`:

```yaml
---
slug: "autonomous-development-systems"
title: "Autonomous Development Systems: A Research Agenda"
identifier: "TIV-RES-2026-001"
authors:
  - name: "Eshan Roy"
    affiliation: "Tonmoy Infrastructure and Vision"
    role: "Lead Researcher"
    profileUrl: "https://github.com/eshanized"
abstract: "A clear, factual summary of the research questions, methodology, and theoretical findings."
publicationDate: "2026-09-12"
updatedAt: "2026-10-15"
version: "0.1"
status: "Draft"
type: "Research Framework"
area: "Artificial Intelligence"
tags: ["Autonomous Systems", "Runtime Verification", "Compiler Invariants"]
keywords: ["autonomous agents", "policy evaluation", "runtime isolation"]
featured: true
project: "m31a"
license: "CC-BY-4.0"
pdf: "/publications/autonomous-development-systems.pdf"
repository: "https://github.com/eshanized/M31A"
references:
  - id: "1"
    title: "M31A: High-Assurance Rust-Native Autonomous Software Engineering Runtime"
    authors: "Eshan Roy"
    year: "2026"
    venue: "Tonmoy Infrastructure and Vision Technical Specifications"
    url: "https://m31a.tonmoyinfrastructure.org/"
---
```

### Publication Status Taxonomy

Publications enforce strict academic status classification:
- **`Draft`**: Early working paper or theoretical formulation. Explicitly flagged with a cautionary draft notice in the UI and prohibited from claiming peer-reviewed empirical findings.
- **`Experimental`**: Active investigation with initial experimental data, requiring confirmation.
- **`Published`**: Formal institutional research paper or accepted conference/journal publication.
- **`Superseded`**: Replaced by a newer version; frontmatter should specify `supersededBy: "slug-of-new-version"`.
- **`Archived`**: Historical record preserved for scholarly citation.

### Approved MDX Component Map

To preserve institutional security and design fidelity, arbitrary HTML and external scripts are prohibited. Content authors have access to approved domain components:
- **`<Figure src="..." alt="..." caption="..." number="1" />`**: Accessible image/diagram figure with centered caption and institutional framing.
- **`<Callout type="note|info|tip|warning|caution" title="...">`**: Visual callout block with accessible SVG icon and high-contrast styling.
- **`<ResearchTable caption="..." number="1">`**: Academic data table wrapper supporting native markdown tables or custom grid rows.
- **`<Reference id="1" title="..." authors="..." year="2026" venue="..." url="..." doi="..." />`**: Bibliographic citation entry with automatic anchor ID (`#ref-1`) and external link formatting.

### Attaching PDFs and Supplementary Assets

- PDF preprints must be placed in `public/publications/[slug].pdf`.
- Supplementary datasets and code artifacts must be linked using valid absolute HTTPS URLs or root-relative paths (`/publications/...`).
- JavaScript pseudo-protocols (`javascript:`), base64 data URLs, and protocol-relative URLs (`//evil.com`) are rejected fail-closed during compilation.

### Build-Time Compilation and Local Verification

Publications are compiled at build time into an immutable static manifest (`lib/publications/manifest.json`):
```bash
# Compile and validate publications
node scripts/compile-publications.mjs

# Run full test suite including frontmatter and schema checks
npm test

# Verify production static build
npm run build
```

