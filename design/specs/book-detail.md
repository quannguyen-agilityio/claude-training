# Spec: Book detail

**Card:** [`../cards/book-detail.html`](../cards/book-detail.html) · **Route:** `/:bookId` (`pages/Book`) · **Status:** draft 1 (2026-10-16) · **Uses:** [`foundations.md`](foundations.md)

## Purpose

See everything about one book, and edit or delete it.

## Data

From `ApiRequest.getBookById(bookId)`:

| Field | Shown as |
| --- | --- |
| `thumbnail` | Large cover, 2:3, `w-80` on desktop. Fallback tile when missing or broken |
| `category` | `CategoryBadge` above the title |
| `title` | `h1` (longest: "Around the World in Eighty Days", wraps to 2 lines) |
| `author` | "by **Robert Louis Stevenson**" under the title |
| `description` | Body text, `text-lg leading-relaxed`, max 65 characters per line. "No description yet." in `muted` when empty |
| `published`, `country`, `publishers`, `category` | A 2×2 details grid (`dl`) with uppercase labels: Published, Country, Publisher, Category (longest publisher: "McClelland and Stewart") |

## Layout

**Desktop (≥768px):**

```
[Header: same as home, search included]
← All books
┌────────┐  ● Adventure
│        │  Treasure Island                (h1)
│ cover  │  by Robert Louis Stevenson
│  2:3   │
│ w-80   │  Young Jim Hawkins finds a treasure map...
│        │  ┌ PUBLISHED ──┬ COUNTRY ───────┐
└────────┘  │ 1883        │ United Kingdom │
            ├ PUBLISHER ──┼ CATEGORY ──────┤
            │ Cassell...  │ Adventure      │
            └─────────────┴────────────────┘
            [✎ Edit book] [🗑 Delete]
```

- A "← All books" link (44px tall) replaces the "Book Details" bar and its Back button.
- Two columns: the cover (`w-80`) and the content (`max-w-2xl`), with `gap-14`.
- The actions sit under the details: **Edit book** (`primary`, a link) and **Delete** (`danger-secondary`).

**Phone (<768px):** one column. The cover is centered at `w-48`, then the content. The details grid stays 2 columns. The action buttons are full width, side by side.

## Components

`Header`, `LinkButton`, `Button`, `CategoryBadge`, `Skeleton`, `EmptyState`. Replaces `BookBar`, `SubHeader`, `BookActions`, `BookPanel`, `DetailGroup`, `BookDetails`.

## States

- [ ] **1. Default:** Treasure Island
- [ ] **2. Long content:** Around the World in Eighty Days (2-line title)
- [ ] **3. Missing cover and description:** fallback tile and "No description yet."
- [ ] **4. Loading:** skeleton cover, title and lines
- [ ] **5. Not found:** empty state "We couldn't find that book" with "Back to all books"
- [ ] **6. Interaction states:** back link hover/focus, buttons hover/focus
- [ ] Light and dark
- [ ] Desktop and phone

## Interactions

- **← All books:** goes to `/`, keeping the home filters (they live in the store).
- **Edit book:** link to `/edit-book/:bookId`.
- **Delete:** opens the [delete dialog](delete-dialog.md). After deleting, go to `/`.
- **Category badge:** not clickable (today's blue pills look clickable but aren't).

## Accessibility

- One `h1` (the title). Details use `<dl>`/`<dt>`/`<dd>`.
- The cover has `alt="Cover of {title}"`.
- The loading state sets `aria-busy="true"` on `main`.

## Logic changes

1. **Not found:** `getBookById` throws "Book not found", which today goes to `alert()` and leaves an empty page. Catch it and render the not-found state.
2. **Loading:** render skeletons instead of the full-screen overlay; today `if (!currentBook)` never shows anything because the initial value is `{}`.

## Open questions

- [ ] Add a "More in {category}" row under the details (the canvas showed one)? It needs a filtered query, so it's a new feature, not a restyle. Left out of this draft.
- [ ] Should the header search stay on this page, or only on home?
