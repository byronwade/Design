# Design Contract

An installable design façade and profile-aware compiler for AI-assisted product design and UI engineering.

The daily mental model is intentionally small:

```text
DESIGN.md + AGENTS.md + Skill stack + selected profile + project references = compiled target contract
```

Humans and agents work primarily with root `DESIGN.md`, root `AGENTS.md`, the installed design-system Skills, and the project-owned reference/mapping files. The full cross-platform engine remains versioned in this package and is compiled into focused context for each target.

## Why this architecture

A single `DESIGN.md` is excellent for visual tokens and rationale. It becomes difficult to maintain when a system also needs platform inheritance, native interaction rules, shells, layouts, page and flow patterns, component intent, project mappings, governance, validation, and selective loading.

Copying a large design folder into every project creates a different problem: users see dozens of files they should not edit, package updates become migrations across project-owned content, and agents can accidentally load incompatible platform guidance.

The package therefore uses a simple visible façade and a powerful hidden engine:

- the project owns its identity and implementation truth
- the package owns shared design reasoning and platform behavior
- the compiler combines them into one narrow contract per target
- deterministic checks verify that the compiled context is current and unmodified

Consumers do not need to navigate the engine to use it correctly.

## Installed project

```text
DESIGN.md                  project-owned Google-compatible visual identity
AGENTS.md                  short shared AI workflow and routing instructions
CLAUDE.md                  imports @AGENTS.md when Claude support is enabled

design/
├── PROJECT.md              thin product registry: situations, surfaces, terms, constraints
├── COMPONENTS.md           production mappings: intent → code/story/test/reference
├── REFERENCES.md           metadata for screenshots, photos, golden states, and visual references
├── references/             project-owned photos, screenshots, and approved media
├── DECISIONS.md            decisions, exceptions, gaps, migrations, baselines
└── COMPOSITION.json        skill stack, optional component source, app types, references, and AI reuse policy

.agents/skills/
├── design-system/SKILL.md  executable design workflow for Codex-compatible agents
└── design-review/SKILL.md  rendered review and evidence workflow

.design/
├── config.json             targets, profiles, roots, adapters, overrides
├── lock.json               installed engine version and migration metadata
├── generated/
│   ├── INDEX.md
│   ├── <target>.md         focused agent-readable contract
│   ├── <target>.json       tool-readable equivalent
│   └── CONTEXT.json        fingerprints and generated-output hashes
└── cache/                  disposable cache
```

Normal users edit `DESIGN.md`, the thin project registry under `design/`, and files under `design/references/`. They do not edit `.design/generated/`; agents should route through Skills instead of browsing the engine manually.

## Central engine

This repository is the engine and standard library, so it contains the detailed internal contracts:

```text
.design/
├── global/                 principles, layout, trust, accessibility, content, motion
├── components/             intent, anatomy, variants, and states
├── patterns/               shells, layouts, pages, states, and flows
├── verticals/              mobile, desktop, web, and hybrid specialization
├── quality/                review, evidence, and stable rule identifiers
├── governance/             canonical decisions and history
├── schema/                 engine schemas
└── sources/                protected provenance and research
```

That tree is packaged. It is no longer copied into consuming projects.

## Quick start

Initialize a browser application:

```bash
npx --yes github:byronwade/Design init --profile web-app
```

Initialize several products in a monorepo:

```bash
npx --yes github:byronwade/Design init \
  --profile web-app \
  --profile web-marketing \
  --profile ios-native
```

Then:

1. Complete `design/PROJECT.md` with verified product information.
2. Map real production APIs and references in `design/COMPONENTS.md`.
3. Add only approved, high-signal visual references in `design/REFERENCES.md`; keep binary assets project-owned under `design/references/` or an approved external source. Mobbin-style pattern references should name surface, flow, pattern, interaction, provenance, applicability, what to preserve, and what not to copy.
4. Record durable decisions and bounded exceptions in `design/DECISIONS.md`.
5. Refine root `DESIGN.md` without adding unsupported YAML keys.
6. Compile and validate:

```bash
npx --yes github:byronwade/Design context
npx --yes github:byronwade/Design doctor
npx --yes github:byronwade/Design validate
```

The examples below use `design-contract` as shorthand. When the package is not installed locally, replace it with `npx --yes github:byronwade/Design`.

