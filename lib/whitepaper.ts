import type { Whitepaper } from './types';

const whitepaper: Whitepaper = {
  title: 'TIV Infrastructure Whitepaper',
  version: '1.0',
  status: 'Published',
  publishedAt: 'September 2026',
  authors: ['Tonmoy Infrastructure and Vision'],
  classification: 'Public',
  abstract:
    'The TIV Infrastructure Whitepaper describes the principles, technical direction, and long-term vision behind Tonmoy Infrastructure and Vision. It explains what TIV is building, why it exists, how it thinks about infrastructure, and where its technology direction is going.',
  sections: [
    {
      id: 'executive-summary',
      number: '01',
      title: 'Executive Summary',
      content: `Tonmoy Infrastructure and Vision (TIV) is an organization building practical infrastructure across software, internet infrastructure, networking, fiber optics, artificial intelligence, and systems engineering.

TIV operates across four categories of work:

- **Software** — self-hosted email, code hosting, and developer tools
- **Internet Infrastructure** — domains, hosting, and foundational services
- **Network Infrastructure** — routing, switching, and network architecture
- **Research** — fundamental research across AI, networking, distributed systems, and systems engineering

This whitepaper explains the principles behind TIV's work, the technical direction of each area, and the long-term vision of building infrastructure that people can understand, operate, own, and depend on.

### Current State

TIV distinguishes between what exists, what is in development, and what is research:

- **Existing Stable Software** — OpenMail (self-hosted email), Mercura (self-hosted code hosting), M31A (autonomous developer infrastructure), Octate (terminal-native AI code review CLI)
- **Existing** — organizational structure, content infrastructure, domain management, basic hosting
- **Research** — fiber optics, networking architecture, advanced AI systems
- **Planned** — expanded hosting services, network infrastructure, optical systems

This whitepaper is a vision and technical-position document. It is not an audited financial statement, a research paper claiming scientific validation, or a marketing brochure.`,
    },
    {
      id: 'why-tiv-exists',
      number: '02',
      title: 'Why TIV Exists',
      content: `TIV exists because infrastructure matters. The systems people depend on — email, code hosting, networking, hosting — shape what is possible. When infrastructure is centralized, opaque, and controlled by a small number of providers, people lose meaningful control over the tools they use every day.

TIV was founded on a simple observation: the internet has become too centralized, too opaque, and too dependent on a small number of large providers. The result is that individuals and organizations have fewer choices about the infrastructure they use and less control over the systems they depend on.

TIV exists to build alternatives — not by rejecting existing technology, but by building infrastructure that is **understandable**, **operable**, **ownable**, and **dependable**.

### The Four Principles

These four principles guide every decision TIV makes:

1. **Understandable** — People should be able to reason about the systems they depend on. Systems that cannot be understood cannot be trusted, maintained, or improved.

2. **Operable** — Infrastructure should be practical to deploy and maintain. If a system requires a dedicated team of specialists to operate, it is not truly ownable.

3. **Ownable** — Organizations should have meaningful control over their data, software, and systems. Ownership means the ability to inspect, modify, and self-host without permission.

4. **Dependable** — Infrastructure should behave reliably and predictably. Systems that fail silently or behave inconsistently are not infrastructure — they are liabilities.

These principles are not marketing language. They are engineering constraints that shape what TIV builds and how.`,
    },
    {
      id: 'the-problem',
      number: '03',
      title: 'The Problem',
      content: `TIV is building in response to several observations about the current state of infrastructure:

### Centralized Infrastructure

A small number of large providers control most of the internet's foundational infrastructure — email, code hosting, DNS, hosting, and cloud services. This concentration creates systemic risk and limits choice.

### Opaque Systems

Many infrastructure systems are opaque. Users cannot inspect how their data is processed, where it is stored, or who has access to it. Opaqueness makes it impossible to verify claims about security, privacy, or reliability.

### Vendor Dependence

Organizations become dependent on specific vendors for hosting, email, code hosting, and infrastructure management. Switching providers is often prohibitively expensive or technically infeasible. This dependence reduces negotiating power and limits flexibility.

### Difficult Self-Hosting

Self-hosting — running your own email, code hosting, or infrastructure — has become notoriously difficult. Spam filtering, deliverability, certificate management, and infrastructure complexity create barriers that push most organizations toward centralized providers.

### Fragmented Tooling

The tools needed to deploy and operate infrastructure are often fragmented, poorly documented, and require significant expertise to integrate. This fragmentation makes infrastructure ownership impractical for most organizations.

### Lack of Infrastructure Ownership

The shift toward centralized services has eroded the practice of infrastructure ownership. Organizations that once operated their own systems now depend on external providers for core functionality, losing institutional knowledge and control.

### Barriers to Operating Software Independently

Deploying and maintaining software independently requires expertise in networking, security, storage, and systems administration. These barriers prevent many organizations from considering self-hosted alternatives.

These are TIV's observations and engineering concerns. They are not claims about the entire technology industry — they are the problems TIV is motivated to address.`,
    },
    {
      id: 'infrastructure-philosophy',
      number: '04',
      title: 'Infrastructure Philosophy',
      content: `TIV's infrastructure philosophy is built on four principles. These principles are not aspirational — they are the engineering constraints that guide every design decision.

### Understandable

Systems should be understandable to the people operating them. This means:

- Clear architecture with visible boundaries between components
- Documentation that explains not just *what* a system does, but *why* it works that way
- Configuration that is explicit rather than implicit
- Behavior that is predictable and observable

A system that cannot be understood cannot be trusted. If an operator cannot reason about how a system will behave under load, during failures, or when configured differently, they cannot operate it responsibly.

### Operable

Infrastructure should be practical to deploy and maintain. This means:

- Simple deployment with minimal dependencies
- Clear operational procedures for common tasks
- Monitoring and observability built in, not bolted on
- Failure modes that are graceful and recoverable

A system that requires a team of specialists to operate is not truly ownable. TIV prioritizes operational simplicity over feature completeness.

### Ownable

Organizations should have meaningful control over their data, software, and systems. This means:

- Self-hosting as a first-class deployment model, not an afterthought
- Open-source licenses that permit inspection, modification, and redistribution
- Data stored locally by default, not processed through external services
- No vendor lock-in through proprietary formats or protocols

Ownership is not just about legal rights — it is about the practical ability to control, inspect, and modify the systems you depend on.

### Dependable

Infrastructure should behave reliably and predictably. This means:

- Consistent behavior under expected conditions
- Graceful degradation under unexpected conditions
- Clear failure modes with actionable diagnostics
- No silent data loss or corruption

Dependability is not a feature — it is a precondition for trust. Infrastructure that fails silently or behaves inconsistently is worse than no infrastructure at all.

These four principles are interconnected. A system that is understandable but not operable is theoretical. A system that is operable but not dependable is a liability. TIV seeks to satisfy all four principles simultaneously.`,
    },
    {
      id: 'software-infrastructure',
      number: '05',
      title: 'Software Infrastructure',
      content: `TIV's software direction focuses on building self-hosted alternatives to centralized infrastructure. Four projects define this direction:

### OpenMail

[OpenMail](/work/openmail) is self-hosted email and communication infrastructure. It is designed to give individuals and organizations full control over their email systems without depending on centralized providers.

Email is foundational to the internet, yet self-hosting email has become notoriously difficult. OpenMail takes a pragmatic approach: a single binary that handles SMTP, IMAP, and administration, with modern TLS by default and built-in spam protection.

OpenMail is a stable release. The core platform is complete and deployed. Active development continues on improvements and new features.

### Mercura

[Mercura](/work/mercura) is self-hosted code hosting built around Mercurial. It provides repository hosting, code review, and collaboration tools for teams that prefer distributed version control systems.

Most code hosting platforms are centralized and proprietary. Mercura offers an alternative: self-hosted, open, and built around Mercurial's powerful distributed model. It is designed to be lightweight, Git-compatible, and extensible.

Mercura is a stable release. The core platform is complete and deployed. Active development continues on improvements and new features.

### M31A

[M31A](/work/m31a) is an autonomous developer and AI infrastructure platform. It provides systems for building, deploying, and operating AI-driven development tools — from code generation to infrastructure management.

M31A is a stable release. The core platform is complete and deployed. TIV continues to research and develop advanced autonomous developer systems and related AI infrastructure.

### Octate

[Octate](/work/octate) is a terminal-native AI code review CLI that combines deterministic repository intelligence (Tree-sitter AST parsing, cross-file reference graphs, static linters) with multi-stage LLM reasoning and a two-stage critic quality gate. Published as \`@tiverse/octate\` on npm with source on GitHub (\`vedanthq/Octate\`), Octate is a stable release supporting interactive terminal inspection and automated CI/CD SARIF v2.1.0 workflows.

### How These Projects Fit Together

All four projects share the same infrastructure philosophy:

- **Self-hostable** — each can be deployed on infrastructure the operator controls
- **Open source** — each is open to inspection, modification, and redistribution
- **Data ownership** — each stores data locally by default
- **Operational simplicity** — each is designed to be practical to deploy and maintain

These projects are not isolated products. They are layers of a single infrastructure philosophy: building tools that people can understand, operate, own, and depend on.`,
    },
    {
      id: 'internet-infrastructure',
      number: '06',
      title: 'Internet Infrastructure',
      content: `TIV's internet infrastructure work covers the foundational services that make the internet usable: domains, hosting, and web infrastructure.

### Domains

TIV manages domain registration and DNS configuration. This is foundational infrastructure — without a domain, most internet services cannot be deployed. TIV's domain management is an internal capability that supports its broader infrastructure work.

### Hosting

TIV operates hosting infrastructure for its own services and projects. This includes web servers, application servers, and the supporting infrastructure needed to run software in production.

TIV's hosting infrastructure is currently **internal** — it supports TIV's own projects and services. Commercial hosting is a planned future direction, but TIV does not claim hosting capabilities it does not have.

### Web Infrastructure

TIV maintains web infrastructure including TLS certificates, reverse proxy configuration, and web server management. This infrastructure supports TIV's public-facing services.

### Current vs. Planned

- **Current services** — domain management, internal hosting, web infrastructure for TIV services
- **Internal infrastructure** — hosting for TIV's own projects, DNS, TLS management
- **Future plans** — expanded hosting services, commercial hosting offerings

TIV does not claim datacenters, regions, customer counts, uptime statistics, or pricing. When commercial services are available, they will be published with accurate information.`,
    },
    {
      id: 'network-infrastructure',
      number: '07',
      title: 'Network Infrastructure',
      content: `TIV's network infrastructure work covers routing, switching, network architecture, and network management.

### Networking Direction

TIV is building expertise in network infrastructure — the physical and logical systems that move data between points. This includes:

- **Routing** — the protocols and systems that direct traffic between networks
- **Switching** — the local network infrastructure that connects devices
- **Network architecture** — the design of networks that are reliable, efficient, and understandable
- **Network management** — the tools and practices for operating networks

### Current vs. Research

TIV's network infrastructure work is currently in the **research** and **planning** phase. TIV does not claim operational network infrastructure capabilities it does not have.

Current activities include:

- Studying network architecture and routing protocols
- Researching network equipment and management systems
- Planning future network infrastructure deployment

Research directions include:

- Edge infrastructure and its role in reducing latency
- Network observability and diagnostics
- The evolution of internet routing

### Network Layers

The relationship between network layers can be understood as:

- **Physical layer** — cables, fiber, and wireless connections
- **Link layer** — switching and local network connectivity
- **Network layer** — routing between networks
- **Transport layer** — reliable data delivery
- **Application layer** — services that use the network

TIV's interest spans all layers, with particular focus on the physical and network layers — the areas where infrastructure ownership has the most impact.`,
    },
    {
      id: 'optical-infrastructure',
      number: '08',
      title: 'Optical Infrastructure',
      content: `TIV's optical infrastructure research explores fiber optics, optical networking, and transmission systems.

### Research Direction

Optical infrastructure is the physical backbone of the internet. Fiber optic cables carry the vast majority of long-distance data, yet optical infrastructure is often treated as an opaque layer that software engineers do not need to understand.

TIV believes that understanding optical infrastructure is essential for building infrastructure that is truly ownable. If the physical layer is opaque, ownership is incomplete.

TIV's optical research is in the **research** phase. No commercial optical products or services exist. Research directions include:

- **Fiber optics** — understanding transmission systems, fiber types, and optical components
- **Optical networking** — how optical signals are routed, multiplexed, and managed
- **Transmission systems** — the equipment that converts electrical signals to optical and back
- **Optical communications** — the protocols and standards that govern optical data transmission

### No Unverified Claims

TIV does not claim breakthroughs, patents, or commercial optical products. Optical infrastructure is a long-term research direction. When research findings are available, they will be published through the TIV research portal.

### Optical Path

The basic optical transmission path is:

1. **Node A** sends data
2. **Optical transmitter** converts electrical signals to optical
3. **Fiber link** carries the optical signal
4. **Optical receiver** converts optical signals back to electrical
5. **Node B** receives data

This simplified path hides significant complexity — amplifiers, multiplexers, dispersion compensation, and signal processing. Understanding this complexity is part of TIV's long-term research direction.`,
    },
    {
      id: 'ai-and-systems-research',
      number: '09',
      title: 'AI and Systems Research',
      content: `TIV's AI and systems research direction is centered on the intersection of artificial intelligence and infrastructure.

### M31A

M31A is TIV's AI infrastructure platform. It is a stable release that provides systems for building, deploying, and operating AI-driven development tools. M31A includes:

- **Codebase understanding** — systems that can parse and reason about entire codebases
- **Autonomous operations** — AI agents that can monitor and maintain infrastructure
- **Safety and control** — ensuring autonomous systems remain auditable and controllable
- **Human-AI collaboration** — interfaces for productive cooperation between developers and AI

TIV continues to research and develop advanced autonomous developer systems and related AI infrastructure. Ongoing research directions are published through the TIV research portal.

### Research Areas

TIV's AI and systems research spans several areas:

- **Autonomous development systems** — the M31A direction
- **Repository intelligence** — systems that understand code repositories
- **Model interaction** — how AI models interact with code, infrastructure, and users
- **Runtime systems** — the infrastructure needed to run AI systems safely
- **Tool integration** — connecting AI systems to development tools
- **Sandboxing** — isolating AI systems to prevent unintended actions

### Labeling

TIV clearly labels the status of its AI work:

- **Research** — concepts and directions being investigated
- **Experimental** — prototypes and experiments, not production systems
- **In Development** — systems being built toward production use

TIV does not present research concepts as finished products. The distinction between research and production is fundamental to TIV's credibility.`,
    },
    {
      id: 'self-hosted-infrastructure',
      number: '10',
      title: 'Self-Hosted Infrastructure',
      content: `Self-hosting is central to TIV's philosophy. Self-hosting means running software on infrastructure you control, rather than depending on external providers.

### The Self-Hosting Stack

Self-hosted infrastructure can be understood as a stack of layers:

1. **Software** — the application you want to run (email, code hosting, etc.)
2. **Application server** — the runtime that executes the software
3. **Server** — the physical or virtual machine that hosts the application
4. **Network** — the connectivity that makes the server reachable
5. **Internet** — the global infrastructure that connects networks
6. **Physical infrastructure** — the cables, fiber, and hardware that make the internet possible

Each layer depends on the layers below it. TIV's long-term vision is to work across more of these layers — from software down to physical infrastructure.

### Why Self-Hosting Matters

Self-hosting matters because it enables ownership. When you self-host:

- You control where your data is stored
- You can inspect and modify the software
- You are not dependent on a provider's business decisions
- You can operate on your own terms

### Why Self-Hosting Is Hard

Self-hosting is hard because:

- It requires expertise in multiple layers of infrastructure
- Tools for deployment and management are fragmented
- Centralized providers have made self-hosting less common, reducing community support
- Some services (like email) have been deliberately made harder to self-host

TIV's goal is to make self-hosting practical by building software that is simple to deploy, well-documented, and designed for operational ownership.`,
    },
    {
      id: 'open-source',
      number: '11',
      title: 'Open Source',
      content: `TIV's software is open source. This is not a business strategy — it is a philosophical commitment.

### Why Open Source

TIV believes infrastructure should be inspectable and ownable. Open-source licenses are the legal mechanism that makes this possible. When software is open source:

- Anyone can inspect how it works
- Anyone can modify it for their own use
- Anyone can redistribute improvements
- No single entity can restrict access

Open source is the foundation of ownable infrastructure. Without it, "ownership" is an illusion — you can run the software, but you cannot understand or modify it.

### TIV's Open-Source Projects

TIV's major software projects are open source:

- [OpenMail](/work/openmail) — AGPL-3.0
- [Mercura](/work/mercura) — AGPL-3.0
- M31A — license to be determined (research phase)
- [Octate](/work/octate) — MIT License ([GitHub](https://github.com/vedanthq/Octate) / [npm](https://www.npmjs.com/package/@tiverse/octate))

TIV uses copyleft licenses (AGPL) rather than permissive licenses (MIT, Apache) because copyleft ensures that modifications remain open. Permissive licenses allow organizations to close-source modifications, which undermines the goal of ownable infrastructure.

### Open Source Page

For a complete list of TIV's open-source repositories, see the [Open Source page](/open-source).`,
    },
    {
      id: 'security-and-trust',
      number: '12',
      title: 'Security and Trust',
      content: `TIV's approach to security is built on several principles:

### Security by Design

Security is not a feature added after development — it is a design constraint from the beginning. TIV's software is designed to:

- Minimize attack surface by keeping systems simple
- Use established, well-tested cryptographic libraries
- Default to secure configurations
- Avoid unnecessary network exposure

### Responsible Disclosure

TIV follows responsible disclosure practices. When security issues are identified, they are reported and addressed before public disclosure. TIV's security policy is available on the [Security page](/security).

### Minimizing Exposure

TIV minimizes unnecessary exposure by:

- Running only the services that are needed
- Closing unnecessary ports and services
- Using TLS for all network communication
- Avoiding unnecessary external dependencies

### Operational Reliability

Security and reliability are related. A system that is not reliable is not secure — unreliable systems create opportunities for exploitation. TIV prioritizes dependability as a security measure.

### Protecting Information

TIV protects:

- **Customer information** — data entrusted to TIV is not shared or sold
- **User information** — personal data is minimized and protected
- **Security-sensitive information** — internal security architecture is not publicly exposed

### Transparency Without Compromising Security

TIV is transparent about its security philosophy and practices without exposing sensitive details. The [Security page](/security) provides public information about TIV's security approach. Internal security architecture, configuration details, and vulnerability information are not published.

TIV does not expose internal security architecture. Transparency means being honest about practices — not revealing information that would aid attackers.`,
    },
    {
      id: 'economic-model',
      number: '13',
      title: 'Economic Model',
      content: `TIV intends to sustain infrastructure development through a combination of services and technology.

### Revenue Areas

TIV's economic model is built on several areas:

- **Hosting** — providing hosting services for software and infrastructure
- **Domains** — domain registration and management services
- **Software** — open-source software with optional commercial services
- **Infrastructure services** — networking and infrastructure management
- **Research** — research that informs product development
- **Technology development** — building software and systems that have commercial value

### Principles

TIV's economic model follows several principles:

- **Sustainability over growth** — TIV prioritizes sustainable operations over rapid growth
- **Recurring revenue** — infrastructure services provide recurring revenue that supports long-term development
- **Open source as foundation** — open-source software builds trust and adoption; commercial services provide sustainability
- **Research as investment** — research is not a cost center; it is an investment in future capabilities

### No Fabricated Projections

TIV does not publish revenue projections, customer counts, or market size estimates in this whitepaper. When financial data is available, it is published on the [Transparency page](/transparency) with clear labeling.

TIV does not present speculative business assumptions as facts. The economic model described here is a direction, not a claim of current results.`,
    },
    {
      id: 'financial-transparency',
      number: '14',
      title: 'Financial Transparency',
      content: `TIV is committed to publishing appropriate financial information while protecting sensitive data.

### What TIV Publishes

TIV publishes:

- **Annual financial summaries** — high-level revenue, expenses, and balance sheet information
- **Transparency reports** — annual reports covering activities, finances, and direction
- **Governance information** — how TIV is governed and makes decisions

### What TIV Protects

TIV does not publish:

- **Customer information** — individual customer data is never disclosed
- **Employee information** — individual compensation or personal information
- **Confidential contracts** — specific terms of agreements with partners or vendors
- **Security-sensitive information** — anything that could compromise operational security

### Labeling

Where estimated financial data exists, TIV explicitly labels it:

- **Management Estimate** — figures prepared by management, not independently verified
- **Unaudited** — figures have not been audited by an independent auditor
- **Illustrative** — figures are illustrative and may differ from actual results

TIV never calls estimated information audited. When audited financial statements are available, they will be clearly labeled as such.

### Links

- [Transparency page](/transparency)
- [Financial reports](/transparency/financials)`,
    },
    {
      id: 'research-and-development',
      number: '15',
      title: 'Research and Development',
      content: `TIV treats research as a first-class activity — not a side project or a marketing exercise.

### Research Principles

TIV's research follows several principles:

- **Experimental** — research involves experiments, not just literature review
- **Measurable where possible** — results should be quantifiable when measurement is meaningful
- **Documented** — research processes and findings are documented for reproducibility
- **Reproducible where practical** — experiments should be reproducible by others
- **Clearly separated from production** — research results are not presented as product features

### Research Areas

TIV's research spans six areas:

- [Artificial Intelligence](/research) — autonomous development systems, codebase understanding
- [Networking](/research) — routing protocols, network architecture, edge infrastructure
- [Fiber Optics](/research) — optical networking, fiber transmission systems
- [Distributed Systems](/research) — consensus, replication, fault tolerance
- [Systems Engineering](/research) — operating systems, storage engines, low-level systems
- [Developer Infrastructure](/research) — tools and platforms for software development

### Publications

TIV publishes research findings through the [Research portal](/research) and the [Publications page](/research/publications). Publications are clearly labeled by status: Draft, Experimental, Published, or Superseded.

### Connection to Products

Research informs what TIV builds. M31A is the clearest example — it is a stable release product with ongoing research into advanced autonomous developer systems. TIV does not present research as production, but research directions often become product directions over time.`,
    },
    {
      id: 'long-term-direction',
      number: '16',
      title: 'Long-Term Direction',
      content: `TIV's long-term direction is to gradually work across more layers of infrastructure.

### The Infrastructure Stack

TIV's trajectory can be understood as working down the infrastructure stack:

1. **Software** — stable releases (OpenMail, Mercura, M31A, Octate)
2. **Internet Infrastructure** — current activities (domains, hosting, web infrastructure)
3. **Networking** — research and planning phase (routing, switching, network architecture)
4. **Optical Infrastructure** — research phase (fiber optics, optical networking)
5. **Integrated Infrastructure Systems** — long-term objective

### Direction, Not Claims

Each stage represents a direction, not a claim of current capability:

- **Software** is built and shipped (stable releases)
- **Internet Infrastructure** is partially operational (internal hosting, domains)
- **Networking** is in research and planning
- **Optical Infrastructure** is in research
- **Integrated Infrastructure Systems** is a long-term objective

TIV uses careful language to describe its direction:

- **Research direction** — areas being investigated
- **Long-term objective** — goals TIV is working toward
- **Exploration** — areas being explored but not yet committed to
- **Planned** — work that is intended but not yet started

### The Vision

The long-term vision is to build infrastructure that spans from software to physical infrastructure — giving people meaningful ownership and control across the full stack. This is a multi-year direction. TIV is patient. The goal is not to build everything at once, but to build each layer correctly before moving to the next.

This vision is not a promise. It is a direction. TIV may adjust its path as it learns, but the underlying philosophy — understandable, operable, ownable, dependable — remains constant.`,
    },
    {
      id: 'governance',
      number: '17',
      title: 'Governance',
      content: `TIV's governance is built on several organizational principles:

### Responsible Development

TIV is responsible for what it builds. This means:

- Building software that is safe to deploy and operate
- Clearly communicating the status and limitations of each project
- Not claiming capabilities that do not exist
- Addressing issues when they are identified

### Transparency

TIV publishes what it can without exposing what it shouldn't. Financial reports, governance information, security practices, and research findings are all published openly. See the [Transparency page](/transparency).

### Technical Accountability

TIV is technically accountable for its software. When issues are identified in TIV's software, they are addressed. Security vulnerabilities are disclosed and fixed. Bugs are tracked and resolved.

### Security

TIV takes security seriously. Security practices are documented on the [Security page](/security). TIV follows responsible disclosure and minimizes unnecessary exposure.

### Documentation

TIV documents its work. Software is documented, research is documented, and decisions are documented. Documentation is not optional — it is a requirement for ownable infrastructure.

### Sustainable Engineering

TIV prioritizes sustainable engineering over rapid growth. This means:

- Building systems that can be maintained over time
- Avoiding technical debt that accumulates faster than it can be repaid
- Prioritizing reliability over feature count
- Making decisions that are defensible over years, not quarters

TIV does not claim a formal board structure or governance framework beyond these principles. When formal governance structures are established, they will be documented here.`,
    },
    {
      id: 'risks-and-limitations',
      number: '18',
      title: 'Risks and Limitations',
      content: `TIV acknowledges the following risks and limitations. This section is important — a whitepaper that does not acknowledge uncertainty is not credible.

### Infrastructure Complexity

Infrastructure is inherently complex. Building systems that are simultaneously understandable, operable, ownable, and dependable is difficult. TIV may not succeed in satisfying all four principles for every project.

### Financial Constraints

TIV is a small organization with limited resources. Infrastructure development requires sustained investment. TIV may face financial constraints that limit the pace or scope of development.

### Research Uncertainty

Research is inherently uncertain. M31A, fiber optics research, and networking research may not produce the results TIV hopes for. Research directions may change based on findings. TIV does not claim that its research will succeed.

### Operational Risk

Operating infrastructure carries operational risk. Systems fail, data can be lost, and security vulnerabilities can be exploited. TIV takes steps to minimize these risks but cannot eliminate them.

### Security Risk

Any infrastructure that is connected to the internet is a target. TIV's security practices reduce risk but do not eliminate it. Security incidents are possible and would be disclosed if they occur.

### Scalability Challenges

Systems that work at small scale may not work at large scale. TIV's software is designed for self-hosting, which means it is designed for relatively small-scale deployment. Scaling to larger deployments may require significant additional work.

### Dependency on External Technology

TIV's software depends on external libraries, tools, and infrastructure. Vulnerabilities in these dependencies can affect TIV's software. TIV minimizes dependencies but cannot eliminate them.

### Commercialization Risk

TIV's economic model is unproven. The combination of open-source software and commercial services may not generate sufficient revenue to sustain operations. TIV may need to adjust its economic model over time.

### Key Limitation

This whitepaper describes vision, principles, research direction, and engineering philosophy. TIV has built and shipped stable software releases (OpenMail, Mercura, M31A, Octate) while continuing to invest in infrastructure and research. Readers should understand that infrastructure services and research directions are in development or research phases, not in production, unless explicitly stated.`,
    },
    {
      id: 'conclusion',
      number: '19',
      title: 'Conclusion',
      content: `TIV's objective is not to build software for its own sake, but to build infrastructure that can be understood, operated, owned, and improved.

The principles — understandable, operable, ownable, dependable — are not marketing language. They are engineering constraints that guide every decision. They are the reason TIV exists.

TIV's work spans software, internet infrastructure, networking, fiber optics, artificial intelligence, and systems engineering. These are not isolated business units. They are layers of one infrastructure philosophy — the philosophy that people should have meaningful control over the systems they depend on.

The long-term direction is to work across more layers of this stack, from software down to physical infrastructure. This is a multi-year direction. TIV is patient. The goal is to build each layer correctly, not to build everything at once.

**Build what should exist.**

This whitepaper will be updated as TIV's work progresses. The principles will remain constant; the technical details will evolve as capabilities develop and research advances.`,
    },
  ],
  references: [
    { label: 'OpenMail — Self-hosted email', href: '/work/openmail', type: 'internal' },
    { label: 'Mercura — Self-hosted code hosting', href: '/work/mercura', type: 'internal' },
    { label: 'M31A — Autonomous developer systems', href: '/work/m31a', type: 'internal' },
    { label: 'Octate — Terminal-native AI code review CLI', href: '/work/octate', type: 'internal' },
    { label: 'TIV Research Portal', href: '/research', type: 'internal' },
    { label: 'TIV Publications', href: '/research/publications', type: 'internal' },
    { label: 'TIV Transparency', href: '/transparency', type: 'internal' },
    { label: 'TIV Financial Reports', href: '/transparency/financials', type: 'internal' },
    { label: 'TIV Security', href: '/security', type: 'internal' },
    { label: 'TIV Open Source', href: '/open-source', type: 'internal' },
    { label: 'TIV Infrastructure', href: '/infrastructure', type: 'internal' },
  ],
  versions: [
    {
      version: '1.0',
      status: 'Published',
      publishedAt: 'September 2026',
      changeSummary: 'Initial publication. Covers TIV philosophy, software direction, internet infrastructure, networking, optical research, AI research, self-hosting, open source, security, economic model, financial transparency, research, long-term direction, governance, and risks.',
    },
  ],
};

export function getWhitepaper(): Whitepaper {
  return whitepaper;
}

export function getWhitepaperVersion(version: string): Whitepaper | undefined {
  if (version === whitepaper.version || version === `v${whitepaper.version}`) {
    return whitepaper;
  }
  return undefined;
}

export function getWhitepaperVersions() {
  return whitepaper.versions;
}
