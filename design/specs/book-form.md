# Spec: Book form (add and edit)

**Card:** [`../cards/book-form.html`](../cards/book-form.html) · **Routes:** `/add-new-book` (`pages/Add`), `/edit-book/:bookId` (`pages/Edit`) · **Component:** `BookForm` · **Status:** draft 1 (2026-10-16) · **Uses:** [`foundations.md`](foundations.md)

## Purpose

Add a new book or change an existing one, with clear errors before saving.

## Data

The `Book` fields, in this order, all required (as today):

| Field | Control | Validation (on blur, as today) | Message |
| --- | --- | --- | --- |
| `title` | Text | Not blank | "Enter a title." |
| `author` | Text | Not blank | "Enter an author." |
| `thumbnail` | URL text, labeled "Cover image URL" | Not blank, matches `RegexValue.URL` | "Enter a full link that starts with http:// or https://." |
| `published` | Number, labeled "Release year", placeholder "e.g. 1883" | Not blank, matches `RegexValue.POSITIVE_NUMBER` | "Enter a year, like 1883." |
| `publishers` | Text, labeled "Publisher" | Not blank | "Enter a publisher." |
| `country` | Text | Not blank | "Enter a country." |
| `category` | Select (6 categories) | Always set (defaults to Adventure) | — |
| `description` | Textarea, 5 rows | Not blank | "Enter a short description." |

The order changes to group related fields: title, author, cover, then the publishing facts, then the description.

## Layout

**Desktop (≥1024px):**

```
[Header: no search]
← All books   (edit: ← Back to book)
Add a book                                       (h1)
┌ Form (max-w-2xl) ─────────────────────┐  ┌ Cover preview (w-56) ┐
│ Title                                 │  │ ┌──────────┐        │
│ Author                                │  │ │   2:3    │        │
│ Cover image URL                       │  │ └──────────┘        │
│ Release year  │ Category              │  │ Preview updates     │
│ Publisher     │ Country               │  │ from the URL        │
│ Description (textarea)                │  └─────────────────────┘
│ ───────────────────────────────────── │
│                    [Cancel] [Add book]│
└───────────────────────────────────────┘
```

- The form sits in a `surface` panel (`rounded-xl`, `border-line`, `p-6 sm:p-8`), not a full-width bordered column.
- Short fields pair up in a 2-column grid (`sm:grid-cols-2`).
- Labels sit above fields. Errors sit below the field in normal flow (no absolute positioning, no reserved `mb-8` gap).
- The submit button says what it does: **Add book** or **Save changes**. **Cancel** goes back without saving.
- A cover preview sits beside the form on desktop and above the cover field on phone.

**Phone (<640px):** one column, the paired fields stack, the cover preview is `w-32` next to the cover URL field, and the actions are full width with the primary button first.

## Components

`Header`, `TextField`, `SelectField`, `TextAreaField`, `Button`, `LinkButton`, `Alert`, cover preview (new, uses the fallback tile). Replaces the restyled `common/Input`, `common/Select`, `common/Textarea`.

## States

- [ ] **1. Add, empty:** all fields empty, release year empty (not `0`), preview shows the fallback
- [ ] **2. Edit, filled:** Treasure Island, preview shows the cover
- [ ] **3. Validation errors:** title blank, cover URL invalid, year invalid, after blur
- [ ] **4. Saving:** fields disabled, submit shows a spinner and "Saving…"
- [ ] **5. Save failed:** alert at the top "We couldn't save this book. Your changes are still here." with "Try again"
- [ ] **6. Field states:** hover, focus, filled, error, disabled (also in [foundations](../cards/foundations.html))
- [ ] Light and dark
- [ ] Desktop and phone

## Interactions

- **Validation:** on blur per field, as today. On submit, if anything is invalid: show every field's error, move focus to the first invalid field, and don't save (replaces `alert('Form is invalid')`).
- **Cover preview:** updates when the cover URL field loses focus with a valid URL; falls back to the tile if the image fails to load.
- **Save:** disables the form while saving, then goes to the book's detail page (edit) or the home page (add), using the router instead of `window.location.assign`.
- **Cancel / back link:** back to `/` (add) or `/:bookId` (edit).

## Accessibility

- Every field has a `<label for>`. Errors are linked with `aria-describedby` and set `aria-invalid="true"`.
- Errors have an icon and text, not just a red border.
- The "Saving…" state sets `aria-busy` on the form; the failed-save alert has `role="alert"`.
- Required fields: say "All fields are required." once under the title instead of marking each field.

## Logic changes

1. **Release year starts empty**, not `0` (`published: 0` initial value; the type allows the field to be blank while editing).
2. **Submit validation** shows all errors and focuses the first invalid field, instead of `alert('Form is invalid')`.
3. **Year validation:** `published` is validated with `RegexValue.POSITIVE_NUMBER` (`ErrorMsgs.INVALID_YEAR` exists but is unused today).
4. **Error messages:** update `ErrorMsgs` to the friendlier per-field copy above.
5. **Save failure:** show the alert instead of `alert(error)`, and stop the unconditional `window.location.assign('/')` that runs even when saving failed.
6. **Field order:** title, author, cover, year, category, publisher, country, description.

## Open questions

- [ ] Is the cover preview worth adding now, or later?
- [ ] Should "Release year" limit the range (e.g. no future years)?
- [ ] Keep "Description" required, or allow books without one? (The `Book` type already makes it optional.)
