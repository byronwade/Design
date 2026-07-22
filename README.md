# Design Contract

An installable design façade and profile-aware compiler for AI-assisted product design and UI engineering.

The daily mental model is intentionally small:

```text
DESIGN.md + selected profile + design/ project customizations = compiled target contract
```

Humans and agents work primarily with root `DESIGN.md`, root `AGENTS.md`, and four project-owned files under `design/`. The full cross-platform engine remains versioned in this package and is compiled into focused context for each target.

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
├── PROJECT.md              product, situations, surfaces, terms, themes, constraints
├── COMPONENTS.md           intent → code/story/test/design mappings
├── DECISIONS.md            decisions, exceptions, gaps, migrations, baselines
└── COMPOSITION.json        component adapter, blocks, app types, and AI reuse policy

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

Normal users edit `DESIGN.md` and `design/`. They do not edit `.design/generated/`.

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
3. Record durable decisions and bounded exceptions in `design/DECISIONS.md`.
4. Refine root `DESIGN.md` without adding unsupported YAML keys.
5. Compile and validate:

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
→ design/PROJECT.md
→ design/COMPONENTS.md
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
4. inspect actual components, stories, tests, fixtures, routes, and references
5. produce the required design brief and component map
6. reuse mapped components and semantic tokens
7. treat missing capability as a design-system gap
8. verify realistic states, accessibility, platform behavior, and rendered output
9. report the exact revision, environment, limitations, and evidence

For projects using shadcn/ui, `design/COMPOSITION.json` is the composition seam. It records the registry/style adapter, local component and block paths, app-type recipes, and the policies that keep an AI reusing mapped shadcn primitives instead of inventing page-local variants.

The installer creates thin adapters:

- Codex: a managed `AGENTS.md` block, Skills, and target-root overrides
- Claude Code: an actual `@AGENTS.md` import and Skills
- GitHub Copilot: a managed repository instruction block

The adapters use the zero-install GitHub command so they work immediately after initialization.

## Project ownership and migration

The package never silently overwrites:

```text
DESIGN.md
design/PROJECT.md
design/COMPONENTS.md
design/DECISIONS.md
design/COMPOSITION.json
```

Legacy installations that copied the full engine into `.design/` are migrated by `sync`. Existing context, mappings, decisions, exceptions, custom overrides, and the previous visual contract are preserved before obsolete engine copies are removed.

When both the old and new authored file contain different content, the current façade file wins and the legacy content is written under `design/migrations/` with a content-derived filename. The migration result lists every backup.

## Official website

The repository includes a separate Astro reference site under `website/`. It is a real public documentation and showcase surface: a fast, local-data catalog of 27 design contracts, a cross-site Search index, a Skills registry for the repository’s reusable workflows, a 69-document Reference library rendered from the canonical engine, a Toolbox exposing all 13 manifest-backed target profiles, a Showcase for systems in context with a local submission kit, a Lab for rendered specimens read from the canonical root `DESIGN.md`, and an Evaluation route for reproducible gates. The current content transport is local; the documented showcase record shape is ready for a future backend without turning the public site into a dashboard.

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

## shadcn/ui composition and app types

The package can build on shadcn/ui without making shadcn’s defaults the product identity. The consuming project owns `design/COMPOSITION.json`, which is compiled into every target alongside its tokens and production mappings.

The composition contract has four responsibilities:

- identify the component adapter, registry, style, and local `ui`/`blocks`/`recipes` paths;
- define app types such as `saas-workbench`, `admin-console`, `content-studio`, or `marketing-site`;
- map each app type to an engine profile, shell, layout, reusable block families, and intent IDs;
- require reuse of mapped components and semantic tokens before a new primitive or block is introduced.

Select an app type on initialization:

```bash
design-contract init --profile web-app --app-type saas-workbench
```

The target’s `appType` is routing metadata, not a new platform profile. `web-app` still owns browser behavior; the project composition contract chooses the product shape and shadcn block vocabulary layered on top of it. An app-specific Linear-inspired workbench is therefore a recipe in the consuming project, not a copied Linear identity in the shared engine.

## Verification and production

For this package:

```bash
npm install
npm run validate:strict
npm test
npm run build
npm run smoke
npm run check
```

`npm run validate:strict` executes package structure checks and Google’s `DESIGN.md` linter. `npm test` covers façade installation, target isolation, stale/tampered output, engine pinning, sync preservation, legacy migration, conflict backups, readiness modes, explanation, and path safety. `npm run build` produces deterministic package metadata. `npm run smoke` packs the exact package shape, installs it into a clean consumer, initializes a project, compiles context, runs status/doctor/validation, and confirms that the engine was not copied into the consumer.

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
