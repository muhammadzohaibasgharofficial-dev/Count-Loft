/**
 * Count Loft — /llms.txt (llms.txt standard: https://llmstxt.org)
 * Generated from the calculator registry at build time so it never goes stale.
 */
import type { APIRoute } from 'astro';
import { CALCULATORS, CATEGORIES_CONFIG } from '@data/calculators';
import { FAMILIES, liveFamilies, familyToolCount } from '@data/families';
import { SITE_URL, SITE_NAME, absoluteUrl } from '@lib/seo/site';

export const GET: APIRoute = () => {
  const lines: string[] = [];
  lines.push(`# ${SITE_NAME}`, '');
  lines.push(
    `> ${SITE_NAME} (${SITE_URL}) is a free collection of ${CALCULATORS.length} online calculators and converters for finance, health, math, construction, unit conversion, Pakistan-specific needs and Islamic calculations. Every calculator runs in the browser, shows its formula with a worked example, and does not store the numbers entered.`,
    ''
  );
  const calc = liveFamilies().find((f) => f.id === 'calculators');
  lines.push('## Tool families', '');
  for (const f of liveFamilies()) {
    if (f.href) lines.push(`- [${f.name}](${absoluteUrl(f.href)}): ${familyToolCount(f)} free ${f.toolNoun}. ${f.description}`);
  }
  const planned = FAMILIES.filter((f) => f.status === 'coming-soon').map((f) => f.name);
  if (planned.length) lines.push(`- Planned (not yet available): ${planned.join(', ')}`);
  lines.push('');
  lines.push('## Calculator categories', '');
  for (const cat of CATEGORIES_CONFIG) {
    lines.push(`- [${cat.name}](${absoluteUrl('/' + cat.slug)}): ${cat.description}`);
  }
  lines.push('');
  for (const cat of CATEGORIES_CONFIG) {
    lines.push(`## ${cat.name} calculators`, '');
    for (const c of CALCULATORS.filter((x) => x.category === cat.slug)) {
      lines.push(`- [${c.name}](${absoluteUrl(c.href)}): ${c.description}`);
    }
    lines.push('');
  }
  lines.push('## About and policies', '');
  if (calc?.href) {
    lines.push(`- [About the Calculators](${absoluteUrl(calc.href + '/about')}): what the calculators cover and how they are checked`);
    lines.push(`- [How to use the calculators](${absoluteUrl(calc.href + '/how-to-use')}): picking a tool, reading results, embedding, reporting errors`);
  }
  lines.push(`- [About ${SITE_NAME}](${absoluteUrl('/about')}): who runs the site and how calculators are verified`);
  lines.push(`- [Corrections](${absoluteUrl('/corrections')}): how to report and track errors`);
  lines.push(`- [Privacy Policy](${absoluteUrl('/privacy')})`);
  lines.push(`- [Terms of Service](${absoluteUrl('/terms')})`);
  lines.push(`- [Contact](${absoluteUrl('/contact')})`, '');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
