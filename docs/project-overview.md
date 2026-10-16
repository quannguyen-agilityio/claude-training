# Project Overview — `practice-one` ("Book Shelter")

> Generated from a read-through of every config and source file in `practice-one/` on 2026-10-14.
> **Verified 2026-10-14** on Node 22.22.2 + pnpm 7.33.7 (Linux): install, lint, test, build, dev server, preview, and Storybook were each run as documented here. The app was loaded in headless Chrome against a local json-server backend. Results are marked **(verified)**. Statements marked **(inferred)** are still deductions.

> ⚠️ **This is not a Next.js project.** It is a **Vite 4 + React 18 single-page app** (client-side only) using React Router. There is no `next.config.*`, no `app/` or `pages/` router, no API routes, no middleware, and no `next` dependency. The sections below describe the project as it actually is.

## Table of Contents

1. [Project purpose & requirements](#1-project-purpose--requirements)
2. [Tech stack](#2-tech-stack)
3. [Prerequisites](#3-prerequisites)
4. [Installation](#4-installation)
5. [Environment variables](#5-environment-variables)
6. [Run locally](#6-run-locally)
7. [Build & production](#7-build--production)
8. [Testing](#8-testing)
9. [Linting & formatting](#9-linting--formatting)
10. [Project structure](#10-project-structure)
11. [Gotchas & open questions](#11-gotchas--open-questions)

---

## 1. Project purpose & requirements

**Book Shelter** (`<title>` in `index.html`, logo text "BookShelter") is a training project: a CRUD web app for managing a catalogue of books. According to `practice-one/README.md` it was built by one developer in 18 working days as "TypeScript Practice", with targets of responsiveness, Storybook, ≥98% performance score, avoiding unnecessary re-renders, and deployment to Vercel.

### Features (confirmed in code)

| Feature | Where |
|---|---|
| List all books (grid or list view) | `src/pages/Home`, `src/components/BookList` |
| Filter by category (6 categories + "All"), with per-category counts | `src/components/FilterPanel` |
| Sort by title, release year, or country (ascending) | `src/components/FeaturesBar/FilterTable/SortOptions` |
| Book details page | `src/pages/Book`, `BookPanel`, `BookDetails` |
| Add a book / edit a book (validated form) | `src/components/BookForm` |
| Delete a book (confirmation modal) | `src/components/ConfirmBox`, `BookActions` |
| Light/dark theme toggle, saved in `localStorage` under the key `theme` | `src/components/Header` |
| Responsive layout: hamburger menu and a collapsible search bar on mobile | `Header`, `FilterPanelBackdrop` |
| Search by title | ⚠️ **UI only, not wired up.** See [Gotchas](#11-gotchas--open-questions) |

**User roles:** none. There is no authentication or authorization, so every visitor can create, edit, and delete books.

**Categories** (`src/enums/Category.ts`): Adventure, Contemporary, Romance, Fantasy, Dystopian, Mystery (plus `All` as the "no filter" value).

**Book data model** (`src/components/BookList/BookCard/index.tsx`):

```ts
interface Book {
  id: string;          // UUID v4, generated client-side on create
  title: string;
  thumbnail: string;   // image URL (validated by regex)
  author: string;
  published: number;   // release year
  description?: string;
  category?: CategoryTitle;
  publishers?: string;
  country?: string;
}
```

### Client-side routes (`src/App.tsx`, React Router `createBrowserRouter`)

| Path | Page | Purpose |
|---|---|---|
| `/` | `pages/Home` | Book list with filter, sort, and display options |
| `/:bookId` | `pages/Book` | Book details, with Back/Edit/Delete |
| `/add-new-book` | `pages/Add` | Create form |
| `/edit-book/:bookId` | `pages/Edit` | Edit form (pre-filled from the API) |

No 404/error route is defined.

### Data source (local mock data, no backend)

There is no backend. `ApiRequest` (`src/services/api-request.ts`) keeps its six async methods, but reads and writes an in-memory copy of the books through `MockDb` (`src/services/mock-db.ts`):

- **Seed:** `src/data/books.json` (`{ "version": 1, "books": [...] }`, 12 books, two per category).
- **Persistence:** changes are saved to `localStorage` under `books`, with the seed version under `books_seed_version`. If storage is empty, corrupted, or holds an older seed version, the seed is loaded again.
- **Latency:** every call waits `MOCK_DELAY_MS` (300 ms) so loading states stay visible. Set it to `0` to disable.

| Method | Used for | Behaviour |
|---|---|---|
| `getAllBooks()` | Category counts + default list | All stored books |
| `getBooksBySpecificFields(category, sort, search)` | Filtered/sorted list | Exact `category` match, case-insensitive substring on `title`, ascending sort (numeric for `published`, `localeCompare` for `title`/`country`) |
| `getBookById(id)` | Details / edit pre-fill | Throws `Book not found` for an unknown id |
| `addBook(book)` | Create | Appends the book |
| `updateBook(book)` | Update | Merges into the stored book (like the old PATCH) |
| `deleteBook(id)` | Delete | Removes the book |

**Reset to the seed data:** run `localStorage.removeItem('books'); location.reload();` in the browser console, or bump `"version"` in `books.json`.

To go back to a real API later, add an HTTP-backed implementation behind the same `ApiRequest` interface.

---

## 2. Tech stack

Versions are resolved from `pnpm-lock.yaml`. The ranges come from `package.json`. They match what `pnpm install --frozen-lockfile` with pnpm 7 actually installs **(verified)**. A newer pnpm resolves newer versions; see [Prerequisites](#3-prerequisites).

| Concern | Choice |
|---|---|
| Framework | **React 18.2** SPA (not Next.js) |
| Build tool / dev server | **Vite 4.0.4** with `@vitejs/plugin-react` 3 |
| Routing | **React Router DOM 6.8.0** (`createBrowserRouter`) |
| Language | **TypeScript 4.9.4**, `strict: true` |
| Styling | **Tailwind CSS 3.2.4** (`darkMode: 'class'`, custom colours and fonts), PostCSS + Autoprefixer, `clsx` |
| Fonts | Local TTFs in `src/assets/fonts` (Rubik, Noto Sans, Dancing Script) |
| State management | React Context + `useReducer` (`src/stores/book`); local `useState` per page |
| Data fetching | Async `ApiRequest` calls inside `useEffect` (no React Query/SWR, no caching) |
| Utility hooks | `usehooks-ts` (`useOnClickOutside`, `useWindowSize`) |
| IDs | `uuid` v9 |
| Auth | None |
| Database / ORM | None. Mock data: `src/data/books.json` + `localStorage` |
| Component workshop | **Storybook 6.5** with `@storybook/builder-vite` |
| Lint / format | ESLint 8 (airbnb + typescript-eslint + react-hooks), Prettier 2 |
| Git hooks | Husky 8 + commitlint (Conventional Commits) |
| Deployment target | Vercel, per the README (no Vercel config in repo) |

Declared but **not used anywhere in `src/`**: `localforage`, `match-sorter`, `sort-by`.

---

## 3. Prerequisites

| Requirement | Detail |
|---|---|
| **Node.js** | No `engines` field, `.nvmrc`, or `.node-version`. Install, lint, and build **work on Node 22.22.2 (verified)**. Node 18 LTS also matches the lockfile (`@types/node@18.11.18`; Vite 4 needs Node ≥ 14.18) **(inferred)**. On Node ≥ 17, **Storybook crashes on startup** unless `NODE_OPTIONS=--openssl-legacy-provider` is set **(verified on Node 22)**. See [Run locally](#6-run-locally). |
| **Package manager** | **pnpm 7** (lockfile `lockfileVersion: 5.4`). The README and the Husky hooks also use pnpm. **Use pnpm 7 specifically (verified):** a newer pnpm (tested with 11.21.0) does *not* honour this lockfile. See the warning box under [Installation](#4-installation). If your global pnpm is newer, run pnpm 7 through `npx` (e.g. `npx pnpm@7.33.7 <cmd>`) or Corepack. |
| **Git** | Required by `prepare` (Husky install). |
| **Backend API** | None. Books come from local mock data (see [Data source](#data-source-local-mock-data-no-backend)). |

No DB, Redis, or other services are needed by the frontend itself.

---

## 4. Installation

```bash
cd practice-one
pnpm install --frozen-lockfile       # with pnpm 7; also runs "prepare" → husky install
# if your global pnpm is newer than 7:
npx pnpm@7.33.7 install --frozen-lockfile
```

Verified result (pnpm 7.33.7): installs in seconds, leaves `pnpm-lock.yaml` unchanged, and prints `husky - Git hooks installed`.

> ⚠️ **Don't run a plain `pnpm install` with pnpm ≥ 8 (verified with pnpm 11.21.0).** pnpm 11:
> - **rewrites `pnpm-lock.yaml`** to `lockfileVersion: '9.0'` and resolves newer versions (e.g. React 18.3.1, Vite 4.5.14, React Router 6.30.6, Tailwind 3.4.19, TypeScript 4.9.5);
> - **creates a new `pnpm-workspace.yaml`** (an `allowBuilds` list);
> - **exits with code 1**: `ERR_PNPM_IGNORED_BUILDS … core-js-pure, core-js, esbuild` (`node_modules` is still populated).
>
> If this happens by accident, restore the lockfile from git (once the project is committed), delete `pnpm-workspace.yaml` and `node_modules/`, and reinstall with pnpm 7.

Notes:
- `prepare` runs `cd .. && husky install practice-one/.husky`. It assumes the **parent directory of `practice-one/` is the git root**. In this checkout that parent is `claude-training/`, so the install **sets `core.hooksPath = practice-one/.husky` in the claude-training repo's git config (verified)**. To undo it: `git -C .. config --unset core.hooksPath`.
- The original README says to clone `git@gitlab.asoft-python.com:quan.nguyen/react-training.git` and check out `feat/practice-one`. That's the upstream source, not this repo.

---

## 5. Environment variables

None. The app no longer reads `ROOT_URL` or any other environment variable, and `.env.sample` was removed. `vite-plugin-environment` was removed too, so the dev server no longer exposes the shell environment to the browser.

---

## 6. Run locally

### 6.1 Dev server

```bash
cd practice-one
pnpm dev
# → http://localhost:3000
```

- No backend or `.env` is needed. Books come from `src/data/books.json` on first load, then from `localStorage`.
- **Port:** `3000` (`server.port` in `vite.config.ts`). Vite moves to the next free port if 3000 is taken **(inferred)**.
- **Seed data:** `src/data/books.json`. Each book must fill every field, `category` must exactly match one of `Adventure, Contemporary, Romance, Fantasy, Dystopian, Mystery`, and `thumbnail` must be a URL. Bump `version` so existing browsers pick up seed changes.

### 6.2 Storybook

```bash
# Node ≥ 17 (verified on Node 22): the legacy OpenSSL flag is REQUIRED
NODE_OPTIONS=--openssl-legacy-provider pnpm storybook   # → http://localhost:6006
```

**Verified behaviour:**
- **Without the flag** it crashes on startup: `Error: error:0308010C:digital envelope routines::unsupported` (`ERR_OSSL_EVP_UNSUPPORTED`, from webpack 4 in the manager build), exit code 1.
- **With the flag** it starts: "Storybook 6.5.15 for React started" (~5 s manager, ~1.5 s preview).
- A non-fatal `WARN Failed to load preset: {"type":"presets"}` plus an `ERR_INVALID_ARG_TYPE` stack trace appear during startup. They're probably from the configured-but-missing `storybook-addon-react-router-v6` **(inferred)**, but they don't stop Storybook.
- **15 of 18 stories render. 3 fail** with `useHref() may be used only in the context of a <Router> component`: `components/BookCard`, `components/FeaturesBar`, and `components/Header`. These render a `<Link>`, and no router decorator is configured.
- `pnpm build-storybook` was **not** run. It presumably needs the same `NODE_OPTIONS` flag **(inferred)**.

---

## 7. Build & production

```bash
pnpm build          # tsc (type-check only, noEmit) && vite build
pnpm preview        # serve the built dist/ locally → http://localhost:4173
NODE_OPTIONS=--openssl-legacy-provider pnpm build-storybook   # static Storybook → storybook-static/ (not run, inferred)
```

- **Preview (verified):** serves on `http://localhost:4173/`. Deep links (`/a1`, `/edit-book/a1`) return 200 because `vite preview` has an SPA fallback. The built app renders the seed books with no backend.

- **Verified:** `pnpm build` succeeds. `tsc` reports no type errors, then `vite v4.0.4` transforms 197 modules. It prints a harmless "Browserslist: caniuse-lite is outdated" notice.
- **Output:** `practice-one/dist/` (git-ignored), containing `index.html`, `vite.svg`, and `assets/` with one JS bundle (~244 kB, ~81 kB gzip), one CSS file (~17 kB), the three fonts (~0.9 MB total, the largest part of the build), and the SVG icons **(verified)**.
- ⚠️ **After building, delete `dist/` or `pnpm lint:eslint` will fail.** See [Linting](#9-linting--formatting).
- **There is no `start` command and no server.** `dist/` is static files. Host it on any static host (the README names Vercel).
- **SPA fallback:** routes like `/edit-book/123` need the host to rewrite unknown paths to `index.html`. There's no `vercel.json` or equivalent in the repo **(inferred risk: deep links/refreshes would 404 on a plain static host)**.
- **Docker:** none (no `Dockerfile` or `docker-compose`).
- **CI/CD:** none (no `.github/workflows`, `.gitlab-ci.yml`, etc.).

---

## 8. Testing

**There are no automated tests.** I found no Jest, Vitest, Playwright, or Cypress config or dependency, no `*.test.*` or `*.spec.*` files, and no `test` script. Running `pnpm test` fails with `ERR_PNPM_NO_SCRIPT  Missing script: test` (exit code 1) **(verified)**. There are therefore no commands for single-file, watch, coverage, or e2e test runs.

The closest thing is **Storybook stories** (`*.stories.tsx`, 12 files, 18 stories) for visual checks. 15 of 18 stories render; BookCard, FeaturesBar, and Header fail **(verified)**. See [Storybook](#62-storybook).

| Story file | Story title |
|---|---|
| `components/common/Button` | `common/Button` |
| `components/common/Input` | `common/Input` |
| `components/common/Loading` | `common/Loading` |
| `components/common/Modal` | `common/Modal` |
| `components/BookDetails` | `components/BookDetails` |
| `components/BookList/BookCard` | `components/BookCard` |
| `components/BookPanel/DetailGroup` | `components/DetailInfo` |
| `components/FeaturesBar` | `components/FeaturesBar` |
| `components/FeaturesBar/FilterResult` | `components/FilterResult` |
| `components/FilterPanel` | `components/FilterPanel` |
| `components/FilterPanel/Category` | `components/Category` |
| `components/Header` | `components/Header` |

`@storybook/addon-interactions` and `@storybook/testing-library` are installed, but no story defines a `play` function.

---

## 9. Linting & formatting

```bash
pnpm lint:eslint    # eslint . --ext .js,.jsx,.ts,.tsx
pnpm fix:eslint     # same, with --fix
```

**Verified result on a clean checkout:** exit code 0, with **0 errors and 2 warnings**, both `react-hooks/exhaustive-deps` in `src/pages/Home/index.tsx` (lines 42 and 66: missing `getAllBooks` / `setCurrentBooks` dependencies).

> ⚠️ **Lint also scans `dist/` (verified).** There's no `.eslintignore` or `ignorePatterns`, so after `pnpm build`, `pnpm lint:eslint` reports **~50,600 errors** from the minified `dist/assets/index-*.js` and exits 1. Run `rm -rf dist` before linting. Note that the pre-commit hook (`fix:eslint`) would also try to "fix" the bundle.

- **ESLint** (`.eslintrc.json`): `airbnb` + `eslint:recommended` + `react/recommended` + `@typescript-eslint/recommended` + `react-hooks/recommended`, with many airbnb rules relaxed (no `max-len`, `no-alert` off, etc.).
- **Prettier** (`.prettierrc.json`): single quotes, 120 columns, trailing commas, `arrowParens: avoid`. **There's no format script**, and Prettier isn't enforced through ESLint: `prettier` appears under `plugins`, but there's no `prettier/prettier` rule or `plugin:prettier/recommended` extend. To format manually, use `pnpm exec prettier --write .` (a binary that exists after install, not a project script).
- **EditorConfig:** 2-space indent, LF.
- **Git hooks** (`.husky/`):
  - `pre-commit` → `cd ./practice-one && pnpm run fix:eslint`
  - `commit-msg` → `cd ./practice-one && pnpm commitlint --edit …` (Conventional Commits, e.g. `feat: add search`)
- **Type-check only:** no dedicated script. `pnpm build` runs `tsc` first, or use `pnpm exec tsc` directly.

---

## 10. Project structure

```
practice-one/
├── .husky/                  # git hooks: eslint --fix on pre-commit, commitlint on commit-msg
├── .storybook/              # Storybook 6.5 config (Vite builder; reuses vite.config.ts aliases)
├── public/                  # static files served as-is (only the unused vite.svg)
├── src/
│   ├── main.tsx             # React entry: mounts <App/> into #root
│   ├── App.tsx              # router definition + <BookProvider> context wrapper
│   ├── index.css            # Tailwind directives + @font-face declarations
│   ├── assets/              # fonts, logo.png, SVG icons
│   ├── components/          # feature components (BookForm, BookList, FilterPanel, Header, …)
│   │   └── common/          # reusable primitives: Button, Input, Select, Textarea, Modal, Loading
│   ├── constants/           # RegexValue (positive number, URL)
│   ├── enums/               # Book field labels, button variants, categories, sort/display types, theme
│   ├── helpers/             # localStorage wrapper, form validator
│   ├── layouts/PageLayout/  # Header + optional nav bar + <main> + delete ConfirmBox
│   ├── pages/               # route-level pages: Home, Book, Add, Edit
│   ├── data/                # books.json seed data
│   ├── services/            # ApiRequest facade + MockDb (localStorage persistence)
│   └── stores/book/         # Context + useReducer: books, filters, display type, confirm-box state
├── index.html               # Vite HTML entry (title "Book Shelter")
├── vite.config.ts           # port 3000, path aliases (@components, @services, …)
├── tailwind.config.cjs      # custom colours, fonts, font sizes; class-based dark mode
├── tsconfig.json            # strict TS, baseUrl ./src, path aliases mirroring vite.config.ts
├── .eslintrc.json / .prettierrc.json / .editorconfig / commitlint.config.cjs
└── pnpm-lock.yaml           # pnpm lockfile (v5.4)
```

Import aliases (defined in both `tsconfig.json` and `vite.config.ts`): `@assets`, `@components`, `@constants`, `@enums`, `@helpers`, `@layouts`, `@pages`, `@services`, `@stores`. Vite also defines a bare `@` → `src`.

---

## 11. Gotchas & open questions

### Things that look broken

1. **Search doesn't work.** `SearchBar` renders an `<Input>` with no `value` or `onChange`, and the store has `searchInput` state but no action that ever sets it. `ApiRequest` supports title filtering, but it never receives a search text.
2. **Category isn't pre-selected when editing.** `common/Select` accepts `value` but never passes it to `<select>`, so the dropdown always shows the first option (Adventure). The form state itself does hold the correct category.
3. **Storybook doesn't start as documented in the README (verified on Node 22):**
   - Plain `pnpm storybook` crashes with `ERR_OSSL_EVP_UNSUPPORTED`. It needs `NODE_OPTIONS=--openssl-legacy-provider`.
   - `.storybook/main.cjs` lists the addon `storybook-addon-react-router-v6`, but it's **not installed** (not in `package.json`, the lockfile, or `node_modules`). This is non-fatal: Storybook starts anyway with a preset-load warning.
   - 3 stories (`BookCard`, `FeaturesBar`, `Header`) fail with `useHref() may be used only in the context of a <Router>`.
   - `FeaturesBar`/`FilterPanel` stories depend on `BookContext` without a provider. `FilterPanel` renders, but clicking a category would call an `undefined` setter **(inferred)**.
4. **Husky hooks aren't executable.** `.husky/pre-commit` and `.husky/commit-msg` have mode `-rw-rw-r--`, so git will skip them **(inferred)**.
5. **`src/vite-env.d.ts` has stray lines:** `export function isV4(): boolean;` and `export { v4 } from './uuid';`. There's no `./uuid` file. **It doesn't break the build:** `tsc` passes **(verified)**, most likely because `skipLibCheck: true` skips `.d.ts` files. It's still dead and misleading code.
5a. **Lint breaks after a build.** ESLint has no ignore for `dist/`, so it lints the minified bundle **(verified)**. See [Linting](#9-linting--formatting).
5b. **The install only works cleanly with pnpm 7.** A newer pnpm rewrites the lockfile and fails on ignored build scripts **(verified)**. See [Installation](#4-installation).

### Inconsistencies and outdated docs

6. **Mismatch with your expectation.** It's Vite + React Router, not Next.js. There's no SSR, no API routes, and no middleware.
7. **README versions drift:** it says React Router 6.6.1, but the lockfile resolves 6.8.0. It also lists "Vercel v25.0.0", but the Vercel CLI isn't a dependency.
8. **README clone instructions** point to the upstream GitLab repo and branch, not this checkout. `practice-one/` is currently **untracked** in the `claude-training` repo (`git status` shows `?? practice-one/`).
9. **Unused dependencies:** `localforage`, `match-sorter`, `sort-by`. Also, `storybook` sits in `dependencies` rather than `devDependencies`.
10. **No tests, CI, Docker, or engines field**, and no SPA rewrite config for Vercel.

### Behaviour worth knowing

11. After create, update, or delete, the app does a **full page reload** (`window.location.assign('/')`) instead of client-side navigation or a state update.
12. Errors are reported with `alert()`. If a request fails, the loading overlay is never cleared (`setLoading(false)` is skipped in the `catch` blocks).
13. Form validation requires **every** field to be non-empty (including the optional `description`, `publishers`, and `country`), and the year must be a positive integer **(inferred from `checkValidForm` + `RegexValue`)**. Note that the year input's `onBlur` doesn't pass the year regex, so "Enter a valid year" is never shown.
14. Category counts in the sidebar come from the full book list loaded once on Home mount. They don't refresh after other filters change.
15. Data is **per browser**: each browser profile keeps its own copy in `localStorage`, and seed changes only show up after a `version` bump or a storage reset.

### Open questions

- Which Node version did the author use? (pnpm 7 is now confirmed to work with the lockfile; Node 22 works for install, lint, and build.) Should an `engines` field / `packageManager: "pnpm@7.33.7"` be added?
- Is there a deployed Vercel URL and project config somewhere?
- Should `practice-one/` be committed to `claude-training` as-is, and should Husky manage hooks for the whole `claude-training` repo?
