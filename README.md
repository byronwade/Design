# Design Contract

An installable `.design/` system for AI-assisted product design and implementation.

The repository keeps Google’s `DESIGN.md` format as the portable visual core, then adds the application structure that a coding agent needs but a token file cannot express: authority, inheritance, target profiles, native conventions, shells, page patterns, component intent, state behavior, workflow Skills, installation, resolution, and validation.

> **Global contract:** Carry complexity for the person. Make the main path clear, preserve context, expose consequence, provide reliable recovery, and adapt the expression to the target platform without losing the product’s identity.

## Architecture

```text
.design/
├── DESIGN.md                 Google-compatible visual core
├── manifest.json             inheritance graph and target profiles
├── INDEX.md                  small routing document for agents
├── AGENT.md                  mandatory design/implementation workflow
├── global/                   product-wide philosophy and foundations
├── components/               intent and behavior contracts
├── patterns/                 shells, pages, and system states
├── verticals/                platform and product-surface overlays
├── governance/               decisions, exceptions, and change history
├── schema/                   manifest and project JSON schemas
└── sources/                  protected source material and research map
```

A project never asks an agent to read every vertical. The resolver selects one profile, follows inheritance in a deterministic order, and writes a target-specific contract under `.design/generated/`.

## Supported profiles

| Profile | Inheritance |
| --- | --- |
| `ios-native` | global → mobile → iOS/iPadOS |
| `android-native` | global → mobile → Android |
| `macos-native` | global → desktop → macOS |
| `windows-native` | global → desktop → Windows |
| `linux-gnome` | global → desktop → Linux → GNOME |
| `linux-kde` | global → desktop → Linux → KDE Plasma |
| `web-app` | global → web → application |
| `web-marketing` | global → web → marketing |
| `electron-macos` | global → web app → desktop → macOS |
| `electron-windows` | global → web app → desktop → Windows |
| `electron-linux-gnome` | global → web app → desktop → Linux → GNOME |
| `electron-linux-kde` | global → web app → desktop → Linux → KDE Plasma |

## Install into a project

From the target project directory:

```bash
npx --yes github:byronwade/Design init --profile web-app
```

Install more than one target when a repository contains multiple products:

```bash
npx --yes github:byronwade/Design init \
  --profile web-app \
  --profile ios-native \
  --profile android-native
```

The installer:

1. Copies the canonical `.design/` contract.
2. Creates `.design/project.json` with selected targets.
3. Resolves only the applicable inheritance chains.
4. Creates thin Codex, Claude, and GitHub Copilot adapters without duplicating the system.
5. Creates a managed root `DESIGN.md` mirror when the project does not already own one.
6. Records hashes in `.design/.install.json` so later synchronization can preserve project-owned changes.

## Commands

```bash
# Show available profiles
npx --yes github:byronwade/Design list

# Install
npx --yes github:byronwade/Design init --profile web-app

# Re-resolve after changing .design/project.json
npx --yes github:byronwade/Design resolve

# Update managed files while preserving decisions, exceptions, and overrides
npx --yes github:byronwade/Design sync

# Validate structure, inheritance, source hashes, Markdown links, and DESIGN.md
npx --yes github:byronwade/Design validate
```

Use `--adapters codex,claude,copilot`, `--adapters none`, `--target <directory>`, `--force`, or `--json` where applicable.

## Agent workflow

For design or UI work, an agent reads:

1. `.design/generated/INDEX.md`
2. the selected target’s generated `CONTRACT.md`
3. `.design/AGENT.md`
4. existing production components, stories, tests, and mappings

It must select a target profile, shell, page pattern, region and scroll model, component intent, state model, and verification plan before implementation. A new primitive requires a design-system gap proposal rather than page-local invention.

## Source authority

The protected source hierarchy is:

1. `.design/sources/PRIMARY.md` — the current Warm Paper Workbench source and primary visual/application authority.
2. `.design/sources/APPLE-DESIGN.md` — supplementary global interaction principles and the principal source for Apple-specific overlays.
3. `.design/sources/ANIMATION-AUDIT.md` — the specialized read-only motion-audit workflow.
4. `.design/sources/RESEARCH.md` — current official specifications and platform guidance used to operationalize the system.

Operational contracts are derived from those sources. Raw source snapshots provide provenance; they do not become parallel files an agent should read during ordinary implementation.

## Google DESIGN.md compatibility

`.design/DESIGN.md` uses only the current Google alpha schema: `version`, `name`, `description`, `colors`, `typography`, `rounded`, `spacing`, and `components`, followed by the canonical Markdown section order. Platform inheritance remains in `.design/manifest.json`, where it cannot create schema warnings or weaken portability.

The package pins `@google/design.md` `0.3.0` and uses the cross-platform `designmd` executable alias in scripts.
