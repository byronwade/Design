# Design Contract

An installable design control plane for AI-assisted product design and UI engineering.

The daily mental model is intentionally small:

```text
DESIGN.md + optional design/references/ + generated adapters, checks, and receipts = enforceable AI design context
```

Humans author `DESIGN.md`. Optional screenshots, photos, golden states, and Mobbin-style notes live under `design/references/`. Agent instructions, schemas, caches, fingerprints, task packets, receipts, and adapters are generated or hidden so they do not become competing sources of truth.

## Why this architecture

A single `DESIGN.md` is useful only if it is a grammar, not a screen catalog. It must describe the product, people, terms, durable qualities, targets, token and component sources, layout, navigation, responsiveness, states, accessibility, content, trust, references, and acceptance.

Copying a large design folder into every project creates a different problem: users see files they should not edit, package updates become migrations across project-owned content, and agents can accidentally load incompatible platform guidance.

The package therefore uses one authored file and a generated enforcement engine:

- the project owns its identity and implementation truth
- the package owns shared design reasoning and platform behavior
- `design resolve` turns a request into one narrow task packet
- `design check` inspects code independently of the AI
- `design verify` records revision-bound evidence and a receipt

Consumers do not need to navigate the engine to use it correctly.

## Installed project

```text
DESIGN.md                  project-authored design grammar and token source
AGENTS.md                  generated short AI router
CLAUDE.md                  generated @AGENTS.md import when Claude support is enabled

design/
└── references/             optional project-owned photos, screenshots, golden states, and pattern notes

.agents/skills/
├── design/SKILL.md         universal resolver/checker/verifier workflow
├── design-system/SKILL.md  compatibility router
└── design-review/SKILL.md  compatibility router

.design/
├── config.json             targets, profiles, roots, adapters, overrides
├── lock.json               installed engine version and migration metadata
├── generated/
│   ├── INDEX.md
│   ├── <target>.md         focused agent-readable contract
│   ├── <target>.json       tool-readable equivalent
│   ├── CONTEXT.json        fingerprints and generated-output hashes
│   └── TASK.json           latest bounded task packet from design resolve
├── receipts/               check reports and verification receipts
└── cache/                  disposable cache
```

Normal users edit `DESIGN.md` and optionally add approved media under `design/references/`. They do not edit `.design/generated/` or `.design/receipts/`; agents should route through the universal Skill instead of browsing the engine manually.

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

1. Fill out `DESIGN.md` as the product grammar.
2. Add only approved, high-signal visual references under `design/references/` when they help a specific surface.
3. Resolve the current task, build from the packet, then check and verify:

```bash
npx --yes github:byronwade/Design resolve --request "Add an approval workflow"
npx --yes github:byronwade/Design check
npx --yes github:byronwade/Design verify --surface approval --evidence path/to/evidence.html
```

The examples below use `design` as shorthand. `design-contract` remains as a compatibility binary during migration.

## Commands

```bash
# Create the project façade and initial compiled targets
design init --profile web-app

# Resolve a bounded task packet for the AI
design resolve --request "Add an approval workflow"

# Check TypeScript, TSX, CSS, utility classes, imports, mappings, and exceptions
design check

# Verify rendered surfaces and write a design receipt
design verify --surface approval --evidence artifacts/approval.html

# Compatibility and maintenance commands
design-contract list
design-contract context --id app --stdout
design-contract status
design-contract sync
design-contract explain DS-ACTION-001
```

`resolve` writes `.design/generated/TASK.json`. `check` writes `.design/receipts/check-report.json`. `verify` writes `.design/receipts/latest.json` and a timestamped receipt. CI should block stale context, failed error rules, missing evidence, unapproved baseline changes, and expired exceptions.

## Public Workflow

```text
Understand -> Resolve -> Build -> Check -> Verify
```

`resolve` must return only relevant components, tokens, patterns, references, constraints, and checks. It must not dump the full engine into the prompt.

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

The legacy context compiler resolves:

```text
shared workflow
→ global engine layers
→ selected platform/surface profile
→ project DESIGN.md
→ generated universal Design Skill dispatch
→ explicit overrides
```

`design resolve` then narrows that state for one request:

```text
request
→ task model
→ relevant components, tokens, patterns, references, constraints, and checks
→ .design/generated/TASK.json
```

Every authored source and generated output is hashed. `CONTEXT.json` records target fingerprints, output hashes, package version, and generation time. This makes three important failures visible:

- **stale:** an authored design input or target configuration changed
- **tampered:** generated output was edited directly
- **engine-update-required:** the running compiler differs from the version in `.design/lock.json`

`context` refuses to compile with a different engine version. Run `sync` deliberately, review its migration result, and then compile again. Ordinary AI work should start from `design resolve --request`, not from the full compiled context.

## Agent workflow

`AGENTS.md` is a generated router, not a duplicate design system. It requires an agent to:

