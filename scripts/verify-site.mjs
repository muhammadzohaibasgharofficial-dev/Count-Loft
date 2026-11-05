/**
 * Count Loft — post-build SEO/link verification.
 * Usage:  npm run build && npm run verify
 * Checks the built output in ./dist:
 *   - the old hyphenated domain appears 0 times
 *   - sitemap: absolute countloft.site URLs, one trailing-slash format, <lastmod> on every URL,
 *     no embed/search/404 URLs
 *   - every HTML page: exactly one <h1>, canonical (same URL format), logical heading order, <img alt>
 *   - embed pages are noindex
 *   - every internal link resolves to a built file (no 404s)
 *   - every content page is reachable within 3 clicks from the homepage (no orphans)
 * Exits with code 1 if any check fails.
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const SITE = 'https://countloft.site';
const OLD_DOMAIN = new RegExp('count-' + 'loft\\.com', 'gi'); // built in pieces so this file itself never contains the old domain
const errors = [];
const warn = [];
const fail = (m) => errors.push(m);

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}
const exists = async (p) => { try { return (await stat(p)).isFile(); } catch { return false; } };

const files = await walk(DIST);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const textExt = new Set(['.html', '.xml', '.txt', '.js', '.css', '.json', '.svg', '.md']);

// 1) old domain
let oldDomainHits = 0;
for (const f of files) {
  if (!textExt.has(extname(f))) continue;
  const t = await readFile(f, 'utf8');
  oldDomainHits += (t.match(OLD_DOMAIN) || []).length;
}
if (oldDomainHits) fail(`old domain appears ${oldDomainHits} time(s) in dist`);

// helper: file path -> URL path
const toUrl = (f) => {
  let u = f.slice(DIST.length - 1).replace(/\\/g, '/');
  u = u.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  if (u.length > 1) u = u.replace(/\/$/, '');
  return u || '/';
};
const pages = new Map(); // urlPath -> html
for (const f of htmlFiles) pages.set(toUrl(f), await readFile(f, 'utf8'));

// 2) sitemap
let sitemapUrls = [];
if (await exists(join(DIST, 'sitemap-0.xml'))) {
  const x = await readFile(join(DIST, 'sitemap-0.xml'), 'utf8');
  for (const m of x.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = (m[1].match(/<loc>([^<]+)<\/loc>/) || [])[1];
    const lastmod = (m[1].match(/<lastmod>([^<]+)<\/lastmod>/) || [])[1];
    sitemapUrls.push({ loc, lastmod });
  }
} else fail('dist/sitemap-0.xml missing');
if (!(await exists(join(DIST, 'sitemap.xml')))) fail('dist/sitemap.xml missing');
for (const { loc, lastmod } of sitemapUrls) {
  if (!loc.startsWith(SITE)) fail(`sitemap URL not on ${SITE}: ${loc}`);
  if (loc !== `${SITE}/` && loc.endsWith('/')) fail(`sitemap URL has trailing slash: ${loc}`);
  if (!lastmod) fail(`sitemap URL without lastmod: ${loc}`);
  if (/\/(embed|search|404)(\/|$)/.test(loc)) fail(`sitemap contains noindex URL: ${loc}`);
}

// 3) per-page checks + link graph
const links = new Map();
for (const [url, html] of pages) {
  const body = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
  const isEmbed = url.startsWith('/embed/');
  const h1 = (body.match(/<h1[\s>]/gi) || []).length;
  if (h1 !== 1) fail(`${url}: ${h1} <h1> elements (expected 1)`);
  const heads = [...body.matchAll(/<h([1-6])[\s>]/gi)].map((m) => +m[1]);
  for (let i = 1; i < heads.length; i++) if (heads[i] > heads[i - 1] + 1) { fail(`${url}: heading jumps h${heads[i - 1]} → h${heads[i]}`); break; }
  for (const m of body.matchAll(/<img\b[^>]*>/gi)) if (!/\balt=("[^"]+"|'[^']+')/i.test(m[0])) fail(`${url}: <img> without meaningful alt`);

  const robots = (html.match(/<meta name="robots" content="([^"]+)"/i) || [])[1] || '';
  if (isEmbed && !/noindex/i.test(robots)) fail(`${url}: embed page is not noindex`);
  if (!isEmbed && url !== '/404') {
    const canon = (html.match(/<link rel="canonical" href="([^"]+)"/i) || [])[1];
    if (!canon) fail(`${url}: missing canonical`);
    else {
      const expected = url === '/' ? `${SITE}/` : `${SITE}${url}`;
      if (canon !== expected) fail(`${url}: canonical ${canon} != ${expected}`);
    }
  }

  const found = new Set();
  for (const m of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)) {
    let h = m[1].replace(/&amp;/g, '&');
    if (!h.startsWith('/') || h.startsWith('//')) continue;
    h = h.split('#')[0].split('?')[0];
    if (!h) continue;
    if (h !== '/' && h.endsWith('/')) warn(`${url}: internal link with trailing slash ${h}`);
    found.add(h.length > 1 ? h.replace(/\/$/, '') : h);
  }
  links.set(url, found);
}

// 4) broken links
const publicFileExists = async (u) => (await exists(join(DIST, u))) || (await exists(join(DIST, u, 'index.html'))) || (await exists(join(DIST, u + '.html')));
const seenBroken = new Set();
for (const [url, set] of links) {
  for (const l of set) {
    if (pages.has(l)) continue;
    if (!(await publicFileExists(l)) && !seenBroken.has(url + l)) { seenBroken.add(url + l); fail(`${url}: broken internal link → ${l}`); }
  }
}

// 5) click depth from home (embed/404 excluded)
const depth = new Map([['/', 0]]);
const queue = ['/'];
while (queue.length) {
  const u = queue.shift();
  for (const l of links.get(u) || []) if (pages.has(l) && !depth.has(l)) { depth.set(l, depth.get(u) + 1); queue.push(l); }
}
const content = [...pages.keys()].filter((u) => !u.startsWith('/embed/') && u !== '/404');
for (const u of content) {
  if (!depth.has(u)) fail(`orphan page (not reachable from home): ${u}`);
  else if (depth.get(u) > 3) fail(`${u}: ${depth.get(u)} clicks from home (max 3)`);
}

// report
console.log(`Pages: ${pages.size} | sitemap URLs: ${sitemapUrls.length} | max depth: ${Math.max(...depth.values())}`);
console.log('First 10 sitemap URLs:');
for (const s of sitemapUrls.slice(0, 10)) console.log(`  ${s.loc}  lastmod=${s.lastmod}`);
console.log(`Old-domain occurrences: ${oldDomainHits}`);
warn.slice(0, 20).forEach((w) => console.log('WARN', w));
if (errors.length) { console.log(`\n${errors.length} problem(s):`); errors.forEach((e) => console.log(' ✗', e)); process.exit(1); }
console.log('\nAll checks passed ✓');
