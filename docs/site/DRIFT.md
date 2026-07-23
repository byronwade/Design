# Drift prevention

The official site is a rendered consumer of the repository design contract. Its visual identity must not become a second editable token system.

## Authorities

- `DESIGN.md` owns portable package colors, typography, spacing, and radius values.
- `.design/` owns the web layout, accessibility, performance, and responsive rules.
- `website/src/data/site-tokens.ts` maps the canonical values into the site bridge.
- `docs/site/README.md` owns the quiet warm-black public-browser direction and website-only shadcn-style primitive boundary that lets differently themed contract packs remain visually distinct.
- `website/src/styles/global.css` may provide matching package-token fallbacks plus the bounded public-browser and contract-preview presentation described by the site contract.

## Enforced gates

Run the complete site gate after any UI or contract change:

```bash
npm run site:check
```

The gate builds the static site, audits route/content/asset budgets, verifies generated internal links and anchors, rejects stale source folders for removed public routes, and runs:

```bash
npm run site:drift
```

The drift audit fails when:

- root `DESIGN.md` and `.design/DESIGN.md` stop being exact mirrors;
- the site token bridge stops reading the canonical design source;
- a site token maps to a hand-authored or unknown design value;
- rendered homepage tokens or `design-tokens.css` differ from `DESIGN.md`;
- primary destinations disappear from the shared navigation;
- the homepage hides canonical content with `content-visibility`;
- removed public routes reappear in the shared navigation;
- removed public routes remain as source folders under `website/src/pages`;
- generated page links or same-site anchors point at missing targets;
- mobile navigation/control rules or contract-pack responsive rules disappear.
- contract cards fall back to empty color blocks instead of rendered product previews;
- contract detail pages stop applying their pack-specific visual theme and component showcase.
- contract filter tabs and contract-card navigation reuse the same data attribute or a broad filter selector can intercept detail links;
- public pages stop consuming the shared local button, badge, search, tabs, and surface primitives.

## Browser evidence

The release review still requires representative screenshots at wide and constrained widths. The current baseline is:

- homepage: `1440px` desktop and `390px` mobile;
- contracts: `1440px` desktop and `390px` mobile;
- warm and graphite contract detail pages: `1440px` desktop and `390px` mobile;
- docs: `1440px` desktop and `390px` mobile;
- primary routes: no document-level horizontal overflow at `390px`;
- mobile navigation: all primary destinations remain visible without a hidden-only menu;
- contract cards, AI prompts, component showcases, and reference evidence remain readable at constrained widths.
- contract filters update the result set without blocking contract-card navigation.

Screenshots are evidence for intentional visual changes; they do not replace the source and build gates.
