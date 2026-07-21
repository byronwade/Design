# Calm Paper Workbench — Review Checklist

Use this list for design critique, code review, and release verification.

## Shell and scope
- [ ] An approved shell profile is used.
- [ ] Global navigation has one owner and is not duplicated.
- [ ] Object identity and view controls are separated by scope.
- [ ] Empty location/view bars are omitted.
- [ ] Focus mode preserves and restores state.

## Layout and density
- [ ] The screen is classified by body archetype.
- [ ] Density matches the task.
- [ ] Narrative measure is protected.
- [ ] Rails overlay before crushing primary content.
- [ ] Board/timeline geometry remains usable.
- [ ] Empty operational regions do not contain decorative filler.

## Foundations
- [ ] Colors, spacing, radii, type, and shadows use tokens.
- [ ] One restrained accent is used.
- [ ] Semantic state has non-color support.
- [ ] Persistent structure uses borders/tones before shadow.
- [ ] Nested paper shadows are absent.
- [ ] Routine radii above 16px are absent or documented.

## Components
- [ ] Controls follow 28/32/36px tiers.
- [ ] There is one dominant primary action per local region.
- [ ] Icon-only controls have names and tooltips where necessary.
- [ ] Cards group coherent content and are not universal wrappers.
- [ ] Toolbar/body/footer containers read as one paper shell.
- [ ] Inputs retain visible labels and local error messages.
- [ ] Lists/tables preserve alignment and critical metadata.

## Interaction
- [ ] Every meaningful action is keyboard operable.
- [ ] Important actions are command reachable.
- [ ] Local actions update the smallest meaningful region.
- [ ] Scroll, selection, tab, and inspector state are preserved.
- [ ] Common properties can be edited inline, in a popover, or nearby inspector.
- [ ] Confirmation is proportional to risk.
- [ ] Notifications are grouped and only material events escalate.

## Responsive
- [ ] ≥1280px reviewed.
- [ ] 1024–1279px reviewed.
- [ ] 768–1023px reviewed.
- [ ] <768px reviewed.
- [ ] Boards/timelines/tables use an intentional mobile representation.
- [ ] Effective touch targets are sufficient.

## Accessibility
- [ ] Semantic headings, landmarks, labels, names, roles, and states are correct.
- [ ] Focus order and focus-visible styling pass.
- [ ] Screen-reader announcements pass.
- [ ] WCAG AA contrast and visible boundaries pass.
- [ ] 200%+ zoom passes.
- [ ] Reduced motion and high contrast pass.
- [ ] Charts/spatial UI have textual equivalents.
- [ ] No state relies on color alone.

## States and quality
- [ ] Default, hover, focus, active, selected, and disabled states exist.
- [ ] Loading, empty, partial, error, offline, permission, and overflow states exist.
- [ ] Runtime console/network checks are clean.
- [ ] Visual regression captures required routes, states, themes, and viewports.
- [ ] No inert buttons or placeholder interactions remain.
- [ ] Exceptions are documented with scope, owner, and migration plan.
