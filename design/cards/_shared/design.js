/*
 * Shared building blocks for the design cards (design/specs/foundations.md).
 *
 * The class strings here are the reference for the React components in phase 4:
 * copy them, don't reinvent them. Everything renders as plain HTML so Tailwind's
 * Play CDN picks the classes up.
 *
 * URL params: ?theme=dark  ?state=<slug> (show one state)  ?frame=1 (no review bar)
 */
(function () {
  const params = new URLSearchParams(location.search);
  document.documentElement.classList.toggle('dark', params.get('theme') === 'dark');

  // Copy of practice-one/src/data/books.json (version 1)
  const BOOKS = [
    {
      "id": "54a7e10e-f3f7-48b7-85a4-92b6363ad7aa",
      "title": "Treasure Island",
      "thumbnail": "https://covers.openlibrary.org/b/isbn/9780141321004-L.jpg",
      "author": "Robert Louis Stevenson",
      "published": 1883,
      "description": "Young Jim Hawkins finds a treasure map and sails with the cunning Long John Silver in search of buried pirate gold.",
      "category": "Adventure",
      "publishers": "Cassell and Company",
      "country": "United Kingdom"
    },
    {
      "id": "b5ecd37f-51b4-4062-9d6a-e3d46a4ea700",
      "title": "Around the World in Eighty Days",
      "thumbnail": "https://covers.openlibrary.org/b/isbn/9780140449068-L.jpg",
      "author": "Jules Verne",
      "published": 1872,
      "description": "Phileas Fogg wagers his fortune that he can circle the globe in eighty days, with his valet Passepartout at his side.",
      "category": "Adventure",
      "publishers": "Pierre-Jules Hetzel",
      "country": "France"
    },
    {
      "id": "3a124530-d7fc-4a5d-9657-85932c54604b",
      "title": "The Kite Runner",
      "thumbnail": "https://covers.openlibrary.org/b/isbn/9781594631931-L.jpg",
      "author": "Khaled Hosseini",
      "published": 2003,
      "description": "A story of friendship, betrayal and redemption between two boys growing up in Kabul.",
      "category": "Contemporary",
      "publishers": "Riverhead Books",
      "country": "United States"
    },
    {
      "id": "6e89bf87-0374-4d0f-ba6b-0c78527ed3bc",
      "title": "Normal People",
      "thumbnail": "https://covers.openlibrary.org/b/isbn/9781984822178-L.jpg",
      "author": "Sally Rooney",
      "published": 2018,
      "description": "Connell and Marianne drift together and apart through school and university in small-town Ireland and Dublin.",
      "category": "Contemporary",
      "publishers": "Faber & Faber",
      "country": "Ireland"
    },
    {
      "id": "2b1438ec-4d04-4068-b316-de2c786a34d6",
      "title": "Pride and Prejudice",
      "thumbnail": "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg",
      "author": "Jane Austen",
      "published": 1813,
      "description": "Elizabeth Bennet and Mr. Darcy overcome pride, prejudice and their families on the way to love.",
      "category": "Romance",
      "publishers": "T. Egerton",
      "country": "United Kingdom"
    },
    {
      "id": "991f1c19-2d5c-47ad-98f2-a11d2a800d0d",
      "title": "Jane Eyre",
      "thumbnail": "https://covers.openlibrary.org/b/isbn/9780141441146-L.jpg",
      "author": "Charlotte Brontë",
      "published": 1847,
      "description": "An orphaned governess falls for her brooding employer, Mr. Rochester, at mysterious Thornfield Hall.",
      "category": "Romance",
      "publishers": "Smith, Elder & Co.",
      "country": "United Kingdom"
    },
    {
      "id": "0670d435-acf2-404a-9631-d81ae59ed032",
      "title": "The Hobbit",
      "thumbnail": "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg",
      "author": "J. R. R. Tolkien",
      "published": 1937,
      "description": "Bilbo Baggins is swept into a quest with thirteen dwarves to reclaim their treasure from the dragon Smaug.",
      "category": "Fantasy",
      "publishers": "George Allen & Unwin",
      "country": "United Kingdom"
    },
    {
      "id": "01754a7b-c071-43d7-8aa0-097d7e70087f",
      "title": "A Wizard of Earthsea",
      "thumbnail": "https://covers.openlibrary.org/b/isbn/9780547773742-L.jpg",
      "author": "Ursula K. Le Guin",
      "published": 1968,
      "description": "A gifted young wizard, Ged, unleashes a shadow upon the world and must hunt it down.",
      "category": "Fantasy",
      "publishers": "Parnassus Press",
      "country": "United States"
    },
    {
      "id": "f1278288-4d19-490f-84ce-fca54e4b5bb5",
      "title": "Nineteen Eighty-Four",
      "thumbnail": "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
      "author": "George Orwell",
      "published": 1949,
      "description": "Winston Smith quietly rebels against Big Brother in a totalitarian state that controls every thought.",
      "category": "Dystopian",
      "publishers": "Secker & Warburg",
      "country": "United Kingdom"
    },
    {
      "id": "5f474f2d-abc3-4066-a384-25725159b5a9",
      "title": "The Handmaid's Tale",
      "thumbnail": "https://covers.openlibrary.org/b/isbn/9780385490818-L.jpg",
      "author": "Margaret Atwood",
      "published": 1985,
      "description": "In the theocratic Republic of Gilead, Offred is forced to bear children for the ruling class.",
      "category": "Dystopian",
      "publishers": "McClelland and Stewart",
      "country": "Canada"
    },
    {
      "id": "676d909e-5f89-4e0f-812a-0bd5a571b044",
      "title": "The Hound of the Baskervilles",
      "thumbnail": "https://covers.openlibrary.org/b/isbn/9780140437867-L.jpg",
      "author": "Arthur Conan Doyle",
      "published": 1902,
      "description": "Sherlock Holmes investigates a legendary spectral hound haunting the Baskerville family on Dartmoor.",
      "category": "Mystery",
      "publishers": "George Newnes",
      "country": "United Kingdom"
    },
    {
      "id": "5814d7e8-84e8-4aed-8644-42ee3677fdae",
      "title": "The Name of the Rose",
      "thumbnail": "https://covers.openlibrary.org/b/isbn/9780156001311-L.jpg",
      "author": "Umberto Eco",
      "published": 1980,
      "description": "A Franciscan friar investigates a series of deaths in a remote 14th-century Italian abbey.",
      "category": "Mystery",
      "publishers": "Bompiani",
      "country": "Italy"
    }
  ];

  const CATEGORIES = ['Adventure', 'Contemporary', 'Romance', 'Fantasy', 'Dystopian', 'Mystery'];

  // ---------- helpers ----------
  let uid = 0;
  const nextId = prefix => `${prefix}-${++uid}`;
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const catKey = c => (c ? `cat-${c.toLowerCase()}` : 'muted');

  // Turn the hover:/focus:/active: classes into plain classes, to show a state without interacting.
  const PREFIXES = { hover: ['hover:', 'group-hover:'], focus: ['focus-visible:', 'focus:'], active: ['hover:', 'active:'] };
  const force = (cls, state) => {
    const prefixes = PREFIXES[state];
    if (!prefixes) return cls;
    return cls
      .split(/\s+/)
      .map(c => {
        const p = prefixes.find(x => c.startsWith(x));
        return p ? c.slice(p.length) : c;
      })
      .join(' ');
  };

  // ---------- icons ----------
  const ICONS = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6"/>',
    back: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    alert: '<circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5V21h16"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
  };
  const icon = (name, cls = 'h-5 w-5') =>
    `<svg class="${cls} shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
  const spinner = (cls = 'h-4 w-4') =>
    `<svg class="${cls} shrink-0 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-opacity=".3" stroke-width="3"/><path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`;

  // ---------- class tokens ----------
  const focusRing =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas';

  const btnBase = `inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 text-sm font-semibold transition-colors active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 disabled:active:translate-y-0 ${focusRing}`;
  const BUTTON = {
    primary: `${btnBase} bg-accent text-on-accent hover:bg-accent-hover`,
    secondary: `${btnBase} border border-line-strong bg-surface text-ink hover:bg-raised`,
    ghost: `${btnBase} text-ink hover:bg-raised`,
    danger: `${btnBase} bg-danger text-on-danger hover:bg-danger-hover`,
    'danger-secondary': `${btnBase} border border-line-strong bg-surface text-danger hover:bg-danger-soft`,
  };
  const ICON_BUTTON = {
    ghost: `inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-raised hover:text-ink disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`,
    secondary: `inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-surface text-ink transition-colors hover:bg-raised disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`,
  };
  const FIELD = {
    base: 'block w-full rounded-lg border bg-surface px-3 text-base text-ink placeholder:text-muted transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-raised disabled:opacity-60',
    ok: 'border-line-strong hover:border-muted focus:border-focus focus:ring-focus/30',
    error: 'border-danger focus:border-danger focus:ring-danger/30',
    label: 'mb-1.5 block text-sm font-semibold text-ink',
  };

  // ---------- components ----------
  const attrsOf = obj =>
    Object.entries(obj)
      .filter(([, v]) => v !== undefined && v !== false && v !== null)
      .map(([k, v]) => (v === true ? k : `${k}="${esc(v)}"`))
      .join(' ');

  function button({ label, variant = 'primary', icon: ic, href, state, loading, loadingLabel, disabled, cls = '', attrs = {} }) {
    const classes = `${force(BUTTON[variant], state)} ${cls}`;
    const inner = loading
      ? `${spinner()}<span>${esc(loadingLabel || label)}</span>`
      : `${ic ? icon(ic) : ''}<span>${esc(label)}</span>`;
    if (href) return `<a href="${href}" class="${classes}" ${attrsOf(attrs)}>${inner}</a>`;
    return `<button type="button" class="${classes}" ${attrsOf({ disabled: disabled || loading, 'aria-busy': loading ? 'true' : undefined, ...attrs })}>${inner}</button>`;
  }

  function iconButton({ label, icon: ic, variant = 'ghost', href, state, disabled, cls = '', attrs = {} }) {
    const classes = `${force(ICON_BUTTON[variant], state)} ${cls}`;
    if (href) return `<a href="${href}" class="${classes}" aria-label="${esc(label)}" ${attrsOf(attrs)}>${icon(ic)}</a>`;
    return `<button type="button" class="${classes}" aria-label="${esc(label)}" ${attrsOf({ disabled, ...attrs })}>${icon(ic)}</button>`;
  }

  function field({ label, kind = 'input', type = 'text', value = '', placeholder = '', error, hint, state, disabled, options = [], rows = 5, cls = '' }) {
    const id = nextId('field');
    const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(' ') || undefined;
    const control = force(`${FIELD.base} ${error ? FIELD.error : FIELD.ok}`, state);
    const common = attrsOf({ id, name: id, disabled, 'aria-invalid': error ? 'true' : undefined, 'aria-describedby': describedBy });
    let el;
    if (kind === 'select') {
      el = `<div class="relative"><select ${common} class="${control} h-11 appearance-none pr-10">${options
        .map(o => `<option${o === value ? ' selected' : ''}>${esc(o)}</option>`)
        .join('')}</select><span class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted">${icon('chevronDown')}</span></div>`;
    } else if (kind === 'textarea') {
      el = `<textarea ${common} rows="${rows}" placeholder="${esc(placeholder)}" class="${control} resize-y py-2.5 leading-relaxed">${esc(value)}</textarea>`;
    } else {
      el = `<input ${common} type="${type}" value="${esc(value)}" placeholder="${esc(placeholder)}" class="${control} h-11">`;
    }
    return `<div class="${cls}">
      <label for="${id}" class="${FIELD.label}">${esc(label)}</label>
      ${el}
      ${hint && !error ? `<p id="${id}-hint" class="mt-1.5 text-sm text-muted">${esc(hint)}</p>` : ''}
      ${error ? `<p id="${id}-error" class="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-danger">${icon('alert', 'mt-px h-4 w-4')}<span>${esc(error)}</span></p>` : ''}
    </div>`;
  }

  function searchField({ value = '', state } = {}) {
    const id = nextId('search');
    const control = force(`${FIELD.base} ${FIELD.ok} h-11 pl-10 ${value ? 'pr-12' : ''}`, state);
    return `<form role="search" class="relative" onsubmit="return false">
      <label for="${id}" class="sr-only">Search books by title</label>
      <span class="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted">${icon('search')}</span>
      <input id="${id}" type="search" value="${esc(value)}" placeholder="Search by title" class="${control} [&::-webkit-search-cancel-button]:appearance-none">
      ${value ? `<span class="absolute inset-y-0 right-0 flex items-center">${iconButton({ label: 'Clear search', icon: 'x' })}</span>` : ''}
    </form>`;
  }

  const themeToggle = () =>
    `<button type="button" data-theme-toggle class="${ICON_BUTTON.secondary}" aria-label="Switch theme">
      <span class="dark:hidden">${icon('moon')}</span><span class="hidden dark:inline">${icon('sun')}</span>
    </button>`;

  const logo = () =>
    `<a href="home.html" class="flex shrink-0 items-center gap-2.5 rounded-lg text-xl font-extrabold tracking-tight text-ink ${focusRing}">
      <svg class="h-7 w-7" viewBox="0 0 28 28" aria-hidden="true"><rect x="2" y="9" width="15" height="15" rx="3" class="fill-accent"/><rect x="11" y="3" width="15" height="15" rx="3" class="fill-accent" opacity=".5"/></svg>
      BookShelter
    </a>`;

  function header({ search = true, searchValue = '' } = {}) {
    return `<header class="border-b border-line bg-surface">
      <div class="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:px-6">
        ${logo()}
        ${search ? `<div class="order-last w-full sm:order-none sm:w-auto sm:max-w-xl sm:flex-1">${searchField({ value: searchValue })}</div>` : ''}
        <div class="ml-auto flex items-center gap-2">
          ${themeToggle()}
          <a href="book-form.html" class="${BUTTON.primary} max-sm:w-11 max-sm:px-0">${icon('plus')}<span class="max-sm:sr-only">Add book</span></a>
        </div>
      </div>
    </header>`;
  }

  const container = (html, cls = '') => `<div class="mx-auto max-w-7xl px-4 sm:px-6 ${cls}">${html}</div>`;

  const badge = category =>
    `<span class="inline-flex min-w-0 items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-0.5 text-xs font-semibold text-ink">
      <span class="h-2 w-2 shrink-0 rounded-full bg-${catKey(category)}"></span><span class="truncate">${esc(category)}</span>
    </span>`;

  function cover(book, { cls = '', alt = '', state } = {}) {
    if (!book.thumbnail) {
      return `<div aria-hidden="true" class="flex aspect-cover w-full flex-col justify-between rounded-md border border-line bg-raised p-3 text-muted ${cls}">
        ${icon('book', 'h-6 w-6')}
        <span class="line-clamp-4 text-sm font-bold leading-snug">${esc(book.title)}</span>
      </div>`;
    }
    return `<img src="${esc(book.thumbnail)}" alt="${esc(alt)}" loading="lazy" class="${force('block aspect-cover w-full rounded-md bg-raised object-cover shadow-cover transition-shadow group-hover:shadow-cover-lg', state)} ${cls}">`;
  }

  function bookActions(book, { state } = {}) {
    return `<div class="-mr-2 flex shrink-0">
      ${iconButton({ label: `Edit ${book.title}`, icon: 'edit', href: 'book-form.html', state })}
      ${iconButton({ label: `Delete ${book.title}`, icon: 'trash', state: state === 'hover-delete' ? 'hover' : undefined })}
    </div>`;
  }

  function bookCard(book, { state } = {}) {
    return `<li class="flex min-w-0 flex-col">
      <a href="book-detail.html" class="${force(`group block rounded-md ${focusRing}`, state === 'focus' ? 'focus' : undefined)}">
        ${cover(book, { state: state === 'hover' ? 'hover' : undefined })}
        <h3 class="${force('mt-3 line-clamp-2 text-base font-bold leading-snug text-ink group-hover:underline', state === 'hover' ? 'hover' : undefined)}">${esc(book.title)}</h3>
      </a>
      <p class="mt-1 truncate text-sm text-muted">${esc(book.author)}</p>
      <p class="mt-0.5 flex min-w-0 items-center gap-1.5 text-sm text-muted">
        <span class="h-2 w-2 shrink-0 rounded-full bg-${catKey(book.category)}"></span>
        <span class="truncate">${esc(book.published)} · ${esc(book.category)}</span>
      </p>
      <div class="mt-auto flex justify-end pt-1">
        ${bookActions(book, { state: state === 'actions' ? 'hover-delete' : undefined })}
      </div>
    </li>`;
  }

  function bookRow(book, { state } = {}) {
    return `<li class="flex items-center gap-3 rounded-xl border border-line bg-surface p-3 sm:gap-5 sm:p-4">
      <a href="book-detail.html" class="${force(`group flex min-w-0 flex-1 items-center gap-4 rounded-lg sm:gap-5 ${focusRing}`, state)}">
        <div class="w-14 shrink-0 sm:w-16">${cover(book, { state })}</div>
        <div class="min-w-0">
          <h3 class="${force('line-clamp-2 text-base font-bold leading-snug text-ink group-hover:underline sm:text-lg', state)}">${esc(book.title)}</h3>
          <p class="mt-0.5 truncate text-sm text-muted">${esc(book.author)} · ${esc(book.published)}</p>
          <div class="mt-2 flex">${badge(book.category)}</div>
        </div>
      </a>
      ${bookActions(book)}
    </li>`;
  }

  const skeleton = cls => `<div class="animate-pulse rounded bg-raised ${cls}"></div>`;
  const skeletonCard = () =>
    `<li class="flex flex-col">${skeleton('aspect-cover w-full rounded-md')}${skeleton('mt-3 h-4 w-4/5')}${skeleton('mt-2 h-3 w-3/5')}${skeleton('mt-2 h-3 w-1/4')}</li>`;

  function emptyState({ icon: ic = 'book', title, text, actions = '' }) {
    return `<div class="mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center">
      <div class="flex h-12 w-12 items-center justify-center rounded-full bg-raised text-muted">${icon(ic, 'h-6 w-6')}</div>
      <h2 class="mt-4 text-xl font-extrabold text-ink">${esc(title)}</h2>
      <p class="mt-2 text-base text-muted">${esc(text)}</p>
      ${actions ? `<div class="mt-6 flex flex-wrap justify-center gap-3">${actions}</div>` : ''}
    </div>`;
  }

  function alertBox({ title, text, action }) {
    return `<div role="alert" class="flex flex-wrap items-start gap-3 rounded-xl border border-danger/40 bg-danger-soft p-4 text-ink">
      <span class="mt-0.5 text-danger">${icon('alert')}</span>
      <div class="min-w-0 flex-1 basis-48"><p class="font-bold">${esc(title)}</p>${text ? `<p class="mt-0.5 text-sm">${esc(text)}</p>` : ''}</div>
      ${action ? button({ label: action, variant: 'secondary', cls: 'h-9' }) : ''}
    </div>`;
  }

  // ---------- states + review bar ----------
  function states(list) {
    const root = document.getElementById('states');
    const only = params.get('state');
    root.innerHTML = list
      .filter(s => !only || slug(s.name) === only)
      .map(
        s => `<section id="${slug(s.name)}" aria-label="State: ${esc(s.name)}">
          <div class="rv-label"><strong>${esc(s.name)}</strong><span>${esc(s.note || '')}</span></div>
          <div class="bg-canvas text-ink ${s.cls || ''}">${s.html}</div>
        </section>`,
      )
      .join('');
    reviewBar(list);
    bindTheme();
  }

  function setTheme(dark) {
    document.documentElement.classList.toggle('dark', dark);
    const url = new URL(location.href);
    if (dark) url.searchParams.set('theme', 'dark');
    else url.searchParams.delete('theme');
    history.replaceState(null, '', url);
    const btn = document.getElementById('rv-theme');
    if (btn) btn.setAttribute('aria-pressed', String(dark));
    document.querySelectorAll('[data-theme-toggle]').forEach(b =>
      b.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme'),
    );
  }

  function bindTheme() {
    const isDark = () => document.documentElement.classList.contains('dark');
    document.querySelectorAll('[data-theme-toggle]').forEach(b => b.addEventListener('click', () => setTheme(!isDark())));
    setTheme(isDark());
  }

  function reviewBar(list) {
    if (params.get('frame')) return;
    const spec = document.body.dataset.spec;
    const bar = document.createElement('div');
    bar.className = 'rv-bar';
    bar.innerHTML = `<strong>${esc(document.title)}</strong>
      <a href="index.html">All cards</a>
      ${spec ? `<a href="../specs/${spec}.md">Spec</a>` : ''}
      <select id="rv-state" aria-label="Jump to state"><option value="">Jump to state…</option>${list
        .map(s => `<option value="${slug(s.name)}">${esc(s.name)}</option>`)
        .join('')}</select>
      <button type="button" id="rv-theme" aria-pressed="false">Dark theme</button>
      <button type="button" id="rv-phone">Phone (390px)</button>`;
    document.body.prepend(bar);
    bar.querySelector('#rv-state').addEventListener('change', e => {
      const el = document.getElementById(e.target.value);
      if (el) window.scrollTo({ top: el.offsetTop - bar.offsetHeight, behavior: 'smooth' });
    });
    bar.querySelector('#rv-theme').addEventListener('click', () => setTheme(!document.documentElement.classList.contains('dark')));
    bar.querySelector('#rv-phone').addEventListener('click', openPhone);
  }

  function openPhone() {
    const url = new URL(location.href);
    url.searchParams.set('frame', '1');
    const overlay = document.createElement('div');
    overlay.className = 'rv-phone';
    overlay.innerHTML = `<iframe title="Phone preview (390px)" src="${url}"></iframe>`;
    const close = () => {
      overlay.remove();
      document.removeEventListener('keydown', onKey);
    };
    const onKey = e => e.key === 'Escape' && close();
    overlay.addEventListener('click', e => e.target === overlay && close());
    document.addEventListener('keydown', onKey);
    document.body.append(overlay);
  }

  window.Design = {
    BOOKS,
    CATEGORIES,
    book: title => BOOKS.find(b => b.title === title),
    esc,
    icon,
    spinner,
    force,
    focusRing,
    BUTTON,
    ICON_BUTTON,
    FIELD,
    button,
    iconButton,
    field,
    searchField,
    themeToggle,
    header,
    container,
    badge,
    cover,
    bookCard,
    bookRow,
    skeleton,
    skeletonCard,
    emptyState,
    alertBox,
    states,
  };
})();
