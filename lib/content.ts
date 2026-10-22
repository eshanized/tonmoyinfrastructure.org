import type {
  Project,
  ProjectStatus,
  ResearchArea,
  Publication,
  InfrastructureService,
  NewsArticle,
  TransparencyReport,
  FinancialReport,
  Job,
  Repo,
  TechnicalArtifact,
  TechnicalFootprintPlatform,
  M31Node,
} from '@/lib/types';
import {
  validateProjects,
  validateFinancials,
  validateNews,
} from '@/lib/schemas';

// ─── Projects ──────────────────────────────────────────────

const rawProjects: Project[] = [
  {
    slug: 'openmail',
    title: 'OpenMail',
    seoTitle: 'OpenMail — Self-Hosted Email Server for SMTP, IMAP & TLS',
    seoDescription:
      'Self-hosted email server and communication infrastructure with integrated SMTP and IMAP, automatic TLS certificates, local data storage, spam protection, and mail-domain tooling.',
    type: 'software',
    productStatus: 'stable',
    releaseStatus: 'stable',
    developmentStage: 'active',
    status: 'Stable Release',
    category: 'Software',
    shortDescription:
      'Self-hosted email and communication infrastructure platform.',
    description:
      'Self-hosted email and communication infrastructure. A complete mail server platform designed for independence from centralized email providers.',
    version: '1.0.0',
    releaseDate: '2026-09-10',
    featured: true,
    technology: ['SMTP', 'IMAP', 'TLS', 'Go', 'SQLite'],
    repository: 'https://github.com/eshanized/OpenMail',
    documentation: '/projects/openmail',
    website: '',
    license: 'AGPL-3.0',
    artifactType: 'Application',
    owner: 'eshanized',
    organization: 'Tonmoy Infrastructure & Vision',
    affiliation: 'TIV',
    sources: [
      {
        platform: 'github',
        type: 'repository',
        url: 'https://github.com/eshanized/OpenMail',
        label: 'GitHub Repository',
        affiliation: 'TIV',
        organization: 'Tonmoy Infrastructure & Vision',
        verified: true,
      },
      {
        platform: 'documentation',
        type: 'documentation',
        url: '/projects/openmail',
        label: 'Specification',
        affiliation: 'TIV',
        organization: 'Tonmoy Infrastructure & Vision',
        verified: true,
      },
    ],
    problem:
      'Email is foundational to the internet, yet most email infrastructure is controlled by a small number of large providers. Self-hosting email has become notoriously difficult due to the complexity of spam filtering, deliverability, and infrastructure management.',
    approach:
      'OpenMail takes a pragmatic approach to self-hosted email: a single binary that handles SMTP, IMAP, and administration, modern TLS by default with automatic certificate management, built-in spam protection, and complete local data ownership.',
    architecture:
      'OpenMail is built as a monolithic binary with modular internal components: an SMTP server for inbound and outbound mail, an IMAP server for client access, an administration web interface, an embedded local storage engine, and automated TLS certificate management.',
    features: [
      'Single binary deployment for straightforward operations',
      'Integrated SMTP server handling inbound and outbound traffic',
      'IMAP server for standards-compliant client access',
      'Local storage engine ensuring complete data ownership',
      'Automated TLS certificate management with modern cipher suites',
      'Integrated spam protection without external service dependencies',
      'Web-based administration interface for domain and account management',
      'DKIM, SPF, and DMARC verification tooling',
    ],
    roadmap: [
      { item: 'SMTP server foundation', done: true },
      { item: 'Local storage engine', done: true },
      { item: 'IMAP server', done: true },
      { item: 'Administration interface', done: true },
      { item: 'Spam filtering', done: true },
      { item: 'DKIM/SPF/DMARC tooling', done: true },
      { item: 'Migration and import tools', done: false },
      { item: 'Enhanced deliverability diagnostic tooling', done: false },
    ],
    relatedProjects: ['mercura', 'm31a', 'octate'],
    content: `## Overview

OpenMail is a self-hosted email and communication infrastructure platform. It gives individuals and organizations full control over their email systems without depending on centralized providers.

## Problem

Email is foundational to the internet, yet most email infrastructure is controlled by a small number of large providers. Self-hosting email has become notoriously difficult due to the complexity of spam filtering, deliverability, and infrastructure management.

## Approach

OpenMail takes a pragmatic approach to self-hosted email:

- **Simple deployment** — a single binary that handles SMTP, IMAP, and administration
- **Modern TLS by default** — automatic certificate management
- **Built-in spam protection** — integrated filtering without external dependencies
- **Data ownership** — all mail stored locally, no external processing

## Architecture

OpenMail is built as a monolithic binary with modular internal components:

- SMTP server for inbound and outbound mail
- IMAP server for client access
- Administration interface
- Local storage engine
- TLS certificate management

## Current Status

OpenMail is a stable release. The core platform is complete and deployed. Active development continues on improvements and new features.

## Roadmap

- [x] SMTP server foundation
- [x] Local storage engine
- [x] IMAP server
- [x] Administration interface
- [x] Spam filtering
- [x] DKIM/SPF/DMARC
- [ ] Migration tools
- [ ] Enhanced deliverability tooling`,
    updatedAt: '2026-09-10',
  },
  {
    slug: 'mercura',
    title: 'Mercura',
    seoTitle: 'Mercura — Self-Hosted Mercurial Code Hosting Platform',
    seoDescription:
      'Self-hosted source code hosting built around Mercurial distributed version control, with browser-based repository browsing, web code review, a read-only Git mirror, and granular access controls.',
    type: 'software',
    productStatus: 'stable',
    releaseStatus: 'stable',
    developmentStage: 'active',
    status: 'Stable Release',
    category: 'Software',
    shortDescription:
      'Self-hosted code hosting built around Mercurial.',
    description:
      'Self-hosted code hosting built around Mercurial. A distributed version control platform for teams that value data ownership.',
    version: '1.0.0',
    releaseDate: '2026-09-08',
    featured: true,
    technology: ['Mercurial', 'Go', 'SQLite', 'Git'],
    repository: '',
    documentation: '/projects/mercura',
    website: '',
    license: 'AGPL-3.0',
    artifactType: 'Software Platform',
    organization: 'Tonmoy Infrastructure & Vision',
    affiliation: 'TIV',
    sources: [
      {
        platform: 'documentation',
        type: 'documentation',
        url: '/projects/mercura',
        label: 'System Specification',
        affiliation: 'TIV',
        organization: 'Tonmoy Infrastructure & Vision',
        verified: true,
      },
    ],
    problem:
      'Most code hosting platforms are centralized, proprietary, and lock teams into external infrastructure. Mercura offers an alternative: self-hosted, open, and built around Mercurials distributed architecture rather than vendor lock-in.',
    approach:
      'Mercura is designed to be self-hostable on standard servers, Mercurial-native with first-class support for distributed workflows, Git-compatible with a read-only Git mirror for ecosystem interoperability, and lightweight with minimal resource requirements.',
    architecture:
      'Mercura consists of a core repository management engine, a web interface for browsing commits and code review, an automation API layer, a user authentication and granular access control system, and an event notification system.',
    features: [
      'First-class Mercurial repository hosting and management',
      'Read-only Git mirror for ecosystem interoperability',
      'Web-based code review and changeset inspection',
      'Granular authentication and repository access control',
      'Lightweight single-server footprint with SQLite storage',
      'Comprehensive REST and CLI automation API',
      'Extensible plugin architecture hooks',
    ],
    roadmap: [
      { item: 'Repository management core', done: true },
      { item: 'Web browsing interface', done: true },
      { item: 'Code review system', done: true },
      { item: 'API layer', done: true },
      { item: 'Authentication and access control', done: true },
      { item: 'Git mirroring capability', done: true },
      { item: 'Plugin system expansion', done: false },
      { item: 'Enhanced collaboration features', done: false },
    ],
    relatedProjects: ['openmail', 'm31a', 'octate'],
    content: `## Overview

Mercura is a self-hosted code hosting platform built around Mercurial. It provides repository hosting, code review, and collaboration tools for teams that prefer distributed version control systems.

## Problem

Most code hosting platforms are centralized, proprietary, and lock teams into external infrastructure. Mercura offers an alternative: self-hosted, open, and built around Mercurial's powerful distributed model.

## Approach

Mercura is designed to be:

- **Self-hostable** — run on your own infrastructure
- **Mercurial-native** — first-class Mercurial support, not an afterthought
- **Git-compatible** — read-only Git mirror for interoperability
- **Lightweight** — minimal resource requirements
- **Extensible** — plugin architecture for custom workflows

## Architecture

Mercura consists of:

- Repository management engine
- Web interface for browsing and code review
- API for automation and integration
- Authentication and access control
- Notification system

## Current Status

Mercura is a stable release. The core platform is complete and deployed. Active development continues on improvements and new features.

## Roadmap

- [x] Repository management core
- [x] Web browsing interface
- [x] Code review system
- [x] API layer
- [x] Authentication
- [x] Git mirroring
- [ ] Plugin system
- [ ] Enhanced collaboration features`,
    updatedAt: '2026-09-08',
  },
  {
    slug: 'm31a',
    title: 'M31A',
    seoTitle: 'M31A — Open-Source Rust AI Coding Agent Runtime',
    seoDescription:
      'Rust-native runtime for autonomous coding agents with deterministic lifecycle control, non-bypassable policy gates, resource-bounded execution, continuous verification, crash-resilient checkpoints, and local observability.',
    type: 'software',
    productStatus: 'stable',
    releaseStatus: 'stable',
    developmentStage: 'active',
    status: 'Stable Release',
    category: 'Software',
    shortDescription:
      'Rust-native autonomous software-engineering runtime with non-bypassable policy gates and verifiable execution.',
    description:
      'Single-crate, high-assurance, Rust-native autonomous software engineering runtime. It provides deterministic lifecycle control, strict multi-layer security policies, resource-bounded execution, continuous verification, crash-resilient checkpoints, and local observability for autonomous coding agents.',
    version: '0.1.1',
    releaseDate: '2026-10-02',
    featured: true,
    technology: ['Rust', 'Tokio', 'SQLite', 'Ratatui', 'NVIDIA NIM', 'cgroups v2', 'POSIX rlimits'],
    repository: 'https://github.com/eshanized/M31A',
    documentation: 'https://m31a.tonmoyinfrastructure.org/',
    website: 'https://m31a.tonmoyinfrastructure.org/',
    license: 'MIT OR Apache-2.0',
    artifactType: 'Software System',
    owner: 'eshanized',
    organization: 'Tonmoy Infrastructure & Vision',
    affiliation: 'TIV',
    ecosystem: 'm31',
    ecosystemRole: 'Autonomous software-engineering runtime',
    sources: [
      {
        platform: 'website',
        type: 'website',
        url: 'https://m31a.tonmoyinfrastructure.org/',
        label: 'Dedicated Website',
        affiliation: 'TIV',
        organization: 'Tonmoy Infrastructure & Vision',
        verified: true,
      },
      {
        platform: 'github',
        type: 'repository',
        url: 'https://github.com/eshanized/M31A',
        label: 'GitHub Repository',
        affiliation: 'TIV',
        organization: 'Tonmoy Infrastructure & Vision',
        verified: true,
      },
      {
        platform: 'documentation',
        type: 'documentation',
        url: 'https://m31a.tonmoyinfrastructure.org/',
        label: 'Runtime Manual & Architecture',
        affiliation: 'TIV',
        organization: 'Tonmoy Infrastructure & Vision',
        verified: true,
      },
    ],
    problem:
      'Autonomous coding agents traditionally delegate execution authority to non-deterministic large language models, resulting in hallucinations, runaway processes, unconstrained shell execution, path traversal vulnerabilities, leaked credentials, unverified completion claims, and catastrophic execution drift. Existing agent frameworks lack deterministic lifecycle boundaries, hard OS-level confinement, and non-bypassable policy gates.',
    approach:
      'M31A operates on the core invariant: "The model proposes. The runtime decides." Large language models are treated as untrusted reasoning components that generate structured candidate intents, while the single-crate Rust runtime strictly owns scheduling, resource allocation, policy evaluation, OS-level sandbox isolation, continuous multi-tier verification, and atomic checkpoints. Production inference is powered by NVIDIA NIM with SSE streaming, paired with an interactive Ratatui terminal cockpit.',
    architecture:
      'M31A enforces a strict downward-dependency layered hierarchy across 10 layers (L0–L9): L0 Kernel (strongly typed domain IDs and shared errors), L1 Security (11-stage policy gate, ASVS L1 threat mitigations, and SSRF blocking), L2 Capability Providers (28 core tools across 15 families, Linux cgroups v2 / POSIX rlimits / Windows Job Objects confinement), L3 Intelligence Boundary (NVIDIA NIM SSE streaming, token budgeting, multi-tier SecretRedactor, XML trust envelopes), L4 Agent Coordination (8 canonical agent roles with role state machines), L5 Planning Engine (acyclic task DAG reconciler), L6 Execution Engine (process supervisor, streaming spools, immutable artifacts), L7 Verification & Recovery (multi-tier validation, 15 failure classifications, 2-phase checkpoints), L8 Autonomy Controller (12-stage mission execution loop, 10 budget dimensions), and L9 Terminal Cockpit (interactive Ratatui TUI and CLI).',
    features: [
      'Deterministic runtime authority ("The model proposes. The runtime decides.")',
      '11-stage non-bypassable policy evaluation gate with ALLOW, DENY, ASK, and ESCALATE decisions',
      'ASVS L1 compliance mitigating 11 canonical threat vectors including path traversal, secret leaks, and prompt injection',
      'Dual deployment channels: production (m31a) and development (m31a-dev) with compile-time isolation',
      'Evidence-based completion gating requiring multi-tier verification proof before marking tasks complete',
      'Two-phase atomic checkpoints, startup crash scanners, and differential DAG replanning',
      'Multi-tier confinement via Linux cgroups v2, POSIX rlimits, and Windows Job Objects',
      'Multi-tier secret redaction preventing credentials from reaching SQLite, NDJSON telemetry, or TUI buffers',
      '8 specialized canonical agent roles (Planner, Researcher, Architect, Implementer, Reviewer, Verifier, Diagnostician, Integrator)',
      'Interactive terminal cockpit built with Ratatui and Crossterm (m31a tui)',
      'Local observability with embedded SQLite state indexes and append-only NDJSON execution streams',
      'Production NVIDIA NIM inference with SSE streaming and token-bounded context management',
    ],
    roadmap: [
      { item: 'Single-crate Rust runtime layered architecture (L0–L9)', done: true },
      { item: '11-stage policy evaluation gate and ASVS L1 hardening', done: true },
      { item: '8 canonical agent roles and 12-stage autonomy controller', done: true },
      { item: 'Two-phase atomic checkpoints and crash-resilient recovery', done: true },
      { item: 'Production NVIDIA NIM provider integration with SSE streaming', done: true },
      { item: 'Terminal-native Ratatui cockpit and CLI subcommand suite', done: true },
      { item: 'Multi-platform confinement (cgroups v2, POSIX rlimits, Windows Job Objects)', done: true },
      { item: 'Dual deployment channels (production vs development)', done: true },
      { item: 'Linux x86_64 verified and supported platform qualification', done: true },
      { item: 'Native qualification and runner verification for macOS and Windows targets', done: false },
    ],
    relatedResearch: ['autonomous-development-systems'],
    relatedProjects: ['openmail', 'mercura', 'octate'],
    content: `> **"The model proposes. The runtime decides."**

**Website:** [https://m31a.tonmoyinfrastructure.org/](https://m31a.tonmoyinfrastructure.org/) &bull; **Repository:** [https://github.com/eshanized/M31A/](https://github.com/eshanized/M31A/)

M31A (M31 Autonomous) is a single-crate, high-assurance, Rust-native autonomous software engineering runtime. It provides deterministic lifecycle control, strict multi-layer security policies, resource-bounded execution, continuous verification, crash-resilient checkpoints, and local observability for autonomous coding agents.

Unlike ad-hoc agent scripts or loose orchestration frameworks that delegate execution authority to non-deterministic large language models, M31A treats the LLM as an untrusted reasoning component. The runtime strictly owns state, scheduling, file access, command execution, policies, verification, and completion criteria.

---

## Architectural Principles

1. **Single Trusted Kernel**: Implemented as a single, clean Rust crate without foreign runtime dependencies (no Node.js, Python, or GPU required for core runtime execution).
2. **Deterministic Governance**: Every side effect (file writes, process spawning, Git operations, network requests) passes through an 11-stage policy evaluation gate.
3. **Evidence-Based Completion**: No mission or task is marked complete without deterministic, multi-tier verification evidence (fail-closed).
4. **Resilient Recovery**: Two-phase atomic checkpoints, startup crash scanners, and differential DAG replanners preserve completed work across crashes.
5. **Bounded Confinement**: Multi-dimensional budget models (10 hard resource dimensions) and platform-aware confinement (Linux cgroups v2, POSIX rlimits, Windows Job Objects) prevent runaway execution.
6. **Local Observability**: SQLite compact event indexes, append-only NDJSON execution streams, and zero-leak secret redaction before durable storage.

---

## Layered Hierarchy (L0–L9)

The M31A runtime enforces a strict downward-dependency layered hierarchy across 10 layers:

| Layer | Subsystem | Scope & Guarantees |
|:---|:---|:---|
| **L9** | CLI / TUI Cockpit | Command parsing, Ratatui interactive cockpit, telemetry inspection, JSON export, evaluation runner. |
| **L8** | Autonomy Controller | 12-stage mission execution loop, budget tracker, sliding-window loop detector, completion gates. |
| **L7** | Verification & Recovery | Multi-tier test validation, 15 failure classifications, differential DAG replanner, two-phase atomic checkpoints. |
| **L6** | Execution Engine | Job manager, process tree supervisor, streaming output spools, immutable artifact store. |
| **L5** | Planning / DAG Engine | TaskGraph reconciler, topological scheduler, candidate plan validator, task state machines. |
| **L4** | Agent Coordination | 8 canonical agent roles, role state machines, context window compilers, token allocators. |
| **L3** | Intelligence Boundary | NVIDIA NIM SSE streaming, structural proposal introspection, multi-tier SecretRedactor, XML trust envelopes. |
| **L2** | Capabilities & Tools | 28 core tools across 15 families, Linux cgroups v2 / POSIX rlimits / Windows Job Objects confinement, deny-by-default environment builder. |
| **L1** | Security & Policy | 11-stage policy gate (ALLOW / DENY / ASK / ESCALATE), ASVS L1 threat mitigations, NetworkDestinationPolicy SSRF blocking, worktree isolation. |
| **L0** | Runtime Kernel | Strongly typed domain IDs (MissionId, TaskId, JobId), shared error model, base kernel traits. |

---

## Security Governance & 11-Stage Policy Gate

Security decisions are computed deterministically across a 10-layer authority stack where higher authority always wins. Lower layers can only restrict, never expand, permissions.

When an action or tool call is evaluated by \`PolicyGate\`, it produces one of four mutually exclusive decisions:
- **\`ALLOW\`**: Permitted unconditionally; execution proceeds immediately within sandbox limits.
- **\`DENY\`**: Forbidden fail-closed; execution is aborted with zero side effects.
- **\`ASK\`**: Requires human operator authorization; converts to \`DENY\` fail-closed in unattended mode.
- **\`ESCALATE\`**: Requires elevated administrative consent; routes approval or halts execution.

### ASVS L1 Hardening Matrix
M31A explicitly mitigates 11 canonical threat vectors validated continuously:
- **Path Traversal**: Canonical path verification strictly prevents escaping the workspace root.
- **Command Injection**: Subprocesses spawn via direct \`execve\` with dangerous loader hooks stripped.
- **Secret Redaction**: 4-tier scrubber redacts API keys, bearer tokens, and credentials before persistence.
- **Prompt Injection**: Untrusted inputs are wrapped in XML trust envelopes with closing-tag escaping and SHA-256 digests.
- **Process Confinement**: Linux cgroups v2 (\`cpu.max\`, \`memory.max\`), POSIX rlimits, and process group isolation.

---

## Canonical Agent Roles

M31A partitions autonomous engineering tasks across 8 specialized agent roles:
1. **Planner (\`AgentRole::Planner\`)**: Analyzes high-level objectives, decomposes requirements, and generates acyclic candidate task DAGs.
2. **Researcher (\`AgentRole::Researcher\`)**: Explores codebase structure, indexes symbols, reads documentation, and surveys dependencies.
3. **Architect (\`AgentRole::Architect\`)**: Defines cross-module interfaces, contract types, API boundaries, and patterns.
4. **Implementer (\`AgentRole::Implementer\`)**: Authors concrete source code modifications, writes tests, and applies targeted patches.
5. **Reviewer (\`AgentRole::Reviewer\`)**: Performs semantic code reviews, auditing proposed diffs for security and regressions.
6. **Verifier (\`AgentRole::Verifier\`)**: Executes automated test suites, type checking, and linters; generates cryptographic verification evidence.
7. **Diagnostician (\`AgentRole::Diagnostician\`)**: Analyzes failed verification runs, compiler diagnostics, and classifies failure modes.
8. **Integrator (\`AgentRole::Integrator\`)**: Consolidates verified worktrees, stages changes, and generates RFC-compliant commit trailers.

---

## Deployment Channels & Platform Qualification

M31A features two compile-time isolated deployment channels:
- **Production (\`m31a\`)**: Default build channel for operational deployments.
- **Development (\`m31a-dev\`)**: Isolated development channel with dedicated state paths.

### Platform Support Matrix
- **Linux (x86_64)**: \`x86_64-unknown-linux-gnu\` — **SUPPORTED** (Verified native runtime evidence)
- **macOS (Intel x86_64)**: \`x86_64-apple-darwin\` — **CONDITIONALLY SUPPORTED**
- **Linux (ARM64)**: \`aarch64-unknown-linux-gnu\` — **COMPILE-ONLY**
- **macOS (Apple Silicon)**: \`aarch64-apple-darwin\` — **COMPILE-ONLY**
- **Windows (x86_64 / ARM64)**: \`x86_64-pc-windows-msvc\` — **COMPILE-ONLY**

---

## Installation & Quickstart

### Automated One-Liner Install

\`\`\`bash
# Linux / macOS
curl -fsSL https://raw.githubusercontent.com/eshanized/M31A/master/scripts/install.sh | bash

# Windows PowerShell
irm https://raw.githubusercontent.com/eshanized/M31A/master/scripts/install.ps1 | iex
\`\`\`

### Quickstart Workflow

\`\`\`bash
# 1. Set NVIDIA NIM credentials
export NVIDIA_API_KEY="nvapi-..."

# 2. Launch an autonomous guided coding mission
m31a mission run "Refactor database queries to use parameterized statements" --profile coding

# 3. Launch interactive terminal cockpit
m31a tui

# 4. Inspect execution telemetry and resource metrics
m31a telemetry inspect <mission-id> --summary --spans --metrics

# 5. Run unattended evaluation benchmarks
m31a eval run --all
\`\`\``,
    updatedAt: '2026-10-02',
  },
  {
    slug: 'octate',
    title: 'Octate',
    seoTitle: 'Octate — AI Code Review CLI with Tree-sitter & SARIF',
    seoDescription:
      'Terminal-native AI code review CLI combining Tree-sitter AST parsing, cross-file reference graphs, static-linter findings, multi-stage LLM review, critic validation, and SARIF export.',
    type: 'software',
    productStatus: 'stable',
    releaseStatus: 'stable',
    developmentStage: 'active',
    status: 'Stable Release',
    category: 'Software',
    shortDescription:
      'Terminal-native AI code review CLI. Deterministic repository intelligence meets LLM reasoning.',
    description:
      'Terminal-native AI code review CLI. Combines local Tree-sitter WASM AST parsing, cross-file reference graphs, and static linter discovery with multi-stage LLM review DAGs and a two-stage critic quality gate.',
    version: '1.0.0',
    releaseDate: '2026-09-13',
    featured: true,
    technology: ['TypeScript', 'Node.js', 'Tree-sitter', 'React / Ink', 'SARIF v2.1.0', 'Nemotron 3 Ultra', 'Git'],
    repository: 'https://github.com/vedanthq/Octate',
    documentation: '/projects/octate',
    website: 'https://www.npmjs.com/package/@tiverse/octate',
    license: 'MIT',
    artifactType: 'Tool',
    organization: 'Tonmoy Infrastructure & Vision',
    affiliation: 'TIV',
    sources: [
      {
        platform: 'github',
        type: 'repository',
        url: 'https://github.com/vedanthq/Octate',
        label: 'GitHub Repository',
        affiliation: 'TIV',
        organization: 'Tonmoy Infrastructure & Vision',
        verified: true,
      },
      {
        platform: 'registry',
        type: 'library',
        url: 'https://www.npmjs.com/package/@tiverse/octate',
        label: 'npm (@tiverse/octate)',
        affiliation: 'TIVerse',
        organization: 'Tonmoy Infrastructure & Vision',
        verified: true,
      },
      {
        platform: 'documentation',
        type: 'documentation',
        url: '/projects/octate',
        label: 'System Specification',
        affiliation: 'TIV',
        organization: 'Tonmoy Infrastructure & Vision',
        verified: true,
      },
    ],
    problem:
      'Traditional code review is constrained by engineering bandwidth, while generic AI code-review bots frequently flood pull requests with noisy, hallucinated comments because they lack deterministic awareness of repository syntax trees, cross-file symbol graphs, and project conventions.',
    approach:
      'Octate enforces a deterministic pre-analysis first philosophy: Tree-sitter WASM parses concrete syntax trees, extracts cross-file references, and executes local linters before model inference. A multi-stage reviewer DAG (Security, Architecture, Performance, Correctness) analyzes contextual subgraphs in parallel, while a two-stage critic gate filters out hallucinations and low-signal noise. Results are rendered in an interactive React/Ink terminal UI or exported as SARIF v2.1.0 for CI/CD.',
    architecture:
      'Octate implements a modular 7-layer architecture: 1) Repository Layer (isomorphic-git status and monorepo workspace resolution), 2) Analysis Layer (Tree-sitter WASM AST parsing and static linter discovery), 3) Intelligence Layer (scope-bounded symbol indexes and deterministic cross-file reference graphs), 4) Model Provider (OpenAI-compatible endpoint supporting NVIDIA Nemotron 3 Ultra), 5) Review Engine (multi-stage reviewer DAG with two-stage critic quality gate), 6) Application Layer (8-stage canonical progress streaming with cancellation traps), 7) Presentation Layer (fullscreen React/Ink TUI with alternate screen buffer, SARIF v2.1.0, and JSON output).',
    features: [
      'Interactive terminal UI built with Ink and React 19 featuring diff inspection and in-place re-reviews',
      'Deterministic pre-analysis with Tree-sitter WASM AST parsing and cross-file reference graphs',
      'Multi-stage reviewer DAG covering Security, Architecture, Performance, and Correctness',
      'Two-stage critic quality gate eliminating hallucinations and trivial linter noise',
      'Local-first execution and smart git diff pruning for zero token waste',
      'First-class SARIF v2.1.0 output for GitHub Code Scanning and CI/CD pipelines',
      'Comprehensive octate doctor diagnostics auditing Node.js, git, linters, and model access',
      'Configurable failure thresholds (--fail-on critical|high|medium|low)',
    ],
    roadmap: [
      { item: 'Tree-sitter WASM AST parsing and symbol graph engine', done: true },
      { item: 'Multi-stage reviewer DAG (Security, Architecture, Performance, Correctness)', done: true },
      { item: 'Two-stage critic quality gate (heuristic floor + LLM critic)', done: true },
      { item: 'Interactive Ink/React terminal user interface', done: true },
      { item: 'SARIF v2.1.0 and CI/CD automation pipelines', done: true },
      { item: 'npm package publication (@tiverse/octate v1.0.0)', done: true },
      { item: 'Extended multi-language Tree-sitter grammar support', done: false },
      { item: 'Local quantized model runtime support', done: false },
    ],
    relatedProjects: ['openmail', 'mercura', 'm31a'],
    content: `## Overview

Octate is a developer-first, terminal-native AI code-review CLI tool. It combines deterministic repository intelligence (Tree-sitter WASM AST parsing, cross-file reference graphs, static linters) with multi-stage LLM reasoning and a two-stage critic quality gate.

- **Package**: Published to npm as [\`@tiverse/octate\`](https://www.npmjs.com/package/@tiverse/octate)
- **Source**: Available on GitHub at [vedanthq/Octate](https://github.com/vedanthq/Octate)
- **License**: MIT License

### Core Philosophy

Understand the repository first, deterministically, and use AI reasoning over that structured understanding — not the other way around.

Traditional AI review tools send raw diff snippets to an LLM without understanding syntactic hierarchy or project-wide symbol definitions, leading to high false-positive rates and trivial commentary. Octate parses code locally with Tree-sitter, builds dependency reference subgraphs, runs static linters, and feeds enriched context into a specialized reviewer DAG.

---

## Quickstart

Run a code review immediately with zero installation required:

\`\`\`bash
npx @tiverse/octate review
\`\`\`

Or install globally via npm:

\`\`\`bash
npm install -g @tiverse/octate
\`\`\`

Verify environment readiness, linter discovery, and model connectivity:

\`\`\`bash
octate doctor
\`\`\`

Initialize a project configuration file (\`octate.yaml\`):

\`\`\`bash
octate init
\`\`\`

---

## CLI Reference

### \`octate review [options] [refs...]\`

Review working tree changes, git refs, commits, or branch revision ranges:

\`\`\`bash
# Review unstaged and staged working tree changes (default)
octate review

# Review only staged git changes
octate review --staged

# Review a specific commit
octate review --commit HEAD~1

# Review a revision range (PR branch against main)
octate review --range origin/main..HEAD

# Output SARIF v2.1.0 format for CI/CD integration
octate review --sarif --no-tui > results.sarif

# Fail CI build if any critical or high findings are detected
octate review --no-tui --fail-on high
\`\`\`

#### Key Options

| Flag | Description | Default |
| :--- | :--- | :--- |
| \`--staged\` | Review only staged git changes | \`false\` |
| \`--commit <hash>\` | Review specific commit | \`undefined\` |
| \`--range <rev..rev>\` | Review revision range (e.g. \`origin/main..HEAD\`) | \`undefined\` |
| \`--branch <name>\` | Review changes against target branch | \`undefined\` |
| \`--json\` | Output review results as machine-readable JSON | \`false\` |
| \`--sarif\` | Output review results as SARIF v2.1.0 | \`false\` |
| \`-q, --quiet\` | Minimal output (summary counters only) | \`false\` |
| \`--no-tui\` | Plain-text console output instead of interactive TUI | Auto-detected |
| \`--fail-on <level>\` | Exit code 1 threshold (\`critical\`, \`high\`, \`medium\`, \`low\`, \`none\`) | \`critical\` |
| \`-c, --config <path>\` | Custom \`octate.yaml\` configuration path | \`octate.yaml\` |
| \`-d, --debug\` | Enable verbose debug logging | \`false\` |

---

## Interactive TUI Workspace

When executed in an interactive terminal, Octate launches a full-screen React/Ink terminal UI using an alternate screen buffer:

| Key | Action |
| :--- | :--- |
| \`j\` / \`↓\` | Select next finding |
| \`k\` / \`↑\` | Select previous finding |
| \`Enter\` / \`Space\` | Expand / collapse finding detail & evidence |
| \`s\` | Suppress / restore active finding for current session |
| \`c\` | Copy finding summary and file anchor to clipboard |
| \`r\` | Re-run review in-place (hot reload with latest edits) |
| \`?\` | Open interactive keyboard shortcuts modal |
| \`q\` / \`Esc\` | Exit session (evaluates exit code against unsuppressed blockers) |

---

## 7-Layer Architecture

Octate employs a deterministic 7-layer pipeline:

1. **Repository Layer**: Fast git status discovery via \`isomorphic-git\` and monorepo workspace boundary resolution.
2. **Analysis Layer**: Concrete syntax trees via Tree-sitter WASM with hybrid fallback to host linters (\`tsc\`, \`biome\`, \`ruff\`, \`mypy\`, \`bandit\`).
3. **Intelligence Layer**: Scope-bounded symbol indexes and deterministic cross-file reference graphs.
4. **Model Provider**: OpenAI-compatible endpoint supporting NVIDIA Nemotron 3 Ultra (\`nvidia/nemotron-3-ultra-550b-a55b\`).
5. **Review Engine**: Parallel DAG scheduling with specialized reviewer roles (Security, Architecture, Performance, Correctness) and a two-stage critic (hard floor heuristics + LLM critic).
6. **Application Layer**: 8-stage canonical progress streaming with cancellation and exception traps.
7. **Presentation Layer**: Fullscreen Ink TUI with primary screen restoration and SARIF v2.1.0 export.

---

## Current Status

Octate \`v1.0.0\` is an existing **Stable Release**. The core CLI engine, TUI, Tree-sitter analysis, and SARIF exporter are complete and deployed. It is actively maintained and published under the MIT license.`,
    updatedAt: '2026-09-18',
  },
  {
    slug: 'm31genesis',
    title: 'M31Genesis',
    type: 'research',
    artifactType: 'AI Model',
    productStatus: 'preview',
    releaseStatus: 'pre-release',
    developmentStage: 'research',
    status: 'Experimental',
    category: 'AI / Research',
    shortDescription:
      'Native M31 causal language model for agentic coding research (425M parameters).',
    description:
      'M31-Genesis-AgenticCode-v1 — native M31 causal language model for agentic coding research. Checkpoints are experimental research checkpoints.',
    version: 'AgenticCode-v1',
    releaseDate: '2026-09-07',
    featured: true,
    technology: ['Transformer', 'PyTorch', 'Safetensors', 'Causal LM', 'M31', 'RoPE', 'GQA'],
    license: 'MIT',
    parameterCount: '425M-class',
    modelArchitecture:
      'Native M31 decoder-only transformer, 425M-class parameters, 65,536 ByteLevel BPE vocabulary, 24 layers, hidden size 1024, 16 attention heads / 8 KV heads, RMSNorm, RoPE, tied embeddings.',
    intendedUse: [
      'Software engineering',
      'Coding & code synthesis',
      'Debugging',
      'Code editing',
      'Repository-aware reasoning',
      'Agent & tool-use research',
    ],
    checkpointsNote:
      'Experimental research checkpoints. Evaluate before production use. Stored on Hugging Face.',
    ecosystem: 'm31',
    ecosystemRole: 'Native causal language model for agentic coding research',
    owner: 'eshanized',
    author: 'eshanized',
    organization: 'Tonmoy Infrastructure & Vision',
    affiliation: 'TIV',
    sources: [
      {
        platform: 'huggingface',
        type: 'model',
        url: 'https://huggingface.co/eshanized/M31Genesis',
        label: 'Hugging Face Model Card',
        author: 'eshanized',
        organization: 'Tonmoy Infrastructure & Vision',
        affiliation: 'TIV',
        verified: true,
        description: 'Primary model card, tokenizer, and safetensors checkpoints.',
      },
    ],
    problem:
      'Agentic coding systems often rely on massive, proprietary black-box APIs with unknown training distributions, unpredictable latencies, and high resource costs. Research into lightweight, sovereign causal architectures specifically optimized for agentic reasoning and code modification has been constrained by a lack of open, inspectable checkpoints.',
    approach:
      'M31Genesis implements a native M31 decoder-only transformer architecture with 425M-class parameters. It balances expressiveness for code syntax and AST transformations with lightweight execution, publishing transparent step-wise checkpoint lineages on Hugging Face for reproducible evaluation.',
    architecture:
      'Native M31 decoder-only transformer: 425M-class parameters, 65,536 ByteLevel BPE vocabulary, 24 layers, hidden size 1024, 16 attention heads / 8 KV heads (GQA), RMSNorm normalization, Rotary Position Embeddings (RoPE), and tied embeddings.',
    features: [
      'Native M31 decoder-only transformer design',
      '425M-class parameters optimized for local agent execution',
      '65,536 ByteLevel BPE vocabulary with code-token density',
      '16 query heads / 8 KV heads grouped-query attention',
      'Rotary Position Embeddings (RoPE) and RMSNorm',
      'Step-wise immutable checkpoint lineage',
      'Open safetensors serialization and reproducible runtime',
    ],
    roadmap: [
      { item: 'Architecture specification & tokenizer definition', done: true },
      { item: 'Pre-training checkpoint series step-00000500 to latest', done: true },
      { item: 'Hugging Face model card and weights publication', done: true },
      { item: 'Standalone inference and generation runtime (inference.py)', done: true },
      { item: 'Fine-tuning & SFT stage continuation', done: false },
      { item: 'Comprehensive HumanEval and SWE-bench evaluation', done: false },
    ],
    relatedResearch: ['autonomous-development-systems'],
    relatedProjects: ['m31a', 'm31tesla', 'm31entropy'],
    content: `## Overview

M31Genesis (M31-Genesis-AgenticCode-v1) is a native M31 causal language model developed for agentic coding research. It is designed to explore how compact, purpose-built transformer architectures can perform software engineering, code synthesis, editing, and repository-aware reasoning.

## Lifecycle Status: Experimental Research Checkpoints

**IMPORTANT NOTICE**: M31Genesis is explicitly designated as **Experimental Research Checkpoints**. It is published for research, evaluation, and experimental benchmarking. It is **not** a stable production product, and must be evaluated rigorously before any operational deployment.

## Architecture

The model uses a native M31 decoder-only transformer architecture:

- **Parameters**: 425M-class parameters
- **Layers**: 24 transformer layers
- **Hidden Size**: 1024
- **Attention Heads**: 16 query heads, 8 KV heads (Grouped-Query Attention)
- **Vocabulary**: 65,536 ByteLevel BPE
- **Positional Encoding**: Rotary Position Embeddings (RoPE)
- **Normalization**: RMSNorm
- **Embedding**: Tied word embeddings
- **Format**: Safetensors

## Intended Use

The model card specifies the following intended research use cases:

- Software engineering and coding
- Automated debugging and error analysis
- Code editing and diff generation
- Repository-aware multi-file reasoning
- Agent and tool-use orchestration research

## Public Checkpoints & Authoritative Source

Public checkpoints are hosted on Hugging Face at [eshanized/M31Genesis](https://huggingface.co/eshanized/M31Genesis). Checkpoints are stored immutably with corresponding configuration, tokenizer, and metadata files.`,
    updatedAt: '2026-09-07',
  },
  {
    slug: 'm31-q',
    title: 'M31 Q // For programmers',
    type: 'research',
    artifactType: 'Space / Demo',
    productStatus: 'preview',
    releaseStatus: 'pre-release',
    developmentStage: 'research',
    status: 'Experimental',
    category: 'AI / Demonstration',
    shortDescription:
      'Hugging Face Space interactive demonstration for programmers.',
    description:
      'M31 Q // For programmers — Hugging Face Space interactive demonstration for exploring M31 programmer tooling and capabilities.',
    version: 'Demo',
    releaseDate: '2026-09-08',
    featured: true,
    technology: ['Hugging Face Spaces', 'M31', 'Interactive Demo'],
    license: 'MIT',
    ecosystem: 'm31',
    ecosystemRole: 'Public interactive demonstration space',
    owner: 'eshanized',
    organization: 'Tonmoy Infrastructure & Vision',
    affiliation: 'TIV',
    sources: [
      {
        platform: 'huggingface',
        type: 'space',
        url: 'https://huggingface.co/spaces/eshanized/M31Q',
        label: 'Hugging Face Space',
        author: 'eshanized',
        organization: 'Tonmoy Infrastructure & Vision',
        affiliation: 'TIV',
        verified: true,
        description: 'Interactive public demonstration space on Hugging Face.',
      },
    ],
    problem:
      'Evaluating experimental AI capabilities often requires cumbersome local environment setups, specialized GPU runtimes, and complex dependency configurations.',
    approach:
      'M31 Q provides a hosted public web demonstration via Hugging Face Spaces, allowing programmers and researchers to inspect and interact with M31 capabilities directly in the browser.',
    architecture:
      'Hosted Hugging Face Space frontend connected to M31 interactive demonstration runtime.',
    features: [
      'Direct browser-based interaction without local installation',
      'Demonstrates M31 code reasoning capabilities',
      'Hosted on Hugging Face Spaces infrastructure',
      'Zero user data retention policy',
    ],
    roadmap: [
      { item: 'Initial Space deployment on Hugging Face', done: true },
      { item: 'Integration with M31 experimental runtime', done: true },
      { item: 'Public access and feedback collection', done: true },
      { item: 'Interactive code editing benchmark suite', done: false },
    ],
    relatedProjects: ['m31genesis', 'm31a'],
    content: `## Overview

M31 Q // For programmers is an interactive demonstration Space hosted on Hugging Face. It provides an accessible web interface for exploring M31 tooling, developer interactions, and programmer-focused research.

## Classification & Association

- **Artifact Type**: AI Space / Demonstration
- **Platform**: Hugging Face Spaces
- **Owner / Profile**: eshanized
- **Organization**: Tonmoy Infrastructure & Vision
- **Affiliation**: TIV
- **Direct Link**: [huggingface.co/spaces/eshanized/M31Q](https://huggingface.co/spaces/eshanized/M31Q)

## Scope & Constraints

As part of TIV's commitment to factual transparency:
- No speculative capabilities or undisclosed model backends are claimed.
- No unverified uptime metrics or user counts are fabricated.
- The Space is presented solely as an experimental research demonstration.`,
    updatedAt: '2026-09-08',
  },
  {
    slug: 'm31tesla',
    title: 'M31Tesla',
    type: 'research',
    artifactType: 'AI Model',
    productStatus: 'preview',
    releaseStatus: 'pre-release',
    developmentStage: 'research',
    status: 'Experimental',
    category: 'AI / Research',
    shortDescription:
      'Standalone runtime and checkpoints for M31-Python-Agent-220M-v5.',
    description:
      'M31Tesla — standalone runtime and experimental research checkpoints for the custom M31-Python-Agent-220M-v5 model.',
    version: 'v5 (Python-Agent)',
    releaseDate: '2026-09-08',
    featured: false,
    technology: ['Transformer', 'PyTorch', 'Safetensors', 'Python', 'RoPE', 'GQA'],
    license: 'MIT',
    parameterCount: '228.9M',
    modelArchitecture:
      '228,953,984 parameters; vocab 32,768; hidden 896; 20 layers; 14 query heads; 7 KV heads; intermediate 2,816; GQA; RMSNorm; RoPE theta 10,000; tied embeddings.',
    intendedUse: [
      'Python code repair experimentation',
      'Agentic workflow execution',
      'Lightweight runtime testing',
    ],
    checkpointsNote:
      'Experimental research checkpoints across pretrain, sft, agent, and repair stages.',
    ecosystem: 'm31',
    ecosystemRole: 'Python agent runtime and repair checkpoint research',
    owner: 'eshanized',
    author: 'eshanized',
    organization: 'Tonmoy Infrastructure & Vision',
    affiliation: 'TIV',
    sources: [
      {
        platform: 'huggingface',
        type: 'model',
        url: 'https://huggingface.co/eshanized/M31Tesla',
        label: 'Hugging Face Model Card & Runtime',
        author: 'eshanized',
        organization: 'Tonmoy Infrastructure & Vision',
        affiliation: 'TIV',
        verified: true,
        description: 'Checkpoints (pretrain, SFT, repair, agent) and standalone Python runtime.',
      },
    ],
    problem:
      'Autonomous code repair agents require lightweight, low-latency models that can run in resource-constrained environments to diagnose and patch Python code regressions.',
    approach:
      'M31Tesla pairs a 228.9M parameter custom model architecture with a standalone Python runtime (m31_runtime.py and generation_m31.py), trained across pretraining, SFT, agent, and repair milestones.',
    architecture:
      '228,953,984 parameters; vocab 32,768; hidden 896; 20 layers; 14 query heads; 7 KV heads; intermediate 2,816; Grouped-Query Attention (GQA); RMSNorm; RoPE theta 10,000; tied embeddings. Defaults to 512-token working context, supporting positions up to 2,048.',
    features: [
      'Compact 228.9M parameter footprint',
      'Grouped-Query Attention with 14 query / 7 KV heads',
      'Multi-stage checkpoints: pretrain, SFT, agent, repair',
      'Standalone lightweight Python runtime included in repository',
    ],
    roadmap: [
      { item: 'Architecture design and tokenizer configuration', done: true },
      { item: 'Pretrain checkpoint series (step-00000500 to step-00001832)', done: true },
      { item: 'SFT and repair stage checkpoints', done: true },
      { item: 'Standalone runtime generation scripts', done: true },
      { item: 'Multi-file code repair evaluation', done: false },
    ],
    relatedProjects: ['m31genesis', 'm31a', 'm31entropy'],
    content: `## Overview

M31Tesla is an experimental AI research project providing the standalone runtime and checkpoints for the custom **M31-Python-Agent-220M-v5** model.

## Fact Verification: Project Name & Scope

**Note**: In accordance with TIV's strict transparency rules, the project name *M31Tesla* does **not** imply any integration with or endorsement by Tesla Inc. It is strictly an experimental model identifier in the M31 AI research lineage.

## Architecture

- **Parameter Count**: 228,953,984 parameters
- **Layers**: 20 layers
- **Hidden Size**: 896
- **Attention Heads**: 14 query heads, 7 KV heads (GQA)
- **Vocabulary Size**: 32,768
- **Context Length**: 512 default context (up to 2,048 position embeddings)
- **Normalization & Encodings**: RMSNorm, RoPE theta 10,000, tied embeddings

## Runtime & Checkpoints

Checkpoints and runtime files are hosted at [eshanized/M31Tesla](https://huggingface.co/eshanized/M31Tesla) on Hugging Face. The project includes \`README_RUNTIME.md\`, \`m31_runtime.py\`, and \`generation_m31.py\` for direct checkpoint loading and text generation.`,
    updatedAt: '2026-09-08',
  },
  {
    slug: 'm31entropy',
    title: 'M31Entropy',
    type: 'research',
    artifactType: 'AI Model',
    productStatus: 'preview',
    releaseStatus: 'pre-release',
    developmentStage: 'research',
    status: 'Experimental',
    category: 'AI / Research',
    shortDescription:
      'M31 architecture exploration and pretraining checkpoints (314M parameters).',
    description:
      'M31Entropy — experimental architecture exploration and pretraining checkpoints for large-vocabulary M31 variants (314M parameters).',
    version: '220M-Experiment',
    releaseDate: '2026-09-08',
    featured: false,
    technology: ['Transformer', 'PyTorch', 'Safetensors', 'Causal LM', 'M31', 'RoPE'],
    license: 'MIT',
    parameterCount: '314M',
    modelArchitecture:
      '314,281,856 parameters; vocab 128,000; hidden 896; 20 layers; 14 attention heads; 7 KV heads; intermediate 2,816; tied embeddings; max position embeddings 2048.',
    intendedUse: [
      'Large-vocabulary tokenizer impact research',
      'Compression and representation analysis in code',
      'Pretraining dynamics exploration',
    ],
    checkpointsNote:
      'Early pretraining checkpoint (step-00000500). Experimental research artifact.',
    ecosystem: 'm31',
    ecosystemRole: 'Architecture scaling and vocabulary exploration',
    owner: 'eshanized',
    author: 'eshanized',
    organization: 'Tonmoy Infrastructure & Vision',
    affiliation: 'TIV',
    sources: [
      {
        platform: 'huggingface',
        type: 'model',
        url: 'https://huggingface.co/eshanized/M31Entropy',
        label: 'Hugging Face Model Card & Checkpoints',
        author: 'eshanized',
        organization: 'Tonmoy Infrastructure & Vision',
        affiliation: 'TIV',
        verified: true,
        description: 'Model weights, config, and pretrain checkpoint files.',
      },
    ],
    problem:
      'Evaluating whether expanding tokenizer vocabulary to 128,000 tokens improves code representation density and reduces context fragmentation in multilingual codebases.',
    approach:
      'M31Entropy investigates large vocabulary sizes (128k) in a 314M parameter causal transformer architecture, examining pretraining convergence dynamics.',
    architecture:
      '314,281,856 parameters; vocab 128,000; hidden 896; 20 layers; 14 attention heads; 7 KV heads; intermediate 2,816; RMSNorm eps 1e-6; RoPE theta 10,000; tied word embeddings.',
    features: [
      'Expanded 128,000 token vocabulary for code density',
      '314M parameter causal language model architecture',
      '14 query / 7 KV head grouped-query attention',
      'Step-00000500 pretrain safetensors checkpoint',
    ],
    roadmap: [
      { item: 'Expanded tokenizer construction (128,000 vocab)', done: true },
      { item: 'Model configuration and parameter budgeting', done: true },
      { item: 'Initial pretraining run to step-00000500', done: true },
      { item: 'Hugging Face checkpoint publication', done: true },
      { item: 'Vocabulary compression ratio evaluation against standard BPE', done: false },
    ],
    relatedProjects: ['m31genesis', 'm31tesla', 'm31a'],
    content: `## Overview

M31Entropy is an experimental architecture exploration investigating large-vocabulary (128,000 tokens) tokenizer dynamics in compact causal transformers.

## Fact Verification: Project Name & Scope

**Note**: In accordance with TIV's strict transparency rules, the project name *M31Entropy* does **not** imply an entropy-based or thermodynamics-based architecture. It is an experimental model identifier exploring representation density and pretraining dynamics.

## Architecture

- **Parameter Count**: 314,281,856 parameters
- **Vocabulary Size**: 128,000 tokens
- **Hidden Size**: 896
- **Layers**: 20 layers
- **Attention Heads**: 14 query heads, 7 KV heads
- **Intermediate Size**: 2,816
- **Max Position Embeddings**: 2,048 (1,024 training sequence length)
- **Tied Embeddings**: Enabled

## Public Source

The model card and checkpoint are hosted on Hugging Face at [eshanized/M31Entropy](https://huggingface.co/eshanized/M31Entropy).`,
    updatedAt: '2026-09-08',
  },
  {
    slug: 'kyro',
    title: 'Kyro',
    seoTitle: 'Kyro — Desktop AI Assistant & Linux Downloads | TIV',
    seoDescription:
      'Kyro is a local-first desktop AI assistant with a public v0.1.0 Linux release. Download AppImage, Debian/Ubuntu, Fedora/RHEL, or Arch packages.',
    type: 'software',
    productStatus: 'preview',
    releaseStatus: 'released',
    developmentStage: 'active',
    status: 'Development',
    category: 'Software',
    shortDescription:
      'A desktop AI assistant for everyday computer tasks, visual understanding, browser workflows, and software development.',
    description:
      'Kyro is a local-first desktop AI assistant with a public v0.1.0 Linux release and ongoing development at Tonmoy Infrastructure & Vision (TIV). The Tauri desktop application brings visual screen analysis, governed computer interaction, browser automation, reversible file organization, document analysis, reusable routines, project inspection, build diagnostics, UI audits, and checkpoint-based recovery into one workspace. Some workflows depend on configured model providers, permissions, and supported runtime capabilities.',
    version: '0.1.0',
    releaseDate: '2026-10-21',
    featured: true,
    technology: [
      'Tauri 2',
      'React',
      'TypeScript',
      'Rust',
      'Multimodal AI',
      'Browser Automation',
    ],
    repository: 'https://github.com/eshanized/Kyro',
    documentation: 'https://kyro.tonmoyinfrastructure.org/docs/',
    website: 'https://kyro.tonmoyinfrastructure.org/',
    license: 'MIT',
    artifactType: 'Software Platform',
    owner: 'eshanized',
    organization: 'Tonmoy Infrastructure & Vision',
    affiliation: 'TIV',
    sources: [
      {
        platform: 'github',
        type: 'repository',
        url: 'https://github.com/eshanized/Kyro',
        label: 'GitHub Repository',
        affiliation: 'TIV',
        organization: 'Tonmoy Infrastructure & Vision',
        verified: true,
        description: 'Official source repository for Kyro; v0.1.0 is publicly released for Linux while product development continues.',
      },
      {
        platform: 'website',
        type: 'website',
        url: 'https://kyro.tonmoyinfrastructure.org/',
        label: 'Official Kyro Website',
        affiliation: 'TIV',
        organization: 'Tonmoy Infrastructure & Vision',
        verified: true,
        description: 'Official Kyro product website and documentation.',
      },
      {
        platform: 'github',
        type: 'repository',
        url: 'https://github.com/eshanized/Kyro/releases/tag/v0.1.0',
        label: 'Download Kyro v0.1.0',
        affiliation: 'TIV',
        organization: 'Tonmoy Infrastructure & Vision',
        verified: true,
        description: 'Published Linux installers and checksum manifest for v0.1.0.',
      },
    ],
    problem:
      'Everyday users and developers often have to switch between separate tools for understanding what is on screen, handling documents and files, automating browser tasks, diagnosing application failures, and testing interfaces. Desktop automation can also be difficult to trust when actions are not grounded in observed state or when changes cannot be reviewed and reversed.',
    approach:
      'Kyro is being built around an observe–reason–act–verify workflow. It combines visual and semantic observations with governed tool execution, explicit approvals for risky operations, evidence-linked results, and reversible workflows where practical. Its Everyday and Dev experiences share the same execution and governance foundation.',
    architecture:
      'The desktop application uses Tauri 2 with a React and TypeScript interface and a Rust backend. The current codebase includes browser automation and UI-audit paths, a model-capability lookup and visual-analysis layer, file-organization transactions, document-analysis commands, developer checkpoints, and build-failure diagnostics. Integrations and provider/model capabilities depend on the installed environment and configured credentials.',
    features: [
      'Explain screenshots and desktop screens with visual context',
      'Grounded UI observations and Set-of-Marks screen capture',
      'Browser sessions, DOM snapshots, screenshots, and interaction tools',
      'File-organization previews with transaction manifests and undo support',
      'Local document analysis and document comparison',
      'Developer workbench for project inspection, build diagnostics, and checkpoints',
      'Route and responsive UI auditing with screenshot evidence',
      'Reusable task routines and a shared governed agent workflow',
    ],
    roadmap: [
      { item: 'Everyday and Dev experience modes', done: true },
      { item: 'Visual analysis and model-capability handling', done: true },
      { item: 'Browser observation and UI-audit evidence paths', done: true },
      { item: 'File organization and undo workflow', done: true },
      { item: 'Document analysis and comparison', done: true },
      { item: 'Developer checkpoints and build diagnostics', done: true },
      { item: 'Complete end-to-end verification across supported platforms and providers', done: false },
      { item: 'Release qualification and stable release', done: false },
    ],
    relatedProjects: ['m31a', 'octate', 'runstead'],
    keywords: [
      'Kyro',
      'desktop AI assistant',
      'AI desktop agent',
      'visual computer use',
      'AI screen understanding',
      'browser automation desktop app',
      'document assistant',
      'file organization assistant',
      'developer diagnostics',
      'Tauri desktop AI application',
      'Kyro Linux download',
      'open-source desktop AI agent',
      'Linux desktop AI assistant',
    ],
    updatedAt: '2026-10-22',
    content: `## Overview

Kyro is an early-release AI-powered desktop operator under active development at Tonmoy Infrastructure & Vision (TIV). It aims to help everyday users understand and work with their computer while giving developers a governed workspace for software engineering tasks.

## Everyday workflows

- **Explain Screen** — capture a screen and request visual analysis to help understand controls, errors, and displayed information.
- **Organize Files** — preview proposed file moves, execute an organization plan, keep transaction information, and undo operations where content checks permit.
- **Document Assistant** — analyze local documents for summaries, key facts, action items, dates, and compare two documents.
- **Automations & Routines** — work toward reusable task routines through the shared agent workflow.

## Developer workflows

- **Project workbench** — access project-oriented tooling, diagnostics, checkpoints, and audit workflows.
- **Browser and visual QA** — inspect browser pages and DOM snapshots, capture screenshots, and run route and viewport checks.
- **Build diagnostics and recovery** — structure build-failure diagnostics and create checkpoints that support guarded rollback.

## Architecture

Kyro uses a Tauri 2 desktop shell, React and TypeScript for the interface, and Rust for backend and execution paths. Visual analysis and browser capabilities depend on the selected model, configured provider credentials, and supported browser/runtime setup.

## Release status

Kyro v0.1.0 is publicly released for Linux, with Debian/Ubuntu \`.deb\`, Fedora/RHEL \`.rpm\`, Arch \`.pkg.tar.zst\`, AppImage, and portable \`.tar.gz\` downloads. This is an early release, not a claim of stable production qualification. Complete end-to-end verification across supported environments remains an active milestone. Provider/model capabilities depend on the selected runtime and configuration.

## Project links

- [Official Kyro website](https://kyro.tonmoyinfrastructure.org/)
- [Download v0.1.0](https://github.com/eshanized/Kyro/releases/tag/v0.1.0)
- [Source repository](https://github.com/eshanized/Kyro)
- [Tonmoy Infrastructure & Vision](https://tonmoyinfrastructure.org/)`,
  },
  {
    slug: 'runstead',
    title: 'Runstead',
    seoTitle: 'Runstead — Hosting Business Management and Billing SaaS',
    seoDescription:
      'Pre-release hosting-business management platform under development, bringing together client CRM, recurring billing, service lifecycle workflows, domain and DNS operations, ticketing, and white-label storefronts.',
    type: 'software',
    productStatus: 'preview',
    releaseStatus: 'pre-release',
    developmentStage: 'active',
    status: 'Development',
    category: 'Software',
    shortDescription:
      'Modern operating system and automation platform for web hosting businesses.',
    description:
      'Runstead is a modern operating system for hosting businesses developed by Tonmoy Infrastructure & Vision. It unifies customer management, product catalogs, recurring billing, service lifecycle provisioning, domain and DNS operations, multi-channel ticketing, and white-label storefronts into a single cohesive platform.',
    version: '0.2.0-dev',
    releaseDate: '2026-10-15',
    featured: false,
    technology: [
      'Next.js 15',
      'TypeScript',
      'PostgreSQL',
      'Prisma ORM',
      'Row-Level Security (RLS)',
      'Tailwind CSS',
      'Radix UI',
      'Recharts',
    ],
    repository: 'https://github.com/eshanized/Runstead',
    documentation: '/projects/runstead',
    website: 'https://runstead.tonmoyinfrastructure.org/',
    license: 'Commercial Venture / Proprietary',
    artifactType: 'Software Platform',
    owner: 'eshanized',
    organization: 'Tonmoy Infrastructure & Vision',
    affiliation: 'TIV',
    sources: [
      {
        platform: 'github',
        type: 'repository',
        url: 'https://github.com/eshanized/Runstead',
        label: 'GitHub Repository',
        affiliation: 'TIV',
        organization: 'Tonmoy Infrastructure & Vision',
        verified: true,
      },
      {
        platform: 'documentation',
        type: 'documentation',
        url: '/projects/runstead',
        label: 'Venture Profile & Investment Case',
        affiliation: 'TIV',
        organization: 'Tonmoy Infrastructure & Vision',
        verified: true,
      },
    ],
    problem:
      'The global web hosting operations market is dominated by legacy, monolithic software architectures—principally WHMCS—and fragmented third-party utilities. Operating an independent hosting company today requires stitching together disconnected portals: separate tools for billing and invoices, unintegrated ticketing panels, manual registrar dashboards for domain registration, disjointed DNS consoles, and antiquated customer self-service portals with poor mobile experiences. This fragmentation leads to high integration maintenance, manual reconciliation overhead, security vulnerabilities, and elevated operational costs for emerging hosting entrepreneurs.',
    approach:
      'Runstead replaces legacy tool fragmentation with a unified, developer-friendly architecture following three phased horizons: Horizon A delivers the commercial operating platform (CRM, catalog, recurring billing, tickets, storefronts); Horizon B establishes resilient automation and connectors (cPanel/WHM, Plesk, DirectAdmin, registrar EPP APIs, Stripe, automated ACME SSL); and Horizon C charts a path toward owned infrastructure (hypervisors, native control panels, Anycast DNS). Development proceeds with strict multi-tenant Row-Level Security, transaction-scoped database contexts, and verifiable CI testing.',
    architecture:
      'Runstead is built on Next.js App Router with strict TypeScript, backed by PostgreSQL with database-enforced Row-Level Security (RLS) across all tenant-owned tables. The platform implements least-privilege role separation (runstead_admin vs runstead_app) and transaction-local tenant context binding (withTenantContext), preventing tenant cross-talk. An asynchronous job queue with exponential backoff handles upstream provisioning and registrar actions. In addition to the production persistence schema, the repository features an offline browser demonstration layer with deterministic seed fixtures and 77 automated tests.',
    features: [
      'Multi-tenant client CRM with organization hierarchies and referential integrity',
      'Multi-cycle product catalog (monthly, annual, biennial) with resource limits and setup fees',
      'Order lifecycle state machine (draft → pending_payment → processing → active)',
      'Automated invoicing engine with multi-currency, tax calculation, and payment reconciliation',
      'Hosting service fleet management with suspend, restore, upgrade, and cancellation controls',
      'RFC-compliant DNS zone editor supporting A, AAAA, CNAME, MX, TXT, and CAA records',
      'Multi-channel support ticketing queue with customer threads and private internal staff notes',
      'Real-time WYSIWYG white-label storefront customizer with live desktop/tablet/mobile preview',
      'Self-service customer portal for account management, service monitoring, and invoice payments',
      'Executive analytics telemetry tracking MRR, ARPU, customer retention, and service distributions',
      'Multi-tenant platform operator console for fleet oversight and quota enforcement',
      'PostgreSQL Row-Level Security (RLS) guaranteeing strict tenant data isolation at the database level',
    ],
    roadmap: [
      { item: 'Phase 0: Project Charter & Verification Baseline', done: true },
      { item: 'Phase 1: Dependency Hardening & Security Audit Baseline', done: true },
      { item: 'Phase 2: Relational PostgreSQL Schema & Multi-Tenant RLS Enforcement', done: true },
      { item: 'Milestone 4: Upstream cPanel/WHM XML-API & Plesk Provisioning Connectors', done: false },
      { item: 'Milestone 5: Domain Registrar API Integrations (EPP) & Anycast DNS Sync', done: false },
      { item: 'Milestone 6: Production Stripe Webhook Settlement & Hardened v1.0 Release', done: false },
    ],
    relatedProjects: ['openmail', 'mercura', 'm31a', 'octate'],
    keywords: [
      'Runstead',
      'hosting business software',
      'WHMCS alternative',
      'hosting billing system',
      'web hosting automation',
      'cPanel integration',
      'multi-tenant SaaS',
      'TIV venture',
      'hosting operating system',
    ],
    updatedAt: '2026-10-15',
    content: `## Executive Overview

Runstead is a modern, unified operating system engineered specifically for hosting businesses. Developed under Tonmoy Infrastructure & Vision (TIV), Runstead addresses the operational friction created by fragmented, legacy software ecosystems (such as WHMCS, legacy billing portals, and manual registrar consoles) by providing a single, cohesive, developer-friendly control plane.

> [!IMPORTANT]
> **Investor & Commercial Demonstration Notice**: Runstead is currently an active venture in development. The repository provides an interactive browser-first demonstration of the platform alongside a production-grade relational PostgreSQL schema with Row-Level Security (RLS) completed in Phase 2. Live payment processing via credit card networks, physical hypervisor provisioning, and public DNS root updates are simulated within the demo environment.

---

## The Three Architectural Horizons

Runstead enforces clear architectural boundaries across three evolutionary stages:

### Horizon A: Hosting-Business Operating Platform (Verified Demonstration & Baseline)
The commercial and business management foundation:
- Multi-tenant client CRM and organization accounts.
- Flexible multi-cycle catalog (Shared, VPS, Dedicated, Domains, Add-ons) with resource quotas.
- Order processing state machine (\`awaiting_payment\` → \`paid\` → \`provisioning\` → \`active\`).
- Automated invoice calculation, tax rates, line items, and payment reconciliation.
- Multi-channel support ticket queues with customer conversation threads and internal notes.
- Real-time WYSIWYG storefront visual builder with live multi-viewport preview.
- Client self-service portal for services, domains, invoices, and helpdesk.

### Horizon B: Automation & Integration Layer (In Progress / Milestones 4–5)
The connector and orchestration layer linking business events to external providers:
- Asynchronous resilient job queue with exponential backoff and dead-letter queues.
- Standardized Driver Adapters for upstream control panels:
  - cPanel / WHM (XML-API / UAPI)
  - Plesk (REST API)
  - DirectAdmin (CMD_API)
- Registrar API Connectors for automated domain registrations, transfers, and nameservers (ResellerClub, Enom, Namecheap).
- Payment Gateway Integration: Stripe Checkout, Payment Intents, and Webhook settlement.
- DNS Edge Synchronization: Cloudflare and PowerDNS API connectors.
- Automated Let's Encrypt / ACME SSL certificate issuance and renewal.

### Horizon C: Owned Infrastructure Platform (Long-Term Roadmap)
Future sovereign infrastructure capabilities developed by Tonmoy Infrastructure:
- Native bare-metal hypervisor node orchestration (KVM/QEMU, microVMs).
- Native containerized shared hosting control panel (eliminating third-party panel licensing).
- Authoritative globally distributed Anycast DNS network.
- Deduplicated block and object backup storage engine with point-in-time recovery.

---

## Technical Stack & Architecture

- **Frontend & App Framework**: Next.js 15+ (App Router with React Server Components & Client Boundaries)
- **Programming Language**: Strict TypeScript throughout
- **Database & Persistence**: PostgreSQL 16+ with Prisma ORM 6.12.0
- **Multi-Tenant Security**: PostgreSQL Row-Level Security (\`FORCE ROW LEVEL SECURITY\`) enforced across all 18 tenant-owned tables with transaction-scoped tenant context (\`withTenantContext\`)
- **Styling & Design Tokens**: Tailwind CSS with dark surfaces and TIV coral-red accent (\`#f43f5e\` / \`#E5484D\`)
- **UI Components**: Accessible primitives built on Radix UI
- **Visualizations**: Recharts for MRR trends, client growth, sales distribution, and resource metrics
- **Offline Demonstration Engine**: Typed Demo State Provider with localStorage persistence and deterministic seed fixtures, verified with 77 automated tests.

---

## Indicative Commercial Model

Runstead's commercial pricing is structured around transparent, predictable SaaS tiers for hosting entrepreneurs:

| Tier | Listed Monthly Price | Target Reseller Profile | Active Service Capacity |
| :--- | :---: | :--- | :--- |
| **Sandbox** | **Free ($0)** | Developers, evaluators, and pre-launch testing | Up to 3 active clients |
| **Launch** | **US$49** | Freelance web designers & boutique agencies | Up to 50 active clients |
| **Growth** | **US$149** | Independent hosting entrepreneurs & regional hosts | Up to 250 active clients |
| **Scale** | **US$399** | Growing hosting brands requiring multi-server fleet automation | Up to 1,000 active clients |
| **Enterprise** | **Custom** | Dedicated infrastructure, custom SLAs, and high-volume billing | Unlimited clients |

> [!NOTE]
> **Strict Billing Separation**: The tiers above represent Runstead's indicative subscription fees charged to hosting businesses. Revenue generated by hosting businesses from selling hosting, domains, or email to their downstream end-users belongs entirely to those businesses and is never counted as Runstead or TIV revenue.

---

## Production Readiness Blockers & Next Milestones

To transition from the current verified demonstration to production availability, the following deliverables are prioritized:
1. **Upstream cPanel/WHM Client**: Real REST API integration for automated account creation, suspension, and deletion.
2. **Persistent Background Task Queue**: BullMQ / Redis job queue for resilient provisioning retries and failure isolation.
3. **Stripe Webhook Settlement**: Live webhook signature verification and automatic invoice state transitions.
4. **Registrar EPP Connectors**: Real domain registration and DNS record synchronization via provider APIs.
5. **Session Authentication & MFA**: Production session token issuance, email verification, and TOTP multi-factor authentication.`,
  },
];

