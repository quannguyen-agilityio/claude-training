# UI Design Directions: practice-one (BookShelter)

Phase 2 of [`ui-refresh-guide.md`](ui-refresh-guide.md). It's based on the findings in [`ui-audit.md`](ui-audit.md).

**Design canvas (Artifact):** https://claude.ai/artifact/RPSE5CGn1pQzVUsUEgcReB

The canvas has three directions. Each direction has a **Home** artboard and a **Book detail** artboard, built from the real seed data in `practice-one/src/data/books.json` (all 12 books and their covers). Every artboard has a **Dark** toggle in its Tweaks panel.

| Direction            | Look                                | Fonts                    | Accent                                 | Home pattern                                   | Card actions                                |
| -------------------- | ----------------------------------- | ------------------------ | -------------------------------------- | ---------------------------------------------- | ------------------------------------------- |
| **A · Clean Shelf**  | Calm product UI, light first        | Manrope                  | Brand blue `#0B63D8` (dark: `#4C9AFF`) | Category sidebar + cover grid                  | Edit and delete on the detail page only     |
| **B · Reading Room** | Editorial, serif titles, thin rules | Newsreader + Public Sans | Deep green `#1E5A46` (dark: `#7CC4A6`) | Hero + category tabs + 2-column catalogue list | Detail page only                            |
| **C · Night Shelf**  | Dark first, led by covers, rounded  | Sora + Figtree           | Amber `#F2B544` (light: `#8F5300`)     | Category chips + card grid                     | Edit and delete always visible on each card |

All three fix the main audit findings:

- **Covers:** shown at their real 2:3 shape, never cropped.
- **Touch targets:** 44px minimum.
- **Accessibility:** a visible focus ring, labeled icon buttons, and links that aren't wrapped around buttons.
- **Tokens:** role-based colors for light and dark.
- **Layout:** fluid flex and grid that stacks at phone width.

## Decision

<!-- Fill in once you've chosen, e.g. "A, with C's visible card actions and B's detail-page metadata table" -->

- Chosen direction: **A · Clean Shelf** (assumed by Claude to start the specs; confirm in review)
- Mix-ins from other directions: **C's always-visible edit/delete on cards** (touch support)
- Specs and cards: [`design/`](../design/README.md). They are now the source of truth; this canvas is only the exploration that led there.

## Next prompt (Phase 3, in Plan mode)

> Using the approved direction in `docs/ui-design-directions.md` (Artifact https://claude.ai/artifact/RPSE5CGn1pQzVUsUEgcReB) and the findings in `docs/ui-audit.md`, plan the UI migration. Start with Tailwind theme tokens, then shared components in `src/components/common`, then layouts, then pages. Keep Storybook stories in sync. Each step should be a separate commit that builds and lints. Save the plan to `docs/ui-refresh-plan.md`.
