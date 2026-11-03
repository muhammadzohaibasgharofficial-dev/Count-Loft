---
name: ui-ux-pro
description: Design and implement accessible, fast, consistent, professional UI/UX for Count Loft, a free online calculator website (42 calculators, 6 categories) built with Astro, strict TypeScript, and Cloudflare Pages. Use this skill whenever the task involves designing, building, reviewing, or restyling any visible part of the site, including calculator pages, input forms, result panels, charts, formula and step-by-step sections, navigation, breadcrumbs, category pages, FAQ sections, dark mode, responsive layout, accessibility, or UI performance. Use it even when the user does not say "UI" or "design" explicitly, for example "add a calculator page", "fix the mobile layout", "make results clearer", or "improve the look of the homepage".
---

# Count Loft UI/UX Pro

This skill guides an AI coding agent in designing and implementing the user interface of **Count Loft**, a free online calculator tools website with **42 calculators across 6 categories**.

Project stack (do not change it):

- Astro framework
- TypeScript (strict mode)
- Cloudflare Pages deployment
- Vitest for unit tests
- Playwright for browser tests
- Lighthouse CI for performance tests

---

## 0. Mandatory First Steps

Before writing or changing any UI code, always do the following:

1. **Read `docs/PRD.md`** completely. It is the source of truth for product requirements, calculator list, categories, features, and acceptance criteria.
2. **Read `.agents/rules/count-loft-rules.md`**. It contains the project rules you must follow.
3. **Inspect the existing code** (layouts, components, global styles, design tokens, existing calculator pages) before creating anything new. Reuse what already exists.
4. If a file above is missing or unreadable, say so clearly, continue with this skill's defaults, and mark any assumption as an assumption in your final summary.

### Precedence of instructions

When instructions conflict, follow this order:

1. Explicit user request in the current task
2. `.agents/rules/count-loft-rules.md`
3. `docs/PRD.md`
4. Existing design system and components already in the codebase
5. This skill

Values in this skill (colors, sizes, spacing, font names) are **recommended defaults**. If the PRD, the rules, or the existing design tokens define something different, **follow the project, not this skill**.

### Hard boundaries

- Do not invent product requirements, calculators, categories, or features that are not in the PRD.
- Do not change the technology stack. Do not add frameworks, UI libraries, or CSS frameworks that the project does not already use.
- Do not modify application logic (calculation formulas, routing, build or deploy config) unless the task explicitly requires it.
- Do not add a new dependency without a strong justification. See section 11.
- Keep changes scoped to the task. Do not refactor unrelated files.

---

## 1. Design Philosophy

Count Loft must look **modern, professional, premium, and trustworthy**. People use calculators to make real decisions (money, health, math, conversions), so the interface must feel precise and reliable.

### Principles

1. **Clarity over decoration.** Every element must help the user enter values, understand results, or navigate. If it does not, remove it.
2. **Result first.** The calculation result is the most important element on the page. It must be the most visually prominent element after the page title.
3. **Calm and clean.** Generous whitespace, a restrained palette, one primary accent color, no visual noise.
4. **Consistency.** The same component must look and behave the same on every calculator page. All 42 calculators must feel like one product.
5. **Trust signals.** Show units, formulas, assumptions, and steps. Never hide how a result was calculated.
6. **Speed.** The UI must feel instant. Prefer lightweight, static-first rendering.
7. **Accessible by default.** Accessibility is part of the design, not an add-on.

### Avoid

- Heavy gradients, glassmorphism, neon glows, large shadows, parallax, autoplay animation.
- Pop-ups, modals, or banners that block the calculator.
- Decorative images or icons that add weight but no meaning.
- Mixing multiple visual styles (for example rounded and sharp corners, or several accent colors) on the same page.
- Layout shift while the page loads or when results appear.

---

## 2. Design Tokens and Color System

Define all colors, spacing, radii, and typography as **CSS custom properties** (design tokens) in one shared global stylesheet. Components must use tokens, never hard-coded values. Check whether tokens already exist and extend them rather than duplicating.