// Validate at build/runtime with Zod
const projects: Project[] = validateProjects(rawProjects);

export function getProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

// ─── Research Areas ─────────────────────────────────────────

const researchAreas: ResearchArea[] = [
  {
    slug: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    description:
      'Research into autonomous development systems, codebase understanding, and human-AI collaboration in software engineering.',
    icon: 'brain',
  },
  {
    slug: 'networking',
    title: 'Networking',
    description:
      'Research on routing protocols, network architecture, edge infrastructure, and the evolution of internet infrastructure.',
    icon: 'network',
  },
  {
    slug: 'fiber-optics',
    title: 'Fiber Optics',
    description:
      'Optical networking, fiber transmission systems, and experimental optical communication technologies.',
    icon: 'fiber',
  },
  {
    slug: 'distributed-systems',
    title: 'Distributed Systems',
    description:
      'Research on consensus, replication, fault tolerance, and the architecture of dependable distributed systems.',
    icon: 'server',
  },
  {
    slug: 'systems-engineering',
    title: 'Systems Engineering',
    description:
      'Low-level systems research: operating systems, storage engines, and the foundations of reliable infrastructure.',
    icon: 'cpu',
  },
  {
    slug: 'developer-infrastructure',
    title: 'Developer Infrastructure',
    description:
      'Tools, platforms, and systems that improve how developers build, deploy, and operate software.',
    icon: 'code',
  },
];

