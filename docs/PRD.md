# PRD v1.2: Count Loft, Free Calculator Tools Website (Phase 1)

> **Audience:** Google Antigravity (AI coding agent) and the human owner reviewing its work.
> **Status:** Ready to build. Research snapshot dated 31 Oct 2026.
> **Project name:** **Count Loft**. **Domain:** to be confirmed by the owner (prefer `count-loft.com`; if unavailable, check alternatives before registering). Use "Count Loft" for the site name, logo text, page titles, schema `name`/`publisher` and copy.
> **Owner language note:** The owner writes in Roman Urdu. All site copy, code and docs are in **English**. Urdu is Phase 2 (regional tools only).

---

## 0. How to Use This Document (Instructions for the Agent)

1. Read the whole PRD before writing code.
2. Build in the order of **Section 12 (Milestones)**. Do not start a later milestone until the earlier one meets its acceptance criteria.
3. Anything marked **[DECISION NEEDED]** or **[VERIFY]** must be surfaced to the owner. Do not guess and silently ship.
4. Never invent statistics, tax slabs, tariffs, nisab values or prices. Put such values in versioned data files (Section 7.3) with a `source` and `lastVerified` field.
5. All calculators must be covered by unit tests with the test vectors in Section 8 or equivalents you derive and document.
6. Write original code, design and copy. Do not copy competitor code, layout or text. Formulas themselves are not copyrightable; expression is.
7. Summarise each milestone when done: what was built, what was tested, what is open.

---

## 1. Executive Summary

Build a fast, trustworthy, ad-supported website of **42 free calculators** (Phase 1). Phase 2 (PDF and file tools) comes later and is **out of scope** now.

**Why this can work**
- Demand is proven. Semrush index estimates (relative ranking, not exact truth): "calculator" ≈ 24.9M searches/mo, BMI 6.12M, mortgage 5.0M, calorie 4.09M, percentage 2.24M.
- Incumbents are beatable on UX. Calculator.net is button + page reload. Omni Calculator is instant, but ads push the tool down the page.
- Winning formula: **instant results + prefilled defaults + charts + shareable result URL + clean fixed ad slots + deep, trustworthy content.**

**Regional wedge:** Pakistan / Gulf / Muslim-audience tools (FBR tax, electricity, zakat, gold, Hijri) bring loyal traffic. Global finance and health tools bring most of the revenue. Both are required.

**Realistic expectations (month 6)**

| Scenario | Visits / month | AdSense / month |
|---|---|---|
| Low (slow indexing, regional tools carry) | 5,000 – 15,000 | $10 – 40 |
| **Base** (3–6 tools in top 5; PK tax/electricity ranked 1–3) | 20,000 – 50,000 | $50 – 250 |
| High (1–2 head-term wins, US share 35%+) | 75,000 – 150,000 | $300 – 800 + affiliate |

Expect nothing meaningful before month 3. The best documented indie case reportedly took about 18 months to reach about 65,000 sessions/month (self-reported, unverified).

**Market reference (Semrush index, Sep 2026):** Calculator.net 67.51M visits/mo; Omni Calculator 15.18M visits/mo (3,938 tools, 14 categories); iLovePDF 325M visits/mo (Phase 2 market).

---

## 2. Goals, Non-Goals, Success Criteria

### 2.1 Goals
- Ship 42 launch-quality calculators across 6 categories.
- Pass Core Web Vitals with ads loaded.
- Get approved by AdSense and index all pages.
- Establish trust signals (named reviewers, sources, updated dates, disclaimers).

### 2.2 Non-Goals (Phase 1)
- No user accounts, no email gates, no login.
- No PDF or file tools, no mobile app, no public API.
- No Urdu or other translations. English only.
- No novelty tools (for example Love Calculator; it is a Phase 2 traffic candidate).
- No page-transition animations, parallax, count-up numbers, autoplay video ads, or heavy JS animation libraries.
- No sliders as the primary input.

### 2.3 Success Criteria (month 6)
- 42 tools live and indexed.
- 3–6 tools in Google top 5.
- PK tax and electricity tools in top 3 for their target queries.
- CWV green (p75) with ads active.

---

## 3. Users and Audience

- **Global English (US-first for revenue):** finance, health, math, construction.
- **Pakistan / Gulf / Muslim audience:** tax, electricity, zakat, gold, Hijri date, AC sizing.
- **Students:** GPA, fractions, standard deviation, grade tools (seasonal in school terms).
- **Intent:** "do", not "know". Users want their own numbers computed, which AI Overviews cannot replace.