### Recommended light theme

| Token | Purpose | Recommended value |
|---|---|---|
| `--color-bg` | Page background | `#F8FAFC` |
| `--color-surface` | Cards, panels, inputs | `#FFFFFF` |
| `--color-surface-muted` | Subtle sections, table stripes | `#F1F5F9` |
| `--color-border` | Default borders | `#E2E8F0` |
| `--color-border-strong` | Input borders, dividers | `#CBD5E1` |
| `--color-text` | Primary text | `#0F172A` |
| `--color-text-muted` | Secondary text, hints | `#475569` |
| `--color-primary` | Primary actions, links, focus | `#2563EB` |
| `--color-primary-hover` | Primary hover | `#1D4ED8` |
| `--color-primary-contrast` | Text on primary | `#FFFFFF` |
| `--color-secondary` | Secondary accent (charts, tags) | `#0F766E` |
| `--color-success` | Success state | `#15803D` |
| `--color-warning` | Warning state | `#B45309` |
| `--color-danger` | Error state | `#B91C1C` |
| `--color-focus-ring` | Focus outline | `#2563EB` |

### Recommended dark theme

| Token | Recommended value |
|---|---|
| `--color-bg` | `#0B1220` |
| `--color-surface` | `#111827` |
| `--color-surface-muted` | `#1A2333` |
| `--color-border` | `#263247` |
| `--color-border-strong` | `#3B4A63` |
| `--color-text` | `#F1F5F9` |
| `--color-text-muted` | `#A3B1C6` |
| `--color-primary` | `#60A5FA` |
| `--color-primary-hover` | `#93C5FD` |
| `--color-primary-contrast` | `#0B1220` |
| `--color-secondary` | `#2DD4BF` |
| `--color-success` | `#4ADE80` |
| `--color-warning` | `#FBBF24` |
| `--color-danger` | `#F87171` |
| `--color-focus-ring` | `#93C5FD` |

### Color rules

- **Contrast (WCAG 2.2 AA minimum):** 4.5:1 for normal text, 3:1 for large text (18.66px bold or 24px regular and up), and 3:1 for UI component boundaries, icons, and focus indicators. Verify contrast for both themes. Do not assume.
- **Never use color alone** to convey meaning. Pair error and success colors with an icon and text.
- Use one primary accent color. Use the secondary color sparingly (charts, small highlights).
- Do not use pure black (`#000`) on pure white (`#FFF`) for body text in large areas. Use the token values.
- Chart colors must be distinguishable for color-blind users (use patterns, labels, or direct value labels, not only hue).

---

## 3. Typography

### Font strategy

- Prefer a **system font stack** or a single self-hosted variable font. This is the fastest and the most reliable for Lighthouse CI.
- Recommended system stack: `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`.
- If a web font is used (for example Inter), self-host it, use `font-display: swap`, subset it, load only the weights needed (400, 500, 600, 700), and preload only the critical file. Do not load fonts from third-party hosts unless the project already does.
- Use **tabular numbers** for calculator inputs and results: `font-variant-numeric: tabular-nums;` so digits align.
- Use a monospace stack only for formulas or code-like snippets, if at all.

### Type scale (mobile-first, fluid where useful)

| Role | Size | Weight | Line height |
|---|---|---|---|
| Page title (`h1`) | 1.75rem to 2.5rem (use `clamp`) | 700 | 1.2 |
| Section title (`h2`) | 1.375rem to 1.75rem | 600 | 1.3 |
| Subsection (`h3`) | 1.125rem to 1.25rem | 600 | 1.35 |
| Body | 1rem (never below 16px) | 400 | 1.6 |
| Label | 0.9375rem to 1rem | 500 | 1.4 |
| Hint / helper text | 0.875rem | 400 | 1.5 |
| Input text | 1rem minimum (prevents iOS zoom on focus) | 400 | 1.4 |
| Primary result value | 2rem to 3rem | 700 | 1.1 |

### Typography rules

