# Installation and synchronization

## Initial installation

```bash
npx --yes github:byronwade/Design init --profile web-app
```

The installer owns canonical contract files and records their hashes in `.design/.install.json`. Project context, terminology, component mappings, golden references, decisions, exceptions, configuration, and declared overrides become project-owned.

## Configure the project

1. Edit `.design/project.json` target IDs, roots, descriptions, and default target.
2. Complete `.design/project/CONTEXT.md` and `TERMINOLOGY.md`.
3. Register durable routes, screens, windows, shells, layouts, and states in `SURFACES.md`.
4. Map real component APIs, stories, and commands in `COMPONENTS.md`.
5. Map themes and production assets in `THEMES.md` and `ASSETS.md`.
6. Add representative golden routes/fixtures in `REFERENCES.md`.
7. Run `npx --yes github:byronwade/Design resolve` and `npx --yes github:byronwade/Design validate`.

## Status and synchronization

```bash
npx --yes github:byronwade/Design status
npx --yes github:byronwade/Design sync
```

A managed file updates only when its current hash still matches the previously installed hash. Local changes to managed files become reported conflicts rather than being overwritten. Project-owned files are always preserved. `--force` deliberately replaces managed conflicts but still does not rewrite project-owned documents that already exist.

Never edit `.design/generated/` directly. `status` reports stale generated context, changed managed files, missing files, installed version, and available package version.