export function getResearchAreas(): ResearchArea[] {
  return researchAreas;
}

export function getResearchArea(slug: string): ResearchArea | undefined {
  return researchAreas.find((r) => r.slug === slug);
}

// Publications are managed as MDX in content/publications/*.mdx and compiled via lib/publications
export {
  getAllPublications as getPublications,
  getPublicationBySlug as getPublication,
} from '@/lib/publications/pipeline';

// ─── Infrastructure Services ────────────────────────────────

const infrastructureServices: InfrastructureService[] = [
  {
    slug: 'domains',
    title: 'Domains',
    category: 'Domains',
    status: 'Planning',
    description:
      'Domain registration and management services. Planning phase — no commercial services are currently offered.',
    classification: 'Commercial',
    content: `## Overview

TIV is exploring domain registration and DNS management services. This is currently in the planning phase.

## Status

**Planning** — No commercial services are currently deployed. Information will be published when services launch.

## Vision

A domain management system that is:

- Transparent in pricing and operations
- Built on open standards
- Integrated with TIV hosting infrastructure
- Designed for developer workflows`,
  },
  {
    slug: 'hosting',
    title: 'Hosting',
    category: 'Hosting',
    status: 'Planning',
    description:
      'Web hosting and application hosting infrastructure. Planning phase — internal infrastructure operates TIV services.',
    classification: 'Commercial',
    content: `## Overview

TIV is building hosting infrastructure designed for developers and organizations that value control and transparency.

## Status

**Planning** — Infrastructure is being designed. Internal infrastructure operates TIV services; no external commercial hosting is available yet.

## Vision

Hosting that provides:

- Full control over your environment
- Transparent resource allocation
- No vendor lock-in
- Integration with TIV infrastructure ecosystem`,
  },
  {
    slug: 'compute',
    title: 'Compute',
    category: 'Compute',
    status: 'Research',
    description:
      'Compute infrastructure research — exploring efficient, self-managed compute systems.',
    classification: 'Research',
    content: `## Overview

TIV is researching compute infrastructure — from efficient resource utilization to self-managed compute systems.

## Status

**Research** — This is an active research area. No commercial compute services exist.

## Research Directions

- Efficient resource scheduling
- Self-managing compute systems
- Edge compute architecture`,
  },
  {
    slug: 'networking',
    title: 'Networking',
    category: 'Networking',
    status: 'Research',
    description:
      'Networking infrastructure research — routing, switching, and network architecture.',
    classification: 'Research',
    content: `## Overview

TIV is researching networking infrastructure, including routing protocols, network architecture, and edge infrastructure.

## Status

**Research** — Active research area. No commercial networking services exist.

## Research Directions

- Routing protocol optimization
- Network management systems
- Edge infrastructure architecture
- Network equipment research`,
  },
  {
    slug: 'optical',
    title: 'Optical Systems',
    category: 'Optical Systems',
    status: 'Research',
    description:
      'Fiber optics and optical networking research — transmission systems and experimental optical communications.',
    classification: 'Research',
    content: `## Overview

TIV is researching optical networking and fiber optics — from transmission systems to experimental optical communication technologies.

## Status

**Research** — Early-stage research. No optical systems are deployed commercially.

## Research Directions

- Optical transmission systems
- Fiber optic network architecture
- Experimental optical communications
- Optical network management`,
  },
  {
    slug: 'optical-systems',
    title: 'Optical Systems',
    category: 'Optical Systems',
    status: 'Research',
    description:
      'Fiber optics and optical networking research — transmission systems and experimental optical communications.',
    classification: 'Research',
    content: `## Overview

TIV is researching optical networking and fiber optics — from transmission systems to experimental optical communication technologies.

## Status

**Research** — Early-stage research. No optical systems are deployed commercially.

## Research Directions

- Optical transmission systems
- Fiber optic network architecture
- Experimental optical communications
- Optical network management`,
  },
  {
    slug: 'data-centers',
    title: 'Data Centers',
    category: 'Data Centers',
    status: 'Production',
    description:
      'TIV operates a sovereign data center facility in Jayapura, Papua, Indonesia — engineered for internal platform workloads, high-density compute, and resilient sovereign systems.',
    classification: 'Internal',
    location: 'Jayapura, Papua, Indonesia',
    gallery: [
      {
        id: 'exterior',
        title: 'The data center',
        category: 'Exterior view',
        src: '/images/infrastructure/datacenter/exterior.webp',
        alt: 'Exterior view of the TIV data center in Jayapura, Papua, Indonesia.',
        caption: 'Exterior visualization of the TIV data center in Jayapura, Papua, Indonesia.',
        description:
          'Shows the facility external environment, perimeter envelope, and physical infrastructure situated in Jayapura, Papua, Indonesia. Demonstrates regional deployment context, structural perimeter boundaries, and dedicated sovereign digital hosting.',
        technicalDetails: [
          'Location: Jayapura, Papua, Indonesia (Pusat Bisnis Jayapura)',
          'Perimeter: Physical security boundaries and controlled building ingress',
          'Deployment: Regional sovereign digital facility for internal TIV workloads',
        ],
        disclaimer:
          'Visual representation is an AI-generated render and does not constitute a documentary photograph of the physical facility.',
      },
      {
        id: 'server-room',
        title: 'Computing infrastructure',
        category: 'Server room',
        src: '/images/infrastructure/datacenter/server-room.webp',
        alt: 'Server room with equipment racks, network cabling, and status lights.',
        caption: 'View of server racks, network cabling, and supporting data center equipment.',
        description:
          'Shows server racks, network equipment, structured cabling, and equipment-room organization without asserting that every visible piece of equipment exists at the physical site. Highlights high-density compute nodes hosting TIV platforms including OpenMail, Mercura, M31A, and Octate.',
        technicalDetails: [
          'Workloads: OpenMail email daemon, Mercura code intelligence, M31A autonomous runtime, Octate review engine',
          'White Space: Modular equipment racks, hot/cold aisle thermal discipline, and overhead cable trays',
          'Storage & Compute: Isolated execution nodes with Linux cgroups v2 resource ceilings and ZFS pools',
        ],
        disclaimer:
          'Visual representation of data center white space. Does not imply every specific item of equipment pictured is installed in the physical room.',
      },
      {
        id: 'firewall-monitoring',
        title: 'Network security and monitoring',
        category: 'Firewall monitoring',
        src: '/images/infrastructure/datacenter/firewall-monitoring.webp',
        alt: 'Firewall monitoring dashboard with network traffic and security panels.',
        caption: 'Firewall monitoring interface showing sample security and network telemetry.',
        description:
          'Depicts firewall monitoring, traffic visibility, threat detection, rule management, and network security operations. Visualizes perimeter packet filtering, interface telemetry, and multi-tier defense topologies.',
        technicalDetails: [
          'Perimeter Defense: Stateful packet inspection, ingress/egress filtering, and DDoS mitigation topologies',
          'Route Security: BGP routing controls, authoritative DNS protection, and localized syslog observability',
          'Standards Alignment: Security operations aligned with ISO 27001 physical and SOC 2 security principles',
        ],
        disclaimer:
          'The generated dashboard contains sample values, including traffic statistics, uptime, blocked-threat counts, and rule totals. These values are simulated and are not live operational measurements.',
      },
      {
        id: 'technician-maintenance',
        title: 'Infrastructure maintenance',
        category: 'Technician maintenance',
        src: '/images/infrastructure/datacenter/technician-maintenance.webp',
        alt: 'Technician inspecting network cabling in a server rack.',
        caption: 'Maintenance scene showing a technician working on server-rack cabling.',
        description:
          'Depicts equipment inspection, structured cable management, routine maintenance procedures, and controlled physical access. Regular verification ensures optical transceiver health, cable bend radius integrity, and airflow hygiene.',
        technicalDetails: [
          'Inspection Regimes: Scheduled patch cord integrity audits, optical transceiver verification, and port labeling',
          'Thermal Hygiene: Airflow filter maintenance, fan assembly inspection, and cold-aisle intake checking',
          'Access Governance: Dual-custody physical access logging and strict hardware change verification',
        ],
        disclaimer:
          'Maintenance scene visualization. The technician depicted is a generated character and does not represent an actual TIV employee.',
      },
    ],
    areas: [
      {
        id: 'compute',
        title: 'Computing and server infrastructure',
        iconName: 'server',
        purpose:
          'White-space compute nodes hosting TIV core software platforms (OpenMail, Mercura, M31A, Octate), authoritative DNS daemons, and internal build services.',
        principles: [
          'Modular equipment rack deployment designed for scalable compute and storage expansion',
          'Linux cgroups v2 resource ceilings (cpu.max, memory.max) and POSIX rlimits process confinement',
          'ZFS and NVMe storage pools for durable repository mirrors and cryptographic state records',
          'Out-of-band serial and IPMI hardware monitoring interfaces',
        ],
        operationalConsiderations: [
          'Proactive processor temperature profiling and ECC memory error logging',
          'Cold-restart runbooks and reproducible system image configurations',
          'Thermal intake monitoring to prevent component hotspots',
        ],
        confirmedScope:
          'Host environment for TIV software platforms and sovereign services in Jayapura, Papua, Indonesia.',
      },
      {
        id: 'networking',
        title: 'Network connectivity and cabling',
        iconName: 'network',
        purpose:
          'High-throughput data transport linking computing clusters, local aggregation switches, and regional carrier interconnects.',
        principles: [
          'Structured Cat6A and multimode/singlemode fiber patch cabling with strict bend-radius management',
          'Top-of-Rack (ToR) switching architecture minimizing intra-rack cross-talk and latency',
          'Color-coded patch discipline separating management, storage, and public transit paths',
          'Carrier fiber demarcation into regional Indonesian telecommunications backbones',
        ],
        operationalConsiderations: [
          'Scheduled optical budget and attenuation inspections',
          'Automated link flapping alerts and interface error tracking',
          'Dual upstream routing paths to prevent single points of network failure',
        ],
        confirmedScope:
          'Carrier fiber demarcation supporting TIV authoritative DNS and mail routing.',
      },
      {
        id: 'security',
        title: 'Security and monitoring',
        iconName: 'shield',
        purpose:
          'Multi-tier perimeter defense, traffic anomaly detection, access control, and continuous security observability.',
        principles: [
          'Stateful Layer 3/4 firewall policy enforcement with strict default-deny ingress and egress gating',
          'Cryptographic authentication (SSH hardware keys, TLS 1.3) required for all administrative sessions',
          'BGP route validation and DNS query rate limiting',
          'Alignment with ISO 27001 physical security controls and SOC 2 security principles',
        ],
        operationalConsiderations: [
          'Centralized syslog retention and immutable audit trail snapshots',
          'Vulnerability disclosure policy and rapid kernel/firmware patch verification',
          'Sample dashboard values reflect architectural concepts rather than live public telemetry',
        ],
        confirmedScope:
          'Perimeter security and host monitoring dedicated to sovereign TIV platforms.',
      },
      {
        id: 'power',
        title: 'Power protection and distribution',
        iconName: 'zap',
        purpose:
          'Conditioned, continuous electrical supply to protect computing hardware against utility fluctuations and outages.',
        principles: [
          'Dual independent distribution paths (A/B feeds) to every equipment rack',
          'Online double-conversion UPS battery systems to absorb utility transients without transfer delay',
          'On-site auxiliary backup power generation with automatic transfer switching (ATS)',
          'Granular in-rack power distribution units (ePDUs) with real-time per-outlet metering',
        ],
        operationalConsiderations: [
          'Regular battery impedance and discharge calibration cycles under maintenance runbooks',
          'Auxiliary generator testing under controlled operational procedures',
          'Phase load balancing across three-phase distribution panels',
        ],
        confirmedScope:
          'Dual independent power paths and auxiliary power generation supporting continuous facility operations.',
      },
      {
        id: 'cooling',
        title: 'Cooling and environmental management',
        iconName: 'thermometer',
        purpose:
          'Thermal dissipation and environmental regulation engineered for Jayapura equatorial coastal climate.',
        principles: [
          'Hot/cold aisle containment to eliminate hot air recirculation into server intakes',
          'Precision computer room cooling with variable-speed fan assemblies',
          'Continuous temperature and relative humidity telemetry across all rack faces',
          'High-efficiency particulate filtration to resist ambient humidity and salt-mist ingress',
        ],
        operationalConsiderations: [
          'Maintaining server inlet temperatures within ASHRAE recommended ranges (18°C–27°C)',
          'Dew point and humidity tracking to prevent electrostatic discharge or moisture condensation',
          'Sensors positioned at rack bottom, middle, and top to identify stratification',
        ],
        confirmedScope:
          'Thermal dissipation engineered for local equatorial climatic conditions.',
      },
      {
        id: 'maintenance',
        title: 'Physical security and maintenance',
        iconName: 'wrench',
        purpose:
          'Safeguarding physical computing hardware, preventing unauthorized access, and preserving equipment longevity.',
        principles: [
          'Multi-factor physical authentication at facility perimeter and server room access points',
          'Continuous electronic access logging and visitor escort requirements',
          'Structured cleanroom discipline and dust containment protocols during hardware servicing',
          'Cryptographic custody and tamper-evident tracking for hardware transit and component replacements',
        ],
        operationalConsiderations: [
          'Scheduled preventive maintenance windows for fan cleaning, optical transceiver checks, and cabling hygiene',
          'Mandatory documentation of all physical rack openings and hardware changes',
          'Personnel depictions represent maintenance concepts and do not depict actual TIV staff members',
        ],
        confirmedScope:
          'Controlled physical access and sovereign facility maintenance in Jayapura, Papua, Indonesia.',
      },
    ],
    content: `## Overview

Tonmoy Infrastructure and Vision operates an established sovereign data center facility associated with Jayapura, Papua, Indonesia. The facility serves as the foundational physical host for TIV's core systems, powering our stable software platforms (OpenMail, Mercura, M31A, and Octate), authoritative DNS resolution, and internal services.

## Operational Status & Deployment Scope

- **Status**: Production Facility
- **Location**: Jayapura, Papua, Indonesia
- **Classification**: Internal Sovereign Infrastructure
- **Workload Scope**: Host environment for TIV software platforms, cryptographic telemetry, repository mirrors, and internal engineering daemons.
- **Commercial Colocation Notice**: TIV does not operate a public retail self-service colocation storefront or public cloud portal. Physical hosting is dedicated to TIV operations; private enterprise arrangements and sovereign infrastructure inquiries are evaluated by direct inquiry.

## Facility Engineering & Resilience

The Jayapura facility is architected around modular infrastructure standards designed for regional network resilience and continuous availability:

### Power & Backup Topologies
- Dual power distribution paths (A/B feeds) with online double-conversion UPS systems to guarantee power conditioning during utility fluctuations.
- On-site auxiliary generator backup with automated transfer switching (ATS) to provide sustained operational runtime.
- Energy-efficient thermal dissipation with hot/cold aisle containment suited to equatorial climate profiles.

### Rack Density & Modular Deployment
- Modular equipment rack topology with scalable expansion capacity.
- Dedicated compute nodes, high-density storage pools, and network ingress equipment.
- In-rack power distribution units (ePDUs) with granular per-outlet power metering and environmental telemetry.

### Connectivity & Network Interconnect
- Carrier fiber demarcation into regional Indonesian telecommunications backbones.
- BGP routing and redundant upstream connectivity supporting TIV mail routing and DNS authority.
- Meet-me demarcation supporting private cross-connects and dedicated enterprise interconnects.

## Local Sovereign Facility vs. Global Blueprints

TIV clearly distinguishes its physical operational reality from broader architectural blueprints:
- **Operational Reality**: TIV's confirmed operational data center is the sovereign facility in Jayapura, Papua, Indonesia.
- **Global Footprint**: TIV does not operate an owned fleet of 16 hyperscale facilities across 11 countries, nor do we assert unverified claims of 845 PB storage fleets or 99.999% global SLAs. Broader geographic presence relies on partner edge peering and reference research topologies.
- **Compliance & Security**: Facility operations align with ISO 27001 physical security controls and SOC 2 security principles for data integrity and access control.`,
  },
  {
    slug: 'courier',
    title: 'Logistics Architecture',
    category: 'Logistics',
    status: 'Research',
    description:
      'Logistics systems architecture and supply chain telemetry research — evaluating cross-border hardware distribution, tracking protocols, and custody verification.',
    classification: 'Research',
    content: `## Overview

TIV researches distributed logistics architecture, supply chain telemetry, and automated verification protocols designed for secure hardware distribution, server component transit, and cryptographic chain-of-custody tracking.

## Status

**Research & Systems Design** — Logistics models and telemetry verification protocols are currently in architecture and research design. TIV does not operate an independent commercial freight airline or public courier dispatch service. Logistics research supports internal infrastructure equipment movements and partner-integrated distribution corridors.

## Research & Architecture Scope

### Hardware Chain of Custody
Cryptographic milestone verification and tamper-evident tracking models for server and networking hardware transit.

### Logistics Telemetry Protocols
Real-time dispatch telemetry and milestone tracking models for resilient equipment transport.

### Regulatory & Quality Frameworks
Operational alignment research targeting ISO 9001 and Good Distribution Practice (GDP) standards for sensitive hardware components.`,
  },

];