---

## 4. Tech Stack and Architecture

| Area | Decision |
|---|---|
| Framework | **Astro** (preferred) or Next.js static export. **[DECISION NEEDED if you deviate]** |
| Language | TypeScript (strict) |
| Hosting | Cloudflare Pages (free tier: unlimited bandwidth, 500 builds/mo). Target cost $0–5/mo. |
| Rendering | Fully static generation. Every tool page is pre-rendered HTML plus a small client-side island. |
| Calculation | **100% client-side JS.** No user input is sent to a server. |
| Charts | Hand-written lightweight SVG, or a very small library. Must keep tool JS under budget. |
| Styling | CSS variables (design tokens), light and dark mode. Tailwind is acceptable if the CSS payload stays small. |
| Testing | Vitest for formula unit tests; Playwright for smoke and a11y checks; Lighthouse CI for performance gates. |
| Domain | About $12/year. |

**External data feeds (only 3 tools need them):**
1. Currency Converter: live FX rates.
2. Gold / Silver price: daily rate.
3. Electricity: tariff and monthly FPA data.

Fetch feeds at build time or via a scheduled job and store them as static JSON (see 7.3). Do not call third-party APIs from user browsers without a documented reason. **[DECISION NEEDED]** pick a free FX source and a gold-rate source and check their licensing and rate limits.

### 4.1 Suggested repository layout

```
/src
  /components      # shared UI: ToolShell, ResultCard, Chart, Toast, Accordion, AdSlot, Breadcrumbs
  /lib
    /calc          # pure, tested calculation functions (no DOM)
    /format        # number/currency/date formatting
    /url-state     # encode/decode inputs <-> query string
    /storage       # localStorage wrappers (recents, favourites, theme)
  /data            # versioned JSON: tax slabs, tariffs, nisab, FX, gold (each with source + lastVerified)
  /content         # per-tool content (MDX/MD): how-to, formula, examples, FAQ
  /pages           # routes per Section 6.4
  /styles
/tests
  /unit            # formula tests with fixed vectors
  /e2e             # Playwright
```

**Rule:** calculation logic lives in `/lib/calc` as pure functions. UI only calls them.

---

## 5. Design System and Interaction Standard

### 5.1 Core interaction rules (mandatory on every tool)

| Rule | Requirement |
|---|---|
| Prefilled defaults | Every tool loads with sensible defaults and a **result already calculated**. |
| Instant results | Recalculate on input with **100–200 ms debounce**. |
| Hybrid trigger | Also show a visible **Calculate** button (some users expect it). It must never be required. |
| Primary input | Always a typed number box. Sliders are optional, always paired with a linked number box. |
| Result change cue | Subtle highlight pulse of **200–300 ms** when the result changes. |
| Charts | Animated SVG (donut, gauge or line). Redraws as inputs change. |
| Step-by-step | Toggle/accordion showing formula substitution with the user's numbers. |
| Copy / share | "Copy result" with toast "Copied" for 1.5–2 s. Share link encodes inputs in the URL. |
| Units | Metric/imperial switching where relevant. |
| Print | Print stylesheet for results (essential for amortization schedules). |
| Persistence | `localStorage` only: recent tools, favourites, theme. No backend. |
| Dark mode | Supported at launch (differentiator). Respect `prefers-color-scheme`. |
| Accessibility | Visible focus states, `aria-live` result region, full keyboard use, labelled inputs, respect `prefers-reduced-motion`. |

### 5.2 Motion: do and do not

**Include:** instant recalculation, result pulse, animated charts, copy toast, accordion FAQ and advanced options, reserved skeleton boxes for ad slots.

**Skip:** page transitions, scroll-reveal, parallax, count-up numbers, card hover gimmicks, heavy animation libraries, video ads.

### 5.3 Performance budgets (launch gate, p75, ads loaded)

| Metric | Budget |
|---|---|
| LCP | ≤ 2.5 s |
| INP | ≤ 200 ms |
| CLS | ≤ 0.1 |
| JS per tool page | **< 100 KB** (gzip) |

CLS control: every ad slot has a fixed reserved height. Never place an ad above the tool.

---

## 6. Page Template, Content and SEO

### 6.1 Standard tool page (8 sections, in order)