## Commands

```bash
# Show available profiles
design-contract list

# Create the project façade and initial compiled targets
design-contract init --profile web-app

# Recompile all configured targets
design-contract context

# Print one target for another tool or session
design-contract context --id app --stdout

# Compatibility alias for context
design-contract resolve

# Check engine version, authored inputs, and generated output
design-contract status

# Explain incomplete adoption and corrective actions
design-contract doctor
design-contract doctor --mode release

# Validate project structure and readiness
design-contract validate
design-contract validate --mode release

# Measure component-to-component design fidelity
npm run benchmark
npm run benchmark:release

# Update the engine and migrate legacy installations
design-contract sync

# Explain a stable rule, profile, layer, or target
design-contract explain DS-ACTION-001
design-contract explain web-app
```

`context` compiles the selected engine layers and project-owned files. `status` detects stale, hand-edited, or version-incompatible output. `doctor` explains incomplete adoption. Release mode promotes readiness gaps to errors. `sync` updates the engine and adapters without replacing project-owned design truth.

## Profiles

| Profile | Product |
| --- | --- |
| `ios-native` | Native iPhone product |
| `ipados-native` | Native iPadOS product with resizable and multi-column behavior |
| `android-native` | Native adaptive Android product |
| `macos-native` | Native macOS application |
| `windows-native` | Native Windows application |
| `linux-gnome` | GTK/libadwaita application |
| `linux-kde` | Qt/Kirigami Plasma application |
| `web-app` | Browser-based operational product |
| `web-marketing` | Browser-based marketing or editorial surface |
| `electron-*` | Web app plus desktop-webview and host-platform conventions |

A responsive web application viewed on an iPhone remains `web-app`; it does not silently inherit native iOS behavior. Sibling platforms are never mixed unless an explicit composite profile defines the order.

## Compilation model

The compiler resolves:

```text
shared workflow
→ global engine layers
→ selected platform/surface profile
→ project DESIGN.md
→ design-system Skill dispatch
→ design/PROJECT.md
→ design/COMPONENTS.md
→ design/REFERENCES.md
→ design/DECISIONS.md
→ design/COMPOSITION.json
→ explicit overrides
```

Every source and generated output is hashed. `CONTEXT.json` records target fingerprints, output hashes, package version, and generation time. This makes three important failures visible:

- **stale:** an authored design input or target configuration changed
- **tampered:** generated output was edited directly
- **engine-update-required:** the running compiler differs from the version in `.design/lock.json`

`context` refuses to compile with a different engine version. Run `sync` deliberately, review its migration result, and then compile again.

## Agent workflow

`AGENTS.md` is a router, not a duplicate design system. It requires an agent to:

1. confirm compiled context is current
2. select one target
3. read `DESIGN.md`, the compiled target, and `design/`
4. select the smallest applicable installed Skill before UI work
5. inspect actual components, stories, tests, fixtures, routes, and visual references
6. produce the required design brief and component map
7. reuse mapped components and semantic tokens
8. treat missing capability as a design-system gap
9. verify realistic states, accessibility, platform behavior, and rendered output through the review Skill
10. report the exact revision, environment, limitations, and evidence

`design/COMPOSITION.json` is the composition seam. It records the Skill stack, optional component source, local component and block paths, app-type recipes, visual-reference policy, and the policies that keep an AI reusing mapped primitives instead of inventing page-local variants.

shadcn/ui is supported as an optional reference adapter because its primitive and block vocabulary fits this system well. It is not required by the package, does not need to be installed beside the contract, and is never platform authority. A project can use shadcn/ui, another component source, or no component library at all.

The installer creates thin adapters and managed Skills:

- Codex: a managed `AGENTS.md` block, `.agents/skills/design-system`, `.agents/skills/design-review`, and target-root overrides
- Claude Code: an actual `@AGENTS.md` import and Skills
- GitHub Copilot: a managed repository instruction block

The adapters use the zero-install GitHub command so they work immediately after initialization.

## Project ownership and migration

The package never silently overwrites:

```text
DESIGN.md
design/PROJECT.md
design/COMPONENTS.md
design/REFERENCES.md
design/DECISIONS.md
design/COMPOSITION.json
```