export function getInfrastructureServices(): InfrastructureService[] {
  // Filter out the duplicate alias for listings
  return infrastructureServices.filter((s, i, arr) => arr.findIndex((x) => x.title === s.title) === i);
}

export function getAllInfrastructureServices(): InfrastructureService[] {
  return infrastructureServices;
}

export function getInfrastructureService(
  slug: string
): InfrastructureService | undefined {
  return infrastructureServices.find(
    (s) => s.slug === slug || (slug === 'optical' && s.slug === 'optical-systems') || (slug === 'optical-systems' && s.slug === 'optical')
  );
}

// ─── News ───────────────────────────────────────────────────

const rawNewsArticles: NewsArticle[] = [
  {
    slug: 'tiv-launches-website',
    title: 'TIV Launches Official Website',
    date: '2026-09-12',
    author: 'Tonmoy Infrastructure and Vision',
    category: 'Announcements',
    tags: ['company', 'website'],
    excerpt:
      'Tonmoy Infrastructure and Vision launches its official website, providing a window into the organization\'s work across software, infrastructure, and research.',
    content: `Tonmoy Infrastructure and Vision has launched its official website. The site provides a comprehensive view of TIV's work across software development, internet infrastructure, networking, and research.

The website features dedicated sections for projects, infrastructure, research, open-source work, and transparency — reflecting TIV's commitment to building in public.

Visitors can explore TIV's major projects including OpenMail, Mercura, M31A, and Octate — all stable release software — learn about ongoing research, and review the organization's approach to transparency.`,
  },
];