1. **H1:** the exact keyword users search (for example "BMI Calculator"). Show author/reviewer name, sources and "Last updated" date.
2. **Tool** above the fold, prefilled, result already visible.
3. **Result summary + chart.** Large number, donut/gauge/line chart. Finance and health pages carry the disclaimer: *"Estimate only, not advice."*
4. **How-to steps** (3–5).
5. **Formula + worked examples** (2–3 real-number examples; step-by-step toggle).
6. **Example / lookup table** of common values (for long-tail and featured snippets).
7. **FAQ** (accordion) with real questions people ask.
8. **Related tools + breadcrumb.** 4–8 tool-level links (not category-level).

**Content minimum:** 800–1,500 words of unique, useful content per page. Tool-only pages are the number one cause of AdSense "low value content" rejection. Incumbents run 1,500–4,000+ words on head terms.

> Content is the bottleneck, not code. Planning figure: half to one day per launch-quality tool (formula + tests + content + FAQ + examples).

### 6.2 Structured data (every tool page)
- `WebApplication` + `FAQPage` + `BreadcrumbList` JSON-LD.
- A short "For AI Systems" citation block (what the tool computes, formula, last-updated date).

### 6.3 Site structure
- Homepage: search box (autocomplete) + category cards.
- Category hubs (with tool counts) → tool pages.
- Breadcrumbs everywhere, A-Z index, tool-level related-tools engine.
- Sitemaps split per category.
- Later (not Phase 1): "Last used" rail.

### 6.4 URL structure

```
/finance/mortgage-calculator
/health/bmi-calculator
/math/percentage-calculator
/construction/concrete-calculator
/converters/length-converter
/pakistan/income-tax-calculator
/islamic/zakat-calculator
```

Shareable result state is encoded as query parameters on the same URL. Canonical URL = the page **without** query params.

### 6.5 Programmatic variants
Allowed only when content is genuinely different (for example per-year tax pages, per-DISCO electricity, per-state paycheck). Do **not** clone the same tool with generic text (thin-content risk). Phase 1 ships one page per tool unless the owner approves a variant.

### 6.6 Trust and quality (YMYL)
- Named creator and reviewer per category (placeholder until owner supplies real, credentialed names; **do not fabricate people or credentials**). **[DECISION NEEDED]**
- Formula sources cited; "Last updated" on every tool; finance/health disclaimers.
- Pages: About, Contact, Privacy Policy, Terms, Corrections/Feedback.
- Per-tool Yes/No helpfulness vote and a "Requests & Suggestions" page.
- Honest privacy promise (true by design): *"Your numbers never leave your browser."*

---

## 7. Cross-Cutting Systems

### 7.1 Monetisation (Phase 1)
- AdSense with **3–4 reserved slots** per page. Never above the tool. Zero layout shift.
- **One affiliate module, finance tools only.**
- Later: Mediavine ladder, B2B custom calculators.
- Network thresholds (verify at launch): AdSense has no minimum; Journey by Mediavine ≈ 1,000 Tier-1 sessions/30 days; Mediavine ≈ $5,000 annual ad revenue; Raptive ≈ 25,000 pageviews/mo with 50%+ Tier-1 traffic.
- Revenue estimator: `visits × 1.3 pageviews/visit × RPM / 1000`. Example: 30,000 × 1.3 × $5 / 1000 = **$195/mo**.
- RPM planning bands: US finance $12–30; PK/IN-heavy blended $1–3; with 40%+ US share $5–15.

### 7.2 Analytics, consent, privacy
- GA4 + Search Console.
- Google-certified CMP for EEA traffic **before** enabling AdSense.
- `ads.txt` at approval time.
- Privacy policy states the client-side promise.

### 7.3 Data files (stale-data control)

All time-sensitive data lives in `/src/data/*.json`:

```json
{
  "name": "pk-income-tax-slabs",
  "taxYear": "2026-27",
  "source": "<url or official document>",
  "lastVerified": "YYYY-MM-DD",
  "data": { }
}
```

The UI must show "Data last updated: …" wherever these are used. Add a CI check that fails the build if `lastVerified` is older than a configured threshold for volatile data (gold: days; FPA: ~1 month; tax: per budget).

### 7.4 Accounts and storage
No accounts in Phase 1. `localStorage` for recents, favourites and theme only.

---

## 8. Reference Implementation and Test Vector

**Loan / EMI (also the interaction demo)**