- Exactly **one `h1` per page**. Do not skip heading levels.
- Keep paragraph line length around **60 to 75 characters** (`max-width: 70ch` for article text).
- Use `rem`, not `px`, for font sizes so user font settings are respected.
- Never disable text zoom. The layout must work at 200% zoom.
- Left-align body text. Avoid justified text and all-caps for long text.

---

## 4. Layout and Spacing

### Spacing scale

Use a **4px base scale** through tokens: `--space-1: 0.25rem`, `--space-2: 0.5rem`, `--space-3: 0.75rem`, `--space-4: 1rem`, `--space-5: 1.5rem`, `--space-6: 2rem`, `--space-7: 3rem`, `--space-8: 4rem`. Do not use arbitrary pixel values.

### Radius, border, and elevation

- Radius tokens: small `6px`, medium `10px`, large `14px`. Use the same radius family everywhere.
- Prefer **1px borders** over shadows to separate surfaces. Use at most one subtle shadow level for elevated elements (for example dropdown menus).

### Page container

- Centered container, `max-width` about `72rem` (1152px) for general pages and about `48rem` to `64rem` for the calculator and article column.
- Horizontal padding: `1rem` on mobile, `1.5rem` on tablet, `2rem` on desktop.

### Mobile-first rules

- Write base CSS for mobile, then enhance with `min-width` media queries.
- Recommended breakpoints (adjust to existing project values if defined): `640px` (large phone / small tablet), `768px` (tablet), `1024px` (desktop), `1280px` (wide desktop).
- Prefer CSS Grid and Flexbox with `gap`. Avoid fixed widths and absolute positioning for layout.
- Use `min-height: 100dvh` (with a fallback) instead of `100vh` where full height is needed.

### Visual hierarchy on a calculator page

1. Breadcrumbs (small, muted)
2. `h1` calculator title and one-sentence description
3. **Calculator card** (inputs and primary result)
4. Formula, steps, and detailed breakdown
5. Charts (where required)
6. Educational content, examples, FAQ
7. Related calculators and category links

---

## 5. Calculator UI Design

Every calculator page must follow one **standard page template** so all 42 calculators feel the same. Build or reuse shared Astro components rather than copying markup. Check the PRD for the exact required sections and features of each calculator and for the calculator list and categories.

### 5.1 Calculator card structure

```
<section aria-labelledby="calculator-title">
  <form novalidate>
    <fieldset> inputs (grouped logically) </fieldset>
    <actions: Calculate (if needed), Reset>
  </form>
  <div role="region" aria-live="polite"> result panel </div>
</section>
```

- **Desktop (about 1024px and up):** two columns. Inputs on the left, result panel on the right (sticky if it helps). 
- **Mobile and tablet:** single column. Inputs first, result panel directly below. After a calculation on mobile, make sure the result is visible (do not force the user to scroll hunting for it), without hijacking focus unexpectedly.

### 5.2 Input forms

- Every input has a **visible, persistent `<label>`** (never placeholder-only labels).
- Show **units** clearly: as a suffix or prefix inside the input wrapper (for example `kg`, `%`, `$`) and, where helpful, in the label text. Make the unit part of the accessible name when needed (for example via `aria-describedby`).
- Provide **sensible default values** and example values so the calculator shows a useful result immediately where the PRD allows it. Defaults must be realistic and documented in code comments.
- Use the correct input type and mode: `type="text"` with `inputmode="decimal"` or `inputmode="numeric"` for numbers that need flexible formatting, or `type="number"` with `min`, `max`, and `step` where appropriate. Set `autocomplete="off"` for non-personal values.
- Group related inputs with `<fieldset>` and `<legend>`. Use a clear order: the most important inputs first.
- Use selects for unit choices and fixed options, radio groups for 2 to 4 mutually exclusive options, checkboxes for toggles, and range sliders only when paired with a numeric input.
- Place helper text under the field, linked with `aria-describedby`.
- Provide a **Reset** button that restores defaults. Provide **Calculate** only if live calculation is not used. Prefer **live (as you type) calculation** for simple calculators, with debouncing for expensive ones, unless the PRD specifies otherwise.

### 5.3 Validation and error messages

