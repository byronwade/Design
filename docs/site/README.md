# Official website

`website/` is the official Astro reference surface for Design Contract. It is intentionally a separate static application inside the package repository: the npm package stays installable and the site is free to exercise the contract in a real browser.

## Product shape

Design / index is an open catalog for the complete interface—not only component APIs. Local data in `website/src/data/catalog.ts` indexes foundations, structure, components, patterns, and quality. Each catalog entry points back to the normative file that owns its decision. The Lab reads the canonical root `DESIGN.md` at build time for its color, typography, spacing, and radius specimens, making the public site a consumer and regression surface for the system rather than a parallel token list.

The primary routes are:

- `/catalog/` — searchable topic index with local filters and source-linked detail pages
- `/search/` — local cross-site search across guides, catalog topics, reference documents, skills, and showcase records
- `/skills/` — searchable registry of the repository’s local authoring and review skills
- `/reference/` — complete local engine reference with source-oriented detail pages
- `/lab/` — live token, component, layout, and data-display specimens
- `/evaluate/` — browser contract, reproducible commands, and explicit evidence limits
- `/showcase/` — locally authored system examples with stable, future-backend-ready detail routes
- `/showcase/submit/` — the local open-source contribution kit and future backend boundary
- `/tools/` — profile selection and the authoring flow for people and agents
- `/principles/` and `/docs/` — the point of view and the complete short path through installation, compilation, verification, and contribution

## Showcase content boundary

The showcase is intentionally public and editorial, not an authenticated dashboard. Current records are local and versioned in `website/src/data/showcase.ts`; each record includes three structured surface studies that can use CSS specimens now or local screenshot assets later. A future backend should preserve the record shape and stable slugs while adding submission, moderation, asset storage, and search capabilities. See [`CONTENT-MODEL.md`](CONTENT-MODEL.md).

The experience combines:

- skills.sh’s fast, searchable registry model
- Mobbin’s visual pattern browsing and compact metadata
- shadcn/ui’s shallow documentation navigation and readable source-oriented pages

Projects can also use the package as a composition layer over shadcn/ui. `design/COMPOSITION.json` records the adapter, local primitive/block paths, app-type recipes, and AI reuse policies. This lets a project use the same source blocks for a SaaS workbench, admin console, content studio, or marketing surface while keeping the project’s own `DESIGN.md`, mappings, and decisions authoritative.

Toolbox profiles are derived from `.design/manifest.json`, not maintained as a second website-only list. The current build exposes all 13 compiler targets across web, mobile, desktop, and hybrid runtimes; adding a profile to the manifest makes it part of the official site build and audit surface.

## Performance boundary

The site is static Astro output with no framework runtime, image dependencies, remote fonts, or data API. The semantic token bridge is derived from root `DESIGN.md`; the homepage inlines it on the primary LCP path, while other routes use the cacheable public `/design-tokens.css` endpoint. Catalog and showcase search/filter behavior are small progressive-enhancement scripts. Cross-site search is compiled from local data into `search-index.json`, while the complete result list is also server-rendered on `/search/` so the page remains readable and linkable without JavaScript. Route-level HTML stays below 60 KB, scripts below 20 KB, styles below 85 KB, and the complete local engine below 1.6 MB as the 119-route catalog, docs, blocks, reference, skills, and showcase surface grows. All core navigation and content work without JavaScript.

## Commands

From the repository root:

```bash
npm install
npm run site:dev
npm run site:build
npm run site:audit
npm run site:drift
npm run site:preview
```

`npm run site:check` runs all three site gates. The drift gate keeps the rendered token bridge, canonical navigation, mobile control rules, and source-to-site ownership aligned; see [`DRIFT.md`](DRIFT.md) for the release evidence contract.

The production output is generated in `website/dist/` and can be deployed to any static host, including Vercel. `website/astro.config.mjs` pins the public site URL, directory URLs, HTML compression, and static output format so local builds and hosted builds share the same contract.

The public build also emits `sitemap.xml`, `robots.txt`, and canonical/OG metadata from the shared layout. These are generated from the same local route data that drives the site, so adding a catalog, reference, skill, or showcase record adds its public URL to the sitemap during the next build.

The repository includes a root `vercel.json` so a Vercel project can build from the repository root with the same workspace install and `site:build` command used locally.
