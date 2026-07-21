---
id: governance.decisions
kind: governance
version: 1.0.0
status: project-owned
---

# Design decisions

Project owners append accepted decisions here. The installer preserves this file during synchronization.

## D-001 — Source authority

- **Status:** accepted
- **Decision:** `sources/PRIMARY.md` is the primary visual and application authority. `sources/APPLE-DESIGN.md` supplies compatible global principles and Apple-specific behavior. `sources/ANIMATION-AUDIT.md` supplies the specialized audit workflow.
- **Reason:** one explicit hierarchy prevents parallel sources of truth.

## D-002 — Google-compatible visual core

- **Status:** accepted
- **Decision:** `DESIGN.md` uses only Google’s current alpha top-level schema and canonical section order. Inheritance and custom metadata live in `manifest.json` and contract files.
- **Reason:** portable linting and export should remain possible without weakening application structure.

## D-003 — Resolved context, not full-repository context

- **Status:** accepted
- **Decision:** agents consume one generated target contract. Sibling verticals are excluded unless comparison is the task.
- **Reason:** contradictory platform guidance reduces consistency and wastes context.

## D-004 — Canonical Skills with thin adapters

- **Status:** accepted
- **Decision:** canonical workflows live under `skills/`. The installer generates small adapters for Codex, Claude, and Copilot rather than duplicating full Skills.
- **Reason:** one workflow can evolve without synchronization drift.

## D-005 — Linux environment overlays

- **Status:** accepted
- **Decision:** Linux has a base contract plus GNOME and KDE Plasma overlays. Projects select one rather than treating Linux as a single visual platform.
- **Reason:** the environments have materially different navigation and command conventions.
