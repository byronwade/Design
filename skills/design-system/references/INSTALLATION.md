# Installation and synchronization

## Initial installation

```bash
npx --yes github:byronwade/Design init --profile web-app
```

The installer creates one authored source plus generated adapters and hidden state:

```text
DESIGN.md
AGENTS.md
design/references/
.agents/skills/design/SKILL.md
.design/generated/
.design/receipts/
```

Only configuration, lock state, cache, generated packets, and receipts live under
`.design/`. The full engine remains in the package.

## Resolve, check, verify

```bash
design resolve --request "Add an approval workflow"
design check
design verify --mode release --surface approval --evidence artifacts/approval.html
```

Run `resolve` after changing `DESIGN.md`, target configuration, or overrides. Do
not edit `.design/generated/`.

## Synchronization

```bash
design sync
```

Synchronization updates the engine version and managed adapters, recompiles legacy
context, and preserves project-owned visual identity and references. Legacy
registry files under `design/` are backed up, folded into `DESIGN.md`, and removed.

## Health

```bash
design status
design check
design verify --mode release --surface SURFACE --evidence PATH
```

Release verification requires rendered structure, accessibility, keyboard/focus,
responsive, overflow, state, browser screenshot or static-capture, and approved-baseline
evidence when a baseline exists.