- Validate on `blur` and on submit. Do not show errors while the user is still typing their first value.
- Error message: specific and actionable ("Enter a value between 1 and 100", not "Invalid input").
- Connect the message with `aria-describedby`, set `aria-invalid="true"` on the field, and show an error icon and text (not color only).
- On submit with errors, move focus to the first invalid field, and optionally show an error summary at the top of the form with links to each field.
- Never show `NaN`, `Infinity`, `undefined`, or an empty result. Show a helpful empty or error state instead.

### 5.4 Result panel

- The primary result is **large, bold, and high contrast**, with the unit or label next to it.
- Show a short human-readable sentence summarizing the result where useful ("Your monthly payment is $1,234.56").
- Secondary results appear in a clean definition list or table below the primary result.
- Format numbers consistently (thousands separators, fixed decimals suited to the calculator, locale-aware using `Intl.NumberFormat`). Follow rounding rules from the PRD.
- The result region uses `aria-live="polite"` so screen readers announce updates. Do not announce on every keystroke for live calculators; announce after a short debounce.
- Empty state: a calm message such as "Enter your values to see the result."
- Loading state (only if the calculation is async or heavy): a lightweight skeleton or text, with reserved height to prevent layout shift.

### 5.5 Formula explanation

- Include a "Formula" section showing the formula in plain readable form, with each variable defined (a short list or table).
- Use semantic markup (`<code>`, `<math>` if the project supports it, or well-structured text). Do not use images for formulas.
- Add one **worked example** with real numbers when the PRD requires educational content.

### 5.6 Step-by-step calculations

- Show steps in an ordered list (`<ol>`), each step with the operation, the substituted values, and the intermediate result.
- Steps must use the **same values and logic** as the actual calculation. Reuse the calculation module's output to build the steps so they never disagree.
- On mobile, steps must wrap and never cause horizontal scroll. Use a collapsible `<details>` element if the content is long.

### 5.7 Charts and visual results

- Add charts **only where the PRD requires them or where they clearly improve understanding** (for example amortization, growth over time, breakdown of parts).
- Prefer lightweight **inline SVG or CSS-based charts**. Do not add a heavy charting library unless the project already uses one or the PRD requires it. If a library is unavoidable, load it only on pages that need it and defer it.
- Every chart must have: a title, labeled axes or direct value labels, a legend if multiple series, a text alternative (`role="img"` with `aria-label` or an adjacent data table), and respect for `prefers-reduced-motion`.
- Charts must resize responsively and never cause horizontal overflow. Reserve height to avoid layout shift.
- Provide the underlying data in an accessible table (can be inside `<details>`).

### 5.8 Copy and share

- **Copy result** button: copies a clean text summary (inputs and result) using the Clipboard API with a safe fallback. Show a short confirmation ("Copied") announced through an `aria-live` region. Handle clipboard failure gracefully.
- **Share** button: use the Web Share API when available, and fall back to copying the page link. Do not send user input to any third party.
- If the project's PRD defines shareable URLs with input values, encode inputs in the query string safely and validate them when reading (never trust URL parameters; clamp and sanitize).
- Buttons are real `<button>` elements with icon plus text labels (icon-only buttons need `aria-label`).
- These actions must work without breaking if JavaScript APIs are unavailable.

### 5.9 Trust and disclaimers

- For finance, health, and similar categories, include a short, plain-language disclaimer near the result, as required by the PRD or rules. Keep it visible but unobtrusive. Do not invent legal text that is not in the project documents.

---

## 6. Components

Build components once, in the shared components folder, and reuse them. Use typed props (TypeScript strict mode, no `any`). Prefer Astro components with minimal client-side JavaScript. Hydrate islands only when interactivity requires it.

### 6.1 State requirements

Every interactive component must define all of these states clearly: **default, hover, focus-visible, active, disabled, loading (where applicable), error (where applicable)**.

