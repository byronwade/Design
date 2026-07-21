# Installation and synchronization

## Initial installation

```bash
npx --yes github:byronwade/Design init --profile web-app
```

The installer owns canonical contract files and records their hashes in `.design/.install.json`. It does not claim project decisions, exceptions, project configuration, or overrides after installation.

## Synchronization

```bash
npx --yes github:byronwade/Design sync
```

A managed file updates only when its current hash still matches the previously installed hash. Local edits become reported conflicts instead of being overwritten. `--force` deliberately replaces conflicts.

## Project configuration

Edit `.design/project.json`, then run:

```bash
npx design-contract resolve
npx design-contract validate
```

Never edit `.design/generated/` directly.
