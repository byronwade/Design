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
- **Decision:** canonical workflows live under `skills/`. Installation creates small Codex, Claude, and Copilot adapters rather than duplicating full Skills. Design-system Skills are mandatory workflow entrypoints for UI design, implementation, review, and motion work, even though each AI tool may expose them through a different local adapter.
- **Reason:** one workflow can evolve without synchronization drift.

## D-005 — Linux environment overlays

- **Status:** accepted
- **Decision:** Linux has a base contract plus GNOME and KDE Plasma overlays. Projects select one rather than treating Linux as a single visual platform.
- **Reason:** the environments have materially different navigation and command conventions.

## D-006 — Project truth is part of compiled context

- **Status:** accepted
- **Decision:** root visual identity, product context, terminology, surface inventory, production component mappings, themes, assets, visual references, decisions, and active exceptions are applied after shared engine and selected profile layers.
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
- **Decision:** consuming projects expose root `DESIGN.md`, root `AGENTS.md`, and project-owned `design/PROJECT.md`, `design/COMPONENTS.md`, `design/REFERENCES.md`, `design/DECISIONS.md`, and `design/COMPOSITION.json`. The detailed global, component, pattern, quality, platform, and source contracts remain in the versioned package engine.
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

## D-013 — Component sources are optional adapters, app types are project recipes

- **Status:** accepted
- **Decision:** consuming projects may declare a component source adapter such as shadcn/ui in `design/COMPOSITION.json`, but no component library is required by the engine. The project owns registry/style choices, local primitive and block paths, app-type recipes, and AI reuse policies. Platform profiles continue to own platform behavior; app types select product shape on top of a platform profile.
- **Reason:** teams should be able to compose a coherent SaaS workbench, admin console, content studio, or marketing surface from shared blocks without turning a framework’s defaults or another product’s identity into the package-wide source of truth.

## D-014 — Visual references are project-owned, not bundled assets

- **Status:** accepted
- **Decision:** consuming projects own visual references through `design/REFERENCES.md` and optional local files under `design/references/`. The package does not download or bundle photo sets. Approved references are optional for initial adoption, but agents must inspect applicable references before designing or visually modifying a surface. Mobbin-style entries name surface, flow, pattern, interaction, source/provenance, applicability, what to preserve, and what not to copy.
- **Reason:** images and real product pattern references can improve cohesion and design judgment, but bulk media in the package would inflate installs, blur ownership, and create stale, unauthorized, or copied visual authority.

## D-015 — Component fidelity claims require holdout evidence

- **Status:** accepted
- **Decision:** component-fidelity benchmark suites may be used for training or holdout evidence. If scored misses are used to improve an allowed contract, Skill, prompt, schema, or reference policy, that suite becomes training evidence. Public accuracy claims require a separate holdout suite, matching clean-room hashes, no-target-access provenance, and a passing release gate.
- **Reason:** trained suites are valuable product feedback, but they cannot prove generalized AI fidelity after the target has influenced the allowed inputs.
