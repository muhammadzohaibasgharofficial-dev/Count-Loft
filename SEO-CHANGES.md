# SEO-CHANGES.md — Count Loft (https://countloft.site)

> **Read this first — what was and was NOT verified**
> The environment used to make these changes had **no network access**, so `npm install` could not run.
> That means **`npm run build`, Lighthouse CI and the link crawl were NOT executed.** I did only:
> syntax checks of every changed script/frontmatter, a registry cross-check (42 tools, 7 categories, no unknown internal hrefs,
> `count-loft.com` = 0 occurrences in source), and a test of `scripts/verify-site.mjs` on a tiny fake `dist`.
> **Please run `npm install && npm run build && npm run verify` and send me any error — I will fix it.**
> The research file `next-level-seo-resources.md` was **not attached** to the upload, so Section A–D could not be read; work follows your task list.

## Placeholders you must fill
| What | Where | Current |
|---|---|---|
| Google Search Console verification value | `src/lib/seo/analytics.ts` → `SEARCH_CONSOLE_VERIFICATION` | `''` (off) |
| Cloudflare Web Analytics token (cookieless) | `src/lib/seo/analytics.ts` → `CLOUDFLARE_WA_TOKEN` | `''` (off) |
| **IndexNow key** | `public/3dc37d8c72a9122169f8782f866652ea.txt` and `scripts/indexnow.mjs` | `3dc37d8c72a9122169f8782f866652ea` |
| Real content / review dates | `src/data/content-dates.mjs` | all `2026-10-31` (the date already in your pages) |
| Mailbox `contact@countloft.site` | create it at your email host | not verified to exist |

When you turn analytics on, add one sentence about aggregate, cookieless page-view counting to `src/pages/privacy.astro` (not done automatically).

## Decisions / things I did differently or flagged
- **Trailing-slash format: NO trailing slash** (`/finance/loan-calculator`; only the root is `/`). Canonicals (normalized in `SEOHead`), sitemap URLs (normalized in `serialize`) and internal links all use it.
- **Task 5 (llms.txt):** delivered as `src/pages/llms.txt.ts`, which outputs `/llms.txt` at build from the registry (7 categories + 42 URLs, absolute). Same URL as a `public/` file, but it can never go stale.
- **Task 2 (SearchAction):** a real search page now exists (`/search?q=`), linked in header + mobile nav, `noindex`, not in sitemap. Note: to my knowledge Google retired the sitelinks search box in late 2024, so the schema is harmless but may bring no SERP feature. Please double-check Google's current docs.
- **Task 6:** the "Fact-checked" line says the *Count Loft Team* reviewed method and formulas on the date in `content-dates.mjs`. Only keep it if that is true; change the wording in `ToolShell.astro` otherwise. Shown on Finance, Health and Pakistan pages; Pakistan is not marked "YMYL disclaimer" but gets the review line.
- **Task 7 (content depth):** NOT fully met. The template now has: tool → "What this calculator does" → formula + worked example → examples table → numbered how-to → "Common uses" → FAQ for all 42 pages, but pages are still roughly the length of their existing content, **not 1,500–3,000 words**. I did not pad pages with unverifiable text.
- **Task 9 (embed):** `/embed/<category>/<tool>` for all 42 tools, same page component, tool-only layout, `noindex`, "Powered by Count Loft" link, not in sitemap (`public/_headers` also sets `X-Robots-Tag`). **Needs a browser test**: calculators' inline scripts should work inside embeds, but I could not run it.
- **Task 10:** no `<img>` tags exist in the site (only SVG icons / OG image), so no alt text needed. Three heading jumps fixed (h4 → h3 in loan, fraction, grade pages). 3-click reachability is checked by `npm run verify`.
- Not done: HowTo schema (per your rule), ratings/reviews, any tracking cookies.

