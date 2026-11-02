# Arth Patel | Portfolio

A hand-built developer portfolio: Angular 22 (standalone components, signals, zoneless), SCSS design tokens, GSAP + ScrollTrigger motion, and a glassmorphism theme. Deployed to GitHub Pages.

**Live:** https://arthpatel1046.github.io/Portfolio/

## Stack

- Angular 22, TypeScript (strict), SCSS, Vitest
- GSAP and ScrollTrigger for parallax and the pinned project gallery
- Lucide icons (`@lucide/angular`), self-hosted Inter and Space Grotesk (Fontsource)
- GitHub Actions to GitHub Pages

## Getting started

Requires Node.js 24.15+ or 26 (see `.nvmrc`).

```bash
npm install
npm start          # dev server on http://localhost:4200
```

| Script | What it does |
|---|---|
| `npm start` | Development server with live reload |
| `npm test` | Unit tests (Vitest) |
| `npm run lint` | ESLint (Angular rules) |
| `npm run build` | Production build into `dist/arth-portfolio/browser` |
| `npm run verify` | Lint, tests and build in one go |
| `npm run check:links` | Checks every external link and public asset in the content files |

## Editing the content

All text lives in typed files under `src/app/data/`: `profile.data.ts`, `about.data.ts`, `skills.data.ts`, `experience.data.ts`, `projects.data.ts` and `principles.data.ts`. The matching interfaces are in `src/app/models/`. Change a value and the page updates; no template edits needed.

- Résumé: replace `public/resume/Arth-Patel-Resume.pdf`.
- Project screenshots: add `public/images/projects/<name>.webp` and reference it from `projects.data.ts` with a relative path (no leading slash).
- Social preview image: `public/images/og-image.png` (1200×630).

## Project structure

```
src/app/
  core/       Motion service (GSAP setup, reduced motion), ScrollSpy
  shared/     GlassCard, SocialLinks, Navbar, Footer, FluidBackground; Reveal, Spotlight, Tilt directives
  features/   hero, about, skills, experience, projects, principles, contact
  models/     TypeScript interfaces for the content
  data/       the portfolio content
src/styles/   design tokens, reset, typography, utilities, accessibility, motion
```

## Design and accessibility notes

- Colours, type, spacing and motion are CSS custom properties in `src/styles/_tokens.scss`; a spec checks their contrast ratios.
- Motion respects `prefers-reduced-motion` everywhere (CSS and GSAP). `prefers-contrast` and forced-colors modes are supported.
- Asset and link paths are relative so the site works under the `/Portfolio/` base path.

## Deployment

Pushing to `main` builds and publishes the site with GitHub Actions (`.github/workflows/deploy.yml`). The base path is detected automatically from the repository settings.

## Credits

Fonts: Inter and Space Grotesk (SIL OFL, via Fontsource). Brand icons: Simple Icons (CC0). Icons: Lucide. Animation: GSAP.

Content and design © Arth Patel.