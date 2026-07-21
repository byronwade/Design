# Design Contract

An installable design façade and profile-aware compiler for AI-assisted product design and UI engineering.

The daily mental model is intentionally small:

```text
DESIGN.md + selected profile + design/ project customizations = compiled target contract
```

Humans and agents work primarily with root `DESIGN.md`, root `AGENTS.md`, and three project-owned files under `design/`. The full cross-platform engine remains versioned in this package and is compiled into focused context for each target.

## Why this architecture

A single `DESIGN.md` is excellent for visual tokens and rationale. It becomes difficult to maintain when a system also needs platform inheritance, native interaction rules, shells, layouts, page and flow patterns, component intent, project mappings, governance, validation, and selective loading.

The package therefore uses a simple visible façade and a powerful hidden engine. Consumers do not need to navigate the engine to use it correctly.

## Installed project

```text
DESIGN.md                  project-owned Google-compatible visual identity
AGENTS.md                  short shared AI workflow and routing instructions
CLAUDE.md                  imports @AGENTS.md when Claude support is enabled

design/
├── PROJECT.md              product, situations, surfaces, terms, themes, constraints
├── COMPONENTS.md           intent → code/story/test/design mappings
└── DECISIONS.md            decisions, exceptions, gaps, migrations, baselines

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

```bash
npx --yes github:byronwade/Design init --profile web-app
```

For a monorepo:

```bash
npx --yes github:byronwade/Design init \
  --profile web-app \
  --profile web-marketing \
  --profile ios-native
```

Then complete `design/PROJECT.md`, map real implementation in `design/COMPONENTS.md`, record durable decisions in `design/DECISIONS.md`, refine `DESIGN.md`, and run:

```bash
design-contract context
design-contract doctor
design-contract validate
```

## Commands

```bash
design-contract list
design-contract init --profile web-app
design-contract context
design-contract context --id app --stdout
design-contract resolve                 # compatibility alias
design-contract status
design-contract doctor
design-contract doctor --mode release
design-contract validate
design-contract validate --mode release
design-contract sync
design-contract explain DS-ACTION-001
design-contract explain web-app
```

`context` compiles the selected engine layers and project-owned files. `status` detects stale or hand-edited output. `doctor` explains incomplete adoption. Release mode promotes readiness gaps to errors. `sync` updates the engine and adapters without replacing project-owned design truth.

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
→ explicit overrides
```

Every source and generated output is hashed. `CONTEXT.json` records target fingerprints, output hashes, package version, and generation time. This makes stale context and manual edits detectable.

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

The installer creates thin adapters:

- Codex: a managed `AGENTS.md` block, Skills, and target-root overrides
- Claude Code: an actual `@AGENTS.md` import and Skills
- GitHub Copilot: a managed repository instruction block

## Project ownership and migration

The package never silently overwrites:

```text
DESIGN.md
design/PROJECT.md
design/COMPONENTS.md
design/DECISIONS.md
```

Legacy installations that copied the full engine into `.design/` are migrated by `sync`. Existing context, mappings, decisions, and exceptions are preserved before obsolete engine copies are removed.

## Google DESIGN.md

Root `DESIGN.md` remains compatible with Google’s current alpha model: YAML front matter for exact tokens and ordered Markdown rationale. Custom inheritance and workflow metadata remain outside its supported top-level keys:

```text
version, name, description, colors, typography, rounded, spacing, components
```

## Component mappings

The engine describes intent; `design/COMPONENTS.md` identifies the shipped implementation. A useful mapping records the production API, approved variants, story or interaction test, Figma or golden reference, supported targets, and owner. An unmapped critical intent is a visible system gap, not permission for arbitrary local CSS.

## Verification and production

```bash
npm install
npm run validate:strict
npm test
npm run build
npm run smoke
npm run check
```

`npm run smoke` packs the exact package shape, installs it into a clean consumer, initializes a project, compiles context, runs status/doctor/validation, and confirms that the engine was not copied into the consumer.

Every push to `main` also runs a production workflow that installs the package from the exact GitHub commit SHA and executes the public CLI in a clean project on Ubuntu and Windows.

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
