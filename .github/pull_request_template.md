## Design-engine change

### Need and scope

- Person or product need:
- Affected profiles, targets, and surfaces:
- Owning contract and stable rule IDs:
- Decision, exception, gap, or migration:

### Contract and façade synchronization

- [ ] Root and engine `DESIGN.md` agree in the package repository.
- [ ] Owning contracts, manifest, schemas, templates, compiler behavior, and Skills agree.
- [ ] The installed façade remains limited to `DESIGN.md`, `AGENTS.md`, `design/`, and generated `.design/` state.
- [ ] Project-owned identity, mappings, and decisions survive synchronization and migration.
- [ ] Source coverage and changelog are updated where applicable.
- [ ] Representative native, web, and composite target contracts were inspected.

### Evidence

- [ ] `npm run validate:strict`
- [ ] `npm test`
- [ ] `npm run build`
- [ ] `npm run smoke`
- [ ] Google `DESIGN.md` lint
- [ ] Ubuntu and Windows workflow results
- [ ] accessibility, platform, migration, and compatibility implications reviewed
- [ ] intentional baseline or behavior changes documented
