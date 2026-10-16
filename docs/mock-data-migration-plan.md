# Plan — Replace the REST API with Local JSON Mock Data

> Status: **Draft for review** (2026-10-14). Nothing has been changed yet.
> Paths are relative to `practice-one/`.

## Table of Contents

1. [Goal](#1-goal)
2. [Current state](#2-current-state)
3. [Approach](#3-approach)
4. [Decisions to confirm](#4-decisions-to-confirm)
5. [Step-by-step](#5-step-by-step)
6. [Files touched](#6-files-touched)
7. [Verification checklist](#7-verification-checklist)
8. [Risks & notes](#8-risks--notes)
9. [Rollback](#9-rollback)

---

## 1. Goal

Run the app with **no backend and no `ROOT_URL`**. Books come from a JSON file in the repo. Add, edit, and delete keep working and survive page reloads.

**Out of scope:** fixing the bugs in [`likely-bugs.md`](./likely-bugs.md), except where this migration touches them. Search (bug #1) will *support* filtering by title after this change, but the search box still needs wiring separately.

---

## 2. Current state

All network access goes through one layer:

```
pages / components
      │  (only these 6 methods are used)
      ▼
src/services/api-request.ts   ApiRequest.getAllBooks / getBookById / getBooksBySpecificFields
      │                                  addBook / updateBook / deleteBook
      ▼
src/services/api-service.ts   generic getList/getItemById/create/update/delete
      ▼
src/services/http-client.ts   axios instance, baseURL = ROOT_URL, unwraps response.data
      ▼
src/services/app-config.ts    ROOT_URL from process.env (via vite-plugin-environment)
```

Callers of `ApiRequest`: `pages/Home`, `pages/Book`, `components/BookForm`, `components/ConfirmBox`. **None of them import axios or `ApiService` directly.**

---

## 3. Approach

**Keep the public `ApiRequest` interface identical** (same method names, arguments, and `Promise` return types), and swap its internals for a small local "database":

```
src/data/books.json           seed data (committed)
      ▼
src/services/mock-db.ts       load from localStorage, or fall back to the seed; save back
      ▼
src/services/api-request.ts   same 6 methods, now filter/sort/mutate arrays in memory
```

Because the interface doesn't change, **no page or component needs editing**.

**Why persist to `localStorage`?** After every create, update, or delete, the app does a full reload (`window.location.assign('/')`, bug #14). Pure in-memory data would be reset to the seed on every save, so CRUD would look broken. `localStorage` is synchronous, built in, and the project already has a wrapper (`src/helpers/localStorage.ts`).

---

## 4. Decisions to confirm

| # | Question | Recommendation |
|---|---|---|
| D1 | Where to persist changes? | **`localStorage`** under the key `books`. The alternatives are in-memory only (loses data on reload) or `localforage`/IndexedDB (already a dependency, but async and overkill for a few KB). |
| D2 | Simulate network latency? | **Yes, optional and small** (e.g. 300 ms via a `MOCK_DELAY_MS` constant) so loading states stay visible and testable. Set to `0` to disable. |
| D3 | How should seed updates reach users who already have stored data? | Store a **seed version** next to the data. If `books.json`'s version changes, reset to the new seed. A simpler alternative: document "clear localStorage to reset". |
| D4 | Remove axios and the HTTP layer entirely, or keep them for a future real API? | **Remove.** The `ApiRequest` facade makes it easy to add back later, and git keeps the history. |
| D5 | How many seed books? | ~12, with at least 2 per category, so filter and sort are meaningful. |

The steps below assume the recommendations. Adjust if you choose differently.

---

## 5. Step-by-step

### Step 1: Add the seed data file

Create `src/data/books.json`:

```json
{
  "version": 1,
  "books": [
    {
      "id": "8f1c2a4e-1b7d-4c5e-9a0b-3d6f2e1c7a90",
      "title": "The Hobbit",
      "thumbnail": "https://example.com/hobbit.jpg",
      "author": "J. R. R. Tolkien",
      "published": 1937,
      "description": "…",
      "category": "Fantasy",
      "publishers": "George Allen & Unwin",
      "country": "United Kingdom"
    }
  ]
}
```

Rules for the data:
- Every object must match the `Book` interface (`src/components/BookList/BookCard/index.tsx`).
- `category` values must exactly match `CategoryTitle` (`Adventure`, `Contemporary`, `Romance`, `Fantasy`, `Dystopian`, `Mystery`), case-sensitive.
- `id` values should be UUID v4 strings, matching what `BookForm` generates.
- Fill **every** field, because the form's validation treats them all as required (bug #5). Otherwise seeded books can't be re-saved from the edit form.
- `thumbnail` must match `RegexValue.URL`.

**Importing it:** `tsconfig.json` already has `resolveJsonModule: true`. Import with a **relative path** (`../data/books.json`). The `@` alias exists in `vite.config.ts` but **not** in `tsconfig.json` `paths`, so `@/data/...` would pass Vite but fail `tsc`. (Alternatively, add an `@data/*` alias to both files.)

### Step 2: Add a storage key

`src/enums/StorageKey.ts`:

```ts
export enum StorageKeys {
  THEME = 'theme',
  BOOKS = 'books',
  BOOKS_SEED_VERSION = 'books_seed_version',
}
```

### Step 3: Create the mock database

New file `src/services/mock-db.ts` (sketch):

```ts
import { Book } from '@components/BookList/BookCard';
import { StorageKeys } from '@enums/StorageKey';
import { LocalStorage } from '@helpers/localStorage';
import seed from '../data/books.json';

export const MOCK_DELAY_MS = 300;

const seedBooks = (): Book[] => structuredClone(seed.books) as Book[];

export const MockDb = {
  load(): Book[] {
    try {
      const version = LocalStorage.get(StorageKeys.BOOKS_SEED_VERSION);
      const raw = LocalStorage.get(StorageKeys.BOOKS);

      if (raw && version === String(seed.version)) {
        return JSON.parse(raw) as Book[];
      }
    } catch {
      // corrupted or unavailable storage → fall through to seed
    }

    const books = seedBooks();
    this.save(books);

    return books;
  },

  save(books: Book[]): void {
    try {
      LocalStorage.set(StorageKeys.BOOKS, JSON.stringify(books));
      LocalStorage.set(StorageKeys.BOOKS_SEED_VERSION, String(seed.version));
    } catch {
      // storage full / blocked → changes live only until reload
    }
  },

  reset(): void {
    this.save(seedBooks());
  },
};

export const wait = (ms = MOCK_DELAY_MS) => new Promise(resolve => setTimeout(resolve, ms));
```

Notes:
- `structuredClone` stops mutations from leaking back into the imported seed module. A `JSON.parse(JSON.stringify(...))` copy works too if older browsers matter.
- The `seed.books` type is inferred from the JSON, and `category` comes out as `string`. Hence the `as Book[]` cast.

### Step 4: Rewrite `src/services/api-request.ts`

Keep the exported `ApiRequest` object and all six signatures. Replace the bodies:

```ts
import { Book } from '@components/BookList/BookCard';
import { CategoryTitle } from '@enums/Category';
import { SortType } from '@enums/Filter';
import { MockDb, wait } from './mock-db';

const compare = (a: Book, b: Book, field: Exclude<SortType, SortType.NONE>) => {
  const x = a[field];
  const y = b[field];

  if (typeof x === 'number' && typeof y === 'number') return x - y;

  return String(x ?? '').localeCompare(String(y ?? ''));
};

export const ApiRequest = {
  async getAllBooks(): Promise<Book[]> {
    await wait();

    return MockDb.load();
  },

  async getBookById(id: string | undefined): Promise<Book> {
    await wait();
    const book = MockDb.load().find(item => item.id === id);

    if (!book) throw new Error('Book not found');

    return book;
  },

  async getBooksBySpecificFields(category: CategoryTitle, sortType: SortType, searchText: string): Promise<Book[]> {
    await wait();
    let books = MockDb.load();

    if (category !== CategoryTitle.ALL) {
      books = books.filter(book => book.category === category);
    }

    const query = searchText.trim().toLowerCase();
    if (query) {
      books = books.filter(book => book.title.toLowerCase().includes(query));
    }

    if (sortType !== SortType.NONE) {
      books = [...books].sort((a, b) => compare(a, b, sortType));
    }

    return books;
  },

  async addBook(data: Book): Promise<void> {
    await wait();
    MockDb.save([...MockDb.load(), data]);
  },

  async updateBook(data: Book): Promise<void> {
    await wait();
    const books = MockDb.load();

    if (!books.some(book => book.id === data.id)) throw new Error('Book not found');

    // PATCH semantics: merge, same as the old axios.patch call
    MockDb.save(books.map(book => (book.id === data.id ? { ...book, ...data } : book)));
  },

  async deleteBook(id: string): Promise<void> {
    await wait();
    MockDb.save(MockDb.load().filter(book => book.id !== id));
  },
};
```

Behaviour parity with the old json-server-style API:

| Old query | New logic | Note |
|---|---|---|
| `category=X` | exact match on `category` | same |
| `title_like=text` | case-insensitive `includes` on `title` | json-server treats `_like` as a case-insensitive regex. Substring matching is close enough and avoids regex-injection errors from user input. |
| `_sort=field` (ascending) | numeric sort for `published`, `localeCompare` for `title`/`country` | same direction (ascending) |
| No filters | returns all books | replaces the 8-branch `if` chain |
| Errors | `throw new Error(...)` | callers already `alert(error)`, so messages display the same way |

### Step 5: Remove the HTTP layer and env config

1. Delete `src/services/http-client.ts`, `src/services/api-service.ts`, and `src/services/app-config.ts`.
2. `grep -rn "http-client\|api-service\|app-config\|axiosClient\|ApiService\|API_URLS\|process.env" src .storybook` should return nothing afterwards. Today only `api-request.ts` imports these.
3. `vite.config.ts`: remove `import EnvironmentPlugin from 'vite-plugin-environment';` and change `plugins: [react(), EnvironmentPlugin('all')]` to `plugins: [react()]`. This also closes bug #12.
4. Delete `.env.sample`. `.env` stays in `.gitignore`, which does no harm.
5. Remove the now-unused packages:
   ```bash
   pnpm remove axios vite-plugin-environment
   ```
   This updates `package.json` and `pnpm-lock.yaml`. Use the same pnpm major as the lockfile (v7, lockfile 5.4) to avoid a full lockfile rewrite.

### Step 6 (optional): Add a "reset data" escape hatch

During development, expose `MockDb.reset()`. You could add a hidden button, or for a zero-UI option, run this in the browser console:

```js
localStorage.removeItem('books'); location.reload();
```

Documenting the console snippet is enough for a start.

### Step 7: Update the docs

- `docs/project-overview.md`: rewrite section 5 (no env vars needed), the API table in section 1, and the prerequisites (no backend). Remove `axios`/`vite-plugin-environment` from the tech stack and add "Mock data: `src/data/books.json` + localStorage".
- `practice-one/README.md`: remove Axios from TECHNICAL and add a note about mock data and resetting it.

---

## 6. Files touched

| File | Action |
|---|---|
| `src/data/books.json` | **create** |
| `src/services/mock-db.ts` | **create** |
| `src/services/api-request.ts` | **rewrite internals**; exports unchanged |
| `src/enums/StorageKey.ts` | edit (add 2 keys) |
| `src/services/http-client.ts` | delete |
| `src/services/api-service.ts` | delete |
| `src/services/app-config.ts` | delete |
| `vite.config.ts` | edit (drop EnvironmentPlugin) |
| `.env.sample` | delete |
| `package.json`, `pnpm-lock.yaml` | updated by `pnpm remove` |
| `docs/project-overview.md`, `README.md` | docs update |

**Not touched:** every page, component, layout, and store.

---

## 7. Verification checklist

Commands (after approval):

```bash
# use pnpm 7 (e.g. prefix with `npx pnpm@7.33.7`). Newer pnpm rewrites the lockfile
pnpm install --frozen-lockfile   # if not done yet
pnpm lint:eslint      # baseline is 0 errors / 2 warnings. Run BEFORE build, or `rm -rf dist` first
pnpm build            # tsc type-check + vite build must pass (it passes today)
pnpm dev              # http://localhost:3000
```

Manual checks in the browser (start with `localStorage` cleared):

- [ ] Home lists all seed books, with no network requests to `/books` in DevTools → Network.
- [ ] Sidebar category counts match the seed data.
- [ ] Each category filter shows only matching books, and the "X" button resets to All.
- [ ] Sort by Alphabetical / Release Year / Country orders correctly (years numerically, not as strings).
- [ ] Grid and list toggle still works.
- [ ] Clicking a card opens `/:id` with all fields shown.
- [ ] Visiting `/does-not-exist` shows a "Book not found" alert (same behaviour class as before).
- [ ] Add a book → it appears on Home after the redirect, and the category count increases.
- [ ] Edit a book → the change shows on the details page and survives a hard refresh.
- [ ] Delete a book → it's gone, and the count decreases.
- [ ] Hard refresh → all changes persist.
- [ ] `localStorage.removeItem('books')` + reload → seed data returns.
- [ ] Bump `"version"` in `books.json` → stored data is replaced by the new seed.
- [ ] Storybook stories that don't touch the API are unaffected. The `vite.config.ts` change is picked up via `viteFinal`.

---

## 8. Risks & notes

- **Data is per-browser.** Each browser profile has its own copy, and nothing syncs. That's expected for mock data.
- **Changing the seed doesn't show up** unless `version` is bumped (D3) or storage is cleared. This is easy to forget.
- **Private mode or blocked storage:** `MockDb` falls back to seed data and loses changes on reload instead of crashing.
- **Bug #5 interaction:** seeded books missing any field can't be re-saved through the edit form. Keep seed data complete.
- **Bug #14 interaction:** if the full reloads are later replaced with `navigate()`, persistence still works, but the Home `books` state must be refreshed after mutations (bug #15).
- **Back to a real API later:** reintroduce an HTTP-backed implementation behind the same `ApiRequest` interface. Optionally choose between the mock and real implementations with `import.meta.env.VITE_USE_MOCK`.

---

## 9. Rollback

Everything lives in a handful of files. `git checkout -- <files>` (or reverting the commit) plus `pnpm install` restores the API version. Commit `practice-one/` first, since it's currently untracked, so you have a baseline to revert to.