## Changes, file by file
**Config / technical**
- `astro.config.mjs` — sitemap `filter` (drops `/404`, `/search`, `/embed/*`) and `serialize` (single URL format + real `<lastmod>` from `content-dates.mjs`); `site` is now a `SITE` constant (`https://countloft.site`, unchanged value).
- `src/data/content-dates.mjs` (+ `.d.mts`) — NEW, single editable place for published/modified/reviewed dates; sitemap lastmod = tool's modified date, other pages one consistent `SITE_LASTMOD`.
- `src/lib/seo/analytics.ts` — NEW, config-driven (empty).
- `src/components/seo/SEOHead.astro` — Search Console meta (only if set); canonical trailing-slash normalization.
- `src/components/layout/BaseLayout.astro` — Cloudflare Web Analytics beacon only if token set.
- `public/<key>.txt`, `INDEXNOW.md`, `scripts/indexnow.mjs`, `npm run indexnow` — IndexNow.
- `src/pages/llms.txt.ts` — llms.txt. `public/_headers` — noindex headers for embed/search.
- `src/pages/search.astro`, `Header.astro`, `MobileNav.astro` — search page + links. `src/lib/seo/jsonld.ts` — SearchAction on WebSite; `datePublished` / `dateModified` on every WebApplication (match visible dates).

**Content template**
- `src/components/tool/ToolShell.astro` — new section order, visible Published / Last updated / Fact-checked lines, embed mode, embed button, related block.
- `src/data/tool-content.ts` — NEW: intro + 4 use cases for each of 42 tools (explanatory only, no statistics/prices/claims).
- `src/pages/about.astro` — "Who runs Count Loft", "How we verify our calculators", link to Corrections; replaced the earlier claim about "software engineers… accessibility specialists" with neutral wording.

**Linking / embed**
- `src/components/tool/RelatedTools.astro` — all category siblings padded to ≥10 links via neighbouring categories + "Popular calculators" (8). Plus the 4 curated links each page already has.
- `src/components/layout/EmbedLayout.astro`, `src/components/tool/EmbedPanel.astro`, `src/pages/embed/[...slug].astro`.
- `src/pages/{finance/loan,math/fraction,math/grade}-calculator.astro` — heading level fix.

**Earlier round (unchanged):** domain `count-loft.com` → `countloft.site`, robots.txt (AI crawlers allowed), `/sitemap.xml`, 404 page, favicon/OG image, homepage counts.

## Verification
| Check | Result |
|---|---|
| `npm run build` | **NOT RUN** (no network) |
| First 10 sitemap URLs + lastmod | **NOT RUN** — `npm run verify` prints them after a build |
| `count-loft.com` in source | 0 occurrences (checked); in `dist` → `npm run verify` checks |
| Lighthouse CI thresholds | **NOT RUN** (`npm run build && npm run test:lighthouse`). Added content is text-only, no new scripts beyond a few lines |
| Registry vs content | 42 tools, 42 content entries, 7 categories, no unknown internal hrefs |

Run after every deploy: `npm run build && npm run verify` (broken links, orphans, depth ≤ 3, one h1, canonicals, sitemap format, embed noindex) and `npm run indexnow`.

## Assistant verification pass (2026-11-05, after delivery)
The receiving side ran the full pipeline the builder could not: `npm install` + `npm run build` (99 pages, zero errors) + `npm run verify`. Two fixes were applied during that pass:
- `src/components/layout/Footer.astro` — footer column headings changed h3 → p (they caused h1 → h3 heading jumps on /404 and /search; footer labels are not document headings).
- `src/components/tool/ToolShell.astro` — embed mode now includes the same visually-hidden h2 ("<title> Calculator Interface") as the normal layout, fixing h1 → h3 jumps on embed pages.
After these fixes: **`npm run verify` → All checks passed ✓** (99 pages, 55 sitemap URLs all with lastmod, max depth 2, old-domain occurrences 0). Placeholders (Search Console, Cloudflare WA token) still empty as delivered; IndexNow key unchanged.
