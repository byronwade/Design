# Official website

`website/` is the official Astro reference surface for Design Contract. It is intentionally a separate static application inside the package repository: the npm package stays installable and the site is free to exercise the contract in a real browser.

## Product shape

Design Contract is a compact browser for AI-ready design control-plane packs, not a standalone component or block gallery. Local data in `website/src/data/contract-projects.ts` describes each pack as one authored `DESIGN.md` grammar, a universal Skill, agent prompt, command, roles, optional visual references, component bases, checks, receipts, and canonical engine context.

The primary routes are:

- `/` — minimal Mobbin-style discovery surface for the contract system.
- `/contracts/` — searchable contract-pack index with local filters.
- `/contracts/<slug>/` — AI prompt, command, Skill stack, task packet anchors, roles, reference images, source links, checks, receipts, and component showcase for one contract.
- `/docs/` — the short path through installation, one-file authoring, resolving, checking, references, verification, and contribution.

## Content boundary

The public site intentionally avoids separate component, block, showcase, lab, skill, and toolbox pages. Those concerns are still part of the product, but they appear inside the owning contract detail page where the AI can use them together. See [`CONTENT-MODEL.md`](CONTENT-MODEL.md).

The experience combines:

- Mobbin’s visual pattern browsing, flow organization, dense filters, and compact metadata.
- shadcn/ui’s readable source-oriented documentation, used as public-site inspiration rather than a package dependency.
- A minimal route surface where the contract, not the navigation tree, carries product scope.

## Visual direction

The public frame is a quiet, Cursor-inspired product shell, not another example contract. It uses a warm-black canvas, restrained off-white type, hairline borders, generous spacing, compact metadata, and low-contrast raised surfaces. Color belongs primarily to status and to the rendered contract examples, so warm, graphite, and reference-heavy packs retain visibly different identities without making the surrounding site feel fragmented.

The site implements its controls through local Astro primitives under `website/src/components/ui/`. Their anatomy follows shadcn/ui conventions for buttons, badges, search fields, tabs, and surfaces, but the public site does not install a React runtime or make shadcn/ui a package dependency. This website-only layer demonstrates the contract's component-source composition model while preserving the engine's component-agnostic boundary.

The signature public-site element is the rendered contract preview. Contract cards must show a believable miniature product surface rather than an empty color block, logo tile, or generic screenshot placeholder. The same visual grammar expands on the contract detail page into a functional component showcase. Warm Paper Workbench uses tactile paper and clay commitment actions, Graphite SaaS Console uses compact operations UI, and Visual Reference Starter uses an annotated source board. These examples are authored locally and do not copy or bundle third-party screenshots.

Keep the surrounding site restrained:

- use full-width bands, rules, and unframed reading layouts for structure;
- reserve framed surfaces for actual previews, commands, controls, and evidence;
- use the shared local UI primitives instead of page-specific buttons, badges, search fields, tabs, or card shells;
- keep Home, Contracts, Contract Details, and Docs visually related without forcing every contract into the public frame’s palette;
- make contract-specific detail pages inherit the tone, palette, type treatment, and component behavior described by that pack;
- verify the actual rendered site at `1440px` and `390px` before approving a visual change.

Projects can also use the package as a composition layer over shadcn/ui, another component source, or no component library. `DESIGN.md` records the Skill expectations, optional adapter, local primitive/block paths, app-type recipes, visual-reference policy, mappings, decisions, exceptions, and AI reuse policies. `design/references/` or an approved external source holds project-owned screenshots, photos, golden states, and Mobbin-style pattern references without bundling images into the package. This lets a project use the same source blocks for a SaaS workbench, admin console, content studio, or marketing surface while keeping the project’s own one-file grammar authoritative.

The site should preserve the Mobbin lesson without copying Mobbin: fast browsing, searchable categories, flow and pattern metadata, visual evidence, and direct routes into the reference library. It must not claim copied screenshots, bundled media, or proprietary source data.

Tooling profiles remain derived from `.design/manifest.json`, but they are documented inside the contract and docs rather than exposed as a separate public toolbox route.

## Benchmark boundary

The website may describe benchmark results only when they come from `npm run benchmark` or a stricter command. The component-fidelity suites measure hidden target components across anatomy, tokens, states, and content. Calibration fixtures may appear as methodology evidence, but they must not be described as model performance. The trained button, filter, metric-card, inline-alert, and status-badge candidates each scored 100% after miss-derived guidance was added to their owning component contracts. The historical public holdouts scored 82.98% for filter, 81.76% for metric-card, 81.47% for inline-alert, and 86.28% for status-badge. The active approval-badge public holdout scored 100%, so the site may say the current benchmark reaches the 99% component-fidelity gate. Keep that claim scoped to the benchmark protocol: clean AI-generated candidates with the declared clean-room prompt hash, allowed-input manifest hash, no-target-access attestation, an active public-claim holdout suite, and `npm run benchmark:release` passing.

## Performance boundary

The site is static Astro output with no framework runtime, image dependencies, remote fonts, or data API. The semantic token bridge is derived from root `DESIGN.md`; the homepage inlines it on the primary LCP path, while other routes use the cacheable public `/design-tokens.css` endpoint. Contract search/filter behavior is a small progressive-enhancement script on `/contracts/`. Route-level HTML stays below 60 KB, scripts below 20 KB, styles below 85 KB, and the complete static output below 1.6 MB. All core navigation and content work without JavaScript.

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

The public build also emits `sitemap.xml`, `robots.txt`, and canonical/OG metadata from the shared layout. These are generated from the same local route data that drives the site, so adding a contract record adds its public URL to the sitemap during the next build.

The repository includes a root `vercel.json` so a Vercel project can build from the repository root with the same workspace install and `site:build` command used locally. Routes must tolerate both slash and slashless navigation in local development and production, even though canonical links and the sitemap use directory-style URLs.