- **Hover:** subtle color or background change. Do not rely on hover for essential information (touch devices have no hover).
- **Focus-visible:** a clearly visible outline, at least 2px, offset 2px, using `--color-focus-ring`, with 3:1 contrast against adjacent colors. Never remove outlines without a replacement.
- **Active:** slightly darker background or a 1px translate. No dramatic motion.
- **Disabled:** use the `disabled` attribute (or `aria-disabled="true"` when the element must stay focusable), reduced contrast that still meets readability, and `cursor: not-allowed`. Explain why it is disabled when it is not obvious.
- **Loading:** show a small spinner or text, set `aria-busy="true"`, and prevent double submission.
- **Error:** red token color, icon, and text message, linked by ARIA.

### 6.2 Component specifications

| Component | Requirements |
|---|---|
| **Button** | Variants: primary, secondary, ghost, danger. Sizes: medium (default) and large. Minimum height 44px. Visible label. Use `<button>` for actions and `<a>` for navigation. |
| **Input field** | Label, optional prefix/suffix unit, helper text, error text, 44px minimum height, 16px minimum font size, full width in its container. |
| **Select / dropdown** | Prefer the native `<select>` styled with tokens for reliability, accessibility, and performance. Build a custom listbox only if absolutely required, and follow the WAI-ARIA pattern fully. |
| **Radio / checkbox / toggle** | Native inputs, custom visuals via CSS, 44px touch target including the label, clear checked and focus states. |
| **Card** | Surface background, 1px border, medium or large radius, consistent padding (`--space-5`). Optional header and footer. Clickable cards need a single, clear link target. |
| **Tabs** | Follow the ARIA tabs pattern (`role="tablist"`, `tab`, `tabpanel`, arrow-key navigation). Use only when content is truly parallel (for example Steps / Formula / Chart). Otherwise use headings or `<details>`. |
| **Navigation** | Semantic `<nav>` with `aria-label`. Highlight the current page with `aria-current="page"`. Mobile menu is a real button with `aria-expanded` and `aria-controls`, closes on `Escape`, and works without trapping keyboard users. Include a skip link ("Skip to main content"). |
| **Breadcrumbs** | `<nav aria-label="Breadcrumb">` with an ordered list, last item `aria-current="page"`. Reflect the real site hierarchy (Home, Category, Calculator). Pair with BreadcrumbList structured data. |
| **Tooltip** | Use sparingly, only for short supplementary hints. Must open on focus and hover, close on `Escape`, use `role="tooltip"` with `aria-describedby`. Never place essential information only in a tooltip. On touch devices, prefer visible helper text. |
| **Alert / notice** | Variants: info, success, warning, error. Icon plus text plus color. Use `role="alert"` for urgent errors and `role="status"` for non-urgent updates. |
| **Result panel** | See section 5.4. One consistent component for all calculators. |
| **FAQ accordion** | Native `<details>/<summary>` or a button-based accordion with `aria-expanded`. Content must be in the DOM for SEO. |
| **Calculator card (listing)** | Title, short description, category label. Entire card is one link with a clear accessible name. Consistent height in grids. |
| **Theme toggle** | A real button with an accessible name and state (for example `aria-pressed`). Respects system preference by default and remembers the user's choice. |

### 6.3 Component rules

- Keep components small, single-purpose, and typed.
- No inline styles for design values. Use tokens and scoped or shared CSS.
- Do not duplicate a component with slight variations. Add a variant prop instead.
- Document each shared component's props with a brief comment.

---

## 7. Responsive Design

Design for these ranges and test each:

| Device | Width | Layout notes |
|---|---|---|
| Small mobile | 320px to 479px | Single column, full-width controls, stacked actions |
| Mobile / large phone | 480px to 767px | Single column, comfortable padding |
| Tablet | 768px to 1023px | Single or two-column grids for cards, calculator may stay single column |
| Desktop | 1024px and up | Two-column calculator layout, multi-column calculator grids |

### Rules

