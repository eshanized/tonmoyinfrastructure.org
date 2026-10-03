import type {
  CompanyInfo,
  TimelineEvent,
  Release,
  TechnologyLayer,
  ServiceStatus,
  SecurityAdvisory,
  LegalDocument,
  MediaAsset,
  AnnualReport,
  DocLink,
  ContactCategory,
} from '@/lib/types';
import { validateReleases } from '@/lib/schemas';

// ─── Company Info ───────────────────────────────────────────

const companyInfo: CompanyInfo = {
  legalName: 'Tonmoy Infrastructure and Vision',
  brandName: 'TIV',
  description:
    'Tonmoy Infrastructure and Vision is an organization building practical infrastructure across software, internet infrastructure, networking, fiber optics, artificial intelligence, and systems engineering.',
  officialContact: 'https://tonmoyinfrastructure.org/contact',
  officialWebsite: 'https://tonmoyinfrastructure.org/',
  primaryDomains: ['tonmoyinfrastructure.org'],
};

export function getCompanyInfo(): CompanyInfo {
  return companyInfo;
}

// ─── Timeline Events ────────────────────────────────────────

const timelineEvents: TimelineEvent[] = [
  {
    id: 'tiv-foundation',
    year: '2026',
    month: '09',
    title: 'TIV Founded',
    description:
      'Tonmoy Infrastructure and Vision is established as an organization building practical infrastructure across software, internet infrastructure, networking, and research.',
    category: 'Foundation',
  },
  {
    id: 'tiv-website-launch',
    year: '2026',
    month: '09',
    title: 'Official Website Launched',
    description:
      'TIV launches its official website, providing a public window into the organization\'s work across software, infrastructure, and research.',
    category: 'Organization',
  },
  {
    id: 'openmail-start',
    year: '2026',
    month: '09',
    title: 'OpenMail Released',
    description:
      'OpenMail — a self-hosted email and communication infrastructure platform designed for independence from centralized providers — is released as a stable release.',
    category: 'Software',
    relatedProject: 'openmail',
  },
  {
    id: 'mercura-start',
    year: '2026',
    month: '09',
    title: 'Mercura Released',
    description:
      'Mercura — a self-hosted code hosting platform built around Mercurial for teams that value data ownership — is released as a stable release.',
    category: 'Software',
    relatedProject: 'mercura',
  },
  {
    id: 'm31a-research',
    year: '2026',
    month: '10',
    title: 'M31A Released',
    description:
      'M31A (M31 Autonomous) — a Rust-native autonomous software-engineering runtime with non-bypassable policy gates and verifiable execution — is released as a stable release (v0.1.1) on GitHub with its dedicated platform website (https://m31a.tonmoyinfrastructure.org/).',
    category: 'Software',
    relatedProject: 'm31a',
  },
  {
    id: 'octate-release',
    year: '2026',
    month: '09',
    title: 'Octate Released',
    description:
      'Octate — a terminal-native AI code review CLI combining deterministic repository intelligence with LLM reasoning — is released as a stable release (v1.0.0) on npm (@tiverse/octate) and GitHub.',
    category: 'Software',
    relatedProject: 'octate',
  },
  {
    id: 'whitepaper-v1',
    year: '2026',
    month: '09',
    title: 'TIV Infrastructure Whitepaper v1.0 Published',
    description:
      'TIV publishes the first version of its infrastructure whitepaper, outlining the organization\'s philosophy and approach to building infrastructure.',
    category: 'Publication',
  },
  {
    id: 'first-publication',
    year: '2026',
    month: '09',
    title: 'First Research Publication',
    description:
      'TIV publishes its first research document — a framework for autonomous development systems.',
    category: 'Publication',
    relatedProject: 'm31a',
  },
];

export function getTimelineEvents(): TimelineEvent[] {
  return timelineEvents.sort((a, b) => {
    const dateA = `${a.year}-${a.month || '01'}`;
    const dateB = `${b.year}-${b.month || '01'}`;
    return dateB.localeCompare(dateA);
  });
}

