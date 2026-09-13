import { validatePeople } from '@/lib/schemas';

export type PersonType =
  | 'Founder'
  | 'Director'
  | 'Board Member'
  | 'Executive'
  | 'Advisor'
  | 'Research Lead'
  | 'Engineering Lead';

export type PersonStatus = 'active' | 'inactive' | 'former';

export interface PersonLink {
  label: string;
  href: string;
  type: 'github' | 'website' | 'orcid' | 'linkedin' | 'email' | 'huggingface';
}

export interface PersonWork {
  name: string;
  description: string;
  category: 'Founder Work' | 'TIV Project' | 'Open Source Work' | 'Research' | 'AI/ML Work';
  href?: string;
}

export interface PersonTimelineMilestone {
  title: string;
  description: string;
  date?: string;
}

export interface Person {
  slug: string;
  name: string;
  handle: string;
  role: string;
  organization: string;
  type: PersonType;
  status: PersonStatus;
  public: boolean;
  photo?: string;
  summary: string;
  areas: string[];
  links: PersonLink[];
  selectedWork: PersonWork[];
  timeline: PersonTimelineMilestone[];
  startDate?: string;
  endDate?: string;
  github?: string;
  website?: string;
  orcid?: string;
  linkedin?: string;
  huggingface?: string;
}

const rawPeople: Person[] = [
  {
    slug: 'eshan-roy',
    name: 'Eshan Roy',
    handle: 'eshanized',
    role: 'Founder',
    organization: 'Tonmoy Infrastructure and Vision',
    type: 'Founder',
    status: 'active',
    public: true,
    photo: '/eshanized.png',
    summary:
      'Building infrastructure that should exist. Eshan works across systems engineering, software infrastructure, Linux, developer tooling, autonomous software, and open-source technology.',
    areas: [
      'Systems Programming',
      'Linux',
      'Developer Infrastructure',
      'Autonomous Software',
      'Open Source',
      'AI/ML Research',
    ],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/eshanized',
        type: 'github',
      },
      {
        label: 'Hugging Face',
        href: 'https://huggingface.co/eshanized',
        type: 'huggingface',
      },
      {
        label: 'Website',
        href: 'https://eshanized.is-a.dev/',
        type: 'website',
      },
      {
        label: 'ORCID',
        href: 'https://orcid.org/0009-0007-1261-6805',
        type: 'orcid',
      },
    ],
    selectedWork: [
      {
        name: 'OpenMail',
        description: 'Self-hosted email and communication infrastructure.',
        category: 'TIV Project',
        href: '/projects/openmail',
      },
      {
        name: 'Mercura',
        description: 'Self-hosted code hosting built around Mercurial.',
        category: 'TIV Project',
        href: '/projects/mercura',
      },
      {
        name: 'M31A',
        description: 'Autonomous developer and AI infrastructure platform.',
        category: 'TIV Project',
        href: '/projects/m31a',
      },
      {
        name: 'M31Genesis',
        description: 'Native M31 causal language model for agentic coding research (Experimental research checkpoint).',
        category: 'Research',
        href: '/projects/m31genesis',
      },
      {
        name: 'M31 Q // For programmers',
        description: 'Interactive demonstration Space for programmers on Hugging Face.',
        category: 'AI/ML Work',
        href: '/projects/m31-q',
      },
      {
        name: 'Snigdha OS',
        description: 'Linux ecosystem and operating-system work.',
        category: 'Open Source Work',
      },
      {
        name: 'TIV',
        description: 'Infrastructure, software products, and engineering systems.',
        category: 'TIV Project',
        href: '/about',
      },
      {
        name: 'Octate',
        description: 'A TIV software project.',
        category: 'TIV Project',
        href: '/projects/octate',
      },
    ],
    timeline: [],
    github: 'https://github.com/eshanized',
    huggingface: 'https://huggingface.co/eshanized',
    website: 'https://eshanized.is-a.dev/',
    orcid: 'https://orcid.org/0009-0007-1261-6805',
  },
];

const people: Person[] = validatePeople(rawPeople);

export function getPeople(): Person[] {
  return people.filter((p) => p.public);
}

export function getPerson(slug: string): Person | undefined {
  return people.find((p) => p.slug === slug && p.public);
}

export function getFounder(): Person | undefined {
  return people.find((p) => p.type === 'Founder' && p.public);
}

export function getLeadership(): Person[] {
  return people.filter(
    (p) =>
      p.public &&
      p.status === 'active' &&
      (p.type === 'Founder' ||
        p.type === 'Director' ||
        p.type === 'Executive' ||
        p.type === 'Engineering Lead' ||
        p.type === 'Research Lead' ||
        p.type === 'Advisor')
  );
}
