---
id: governance.changelog
kind: governance
version: 1.2.0
status: normative
---

# Changelog

## 1.2.0 — 2026-07-22

- added the project-owned `design/COMPOSITION.json` contract for optional component-source adapters, reusable blocks, app-type recipes, visual-reference policy, and AI reuse policies
- added project-owned `design/REFERENCES.md` so teams can register screenshots, photos, golden states, and Mobbin-style pattern references without bundling binary assets in the package
- made design-system Skills mandatory workflow entrypoints across adapters while keeping each agent adapter thin
- added optional `--app-type` target metadata so generated context identifies the product recipe without mixing platform profiles
- reshaped the public Astro surface around home, contract packs, contract detail pages, and docs, with component showcases, references, Skills, prompts, and evidence inside the owning contract detail page
- rebuilt the public site as a neutral design workbench with rendered contract previews, a compiler-stage homepage, compact benchmark evidence, responsive contract discovery, and pack-specific warm, graphite, and visual-reference detail experiences
- unified the public surface around a Cursor-inspired warm-black shell, added reusable shadcn-style Astro primitives, and separated contract filter attributes from card navigation so filtered contract links remain functional
- tightened the official-site route audit so removed route folders, broken generated links, and missing same-site anchors fail the site gate
- added component-fidelity benchmark fixtures and clean-room protocol, including trained button, filter, metric-card, inline-alert, and status-badge suites, original filter, metric-card, inline-alert, and status-badge holdout results, an active approval-badge public holdout, and the training-versus-holdout distinction for scoped public accuracy claims

## 1.1.0 — 2026-07-21

- replaced copied consuming-project engine trees with a minimal `DESIGN.md`, `AGENTS.md`, and `design/` façade
- compiled shared engine layers, one selected profile, and project-owned customization into focused Markdown and JSON target contracts
- added `context`, `doctor`, and `explain`, with `resolve` retained as an alias
- added generated-output hashes and stale or tampered context detection
- added development and release readiness modes plus Ajv-backed façade schemas
- generated an actual `@AGENTS.md` Claude import and thin Codex, Claude, and Copilot adapters
- added a safe migration from previous copied-engine installations while preserving project identity, mappings, decisions, and exceptions
- added deterministic build metadata, clean package installation tests, and exact-GitHub-commit production smoke tests on Ubuntu and Windows
- rewrote the README around the simple visible surface and package/compiler mental model

## 1.0.0-alpha.2 — 2026-07-21

- separated persistent shells from task-body layout archetypes
- added deep workbench, focus mode, page, state, and flow contracts
- added information architecture, trust, performance, commands/search, collaboration, agentic, workbench, and visualization contracts
- split iPhone and iPadOS behavior under a shared Apple overlay
- added a desktop-webview hybrid overlay for Electron, Tauri, and comparable hosts
- added project-owned context, terminology, production component, and golden-reference registries
- made project documents, decisions, and exceptions part of generated target context
- added quality scorecard, evidence contract, machine-readable rule catalog, and schema validation
- added deterministic generated-context fingerprints and installation status checks
- preserved the previous Calm Capability design-principles source and added source-to-contract coverage mapping

## 1.0.0-alpha.1 — 2026-07-21

- introduced the installable inheritance-aware `.design/` contract
- retained Google-compatible `DESIGN.md` as the portable visual core
- added mobile, desktop, web, Linux-environment, and Electron profiles
- added install, synchronize, resolve, validate, and agent adapter tooling
- protected the primary, Apple, and animation source material