const newsArticles: NewsArticle[] = validateNews(rawNewsArticles);

export function getNews(): NewsArticle[] {
  return newsArticles.sort((a, b) => b.date.localeCompare(a.date));
}

export function getNewsArticle(slug: string): NewsArticle | undefined {
  return newsArticles.find((n) => n.slug === slug);
}

// ─── Transparency Reports ───────────────────────────────────

const transparencyReports: TransparencyReport[] = [
  {
    slug: 'annual-report-2026',
    fiscalYear: 'FY2026',
    title: 'TIV Annual Report 2026',
    publicationDate: '2026-09-12',
    version: '1.0',
    status: 'Published',
    summary:
      'The first annual report of Tonmoy Infrastructure and Vision, covering the organization\'s formation, initial projects, and research direction.',
    content: `## Summary

This is the first annual report of Tonmoy Infrastructure and Vision.

The report covers:
- Formation of the organization
- Stable software portfolio (OpenMail, Mercura, M31A, Octate)
- Research direction
- Infrastructure plans
- Financial position

## Key Metrics

As a newly formed organization, most metrics are not yet available. This report establishes the baseline for future reporting.`,
  },
];

export function getTransparencyReports(): TransparencyReport[] {
  return transparencyReports;
}

export function getTransparencyReport(
  slug: string
): TransparencyReport | undefined {
  return transparencyReports.find((r) => r.slug === slug);
}

