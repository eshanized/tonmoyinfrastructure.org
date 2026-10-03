<p align="center">
  <a href="https://tonmoyinfrastructure.org/">
    <img src="public/logo.svg" alt="Tonmoy Infrastructure and Vision Logo" width="160" />
  </a>
</p>

<h1 align="center">Tonmoy Infrastructure and Vision (TIV)</h1>

<p align="center">
  <strong>Sovereign Digital Infrastructure, Production Software Runtimes, and Systems Engineering</strong>
</p>

<p align="center">
  <a href="https://tonmoyinfrastructure.org/"><img src="https://img.shields.io/badge/Official_Website-tonmoyinfrastructure.org-E5484D?style=for-the-badge&logo=globe&logoColor=white" alt="Official Website" /></a>
  <a href="https://github.com/eshanized/TIVWEB/actions/workflows/deploy.yml"><img src="https://img.shields.io/badge/GitHub_Pages-Automated_Deploy-3ECF8E?style=for-the-badge&logo=github-actions&logoColor=white" alt="GitHub Pages Deployment" /></a>
  <a href="https://github.com/eshanized/TIVWEB/actions/workflows/ci.yml"><img src="https://img.shields.io/badge/CI-Passing-blue?style=for-the-badge&logo=github-actions&logoColor=white" alt="CI Status" /></a>
  <a href="https://github.com/eshanized"><img src="https://img.shields.io/badge/Founder-Eshan_Roy-222226?style=for-the-badge&logo=github&logoColor=white" alt="Founder" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-13.5.1-000000?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.2-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Static_Export-100%25_SSG-E5484D?style=flat-square" alt="Static Export" />
  <img src="https://img.shields.io/badge/WCAG-2.2_AA_Compliant-3ECF8E?style=flat-square" alt="WCAG 2.2 AA" />
  <img src="https://img.shields.io/badge/License-MIT_%2F_AGPL--3.0-orange?style=flat-square" alt="Licenses" />
</p>

---

## Executive Overview

**Tonmoy Infrastructure and Vision (TIV)** is an engineering and infrastructure organization founded by **Eshan Roy** (`eshanized`). TIV designs, builds, and maintains practical software systems, internet infrastructure, optical networks, and autonomous developer runtimes that operators can inspect, deploy, operate, and depend on.

This repository (`eshanized/TIVWEB`) houses the official digital institutional headquarters, public documentation engine, and interactive system portal for TIV. The platform is engineered with a strict **zero-runtime-fluff, static-first architecture** with 100 statically exported HTML routes, semantic JSON-LD graph metadata, and sub-millisecond interaction responsiveness.

---

## Architectural Philosophy & Core Tenets

All engineering across TIV adheres to five non-negotiable principles:

```
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│   Sovereignty    │    │  Deterministic   │    │  Data Ownership  │
│  & Self-Hosting  │───>│   Verification   │───>│  by Default      │
└──────────────────┘    └──────────────────┘    └──────────────────┘
         │                                               │
         ▼                                               ▼
┌──────────────────┐                           ┌──────────────────┐
│   Operational    │                           │    Radical       │
│    Simplicity    │◄──────────────────────────│   Economics      │
└──────────────────┘                           │  & Transparency  │
                                               └──────────────────┘
```

1. **Sovereignty & Self-Hostability**: Every software platform must be operable on user-controlled hardware without cloud vendor lock-in or proprietary licensing traps.
2. **Deterministic Verification**: "The model proposes. The runtime decides." All autonomous operations require multi-tier cryptographic and unit evidence before completion.
3. **Local Data Ownership**: User data remains on-device or on self-hosted storage engines with zero covert telemetry or third-party tracking.
4. **Operational Simplicity**: Clean, single-binary or hermetic distributions without sprawling runtime dependencies or fragile orchestration chains.
5. **Radical Transparency**: Transparent financial accounting, verified contributor lineage, and public annual management reports.

---

## Software Portfolio (Stable Releases)