- **No horizontal overflow at any width from 320px up.** Test at 320px and with 200% text zoom. Wide content (tables, formulas, charts) must scroll inside its own `overflow-x: auto` container or reflow.
- Use `min-width: 0` on flex and grid children that contain long text or numbers. Use `overflow-wrap: anywhere` for long strings where needed.
- **Touch targets:** minimum **44 by 44 CSS px** (24px absolute minimum per WCAG 2.2, but design for 44px), with at least 8px spacing between adjacent targets.
- Use `inputmode` so mobile keyboards match the input type.
- Respect safe areas on notched devices if fixed bars are used (`env(safe-area-inset-*)`).
- Tables: on small screens either scroll within a container with a visible scroll hint, or reflow into stacked label/value rows.
- Use responsive images with explicit `width` and `height` to prevent layout shift.
- Support both portrait and landscape orientation.
- Do not lock orientation or disable pinch zoom.

---

## 8. Accessibility (WCAG 2.2 AA)

Accessibility is a release requirement. Apply all of these:

### Semantic HTML

- Use landmarks: one `<header>`, `<nav>`, one `<main id="main">`, `<footer>`, and `<section>` or `<article>` with headings.
- Use `<button>` for actions, `<a>` for navigation, `<label>`, `<fieldset>`, `<legend>`, `<ol>`, `<ul>`, `<dl>`, `<table>` with `<caption>`, `<th scope>`. No clickable `<div>` or `<span>`.
- Set the `lang` attribute on `<html>`. Provide a unique, descriptive `<title>` for each page.
- Use ARIA only when native HTML cannot do the job. Wrong ARIA is worse than none.

### Keyboard

- Everything works with the keyboard alone. Logical tab order follows visual order.
- No keyboard traps. `Escape` closes menus, tooltips, and dialogs.
- Provide a **skip link** as the first focusable element.
- Do not use positive `tabindex` values.
- Pressing `Enter` in a form field submits the calculator (when a submit action exists).

### Focus

- Visible focus indicator on every interactive element (see section 6.1).
- Focus is never hidden under sticky headers (use `scroll-margin-top` / `scroll-padding-top`).
- Manage focus deliberately after dynamic changes (error summary, opened menu). Do not steal focus on live calculation.

### Screen readers

- Every form control has an accessible name. Units and hints are associated with `aria-describedby`.
- Dynamic results and copy confirmations use `aria-live` regions (`polite` by default).
- Icons that are decorative use `aria-hidden="true"`. Icons that carry meaning have a text alternative.
- Charts have a text alternative and a data table.
- Link text is descriptive ("View mortgage calculator", not "Click here").

### Forms and errors

- Errors are text-based, specific, associated with fields, and not color-only.
- Required fields are indicated in text, not only with an asterisk or color.
- Do not clear user input on error.

### Motion and preferences

- Respect `prefers-reduced-motion`: disable non-essential transitions and animations.
- Respect `prefers-color-scheme` and `prefers-contrast` where practical.
- No content flashes more than 3 times per second.

---

## 9. Dark Mode

- Implement dark mode through the **same token names** with different values (for example `:root` and `[data-theme="dark"]`, plus `@media (prefers-color-scheme: dark)` as the default when no saved preference exists). Follow the existing approach if the project already has one.
- **Avoid a flash of the wrong theme:** apply the saved or system theme with a tiny inline script in `<head>` before first paint. Keep it minimal and compatible with the project's Content Security Policy rules if any.
- Set `color-scheme: light dark` so native controls and scrollbars match.
- Do not simply invert colors. Use the dark token set. Avoid pure black backgrounds and pure white text to reduce glare.
- Verify in dark mode: text contrast, input borders (3:1), focus rings, disabled states, error and success colors, chart colors, tables, code and formula blocks, tooltips, alerts, and skeleton loaders.
- Images and SVGs must work on both themes (use `currentColor` and tokens for SVG fills and strokes).
- Theme choice is stored locally (for example `localStorage`) with safe error handling. Never store user calculator inputs without a reason defined in the PRD.

---

## 10. Content Layout and SEO

Each calculator page should follow a clear, crawlable structure. Always check the PRD first for required metadata, structured data, and content sections, and follow them exactly.

### Recommended page structure

