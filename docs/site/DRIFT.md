# Drift prevention

The official site is a rendered consumer of the repository design contract. Its visual identity must not become a second editable token system.

## Authorities

- `DESIGN.md` owns portable colors, typography, spacing, and radius values.
- `.design/` owns the web layout, accessibility, performance, and responsive rules.
- `website/src/data/system.ts` reads `DESIGN.md` at build time.
- `website/src/data/site-tokens.ts` maps the canonical values into the site bridge.
- `website/src/styles/global.css` may provide only matching static fallbacks and site-specific geometry.

## Enforced gates

Run the complete site gate after any UI or contract change:

```bash
npm run site:check
```

The gate builds the static site, audits route/content/asset budgets, and runs:

```bash
npm run site:drift
```

The drift audit fails when:

- root `DESIGN.md` and `.design/DESIGN.md` stop being exact mirrors;
- the Lab stops reading the canonical design source;
- a site token maps to a hand-authored or unknown design value;
- rendered homepage tokens or `design-tokens.css` differ from `DESIGN.md`;
- primary destinations disappear from the shared navigation;
- the homepage hides canonical content with `content-visibility`;
- mobile navigation/control rules or the Lab table scroll contract disappear.

## Browser evidence

The release review still requires representative screenshots at wide and constrained widths. The current baseline is:

- homepage: `1440px` desktop and `390px` mobile;
- Lab: `1440px` desktop and `390px` mobile;
- primary routes: no document-level horizontal overflow at `390px`;
- mobile navigation: all primary destinations remain visible without a hidden-only menu;
- comparison tables: preserve their semantic columns through local horizontal scrolling.

Screenshots are evidence for intentional visual changes; they do not replace the source and build gates.