- Formula: `P = L × r(1+r)^n / ((1+r)^n − 1)`, where `r = annualRate / 12`.
- Defaults: Loan $20,000, rate 6.0% yearly, term 48 months.
- Expected: monthly payment **$469.70**; total interest **$2,545.63**; total payment **$22,545.63**; principal share ≈ 88.7%, interest ≈ 11.3%.
- Cross-checked against CalculatorSoup on 31 Oct 2026.
- Edge cases to test: 0% rate (use `L / n`), very short and very long terms, large values, empty/invalid input (show a friendly message, never `NaN`).

Every other tool must ship with at least one documented test vector from a trusted independent source or a hand-computed example. **[VERIFY]** against a second source before launch.

---

## 9. Phase 1 Scope: 42 Calculators

Build order = list order. Slugs are suggestions.

### Tier 1 (build first; 14 tools)

| # | Tool | Category | Notes |
|---|---|---|---|
| 1 | Percentage Calculator | Math | Easiest head-term win; linked from every category. (Original PRD labelled this Finance; Math is a better fit. **[DECISION NEEDED]**) |
| 2 | BMI Calculator | Health | 6.12M/mo; the biggest health term. |
| 3 | Mortgage Calculator | Finance | 5.0M/mo; highest affiliate value. |
| 4 | Loan / EMI Calculator | Finance | One engine; EMI-labelled variant for IN/PK. |
| 5 | Calorie Calculator (BMR/TDEE built in) | Health | 4.09M/mo. |
| 6 | Compound Interest Calculator | Finance | Animated growth chart. |
| 7 | Age Calculator | Math | Evergreen; exact-date variant ≈ 246K/mo. |
| 8 | Scientific Calculator | Math | Landing tool for the generic "calculator" query. |
| 9 | Fraction Calculator | Math | Step-by-step; school demand. |
| 10 | GPA Calculator | Math | Semester seasonality. |
| 11 | Salary to Hourly Calculator | Finance | Base for paycheck variants. |
| 12 | Interest Calculator | Finance | Simple + compound in one tool. |
| 13 | Currency Converter | Converters | Needs live FX feed; the only API-dependent head tool. |
| 14 | Tip & Discount Calculator | Finance | Combined; Discount first for PK/Gulf. |

### Tier 2 (16 tools)

| # | Tool | Category | Notes |
|---|---|---|---|
| 15 | Retirement Calculator | Finance | High-value audience. |
| 16 | Investment / SIP Calculator | Finance | SIP-labelled for India; proven cluster. |
| 17 | Income Tax Calculator (US/Global) | Finance | Generic slabs from data file. |
| 18 | Amortization Calculator | Finance | Printable schedule; companion to loan tool. |
| 19 | BMR Calculator (standalone) | Health | Separate search intent from calorie tool. |
| 20 | Body Fat Calculator | Health | BMI cluster depth. |
| 21 | Pregnancy Due-Date Calculator | Health | Proven head cluster. |
| 22 | Ovulation / Ideal Weight Calculator | Health | Pregnancy companion. |
| 23 | Percentage Change Calculator | Math | Increase/decrease. |
| 24 | Square Footage / Area Calculator | Construction | "Area" ≈ 1.22M/mo; gateway to construction. |
| 25 | Concrete Calculator | Construction | Core of the Inch Calculator model. |
| 26 | Paint Calculator | Construction | Home-improvement evergreen. |
| 27 | Tile Calculator | Construction | Cluster companion. |
| 28 | Length Converter | Converters | Pure client-side. |
| 29 | Weight Converter | Converters | Converter cluster. |
| 30 | Temperature Converter | Converters | Completes the cluster. |

### Tier 3 (12 tools; regional and utility; time-sensitive)

| # | Tool | Category | Notes |
|---|---|---|---|
| 31 | Pakistan Income Tax (FBR 2026-27) | Regional | Real demand; yearly budget spike. Slabs from data file. **[VERIFY]** against official FBR sources. |
| 32 | Pakistan Electricity Bill (all DISCOs) | Regional | **One unified tool** with a DISCO selector. Residential tariff is uniform nationwide. Monthly FPA data. Sanity check from research (unverified): 300 units on LESCO ≈ Rs 13,267 (Jul-2026 FPA). |
| 33 | Zakat Calculator | Islamic | 2.5% above nisab; gold/silver/cash; nisab auto-check. Strong Ramadan seasonality. |
| 34 | Gold Price Calculator (Pakistan) | Regional | Weight × purity × today's tola rate + making charges. Daily data. |
| 35 | Silver / Zakat-on-Gold Variant | Islamic | Reuses engines from 33/34. |
| 36 | Hijri to Gregorian Converter | Islamic | Include "Islamic date today" and Ramadan/Eid countdowns. |
| 37 | AC Tonnage / BTU Calculator | Regional | Demand unproven; cheap to build. |
| 38 | Date / Days-Between Calculator | Math | Age/date cluster depth. |
| 39 | Time / Hours Calculator | Math | ≈ 550K/mo cluster (index). |
| 40 | Random Number Generator | Math | Cheap utility. |
| 41 | Standard Deviation Calculator | Math | Proven on Omni's most-popular list. |
| 42 | Grade / Test Calculator | Math | Student traffic. |

