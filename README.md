# Design Contract

An installable, target-aware `.design/` system for AI-assisted product design and implementation.

Google’s `DESIGN.md` remains the portable visual core. This repository adds the structure that a token file cannot express reliably: product judgment, authority, platform inheritance, shells, layouts, page and flow patterns, component intent, project mappings, agent workflows, quality rules, evidence, installation, synchronization, and validation.

> **Global contract:** Carry complexity for the person. Make the main path clear, preserve context, expose consequence, provide reliable recovery, and adapt the expression to the target platform without losing the product’s identity.

## Start here

For humans:

1. Read [`.design/INDEX.md`](.design/INDEX.md).
2. Review [the global principles](.design/global/PRINCIPLES.md) and [visual core](.design/DESIGN.md).
3. Select a target profile in [`.design/manifest.json`](.design/manifest.json).
4. Complete the project-owned files under [`.design/project/`](.design/project/).
5. Map product surfaces, production components, themes, assets, and golden references before scaling implementation.
6. Use [the quality review](.design/quality/REVIEW.md) and [evidence contract](.design/quality/EVIDENCE.md) as the release definition.

For agents, the installed adapters route to one generated target contract. Agents must not load sibling platform verticals unless cross-platform comparison is explicitly the task.

## Architecture

```text
.design/
├── DESIGN.md                 Google-compatible visual tokens and rationale
├── manifest.json             inheritance, profiles, ownership, source integrity
├── INDEX.md                  smallest human/agent entry point
├── AGENT.md                  mandatory design and implementation workflow
├── global/                   cross-platform philosophy and system behavior
├── components/               intent, anatomy, state, and selection contracts
├── patterns/                 shells, layouts, pages, states, and flows
├── verticals/                mobile, desktop, web, and hybrid overlays
├── project/                  project-owned context, surfaces, mappings, themes, assets, terminology, references
├── quality/                  definition of done, evidence, and lintable rules
├── governance/               decisions, exceptions, and version history
├── schema/                   manifest, project, and quality-rule schemas
└── sources/                  protected provenance and coverage map
```

Root `DESIGN.md` is an exact CI-verified mirror of `.design/DESIGN.md` for tool discovery; `.design/DESIGN.md` remains canonical.

The contract grammar is:

```text
person and situation
→ target profile
→ global product and trust contract
→ platform/surface overlay
→ shell
→ layout archetype
→ page or flow
→ regions and scroll ownership
→ component intent and variant
→ semantic token
→ production mapping
→ rendered evidence
```

## Profiles

| Profile | Resolution |
| --- | --- |
| `ios-native` | global → mobile → Apple → iPhone |
| `ipados-native` | global → mobile → Apple → iPadOS |
| `android-native` | global → mobile → Android |
| `macos-native` | global → desktop → macOS |
| `windows-native` | global → desktop → Windows |
| `linux-gnome` | global → desktop → Linux → GNOME |
| `linux-kde` | global → desktop → Linux → KDE Plasma |
| `web-app` | global → web → application |
| `web-marketing` | global → web → marketing |
| `electron-*` | global → web app → desktop-webview → host desktop |

A responsive browser app on iPhone remains `web-app`; it does not inherit native iOS behavior. Select the shipped experience, not the implementation language alone.

## Install into a project

From the target repository:

```bash
npx --yes github:byronwade/Design init --profile web-app
```

For a multi-product repository:

```bash
npx --yes github:byronwade/Design init \
  --profile web-app \
  --profile ios-native \
  --profile android-native
```

Then complete `.design/project/`, refine target IDs/roots in `.design/project.json`, and run:

```bash
npx --yes github:byronwade/Design resolve
npx --yes github:byronwade/Design status
npx --yes github:byronwade/Design validate
```

The installer creates:

- the canonical `.design/` contract
- target-specific generated contracts under `.design/generated/`
- a managed root `DESIGN.md` mirror when the project does not own one
- thin Codex, Claude, and GitHub Copilot adapters
- `.design/.install.json` hashes for conflict-safe synchronization

## Commands

Use the GitHub package directly for one-off or always-current operation:

```bash
npx --yes github:byronwade/Design list
npx --yes github:byronwade/Design resolve
npx --yes github:byronwade/Design status
npx --yes github:byronwade/Design sync
npx --yes github:byronwade/Design validate --require-google
```

Or install the tool as a development dependency and use the shorter local command:

```bash
npm install --save-dev github:byronwade/Design
npx design-contract status
```

`sync` updates only unchanged managed files. Project context, surfaces, component mappings, themes, assets, terminology, references, decisions, exceptions, and configuration remain project-owned. Conflicts are reported rather than overwritten unless `--force` is explicit.

## Source of truth and precedence

1. accessibility, safety, legal, privacy, security, and platform enforcement
2. the actual person, task, domain, risk, and explicit project requirement
3. project context, accepted decisions, and active exceptions
4. global contracts
5. selected platform and surface overlays
6. compliant production components and mapped design assets
7. supporting sources and research
8. framework defaults and model preference

The supplied Warm Paper source is the primary visual/application authority. Calm Capability supplies product judgment, trust, review, and agent principles. Apple and animation sources specialize interaction and motion. [Source coverage](.design/sources/COVERAGE.md) shows where each durable requirement is operationalized.

## Release quality

A change is ready only when the selected target, shell, layout, page/flow, states, responsive transformations, project mappings, accessibility, performance, trust, evidence, and recovery are explicit. Run:

```bash
npm run check
```

The check validates inheritance, source integrity, schemas, links, generated-context freshness, quality-rule IDs, Google `DESIGN.md`, and installer behavior. Product repositories must add rendered component/page tests, accessibility checks, runtime flows, performance evidence, and intentional visual-regression approval.

See [`CONTRIBUTING.md`](CONTRIBUTING.md) before changing the canonical contract.
