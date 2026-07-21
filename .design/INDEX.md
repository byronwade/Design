# Design contract index

This is the smallest stable entry point for an agent.

## Read order

1. Read `project.json` to identify the target named by the task.
2. Read `generated/INDEX.md`.
3. Read only the selected target’s generated `CONTRACT.md`.
4. Follow `AGENT.md` before implementation.
5. Inspect production components and tests before proposing new system behavior.

Do not read every platform vertical. Sibling verticals describe different expectations and can create contradictory context.

## Authority

1. Accessibility, safety, legal, privacy, security, and platform-enforced requirements.
2. The actual person, task, domain, risk, and explicit project requirement.
3. Accepted project decisions and unexpired exceptions.
4. Global contract layers.
5. The selected family, platform, and surface overlays in resolved order.
6. Existing production component APIs and mapped design assets that comply with the above.
7. Supporting research and source provenance.
8. Framework defaults and model preference.

A later overlay may specialize a global rule for its declared scope. It may not silently weaken a higher authority.

## Contract grammar

```text
person and task
→ target profile
→ product philosophy
→ family and platform overlay
→ shell
→ page pattern
→ region and scroll ownership
→ interaction pattern
→ component intent and variant
→ semantic token
→ rendered verification
```

## Ownership

- Exact portable visual tokens: `DESIGN.md`
- Inheritance and profiles: `manifest.json`
- Agent procedure: `AGENT.md`
- Global judgment: `global/`
- Component selection: `components/`
- Shells, pages, and states: `patterns/`
- Native and surface conventions: `verticals/`
- Durable changes: `governance/`
- Provenance: `sources/`