**Timing:** Tier 3 should be live before Ramadan (zakat) and the June/July Pakistan budget season (tax).

**Not in scope (no convincing demand evidence found):** driving-age and visa calculators; standalone Hajj calculator.

### 9.1 Open decisions inside the scope
- **[DECISION NEEDED] Zakat nisab method:** gold-based or silver-based. Sources disagree. Pick one, cite it, and explain it on the page. Reference from research (index): Pakistan Ministry of Religious Affairs notified Rs 503,529 for Ramadan 2026.
- **[DECISION NEEDED] Gold price source:** daily update is an operational commitment. Reference (index): 24K ≈ Rs 408,136/tola on 31 Oct 2026.

---

## 10. Per-Tool Definition of Done

A tool is "done" only when all are true:

- [ ] Pure calculation function in `/lib/calc` with unit tests and at least one documented test vector.
- [ ] Prefilled defaults, instant result, visible Calculate button, copy toast, shareable URL.
- [ ] Unit switching where relevant.
- [ ] Animated SVG chart (where it makes sense) and a step-by-step toggle.
- [ ] 800–1,500 words of original content: how-to, formula, 2–3 worked examples, lookup table, FAQ (min. 5 real questions).
- [ ] Disclaimer on finance/health tools.
- [ ] JSON-LD (`WebApplication`, `FAQPage`, `BreadcrumbList`), breadcrumb, 4–8 related tools.
- [ ] Reserved ad-slot placeholders with fixed height (no layout shift).
- [ ] Keyboard accessible; `aria-live` result; `prefers-reduced-motion` respected; works in dark mode.
- [ ] Page JS < 100 KB gzip; Lighthouse/CWV budgets pass.
- [ ] "Last updated" date and source(s) shown.

---

## 11. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| AdSense "low value content" rejection (top failure of tool sites) | 800–1,500 words unique content per page; trust pages; no thin clones. |
| Stale data (FBR slabs yearly, FPA monthly, gold daily) | Versioned data files with `lastVerified`; CI staleness check; visible update dates. |
| YMYL liability (health, finance) | Disclaimers, cited sources, named reviewers, correction channel. |
| Seasonality (zakat in Ramadan; math/GPA in school season) | Publish Tier 3 early; diversify the portfolio. |
| AI Overviews reduce head-term CTR (Ahrefs, Dec 2025: about −58% for position 1; Pew, Jul 2025: 8% vs 15% clicks) | Halve old CTR expectations; rely on portfolio breadth and "do" intent. |
| Low PK ad RPM (CPC PK $0.05–0.50 vs US $1–5) | Regional tools for traffic and loyalty; US/global finance and health for revenue. |
| Copying competitors | Write original code, design and content. |

---

## 12. Milestones and Acceptance Criteria

| Milestone | Scope | Acceptance |
|---|---|---|
| **M0: Foundation** | Repo, design system, `ToolShell`, page template, JSON-LD, SEO basics, dark mode, ad-slot skeletons, trust pages, CI (tests + Lighthouse). | Loan Calculator reference page passes Section 8 test vector and CWV budgets. |
| **M1: Tier 1** | Tools 1–14 content-complete. | All pass Section 10 checklist. |
| **M2: Tier 2** | Tools 15–30 + AdSense application readiness (CMP, ads.txt, policy pages). | All pass checklist; AdSense application submitted. |
| **M3: Tier 3** | Tools 31–42 (regional/utility), data pipelines for FX/gold/electricity. | Data files verified; staleness CI active; all pass checklist. |
| **M4: Compounding** | Internal linking, Search Console–driven fixes, user-requested tools. | Month-6 success criteria in Section 2.3. |

Indicative human timeline: Month 1 = M0 + Tier 1; Month 2 = Tier 2 + AdSense application; Months 2–3 = Tier 3 (before budget season/Ramadan); Months 4–6 = compounding.

---

## 13. Future Phases (Out of Scope; Do Not Build Now)