1. run `design status`
2. run `design resolve --request "<task>"`
3. read `DESIGN.md` and only packet-relevant context
4. use the universal `design` Skill
5. inspect actual components, stories, tests, fixtures, routes, and applicable visual references
6. reuse mapped components and semantic tokens
7. treat missing capability as a design-system gap
8. run `design check`
9. run `design verify` with affected surfaces and evidence files
10. report the exact revision, receipt path, limitations, and evidence

shadcn/ui is supported as an optional reference adapter because its primitive and block vocabulary fits this system well. It is not required by the package, does not need to be installed beside the contract, and is never platform authority. A project can use shadcn/ui, another component source, or no component library at all.

The installer creates thin adapters and managed Skills:

- Codex: a managed `AGENTS.md` block, `.agents/skills/design`, compatibility Skill routers, and target-root overrides
- Claude Code: an actual `@AGENTS.md` import, `.claude/skills/design`, and compatibility Skill routers
- GitHub Copilot: a managed repository instruction block

The adapters use the zero-install GitHub command so they work immediately after initialization.

## Project ownership and migration

The package never silently overwrites:

```text
DESIGN.md
design/references/
```

Legacy installations that copied the full engine into `.design/` are migrated by `sync`. Existing context, mappings, decisions, exceptions, custom overrides, registry files, and the previous visual contract are preserved before obsolete engine copies are removed.

When registry files such as `design/PROJECT.md`, `design/COMPONENTS.md`, `design/REFERENCES.md`, `design/DECISIONS.md`, or `design/COMPOSITION.json` exist, `sync` backs them up under `design/migrations/`, appends their content to `DESIGN.md` under migrated sections, removes the old registry files, and preserves `design/references/`. The migration result lists every backup and appended source.

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

The engine describes intent; `DESIGN.md` identifies the shipped implementation or the place where the consuming product owns it. A useful mapping records:

- intent ID
- production component and API
- approved variants
- story or interaction test
- Figma or golden reference
- supported targets
- status and owner

An unmapped critical intent is a visible system gap, not permission for arbitrary local CSS. A visual reference without a production mapping is evidence of appearance, not implementation authority.

## Visual references

Visual references are project-owned evidence, not package assets. The installer reserves `design/references/` as the local place for approved screenshots, photos, mood references, golden states, and Mobbin-style pattern references. Reference metadata belongs in the references section of `DESIGN.md`.

Reference designs are not required for initial adoption. They become valuable when a team has product direction, brand intent, screenshots from an existing product, or a small set of examples that should keep future AI-generated work cohesive. Do not download hundreds of photos with the contract, and do not treat even ten photos as universal authority. Prefer the smallest approved set that applies to the surface being changed, then record why each reference matters.

The Mobbin-style model is useful because it organizes real product inspiration by surface, flow, pattern, interaction, and screen state. Design Contract should learn from that browsing shape without copying Mobbin data, imagery, brand, or paywalled content. A reference entry must say what to preserve and what not to copy so inspiration does not become imitation.

Agents must inspect applicable approved references before designing or visually modifying a surface and list the references used in the task packet or receipt. If no approved reference applies, they should say so and continue from `DESIGN.md`, production code, and the real rendered surface.

## Component-source composition and app types

The package can build on shadcn/ui without making shadcn’s defaults the product identity or a required dependency. The consuming project records component-source policy, app types, Skill expectations, reference policy, and production mappings in `DESIGN.md`.

The composition grammar has four responsibilities:

- identify the optional component source, registry, style, and local `ui`/`blocks`/`recipes`/`references` paths;
- define app types such as `saas-workbench`, `admin-console`, `content-studio`, or `marketing-site`;
- map each app type to an engine profile, shell, layout, reusable block families, and intent IDs;
- require reuse of mapped components and semantic tokens before a new primitive or block is introduced.

Select an app type on initialization:

```bash
design init --profile web-app --app-type saas-workbench
```

The target’s `appType` is routing metadata, not a new platform profile. `web-app` still owns browser behavior; the project grammar chooses the product shape and optional block vocabulary layered on top of it. An app-specific Linear-inspired workbench is therefore a recipe in the consuming project, not a copied Linear identity in the shared engine.

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

`npm run validate:strict` executes package structure checks and Google’s `DESIGN.md` linter. `npm test` covers one-file façade installation, target isolation, bounded task resolution, source checking, verification receipts, stale/tampered output, engine pinning, sync preservation, legacy migration, conflict backups, readiness modes, explanation, and path safety. `npm run build` produces deterministic package metadata. `npm run smoke` packs the exact package shape, installs it into a clean consumer, initializes a project, compiles compatibility context, runs `design resolve`, `design check`, `design verify`, and validation, and confirms that the engine was not copied into the consumer. `npm run benchmark` measures component fidelity against local clean-room-ready fixtures; `npm run benchmark:release` is reserved for clean AI-generated candidates with prompt hashes, allowed-input hashes, no-target-access attestation, and scores that meet the 99% target.

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

Product repositories then add their own rendered, interaction, accessibility, visual-regression, performance, and platform-native checks using the verification commands and mappings recorded in `DESIGN.md`.

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
