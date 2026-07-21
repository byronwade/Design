# Influences and Adaptation Notes

> Source map for Calm Capability, Warm Paper Workbench, the UI review contract, and the motion practice.
>
> This repository is an independent synthesis. It is not an official extension of any referenced company’s design system, and none of the referenced organizations or authors has endorsed it.

## How sources are used

The repository borrows **decision structures, critique methods, interaction discipline, and implementation checks**. It does not copy another company’s brand styling or treat an external source as a substitute for product context.

The authority order is:

1. The actual person, task, domain, constraints, and explicit project brief.
2. [`DESIGN_PRINCIPLES.md`](DESIGN_PRINCIPLES.md).
3. [`DESIGN.md`](../DESIGN.md), [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md), [`motion/MOTION_PRINCIPLES.md`](motion/MOTION_PRINCIPLES.md), and documented project decisions.
4. Existing platform and repository conventions that do not conflict with the first three levels.
5. External references and framework defaults.

## Core sources

### Shopify — Experience values

Source: [Shopify Experience Values](https://github.com/Shopify/polaris-react/blob/main/polaris.shopify.com/content/foundations/experience-values.mdx)

Primary contribution:

- A small set of experience qualities used as lenses for critique.
- A concise rationale followed by observable behavior.
- Consideration, empowerment, craft, efficiency, trust, and familiarity as product outcomes rather than visual styles.

Adaptation into Calm Capability:

| Shopify lens | Repository adaptation |
| --- | --- |
| Considerate | **Consider the whole situation** — design for actual conditions, constraints, access needs, and recovery. |
| Empowering | **Make capability feel attainable** — keep professional depth reachable without intimidation. |
| Crafted | **Craft the whole path** — author every state, behavior, detail, and recovery path. |
| Efficient | **Protect momentum** — preserve context and remove repetitive effort without removing necessary safety. |
| Trustworthy | **Make trust tangible** — expose state, scope, consequence, evidence, permissions, and recovery. |
| Familiar | **Start familiar; become unmistakable** — preserve learned fundamentals and express identity through domain-specific structure. |

The repository adds **Compose complexity into calm** and **Grow without drift** to address operational structure and living-system governance explicitly.

### Vercel — Design engineering and web interface guidelines

Sources:

- [Design Engineer Principles](https://vercel.com/design/engineer)
- [Web Interface Guidelines](https://vercel.com/design/guidelines)
- [Agent-ready Markdown review source](https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md)

Primary contribution:

- Own the full experience rather than polishing a narrow screenshot.
- Understand the real constraint and full audience.
- Protect quality and raise the implementation floor.
- Convert design quality into terse, code-reviewable requirements.
- Review semantic HTML, focus, forms, navigation state, touch, motion, performance, theming, locale, and copy with concrete file-and-line output.

Adaptation:

[`review/UI_REVIEW_GUIDELINES.md`](review/UI_REVIEW_GUIDELINES.md) preserves the executable-review posture, then adds the repository’s own product character, stable workbench model, scoped controls, warm visual language, data presentation, agentic trust rules, motion contract, and anti-generic criteria.

## Supporting product and interface sources

### GitLab — Sophisticated simplicity

Sources:

- [Product Designer Workflow](https://handbook.gitlab.com/handbook/product/ux/product-designer/)
- [Pajamas design principles](https://design.gitlab.com/get-started/principles)

Contribution:

- Balance structure, discovery, and capability.
- Keep powerful features accessible without creating an “everything at once” interface.
- Evaluate whether content must be visible in the current context.
- Reduce unnecessary boxes used as a substitute for hierarchy.
- Preserve natural flow across connected work.

### Ant Design — Design values

Source: [Ant Design values](https://github.com/ant-design/ant-design/blob/master/docs/spec/values.en-US.md)

Contribution:

- Interfaces are a means to complete work, not the objective.
- Restraint, certainty, and modularity reduce uncertainty.
- Clear goals and immediate feedback make interaction meaningful.
- Product capability and user proficiency should grow without system drift.

### Rauno Freiberg — Interfaces

Source: [Interfaces](https://github.com/raunofreiberg/interfaces/blob/main/README.md)

Contribution:

- Feedback appears near its trigger.
- Repeated interactions avoid unnecessary motion.
- Touch and pointer behavior receive different treatment.
- Optimistic updates include rollback and visible state.
- Empty states lead to a useful next action.
- Hit areas avoid dead zones.
- Small interface details accumulate into perceived quality.

### Visual Studio Code — UX architecture

Source: [VS Code UX Guidelines](https://github.com/microsoft/vscode-docs/blob/main/api/ux-guidelines/overview.md)

Contribution:

- Stable containers with contextual items.
- Clear roles for navigation, sidebars, editors, panels, status, commands, and settings.
- Add capability to an established interface instead of creating a competing mini-application.
- Preserve keyboard depth, restoration, and workbench focus.

### GitHub — Content design principles

Source: [GitHub Content Design Principles](https://github.com/github/docs/blob/main/content/contributing/writing-for-github-docs/content-design-principles.md)

Contribution:

- Write for the person’s goal and priority.
- Create only as much content as the task requires.
- Prioritize clarity, meaning, correctness, and consistency.
- Use principles to decide cases not covered by a style rule.
- Ship and revise through learning rather than theoretical completeness.

### UK Office for National Statistics — Design principles

Source: [ONS Design Principles](https://github.com/ONSdigital/design/blob/master/principles.md)

Contribution:

- Inclusion as a baseline.
- User need and evidence before assumption.
- Do less, but make it better.
- Progressive enhancement.
- Learn through iteration.
- Be consistent without forcing uniformity.
- Share reasoning and failures when possible.

### Joshua David Thomas — Frontend design principles

Sources:

- [Frontend Design Principles](https://github.com/joshuadavidthomas/agent-skills/blob/main/frontend-design-principles/SKILL.md)
- [Application Design](https://github.com/joshuadavidthomas/agent-skills/blob/main/frontend-design-principles/app.md)
- [Technical Principles](https://github.com/joshuadavidthomas/agent-skills/blob/main/frontend-design-principles/references/principles.md)

Contribution:

- Define the actual person, task, intended feeling, domain, natural color world, signature, and defaults to reject before generating UI.
- Treat navigation, typography, data, and token language as design decisions rather than neutral infrastructure.
- Use swap, squint, signature, and token tests to detect generic output.
- Favor restrained application motion, meaningful color, subtle layers, and content-specific layouts.

Adaptation and divergence:

- Native semantic controls remain the default.
- Custom controls require a genuine product need and complete accessibility behavior.
- Warm Paper Workbench is one coherent application direction, not a menu of unrelated aesthetics.

## Motion and physical interaction sources

### Apple — Design principles, fluid interfaces, motion, and typography

Sources:

- [Principles of great design — WWDC26](https://developer.apple.com/videos/play/wwdc2026/250/)
- [Designing Fluid Interfaces — WWDC18](https://developer.apple.com/videos/play/wwdc2018/803/)
- [The details of UI typography — WWDC20](https://developer.apple.com/videos/wwdc2020/)
- [Human Interface Guidelines: Motion](https://developer.apple.com/design/human-interface-guidelines/motion)
- [Human Interface Guidelines: Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility/)

Contribution:

- Purpose, agency, responsibility, familiarity, flexibility, simplicity, craft, and delight as connected design foundations.
- Response begins with input and remains continuous during direct manipulation.
- Gesture-driven objects follow the person, inherit velocity, project momentum, and remain interruptible.
- Motion preserves spatial paths and anchored origins.
- Soft boundaries and rubber-banding communicate constraint without appearing frozen.
- Reduced motion, transparency, contrast, and typography are integral to craft.

Adaptation:

[`motion/MOTION_PRINCIPLES.md`](motion/MOTION_PRINCIPLES.md) translates these ideas into a restrained web application contract. It does not attempt to reproduce Apple’s visual language, platform materials, or every native animation value. [`motion/APPLE_FLUID_INTERACTION.md`](motion/APPLE_FLUID_INTERACTION.md) retains the more detailed web translation.

### Emil Kowalski — Great Animations

Sources:

- [Great Animations](https://emilkowal.ski/ui/great-animations)
- [You Don’t Need Animations](https://emilkowal.ski/ui/you-dont-need-animations)

Contribution:

- Purpose and frequency come before easing and duration.
- High-frequency and keyboard actions often need no entrance animation.
- Product UI motion should feel fast and normally remain below 300ms.
- Ease-out creates quick perceived response for many entrances.
- Transform and opacity are the default performance-friendly properties.
- Motion remains interruptible, accessible, and coherent with the product’s overall character.
- Sometimes the best animation is no animation.

Adaptation:

The read-only advisor skill in [`.agents/skills/improve-animations/`](../.agents/skills/improve-animations/) uses an audit-then-plan workflow: map the motion surface, audit eight categories, verify each finding, prioritize by leverage, and write self-contained implementation plans. The Claude copy remains synchronized under `.claude/skills/`.

## Internal lineage

| Internal artifact | Contribution |
| --- | --- |
| Warm Paper Workbench | Warm tactile surfaces, compact controls, integrated paper chrome, precise typography, depth hierarchy, component behavior, and design-system governance. |
| Calm Workbench / Linear layout research | Stable location, task-specific layout archetypes, zoned density, scope-driven controls, and progressive disclosure for operational software. |
| Velocity product and platform research | Source-level truth, evidence before acceptance, reversibility, isolation, honest state, human authority, provider independence, and chat as an auxiliary rather than the sole product surface. |
| Animation audit workflow | Purpose-and-frequency review, precise motion findings, leverage-based prioritization, and executor-ready plans. |
| Apple web translation notes | Direct manipulation, interruption, velocity handoff, momentum projection, materials, accessibility, typography, and design foundations. |

## Intentional departures

- Product UI uses sentence case rather than adopting title-case conventions from another source.
- The default visual expression is warm and tactile rather than monochrome, cool-neutral, or purely flat.
- Compact controls are retained, with accessibility achieved through labels, focus, hit-area engineering, spacing, zoom support, and responsive adaptation rather than universal oversized controls.
- Professional interfaces remain visually quiet but operationally deep.
- Cards are not universal containers; documents, lists, tables, boards, timelines, and integrated regions remain first-class.
- Motion is restrained for repeated work. Apple-like physicality is used for direct manipulation, not as a blanket aesthetic.
- Trust guidance is expanded for agentic systems: source-backed changes, fresh evidence, isolation, approvals, and rollback are first-class design concerns.
- Distinctiveness comes from the domain, information model, typography, and meaningful signatures—not from copying the visual style of a source company.