Legacy installations that copied the full engine into `.design/` are migrated by `sync`. Existing context, mappings, decisions, exceptions, custom overrides, and the previous visual contract are preserved before obsolete engine copies are removed.

When both the old and new authored file contain different content, the current façade file wins and the legacy content is written under `design/migrations/` with a content-derived filename. The migration result lists every backup.

## Official website

The repository includes a separate Astro reference site under `website/`. It is a real public documentation and showcase surface, but the public route graph is intentionally small: home, contracts, contract details, and docs. A contract detail page is where the larger gameplan comes together: the AI prompt, command, project files, roles, required Skills, approved visual references, Mobbin-style notes, source links, and shadcn-derived component showcase are shown as one contract pack instead of scattered across standalone component, block, lab, search, toolbox, or showcase routes. The current content transport is local and ready for a future backend without turning the public site into a dashboard.

```bash
npm install
npm run site:dev
npm run site:build
```

See [`docs/site/README.md`](docs/site/README.md) for the content model, product direction, and performance boundary.

## Development and release readiness

Development mode allows an incomplete product registry as warnings so a project can adopt the system incrementally.

Release mode treats readiness gaps as failures, including:

- placeholder product context
- unmapped critical components or patterns
- expired exceptions
- missing façade files
- stale or modified compiled context
- unknown profiles or unsafe target paths

This separation prevents the template from pretending to know a project’s implementation while still giving production teams a strict gate.

## Google DESIGN.md

Root `DESIGN.md` remains compatible with Google’s current alpha model: YAML front matter for exact tokens and ordered Markdown rationale. Custom inheritance and workflow metadata remain outside its supported top-level keys:

```text
version, name, description, colors, typography, rounded, spacing, components
```

In this package repository, `.design/DESIGN.md` is an exact integrity mirror. An installed project has only one editable copy: root `DESIGN.md`.

## Component mappings

The engine describes intent; `design/COMPONENTS.md` identifies the shipped implementation. A useful mapping records:

- intent ID
- production component and API
- approved variants
- story or interaction test
- Figma or golden reference
- supported targets
- status and owner

An unmapped critical intent is a visible system gap, not permission for arbitrary local CSS. A visual reference without a production mapping is evidence of appearance, not implementation authority.

## Visual references

Visual references are project-owned evidence, not package assets. The installer creates `design/REFERENCES.md` as the registry and reserves `design/references/` as the local place for approved screenshots, photos, mood references, golden states, and Mobbin-style pattern references.

Reference designs are not required for initial adoption. They become valuable when a team has product direction, brand intent, screenshots from an existing product, or a small set of examples that should keep future AI-generated work cohesive. Do not download hundreds of photos with the contract, and do not treat even ten photos as universal authority. Prefer the smallest approved set that applies to the surface being changed, then record why each reference matters.

The Mobbin-style model is useful because it organizes real product inspiration by surface, flow, pattern, interaction, and screen state. Design Contract should learn from that browsing shape without copying Mobbin data, imagery, brand, or paywalled content. A reference entry must say what to preserve and what not to copy so inspiration does not become imitation.

Agents must inspect applicable approved references before designing or visually modifying a surface and list the references used in the design brief. If no approved reference applies, they should say so and continue from the compiled contract, production mappings, and real rendered surface.

## Component-source composition and app types

The package can build on shadcn/ui without making shadcn’s defaults the product identity or a required dependency. The consuming project owns `design/COMPOSITION.json`, which is compiled into every target alongside its tokens, references, and production mappings.

The composition contract has four responsibilities:

- identify the optional component source, registry, style, and local `ui`/`blocks`/`recipes`/`references` paths;
- define app types such as `saas-workbench`, `admin-console`, `content-studio`, or `marketing-site`;
- map each app type to an engine profile, shell, layout, reusable block families, and intent IDs;
- require reuse of mapped components and semantic tokens before a new primitive or block is introduced.

Select an app type on initialization:

```bash
design-contract init --profile web-app --app-type saas-workbench
```

The target’s `appType` is routing metadata, not a new platform profile. `web-app` still owns browser behavior; the project composition contract chooses the product shape and optional block vocabulary layered on top of it. An app-specific Linear-inspired workbench is therefore a recipe in the consuming project, not a copied Linear identity in the shared engine.

## Verification and production

For this package:

