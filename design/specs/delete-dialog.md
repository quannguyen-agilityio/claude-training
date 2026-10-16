# Spec: Delete dialog

**Card:** [`../cards/delete-dialog.html`](../cards/delete-dialog.html) · **Opened from:** home (card and row delete buttons), book detail (Delete) · **Component:** `ConfirmBox` → `Dialog` · **Status:** draft 1 (2026-10-16) · **Uses:** [`foundations.md`](foundations.md)

## Purpose

Confirm before deleting a book, so nobody deletes one by accident.

## Data

The book's `id` (from `currentBookId` in the store, as today) and its `title`, which is new: the dialog names the book.

## Layout

```
          ┌ Dialog (max-w-md, rounded-xl, surface, shadow-popover) ┐
          │ (🗑)  Delete "Treasure Island"?                       │
          │       This removes the book from your library.        │
          │       You can't undo this.                            │
          │                              [Cancel] [Delete book]   │
          └───────────────────────────────────────────────────────┘
backdrop: one layer, `bg-black/60` in both themes (no blur stacking)
```

- **Desktop:** centered, `max-w-md`, `p-6`, `rounded-xl`, `shadow-popover`. A small `danger-soft` circle with a trash icon replaces the large warning triangle.
- **Phone:** `px-4` page margins and `w-full max-w-md`, so it never overflows (fixes `min-w-[600px]`). It sits near the top (`pt-24`) so it stays above the on-screen keyboard and thumb zone. The buttons stack full width, with **Delete book** on top.
- **One backdrop.** `ConfirmBox` and `Modal` both draw one today, which doubles the dimming.

## Components

`Dialog` (new, replaces `common/Modal`), `Button` (`secondary`, `danger`), `Alert`.

## States

- [ ] **1. Default:** over the home page, Treasure Island
- [ ] **2. Long title:** "Delete "The Hound of the Baskervilles"?" wraps cleanly
- [ ] **3. Deleting:** Delete button shows a spinner and "Deleting…", both buttons disabled
- [ ] **4. Delete failed:** inline alert in the dialog "We couldn't delete this book." The Delete button becomes "Try again"
- [ ] **5. Focus:** Cancel has focus when the dialog opens
- [ ] Light and dark (the dialog uses `surface`, so it's dark in dark mode; today it stays white)
- [ ] Desktop and phone

## Interactions

- **Open:** focus moves to **Cancel** (the safe choice). The page behind can't scroll.
- **Cancel, Esc or a click on the backdrop:** closes the dialog and returns focus to the button that opened it.
- **Delete book:** shows the deleting state, then closes, removes the book and goes to `/` with the list refreshed. On failure it shows the failed state and stays open.
- **Tab:** focus stays inside the dialog (focus trap).

## Accessibility

- `role="alertdialog"`, `aria-modal="true"`, `aria-labelledby` (title) and `aria-describedby` (body text).
- The trash icon is decorative (`aria-hidden`).
- Copy is direct and names the book: "Delete "{title}"?" replaces "Are you sure to delete this book?" and "You will not be able to recover this action!"

## Logic changes

1. **Show the title:** the store holds `currentBookId` only, so the dialog needs the book (or its title) too.
2. **Focus management:** focus on open, focus trap, Esc, restore focus on close.
3. **Failure state:** show the inline alert instead of `alert(error)`.
4. **After delete:** navigate with the router and refresh the list instead of `window.location.assign('/')` (a full page reload).

## Open questions

- [ ] Show an "Undo" toast after deleting instead of asking first? (A bigger change; this draft keeps the confirmation.)