// ─── Releases ───────────────────────────────────────────────

const rawReleases: Release[] = [
  {
    slug: 'openmail-1-0-0',
    project: 'openmail',
    version: '1.0.0',
    date: '2026-09-10',
    status: 'Released',
    summary:
      'Initial stable release of OpenMail self-hosted email infrastructure.',
    notes: [
      {
        type: 'Added',
        items: [
          'SMTP server engine for inbound and outbound email handling',
          'IMAP server implementation for client mail synchronization',
          'Integrated local storage engine with data ownership guarantee',
          'Automated TLS certificate management with modern cryptography',
          'Built-in spam protection and filtering without third-party dependencies',
          'Web-based administration console for accounts and domain configuration',
          'DKIM, SPF, and DMARC verification tooling',
        ],
      },
    ],
  },
  {
    slug: 'mercura-1-0-0',
    project: 'mercura',
    version: '1.0.0',
    date: '2026-09-08',
    status: 'Released',
    summary:
      'Initial stable release of Mercura self-hosted code hosting built around Mercurial.',
    notes: [
      {
        type: 'Added',
        items: [
          'Core Mercurial repository management engine',
          'Web-based repository browsing, changeset view, and code review',
          'Read-only Git mirror for interoperability with Git tooling',
          'User authentication and repository-level access control',
          'REST and CLI automation API layer',
        ],
      },
    ],
  },
  {
    slug: 'm31a-0-1-1',
    project: 'm31a',
    version: '0.1.1',
    date: '2026-10-02',
    status: 'Released',
    summary:
      'M31A v0.1.1 release introducing compile-time isolated deployment channels (production vs development) and transactional installer.',
    notes: [
      {
        type: 'Added',
        items: [
          'Dual deployment channels: production (m31a) and development (m31a-dev) with compile-time artifact identity',
          'Deployment subsystem featuring DeploymentContext, ReleaseArtifact, and DeploymentManifest v1 schema',
          'Transactional Installer with stage -> verify -> atomic replace lifecycle and previous binary preservation',
          'Channel-safe update discovery with rollback seam and DeploymentPaths isolation',
          'CLI subcommands: m31a version [--verbose], m31a deployment [--verbose], and m31a update check',
        ],
      },
    ],
  },
  {
    slug: 'm31a-0-1-0',
    project: 'm31a',
    version: '0.1.0',
    date: '2026-10-01',
    status: 'Released',
    summary:
      'Initial release of M31 Autonomous (M31A) — Rust-native autonomous software-engineering runtime.',
    notes: [
      {
        type: 'Added',
        items: [
          'Layered architecture (L0–L9) with downward-dependency boundaries in a single clean Rust crate',
          'Non-bypassable 11-stage policy gate with ALLOW, DENY, ASK, and ESCALATE decision matrix',
          'ASVS L1 compliance mitigating 11 threat vectors with multi-tier SecretRedactor and XML trust envelopes',
          'Platform confinement with Linux cgroups v2, POSIX rlimits, and Windows Job Objects',
          'NVIDIA NIM inference provider integration with SSE streaming and token budgeting',
          '8 canonical agent roles with role state machines and bounded step budgets',
          'Deterministic verification engine with two-phase atomic checkpoints and 15 failure classifications',
          'Interactive Ratatui terminal cockpit (m31a tui) and full CLI subcommand suite',
        ],
      },
    ],
  },
  {
    slug: 'octate-1-0-0',
    project: 'octate',
    version: '1.0.0',
    date: '2026-09-13',
    status: 'Released',
    summary:
      'Initial stable release of Octate, the terminal-native AI code review CLI.',
    notes: [
      {
        type: 'Added',
        items: [
          'Deterministic pre-analysis with Tree-sitter WASM AST parsing and symbol graph resolution',
          'Multi-stage reviewer DAG for Security, Architecture, Performance, and Correctness',
          'Two-stage critic quality gate with hard floor rules and model cross-examination',
          'Interactive React/Ink full-screen terminal user interface with alternate buffer',
          'SARIF v2.1.0 output engine for GitHub Code Scanning CI/CD integration',
          'Official npm package publication (@tiverse/octate) and octate doctor CLI diagnostics',
        ],
      },
    ],
  },
];

