Afri Evolution Website Refactor — Checklist

Completed
- Theme system
  - `src/styles/tokens.css` with light/dark CSS variables
  - `tailwind.config.js` mapped to token vars
  - `src/styles/utilities.css` shared utilities (buttons, surfaces, helpers)
  - `src/scripts/theme.js` for OS-preference + persistence
- Componentization
  - `src/components/header.html`, `footer.html`, `hero.html`
  - `src/components/tabset.html` + `tabset-panels-*.html`
  - `src/components/table-compare.html`
  - `src/components/packages.html`
- Partials
  - `src/partials/head-meta.html` (fonts, Tailwind CDN config bound to tokens, CSS links)
  - `src/partials/analytics.html` placeholder
- Pages (modular)
  - `src/pages/services.html` composed via components/partials
  - `src/pages/index.html`, `about.html`, `approach.html`, `contact.html` scaffolds wired to partials/components
- Accessibility & UX
  - Skip-to-content support; focus management in `a11y.js`
  - Mobile menu: Escape/outside click close; `aria-expanded` sync
  - Tabs: ARIA roles, roving tabindex, full keyboard nav, hash sync in `tabs.js`
- Hardcoded color cleanup
  - Services components use semantic classes; hero gradient via utilities
  - Tabs updated from `text-white/80` → `text-bg/80`

Open Items / Next Steps
- Build step for includes
  - `<!--#include file="..." -->` requires a build/serve step (SSI or preprocessor). Decide on:
    - Simple SSI-enabled static host, or
    - A tiny HTML prebuild script (e.g. Node) to resolve includes into `dist/`
- Legacy pages
  - Migrate root `index.html`, `about-us.html`, `approach.html`, `contact.html`, `services.html` content into `src/pages/*` (where not already ported) and retire duplicates
  - Remove per-page Tailwind inline configs and hex colors in legacy files after migration
- Performance & SEO
  - Add `font-display: swap` and preload for primary font(s) if self-hosted
  - Defer any non-critical scripts; verify bundle size
  - Add JSON-LD stubs (Organization, Website) in `head-meta.html`
- Design parity checks
  - Verify surfaces/text/border tokens meet ≥ AA contrast
  - Confirm buttons/tabs/links have `focus-visible` rings
  - Validate hit targets (≥ 44×44) for mobile nav/toggles
- QA & Lighthouse targets (desktop)
  - Performance ≥ 90
  - Accessibility ≥ 95
  - Best Practices ≥ 95
  - SEO ≥ 90

Mapping Rules Applied (repo-wide)
- Colors/utilities normalized
  - `bg-white` → `bg-surface-1`
  - `bg-gray-50|100` → `bg-bg`
  - `text-gray-900|800` → `text-fg`
  - `text-gray-500|600` → `text-subtle`
  - `border-gray-200|300` → `border-line`
- Buttons
  - Primary: `btn-primary` (uses tokens)
  - Secondary: `btn-secondary` (uses tokens)
- Tabs
  - Active: `bg-surface-1 text-fg`
  - Inactive: `text-bg/80 hover:text-bg` (on dark tab bar)
- Tables
  - Header: `bg-surface-2`
  - Stripes: `even:bg-surface-3/40`
  - Cells: `border-line text-subtle`

How to Preview
- Serve `src/pages/*.html` with a static server that supports includes,
  or run a prebuild to materialize includes into plain HTML before serving.
- Without a build step, open the modular pages for structure review, but includes will not resolve in a plain `file://` context.

Notes
- No framework migration performed; routes preserved under `/pages` for modular authoring.
- Tokens-only color usage in components; avoid hardcoded hex in UI.

