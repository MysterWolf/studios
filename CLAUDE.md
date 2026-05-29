# mysterwolf studios — Claude Context
**Last updated:** May 2026
**Version:** 1.0.0

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

## Architecture Decisions
- Single page, scrolling sections
- App portfolio section: The Vibe Lab — DPad Pilot, Mission Control, CannaGuide
- Ko-fi link: ko-fi.com/mysterwolf
- MWS mark: circle badge in nav, light version
- No analytics, no tracking, no backend

## Invariants — Never Change These
- **vite.config.js base must be '/'** — custom domain deployment
- **CNAME file must contain mysterwolf.studio** — do not delete or modify
- **CSS variables live only in :root block** — never hardcode colors
- **MWS brand palette only** — this is not a client site

## Pending Work
1. Update app portfolio section as new apps launch
2. Add ProcessMind LLC link when site is live
3. Add The Vibe Lab section with full app portfolio

## Claude Code Session Starter
"I'm working on the mysterwolf studios portfolio site at github.com/MysterWolf/studios. Pull the repo and read CLAUDE.md. The vite.config.js base must stay as '/' — this uses a custom domain. CSS variables only in :root. Confirm before making any changes."

## Changelog
### May 2026
- Initial site built and deployed to mysterwolf.studio
- HTTPS enforced
- Ko-fi link integrated
- MWS mark in nav (light version)