1. Breadcrumbs
2. `h1`: calculator name (one only)
3. Short intro (1 to 2 sentences, includes the main keyword naturally)
4. **Calculator** (card with inputs and results)
5. `h2` How it works / Formula
6. `h2` Step-by-step example
7. `h2` Chart or visual breakdown (when applicable)
8. `h2` Tips, use cases, or explanation (concise, original, useful)
9. `h2` Frequently Asked Questions (real questions users ask, concise direct answers)
10. `h2` Related calculators (internal links to the same category and closely related tools)

### SEO rules

- Heading hierarchy: `h1`, then `h2`, then `h3`, with no skipped levels.
- Unique `<title>` and meta description per page, using patterns defined in the PRD.
- Canonical URL, Open Graph and Twitter card metadata if required by the PRD.
- Structured data (JSON-LD) only for the types the PRD requires or that match the visible content (for example `BreadcrumbList`, `FAQPage`, `WebApplication`/`SoftwareApplication`). Structured data must match visible page content exactly.
- FAQ content must be visible in the HTML (not injected only after JavaScript runs).
- Use descriptive internal link text. Link each calculator to its category page and related calculators.
- Calculator content must be **server-rendered or static HTML** where possible, so it is indexable and fast. Only the interactive behavior needs JavaScript.
- Images have meaningful `alt` text (or empty `alt` if decorative), explicit dimensions, and lazy loading below the fold.
- Do not stuff keywords, duplicate content across calculators, or write thin boilerplate. Each page needs unique, useful copy.
- Category pages: `h1` category name, short intro, a clear grid of all calculators in that category.
- Homepage: clear value proposition, category overview, popular calculators, and fast access to search or browse if the PRD includes it.

---

## 11. Performance

The project is tested with **Lighthouse CI**. Follow the thresholds in the PRD and rules. If none are defined, aim for 90+ in Performance, Accessibility, Best Practices, and SEO on mobile.

### Rules

- **Static first.** Use Astro's zero-JS-by-default model. Ship JavaScript only for real interactivity, and hydrate the smallest possible island (for example `client:visible` or `client:idle`) when a framework component is needed.
- **No unnecessary dependencies.** Before adding a package, check whether native HTML, CSS, or a few lines of TypeScript can do the job. Justify every new dependency (size, purpose, alternatives) and ask for approval if the rules require it.
- **CSS:** small, token-based, no large CSS frameworks if not already used. Avoid unused CSS. Prefer scoped Astro styles and a small global stylesheet.
- **Animations:** minimal. Use only `opacity` and `transform`, keep them under about 200ms, never animate layout properties, and disable them for `prefers-reduced-motion`. No decorative looping animations.
- **Core Web Vitals targets:** LCP under 2.5s, INP under 200ms, CLS under 0.1.
- **Avoid layout shift:** reserve space for results, charts, images, and fonts. Do not inject content above existing content.
- **Fonts:** see section 3. Minimize weights and files.
- **Images and icons:** prefer inline SVG for small icons, and use optimized formats (AVIF or WebP) through Astro's image tools for photos. Lazy-load below the fold.
- **Calculations:** keep logic in pure TypeScript functions (easy to unit test with Vitest). Debounce live calculations. Do not block the main thread with heavy loops.
- **Third-party scripts:** avoid. If analytics or ads exist in the PRD, load them deferred and never let them delay the calculator.
- **Caching and delivery:** use hashed static assets so Cloudflare Pages can cache them aggressively. Do not break existing build or deploy configuration.

---

## 12. Implementation Workflow

Follow this sequence for each UI task:

1. **Understand:** read the PRD sections and rules relevant to the task. List the requirements you will satisfy.
2. **Audit:** find existing components, tokens, and layouts to reuse.
3. **Plan:** write a short plan (components, states, responsive behavior, accessibility notes) before coding.
4. **Build mobile-first:** semantic HTML, then token-based CSS, then minimal TypeScript behavior.
5. **Verify states:** default, hover, focus, active, disabled, loading, error, empty, light, and dark.
6. **Test:**
   - Vitest for calculation, formatting, and validation logic.
   - Playwright for user flows (enter values, see result, reset, copy, theme toggle, keyboard navigation), responsive viewports, and accessibility checks where the project supports them.
   - Lighthouse CI for performance, accessibility, and SEO budgets.
   Run the project's existing test and lint commands. Fix failures related to your change.