// ─── Financial Reports ──────────────────────────────────────

const rawFinancialReports: FinancialReport[] = [
  {
    fiscalYear: 'FY2026',
    status: 'Estimate',
    currency: 'INR',
    currencySymbol: '₹',
    revenue: 1840000,
    operatingExpenses: 1470000,
    operatingProfit: 370000,
    netProfit: 290000,
    assets: 1560000,
    liabilities: 490000,
    equity: 1070000,
    cashAndEquivalents: 780000,
    revenueStreams: [
      { label: 'Hosting & Infrastructure Services', amount: 720000 },
      { label: 'Domain Services', amount: 410000 },
      { label: 'Software / Technology Services', amount: 340000 },
      { label: 'Other Infrastructure Services', amount: 180000 },
      { label: 'Other Revenue', amount: 190000 },
    ],
    expenseCategories: [
      { label: 'Infrastructure & Hosting Costs', amount: 380000 },
      { label: 'Engineering & Development', amount: 320000 },
      { label: 'Hardware & Equipment', amount: 190000 },
      { label: 'Software & Services', amount: 150000 },
      { label: 'Operations & Administration', amount: 140000 },
      { label: 'Marketing & Business Development', amount: 100000 },
      { label: 'Research & Development', amount: 130000 },
      { label: 'Other Expenses', amount: 60000 },
    ],
    assetBreakdown: [
      { label: 'Cash & Bank Balances', amount: 780000 },
      { label: 'Accounts Receivable', amount: 160000 },
      { label: 'Computing & Network Equipment', amount: 240000 },
      { label: 'Other Equipment', amount: 110000 },
      { label: 'Prepaid / Other Current Assets', amount: 70000 },
      { label: 'Other Assets', amount: 200000 },
    ],
    liabilityBreakdown: [
      { label: 'Trade Payables', amount: 140000 },
      { label: 'Taxes & Statutory Payables', amount: 70000 },
      { label: 'Short-Term Obligations', amount: 80000 },
      { label: 'Other Payables', amount: 50000 },
      { label: 'Borrowings / Equipment Financing', amount: 150000 },
    ],
    equityBreakdown: [
      { label: 'Shareholder / Founder Capital', amount: 780000 },
      { label: 'Retained Earnings', amount: 290000 },
    ],
    capitalAllocation: [
      { label: 'Infrastructure', percentage: 26 },
      { label: 'Engineering', percentage: 22 },
      { label: 'Research & Development', percentage: 13 },
      { label: 'Hardware', percentage: 13 },
      { label: 'Operations', percentage: 10 },
      { label: 'Software & Services', percentage: 10 },
      { label: 'Other', percentage: 6 },
    ],
    reportingNote:
      'These figures represent illustrative management estimates prepared for public presentation and are not a substitute for statutory accounts, tax filings, or independently audited financial statements. Actual financial statements may differ materially. TIV intends to replace estimates with finalized financial information as reliable accounting records and reporting periods become available.',
  },
];

