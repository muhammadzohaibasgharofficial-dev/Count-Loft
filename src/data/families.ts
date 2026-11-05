/**
 * Count Loft — Tool families (hub-and-spoke data model).
 *
 * To add a family later (e.g. PDF Tools): add one entry to FAMILIES with
 * status 'live', its categories and its tools. Homepage, header menu, footer,
 * directory and counts all render from this file — no template edits needed.
 * The Calculators family reads the existing CALCULATORS registry (source of truth).
 */
import { CALCULATORS, CATEGORIES_CONFIG, type CalculatorMeta } from './calculators';

export interface FamilyCategory {
  slug: string;
  name: string;
  description: string;
  href: string;
  icon: string;
  count: number;
  tools: CalculatorMeta[];
}

export interface Family {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  /** Hub URL. Coming-soon families have none and are never rendered as links. */
  href?: string;
  status: 'live' | 'coming-soon';
  toolNoun: string;
  categories: FamilyCategory[];
}

/** One icon per category slug (names resolve in components/ui/Icon.astro). */
const CATEGORY_ICONS: Record<string, string> = {
  finance: 'finance', health: 'health', math: 'math', construction: 'construction',
  converters: 'converters', pakistan: 'pakistan', islamic: 'islamic',
};

const calculatorCategories: FamilyCategory[] = CATEGORIES_CONFIG.map((c) => {
  const tools = CALCULATORS.filter((t) => t.category === c.slug);
  return {
    slug: c.slug, name: c.name, description: c.description, href: `/${c.slug}`,
    icon: CATEGORY_ICONS[c.slug] ?? 'calculator', count: tools.length, tools,
  };
});

export const FAMILIES: Family[] = [
  {
    id: 'calculators',
    name: 'Calculators',
    tagline: 'Money, health, math, building and more.',
    description: 'Free online calculators and converters that show their formula and a worked example.',
    icon: 'calculator',
    href: '/calculators',
    status: 'live',
    toolNoun: 'calculators',
    categories: calculatorCategories,
  },
  {
    id: 'pdf-tools',
    name: 'PDF Tools',
    tagline: 'Merge, split and tidy PDFs.',
    description: 'Planned: PDF tools that run in your browser.',
    icon: 'pdf', status: 'coming-soon', toolNoun: 'tools', categories: [],
  },
  {
    id: 'image-tools',
    name: 'Image Tools',
    tagline: 'Resize, compress and convert.',
    description: 'Planned: image tools that run in your browser.',
    icon: 'image', status: 'coming-soon', toolNoun: 'tools', categories: [],
  },
];

export const liveFamilies = () => FAMILIES.filter((f) => f.status === 'live');
export const comingSoonFamilies = () => FAMILIES.filter((f) => f.status === 'coming-soon');
export const familyToolCount = (f: Family) => f.categories.reduce((n, c) => n + c.count, 0);

export interface DirectoryTool extends CalculatorMeta {
  familyId: string;
  categoryName: string;
}

/** Every tool on the platform, from every live family. */
export function allTools(): DirectoryTool[] {
  return liveFamilies().flatMap((f) =>
    f.categories.flatMap((c) => c.tools.map((t) => ({ ...t, familyId: f.id, categoryName: c.name })))
  );
}

export const totalToolCount = () => allTools().length;
export const liveFamilyCount = () => liveFamilies().length;
export const getFamily = (id: string) => FAMILIES.find((f) => f.id === id);