7. **Review:** run the checklist in section 13.
8. **Report:** summarize what changed, which PRD and rules items were satisfied, any assumptions, and any open questions. Do not claim tests passed if you did not run them.

### TypeScript and code quality

- Strict mode compliant: no `any`, no unchecked non-null assertions, handle `null` and `undefined`.
- Type all component props and shared helpers.
- Keep calculation logic separate from presentation.
- Follow the naming, file structure, and formatting conventions in the rules file and the existing code.
- Add or update tests for any logic you create or change.

---

## 13. Quality Review Checklist

Before finishing, verify every item. Fix problems or explicitly report what is unresolved.

### Design consistency
- [ ] Uses only design tokens (no hard-coded colors, spacing, or font sizes).
- [ ] Matches the look and behavior of existing calculator pages.
- [ ] One primary accent color, consistent radius, consistent spacing.
- [ ] No unnecessary effects, clutter, or decoration.
- [ ] Reuses shared components; no near-duplicate components.

### Calculator usability
- [ ] Clear labels, units, helper text, and realistic default values.
- [ ] Result is prominent, correctly formatted, and updates correctly.
- [ ] Formula explanation and step-by-step content match the real calculation.
- [ ] Reset works; copy and share work with graceful fallbacks.
- [ ] Empty, error, and edge-case inputs (zero, negative, very large, decimals, blank) show helpful messages and never `NaN` or `Infinity`.
- [ ] Chart (if required) is labeled, accessible, and readable.

### Responsiveness
- [ ] Verified at 320px, 375px, 768px, 1024px, and 1440px.
- [ ] No horizontal overflow (also at 200% zoom).
- [ ] Touch targets are at least 44px with adequate spacing.
- [ ] Mobile keyboard type is correct for each input.

### Accessibility
- [ ] Semantic landmarks, one `h1`, no skipped heading levels.
- [ ] Every control has a label; errors are linked with ARIA and not color-only.
- [ ] Full keyboard operation, visible focus indicators, skip link works.
- [ ] Live regions announce results and copy confirmations appropriately.
- [ ] Contrast passes AA in light and dark themes.
- [ ] `prefers-reduced-motion` respected.

### Dark mode
- [ ] All components, charts, and states verified in dark mode.
- [ ] No flash of incorrect theme on load.
- [ ] No broken contrast or invisible borders and controls.

### Performance
- [ ] No unnecessary dependencies or JavaScript.
- [ ] No layout shift when results, charts, or fonts load.
- [ ] Animations are minimal and cheap.
- [ ] Lighthouse CI budgets from the PRD and rules are met.

### SEO and content
- [ ] Title, meta description, canonical, and structured data follow the PRD.
- [ ] Breadcrumbs, FAQ, and related links present and correct.
- [ ] Content is unique, useful, and visible in server-rendered HTML.

### PRD and rules compliance
- [ ] Every relevant requirement in `docs/PRD.md` is satisfied.
- [ ] Every relevant rule in `.agents/rules/count-loft-rules.md` is followed.
- [ ] Technology stack unchanged; no unauthorized files, dependencies, or app-logic changes.
- [ ] Tests added or updated, and existing tests, linting, and type checks pass.

---

## 14. Quick Reference: Do and Don't

**Do**
- Read the PRD and rules first, every time.
- Make the result the star of the page.
- Use native HTML elements and tokens.
- Test light, dark, mobile, desktop, keyboard, and screen-reader behavior.
- Keep it fast, quiet, and consistent.

**Don't**
- Invent requirements, features, or calculators.
- Add libraries, frameworks, or heavy animations without strong justification.
- Hide formulas, units, or assumptions.
- Rely on color, hover, or tooltips alone to communicate.
- Break accessibility or performance for visual style.