const releases: Release[] = validateReleases(
  rawReleases.map((r) => ({
    ...r,
    releaseDate: r.date,
    added: r.notes.find((n) => n.type === 'Added')?.items || [],
    changed: r.notes.find((n) => n.type === 'Changed')?.items || [],
    fixed: r.notes.find((n) => n.type === 'Fixed')?.items || [],
    security: r.notes.find((n) => n.type === 'Security')?.items || [],
    breakingChanges: r.notes.find((n) => n.type === 'Breaking')?.items || [],
    artifacts: [],
  }))
);

export function getReleases(): Release[] {
  return releases.sort((a, b) => b.date.localeCompare(a.date));
}

export function getReleasesForProject(projectSlug: string): Release[] {
  return releases.filter((r) => r.project === projectSlug);
}

// ─── Technology Layers ──────────────────────────────────────

const technologyLayers: TechnologyLayer[] = [
  {
    id: 'applications',
    name: 'Application Layer',
    level: 1,
    description:
      'User-facing software systems — the projects people directly interact with. These are the visible products of TIV\'s engineering work.',
    status: 'Existing',
    items: [
      { name: 'OpenMail', status: 'Stable Release', href: '/projects/openmail', productStatus: 'stable' },
      { name: 'Mercura', status: 'Stable Release', href: '/projects/mercura', productStatus: 'stable' },
      { name: 'M31A', status: 'Stable Release', href: '/projects/m31a', productStatus: 'stable' },
      { name: 'Octate', status: 'Stable Release', href: '/projects/octate', productStatus: 'stable' },
    ],
  },
  {
    id: 'software-infrastructure',
    name: 'Software Infrastructure',
    level: 2,
    description:
      'Shared software foundations — the libraries, tools, and systems that application-layer projects are built on. This layer enables reuse and consistency across projects.',
    status: 'Developing',
    items: [
      { name: 'Storage Engines', status: 'Research' },
      { name: 'TLS / Certificate Management', status: 'Development' },
      { name: 'Authentication Systems', status: 'Planning' },
      { name: 'Plugin Architecture', status: 'Planning' },
    ],
  },
  {
    id: 'compute',
    name: 'Compute',
    level: 3,
    description:
      'Servers and computational infrastructure — the machines that run software systems. TIV researches efficient, self-managed compute architectures.',
    status: 'Research',
    items: [
      { name: 'Compute Infrastructure', status: 'Research', href: '/infrastructure/compute' },
      { name: 'Resource Scheduling', status: 'Research' },
      { name: 'Edge Compute', status: 'Research' },
    ],
  },
  {
    id: 'network',
    name: 'Network',
    level: 4,
    description:
      'Routing, switching, and network systems — the infrastructure that connects compute resources. TIV researches network architecture and protocols.',
    status: 'Research',
    items: [
      { name: 'Networking', status: 'Research', href: '/infrastructure/networking' },
      { name: 'Routing Protocols', status: 'Research' },
      { name: 'Network Management', status: 'Research' },
    ],
  },
  {
    id: 'optical',
    name: 'Optical Systems',
    level: 5,
    description:
      'Fiber optics and optical communication systems — the physical layer of network infrastructure. TIV researches optical transmission and experimental optical communications.',
    status: 'Research',
    items: [
      { name: 'Optical Systems', status: 'Research', href: '/infrastructure/optical' },
      { name: 'Fiber Optic Architecture', status: 'Research' },
      { name: 'Experimental Optical Comms', status: 'Research' },
    ],
  },
  {
    id: 'physical',
    name: 'Physical Infrastructure',
    level: 6,
    description:
      'Hardware and physical infrastructure — the tangible systems that underpin all technology layers. This is where software meets the physical world.',
    status: 'Research',
    items: [
      { name: 'Hardware Research', status: 'Research' },
      { name: 'Infrastructure Equipment', status: 'Research' },
    ],
  },
];

