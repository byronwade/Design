---
id: governance.decisions
kind: governance
version: 1.2.0
status: normative
---

# Design decisions

This file records canonical engine decisions. Installed projects record their own decisions, exceptions, gaps, migrations, and baseline approvals in `design/DECISIONS.md`.

## D-001 — Source authority

- **Status:** accepted
- **Decision:** `sources/PRIMARY.md` is the primary visual/application authority. `sources/DESIGN-PRINCIPLES.md` supplies the product-judgment, trust, review, and agent framework. `sources/APPLE-DESIGN.md` supplies compatible global and Apple-specific behavior. `sources/ANIMATION-AUDIT.md` supplies the specialized audit workflow.
- **Reason:** one explicit hierarchy prevents parallel sources of truth while preserving lineage.

## D-002 — Google-compatible visual core

- **Status:** accepted
- **Decision:** `DESIGN.md` uses only Google’s current alpha top-level schema and canonical section order. Inheritance and custom metadata live outside that YAML.
- **Reason:** portable linting and export remain possible without weakening application structure.

## D-003 — Compiled context, not full-engine context

- **Status:** accepted
- **Decision:** agents consume one compiled target contract. Sibling verticals are excluded unless comparison is the task.
- **Reason:** contradictory platform guidance reduces consistency and wastes context.

## D-004 — Canonical Skills with thin adapters

- **Status:** accepted
- **Decision:** canonical workflows live under `skills/`. Installation creates small Codex, Claude, and Copilot adapters rather than duplicating full Skills.
- **Reason:** one workflow can evolve without synchronization drift.

## D-005 — Linux environment overlays

- **Status:** accepted
- **Decision:** Linux has a base contract plus GNOME and KDE Plasma overlays. Projects select one rather than treating Linux as a single visual platform.
- **Reason:** the environments have materially different navigation and command conventions.

## D-006 — Project truth is part of compiled context

- **Status:** accepted
- **Decision:** root visual identity, product context, terminology, surface inventory, production component mappings, themes, assets, references, decisions, and active exceptions are applied after shared engine and selected profile layers.
- **Reason:** an abstract engine cannot determine a project’s actual objects, vocabulary, component APIs, evidence, or intentional departures.

## D-007 — Shell and layout are separate decisions

- **Status:** accepted
- **Decision:** standard application, deep workbench, focus mode, and header-first are shell choices. Centered action, document/rail, operational canvas, feed, settings, and comparison are layout archetypes inside a shell.
- **Reason:** mixing persistent application structure with page-body geometry creates inconsistent navigation and responsive behavior.

## D-008 — Quality is executable and evidence-backed

- **Status:** accepted
- **Decision:** `quality/RULES.json`, the scorecard, and the evidence contract are normative. Validation checks structural integrity and context freshness; product repositories add rendered, interaction, accessibility, performance, and visual checks.
- **Reason:** prose guidance without stable rule IDs, mappings, fixtures, and evidence cannot reliably prevent drift.

## D-009 — Simple project façade, versioned package engine

- **Status:** accepted
- **Decision:** consuming projects expose root `DESIGN.md`, root `AGENTS.md`, and `design/PROJECT.md`, `design/COMPONENTS.md`, and `design/DECISIONS.md`. The detailed global, component, pattern, quality, platform, and source contracts remain in the versioned package engine.
- **Reason:** daily adoption should be obvious and standard-aligned without sacrificing inheritance, selective context, governance, or enforcement.

## D-010 — Root DESIGN.md is canonical in a consuming project

- **Status:** accepted
- **Decision:** an installed project owns one editable root `DESIGN.md`. The package repository may keep an internal mirror for package integrity, but the installer never creates a second editable project copy.
- **Reason:** two visible visual-contract files create ambiguity even when hashes are synchronized.

## D-011 — Generated context is disposable compiler output

- **Status:** accepted
- **Decision:** `.design/generated/` contains reproducible Markdown and JSON target contracts. Authored inputs and generated outputs are fingerprinted; stale or hand-edited output fails health checks.
- **Reason:** agents need focused, durable context, but generated output must never become a competing source of truth.

## D-012 — Project-authored truth survives synchronization

- **Status:** accepted
- **Decision:** `DESIGN.md` and `design/` are never silently replaced by package synchronization. Legacy copied-engine installations migrate their project content into the façade before obsolete engine copies are removed.
- **Reason:** package upgrades must not erase product identity, implementation mappings, accepted decisions, or bounded exceptions.
