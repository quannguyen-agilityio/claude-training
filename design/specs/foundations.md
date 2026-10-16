# Spec: Foundations (tokens and shared components)

**Card:** [`../cards/foundations.html`](../cards/foundations.html) · **Status:** draft 1 (2026-10-16) · **Audit:** [`docs/ui-audit.md`](../../docs/ui-audit.md)

## Purpose

One set of design tokens and shared components that every screen uses, so no screen invents its own colors, sizes or button styles. It goes into `tailwind.config.cjs` and `src/components/common` before any screen changes.

## Direction

Based on **A · Clean Shelf** from the [design canvas](https://claude.ai/artifact/RPSE5CGn1pQzVUsUEgcReB) (calm product UI, keeps the brand blue), plus **C's always-visible card actions**.

## Tokens

### Color

Colors are named by role, not by shade. Each one is a CSS variable (`--color-<name>`, written as an RGB triplet), and `tailwind.config` maps it to a Tailwind color (`bg-surface`, `text-muted`...). Dark mode swaps the variables under `.dark`, so components never need `dark:` classes for color.

| Token | Use | Light | Dark |
| --- | --- | --- | --- |
| `canvas` | Page background | `#F7F8FA` | `#0E1117` |
| `surface` | Header, cards, panels, inputs | `#FFFFFF` | `#161B22` |
| `raised` | Hover fills, skeletons, cover placeholders | `#F1F3F6` | `#1F2630` |
| `line` | Dividers, card borders | `#E4E7EC` | `#2A313C` |
| `line-strong` | Input and control borders (≥3:1 against surface) | `#8A93A3` | `#66717F` |
| `ink` | Main text | `#101828` | `#E6EAF0` |
| `muted` | Secondary text (≥4.5:1 on canvas and surface) | `#5B6474` | `#9AA4B2` |
| `accent` | Primary buttons, selected states | `#0B63D8` | `#4C9AFF` |
| `accent-hover` | Hover on `accent` | `#0A57BF` | `#74B0FF` |
| `accent-soft` | Selected category, selected segment | `#E8F1FE` | `#16263D` |
| `accent-ink` | Text on `accent-soft`, links | `#0A57BF` | `#8EC0FF` |
| `on-accent` | Text on `accent` | `#FFFFFF` | `#0E1117` |
| `danger` | Delete, errors | `#C92A2A` | `#FF8A8A` |
| `danger-hover` | Hover on `danger` | `#A61E1E` | `#FFA3A3` |
| `danger-soft` | Error alert background | `#FDECEC` | `#3A1D1F` |
| `on-danger` | Text on `danger` | `#FFFFFF` | `#0E1117` |
| `focus` | Focus ring | `#0B63D8` | `#4C9AFF` |

Category colors are decorative only (a dot next to the name, never the only signal):

| Token | Light | Dark |
| --- | --- | --- |
| `cat-adventure` | `#E8590C` | `#E8590C` |
| `cat-contemporary` | `#1C7ED6` | `#1C7ED6` |
| `cat-romance` | `#D6336C` | `#D6336C` |
| `cat-fantasy` | `#7048E8` | `#7048E8` |
| `cat-dystopian` | `#0C8599` | `#0C8599` |
| `cat-mystery` | `#495057` | `#ADB5BD` |

### Typography

- **One typeface: Manrope** (400, 500, 600, 700, 800), self-hosted as woff2 with `font-display: swap`. It replaces Rubik, Noto Sans Light and DancingScript.
- **Tailwind's default type scale.** Remove the custom `primary/secondary/tertiary/paragraph` sizes and stop overriding `md/lg/xl/2xl`.

| Role | Class | Size / line height | Weight |
| --- | --- | --- | --- |
| Page title (detail) | `text-4xl tracking-tight` | 36/40 | 800 |
| Page title (lists, forms) | `text-3xl tracking-tight` | 30/36 | 800 |
| Section title | `text-xl` | 20/28 | 800 |
| Card title | `text-base` | 16/24 | 700 |
| Body | `text-base` | 16/24 | 400 |
| Long description | `text-lg leading-relaxed` | 18/29 | 400 |
| UI text (buttons, inputs, nav) | `text-sm` | 14/20 | 600 |
| Meta, counts, labels | `text-xs` / `text-sm` | 12/16, 14/20 | 600 |
| Overline (dt, nav heading) | `text-xs uppercase tracking-wider` | 12/16 | 700 |

### Spacing, size and shape

- **Spacing:** Tailwind's 4px scale only. No arbitrary values like `[77px]`. Anything the scale can't express becomes a named token in `tailwind.config` (see the next two lines).
- **Layout tokens:** `grid-cols-books` = `repeat(auto-fill, minmax(10rem, 1fr))` for the book grid, `aspect-cover` = `2 / 3` for covers.
- **Container:** `max-w-7xl` (1280px) with `px-4 sm:px-6`, defined once in a `Container` layout component.
- **Control height:** `h-11` (44px) for every button, input, select and icon button, to meet the touch-target size.
- **Radius:** `rounded-md` (6px) for covers, `rounded-lg` (8px) for controls, `rounded-xl` (12px) for cards, panels and dialogs, `rounded-full` for chips and dots.
- **Elevation:** `shadow-cover` for book covers, `shadow-popover` for menus and dialogs. Nothing else has a shadow.
- **Covers:** always `aspect-cover object-cover` at the cover's real shape. Never crop to squares or strips.

### Focus

Every interactive element gets the same visible focus ring:
`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas`.
`focus:outline-none` without a replacement is not allowed.

### Icons

Inline SVG with `stroke="currentColor"`, so icons follow the text color in both themes. This replaces the `<img>` SVGs with hardcoded strokes. Icon-only controls always have an `aria-label`. Decorative icons get `aria-hidden="true"`.

## Shared components

| Component | Variants and states | Replaces |
| --- | --- | --- |
| `Button` | `primary`, `secondary`, `ghost`, `danger`, `danger-secondary`; default, hover, focus, active, disabled, loading (spinner + "Saving…" label) | `common/Button` (`primary/secondary/tertiary/warning`) |
| `IconButton` | `secondary`, `ghost`; same states; required `label` prop | `Button variant="circle"` |
| `LinkButton` | Same looks as `Button`, rendered as `<a>` | `<Link><Button/></Link>` (invalid nesting) |
| `TextField` | default, hover, focus, filled, error (message + icon), disabled; optional hint | `common/Input` |
| `SelectField` | Same states as `TextField` | `common/Select` |
| `TextAreaField` | Same states as `TextField` | `common/Textarea` |
| `SearchField` | Leading search icon, clear button when filled | `Header/SearchBar` |
| `SegmentedControl` | Two or more options, one pressed (`aria-pressed`) | Display options in `FilterTable` |
| `CategoryBadge` | Colored dot + name | Pills in `DetailGroup` |
| `Alert` | `danger` (with optional action button) | `alert()` calls |
| `EmptyState` | Icon, title, text, up to two actions | Nothing (new) |
| `Skeleton` | Block, text line, cover | Full-screen `Loading` spinner |
| `Dialog` | Title, body, actions; see [`delete-dialog.md`](delete-dialog.md) | `common/Modal` + `ConfirmBox` |
| `Header` | Logo, search, theme toggle, Add book; see [`home.md`](home.md) | `Header`, `Logo`, `SubHeader` |
| `ThemeToggle` | Light/dark, label says what it switches to | Toggle inside `Header` |

## States

- [ ] Every token shown as a swatch in light and dark
- [ ] Type scale
- [ ] Buttons: every variant × default, hover, focus, active, disabled, loading
- [ ] Icon buttons: same states
- [ ] Fields: default, hover, focus, filled, error, disabled, with hint
- [ ] Segmented control, category badge, alert, empty state, skeletons
- [ ] Light and dark theme
- [ ] Phone (390px): controls stay 44px, nothing overflows

## Interactions

- **Hover:** fill changes to the `*-hover` or `raised` token. No opacity tricks, no `translate` on buttons.
- **Active (pressed):** `active:translate-y-px` on buttons only.
- **Disabled:** `disabled:opacity-50 disabled:cursor-not-allowed`, and no hover change.
- **Loading button:** keeps its width, shows a spinner, is disabled and sets `aria-busy="true"`.
- **Theme:** applied before first paint by an inline script in `index.html` (no flash). The first visit follows `prefers-color-scheme`; the choice is saved under the existing `theme` storage key. Only the `dark` class is toggled on `<html>`.

## Accessibility

- Text contrast ≥4.5:1 and control borders ≥3:1 in both themes (the token values above meet this).
- Focus ring on everything interactive (see Focus).
- No color-only signals: errors have an icon and text, the selected category has weight and background, not just color.
- Real elements only: `<button>` for actions, `<a>` for navigation, `<label>` for every field.

## Logic changes

These are outside a pure restyle, so the plan should keep them as separate steps:

1. **Theme bootstrap:** move theme setup from `Header`'s `useEffect` to an inline script in `index.html`, respect `prefers-color-scheme`, and stop calling `removeAttribute('class')`.
2. **Fonts:** add Manrope woff2 files, remove Rubik, Noto Sans and DancingScript.

## Open questions

- [ ] **Confirm the direction:** A with C's card actions (assumed for this draft). Or another mix from the canvas?
- [ ] Keep the two-squares logo mark as it is, or redraw it?
- [ ] Is Manrope OK, or should the app keep Rubik to change less?
