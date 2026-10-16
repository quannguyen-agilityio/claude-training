# Spec: Home (book list)

**Card:** [`../cards/home.html`](../cards/home.html) · **Route:** `/` (`pages/Home`) · **Status:** draft 1 (2026-10-16) · **Uses:** [`foundations.md`](foundations.md)

## Purpose

Browse the library: narrow it by category, search by title, sort, switch between grid and list, and open, add, edit or delete a book.

## Data

From `ApiRequest.getAllBooks()` and `getBooksBySpecificFields(category, sort, search)` (`src/data/books.json`):

| Field | Shown as |
| --- | --- |
| `thumbnail` | Cover, 2:3, never cropped. Fallback tile when missing or broken |
| `title` | Card title, up to 2 lines then ellipsis (longest: "Around the World in Eighty Days") |
| `author` | Muted line under the title, 1 line (longest: "Robert Louis Stevenson") |
| `published` | Muted. Grid: its own line, "● 1883 · Adventure" (category dot + name). List: after the author |
| `category` | Grid: dot + name in the year line (a badge beside the actions got truncated). List: category badge |
| Category counts | Computed from all books (`books.filter(...).length`), as today |

The filters stay as they work today: **category** (All + 6 from `CategoryTitle`), **search** (title only, case-insensitive), **sort** (`SortType`: none, title, published, country; ascending), **display** (grid or list).

## Layout

**Desktop (≥1024px):**

```
┌ Header ───────────────────────────────────────────────────────────────┐
│ [■ BookShelter]   [🔍 Search by title            ]    [☾] [+ Add book] │
└───────────────────────────────────────────────────────────────────────┘
┌ Categories (w-60) ┐  All books                     [▦|☰] [Sort ▾]
│ ● All books    12 │  12 books
│ ● Adventure     2 │  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐
│ ● Contemporary  2 │  │2:3 │ │    │ │    │ │    │ │    │
│ ...               │  └────┘ └────┘ └────┘ └────┘ └────┘
└───────────────────┘  Title / Author / ● 1883 · Adventure / [✎ 🗑] (right-aligned)
```

- **Header:** logo left, search in the middle (`max-w-xl`), theme toggle and **Add book** on the right.
- **Categories:** a vertical list in a left column (`w-60`), not sticky.
- **Toolbar:** page title ("All books" or the category name), a result count, then the grid/list segmented control and the sort select on the right.
- **Grid:** `grid-cols-books` (auto-fill, min 10rem), `gap-x-6 gap-y-9`, which gives 5 columns at 1280px.
- **List:** one row per book: small cover (`w-16`), title, author · year, category badge, actions.

**Tablet (640–1023px):** categories move to a horizontal, scrollable chip row above the toolbar. The grid gets 3–4 columns.

**Phone (<640px):**

- Header: logo and buttons on the first row ("Add book" shrinks to a "+" icon button with a label), search full width on a second row. The hidden search toggle and the hamburger drawer are removed.
- Categories: a horizontal, scrollable chip row.
- Toolbar: title and count on one row; segmented control and sort on the next.
- Grid: 2 columns. List: rows stay the same but tighter.

## Components

`Header`, `SearchField`, `ThemeToggle`, `LinkButton` (Add book), category nav (new: list on desktop, chips on tablet/phone), `SegmentedControl`, `SelectField` (sort, compact), `BookCard` (grid), `BookRow` (list, new), `CategoryBadge`, `IconButton` (edit, delete), `Skeleton`, `EmptyState`, `Alert`. Replaces `FeaturesBar`, `FilterButton`, `FilterTable`, `DisplayOptions`, `SortOptions`, `FilterResult`, `FilterPanel`, `FilterPanelBackdrop`.

## States

- [ ] **1. Default:** All books, grid, default order, 12 books
- [ ] **2. List view:** same books as rows
- [ ] **3. Category + sort:** Adventure selected, sorted by release year, 2 books
- [ ] **4. No search results:** search "dune", empty state with "Clear search"
- [ ] **5. Empty library:** 0 books, empty state with "Add a book"
- [ ] **6. Loading:** header, nav and toolbar shown, cards as skeletons
- [ ] **7. Load error:** alert "We couldn't load your books." with "Try again"
- [ ] **8. Missing cover:** fallback tile with the title on a `raised` background
- [ ] **9. Interaction states:** card hover, card focus, icon button hover/focus, selected category, sort select open
- [ ] **10. Long content:** longest title and author wrap or truncate cleanly (covered in states 1–2)
- [ ] Light and dark (review bar toggle)
- [ ] Desktop and phone (review bar "Phone" preview)

## Interactions

- **Category:** clicking sets `currentCategory`; the selected one shows `accent-soft` background, `accent-ink` text, bold, `aria-pressed="true"`. Clicking "All books" clears it (replaces the separate ✕ button).
- **Sort:** a native `<select>` with "Default order", "Title A–Z", "Release year", "Country". "Default order" is `SortType.NONE` and replaces the separate ✕ reset button.
- **Display:** the segmented control switches grid/list (`aria-pressed`).
- **Card:** the cover and title are one link to `/:bookId`. Hover: the cover's shadow grows and the title underlines. Focus: ring around the link.
- **Edit / Delete:** always visible icon buttons on every card and row (not hover-only), labeled "Edit {title}" / "Delete {title}". Edit is a link to `/edit-book/:id`; Delete opens the [delete dialog](delete-dialog.md).
- **Search:** filters as you type; a clear (✕) button appears when it has text.
- **Empty states:** "Clear search" empties the search; "Show all books" resets the category; "Add a book" goes to `/add-new-book`.
- **Try again** (error state) repeats the request.

## Accessibility

- Landmarks: `header`, `nav aria-label="Categories"`, `main`. The page has one `h1` (the toolbar title).
- The result count is in an `aria-live="polite"` region, so screen readers hear "2 books" after filtering.
- Grid and list are `<ul>` lists; each book is an `<li>`.
- Covers in cards use `alt=""` because the title is right below; the fallback tile is `aria-hidden`.
- Edit/delete labels include the book title.

## Logic changes

Keep these out of the pure restyle steps:

1. **Search is not connected:** `searchInput` is in the store but nothing sets it, so typing does nothing today. Needs a `setSearchInput` action (the store pattern in `CLAUDE.md`).
2. **Empty and error states:** replace `alert(error)` with an error state, and show the empty states based on `currentBooks.length`, `books.length` and the search text.
3. **Skeleton loading:** use the existing `loading` flag to render skeletons instead of the full-screen `Loading` overlay.
4. **Phone layout:** removing the hamburger drawer and search toggle removes `showFilterPanel`/`showSearchBar` state from `Home`.

## Open questions

- [ ] Should search also match authors? (Today it's title only; the placeholder says "Search by title" to stay honest.)
- [ ] Remember grid/list and sort between visits (`localStorage`), or reset each time like today?
- [ ] Is the categories list fine as plain text with dots, or should it keep the 2-letter colored circles?
- [ ] Grid cards spend a row on the edit/delete buttons. OK, or move them into a "⋯" menu on the card (fewer visible buttons, one more tap)?