- **Phase 2:** PDF and file tools (Merge, Compress, PDF↔Word, Split, JPG↔PDF, Rotate, Page Numbers, Watermark), client-side first (pdf-lib / PDF.js, "files never leave your device"); embed programme; Urdu localisation (regional tools only, human-reviewed); B2B builds; PWA for top-10 tools; Love Calculator; AI result-explanation experiment.
- **Phase 3:** accounts (only if a real retention feature justifies them), calculator API, mobile app (web-first is the right call; Omni's Android app has only about 17k installs).

---

## 14. Open Questions (Unverified in Research)

- Exact search volumes beyond Semrush snippets. Treat as relative ranking.
- Demand for AC tonnage and standalone Hajj tools: unproven, not disproven.
- Real-device mobile behaviour, service workers, competitors' analytics/CMP stacks, competitors' live CWV field scores.
- OnlineCalcAI revenue (claimed $8–10k/mo) and dev.to case-study numbers are self-reported.
- Zakat nisab method (see 9.1).
- Re-verify tax slabs, tariffs and ad-network thresholds at launch.

---

## 15. Source Legend and Key Sources

**Evidence labels used in the original research**
- **Verified live:** actually opened and tested on 31 Oct 2026.
- **Index:** from search-index / Semrush-type sources.
- **Claimed:** a founder's or site's own claim, not independently verified.

**Verified live:** calculator.net (+ BMI page), omnicalculator.com (+ BMI, mortgage), calculatorsoup.com loan calculator, onlinecalcai.com (+ mortgage).

**Index:** Semrush overviews (calculator.net, omnicalculator.com, smallpdf.com, ilovepdf.com); statvoo.com; omnicalculator.com/omni-by-the-numbers; regional sources (hisaabkaro.com, taxaccountant.pk, oraan.com, taxcalculatorpk.com, pakhisaab.com, pakzakat.com, goldpricepk.org, goldratesdaily.com, awqatly.com); Ahrefs AI Overviews study; dev.to practitioner case studies; monetisation sources (revenuelab.fyi, desijugad.co.in, cpowerpak.com, outrank.so, involve.me, tools-bundle.com, appbrain.com).

*This PRD is a research snapshot (31 Oct 2026). Re-verify volatile numbers at launch.*


---

# Count Loft — Antigravity Ready-to-Paste Prompt Pack

Use these prompts in order. Keep the workspace open at the project root. The project rules in `.agents/rules/count-loft-rules.md` and the skill in `.agents/skills/ui-ux-pro/SKILL.md` should already be in place.

## Prompt 0 — Read the PRD and plan M0 (do not code)

```text
Read docs/PRD.md fully, including all milestones, acceptance criteria, test vectors,
and open decisions. Do not write or modify any code yet.

Give me:
1. Your implementation plan for Milestone M0 (Foundation).
2. The exact folder and file structure you intend to create.
3. The key technical decisions you recommend, including Astro vs. Next.js.
4. Any questions or decisions you need from me before implementation.
5. Any conflicts, ambiguities, missing requirements, or risky assumptions in the PRD.

Follow the project rules. Do not begin M1 or any later milestone.
```

## Prompt 1 — Implement M0 Foundation

```text
Re-read docs/PRD.md, especially Sections 4, 5, 6, 7, 8, 10, and 12.
Implement Milestone M0 (Foundation) only. Follow the ui-ux-pro skill for every UI task.

Build the project foundation, shared design system, reusable tool-page template,
SEO and JSON-LD basics, dark mode, reserved ad-slot skeletons, trust pages,
and the Loan / EMI Calculator as the reference page.

The reference calculator must pass the Section 8 test vector:
$20,000 principal, 6% annual interest, 48 months.
Expected monthly payment: $469.70.
Also test total interest ($2,545.63), total payment ($22,545.63),
zero-interest behaviour, invalid inputs, and edge cases.

Keep calculation logic in pure functions under /src/lib/calc and write unit tests.
Do not invent reviewer names, credentials, rates, statistics, or other volatile data.
Run the tests and available checks. Then tell me:
- what changed,
- what tests and checks ran and their results,
- how to preview the site locally,
- what remains open,
- and whether M0 acceptance criteria are met.

Do not start M1 until I approve.
```

## Prompt 2 — Review M0 before moving on

```text
Do a review of the completed M0 against docs/PRD.md Section 12 and the
per-tool Definition of Done in Section 10.

Do not add new features. Inspect the implementation and report:
1. Acceptance criteria that pass.
2. Acceptance criteria that fail or are incomplete.
3. Calculation and test coverage gaps.
4. Accessibility, responsive layout, dark-mode, SEO, and performance issues.
5. Any invented, unsupported, or unverified claims or data.

Fix only clear M0 defects, run the relevant tests again, and show the changed files.
Do not begin M1.
```

## Prompt 3 — Tier 1, batch 1 (Tools #1–#4)

```text
Read docs/PRD.md Sections 6, 8, 9, 10, and 12 before starting.
Implement Tier 1 tools #1–#4 only:
1. Percentage Calculator
2. BMI Calculator
3. Mortgage Calculator
4. Loan / EMI Calculator variants, reusing the approved M0 calculation engine.

Follow the ui-ux-pro skill and the project's Definition of Done.
Write unit tests first, using independent test vectors. Document the source or
show the hand calculation for every test vector. Do not invent data or sources.

For each page, create an original content draft of 800–1,500 words with how-to
steps, formula, worked examples, lookup table, and at least five FAQs.
Clearly mark every health or finance claim that needs fact-checking.
Include the required disclaimer on health and finance tools.

Run unit tests and relevant smoke/accessibility checks. Summarise what changed,
what passed, what failed, and what still needs human review.
Do not start tools #5–#14 or Tier 2.
```

## Prompt 4 — Tier 1, batch 2 (Tools #5–#8)

```text
Read docs/PRD.md Sections 6, 9, 10, and 12.
Implement Tier 1 tools #5–#8 only:
5. Calorie Calculator (with BMR/TDEE)
6. Compound Interest Calculator
7. Age Calculator
8. Scientific Calculator

Follow the ui-ux-pro skill and the project's Definition of Done.
Write unit tests before implementation, with independent test vectors and
documented sources or hand calculations. Mark health/finance claims requiring
fact-checking. Do not invent statistics, medical guidance, or credentials.

Each page needs original 800–1,500-word draft content, required FAQs, examples,
formula explanations, metadata, accessibility, responsive behaviour, and dark mode.
Run tests and report results. Do not start tools #9–#14 or Tier 2.
```

## Prompt 5 — Tier 1, batch 3 (Tools #9–#11)

```text
Read docs/PRD.md Sections 6, 9, 10, and 12.
Implement Tier 1 tools #9–#11 only:
9. Fraction Calculator
10. GPA Calculator
11. Salary to Hourly Calculator

Follow the ui-ux-pro skill and the project's Definition of Done.
Write unit tests first with independent test vectors and documented sources
or hand calculations. Clearly identify assumptions and any content requiring
fact-checking. Do not invent education-system rules, salary data, or statistics.

Write original 800–1,500-word draft content per page, including formula,
worked examples, lookup table, and at least five FAQs.
Run tests and report results. Do not start tools #12–#14 or Tier 2.
```

## Prompt 6 — Tier 1, batch 4 (Tools #12–#14)

```text
Read docs/PRD.md Sections 4, 6, 7, 9, 10, and 12.
Implement Tier 1 tools #12–#14 only:
12. Interest Calculator (simple and compound)
13. Currency Converter
14. Tip & Discount Calculator

Follow the ui-ux-pro skill and the project's Definition of Done.
Write unit tests first with independent test vectors and documented sources
or hand calculations.

For Currency Converter, do not select or use an FX provider until you have
presented its licensing, rate limits, update frequency, and reliability for my
approval. Keep rates in a versioned data file with source and lastVerified.
Do not expose API secrets in browser code or invent rates.

Write original 800–1,500-word draft content per page. Mark claims requiring
fact-checking. Run tests and report results. Do not begin Tier 2.
```

## Prompt 7 — Tier 1 integration and quality review

```text
Audit Tier 1 tools #1–#14 against docs/PRD.md Section 10 and M1 acceptance
criteria in Section 12.

Do not start Tier 2. Check:
- independent unit-test vectors and calculation correctness,
- defaults and instant recalculation,
- visible Calculate button, copy result, and shareable URL,
- charts and step-by-step explanations where appropriate,
- 800–1,500 words of original useful content per tool,
- FAQs, sources, disclaimers, and last-updated dates,
- JSON-LD, breadcrumbs, related tools, and canonical URLs,
- keyboard accessibility, aria-live, reduced motion, and dark mode,
- mobile layout and performance budgets,
- ad-slot reserved heights and layout shift.

Run all unit, smoke, accessibility, build, and available Lighthouse checks.
List every failure and fix only Tier 1 issues. Do not claim a check passed
unless you actually ran it. Finish with an M1 acceptance report and wait for approval.
```

## Prompt 8 — Git checkpoint after an approved milestone

```text
Prepare a Git checkpoint for the milestone I have approved.

First show:
1. `git status`
2. A concise summary of `git diff`
3. The files that will be included
4. Any generated files, secrets, environment files, or unrelated changes that
   should not be committed.

Do not delete files, reset, force-push, or overwrite history.
Do not commit until I explicitly approve the exact staged changes.
After approval, stage only the intended files and create a descriptive commit.
Then report the commit hash and working-tree status.
```

## Prompt 9 — GitHub repository and push preparation

```text
Check the current Git repository and explain the steps needed to publish it
to a new GitHub repository.

Before any push, show the remote URL, branch name, commit to be pushed, and
whether any secrets or private files are present. Never publish API keys,
tokens, passwords, `.env` files, or personal data.

Do not create a public repository or push anything until I explicitly approve.
Do not use force push.
```

## Prompt 10 — Cloudflare Pages deployment preparation

```text
Read docs/PRD.md and inspect the actual project configuration.
Prepare Count Loft for Cloudflare Pages deployment.

Verify rather than assume:
- framework and build command,
- output directory (Astro commonly uses `dist`, but inspect this project),
- Node.js version and package manager,
- required environment variables,
- redirects, headers, and sitemap behaviour,
- whether the build succeeds locally.

Do not deploy or change DNS yet. First give me the exact Cloudflare Pages
settings and any required configuration changes. Do not expose secrets.
Wait for my approval before deployment.
```

## Prompt 11 — Post-deployment smoke test

```text
After I approve deployment and provide the deployed URL, perform a production
smoke-test checklist for Count Loft.

Check the homepage, category navigation, every published calculator route,
mobile layout, dark mode, query-string sharing, copy-result interaction,
calculation output, metadata, canonical URLs, sitemap, robots.txt, and trust pages.
Check browser console/network errors where available.

Do not claim to have tested a page you could not access. Report each check as
Pass, Fail, or Not tested, with evidence and recommended fixes.
```

## Prompt 12 — Tier 2 and Tier 3 gate

```text
Do not begin Tier 2 or Tier 3 automatically.

First inspect the current milestone status against docs/PRD.md Section 12.
Tell me which acceptance criteria remain incomplete and what approval is needed
to proceed. For Tier 2 or Tier 3, propose batches of no more than 3–4 tools.
Wait for my explicit instruction naming the next batch.
```

---

# Suggested workspace files

## `.agents/rules/count-loft-rules.md`

```markdown
# Count Loft project rules
- Always read docs/PRD.md before starting any task. The PRD is the source of truth.
- Site name is Count Loft. All site copy, code and comments are in English.
- Never invent tax slabs, tariffs, prices, nisab values, statistics, reviewer names or credentials.
  Put volatile data in /src/data/*.json with `source` and `lastVerified`.
- All calculation logic lives in /src/lib/calc as pure functions with unit tests.
- Follow the ui-ux-pro skill for every UI task.
- Work milestone by milestone (PRD Section 12). Do not start the next milestone unprompted.
- Before running destructive commands (delete, force push, reset), ask me first.
- Do not commit, push, deploy, or change DNS without my explicit approval.
- After each task, summarise what changed, what was tested, and what is still open.
```

## `.agents/skills` reminder

```text
Place the UI/UX skill at:
.agents/skills/ui-ux-pro/SKILL.md

Workspace skill path:
<workspace-root>/.agents/skills/<skill-folder>/

Global Antigravity skill path:
~/.gemini/antigravity/skills/
```

## Suggested project structure

```text
count-loft/
├── docs/
│   └── PRD.md
└── .agents/
    ├── rules/
    │   └── count-loft-rules.md
    └── skills/
        └── ui-ux-pro/
            └── SKILL.md
```

## Important owner decisions from the PRD

- Confirm Astro (preferred) or approve a justified alternative.
- Approve the visual direction before implementation.
- Supply real creator/reviewer names and credentials, or approve a truthful no-reviewer presentation.
- Approve an FX source and gold-rate source after licensing and rate-limit review.
- Choose gold-based or silver-based zakat nisab method before the Zakat Calculator is built.
- Verify Pakistan tax slabs, electricity tariffs, FPA values, and gold rates against official/current sources before launch.

