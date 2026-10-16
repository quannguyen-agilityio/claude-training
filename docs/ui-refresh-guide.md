# UI Refresh Guide: Working with Claude

How to modernize the `practice-one` UI (React 18, Vite, Tailwind, Storybook) with Claude Code, using design specs, Plan mode and the other tools in the right order.

## The overall approach

Treat a UI refresh as four phases, and don't let Claude touch real code until phase 3:

1. **Audit:** Claude reads the current UI and lists what looks outdated.
2. **Design:** for each screen, write a spec in Markdown, build an HTML card in `design/`, and review every state until nothing is unclear.
3. **Plan:** in Plan mode, turn the approved specs and cards into a step-by-step migration plan.
4. **Implement:** one small, checkable slice at a time (design tokens first, then shared components, then pages).

The most common mistake is asking "make the UI modern" in one prompt. You get a large, inconsistent diff that's hard to review.

| Phase  | Tool                                  | What you get                                                 |
| ------ | ------------------------------------- | ------------------------------------------------------------ |
| Audit  | Screenshots + chat                    | List of what's outdated (`docs/ui-audit.md`)                 |
| Design | Markdown specs + HTML cards           | An approved spec and card per screen in `design/`            |
| Plan   | **Plan mode**                         | A plan saved in `docs/`                                      |
| Build  | Normal mode, slice by slice           | Small commits, checked in Storybook and against the cards    |
| Finish | `/code-review`, `/simplify`           | A clean merge request                                        |

## 1. Audit first

Ask for a written assessment, not changes:

> Review the UI in `practice-one/src` (layouts, components, pages, `tailwind.config.cjs`, `index.css`). List what looks outdated: typography, spacing, color, component patterns, responsiveness, accessibility. Don't change any code.

If the app is running, use `/run` or the Chrome extension (`claude-in-chrome`) so Claude takes **screenshots** of the real pages. Claude judges visuals much better from screenshots than from JSX alone. Pasting your own screenshots into the prompt works too.

## 2. Design: spec, card, review, repeat

Design one screen at a time (home, book detail, add/edit form, delete dialog). Each screen goes through the same loop, and only leaves it when nothing about it is unclear.

```
design/
├── specs/            # one Markdown spec per screen: what it must do
│   ├── home.md
│   └── book-detail.md
└── cards/            # one standalone HTML card per screen: what it looks like
    ├── home.html
    └── book-detail.html
```

### Step 1: Write the screen spec in Markdown

The spec is the source of truth. It says *what* the screen must do; the card only shows it. Ask Claude to draft it from the audit and the real code, then edit it yourself:

> Write `design/specs/home.md` for the home screen, based on `docs/ui-audit.md` and the current code. Use the real data shape from `src/data/books.json`. Don't change any app code.

Each spec covers:

- **Purpose:** what the user comes to this screen to do, in one or two sentences.
- **Data:** which fields are shown, with the real names from `books.json` (`title`, `author`, `published`, `category`, `thumbnail`...).
- **Layout:** desktop, tablet and phone (390px), and what moves or stacks at each breakpoint.
- **Components:** which shared parts it uses (`Button`, `Input`, `BookCard`...) and any new ones.
- **States:** every state the screen can be in (see the checklist below).
- **Interactions:** what each click, hover, focus and keyboard action does.
- **Accessibility:** focus order, labels for icon buttons, contrast, dialog behavior.
- **Open questions:** anything not yet decided. The loop ends when this list is empty.

