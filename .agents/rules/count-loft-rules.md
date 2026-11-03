# Count Loft — Project Rules

## 1. Project Identity
- Project name: Count Loft.
- Count Loft is a free online calculator tools website.
- Follow the requirements in `docs/PRD.md`.
- The PRD is the primary source of truth for project scope and requirements.
- Do not silently change approved requirements.

## 2. Communication and Language
- All website content, UI text, code comments, documentation, and technical deliverables must be in English.
- The project owner prefers explanations and guidance in simple Roman Urdu.
- Keep instructions clear and explain technical steps one at a time.

## 3. Technology
- Preferred framework: Astro.
- Use TypeScript with strict mode.
- Use Cloudflare Pages for deployment.
- Use Vitest for unit tests.
- Use Playwright for browser tests.
- Use Lighthouse CI for performance checks.
- Do not switch to Next.js or another framework without asking for approval.

## 4. Development Workflow
- Work milestone by milestone according to the PRD.
- Start with M0 Foundation.
- Do not begin M1, M2, M3, or M4 until the current milestone is reviewed and approved.
- Before implementation, inspect the existing project structure.
- Do not overwrite or delete existing files without checking their contents.
- Explain the implementation plan before making major changes.
- Ask for approval before major architectural decisions.

## 5. Calculator Architecture
- Keep calculation logic in pure functions inside `/src/lib/calc`.
- Keep volatile reference data inside `/src/data/*.json`.
- Include source and lastVerified metadata for volatile data.
- Keep calculation logic separate from UI components.
- Validate user inputs and handle invalid or missing values safely.
- Use clear names and reusable components.

## 6. Calculator User Experience
- Provide sensible prefilled default values.
- Support instant recalculation with approximately 100–200 ms debounce where appropriate.
- Include a Calculate button where required.
- Show results clearly.
- Include charts where specified in the PRD.
- Explain calculation formulas step by step.
- Provide copy and share URL functionality where specified.
- Support dark mode.
- Follow accessibility best practices.
- Avoid unnecessary heavy animations.

## 7. Content and SEO
- Follow the PRD content requirements for each calculator page.
- Create original and useful English content.
- Include examples, formulas, and FAQs where required.
- Add appropriate metadata, structured data, and breadcrumbs.
- Include ad placeholders where specified.
- Include health and finance disclaimers where applicable.
- Never publish fabricated sources, statistics, reviewer names, or credentials.

## 8. Data Accuracy
- Never invent tax rates, electricity tariffs, gold prices, currency rates, zakat nisab values, or other changing data.
- Verify external data from reliable sources before using it.
- Record the source and last verification date for volatile data.
- Clearly explain assumptions and limitations.

## 9. Testing and Quality
- Test calculator functions with Vitest.
- Use the PRD reference test cases.
- Test important user journeys with Playwright.
- Check responsive layouts and accessibility.
- Fix errors before declaring a milestone complete.
- Do not claim tests passed unless they were actually run.

## 10. Git and Deployment Safety
- Keep changes organized and reviewable.
- Explain Git commands before asking the owner to run them.
- Never push code, deploy the website, or change DNS without explicit owner approval.
- Show the relevant changes before requesting approval.
- Do not expose API keys, passwords, tokens, or other secrets.

## 11. Scope Control
- Build only features included in the approved PRD.
- Do not add unnecessary dependencies or features.
- Do not skip milestone reviews.
- If a requirement is unclear, ask the owner instead of guessing.

## 12. First Task
- Read `docs/PRD.md` completely.
- Begin with planning for M0 Foundation only.
- Do not write or modify application code until the owner approves the plan.
