# ADR-0001: One-File Design Control Plane

Status: accepted
Date: 2026-07-23

## Context

The current package is healthy, but it exposes too much authored surface to consuming
projects. A project installs `DESIGN.md`, `AGENTS.md`, several `design/*.md` files,
`design/COMPOSITION.json`, generated context, Skills, and engine metadata. That made
the system useful, but it also made ownership hard to explain: agents could treat
compiled context, mappings, references, and adapter instructions as separate sources
of truth.

The product direction is now stricter:

- people author one design grammar in `DESIGN.md`;
- optional screenshots, photos, and golden states live under `design/references/`;
- instructions, schemas, caches, fingerprints, receipts, and agent adapters are
  generated or hidden;
- the public workflow is `Understand -> Resolve -> Build -> Check -> Verify`;
- the public CLI is `design init`, `design resolve`, `design check`, and
  `design verify`.

## Decision

Design Contract becomes a model-independent control plane with one authored source of
truth and generated enforcement artifacts.

### Keep

- Google-compatible token front matter in `DESIGN.md`.
- The package engine under `.design/` for profiles, inheritance, source provenance,
  stable rule IDs, fingerprints, tamper detection, and release validation.
- `sync` migration discipline: never overwrite project-owned identity or decisions.
- Optional component-source adapters. shadcn/ui remains a useful reference adapter,
  never a required package or authority.
- Project-owned visual references under `design/references/`; no bundled screenshot
  or photo sets.
- Mobbin-style website lessons: fast browsing, dense filters, visual metadata,
  source-linked docs, and no copied screenshots.

### Replace

- Replace public `context`-first usage with `resolve`-first task modeling.
- Replace broad compiled dumps for ordinary work with bounded task packets: task
  model, relevant components, tokens, patterns, references, constraints, and checks.
- Replace two required Skills with one universal `design` Skill. Agent-specific files
  become thin generated routers into `design resolve`, `design check`, and
  `design verify`.
- Replace project-owned `design/PROJECT.md`, `design/COMPONENTS.md`,
  `design/DECISIONS.md`, and `design/COMPOSITION.json` authoring with sections in
  `DESIGN.md`.

### Remove

- Remove new-install dependence on authored registry files outside `DESIGN.md`.
- Remove `resolve` as a compatibility alias for full context compilation.
- Remove CI acceptance paths that can pass without a design receipt.

### Migrate

- `design/PROJECT.md`, `design/COMPONENTS.md`, `design/DECISIONS.md`, and
  `design/COMPOSITION.json` are folded into `DESIGN.md` during `sync` when a legacy
  project is detected.
- Conflicting legacy content is backed up under `design/migrations/`.
- `design/REFERENCES.md` content is folded into the references section of
  `DESIGN.md`; referenced files under `design/references/` are preserved.
- `.design/generated/` and `.design/receipts/` remain generated state.

## Interface

The public command interface is:

```text
design init
design resolve --request "..."
design check
design verify --request "..."
```

`design-contract` remains a backwards-compatible binary during migration. Legacy
commands continue to exist while documentation and adapters move to the new public
surface.

## Design Grammar

`DESIGN.md` owns:

- product, users, roles, terminology, and domain objects;
- guidance classification: invariant, preferred, open;
- target profiles, token sources, component sources, and optional adapters;
- layout, navigation, responsiveness, states, accessibility, content, trust, and
  acceptance;
- production mappings, visual references, decisions, exceptions, and verification.

Rules are executable records with scope, checker, severity, evidence, remediation,
and exception policy.

## Consequences

- The resolver can give an AI less context with more authority.
- The checker and verifier can reject drift even when the AI claims compliance.
- The website can explain the model in under a minute because the project surface is
  one authored file plus optional references.
- Release verification now has a local evidence contract: rendered HTML evidence is
  inspected for accessibility semantics, keyboard and focus risks, responsive
  signals, overflow risks, and state coverage; local Chrome, Edge, or Chromium is
  used for a browser screenshot when available; deterministic static captures are
  generated as the portable fallback; approved baseline manifests are compared
  when present. Browser-native interaction beyond the captured surface and
  platform-specific assistive-technology checks remain project-specific evidence
  that can be attached to the same receipt.
