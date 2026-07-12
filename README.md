# Tonmoy Infrastructure and Vision (TIV)

> **TIV** builds practical software, internet infrastructure, networking systems, and emerging technologies that people can deploy, operate, and depend on.

Official website and digital institutional portal for Tonmoy Infrastructure and Vision (TIV), founded by Eshan Roy (`eshanized`).

---

## Technical Overview

The website is engineered for performance, structural clarity, zero runtime fluff, and absolute content integrity:

- **Framework**: Next.js 13.5.1 (React 18, App Router)
- **Language**: TypeScript 5.2.2 (strict typing, no implicit any)
- **Styling**: Tailwind CSS with custom CSS variable design tokens
- **Icons**: Lucide React SVG icons (strictly no emoji in UI)
- **Type Validation**: Zod runtime schema validation for all institutional datasets
- **Accessibility**: WCAG 2.2 AA compliant, reduced-motion aware, fully keyboard navigable

---

## Stable Software Portfolio

TIV builds and maintains four foundational software systems, all published as **Stable Releases**:

1. **OpenMail** (`v1.0.0`): High-throughput self-hosted email infrastructure daemon with zero-copy queueing, native SPF/DKIM/DMARC signing, and sub-millisecond local deliverability.
2. **Mercura** (`v1.0.0`): Local-first autonomous developer agent and neural code engine operating completely on-device without cloud exfiltration.
3. **M31A** (`v1.0.0`): Minimalist sovereign compute engine and container scheduler designed for single-node resilience and micro-cluster orchestration.
4. **Octate** (`v1.0.0`): High-density distributed telemetry, event processing, and streaming log storage engine.

---

## Project Structure

```
├── app/                      # Next.js App Router routes
│   ├── about/                # Organization, leadership, governance, timeline
│   ├── infrastructure/       # Full stack: hosting, networking, optical systems
│   ├── legal/                # Legal directory, privacy, terms, accessibility, licenses
│   ├── news/                 # Institutional announcements and press releases
│   ├── open-source/          # Public GitHub repositories and open tooling
│   ├── products/             # Stable software portfolio detail views
│   ├── projects/             # Comprehensive project directory
│   ├── releases/             # Structured version changelogs & release notes
│   ├── research/             # Research portal, areas, experiments, whitepaper, publications
│   ├── security/             # Security center & vulnerability disclosure policy
│   ├── technology/           # Six-layer architectural stack diagram & maps
│   ├── transparency/         # Annual reports, financials, governance
│   ├── layout.tsx            # Root layout with metadata and site navigation
│   └── page.tsx              # Canonical 12-section homepage
├── components/               # UI components
│   ├── infrastructure/       # Network topology and DWDM optical path SVGs
│   ├── layout/               # Site header, footer, mobile navigation
│   ├── navigation/           # Desktop and mobile navigation menus
│   ├── projects/             # 15-section project detail view and cards
│   ├── security/             # Security center view and PGP verification
│   ├── shared/               # Section headers, breadcrumbs, badges, markdown
│   └── technology/           # Six-layer SVG stack diagrams
├── lib/                      # Core logic & institutional content
│   ├── content.ts            # Canonical project data, news, research areas
│   ├── institutional.ts      # Governance, legal, financials, releases
│   ├── schemas.ts            # Zod validation schemas for all entities
│   ├── types.ts              # TypeScript interfaces and status types
│   └── utils.ts              # Utility functions (cn, formatting)
├── public/                   # Static assets (favicons, manifests, vectors)
└── tests/                    # Automated integrity test suite
```

---

## Getting Started

### Prerequisites

- Node.js 18.17.0 or higher
- npm 9.0.0 or higher

### Installation

```bash
# Clone repository
git clone https://github.com/tonmoy-infrastructure/website.git
cd website

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Typecheck & Lint

```bash
# Run TypeScript compilation check
npm run typecheck

# Run ESLint check
npm run lint
```

### Production Build

```bash
npm run build
npm run start
```

---

## Documentation Index

- [Architecture & Systems](ARCHITECTURE.md)
- [Content Authoring & Data Models](CONTENT.md)
- [Design Tokens & Typography](DESIGN_SYSTEM.md)
- [Deployment & Operations](DEPLOYMENT.md)
- [Security Policy & Disclosures](SECURITY.md)
- [Contributing Guidelines](CONTRIBUTING.md)

---

## License

All software released by TIV is licensed under open-source licenses as documented in each project repository.
Documentation and website content are © Tonmoy Infrastructure and Vision.
