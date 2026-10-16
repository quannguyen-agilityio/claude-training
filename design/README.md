# BookShelter design

Phase 2 of [`docs/ui-refresh-guide.md`](../docs/ui-refresh-guide.md): one Markdown spec and one HTML card per screen. Nothing in `practice-one/` imports these files.

| Screen | Spec | Card |
| --- | --- | --- |
| Foundations (tokens, shared components) | [`specs/foundations.md`](specs/foundations.md) | [`cards/foundations.html`](cards/foundations.html) |
| Home (book list) | [`specs/home.md`](specs/home.md) | [`cards/home.html`](cards/home.html) |
| Book detail | [`specs/book-detail.md`](specs/book-detail.md) | [`cards/book-detail.html`](cards/book-detail.html) |
| Book form (add and edit) | [`specs/book-form.md`](specs/book-form.md) | [`cards/book-form.html`](cards/book-form.html) |
| Delete dialog | [`specs/delete-dialog.md`](specs/delete-dialog.md) | [`cards/delete-dialog.html`](cards/delete-dialog.html) |

## Rules

- **The spec is the source of truth.** Change the spec first, then the card.
- **Cards show every state** from the spec's checklist as a labeled section.
- **Cards use the planned tokens.** `cards/_shared/tokens.css` and `cards/_shared/tailwind.config.js` become the token block in `practice-one/src/index.css` and the theme in `practice-one/tailwind.config.cjs`. The class strings in `cards/_shared/design.js` are the reference for the React components.
- **Real data only.** `design.js` holds a copy of `practice-one/src/data/books.json` (version 1). Update it if the seed changes.

## Opening the cards

Open [`cards/index.html`](cards/index.html) in a browser (double-click works; it needs internet for the Tailwind CDN, Google Fonts and the Open Library covers). The bar at the top of each card can:

- switch to the **dark theme** (or add `?theme=dark` to the URL),
- show a **phone (390px)** preview,
- **jump to a state** (or show only one with `?state=<slug>`, e.g. `home.html?state=4-no-search-results`).

Add `&frame=1` to hide the bar, e.g. for screenshots.

## Review checklist (step 3)

For each card: go through the spec's **States** list in light and dark, at desktop and phone width. Tick a state in the spec only when it looks right. Anything undecided goes under **Open questions**. A screen is done when every state is ticked and that list is empty.