TIV develops and actively maintains four foundational software systems, all published and verified as **Stable Releases**:

| Product | Version | Primary Stack | License | Repository / Registry | Documentation / Portal | Scope & Key Guarantees |
|:---|:---|:---|:---|:---|:---|:---|
| **[OpenMail](https://tonmoyinfrastructure.org/projects/openmail)** | `v1.0.0` | Go / C / POSIX | AGPL-3.0 | [Internal / Mirror](https://tonmoyinfrastructure.org/projects/openmail) | [System Spec](https://tonmoyinfrastructure.org/projects/openmail) | High-throughput sovereign email infrastructure daemon with zero-copy queueing, native SPF/DKIM/DMARC signing, and sub-millisecond deliverability. |
| **[Mercura](https://tonmoyinfrastructure.org/projects/mercura)** | `v1.0.0` | Go / Mercurial | AGPL-3.0 | [Internal / Mirror](https://tonmoyinfrastructure.org/projects/mercura) | [Platform Spec](https://tonmoyinfrastructure.org/projects/mercura) | Self-hosted code collaboration and version control platform built around Mercurial with transparent read-only Git interoperability mirrors. |
| **[M31A](https://m31a.tonmoyinfrastructure.org/)** | `v0.1.1` | Rust (2024 edition) | MIT or Apache-2.0 | [`eshanized/M31A`](https://github.com/eshanized/M31A) | [`m31a.tonmoyinfrastructure.org`](https://m31a.tonmoyinfrastructure.org/) | Single-crate, Rust-native autonomous software-engineering runtime with 11-stage policy gates (`ALLOW`/`DENY`/`ASK`/`ESCALATE`), ASVS L1 hardening, and Ratatui TUI cockpit. |
| **[Octate](https://tonmoyinfrastructure.org/projects/octate)** | `v1.0.0` | TypeScript / Node.js | MIT | [`vedanthq/Octate`](https://github.com/vedanthq/Octate) | [`@tiverse/octate`](https://www.npmjs.com/package/@tiverse/octate) (npm) | Terminal-native AI code review CLI combining local Tree-sitter WASM AST parsing, cross-file reference graphs, critic gates, and SARIF v2.1.0 automation. |

---

## AI Research & Experimental Models (M31 Ecosystem)

In parallel with stable software releases, TIV conducts open research into causal language models, agentic workflows, and context mechanisms. Research models are strictly labeled as **Experimental Checkpoints**:

| Research Artifact | Model Class / Size | Base Architecture | Format / Platform | License | Focus Area |
|:---|:---|:---|:---|:---|:---|
| **[M31Genesis](https://huggingface.co/eshanized/M31Genesis)** | 425M Parameters | Causal Decoder Transformer | Hugging Face Safetensors | MIT | Pre-trained causal language model for agentic coding research, syntax parsing, and code synthesis. |
| **[M31Tesla](https://huggingface.co/eshanized/M31Tesla)** | 228.9M Parameters | Python Agent Runtime Model | Hugging Face Checkpoint | MIT | Agentic tool orchestration and bounded execution planning for automated Python tasks. |
| **[M31Entropy](https://huggingface.co/eshanized/M31Entropy)** | 314M Parameters | Vocabulary-Specialized LM | Hugging Face Checkpoint | MIT | Context tokenization efficiency and high-density technical vocabulary representation. |
| **[M31 Q // For programmers](https://huggingface.co/spaces/eshanized/M31Q)** | Live Demo | Interactive HF Space | Hugging Face Space | MIT | Interactive demonstration space for programmers to test and evaluate M31 code generation capabilities. |

---

## Physical & Network Infrastructure

TIV's infrastructure division conducts research and development across three foundational physical layers:

```
┌────────────────────────────────────────────────────────────────────────┐
│                      TIV Full-Stack Architecture                       │
├────────────────────────────────────────────────────────────────────────┤
│ Layer 1: Applications      │ OpenMail, Mercura, M31A, Octate           │
│ Layer 2: Software Infra    │ Storage Engines, Confinement, Policy Gates│
│ Layer 3: Cloud / Compute   │ Bare-Metal Hypervisors, cgroups v2 Limits │
│ Layer 4: Internet Services │ Sovereign DNS, Anycast Routing, Mail Exch │
│ Layer 5: Data Centers      │ Server Colocation, Power Management       │
│ Layer 6: Physical Network  │ DWDM Optical Transport, Fiber Routing     │
└────────────────────────────────────────────────────────────────────────┘
```

- **Optical Systems & Fiber**: Dense Wavelength Division Multiplexing (DWDM) path analysis, optical transceivers (QSFP-DD), attenuation profiling, and long-haul dark fiber routing.
- **Network Routing**: Autonomous System (AS) design, BGP peering policy, Anycast edge distribution, and multi-tier DDoS mitigation topologies.
- **Compute Confinement**: Bare-metal virtualization with hard Linux cgroups v2 resource ceilings (`cpu.max`, `memory.max`), POSIX `rlimits`, and Windows Job Objects.

---

## Portfolio Economics & Radical Transparency

TIV operates under an open, verifiable reporting framework. Financial and operational figures are published directly on the portal under [Portfolio Economics](https://tonmoyinfrastructure.org/transparency/financials/portfolio-economics):

- **Zero Speculative Valuation**: TIV does not assign or publish fictional enterprise valuations. Financial reports track verifiable economic activity and resource allocation only.
- **Standardized Engineering Baseline**: Founder engineering contributions are accounted for under a transparent, reproducible benchmark rate of **₹500/hour** (Standard Systems Engineering Baseline).
- **Core Server Compute Allocation**:
  - OpenMail: `30%` (SMTP/IMAP daemon and storage queues)
  - Mercura: `25%` (Mercurial wire protocol and web interface)
  - M31A: `35%` (Autonomous agent runtime and evaluation benchmarking)
  - Octate: `10%` (CLI review engine and SARIF pipeline testing)
  - **Total**: `100.0%` (Validated by automated test constraints)

---

## Platform Technology Stack

The digital platform is engineered with a modern, high-assurance web stack:

| Component | Technology | Version | Purpose |
|:---|:---|:---|:---|
| **Framework** | Next.js (App Router) | `13.5.1` | Static site generation (SSG), React Server Components, route segments. |
| **Language** | TypeScript | `5.2.2` | Strict compile-time type safety with zero `any` leaks. |
| **UI & Styling** | Tailwind CSS | `3.4.1` | Custom design token system with CSS variable themes and high-contrast AA colors. |
| **Component Primitives** | Radix UI | `^1.1` | Unstyled, accessible UI primitives (dialogs, tooltips, accordions). |
| **Icons** | Lucide React | `^0.446` | Clean, scalable SVG icons (strictly no emoji in UI). |
| **Data Validation** | Zod | `^3.23` | Runtime schema validation for all institutional datasets and models. |
| **Animations** | Framer Motion | `^13.2` | Subtle, accessible motion with automatic `prefers-reduced-motion` compliance. |
| **Structured Data** | Schema.org JSON-LD | Spec v1 | Automated Graph schemas (`Organization`, `SoftwareApplication`, `ScholarlyArticle`). |
| **Static Output** | Next Export (`out/`) | Native | 100 pre-rendered static HTML routes with zero Node.js server dependency. |

---

## Project Directory Map

```
.
├── .github/
│   └── workflows/
│       ├── deploy.yml            # Automated GitHub Pages static build & deployment
│       └── ci.yml                # Continuous Integration (lint, typecheck, tests)
├── app/                          # Next.js 13 App Router routes (100 static endpoints)
│   ├── about/                    # Organization, leadership, governance, timeline
│   ├── infrastructure/           # Full stack: hosting, networking, optical systems
│   ├── legal/                    # Privacy, terms, accessibility, licenses directory
│   ├── news/                     # Press releases and institutional announcements
│   ├── open-source/              # Public open-source repository catalog
│   ├── products/                 # Stable software product detail views
│   ├── projects/                 # Complete project directory & portfolio economics
│   ├── releases/                 # Structured changelogs and release notes
│   ├── research/                 # Research portal, areas, experiments, whitepaper
│   ├── security/                 # Vulnerability disclosure and security advisory center
│   ├── technology/               # Six-layer architectural stack diagrams and maps
│   ├── transparency/             # Annual reports, financial economics, audits
│   ├── layout.tsx                # Canonical root layout with SEO metadata and nav
│   └── page.tsx                  # 12-section institutional homepage
├── components/                   # Modular React UI components
│   ├── infrastructure/           # Network topology and DWDM optical path diagrams
│   ├── layout/                   # Header, footer, breadcrumbs, search dialog
│   ├── navigation/               # Desktop and mobile navigation menus
│   ├── projects/                 # Comprehensive project detail views and status badges
│   ├── shared/                   # Status badges, JSON-LD, callouts, motion wrappers
│   └── technology/               # Interactive technology maps and stack diagrams
├── lib/                          # Authoritative business logic & institutional state
│   ├── content.ts                # Canonical project data, software catalog, ecosystem
│   ├── institutional.ts          # Releases, governance, legal documents, timeline
│   ├── people.ts                 # Founder and leadership profiles
│   ├── portfolio-economics/      # Financial periods, cost allocations, reconciliation
│   ├── schemas.ts                # Zod runtime validation schemas
│   ├── seo.ts                    # Canonical URL builders and OpenGraph generators
│   ├── site-config.ts            # Centralized site URLs and social profiles
│   ├── structured-data.ts        # Schema.org JSON-LD Graph generators
│   └── types.ts                  # TypeScript types, domain interfaces, enums
├── public/                       # Static public assets
│   ├── .nojekyll                 # Disables Jekyll processing for GitHub Pages
│   ├── .htaccess                 # Apache / LiteSpeed configuration with subdomain isolation
│   ├── _redirects                # Netlify / Cloudflare static redirects
│   ├── favicon.svg               # TIV Coral Red logo mark icon
│   ├── logo.svg                  # TIV corporate SVG wordmark
│   └── site.webmanifest          # PWA web manifest
├── scripts/
│   └── postbuild.mjs             # Bracketed directory mirroring & .nojekyll verification
└── tests/
    ├── audit.test.mjs            # 9-pillar architectural integrity test suite
    └── portfolio-economics.test.mjs # 15-point financial reconciliation tests
```

---

## Local Development & Setup

### Prerequisites

- **Node.js**: `18.17.0` or higher (`v20 LTS` recommended)
- **npm**: `9.0.0` or higher

### 1. Clone & Install

```bash
git clone https://github.com/eshanized/TIVWEB.git
cd TIVWEB

npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Visit [`http://localhost:3000`](http://localhost:3000) to view the live development server with fast refresh.

### 3. Verification & Quality Gates

Run the complete test and typechecking pipeline before committing changes:

```bash
# Type check all TypeScript source files
npm run typecheck

# Run ESLint validation
npm run lint

# Execute automated architectural & financial integrity test suite
npm test
```

### 4. Build Static Production Artifact

```bash
npm run build
```

This compiles the Next.js application into static HTML, CSS, and JS bundles within the `out/` directory and executes `scripts/postbuild.mjs` to guarantee hosting compatibility.

---

## Deployment Options

<details open>
<summary><strong>Option 1: Deploy to GitHub Pages (Automated via GitHub Actions)</strong></summary>

This repository includes a ready-to-run GitHub Actions workflow (`.github/workflows/deploy.yml`) specifically configured for Next.js static exports on GitHub Pages.

#### Setup Instructions:
1. In your GitHub repository, navigate to **Settings > Pages**.
2. Under **Build and deployment > Source**, select **GitHub Actions**.
3. Push your changes to the `master` or `main` branch.
4. The `.github/workflows/deploy.yml` workflow will automatically trigger, run tests, build the static export (`out/`), generate `.nojekyll`, and deploy to GitHub Pages.
5. **Manual Trigger**: You can also trigger a deployment on demand by navigating to **Actions > Deploy to GitHub Pages > Run workflow**.

> [!NOTE]
> If using a custom domain (e.g. `tonmoyinfrastructure.org`), enter it under **Settings > Pages > Custom domain** or add a `public/CNAME` file.
</details>

<details>
<summary><strong>Option 2: Deploy to Shared Hosting (20i StackCP / cPanel / DirectAdmin)</strong></summary>

1. Run `npm run build` locally or in CI to generate the static files in `out/`.
2. Upload the contents of `out/` into `/public_html/`.
3. `scripts/postbuild.mjs` automatically generates unbracketed compatibility mirrors (`slug/` alongside `[slug]/`) to prevent issues with shared hosting file extractors that strip brackets.
4. `public/.htaccess` includes pre-configured subdomain isolation and proxy-aware HTTPS redirect rules.
</details>

<details>
<summary><strong>Option 3: Self-Hosted NGINX / Caddy on Linux VM</strong></summary>

Deploy the static `out/` directory behind an NGINX reverse proxy with HTTP/2 and modern TLS:

```nginx
server {
    listen 443 ssl http2;
    server_name tonmoyinfrastructure.org;

    root /var/www/tiv/out;
    index index.html;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Next.js static assets with immutable cache
    location /_next/static {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location / {
        try_files $uri $uri/ $uri.html =404;
    }
}
```
</details>

<details>
<summary><strong>Option 4: Cloudflare Pages / Netlify / Vercel</strong></summary>

- **Build Command**: `npm run build`
- **Output Directory**: `out`
- **Node Version**: `>= 18.17.0`
- The repository includes `@netlify/plugin-nextjs` and `public/_redirects` for drop-in Netlify compatibility.
</details>

---

## Security & Vulnerability Reporting

TIV operates a formal security response program:
- Review our full policy at [SECURITY.md](SECURITY.md) and on the public [Security Advisory Center](https://tonmoyinfrastructure.org/security).
- To report a security vulnerability, please contact: `security@tonmoyinfrastructure.org`.
- PGP encryption keys and advisory notices are published on the security portal.

---

## Contributing

We welcome community feedback, issue reports, and documentation improvements. Please read [CONTRIBUTING.md](CONTRIBUTING.md) for branch naming conventions, PR guidelines, and test verification standards before opening a pull request.

---

## Authoritative Links & Ecosystem Portals

| Resource | URL |
|:---|:---|
| **Official Institutional Website** | [https://tonmoyinfrastructure.org/](https://tonmoyinfrastructure.org/) |
| **M31A Dedicated Platform** | [https://m31a.tonmoyinfrastructure.org/](https://m31a.tonmoyinfrastructure.org/) |
| **M31A GitHub Repository** | [https://github.com/eshanized/M31A](https://github.com/eshanized/M31A) |
| **Octate CLI on npm** | [https://www.npmjs.com/package/@tiverse/octate](https://www.npmjs.com/package/@tiverse/octate) |
| **Octate GitHub Repository** | [https://github.com/vedanthq/Octate](https://github.com/vedanthq/Octate) |
| **Hugging Face Research Hub** | [https://huggingface.co/eshanized](https://huggingface.co/eshanized) |
| **Founder Website** | [https://eshanized.is-a.dev/](https://eshanized.is-a.dev/) |
| **Founder GitHub Profile** | [https://github.com/eshanized](https://github.com/eshanized) |
| **Founder ORCID** | [0009-0007-1261-6805](https://orcid.org/0009-0007-1261-6805) |

---

## License

- **Software Platforms**: OpenMail (AGPL-3.0), Mercura (AGPL-3.0), M31A (MIT OR Apache-2.0), Octate (MIT).
- **Website & Documentation**: Content and institutional documentation are © 2026 Tonmoy Infrastructure and Vision (TIV).
- **Website Source Code**: Licensed under the [MIT License](LICENSE).
