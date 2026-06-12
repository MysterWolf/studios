# mysterwolf studios — Claude Context
**Last updated:** June 2026
**Version:** 1.2.0

## What This Is
The main portfolio site for mysterwolf studios — developer identity, app portfolio, The Vibe Lab. Built in React/Vite, deployed to GitHub Pages with custom domain. Showcases apps built by mysterwolf studios. Clean editorial minimal aesthetic — Playfair Display headlines, warm off-white background, gold accent.

## Current Status
- **Live:** mysterwolf.studio (HTTPS enforced)
- **Deployed from:** gh-pages branch
- **DNS:** Spaceship registrar, 4 A records pointing to GitHub Pages IPs
- **HTTPS:** Enforced via GitHub Pages settings

## Tech Stack
| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | React/Vite | Single page app |
| Hosting | GitHub Pages | gh-pages branch, custom domain |
| Styling | CSS variables | Full palette in :root block |
| Fonts | Playfair Display, DM Sans, DM Mono | Google Fonts via @import |

## Brand Palette (CSS Variables)
```css
background: #F7F6F3   /* warm off-white */
surface:    #EFEEE9   /* cards, panels */
accent:     #C4A962   /* MWS gold */
ink:        #111009   /* primary text */
muted:      #8A8780   /* secondary text */
```

## Key Files
| File | Purpose |
|------|---------|
| src/MysterwolfStudios.jsx | Main component. Full portfolio site. |
| public/CNAME | Contains mysterwolf.studio for custom domain |
| vite.config.js | base: '/' — custom domain, not subdirectory |

## Portfolio Data (`public/data/apps.json`)

**This is the only place products are defined.** The component fetches this file at runtime — there is no hardcoded product list in the JSX.

| Field | Required | Notes |
|-------|----------|-------|
| `id` | Yes | kebab-case unique ID |
| `name` | Yes | Display name |
| `status` | Yes | Must match a key in `STATUS_MAP` — see below |
| `category` | Yes | Format: `"Type · Platform"` |
| `desc` | Yes | One-sentence card description |
| `model` | Yes | Pricing model string |
| `tagline`, `expandedDesc`, `kofiUrl`, `cta`, `storeUrl` | No | Optional — stored for future expanded card UI |

**Entry order:** live → beta → field-testing → in-development → planned.

**To add a new app:** add an entry to `apps.json` and run `npm run deploy`. No component changes needed.

**STATUS_MAP** lives at the top of `MysterwolfStudios.jsx`. Any new status value must be added there before adding it to `apps.json`, or it renders as unstyled muted text.

Current statuses: `live` (green `#2D7A4F`), `beta` (blue `#2860A8`), `field-testing` (amber `#B06820`), `in-development` (amber `#B06820`), `planned` (muted `#7A7770`).

## Architecture Decisions
- Single page, scrolling sections
- App portfolio section: The Vibe Lab — feeds from `public/data/apps.json`
- `apps.json` fetched with `?v=Date.now()` cache-bust — CDN-safe on every load
- Ko-fi link: ko-fi.com/mysterwolf
- MWS mark: circle badge in nav, light version
- No analytics, no tracking, no backend

## Invariants — Never Change These
- **vite.config.js base must be '/'** — custom domain deployment
- **CNAME file must contain mysterwolf.studio** — do not delete or modify
- **CSS variables live only in :root block** — never hardcode colors
- **MWS brand palette only** — this is not a client site
- **Products are ALWAYS loaded from `public/data/apps.json`** — never hardcode a products array in the component. The portfolio will grow to many apps. To add or update a product, edit `apps.json` only. The component fetches with `?v=Date.now()` cache-bust on every load.
- **`STATUS_MAP` in `MysterwolfStudios.jsx` is the only place status strings map to colors** — add new status values there before adding them to `apps.json`. Do not add `statusColor` or any color field to `apps.json` entries.

## Pending Work
1. Add ProcessMind LLC link when site is live
2. Wire `expandedDesc`, `kofiUrl`, `cta`, `storeUrl` into expanded product cards when that UI is built

## Claude Code Session Starter
"I'm working on the mysterwolf studios portfolio site at github.com/MysterWolf/studios. Pull the repo and read CLAUDE.md. The vite.config.js base must stay as '/' — this uses a custom domain. CSS variables only in :root. Confirm before making any changes."

## Changelog
### June 2026
- Attenuate status: `in-development` → `beta`
- Mission Control status: `in-development` → `field-testing` (new status, amber `#B06820`)
- `field-testing` added to `STATUS_MAP` in `MysterwolfStudios.jsx` with label "Field Testing" and `C.amber` color
- "Products in development" stat bumped from 6 → 7

- Component redesign: new layout with scroll-reveal animations, `Reveal` component, `ProductRow` component
- Reverted to JSON-driven product list — `products` state fetched from `public/data/apps.json` at runtime, never hardcoded in JSX
- Product count in section header is now dynamic (`products.length`)
- `STATUS_MAP` added to component — maps JSON status strings to display labels and colors
- DPad Flame added to portfolio (status: beta, blue badge)
- DPad Pilot 4 Samsung added to portfolio (status: planned)
- `beta` status registered in STATUS_MAP (#2860A8)
- `apps.json` fetch cache-busted with `?v=Date.now()` — fixes CDN stale data
- `update-portfolio` skill created in github.com/MysterWolf/skills

### May 2026
- Initial site built and deployed to mysterwolf.studio
- HTTPS enforced
- Ko-fi link integrated
- MWS mark in nav (light version)

## Available Skills
Skills live at github.com/MysterWolf/skills. Pull that repo and read README.md
to see all available skills before starting work.

Relevant skills for this repo:
- spinup-site — reference for site architecture patterns
- update-context — update this CLAUDE.md after session, commit and push
- audit-repo — read-only snapshot of repo state
- update-portfolio — add or update app entries on mysterwolf.studio

## Updated Claude Code Session Starter
"I'm working on the mysterwolf studios portfolio site at github.com/MysterWolf/studios.
First pull github.com/MysterWolf/skills and read README.md so you know what skills are available.
Then pull this repo and read CLAUDE.md in full. The vite.config.js base must stay as '/'.
CNAME must be in public/ not repo root — this is a critical invariant.
CSS variables only in :root. Confirm before making any changes."