const financialReports: FinancialReport[] = validateFinancials(rawFinancialReports);

export function getFinancialReports(): FinancialReport[] {
  return financialReports;
}

export function getFinancialReport(
  fiscalYear: string
): FinancialReport | undefined {
  return financialReports.find((r) => r.fiscalYear === fiscalYear);
}

// ─── Jobs ───────────────────────────────────────────────────

const jobs: Job[] = [];

export function getJobs(): Job[] {
  return jobs;
}

export function getJob(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug);
}

// ─── Open Source Repos ──────────────────────────────────────

const repos: Repo[] = [
  {
    slug: 'openmail',
    name: 'OpenMail',
    description: 'Self-hosted email and communication infrastructure.',
    language: 'Go',
    license: 'AGPL-3.0',
    status: 'Stable Release',
    repository: 'https://github.com/eshanized/OpenMail',
    documentation: '/projects/openmail',
    latestRelease: 'v1.0.0',
    platform: 'github',
    artifactType: 'Application',
    affiliation: 'TIV',
  },
  {
    slug: 'mercura',
    name: 'Mercura',
    description: 'Self-hosted code hosting built around Mercurial.',
    language: 'Go',
    license: 'AGPL-3.0',
    status: 'Stable Release',
    repository: '',
    documentation: '/projects/mercura',
    latestRelease: 'v1.0.0',
    platform: 'documentation',
    artifactType: 'Software Platform',
    affiliation: 'TIV',
  },
  {
    slug: 'm31a',
    name: 'M31A',
    description: 'Rust-native autonomous software-engineering runtime with non-bypassable policy gates and verifiable execution.',
    language: 'Rust',
    license: 'MIT OR Apache-2.0',
    status: 'Stable Release',
    repository: 'https://github.com/eshanized/M31A',
    documentation: 'https://m31a.tonmoyinfrastructure.org/',
    latestRelease: 'v0.1.1',
    platform: 'github',
    artifactType: 'Software System',
    affiliation: 'TIV',
  },
  {
    slug: 'octate',
    name: 'Octate',
    description: 'Terminal-native AI code review CLI. Deterministic repository intelligence meets LLM reasoning.',
    language: 'TypeScript / Node.js',
    license: 'MIT',
    status: 'Stable Release',
    repository: 'https://github.com/vedanthq/Octate',
    documentation: '/projects/octate',
    latestRelease: 'v1.0.0',
    platform: 'github',
    artifactType: 'Tool',
    affiliation: 'TIV',
  },
  {
    slug: 'm31genesis',
    name: 'M31Genesis',
    description: 'Native M31 causal language model for agentic coding research (425M-class parameters).',
    language: 'Python',
    license: 'MIT',
    status: 'Experimental',
    repository: 'https://huggingface.co/eshanized/M31Genesis',
    documentation: '/projects/m31genesis',
    latestRelease: 'AgenticCode-v1',
    platform: 'huggingface',
    artifactType: 'AI Model',
    affiliation: 'TIV',
    parameterCount: '425M-class',
  },
  {
    slug: 'm31-q',
    name: 'M31 Q // For programmers',
    description: 'Interactive demonstration Space on Hugging Face for programmers.',
    language: 'Python',
    license: 'MIT',
    status: 'Experimental',
    repository: 'https://huggingface.co/spaces/eshanized/M31Q',
    documentation: '/projects/m31-q',
    latestRelease: 'Demo',
    platform: 'huggingface',
    artifactType: 'Space / Demo',
    affiliation: 'TIV',
  },
  {
    slug: 'm31tesla',
    name: 'M31Tesla',
    description: 'Standalone runtime and checkpoints for M31-Python-Agent-220M-v5 model.',
    language: 'Python',
    license: 'MIT',
    status: 'Experimental',
    repository: 'https://huggingface.co/eshanized/M31Tesla',
    documentation: '/projects/m31tesla',
    latestRelease: 'v5-Runtime',
    platform: 'huggingface',
    artifactType: 'AI Model',
    affiliation: 'TIV',
    parameterCount: '228.9M',
  },
  {
    slug: 'm31entropy',
    name: 'M31Entropy',
    description: 'M31 architecture exploration and pretraining checkpoints (314M parameters).',
    language: 'Python',
    license: 'MIT',
    status: 'Experimental',
    repository: 'https://huggingface.co/eshanized/M31Entropy',
    documentation: '/projects/m31entropy',
    latestRelease: 'Step-00000500',
    platform: 'huggingface',
    artifactType: 'AI Model',
    affiliation: 'TIV',
    parameterCount: '314M',
  },
  {
    slug: 'runstead',
    name: 'Runstead',
    description: 'Modern operating system for hosting businesses: client CRM, automated billing, DNS, and white-label storefronts.',
    language: 'TypeScript',
    license: 'Commercial Venture / Proprietary',
    status: 'Development',
    repository: 'https://github.com/eshanized/Runstead',
    documentation: '/projects/runstead',
    latestRelease: 'v0.2.0-dev',
    platform: 'github',
    artifactType: 'Software Platform',
    affiliation: 'TIV',
  },
];

export function getRepos(): Repo[] {
  return repos;
}

