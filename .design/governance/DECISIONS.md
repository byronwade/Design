---
id: governance.decisions
kind: governance
version: 1.1.0
status: project-owned
---

# Design decisions

Project owners append accepted decisions here. The installer preserves this file during synchronization. Decisions include status, date, owner, scope, rationale, alternatives, consequences, migration, and evidence.

## D-001 — Source authority

- **Status:** accepted
- **Decision:** `sources/PRIMARY.md` is the primary visual/application authority. `sources/DESIGN-PRINCIPLES.md` supplies the product-judgment, trust, review, and agent framework. `sources/APPLE-DESIGN.md` supplies compatible global and Apple-specific behavior. `sources/ANIMATION-AUDIT.md` supplies the specialized audit workflow.
- **Reason:** one explicit hierarchy prevents parallel sources of truth while preserving lineage.

## D-002 — Google-compatible visual core

- **Status:** accepted
- **Decision:** `DESIGN.md` uses only Google’s current alpha top-level schema and canonical section order. Inheritance and custom metadata live in `manifest.json` and contract files.
- **Reason:** portable linting and export remain possible without weakening application structure.

## D-003 — Resolved context, not full-repository context

- **Status:** accepted
- **Decision:** agents consume one generated target contract. Sibling verticals are excluded unless comparison is the task.
- **Reason:** contradictory platform guidance reduces consistency and wastes context.

## D-004 — Canonical Skills with thin adapters

- **Status:** accepted
- **Decision:** canonical workflows live under `skills/`. Installation creates small Codex, Claude, and Copilot adapters rather than duplicating full Skills.
- **Reason:** one workflow can evolve without synchronization drift.

## D-005 — Linux environment overlays

- **Status:** accepted
- **Decision:** Linux has a base contract plus GNOME and KDE Plasma overlays. Projects select one rather than treating Linux as a single visual platform.
- **Reason:** the environments have materially different navigation and command conventions.

## D-006 — Project truth is part of resolved context

- **Status:** accepted
- **Decision:** product context, terminology, surface registry, production component mappings, themes, assets, golden references, accepted decisions, and active exceptions are appended to every generated target contract after global and platform layers.
- **Reason:** an abstract design system cannot determine a project’s actual objects, vocabulary, component APIs, evidence, or intentional departures.

## D-007 — Shell and layout are separate decisions

- **Status:** accepted
- **Decision:** standard application, deep workbench, focus mode, and header-first are shell choices. Centered action, document/rail, operational canvas, feed, settings, and comparison are layout archetypes inside a shell.
- **Reason:** mixing persistent application structure with page-body geometry creates inconsistent navigation and responsive behavior.

## D-008 — Quality is executable and evidence-backed

- **Status:** accepted
- **Decision:** `quality/RULES.json`, the scorecard, and the evidence contract are normative. Validation checks structural integrity and generated-context freshness; product repositories add rendered, interaction, accessibility, performance, and visual checks.
- **Reason:** prose guidance without stable rule IDs, mappings, fixtures, and evidence cannot reliably prevent drift.