**State checklist** (delete the ones that don't apply, and say why):

- [ ] Default, with realistic data (all 12 seed books)
- [ ] Loading
- [ ] Empty (no books, or no search/filter results)
- [ ] Error (a failed load or save)
- [ ] Long content (the longest title, author and description)
- [ ] Missing data (no cover image, no description)
- [ ] Hover, focus and disabled for every interactive element
- [ ] Light and dark theme
- [ ] Desktop (1440px) and phone (390px)

### Step 2: Build the HTML card in `design/`

A card is one standalone `.html` file per screen that shows **every state from the spec on one page**, side by side, so nothing hides behind a click.

> Build `design/cards/home.html` from `design/specs/home.md`. Make it one standalone HTML file using the Tailwind CDN, with the theme tokens from the spec in its Tailwind config. Show each state from the spec as its own labeled section, in light and dark, at 1440px and 390px. Use the real books from `src/data/books.json`.

Rules for cards:

- **Use Tailwind classes and the planned tokens.** The class names then carry straight over to the React components in phase 4.
- **Use real content:** real titles, long text, empty and error states. Mockups that only show ideal data hide layout problems.
- **Keep it out of the app:** cards are reference files, not components. Nothing in `practice-one/` imports them.
- **Label every state** with the same name the spec uses, so feedback can point at it ("Empty state, phone, dark").

### Step 3: Review every state, then change it

Open the card in a browser, or have Claude screenshot it (`docs/ui-audit/screenshots.mjs` shows how to drive headless Chrome). Go through the spec's state checklist one item at a time and tick each state only when it looks right.

When something is wrong, **change the spec first, then the card**, so the two never drift apart:

> In `design/specs/home.md`, the empty state should offer "Clear filters" and "Add a book". Update the spec, then the card.

Be specific with feedback. "The cards feel cramped: increase the gap to 32px and lighten the border" works much better than "make it nicer."

### Step 4: Repeat until nothing is unclear

Go around steps 1–3 again for every change. A screen is **done** when:

- every state in the checklist is ticked or removed with a reason,
- the spec's **Open questions** list is empty,
- the card matches the spec (ask Claude to compare them and list differences), and
- you, or a reviewer, approve it in a merge request that only touches `design/`.

Then move on to the next screen. Shared parts (header, buttons, inputs) settle while designing the first screen or two, so later screens go faster.

### Step 5: Then build it in the real app

Only approved specs and cards go into phase 3. They are the input to the migration plan, and the reference every slice in phase 4 is checked against.

**Optional:** to show a card to teammates who won't open the repo, ask Claude to publish it as an **Artifact** and share the link to collect comments. Feed what you learn back into the spec, which stays the source of truth.

## 3. Plan mode: use it for the migration plan

Turn Plan mode on (**Shift+Tab** to cycle modes) when every screen you're changing is approved. In Plan mode Claude can read and explore but can't edit, so you get a plan to review before anything changes.

> Using the approved specs in `design/specs/` and cards in `design/cards/`, plan the UI migration. Start with Tailwind theme tokens, then shared components in `src/components`, then layouts, then pages. Keep Storybook stories in sync. Each step should be a separate commit that builds and lints.

What to check in the plan:

- **Tokens come first:** colors, fonts, radii and spacing go into `tailwind.config.cjs` before any components change. Otherwise every component hardcodes its own values.
- **Each step can be checked on its own:** after each step, `pnpm build`, `pnpm lint:eslint` and Storybook should still work.
- **Scope stays visual:** no logic or data changes mixed in. That keeps the diffs reviewable.
- **Every state is covered:** each state in the specs maps to a step, a Storybook story, or both.

Save the plan to `docs/` (e.g. `docs/ui-refresh-plan.md`, like `mock-data-migration-plan.md`), so later sessions can pick it up.

## 4. Implement one slice at a time

- **One slice per prompt:** "Do step 2 of `docs/ui-refresh-plan.md` only." Review the diff, commit, then continue.
- **Check visually, not just with the build:** after each slice, have Claude screenshot the page or Storybook story and compare it to the card in `design/cards/`. Build checks miss visual regressions.
- **Use Storybook as your test bench:** ask Claude to add a story for each state in the spec (hover, disabled, loading, empty, error, long content).
- **Run `/code-review` and `/simplify` before merging:** they catch leftover hardcoded colors, duplicated class strings and similar issues.
- **Use a branch or worktree:** do the refresh on its own branch (e.g. `feat/ui-refresh`) off `sample-project`, so it's easy to throw away a direction you don't like.

## 5. Making the tools work well together

- **Put design rules in `practice-one/CLAUDE.md`** once they're decided, e.g. "Use only Tailwind theme tokens, no arbitrary hex values; components live in `src/components` with a Storybook story; mobile-first; `design/specs/` is the source of truth for UI." Every future session then follows them automatically.
- **Use `/clear` between phases, and between screens in phase 2.** The audit and the design back-and-forth fill up context; the saved spec, card and plan are enough to carry forward.
- **Be specific with feedback.** "Make the cards feel less cramped, increase padding and reduce border contrast" works much better than "make it nicer."
- **Use subagents only for wide searches.** For example: "find every hardcoded color across `src`." For design work, staying in the main conversation is better.

## Next step

The audit is done (`docs/ui-audit.md`), and phase 2 steps 1–2 are drafted for every screen in `design/` (start at `design/cards/index.html`). Next is step 3: review each card state by state, answer the open questions in each spec, and change the spec first, then the card.
