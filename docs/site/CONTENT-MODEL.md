# Public content model

The website is a compact documentation and contract-reading product. It does not expose standalone component, block, showcase, skills, lab, or toolbox pages.

## Local-first records

Contract packs live in `website/src/data/contract-projects.ts`. A pack is the public product record for AI design behavior:

```ts
type ContractProject = {
  slug: string
  title: string
  command: string
  prompt: string
  files: string[] // context anchors, not a manual source-reading queue
  roles: string[]
  skills: ContractSkill[]
  photos: ReferencePhoto[]
  components: ComponentRewrite[]
  references: string[]
}
```

Canonical source entries still live in `website/src/data/reference.ts` and point back to repository files:

```ts
type ReferenceItem = {
  slug: string
  title: string
  section: ReferenceSection
  source: string
  status: 'Normative' | 'Reference' | 'Context' | 'Schema'
  description: string
  format?: 'markdown' | 'json'
}
```

Benchmark summaries for the public site live in `website/src/data/benchmarks.ts` and must be traceable to `benchmarks/component-fidelity/` plus `npm run benchmark` output. Public accuracy claims require release-eligible clean-room candidates with matching prompt and allowed-input hashes, a public-claim holdout suite, and no calibration fixtures. When a clean run is below target, show the measured score and misses as product evidence. When a trained suite reaches target after miss-derived contract updates, label it as training evidence instead of public accuracy.

The current static site is the transport. Contract pages should render the AI handoff, universal Skill, task packet anchors, checks, receipts, reference memory, and component showcase from the pack while still linking to canonical engine context. They should not know whether the record later came from a TypeScript module, API route, or database query.

## Current contribution workflow

Today a contribution is a pull request that changes the owning contract pack, schema, template, skill, source contract, or documentation file directly. The website renders those sources through `/contracts/` and `/docs/`.

## Future backend boundary

When a backend is introduced, preserve these public invariants:

1. Contract pack `slug` remains the stable public URL under `/contracts/<slug>/`.
2. `title`, `status`, `description`, `command`, `prompt`, `files`, `roles`, `skills`, `photos`, `components`, and `references` remain available for cards, filters, metadata, and sharing.
3. The source contract remains authoritative; rendered HTML is never the editable record.
4. The universal Skill remains the executable AI layer; `DESIGN.md` remains the authored source and task packets remain generated context.
5. Visual references stay project-owned and must not become bundled default media.
6. Component showcases remain examples of contract-applied primitives, not separate component documentation pages.
7. Benchmark calibration fixtures remain labeled as calibration and do not count as public model-performance claims.
8. Submission state, moderation state, assets, and permissions remain separate from the public reading record.
9. Administrative workflows do not become the main navigation.

The first backend should add persistence and contribution workflows, not force a redesign of the public surface.
