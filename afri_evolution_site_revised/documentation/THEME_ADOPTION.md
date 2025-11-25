# Theme Adoption Guide (Light/Dark Tokens)

This site uses a token-driven theme with CSS variables. All components should consume tokens via classes/utilities — never hard-coded colors.

## Core Files
- src/styles/tokens.css: Light/dark CSS variables and system surfaces
- src/styles/utilities.css: Reusable utilities (buttons, gradients, helpers)
- src/scripts/theme.js: OS-preference + localStorage-persisted theme
- tailwind.config.js: Maps Tailwind color keys to CSS variables

## Required Includes per Page
Add to every HTML page (usually in head):
```html
<link rel="stylesheet" href="/src/styles/tokens.css">
<link rel="stylesheet" href="/src/styles/utilities.css">
<script defer src="/src/scripts/theme.js"></script>
```
For pages with tabs/menus, also include:
```html
<script defer src="/src/scripts/a11y.js"></script>
<script defer src="/src/scripts/tabs.js"></script>
```

## Semantic Class Palette
- Backgrounds: `bg-bg`, `bg-surface-1`, `bg-surface-2`, `bg-surface-3`
- Text: `text-fg`, `text-subtle`
- Borders/Dividers: `border-line`, `divide-line`
- Buttons:
  - Primary: `bg-primary text-primaryFg hover:opacity-90 focus-visible:ring-2 ring-focusRing`
  - Secondary: `bg-hover text-fg border border-line hover:opacity-90 focus-visible:ring-2 ring-focusRing`
- Hero gradients: `hero-gradient-light dark:hero-gradient-dark` (use `text-white` inside)

## Component Recipes
- Card/Panel outer: `bg-surface-1 border border-line shadow-sm rounded-lg/rounded-xl`
- Headings: `text-fg`
- Body copy: `text-subtle`
- Table: `bg-surface-1 text-sm`; header `bg-surface-2`; `even:bg-surface-3/40`; cells `border-line text-subtle`
- Tabs (segmented): bar `bg-fg text-bg`; active `bg-surface-1 text-fg`; inactive `text-bg/80 hover:text-bg`. ARIA: `role=tablist`, `role=tab`, `aria-selected`, `aria-controls`

## Migration Rules (Deterministic)
Replace across HTML:
- `bg-white` → `bg-surface-1`
- `bg-gray-50|bg-gray-100|bg-slate-50` → `bg-bg`
- `text-black|text-gray-900|text-gray-800` → `text-fg`
- `text-gray-600|text-gray-500|text-slate-500` → `text-subtle`
- `border-gray-200|border-gray-300` → `border-line`
- `divide-gray-200` → `divide-line`
- `style="color:#…|background:#…"` → remove and apply semantic utility

Keep `text-white` only where needed (hero overlays/imagery). Prefer token classes otherwise.

## Accessibility & States
- Always use `focus-visible:ring-2 ring-focusRing` on interactive controls
- Maintain ≥ AA contrast for body, controls, and labels
- Ensure 44×44px target sizes for mobile tap areas
- Tabs: full keyboard support (Arrow/Home/End/Enter/Space) is provided by `src/scripts/tabs.js`

## Extending the Theme
- New surface? Add a CSS variable to `src/styles/tokens.css`, then map as a Tailwind color in `tailwind.config.js` (or consume directly via custom CSS)
- New utility? Add to `src/styles/utilities.css`; keep it token-based
- New component? Use the semantic palette above; avoid hex and raw gray/white utilities

## Dark Mode Behavior
Theme is toggled by adding/removing the `dark` class on `html`. `src/scripts/theme.js` initializes from localStorage or OS preference.

## Troubleshooting
- A component looks off in dark mode: check for leftover raw colors (`bg-white`, `text-gray-*`, `border-gray-*`) and replace with tokens
- Missing focus ring: add `focus-visible:ring-2 ring-focusRing`
- Includes not resolving: use the modular pages under `src/pages` or run a simple include/prebuild step before serving

## Authoring Checklist
- [ ] Page includes tokens.css, utilities.css, theme.js
- [ ] No hard-coded hex colors (except images/media)
- [ ] Backgrounds/text/borders use token classes
- [ ] Buttons match primary/secondary recipes
- [ ] Interactive controls have focus-visible rings
- [ ] Tabs have ARIA roles and keyboard support

## Notes
- No framework migration is required
- Keep layouts and copy unchanged; this guide standardizes styling and accessibility only
