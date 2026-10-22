# Likely Bugs — `practice-one`

> Found by reading the source on 2026-10-14. Nothing was run, so every item is a **likely** bug. Items marked **(inferred)** depend on runtime or tooling behaviour I haven't verified.
> Paths are relative to `practice-one/`.
>
> **Re-verified on 2026-10-19** against `sample-project` @ `3e7f2e0` (after the mock-data and UI-refresh MRs), using the Playwright MCP server for the app and every Storybook story, and running commands for tooling. 18 of the original 20 are fixed (13) or obsolete (5), #10 and #11 are still open, and the Playwright pass found #21–#23. Each entry has a **Status** line. The original text is kept below it for history.
>
> **Re-verified on 2026-10-21** against `sample-project` @ `4fdcd6a`: the last five open items (#10, #11, #21, #22, #23) are now **Fixed**. All 23 items are fixed or obsolete. Those five entries have a new **Status (2026-10-21)** line above the 2026-10-19 one.

## Summary

| #   | Severity | Area           | Bug                                                                                | Status (last checked) |
| --- | -------- | -------------- | ---------------------------------------------------------------------------------- | --------------------- |
| 1   | High     | Search         | Search box doesn't filter anything                                                 | Fixed                 |
| 2   | High     | Edit form      | Category dropdown ignores the saved value                                          | Fixed                 |
| 3   | High     | Error handling | Loading overlay never clears after a failed request                                | Obsolete              |
| 4   | Medium   | Add/Edit form  | On save failure the app still redirects home and the input is lost                 | Fixed                 |
| 5   | Medium   | Add/Edit form  | Optional fields are required; year `0` passes validation                           | Fixed                 |
| 6   | Medium   | Add/Edit form  | "Enter a valid year" message can never appear                                      | Fixed                 |
| 7   | Low      | Storybook      | Configured addon isn't installed (non-fatal warning) (**verified**)                | Fixed                 |
| 8   | Medium   | Storybook      | 3 of 18 stories crash: no router decorator (**verified**)                          | Fixed                 |
| 9   | Medium   | Storybook      | Storybook crashes on Node ≥ 17 without the OpenSSL flag (**verified**)             | Fixed                 |
| 10  | Medium   | Tooling        | Husky hooks aren't executable                                                      | Fixed (2026-10-21)    |
| 11  | Low      | Types          | Stray exports in `vite-env.d.ts` reference a non-existent module                   | Fixed (2026-10-21)    |
| 12  | **High** | Security       | Dev server exposes the whole shell environment to the browser (**verified**)       | Fixed                 |
| 13  | Low      | Styling        | Two invalid Tailwind classes are silently ignored                                  | Obsolete              |
| 14  | Low      | UX             | Full page reload after create, update, or delete                                   | Fixed                 |
| 15  | Low      | Data           | Category counts go stale                                                           | Fixed                 |
| 16  | Low      | Performance    | All books are fetched twice on Home mount                                          | Obsolete              |
| 17  | Low      | Theme          | Switching to light theme wipes every class on `<html>`                             | Fixed                 |
| 18  | Low      | Dead code      | "Loading" guards that can never trigger                                            | Obsolete              |
| 19  | Medium   | Tooling        | ESLint lints `dist/` after a build: ~50k errors (**verified**)                     | Fixed                 |
| 20  | High     | Config         | Missing `ROOT_URL` → empty app in dev, crash in production (**verified**)          | Obsolete              |
| 21  | Medium   | Routing        | Unknown multi-segment URLs show React Router's developer error page (**verified**) | Fixed (2026-10-21)    |
| 22  | Low      | A11y           | Closing the delete dialog via the backdrop loses focus (**verified**)              | Fixed (2026-10-21)    |
| 23  | Low      | Styling        | Sort select on Home is unstyled (**verified**)                                     | Fixed (2026-10-21)    |

---

## High

### 1. Search box doesn't filter anything

- **Status (2026-10-19):** Fixed in [GitLab !1](https://github.com/quannguyen-agilityio/claude-training/issues/3) ([#3](https://github.com/quannguyen-agilityio/claude-training/issues/3)), still working after the home rebuild in [GitLab !5](https://github.com/quannguyen-agilityio/claude-training/issues/7). Playwright: "the" → 6 books, no match → "No books match", Clear search restores 12.
- **Issue:** https://github.com/quannguyen-agilityio/claude-training/issues/3
- **Where:** `src/components/Header/SearchBar/index.tsx:6`, `src/stores/book/reducer.ts:13,24`, `src/stores/book/index.tsx:84`
- **What:** `SearchBar` renders `<Input type="search" …>` with no `value` and no `onChange`. The store has a `searchInput` field (initially `''`), but there's **no action or setter** that ever changes it. `Home` passes `searchInput` to `getBooksBySpecificFields`, so `title_like` is never sent.
- **Repro:** Type in the search bar. The list doesn't change.
- **Fix idea:** Add a `SET_SEARCH_INPUT` action and a `setSearchInput` setter, wire `SearchBar`'s `onChange` to it, and ideally debounce it (`usehooks-ts` is already a dependency).

### 2. Category dropdown ignores the saved value when editing

- **Status (2026-10-19):** Fixed by `SelectField` ([GitLab !6](https://github.com/quannguyen-agilityio/claude-training/issues/8)) and the form rebuild ([GitLab !7](https://github.com/quannguyen-agilityio/claude-training/issues/9)). Playwright: editing a Contemporary book preselects Contemporary.
- **Where:** `src/components/common/Select/index.tsx:7` (destructuring) and `:12` (`<select>`)
- **What:** `Select` destructures only `children, label, name, onChange, onBlur`. The `value` prop that `BookForm` passes is dropped, so `<select>` is uncontrolled and always shows the first option (Adventure).
- **Repro:** Edit a Fantasy book. The dropdown shows "Adventure". The form state still holds "Fantasy", so saving without touching it keeps Fantasy, but the UI is misleading.
- **Fix idea:** Forward `value` (or `...rest`) to `<select>`.

### 3. Loading overlay never clears after a failed request

- **Status (2026-10-19):** Obsolete since the rebuilds in [GitLab !5](https://github.com/quannguyen-agilityio/claude-training/issues/7) and [GitLab !7](https://github.com/quannguyen-agilityio/claude-training/issues/9): no overlay; every page has an error or not-found state. Playwright: `/unknown-id` and `/edit-book/unknown-id` show "We couldn't find that book".
- **Where:** `src/pages/Home/index.tsx:31-32` and `:55-56`, `src/pages/Book/index.tsx:29-30`, `src/components/BookForm/index.tsx:62-63` and `:103-104`, `src/components/ConfirmBox/index.tsx:24-25`
- **What:** `setLoading(false)` sits inside `try`, after the `await`. When a request throws, the `catch` only calls `alert(error)`, so the full-screen `<Loading/>` overlay stays up.
- **Repro:** Stop the backend (or leave `ROOT_URL` unset) and open any page. You get an alert, then a permanently blocked screen.
- **Fix idea:** Move `setLoading(false)` into a `finally` block.

---

## Medium

### 4. On save failure the app still redirects home and the input is lost

- **Status (2026-10-19):** Fixed in [GitLab !7](https://github.com/quannguyen-agilityio/claude-training/issues/9). Playwright: a failed save stays on the form, shows "We couldn't save this book." with Try again, and keeps the typed values.
- **Where:** `src/components/BookForm/index.tsx:108`
- **What:** `window.location.assign('/')` runs after the `try/catch`, so it runs even when `addBook`/`updateBook` failed. The user sees an alert and is then sent away with their input gone.
- **Fix idea:** Navigate only on success (move it inside `try`).

### 5. Optional fields are required; year `0` passes validation

- **Status (2026-10-19):** Fixed in [GitLab !7](https://github.com/quannguyen-agilityio/claude-training/issues/9). All fields are required by design (`design/specs/book-form.md`), and the year must match `^[1-9][0-9]*$`. Playwright: `0`, `-5` and blank are all rejected.
- **Where:** `src/components/BookForm/index.tsx:78`
- **What:** `checkValidForm` requires `Object.values(formData).every(p => p.toString().length !== 0)`.
  - Fields that are optional in the `Book` type (`description`, `publishers`, `country`) are still mandatory.
  - `published` starts at `0`, and `(0).toString()` is `"0"`, which isn't empty. A book with year 0 passes this check as long as the field was never focused and blurred.
  - If the API ever returns a `null` field, `.toString()` throws **(inferred)**.
- **Fix idea:** Validate each field explicitly instead of using `Object.values`.

### 6. "Enter a valid year" message can never appear

- **Status (2026-10-19):** Fixed in [GitLab !7](https://github.com/quannguyen-agilityio/claude-training/issues/9). Playwright: "Enter a year, like 1883." appears on blur.
- **Where:** `src/components/BookForm/index.tsx:168-172` (Release Year input uses plain `onBlur={handleBlur}`)
- **What:** `ErrorMsgs.INVALID_YEAR` and `RegexValue.POSITIVE_NUMBER` exist, but the year input never passes them to `handleBlur`. The only check is "not empty".
- **Fix idea:** `onBlur={e => handleBlur(e, RegexValue.POSITIVE_NUMBER, ErrorMsgs.INVALID_YEAR)}`

### 7. Configured addon isn't installed (verified, non-fatal; downgraded to Low)

- **Status (2026-10-19):** Fixed in [GitLab !8](https://github.com/quannguyen-agilityio/claude-training/issues/11) ([#11](https://github.com/quannguyen-agilityio/claude-training/issues/11)).
- **Issue:** https://github.com/quannguyen-agilityio/claude-training/issues/11
- **Where:** `.storybook/main.cjs:6`
- **What:** `addons` includes `storybook-addon-react-router-v6`, but it isn't in `package.json`, `pnpm-lock.yaml`, or `node_modules`. **Verified 2026-10-14:** Storybook still starts. The startup log shows `WARN Failed to load preset: {"type":"presets"}` and an `ERR_INVALID_ARG_TYPE` stack trace, most likely caused by this addon **(inferred)**. It doesn't provide the router the stories need (see #8).
- **Fix idea:** Install it (a 6.5-compatible version), or remove it and add a `MemoryRouter` decorator in `preview.cjs`.

### 8. 3 of 18 stories crash: no router decorator (verified)

- **Status (2026-10-19):** Fixed by the story rewrites in [GitLab !5](https://github.com/quannguyen-agilityio/claude-training/issues/7)–[GitLab !7](https://github.com/quannguyen-agilityio/claude-training/issues/9) (stories bring their own router/store decorators). Playwright: all 66 stories render with no error screen.
- **Where:** `src/components/BookList/BookCard/index.stories.tsx`, `src/components/FeaturesBar/index.stories.tsx`, `src/components/Header/index.stories.tsx` (`Header` → `Logo` uses `<Link>`), plus `FilterPanel`/`FeaturesBar` using `BookContext`
- **What:** **Verified 2026-10-14** by rendering every story in headless Chrome: `components-bookcard--template`, `components-featuresbar--template`, and `components-header--template` show Storybook's error screen with `useHref() may be used only in the context of a <Router> component.` The other 15 stories render. Context-based stories fall back to the static `initValue`, whose setters are `undefined`, so clicks throw **(inferred; clicks not tested)**.
- **Fix idea:** Add global decorators: `MemoryRouter` + `BookProvider`.

### 9. Storybook crashes on Node ≥ 17 without the OpenSSL flag (verified)

- **Status (2026-10-19):** No longer reproduces: on Node 22.22.2, `pnpm storybook --smoke-test` compiles with no OpenSSL error and no flag. The current lockfile has `webpack@4.47.0`, which no longer needs the legacy hash.
- **What:** **Verified on Node 22.22.2:** plain `pnpm storybook` exits with code 1 and `Error: error:0308010C:digital envelope routines::unsupported` (`ERR_OSSL_EVP_UNSUPPORTED`), raised from `webpack@4.46.0` while building the manager UI.
- **Workaround (verified):** `NODE_OPTIONS=--openssl-legacy-provider pnpm storybook` starts Storybook on :6006. Alternatives: use Node 16, or upgrade Storybook.

### 10. Husky hooks aren't executable

- **Status (2026-10-21):** Fixed by `502d5c1` ([#14](https://github.com/quannguyen-agilityio/claude-training/issues/14)). `git ls-files -s` shows mode `100755` for `commit-msg` and `pre-commit`. In a throwaway clone with `core.hooksPath=practice-one/.husky`, `git commit -m "bad message"` is rejected by commitlint (`subject-empty`, `type-empty`, exit 1), and `git commit -m "chore: hook smoke test"` runs the pre-commit ESLint fix and succeeds, with no "hook was ignored" warning.
- **Status (2026-10-19):** Still open: [#14](https://github.com/quannguyen-agilityio/claude-training/issues/14). `git ls-files -s` still shows mode `100644`, and every commit prints "hook was ignored because it's not set as executable".
- **Where:** `.husky/pre-commit`, `.husky/commit-msg` (mode `-rw-rw-r--`)
- **What:** Git skips hooks without the execute bit, so ESLint auto-fix and commitlint silently never run **(inferred)**. Separately, `prepare` (`cd .. && husky install practice-one/.husky`) will set `core.hooksPath` on the **outer** `claude-training` repo.
- **Fix idea:** `chmod +x .husky/*` (and commit the mode change). Decide whether Husky should own the outer repo's hooks.

---

## Low

### 11. Stray exports in `vite-env.d.ts` reference a non-existent module

- **Status (2026-10-21):** Fixed by `da8e04b` ([#15](https://github.com/quannguyen-agilityio/claude-training/issues/15)). `src/vite-env.d.ts` only has the `vite/client` reference and the `*.svg` module; `grep -E 'isV4|uuid'` finds nothing. `pnpm build` and `pnpm lint:eslint` both exit 0.
- **Status (2026-10-19):** Still open: [#15](https://github.com/quannguyen-agilityio/claude-training/issues/15). Lines 11–12 are unchanged and `src/uuid*` doesn't exist.
- **Where:** `src/vite-env.d.ts:11-12`
- **What:** `export function isV4(): boolean;` and `export { v4 } from './uuid';` look pasted in from `@types/uuid`. There's no `./uuid` file. The exports also turn this declaration file into a module, which changes how the `declare module '*.svg'` block is interpreted. **Verified 2026-10-14: `pnpm build` (`tsc && vite build`) still passes**, most likely because `skipLibCheck: true` skips `.d.ts` files. So this is dead, misleading code rather than a build breaker.
- **Fix idea:** Delete the two lines.

### 12. Dev server exposes the whole shell environment to the browser (verified; upgraded to High)

- **Status (2026-10-19):** Fixed in [GitLab !3](https://github.com/quannguyen-agilityio/claude-training/issues/5) (`fe3104a` removed `EnvironmentPlugin`). No `process.env` or `import.meta.env` left in `src/` or `vite.config.ts`.
- **Where:** `vite.config.ts:55`
- **What:** `EnvironmentPlugin('all')` registers **every** environment variable as a Vite `define`.
  - **In `pnpm dev`, Vite serves all of them to the browser** via the `/@vite/env` module, regardless of whether the code uses them. **Verified 2026-10-14:** 126 variables from the launching shell were served, including access tokens, home paths, and usernames. Anyone who can load the dev server can read them, and `--host` would expose them to the network.
  - **In `pnpm build`**, only referenced keys are inlined. The bundle contained `ROOT_URL` and nothing else **(verified)**. But any future `process.env.SOMETHING` reference would inline that value, secret or not.
- **Fix idea:** `EnvironmentPlugin(['ROOT_URL'])`, or switch to Vite's native `import.meta.env.VITE_*`.

### 13. Two invalid Tailwind classes are silently ignored

- **Status (2026-10-19):** Obsolete since [GitLab !5](https://github.com/quannguyen-agilityio/claude-training/issues/7) (Home and BookCard rebuilt). Playwright: no `x[…]`-style invalid classes in the rendered DOM.
- **Where:** `src/pages/Home/index.tsx:91` (`md:pt[33px]` → should be `md:pt-[33px]`), `src/components/BookList/BookCard/index.tsx:26` (`md:max-width[180px]` → should be `md:max-w-[180px]`)
- **What:** Tailwind doesn't recognise these, so the intended spacing and width at the `md` breakpoint aren't applied.

### 14. Full page reload after create, update, or delete

- **Status (2026-10-19):** Fixed in [GitLab !7](https://github.com/quannguyen-agilityio/claude-training/issues/9) (`navigate()` and in-place store updates). Playwright: a `window` marker survives add and delete, so there's no full reload.
- **Where:** `src/components/BookForm/index.tsx:108`, `src/components/ConfirmBox/index.tsx:21`
- **What:** `window.location.assign('/')` reloads the whole SPA, which discards context state (category, sort, display mode) and refetches everything. It also needs a hosting rewrite for `/` (fine) but loses the SPA's benefits.
- **Fix idea:** Use `useNavigate()` and update the store.

### 15. Category counts go stale

- **Status (2026-10-19):** Fixed in [GitLab !5](https://github.com/quannguyen-agilityio/claude-training/issues/7) (counts derive from `books`, and add/delete update it). Playwright: Mystery 2 → 3 → 2 and All 12 → 13 → 12 across add and delete.
- **Where:** `src/components/FilterPanel/index.tsx` (counts from `books`), `src/pages/Home/index.tsx` (first effect)
- **What:** `books` (the full list used for counts) is fetched once on Home mount and never updated directly. It's only correct because #14 forces a full reload. Fixing #14 without updating `books` will make the counts stale.

### 16. All books are fetched twice on Home mount

- **Status (2026-10-19):** Obsolete since [GitLab !5](https://github.com/quannguyen-agilityio/claude-training/issues/7): one effect loads all books and the filtered list together with `Promise.all`, on purpose (the counts need the full list).
- **Where:** `src/pages/Home/index.tsx` (two `useEffect`s)
- **What:** On first render, both effects run. With no filter, `getBooksBySpecificFields` calls `getAllBooks()` again, so it's two identical `GET /books` requests.

### 17. Switching to light theme wipes every class on `<html>`

- **Status (2026-10-19):** Fixed in [GitLab !5](https://github.com/quannguyen-agilityio/claude-training/issues/7) (`ThemeToggle` uses `classList.toggle`). Playwright: `<html>` class goes `''` → `dark` → `''`.
- **Where:** `src/components/Header/index.tsx:37`
- **What:** `htmlElement.removeAttribute('class')` removes every class on `<html>`, not just `dark`. That's harmless today, but it would break any other class added later.
- **Fix idea:** `classList.remove('dark')`.

### 18. "Loading" guards that can never trigger

- **Status (2026-10-19):** Obsolete since [GitLab !5](https://github.com/quannguyen-agilityio/claude-training/issues/7) and [GitLab !7](https://github.com/quannguyen-agilityio/claude-training/issues/9): explicit `LoadStatus` states with skeletons.
- **Where:** `src/pages/Book/index.tsx:42`, `src/components/BookForm/index.tsx:75`, `src/pages/Home/index.tsx:68`
- **What:** `currentBook` starts as `{}`, `formData` as an object, and `books`/`currentBooks` as `[]`. All are truthy, so these early `return <Loading />` branches never run. The Book page briefly renders empty fields (and an `<img>` with `src` undefined) before data arrives.

---

## Added after verification run (2026-10-14)

### 19. ESLint lints `dist/` after a build (verified)

- **Status (2026-10-19):** Fixed in [GitLab !9](https://github.com/quannguyen-agilityio/claude-training/issues/10) ([#10](https://github.com/quannguyen-agilityio/claude-training/issues/10)).
- **Issue:** https://github.com/quannguyen-agilityio/claude-training/issues/10
- **Where:** `.eslintrc.json` (no `ignorePatterns`), no `.eslintignore`; scripts `lint:eslint` / `fix:eslint` run `eslint .`
- **What:** On a clean checkout, `pnpm lint:eslint` passes (0 errors, 2 warnings). After `pnpm build`, the same command reports **50,894 problems (50,597 errors)**, all from `dist/assets/index-*.js`, and exits 1. The pre-commit hook runs `eslint --fix .`, so it would also try to rewrite the bundle.
- **Fix idea:** Add `"ignorePatterns": ["dist", "storybook-static"]` to `.eslintrc.json` (or create `.eslintignore`).

### 20. Missing `ROOT_URL` → empty app in dev, crash in production (verified)

- **Status (2026-10-19):** Obsolete since [GitLab !3](https://github.com/quannguyen-agilityio/claude-training/issues/5): `ROOT_URL`, axios and `http-client.ts` are gone; data comes from `MockDb`.
- **Where:** `src/services/app-config.ts:2`, `src/services/http-client.ts` (axios `baseURL`), `vite.config.ts` (`EnvironmentPlugin`)
- **What:** Nothing checks that `ROOT_URL` is set. When it's missing, axios's `baseURL` is `undefined` and requests go to the page's own origin:
  - **`pnpm dev`:** Vite answers `GET /books` (JSON `Accept` header) with **404**. The interceptor throws "Request failed with status code 404", an `alert()` fires, and the list stays empty **(verified: 404 + empty list in headless Chrome)**.
  - **`pnpm build` + `pnpm preview` (or any static host with an SPA fallback):** the build compiles `process.env.ROOT_URL` to `{}.ROOT_URL` (= `undefined`). `GET /books` returns `index.html` with **200**, and the app calls `.map` on that HTML string. The whole page is replaced by React Router's **"Unexpected Application Error! e.map is not a function"** **(verified)**.
- **Fix idea:** Fail fast. Throw a clear error at startup or build time when `ROOT_URL` is empty, and/or make `getList` check `Array.isArray(data)`. The mock-data plan (`mock-data-migration-plan.md`) removes `ROOT_URL` entirely.

---

## Added after the Playwright re-verification (2026-10-19)

### 21. Unknown multi-segment URLs show React Router's developer error page (verified)

- **Status (2026-10-21):** Fixed by `c4b5d1c` ([#16](https://github.com/quannguyen-agilityio/claude-training/issues/16)): a catch-all route renders `pages/NotFound`. Playwright: `/a/b` shows "We couldn't find that page" with Back to all books, and 0 console errors; `/edit-book` shows "We couldn't find that book".
- **Status (2026-10-19):** Still open: [#16](https://github.com/quannguyen-agilityio/claude-training/issues/16).
- **Where:** `src/main.tsx:18-35` (`createBrowserRouter` has no `path: '*'` route and no `errorElement`)
- **What:** `/a/b`, `/edit-book` or any unmatched URL with 2+ segments renders "Unexpected Application Error! 404 Not Found 💿 Hey developer 👋" and logs `Error handled by React Router default ErrorBoundary` to the console. Single-segment URLs are fine because `/:bookId` catches them.
- **Fix idea:** Add a `path: '*'` route (and optionally an `errorElement`) that renders a not-found page with `Header`, `EmptyState` and a "Back to all books" link.

### 22. Closing the delete dialog via the backdrop loses focus (verified)

- **Status (2026-10-21):** Fixed by `46911e6` ([#17](https://github.com/quannguyen-agilityio/claude-training/issues/17)): `handleBackdropMouseDown` calls `preventDefault()` before closing. Playwright: open the alertdialog from "Delete Treasure Island", mouse-click the backdrop at (5, 5): the dialog closes and focus is on `BUTTON Delete Treasure Island`. Esc also restores focus there.
- **Status (2026-10-19):** Still open: [#17](https://github.com/quannguyen-agilityio/claude-training/issues/17).
- **Where:** `src/components/common/Dialog/index.tsx:80-82`
- **What:** The backdrop closes on `mousedown`. The effect cleanup restores focus to the opener, then the browser's default `mousedown` action moves focus to the removed backdrop, which leaves it on `<body>`. Esc and Cancel restore focus correctly. This goes against `design/specs/delete-dialog.md:46`. Probe: with `mousedown` default prevented, focus returns to "Delete Treasure Island".
- **Fix idea:** `event.preventDefault()` in `handleBackdropMouseDown` before closing.

### 23. Sort select on Home is unstyled (verified)

- **Status (2026-10-21):** Fixed by `74764ce` ([#18](https://github.com/quannguyen-agilityio/claude-training/issues/18)): the select gets `FIELD_STYLES.base`/`ok` classes. Playwright: background `rgb(255,255,255)` light / `rgb(22,27,34)` dark, `1px solid` border, `8px` radius, and none of `base ok error label` in its class list.
- **Status (2026-10-19):** Still open: [#18](https://github.com/quannguyen-agilityio/claude-training/issues/18).
- **Where:** `src/components/BookToolbar/index.tsx:66`
- **What:** `clsx(FIELD_STYLES, …)` receives the style _object_, so it outputs the keys `base ok error label` as class names. The select keeps the browser default grey background (`rgb(239,239,239)` light, `rgb(107,107,107)` dark) with no border or radius.
- **Fix idea:** `clsx(FIELD_STYLES.base, FIELD_STYLES.ok, …)`, like `SelectField`.

### Notes (not filed)

- **Focus after a successful delete** lands on `<body>`, because the button that opened the dialog is gone. `design/specs/delete-dialog.md` doesn't say where focus should go in that case, so this is a spec gap, not a bug.
- **Console noise:** React Router logs a v7 future-flag warning on every page, and Storybook 6.5 logs React 18's `unmountComponentAtNode` deprecation when switching stories. Neither comes from app code.
