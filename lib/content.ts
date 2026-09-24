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
  validatePublications,
  validateFinancials,
  validateNews,
} from '@/lib/schemas';

// ─── Projects ──────────────────────────────────────────────

const rawProjects: Project[] = [
  {
    slug: 'openmail',
    title: 'OpenMail',
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
    type: 'software',
    productStatus: 'stable',
    releaseStatus: 'stable',
    developmentStage: 'active',
    status: 'Stable Release',
    category: 'Software',
    shortDescription:
      'Autonomous developer and AI infrastructure platform.',
    description:
      'Autonomous developer and AI infrastructure. A platform for building, deploying, and operating AI-driven development systems.',
    version: '1.0.0',
    releaseDate: '2026-09-12',
    featured: true,
    technology: ['AI', 'LLM', 'Rust', 'Python'],
    repository: 'https://github.com/eshanized/M31A',
    documentation: '/projects/m31a',
    website: '',
    license: 'TBD',
    artifactType: 'Software System',
    owner: 'eshanized',
    organization: 'Tonmoy Infrastructure & Vision',
    affiliation: 'TIV',
    ecosystem: 'm31',
    ecosystemRole: 'Autonomous developer and AI infrastructure platform',
    sources: [
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
        url: '/projects/m31a',
        label: 'Platform Overview',
        affiliation: 'TIV',
        organization: 'Tonmoy Infrastructure & Vision',
        verified: true,
      },
    ],
    problem:
      'AI-assisted development is increasingly common, but truly autonomous development infrastructure — systems that can understand, maintain, and operate codebases independently with verifiable safety boundaries — has been largely unexplored. M31A addresses this foundational gap.',
    approach:
      'M31A provides codebase understanding, autonomous operations, safety boundaries, tool execution sandboxing, and human-AI collaboration interfaces. The product is an existing stable release, with ongoing advanced research conducted separately.',
    architecture:
      'M31A is built as a modular platform with components for codebase representation models, action planning and execution, tool sandboxing, deterministic audit trails, and rigorous evaluation frameworks.',
    features: [
      'Autonomous developer workflows and task execution',
      'Repository intelligence and codebase AST reasoning',
      'Model interaction runtime with tool orchestration',
      'Isolated sandboxing for safe execution of automated actions',
      'Deterministic audit logging for full accountability',
      'Evaluation frameworks for measuring agent precision',
    ],
    roadmap: [
      { item: 'Research direction definition', done: true },
      { item: 'Literature review and framework architecture', done: true },
      { item: 'Codebase understanding prototype', done: true },
      { item: 'Action planning engine implementation', done: true },
      { item: 'Safety framework and sandboxing verification', done: true },
      { item: 'Evaluation methodology', done: true },
      { item: 'Research publication release', done: true },
      { item: 'Advanced multi-agent orchestration research', done: false },
      { item: 'Extended codebase contextual understanding', done: false },
    ],
    relatedResearch: ['autonomous-development-systems'],
    relatedProjects: ['openmail', 'mercura', 'octate'],
    content: `## Overview

M31A is an autonomous developer and AI infrastructure platform. It provides systems for building, deploying, and operating AI-driven development tools — from code generation to infrastructure management.

## Problem

AI-assisted development is increasingly common, but truly autonomous development infrastructure — systems that can understand, maintain, and operate codebases independently — has been largely unexplored. M31A addresses this gap.

## Approach

M31A provides:

- **Codebase understanding** — systems that can parse and reason about entire codebases
- **Autonomous operations** — AI agents that can monitor and maintain infrastructure
- **Safety and control** — ensuring autonomous systems remain auditable and controllable
- **Human-AI collaboration** — interfaces for productive cooperation between developers and AI

## Architecture

M31A is built as a modular platform with components for:

- Codebase representation models
- Action planning and execution
- Safety boundaries and audit trails
- Evaluation frameworks

## Current Status

M31A is a stable release. The core platform is complete and deployed. TIV continues to research and develop advanced autonomous developer systems and related AI infrastructure.

## Roadmap

- [x] Research direction definition
- [x] Initial literature review
- [x] Codebase understanding prototype
- [x] Action planning experiments
- [x] Safety framework
- [x] Evaluation methodology
- [x] Research publication
- [ ] Advanced multi-agent orchestration
- [ ] Extended codebase understanding`,
    updatedAt: '2026-09-12',
  },
  {
    slug: 'octate',
    title: 'Octate',
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

// ─── Publications ──────────────────────────────────────────

const rawPublications: Publication[] = [
  {
    slug: 'autonomous-development-systems',
    title: 'Towards Autonomous Development Systems: A Research Framework',
    identifier: 'TIV-RES-2026-001',
    authors: ['Tonmoy Infrastructure and Vision'],
    abstract:
      'We propose a research framework for autonomous development systems — AI systems capable of understanding, maintaining, and operating codebases. We define the problem space, identify key challenges, and outline a research agenda.',
    publicationDate: '2026-09-12',
    date: '2026-09-12',
    version: '0.1',
    status: 'Draft',
    area: 'Artificial Intelligence',
    project: 'm31a',
    content: `## Abstract

We propose a research framework for autonomous development systems — AI systems capable of understanding, maintaining, and operating codebases. We define the problem space, identify key challenges, and outline a research agenda.

## Key Findings

This is an early-stage draft. Key findings will be updated as research progresses.

## Methodology

The methodology is being developed. This section will describe the experimental approach once defined.

## Limitations

This is a draft document. No experimental results have been produced yet.`,
  },
];

const publications: Publication[] = validatePublications(rawPublications);

export function getPublications(): Publication[] {
  return publications;
}

export function getPublication(slug: string): Publication | undefined {
  return publications.find((p) => p.slug === slug);
}

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
    description: 'Autonomous developer and AI infrastructure.',
    language: 'Rust',
    license: 'TBD',
    status: 'Stable Release',
    repository: 'https://github.com/eshanized/M31A',
    documentation: '/projects/m31a',
    latestRelease: 'v1.0.0',
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
];

export function getRepos(): Repo[] {
  return repos;
}

export function getTechnicalArtifacts(): TechnicalArtifact[] {
  return [
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
      description: 'Autonomous developer and AI infrastructure platform.',
      artifactType: 'Software System',
      platform: 'github',
      platformType: 'repository',
      status: 'Stable Release',
      language: 'Rust / Python',
      license: 'TBD',
      url: 'https://github.com/eshanized/M31A',
      documentation: '/projects/m31a',
      author: 'eshanized',
      organization: 'Tonmoy Infrastructure & Vision',
      affiliation: 'TIV',
      ecosystem: 'm31',
      ecosystemRole: 'Autonomous developer platform',
      latestRelease: 'v1.0.0',
      tags: ['AI Agent', 'Terminal-Native', 'Rust'],
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
      documentation: '/projects/mcp-superassistant',
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
      title: 'M31A Autonomous Developer Platform',
      role: 'Autonomous developer & AI infrastructure platform',
      status: 'Stable Release',
      artifactType: 'Software System',
      lifecycle: 'Production / Stable Release',
      platform: 'github',
      url: 'https://github.com/eshanized/M31A',
      href: '/projects/m31a',
      description:
        'The terminal-native AI coding agent that ships, not just suggests. Autonomous workflows and tool orchestration.',
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