export function getTechnologyLayers(): TechnologyLayer[] {
  return technologyLayers;
}

// ─── Service Status ─────────────────────────────────────────

const serviceStatuses: ServiceStatus[] = [
  { slug: 'domains', name: 'Domains', category: 'Infrastructure', status: 'NotDeployed', description: 'Domain registration and DNS management services. Planning phase — no commercial services deployed.' },
  { slug: 'hosting', name: 'Hosting', category: 'Infrastructure', status: 'NotDeployed', description: 'Web hosting and application hosting infrastructure. Planning phase — internal systems operational.' },
  { slug: 'mail', name: 'OpenMail', category: 'Software', status: 'Operational', description: 'Self-hosted email infrastructure. Stable release software.' },
  { slug: 'mercura', name: 'Mercura', category: 'Software', status: 'Operational', description: 'Self-hosted code hosting platform. Stable release software.' },
  { slug: 'm31a', name: 'M31A', category: 'Software', status: 'Operational', description: 'Rust-native autonomous software-engineering runtime with non-bypassable policy gates. Stable release software.' },
  { slug: 'octate', name: 'Octate', category: 'Software', status: 'Operational', description: 'Terminal-native AI code review CLI. Deterministic repository intelligence meets LLM reasoning.' },
  { slug: 'compute', name: 'Compute', category: 'Infrastructure', status: 'NotDeployed', description: 'Compute infrastructure. Research phase — no commercial services deployed.' },
  { slug: 'networking', name: 'Networking', category: 'Infrastructure', status: 'NotDeployed', description: 'Networking infrastructure. Research phase — no commercial services deployed.' },
  { slug: 'optical', name: 'Optical Systems', category: 'Infrastructure', status: 'NotDeployed', description: 'Optical networking research. Research phase — no commercial systems deployed.' },
  { slug: 'website', name: 'TIV Website', category: 'Core', status: 'Operational', description: 'This website — the public digital headquarters of TIV.' },
];

export function getServiceStatuses(): ServiceStatus[] {
  return serviceStatuses;
}

// ─── Security Advisories ─────────────────────────────────────

const securityAdvisories: SecurityAdvisory[] = [];

export function getSecurityAdvisories(): SecurityAdvisory[] {
  return securityAdvisories.sort((a, b) => b.date.localeCompare(a.date));
}

// ─── Legal Documents ─────────────────────────────────────────

