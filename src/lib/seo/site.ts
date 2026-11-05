/**
 * Count Loft — Site-wide constants.
 * Keep SITE_URL in sync with `site` in astro.config.mjs.
 */
export const SITE_URL = 'https://countloft.site';
export const SITE_NAME = 'Count Loft';
export const CONTACT_EMAIL = 'contact@countloft.site';

/** Turn a site-relative path ("/math/age-calculator") into an absolute URL. */
export function absoluteUrl(path: string = '/'): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
