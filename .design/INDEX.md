# Design engine index

This directory is the canonical engine and standard library for the `@byronwade/design-contract` package. It is intentionally detailed. Consuming projects do not copy or edit this tree; they expose a small façade and compile only the target context they need.

Start with the repository `README.md` for installation and product usage.

## Consuming-project read order

1. Read root `AGENTS.md`.
2. Run `design status`; run `design sync` when the engine is out of date.
3. Run `design resolve --request "<task>"` and use the returned bounded task packet.
4. Read root `DESIGN.md` and only the packet-relevant generated context.
5. Use the universal `design` Skill from `.agents/skills`, `.claude/skills`, or repository `skills/`.
6. Use `design/references/` only for approved screenshots, photos, golden states, and pattern notes that apply to the task.
7. Inspect production components, routes, stories, fixtures, tests, and design mappings before proposing new system behavior.

Do not read sibling platform contracts unless cross-platform comparison is explicitly the task.

## Engine navigation

| Need | Canonical engine location |
| --- | --- |
| Package visual defaults and Google-compatible rationale | `DESIGN.md` |
| Mandatory design and implementation procedure | `AGENT.md` |
| Product philosophy and judgment | `global/PRINCIPLES.md` |
| Structure, IA, interaction, trust, accessibility, content, performance, motion | `global/` |
| Component intent and behavior | `components/` |
| Shells, layout archetypes, pages, states, and flows | `patterns/` |
| Native, web, and hybrid conventions | `verticals/` |
| Definition of done, evidence, and stable rules | `quality/` |
| Canonical package decisions and change history | `governance/` |
| Engine schemas | `schema/` |
| Source provenance and external research | `sources/` |

Installed product context is not stored here. The active AI workflow lives in generated router files and installed Skills. Product identity, product context, component-source policy, mappings, references, decisions, exceptions, and acceptance live in root `DESIGN.md`. Reference media live in `design/references/` in the consuming repository.

## Authority

1. Accessibility, safety, legal, privacy, security, and platform-enforced requirements.
2. The actual person, task, domain, risk, and explicit project requirement.
3. Project context, accepted decisions, and unexpired exceptions.
4. Global engine layers.
5. The selected family, platform, and surface overlays in resolved order.
6. Compliant production components and mapped design assets.
7. Supporting research and source provenance.
8. Framework defaults and model preference.

A later overlay may specialize an earlier rule only for its declared scope. It may not weaken a higher authority.

## Contract grammar

```text
person, situation, and task
→ target profile
→ product philosophy and trust boundary
→ family, platform, and surface overlay
→ shell
→ layout archetype
→ page or flow
→ regions, hierarchy, and scroll ownership
→ interaction pattern
→ component intent and variant
→ semantic token
→ production mapping
→ rendered evidence
```

## Compilation ownership

- Engine inheritance and profiles: `.design/manifest.json`
- Engine workflow: `.design/AGENT.md`
- Project visual identity, product grammar, mappings, references, decisions, and acceptance: consuming root `DESIGN.md`
- Project reference media: consuming `design/references/`
- Target selection: consuming `.design/config.json`
- Installed engine version: consuming `.design/lock.json`
- Compiled target context: consuming `.design/generated/`

Raw source snapshots explain lineage. Ordinary implementation follows the compiled operational contract and verified project mappings, not the source archive.