const legalDocuments: LegalDocument[] = [
  {
    slug: 'privacy',
    title: 'Privacy Policy',
    category: 'Privacy',
    lastUpdated: '2026-09-13',
    content: `## Overview

Tonmoy Infrastructure and Vision respects privacy. This policy describes how TIV handles information.

## Website

The TIV website does not use tracking cookies, analytics scripts, or third-party tracking pixels. The contact form processes submissions to route messages to the appropriate team and does not share information with third parties.

## Data Collection

TIV collects only what is necessary to respond to inquiries and operate its services. No personal data is sold or shared with third parties for marketing purposes.

## Open Source

TIV's software is open source. Data handling within TIV software products is documented in each project's documentation.

## Contact

Questions about privacy can be directed through the contact page. Select the "Security" or "General" category.`,
  },
  {
    slug: 'terms',
    title: 'Terms of Use',
    category: 'Terms',
    lastUpdated: '2026-09-13',
    content: `## Overview

These terms govern use of the TIV website and TIV software. By using TIV services, you agree to these terms.

## Website Content

Content on the TIV website is published for informational purposes. TIV makes reasonable efforts to ensure accuracy but does not guarantee that all information is current or complete.

## Open Source Software

TIV software is released under the licenses specified in each project. License terms govern use, modification, and distribution of that software.

## No Warranty

TIV software is provided "as is" without warranty of any kind. See each project's license for specific warranty disclaimers.

## Contact

Questions about these terms can be directed through the contact page.`,
  },
  {
    slug: 'accessibility',
    title: 'Accessibility Statement',
    category: 'Accessibility',
    lastUpdated: '2026-09-13',
    content: `## Commitment

TIV is committed to making its website accessible to all users, including those using assistive technologies.

## Current State

The TIV website is built with semantic HTML, keyboard navigation support, and respect for reduced-motion preferences. The site uses sufficient color contrast and does not rely solely on color to convey information.

## Ongoing

Accessibility is an ongoing process. TIV will improve the site as issues are identified. Reports of accessibility barriers can be sent through the contact page.

## Standards

The site aims to meet WCAG 2.2 AA guidelines. Where gaps exist, they will be addressed.`,
  },
  {
    slug: 'licenses',
    title: 'License Directory',
    category: 'Licenses',
    lastUpdated: '2026-09-13',
    content: `## Overview

TIV software is released under open-source licenses where applicable. This directory lists the license for each project.

## Projects

- **OpenMail** — AGPL-3.0
- **Mercura** — AGPL-3.0
- **M31A** — MIT License or Apache-2.0 (Dual licensed: https://github.com/eshanized/M31A)
- **Octate** — MIT License (https://github.com/vedanthq/Octate)

Projects without a confirmed license are marked as such. No license is assumed until published.

## Repository Links

Public repositories for TIV software are linked directly on their respective documentation and open-source directory pages. The absence of a repository link does not imply a license.`,
  },
];

export function getLegalDocuments(): LegalDocument[] {
  return legalDocuments;
}

export function getLegalDocument(slug: string): LegalDocument | undefined {
  return legalDocuments.find((d) => d.slug === slug);
}

// ─── Media Assets ────────────────────────────────────────────

const mediaAssets: MediaAsset[] = [
  {
    slug: 'tiv-wordmark',
    name: 'TIV Wordmark',
    type: 'Wordmark',
    description: 'The TIV wordmark — "TIV" set in the display font. Used for text-based branding.',
    format: 'SVG',
    downloadUrl: '/logo.svg',
  },
  {
    slug: 'tiv-logo-mark',
    name: 'TIV Logo Mark',
    type: 'Logo',
    description: 'The TIV logo mark — a square with the letter "T" in Coral Red. Used as the primary icon.',
    format: 'SVG',
    downloadUrl: '/favicon.svg',
  },
  {
    slug: 'tiv-brand-color',
    name: 'Brand Color — Coral Red',
    type: 'Color',
    description: 'The primary TIV brand color. Coral Red (#E5484D) used across all TIV properties.',
    format: 'HEX / RGB / HSL',
  },
  {
    slug: 'tiv-brand-guidelines',
    name: 'Brand Guidelines',
    type: 'Guidelines',
    description: 'Guidelines for using TIV branding — logo usage, typography, color, and voice.',
    format: 'Document',
  },
];

export function getMediaAssets(): MediaAsset[] {
  return mediaAssets;
}

// ─── Annual Reports ──────────────────────────────────────────

const annualReports: AnnualReport[] = [
  {
    slug: 'annual-report-2026',
    fiscalYear: 'FY2026',
    title: 'TIV Annual Report 2026',
    status: 'Management Report',
    publicationDate: '2026-09-13',
    summary:
      'The first annual report of Tonmoy Infrastructure and Vision, covering the organization\'s formation, initial projects, and research direction. This is a management report — not an audited financial statement.',
    financialSection:
      'As a newly formed organization, detailed financial information is limited. Current financial figures are management estimates and are clearly labeled as such. See the financial reporting page for detailed figures.',
    operationalSection:
      'TIV was founded in 2026. Operations began with the development and release of four stable software products (OpenMail, Mercura, M31A, Octate) and infrastructure research across networking, compute, and optical systems. The official website was launched.',
    researchSection:
      'Research continues in autonomous developer systems (M31A), networking, fiber optics, distributed systems, systems engineering, and developer infrastructure. The first research publication was released as a draft.',
    majorProjects: ['OpenMail', 'Mercura', 'M31A', 'Octate'],
    risks:
      'Key risks include: early-stage operations with limited resources, dependence on a single founder, infrastructure services in planning/research phases, and the challenges of scaling a growing software portfolio.',
    nextYearDirection:
      'Continue improving OpenMail, Mercura, M31A, and Octate. Progress infrastructure service planning. Expand research publications. Formalize governance structure as the organization grows.',
  },
];

