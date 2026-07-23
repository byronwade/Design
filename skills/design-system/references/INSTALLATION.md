# Installation and synchronization

## Initial installation

```bash
npx --yes github:byronwade/Design init --profile web-app
```

The installer creates the project-owned façade:

```text
DESIGN.md
AGENTS.md
design/PROJECT.md
design/COMPONENTS.md
design/REFERENCES.md
design/DECISIONS.md
design/COMPOSITION.json
```

Only configuration, lock state, cache, and compiled context live under `.design/`. The full engine remains in the package.

## Context

```bash
design-contract context
```

Run after changing `DESIGN.md`, `design/`, target configuration, or overrides. Do not edit `.design/generated/`.

## Synchronization

```bash
design-contract sync
```

Synchronization updates the engine version and managed adapters, recompiles context, and preserves project-owned visual identity, mappings, references, and decisions. Legacy copied-engine installations are migrated into the façade layout.

## Health

```bash
design-contract status
design-contract doctor
design-contract validate
```

Use `--mode release` to treat incomplete project context and mapping gaps as errors.
