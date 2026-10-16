# UI Audit: practice-one (BookShelter)

Phase 1 of [`ui-refresh-guide.md`](ui-refresh-guide.md). Written 2026-10-16 from the code in `practice-one/src` plus screenshots of the running app (`pnpm dev`). No code was changed.

**Screenshots (the "before" baseline):** [`ui-audit/before/`](ui-audit/before/), 1440×900 desktop in light and dark, plus 390×844 mobile. To retake them (for example after each Phase 4 slice), start `pnpm dev`, then run:

```sh
node docs/ui-audit/screenshots.mjs <output-dir>   # needs google-chrome; port 3000 must be serving
```

## Summary

The UI looks like a 2019–2020 dashboard. It's built from fixed pixel sizes, uses one pill shape for everything, and has color tokens named after shades ("comet", "bluewood") instead of what they're for. Dark mode was added class by class and doesn't hang together. Book covers, the main content of the app, are cropped badly. The biggest functional gaps are keyboard focus and screen-reader support.

### Biggest wins for the refresh

1. **Show covers at their real 2:3 shape.** Never crop them into squares or wide strips.
2. **Role-based tokens** for color, type, radius and spacing, with dark mode built from the same tokens.
3. **Accessibility basics:** a visible focus ring, labeled icon buttons, no buttons nested in links, and a real dialog.
4. **Fluid layouts:** flex and grid instead of fixed widths and absolute positioning.
5. **One readable sans-serif** with a clear type scale. Drop the script logo font.
6. **Proper states:** empty results, skeleton loading, inline errors, and card actions that work on touch.

## Seen in the screenshots

| Screenshot | Problem |
| --- | --- |
| `01-home-grid-*`, `03-home-list-*` | Portrait covers are cropped: square in grid view (e.g. *Normal People* loses its title), a wide strip in list view (unrecognizable). Each cover also sits in a gray box inside a bordered card, so it's framed twice. |
| `01-home-grid-light` | The author wraps oddly ("Robert Louis / Stevenson", with a big line gap) because of `max-w-[150px]`. |
| `03-home-list-light` | List view uses huge 36px titles and a cover strip about 400px wide. A lot of space, little information. |
| `01-home-grid-dark` | Pure black panels sit next to navy `bluewood` and slate `blue-bayoux` cards. Three unrelated darks. The "All" chip, Filter button, ✕ button and theme toggle turn into bright white blobs. |
| `02-home-filter-popover-dark` | The popover gets a light border, and the sort icons disappear. The ✕ next to Sort By has no label. |
| `04-detail-light` | The cover is cropped to landscape. Metadata is shown as blue pills that look clickable but aren't. The description is a single line in a huge empty panel. |
| `05-delete-modal-dark` | The modal stays white in dark mode. The double backdrop makes the page almost black. The cartoon warning icon is huge. "Are you sure to delete this book?" is awkward wording. |
| `06-add-form-light` | Single-column fields stretch about 990px wide. Release Year starts at `0`. The page title is centered but the labels are left-aligned. |
| `07-mobile-home` | The logo text is hidden, so only the blue squares show. "Showing 12 Result(s)" wraps. "+ Add Book" and "Filter" float on their own row. Cards keep a fixed 282px width and don't fill the screen. |
| `09-mobile-detail` | "Book Details", Back, Edit and Delete are squeezed into one 56px bar. |
| `10-mobile-delete-modal` | `min-w-[600px]` overflows the 390px screen. The modal touches both edges and the title is cut off. |

## From the code

### Typography
- **Three typefaces:** Rubik for UI, Noto Sans Light for metadata and DancingScript for the logo. The script logo dates the app the most.
- **Faux bold:** only `NotoSans-Light.ttf` (weight 300) is loaded, but `BookCard` asks for `font-secondary font-semibold`, so the browser fakes the bold.
- **Default sizes overridden:** `tailwind.config.cjs` replaces Tailwind's `md/lg/xl/2xl` sizes and adds `primary/secondary/tertiary/paragraph`. The type scale isn't clear, and some sizes are close together (13/14/15px).
- **Font files:** fonts ship as `.ttf` (not woff2) with no `font-display`.