export function getAnnualReports(): AnnualReport[] {
  return annualReports;
}

export function getAnnualReport(slug: string): AnnualReport | undefined {
  return annualReports.find((r) => r.slug === slug);
}

// ─── Documentation Links ─────────────────────────────────────

const docLinks: DocLink[] = [
  {
    slug: 'openmail-docs',
    title: 'OpenMail Documentation',
    category: 'Software',
    description: 'Documentation for OpenMail — self-hosted email infrastructure. Stable release software.',
    available: true,
    externalUrl: '/projects/openmail',
  },
  {
    slug: 'mercura-docs',
    title: 'Mercura Documentation',
    category: 'Software',
    description: 'Documentation for Mercura — self-hosted code hosting. Stable release software.',
    available: true,
    externalUrl: '/projects/mercura',
  },
  {
    slug: 'm31a-docs',
    title: 'M31A Documentation',
    category: 'Software',
    description: 'Documentation for M31A — Rust-native autonomous software-engineering runtime. Stable release software.',
    available: true,
    externalUrl: 'https://m31a.tonmoyinfrastructure.org/',
  },
  {
    slug: 'octate-docs',
    title: 'Octate Documentation',
    category: 'Software',
    description: 'Documentation for Octate — terminal-native AI code review CLI. Published on npm as @tiverse/octate.',
    available: true,
    externalUrl: '/projects/octate',
  },
  {
    slug: 'infrastructure-docs',
    title: 'Infrastructure Documentation',
    category: 'Infrastructure',
    description: 'Documentation for TIV infrastructure services — domains, hosting, compute, networking, and optical systems.',
    available: true,
    externalUrl: '/infrastructure',
  },
  {
    slug: 'whitepaper',
    title: 'TIV Infrastructure Whitepaper',
    category: 'Research',
    description: 'The TIV infrastructure whitepaper — outlining the organization\'s philosophy and approach to building infrastructure.',
    available: true,
    externalUrl: '/research/whitepaper',
  },
];

export function getDocLinks(): DocLink[] {
  return docLinks;
}

// ─── Contact Categories ─────────────────────────────────────

const contactCategories: ContactCategory[] = [
  { value: 'general', label: 'General', description: 'General inquiries about TIV.' },
  { value: 'sales', label: 'Sales', description: 'Sales and commercial inquiries.' },
  { value: 'hosting', label: 'Hosting', description: 'Hosting and infrastructure service inquiries.' },
  { value: 'domains', label: 'Domains', description: 'Domain registration and DNS inquiries.' },
  { value: 'technical', label: 'Technical', description: 'Technical questions about TIV software or infrastructure.' },
  { value: 'security', label: 'Security', description: 'Security disclosures and security-related matters.' },
  { value: 'research', label: 'Research', description: 'Research collaboration and publication inquiries.' },
  { value: 'partnership', label: 'Partnership', description: 'Partnership and collaboration proposals.' },
  { value: 'press', label: 'Press', description: 'Press and media inquiries.' },
  { value: 'careers', label: 'Careers', description: 'Careers and job-related inquiries.' },
  { value: 'investors', label: 'Investors', description: 'Investor and stakeholder inquiries.' },
];

export function getContactCategories(): ContactCategory[] {
  return contactCategories;
}
