# Design contract index

This is the smallest stable entry point for humans and agents. The installed `.design/` directory is the product-design source of truth; generated contracts are target-specific views of it.

## Agent read order

1. Read `project.json` to identify the target named by the task.
2. Read `generated/INDEX.md`.
3. Read only the selected target’s generated `CONTRACT.md`.
4. Follow `AGENT.md` before implementation.
5. Inspect production components, routes, stories, fixtures, tests, and design mappings before proposing new system behavior.

Do not read every platform vertical. Sibling verticals describe different expectations and create contradictory context.

## Human navigation

| Need | Canonical location |
| --- | --- |
| Portable visual tokens and rationale | `DESIGN.md` |
| Product philosophy and judgment | `global/PRINCIPLES.md` |
| Structure, IA, interaction, trust, accessibility, content, performance, motion | `global/` |
| Component intent and behavior | `components/` |
| Shells, layout archetypes, pages, states, and flows | `patterns/` |
| Native and web conventions | `verticals/` |
| Product-specific brief, surfaces, components, themes, assets, terminology, and golden references | `project/` |
| Definition of done, review scorecard, evidence, and lintable rules | `quality/` |
| Accepted decisions and bounded exceptions | `governance/` |
| Source provenance and external research | `sources/` |

## Authority

1. Accessibility, safety, legal, privacy, security, and platform-enforced requirements.
2. The actual person, task, domain, risk, and explicit project requirement.
3. Project context, accepted decisions, and unexpired exceptions.
4. Global contract layers.
5. The selected family, platform, and surface overlays in resolved order.
6. Compliant production components and mapped design assets.
7. Supporting research and source provenance.
8. Framework defaults and model preference.

A later overlay may specialize a global rule for its declared scope. It may not silently weaken a higher authority.

## Contract grammar

```text
person, situation, and task
→ target profile
→ product philosophy and trust boundary
→ family, platform, and surface overlay
→ shell
→ layout archetype
→ page or flow pattern
→ regions, hierarchy, and scroll ownership
→ interaction pattern
→ component intent and variant
→ semantic token
→ production mapping
→ rendered evidence
```

## Ownership

- Exact portable visual tokens: `DESIGN.md`
- Inheritance and profiles: `manifest.json`
- Mandatory agent procedure: `AGENT.md`
- Global judgment: `global/`
- Component selection: `components/`
- Shells, layouts, pages, states, flows: `patterns/`
- Native and surface conventions: `verticals/`
- Product-specific implementation truth: `project/`
- Quality gates and evidence: `quality/`
- Durable changes: `governance/`
- Provenance: `sources/`

Raw source snapshots explain lineage. Ordinary implementation follows the operational contract and project-owned registries, not the source archive.
