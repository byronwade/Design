# Public content model

The website is a real documentation and showcase product today. It does not need a backend to establish its public information architecture or its content contract.

## Local-first record

Showcase entries currently live in `website/src/data/showcase.ts` and use this shape:

```ts
type ShowcaseRecord = {
  slug: string
  title: string
  author: string
  kind: 'Official reference' | 'Curated example'
  surface: 'web app' | 'web marketing' | 'mobile' | 'desktop'
  summary: string
  tags: string[]
  preview: 'warm' | 'blue' | 'green' | 'ink' | 'rose' | 'yellow'
  screens: ShowcaseScreen[]
  source: string
  notes: string[]
}

type ShowcaseScreen = {
  label: string
  title: string
  caption: string
  preview: string
  asset?: string
  alt?: string
}
```

The current static site is the transport. Pages should read records, not know whether they came from a TypeScript module, an API route, or a database query.

## Current contribution workflow

Open [`/showcase/submit/`](../../website/src/pages/showcase/submit.astro) in the local site for the contributor-facing record shape, example, review checklist, and backend boundary. Today a contribution is a pull request that adds a typed record to `website/src/data/showcase.ts`; it is not a fake browser submission.

## Future backend seam

When the backend is introduced, preserve these public invariants:

1. `slug` remains the stable public URL under `/showcase/<slug>/`.
2. `title`, `author`, `surface`, `summary`, and `tags` remain available for cards, search, metadata, and sharing.
3. `screens` remain structured context views; each can use a local CSS specimen today or an asset path later.
4. `notes` remain structured content, not a single HTML blob.
5. Submission state, moderation state, assets, and permissions remain separate from the public reading record.
6. The public shell remains documentation/showcase-oriented; administrative workflows do not become the main navigation.

The first backend should add persistence and contribution workflows, not force a redesign of the public surface.