```bash
npm install
npm run validate:strict
npm test
npm run build
npm run smoke
npm run benchmark
npm run check
```

`npm run validate:strict` executes package structure checks and Google’s `DESIGN.md` linter. `npm test` covers façade installation, target isolation, stale/tampered output, engine pinning, sync preservation, legacy migration, conflict backups, readiness modes, explanation, and path safety. `npm run build` produces deterministic package metadata. `npm run smoke` packs the exact package shape, installs it into a clean consumer, initializes a project, compiles context, runs status/doctor/validation, and confirms that the engine was not copied into the consumer. `npm run benchmark` measures component fidelity against local clean-room-ready fixtures; `npm run benchmark:release` is reserved for clean AI-generated candidates with prompt hashes, allowed-input hashes, no-target-access attestation, and scores that meet the 99% target.

## Component fidelity benchmarks

The benchmark target is 99% average fidelity for contract-plus-skills component recreation. The scorer compares anatomy, tokens, interaction states, and content. This is intentionally stricter than a screenshot vibe check: it shows whether the AI preserved the real component contract.

Current benchmark data includes calibration fixtures, five trained suites, four historical public holdouts, and one active public holdout. The first clean contract-plus-skills candidate scored 77.91% on the button suite, compared with 47.78% for raw shadcn and 70.39% for prompt-only. After the misses were encoded into the warm primary commitment recipe, the trained button candidate scored 100%. On the graphite filter holdout, the clean contract-plus-skills candidate scored 82.98%, compared with 45.91% for raw shadcn and 85.68% for prompt-only. After those misses were encoded into the graphite filter combobox recipe, the trained filter candidate scored 100%. On the graphite metric-card holdout, the clean contract-plus-skills candidate scored 81.76%, compared with 50.11% for raw shadcn and 86.08% for prompt-only. After those misses were encoded into the graphite metric card recipe, the trained metric-card candidate scored 100%. On the inline-alert holdout, the clean contract-plus-skills candidate scored 81.47%, compared with 67.22% for raw shadcn and 97.26% for prompt-only. After those misses were encoded into the warm stale-source inline alert recipe, the trained inline-alert candidate scored 100%. On the status-badge holdout, the clean contract-plus-skills candidate scored 86.28%, compared with 58.41% for raw shadcn and 100% for prompt-only. After those misses were encoded into the warm warning status badge recipe, the trained status-badge candidate scored 100%. A fresh approval-badge public holdout then scored 100% with contract-plus-skills, compared with 59.02% for raw shadcn and 86.47% for prompt-only, so `npm run benchmark:release` now passes for the current benchmark scope. Public claims remain tied to fresh holdout suites generated from `clean-room/prompt.md` and `clean-room/allowed-inputs.json` without reading `target.json`, existing candidates, or scorer misses. See [`docs/benchmarks/COMPONENT-FIDELITY.md`](docs/benchmarks/COMPONENT-FIDELITY.md) for the clean-room protocol.

Every pull request runs the full sequence on Ubuntu and Windows. Every push to `main` also runs a separate production workflow that installs the package from the exact GitHub commit SHA and executes the public CLI in a clean project on both operating systems.

## What “works” means

The package does not treat a generated file or a successful command as proof by itself. A production claim requires matching evidence:

- the exact package revision installs successfully
- the public CLI creates the documented façade
- target contracts contain only applicable profile layers
- authored changes make context stale until recompiled
- generated edits are detected
- synchronization preserves project-owned truth
- release readiness fails when critical mappings are missing
- the same package behavior passes on Ubuntu and Windows

Product repositories then add their own rendered, interaction, accessibility, visual-regression, performance, and platform-native checks using the commands recorded in `design/COMPONENTS.md`.

## Authority

1. accessibility, safety, legal, privacy, security, and platform requirements
2. the actual person, task, domain, risk, and explicit project requirement
3. accepted project decisions and active exceptions
4. global engine contract
5. selected platform and surface profile
6. compliant production components and mappings
7. supporting research and provenance
8. framework defaults and model preference

## Repository development

Changes to behavior should update the owning contract, manifest, schemas, templates, compiler, migration path, adapters, tests, README, and changelog together. See `CONTRIBUTING.md` and `AGENTS.md`.

## License

Design Contract is released under the [MIT License](LICENSE).