### Color and dark mode
- **No role-based tokens** (`surface`, `text-muted`, `accent`, `danger`). 14 places use colors outside the theme: `hover:bg-slate-200` and the category hex values in `FilterPanel/Category/index.tsx`.
- **Icons don't adapt:** the SVG icons have hardcoded strokes (e.g. `#B8B9BE`). Circle buttons get a light background in dark mode (`dark:bg-link-water`) to keep them visible.
- **Modal has no dark styles.** Hovered cards get a white glow in dark mode (`dark:hover:shadow-link-water`).
- **Theme flash and side effects:** the theme is applied in a `useEffect`, so the page flashes the wrong theme on load. It ignores the OS dark-mode setting (`prefers-color-scheme`), and `removeAttribute('class')` wipes every class on `<html>`.

### Spacing and layout
- **93 arbitrary values** like `[77px]`, `[265px]`, `[30px]`. Heights depend on each other: `main` uses `h-[calc(100%-135px)]`, which only works if the header stays exactly 77px.
- **Absolute positioning holds the layout together:** `Header` uses `left-36`, `ml-44` and `mr-[75px]`, and `FilterResult` uses `lg:left-[265px]`. The FeaturesBar buttons sit at `absolute top-14` on mobile, and the mobile search is pushed into place with `top-16` + `pt-36`.
- **`max-w-[1260px]` is repeated** in three places instead of being one container token.
- **Boxed look:** bordered columns everywhere (`border-x` on panels, the form and the details page).

### Component patterns
- **Same shape for everything:** buttons, inputs and selects are all 45px pills (`rounded-[30px]`). Corner radii vary with no system: 5, 10, 20, 30px and `xl`.
- **Button states:** hover is just `opacity-80`. There's no disabled or loading state, and no focus style. The `circle` variant skips the shared button styles.
- **BookCard:** fixed widths (`w-[282px]`, list mode `h-[213px]`). Edit and delete only appear on hover, so touch users can't reach them.
- **Feedback:** loading is a full-screen spinner overlay. Errors use `alert()`. Zero results shows no empty state.
- **Forms:** error text is absolutely positioned at `bottom-[-22px]`, with `mb-8` spacing to make room for it.
- **Filter popover:** fixed `h-[350px]`. Every sort option shows a down-arrow that means nothing. "Clear" is a lone ✕ button with no label.
- **ConfirmBox puts one backdrop inside another** (Modal adds its own).

### Responsiveness
- **The Modal's `min-w-[600px]` overflows on phones.**
- **Fixed widths:** grid cards, `BookDetails` (`xl:min-w-[992px]`) and Category (`w-[236px]`).
- **Variant switched in JS:** `FilterButton` picks its variant from `useWindowSize()` instead of using Tailwind breakpoints.
- **Two typo'd classes do nothing:** `md:pt[33px]` (`pages/Home/index.tsx`) and `md:max-width[180px]` (`BookCard/index.tsx`).

### Accessibility (highest priority)
- **No visible focus:** inputs, selects and textareas set `focus:outline-none` with no replacement, and nothing else defines a focus style.
- **Unlabeled icon buttons:** none has an `aria-label`, and their images use `alt="Icon"`.
- **Buttons inside links:** `<Link><Button/></Link>` puts a `<button>` inside an `<a>` (Back, Edit, Add Book, Cancel). That's invalid HTML and causes double tab stops.
- **`aria-checked` without a role** on Category and the display options.
- **The Modal isn't a real dialog:** no `role="dialog"`, no focus trap, and Esc doesn't close it.
- **Weak contrast:** dark-mode placeholders are white, the same as typed text. `storm-gray` and `comet` text on light backgrounds is borderline.

### Storybook
Stories are missing for `Select`, `Textarea`, `BookForm`, `ConfirmBox`, `BookList`, `BookActions` and `FilterTable`. Existing stories don't cover states like hover, disabled, error or empty.