export function getTechnicalArtifacts(): TechnicalArtifact[] {
  return [
    {
      slug: 'kyro',
      name: 'Kyro',
      description: 'Local-first desktop AI assistant with a public v0.1.0 Linux release, computer-use automation, browser workflows, and developer tools.',
      artifactType: 'Application',
      platform: 'github',
      platformType: 'repository',
      status: 'Preview',
      language: 'Rust / TypeScript',
      license: 'MIT',
      url: 'https://github.com/eshanized/Kyro',
      documentation: 'https://kyro.tonmoyinfrastructure.org/',
      author: 'eshanized',
      organization: 'Tonmoy Infrastructure & Vision',
      affiliation: 'TIV',
      latestRelease: 'v0.1.0',
      tags: ['Desktop AI Assistant', 'Computer Use', 'Local First', 'Tauri', 'Linux Download'],
      verified: true,
    },
    {
      slug: 'openmail',
      name: 'OpenMail',
      description: 'Self-hosted email and communication infrastructure platform.',
      artifactType: 'Application',
      platform: 'github',
      platformType: 'repository',
      status: 'Stable Release',
      language: 'Go',
      license: 'AGPL-3.0',
      url: 'https://github.com/eshanized/OpenMail',
      documentation: '/projects/openmail',
      author: 'eshanized',
      organization: 'Tonmoy Infrastructure & Vision',
      affiliation: 'TIV',
      latestRelease: 'v1.0.0',
      tags: ['Email', 'SMTP', 'IMAP', 'Go'],
      verified: true,
    },
    {
      slug: 'mercura',
      name: 'Mercura',
      description: 'Self-hosted code hosting built around Mercurial.',
      artifactType: 'Software Platform',
      platform: 'documentation',
      platformType: 'documentation',
      status: 'Stable Release',
      language: 'Go',
      license: 'AGPL-3.0',
      url: '/projects/mercura',
      documentation: '/projects/mercura',
      organization: 'Tonmoy Infrastructure & Vision',
      affiliation: 'TIV',
      latestRelease: 'v1.0.0',
      tags: ['Mercurial', 'VCS', 'Go'],
      verified: true,
    },
    {
      slug: 'm31a',
      name: 'M31A',
      description: 'Rust-native autonomous software-engineering runtime with non-bypassable policy gates and verifiable execution.',
      artifactType: 'Software System',
      platform: 'github',
      platformType: 'repository',
      status: 'Stable Release',
      language: 'Rust',
      license: 'MIT OR Apache-2.0',
      url: 'https://m31a.tonmoyinfrastructure.org/',
      documentation: 'https://m31a.tonmoyinfrastructure.org/',
      author: 'eshanized',
      organization: 'Tonmoy Infrastructure & Vision',
      affiliation: 'TIV',
      ecosystem: 'm31',
      ecosystemRole: 'Autonomous software-engineering runtime',
      latestRelease: 'v0.1.1',
      tags: ['Autonomous Agent', 'Runtime', 'Terminal Cockpit', 'Rust', 'Security'],
      verified: true,
    },
    {
      slug: 'octate',
      name: 'Octate',
      description: 'Terminal-native AI code review CLI. Deterministic repository intelligence meets LLM reasoning.',
      artifactType: 'Tool',
      platform: 'github',
      platformType: 'repository',
      status: 'Stable Release',
      language: 'TypeScript / Node.js',
      license: 'MIT',
      url: 'https://github.com/vedanthq/Octate',
      documentation: '/projects/octate',
      organization: 'Tonmoy Infrastructure & Vision',
      affiliation: 'TIV',
      latestRelease: 'v1.0.0',
      tags: ['AI Code Review', 'CLI', 'Tree-sitter', 'SARIF', 'Terminal UI'],
      verified: true,
    },
    {
      slug: 'm31genesis',
      name: 'M31Genesis',
      description: 'M31-Genesis-AgenticCode-v1 — native M31 causal language model for agentic coding research.',
      artifactType: 'AI Model',
      platform: 'huggingface',
      platformType: 'model',
      status: 'Experimental',
      language: 'Python / PyTorch',
      license: 'MIT',
      url: 'https://huggingface.co/eshanized/M31Genesis',
      documentation: '/projects/m31genesis',
      author: 'eshanized',
      organization: 'Tonmoy Infrastructure & Vision',
      affiliation: 'TIV',
      parameterCount: '425M-class',
      modelArchitecture: 'Native M31 decoder-only transformer (24 layers, 1024 hidden, 16/8 heads, RoPE)',
      ecosystem: 'm31',
      ecosystemRole: 'Native causal language model for agentic coding',
      latestRelease: 'AgenticCode-v1',
      tags: ['Causal LM', 'Transformer', 'Agentic Coding', 'Hugging Face'],
      verified: true,
    },
    {
      slug: 'm31-q',
      name: 'M31 Q // For programmers',
      description: 'Interactive Hugging Face Space runtime for developer queries and code repair testing.',
      artifactType: 'Space / Demo',
      platform: 'huggingface',
      platformType: 'space',
      status: 'Preview',
      language: 'Gradio / Python',
      license: 'MIT',
      url: 'https://huggingface.co/spaces/eshanized/m31-q',
      documentation: '/projects/m31-q',
      author: 'eshanized',
      organization: 'Tonmoy Infrastructure & Vision',
      affiliation: 'TIV',
      ecosystem: 'm31',
      ecosystemRole: 'Interactive demonstration Space',
      latestRelease: 'Live Demo',
      tags: ['Hugging Face Spaces', 'Web Demo', 'Programmer Tools'],
      verified: true,
    },
    {
      slug: 'm31tesla',
      name: 'M31Tesla',
      description: 'Standalone runtime and checkpoints for M31-Python-Agent-220M-v5.',
      artifactType: 'AI Model',
      platform: 'huggingface',
      platformType: 'model',
      status: 'Experimental',
      language: 'Python',
      license: 'MIT',
      url: 'https://huggingface.co/eshanized/M31Tesla',
      documentation: '/projects/m31tesla',
      author: 'eshanized',
      organization: 'Tonmoy Infrastructure & Vision',
      affiliation: 'TIV',
      parameterCount: '228.9M',
      modelArchitecture: '20 layers, 896 hidden, 14 query / 7 KV heads, GQA, RoPE',
      ecosystem: 'm31',
      ecosystemRole: 'Python agent runtime and repair checkpoints',
      latestRelease: 'v5-Runtime',
      tags: ['Python Agent', 'Code Repair', 'Grouped-Query Attention'],
      verified: true,
    },
    {
      slug: 'm31entropy',
      name: 'M31Entropy',
      description: 'M31 architecture exploration and pretraining checkpoints (314M parameters).',
      artifactType: 'AI Model',
      platform: 'huggingface',
      platformType: 'model',
      status: 'Experimental',
      language: 'Python',
      license: 'MIT',
      url: 'https://huggingface.co/eshanized/M31Entropy',
      documentation: '/projects/m31entropy',
      author: 'eshanized',
      organization: 'Tonmoy Infrastructure & Vision',
      affiliation: 'TIV',
      parameterCount: '314M',
      modelArchitecture: '20 layers, 896 hidden, 128k vocabulary, 14 query / 7 KV heads',
      ecosystem: 'm31',
      ecosystemRole: 'Architecture exploration and tokenizer density',
      latestRelease: 'Step-00000500',
      tags: ['Architecture Experiment', 'Large Vocab', 'Pretraining'],
      verified: true,
    },
    {
      slug: 'mcp-superassistant',
      name: 'MCP-SuperAssistant',
      description: 'Brings Model Context Protocol (MCP) to LLM chat interfaces.',
      artifactType: 'Tool',
      platform: 'github',
      platformType: 'tool',
      status: 'Development',
      language: 'TypeScript',
      license: 'MIT',
      url: 'https://github.com/eshanized/MCP-SuperAssistant',
      documentation: 'https://github.com/eshanized/MCP-SuperAssistant',
      author: 'eshanized',
      organization: 'Tonmoy Infrastructure & Vision',
      affiliation: 'TIV',
      latestRelease: 'v0.1.0',
      tags: ['MCP', 'Model Context Protocol', 'Tooling'],
      verified: true,
    },
    {
      slug: 'slmgen',
      name: 'SLMGen',
      description: 'Fine-tune small language models with dataset intelligence and Colab runtimes.',
      artifactType: 'Library',
      platform: 'github',
      platformType: 'library',
      status: 'Research',
      language: 'Python',
      license: 'MIT',
      url: 'https://github.com/eshanized/SLMGen',
      author: 'eshanized',
      affiliation: 'Founder',
      tags: ['SLM', 'Fine-Tuning', 'Colab'],
      verified: true,
    },
    {
      slug: 'runstead',
      name: 'Runstead',
      description: 'Modern operating system for hosting businesses: client CRM, automated billing, DNS, and white-label storefronts.',
      artifactType: 'Software Platform',
      platform: 'github',
      platformType: 'repository',
      status: 'Development',
      language: 'TypeScript',
      license: 'Commercial Venture / Proprietary',
      url: 'https://github.com/eshanized/Runstead',
      documentation: '/projects/runstead',
      author: 'eshanized',
      organization: 'Tonmoy Infrastructure & Vision',
      affiliation: 'TIV',
      latestRelease: 'v0.2.0-dev',
      tags: ['Hosting OS', 'SaaS', 'Billing', 'cPanel', 'DNS', 'Prisma RLS'],
      verified: true,
    },
  ];
}

export function getTechnicalFootprint(): TechnicalFootprintPlatform[] {
  return [
    {
      platform: 'github',
      name: 'GitHub',
      profileUrl: 'https://github.com/eshanized',
      handle: 'eshanized',
      organization: 'Tonmoy Infrastructure & Vision',
      role: 'Source Code & Development Systems',
      description:
        'Official code repositories, system implementations, and developer tooling developed under TIV and its founder.',
      verified: true,
      resourceTypes: ['Repositories', 'Source Code', 'Issue Tracking', 'Releases'],
      artifactCount: 3,
      featuredItems: ['OpenMail', 'Octate', 'M31A', 'MCP-SuperAssistant'],
    },
    {
      platform: 'registry',
      name: 'npm Registry',
      profileUrl: 'https://www.npmjs.com/package/@tiverse/octate',
      handle: '@tiverse',
      organization: 'Tonmoy Infrastructure & Vision',
      role: 'Package Distribution & CLI Binaries',
      description:
        'Official npm packages and terminal-native developer CLI utilities published by TIV.',
      verified: true,
      resourceTypes: ['Packages', 'CLI Binaries', 'Release Tarballs'],
      artifactCount: 1,
      featuredItems: ['@tiverse/octate'],
    },
    {
      platform: 'huggingface',
      name: 'Hugging Face',
      profileUrl: 'https://huggingface.co/eshanized',
      handle: 'eshanized',
      organization: 'Tonmoy Infrastructure & Vision',
      role: 'AI / ML Models & Interactive Spaces',
      description:
        'AI/ML research models, safetensors checkpoints, tokenizer definitions, and interactive Spaces associated with TIV.',
      verified: true,
      resourceTypes: ['Models', 'Spaces', 'Checkpoints', 'Datasets', 'Collections'],
      artifactCount: 4,
      featuredItems: [
        'M31Genesis (425M Causal LM)',
        'M31Tesla (228.9M Python Agent Runtime)',
        'M31Entropy (314M Architecture Exploration)',
        'M31 Q // For programmers (Space)',
      ],
    },
    {
      platform: 'research',
      name: 'Research & Publications',
      profileUrl: '/research/publications',
      handle: 'TIV-RES',
      organization: 'Tonmoy Infrastructure & Vision',
      role: 'Academic & Technical Monographs',
      description:
        'Whitepapers, research frameworks, technical monographs, and empirical specifications published openly.',
      verified: true,
      resourceTypes: ['Publications', 'Whitepapers', 'Frameworks', 'Empirical Studies'],
      artifactCount: 2,
      featuredItems: [
        'TIV Infrastructure Whitepaper v1.0',
        'Towards Autonomous Development Systems (TIV-RES-2026-001)',
      ],
    },
    {
      platform: 'documentation',
      name: 'Official Specifications',
      profileUrl: '/docs',
      handle: 'tonmoyinfrastructure.org',
      organization: 'Tonmoy Infrastructure & Vision',
      role: 'Architecture & System Standards',
      description:
        'Authoritative system documentation, API schemas, design contracts, and operational guidelines.',
      verified: true,
      resourceTypes: ['Documentation', 'Architecture Specs', 'API Reference'],
      artifactCount: 4,
      featuredItems: ['OpenMail Architecture', 'Mercura VCS Spec', 'M31 Platform Spec'],
    },
  ];
}

export function getM31Ecosystem(): M31Node[] {
  return [
    {
      id: 'm31a',
      name: 'M31A',
      title: 'M31A Autonomous Engineering Runtime',
      role: 'Rust-native autonomous software-engineering runtime',
      status: 'Stable Release',
      artifactType: 'Software System',
      lifecycle: 'Production / Stable Release',
      platform: 'github',
      url: 'https://m31a.tonmoyinfrastructure.org/',
      href: '/projects/m31a',
      description:
        'Single-crate, high-assurance Rust runtime with deterministic lifecycle control, 11-stage non-bypassable policy gates, evidence-based completion, and terminal cockpit.',
    },
    {
      id: 'm31genesis',
      name: 'M31Genesis',
      title: 'M31Genesis Causal Language Model',
      role: 'Native M31 causal language model for agentic coding research',
      status: 'Experimental',
      artifactType: 'AI Model',
      lifecycle: 'Experimental Research Checkpoints',
      parameterCount: '425M-class',
      platform: 'huggingface',
      url: 'https://huggingface.co/eshanized/M31Genesis',
      href: '/projects/m31genesis',
      description:
        'Native M31 decoder-only transformer with 425M parameters, designed for software engineering, code synthesis, and agentic workflows.',
    },
    {
      id: 'm31tesla',
      name: 'M31Tesla',
      title: 'M31Tesla Python Agent Runtime',
      role: 'Standalone runtime and checkpoints for M31-Python-Agent-220M-v5',
      status: 'Experimental',
      artifactType: 'AI Model',
      lifecycle: 'Experimental Research Runtime',
      parameterCount: '228.9M',
      platform: 'huggingface',
      url: 'https://huggingface.co/eshanized/M31Tesla',
      href: '/projects/m31tesla',
      description:
        'Custom 228.9M model with grouped-query attention and standalone Python runtime for code repair experiments.',
    },
    {
      id: 'm31entropy',
      name: 'M31Entropy',
      title: 'M31Entropy Architecture Exploration',
      role: 'Large-vocabulary architecture exploration and pretraining checkpoints',
      status: 'Experimental',
      artifactType: 'AI Model',
      lifecycle: 'Experimental Research Checkpoint',
      parameterCount: '314M',
      platform: 'huggingface',
      url: 'https://huggingface.co/eshanized/M31Entropy',
      href: '/projects/m31entropy',
      description:
        'Exploration of 128,000-token vocabulary representation density in a 314M parameter causal transformer.',
    },
    {
      id: 'm31-q',
      name: 'M31 Q',
      title: 'M31 Q // For programmers',
      role: 'Interactive demonstration Space for programmers on Hugging Face',
      status: 'Experimental',
      artifactType: 'Space / Demo',
      lifecycle: 'Public Web Demonstration',
      platform: 'huggingface',
      url: 'https://huggingface.co/spaces/eshanized/M31Q',
      href: '/projects/m31-q',
      description:
        'Interactive demonstration Space hosted on Hugging Face allowing researchers and developers to test M31 capabilities directly in the browser.',
    },
  ];
}

export function getAIProjects(): Project[] {
  return projects.filter(
    (p) =>
      p.slug === 'm31a' ||
      p.slug === 'm31genesis' ||
      p.slug === 'm31-q' ||
      p.slug === 'm31tesla' ||
      p.slug === 'm31entropy'
  );
}

// ─── Work Categories ─────────────────────────────────────────

export interface WorkCategory {
  number: string;
  title: string;
  description: string;
  status: ProjectStatus;
  projects: string[];
}

export function getWorkCategories(): WorkCategory[] {
  return [
    {
      number: '01',
      title: 'Software',
      description:
        'Self-hosted, open-source software that gives people control over their digital infrastructure. Email, code hosting, AI infrastructure, and developer tools.',
      status: 'Stable Release',
      projects: ['openmail', 'mercura', 'm31a', 'octate'],
    },
    {
      number: '02',
      title: 'Internet Infrastructure',
      description:
        'Domain registration, hosting, and the foundational services that make the internet accessible and operable.',
      status: 'Planning',
      projects: ['domains', 'hosting'],
    },
    {
      number: '03',
      title: 'Network Infrastructure',
      description:
        'Routing, switching, fiber optics, and the physical systems that connect the internet. Research into next-generation network architecture.',
      status: 'Research',
      projects: ['networking', 'optical'],
    },
    {
      number: '04',
      title: 'Research',
      description:
        'Fundamental research across AI, networking, distributed systems, and systems engineering. Published openly.',
      status: 'Research',
      projects: [],
    },
  ];
}

export { getReleases, getReleasesForProject } from './institutional';
