# REDESIGN-CHANGES.md — Count Loft hub-and-spoke redesign

Built on top of `Count-Loft-seo-v2-verified.zip`. No framework change, no file renamed or moved.

## What was and was NOT verified (read first)
| Check | Result |
|---|---|
| `npm run build` | **Passed** — 102 pages (was 99: +3 new content pages), zero errors |
| `npm run verify` | **All checks passed ✓** — 102 pages, 58 sitemap URLs all with `<lastmod>`, old-domain occurrences 0 |
| `count-loft.com` in `src`, `public`, `scripts`, `dist` | **0 files** (grep -rIl) |
| Frozen-SEO diff vs. the original v2 build (built side by side) | 42/42 tool pages and 42/42 embed pages: JSON-LD, title/meta/canonical, headings and visible text **identical**. 7/7 category pages: JSON-LD, meta, headings identical; visible text differs only by the new sibling-category chip row. |
| Lighthouse (perf/SEO ≥ 0.90, LCP ≤ 2.5 s, CLS ≤ 0.1) | **NOT RUN.** The sandbox cannot download a browser, so `npm run test:lighthouse` could not execute. Please run `npm run build && npm run test:lighthouse` and send me any failure. |
| Visual check in a browser (screenshots, responsive, dark/light) | **NOT DONE** for the same reason. The layout is written but unseen by me; expect small polish fixes after your first look. |

Budget protection instead of measurement: one 23 KB self-hosted Fraunces subset (woff2, `font-display: swap`, preloaded on the homepage only); body text uses the system font stack; no images, no JS libraries; the only new JS is ~20 lines (mega-menu toggle) and ~15 lines (directory filter). CSS grew 33 KB → 40 KB raw. Motion is transform/opacity only and the existing global reduced-motion rule disables it. Homepage HTML grew 26 KB → 80 KB raw (about 12 KB gzipped) because all 42 tools are rendered as real crawlable links in the directory.

## Hero headline options
1. **A home for free online tools.** ← used
2. Every free tool you need, in one calm place.
3. Free tools that work right in your browser.

Reason: option 1 says what the platform is, stays true as families are added, and fits the hero's tight measure at large size.

## Files by phase
**Phase 1 — tokens, header, footer**
- `src/styles/tokens.css` (changed): cream/ink palette, dark theme re-toned to ink, `--font-display`, larger radii, 1200 px container, `--shadow-lg`. Brand blue unchanged.
- `src/styles/design.css` (new), `global.css` (import added): font-face, serif headings, squircle icon mark, chips, pill CTAs, section primitives.
- `public/fonts/fraunces-latin.woff2` (new): self-hosted subset.
- `src/data/families.ts` (new): families data model (see below). `src/components/ui/Icon.astro` (new): one inline-SVG icon set.
- `src/components/layout/Header.astro` (rewritten): Tools mega-menu from data, About, How to Use, Search, "All Tools" button. Keeps the `Count Loft Home` aria-label.
- `Footer.astro` (changed): added Tools column; footer labels remain `<p>`. `MobileNav.astro` (changed): added All Tools, Calculators, About, How to Use. `BaseLayout.astro` (changed): two named slots (`before-header`, `head`); nothing else.

**Phase 2 — homepage**
- `src/pages/index.astro` (rewritten): sections 0.1–0.8 in the requested order. Title, description, WebSite and Organization JSON-LD are unchanged.
- `src/components/ui/Directory.astro` (new): filter mode (chips, no reload, works without JS) and grouped mode.

**Phase 3 — family hub**
- `src/pages/calculators/index.astro`, `about.astro`, `how-to-use.astro` (new), `src/components/layout/FamilyArticle.astro` (new). Each has breadcrumb JSON-LD, one H1, canonical via the existing head.
- `src/pages/llms.txt.ts` (changed): "Tool families" section and links to the two new pages. Sitemap needed no change: the existing filter/serialize picks the 3 pages up with `<lastmod>`.

**Phase 4 — categories:** `CategoryHub.astro` restyled (icon mark, serif title, sibling chips, cards). URLs, titles, descriptions, h1, lead text and JSON-LD unchanged.

**Phase 5 — ToolShell:** only the `<style>` block changed (verified: lines 1–192, i.e. all markup and script, are byte-identical to v2). Calculator components untouched.

**Deleted:** nothing. `scripts/verify-site.mjs` was **not** modified and passes as is.

## URL diff (sitemap, before 55 → after 58)
```
> https://countloft.site/calculators
> https://countloft.site/calculators/about
> https://countloft.site/calculators/how-to-use
```
Removed or changed URLs: 0. (`diff` of the sorted `<loc>` lists, before vs after.)

## Data-driven growth
Add one entry to `FAMILIES` in `src/data/families.ts` (status `live`, categories, tools) plus its tool pages. The header menu, homepage cards, directory, counts, proof strip, footer data and llms.txt family list all recompute. Two small manual follow-ups remain: the footer "Tools" links and the fan on the hero are hand-listed, and the hub URL pattern `/calculators/*` is specific to this family.

## Things I did differently or did not do — with reasons
1. **Homepage FAQ did not exist.** The prompt says "keep the existing homepage FAQ", but v2's homepage had none. I wrote a new 5-question FAQ (plain, no statistics) with FAQPage JSON-LD. Delete it if you did not want new schema on `/`.
2. **"How to Use" in the global nav** points to `/calculators/how-to-use`, because no global How-to page exists and only three new URLs were allowed. If you add more families, you will want a platform-level page.
3. **Optional CSS marquee of tool names: skipped.** It would duplicate 42 names as extra text for little value; the fan carries the hero.
4. **Hero fan is `aria-hidden`** (decorative; the same families appear in the Tools section as real content).
5. **Search index:** `/search` lists tools, not editorial pages, so the 3 new pages are not in it by design; they are reachable from header, footer and homepage.
6. **Uppercase mono eyebrow labels** are used on a few sections because your brief asks for them. Easy to remove in `design.css` (`.eyebrow`).
7. **Related-tools block (`RelatedTools.astro`)** was not restyled individually; it inherits the new cards, radii and type. Styling it further is a safe follow-up.
8. **Dark theme:** the redesign re-tones the existing dark theme to ink; the hero stays dark in both themes. Contrast was chosen from the existing AA-checked pairs but I did not run an automated contrast audit.
9. Calculator pages' meta line still says "Count Loft Team reviewed…" as in v2 (unchanged); confirm that is true, as noted in SEO-CHANGES.md.

## Assistant verification pass (2026-11-05, after delivery)
Independently re-run on the receiving side: `npm install` + `npm run build` → **102 pages, zero errors**; `npm run verify` → **All checks passed ✓** (58 sitemap URLs, all with `<lastmod>`, old-domain occurrences 0). Sitemap URL diff vs the verified v2 build: **exactly the 3 allowed additions** (/calculators, /calculators/about, /calculators/how-to-use), zero removed or changed. Spot checks passed: hero search form posts to /search?q=; family card links to /calculators; coming-soon ghost cards present without links; homepage + hub directories list all tools (36 URLs match the `*calculator` pattern + 6 converter/generator-named tools = 42); tool-page canonical and JSON-LD types identical to v2; embed pages still noindex with the Powered-by link; llms.txt carries the new families section. The new homepage FAQ (5 questions) was read — all honest, no invented statistics. **Still unverified anywhere: Lighthouse scores and the visual/responsive look** (no Chrome available in either sandbox) — to be checked on the live site via PageSpeed Insights immediately after deploy.
