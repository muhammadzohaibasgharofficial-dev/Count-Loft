/**
 * Count Loft — Measurement config (privacy-first, cookieless).
 *
 * Leave a value as '' to keep that feature OFF. Nothing is rendered until filled.
 *
 * 1) GOOGLE SEARCH CONSOLE
 *    Search Console → Add property (URL prefix) → HTML tag method.
 *    Copy ONLY the content="…" value of the google-site-verification tag.
 *
 * 2) CLOUDFLARE WEB ANALYTICS (cookieless, no user tracking, no fingerprinting)
 *    Cloudflare dashboard → Web Analytics → Add site → copy the token
 *    from the JS snippet (data-cf-beacon='{"token": "…"}').
 */
export const SEARCH_CONSOLE_VERIFICATION = ''; // ← PASTE Search Console verification value here
export const CLOUDFLARE_WA_TOKEN = '';         // ← PASTE Cloudflare Web Analytics token here

export const analyticsEnabled = CLOUDFLARE_WA_TOKEN.trim() !== '';
