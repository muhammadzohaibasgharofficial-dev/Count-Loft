/**
 * Count Loft — Content dates (ONE editable place).
 *
 * Edit the dates below when you genuinely review or change a calculator.
 * These drive: visible "Last updated" / "Reviewed" lines, JSON-LD
 * datePublished / dateModified, and <lastmod> in sitemap.xml.
 *
 * Format: YYYY-MM-DD. Keys are the page paths (no trailing slash).
 * Any tool not listed falls back to DEFAULT_DATES.
 */

/** Used for every page that has no entry below (home, hubs, trust pages, etc.). */
export const SITE_LASTMOD = '2026-10-31';

export const DEFAULT_DATES = {
  published: '2026-10-31', // first publication of the calculator page
  modified: '2026-10-31',  // last time the content/formula was changed
  reviewed: '2026-10-31',  // last time the methodology was checked (YMYL pages)
};

/** Per-page overrides. Example:
 *  '/finance/loan-calculator': { published: '2026-10-31', modified: '2026-11-04', reviewed: '2026-11-04' },
 */
export const CONTENT_DATES = {
  // '/finance/loan-calculator': { modified: '2026-11-04', reviewed: '2026-11-04' },
};

/** Normalise a path/URL to "/a/b" (no trailing slash, root stays "/"). */
export function normalizePath(input) {
  let p = String(input).replace(/^https?:\/\/[^/]+/i, '').split(/[?#]/)[0] || '/';
  if (!p.startsWith('/')) p = '/' + p;
  if (p.length > 1) p = p.replace(/\/+$/, '');
  return p || '/';
}

export function getDates(path) {
  return { ...DEFAULT_DATES, ...(CONTENT_DATES[normalizePath(path)] || {}) };
}

/** Sitemap lastmod for any URL: tool pages use their modified date, others the site date. */
export function getLastmod(path) {
  const key = normalizePath(path);
  return CONTENT_DATES[key] ? getDates(key).modified : SITE_LASTMOD;
}
