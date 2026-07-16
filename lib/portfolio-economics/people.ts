// ─── Person Model & Contributors ───────────────────────────────────────────
// DO NOT invent people. Populate only actual known contributors.
// Types: Founder, Employee, Contractor, Contributor, Researcher, Advisor.

import type { Person, ContributorType } from './types';

const knownContributors: Person[] = [
  {
    id: 'eshan-roy',
    name: 'Eshan Roy',
    role: 'Founder',
    organization: 'Tonmoy Infrastructure and Vision',
    type: 'Founder',
    active: true,
    notes: 'Founder of TIV. Primary systems architect and developer across software, networking, and research.',
  },
];

let peopleStore: Person[] = [...knownContributors];

export function getContributors(): Person[] {
  return [...peopleStore];
}

export function getContributor(id: string): Person | undefined {
  return peopleStore.find((p) => p.id === id);
}

export function validateContributor(person: Partial<Person>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (!person.id) errors.push('Person ID is required.');
  if (!person.name) errors.push('Name is required.');
  if (!person.role) errors.push('Role is required.');
  if (!person.organization) errors.push('Organization is required.');

  const validTypes: ContributorType[] = [
    'Founder',
    'Employee',
    'Contractor',
    'Contributor',
    'Researcher',
    'Advisor',
  ];
  if (!person.type || !validTypes.includes(person.type)) {
    errors.push(`Person type must be one of: ${validTypes.join(', ')}`);
  }
  return { isValid: errors.length === 0, errors };
}

export function registerContributor(person: Person): void {
  const validation = validateContributor(person);
  if (!validation.isValid) {
    throw new Error(`Invalid person record: ${validation.errors.join('; ')}`);
  }
  const idx = peopleStore.findIndex((p) => p.id === person.id);
  if (idx >= 0) {
    peopleStore[idx] = person;
  } else {
    peopleStore.push(person);
  }
}
