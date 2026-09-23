export type NavScreen = 'accueil' | 'methodologie' | 'structures' | 'contact';

export interface ProcessStep {
  id: string;
  name: string;
  structure: 'ILJC' | 'Transition' | 'JEECE' | 'Livraison';
  color: string;
  summary: string;
  details: string[];
  deliverables: string[];
}

export interface SynergyNode {
  id: string;
  owner: 'ILJC' | 'JEECE';
  side: 'left' | 'right';
  title: string;
  tagline: string;
  description: string;
  points: string[];
  deliverable: string;
  icon: string;
  color: string;
}

export interface SynergyBranch {
  badge: string;
  title: string;
  color: string;
}

export interface CaseStudy {
  id: string;
  label: string;
  client: string;
  objective: string;
  approach: string;
  result: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface StructureFact {
  value: string;
  label: string;
}

export interface Structure {
  id: 'iljc' | 'jeece';
  name: string;
  shortName: string;
  legalLine: string;
  founded: string;
  school: string;
  website: string;
  intro: string[];
  facts: StructureFact[];
  expertises: { title: string; text: string }[];
  quality: string[];
  partnersLabel: string;
  partners: string[];
  offices: { city: string; address: string }[];
  email: string;
  phone: string;
  phoneHref: string;
}
