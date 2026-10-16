// Tailwind theme from design/specs/foundations.md, for the Play CDN.
// In the app this becomes the theme block in practice-one/tailwind.config.cjs.
const token = name => `rgb(var(--color-${name}) / <alpha-value>)`;

tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        canvas: token('canvas'),
        surface: token('surface'),
        raised: token('raised'),
        line: { DEFAULT: token('line'), strong: token('line-strong') },
        ink: token('ink'),
        muted: token('muted'),
        accent: { DEFAULT: token('accent'), hover: token('accent-hover'), soft: token('accent-soft'), ink: token('accent-ink') },
        'on-accent': token('on-accent'),
        danger: { DEFAULT: token('danger'), hover: token('danger-hover'), soft: token('danger-soft') },
        'on-danger': token('on-danger'),
        focus: token('focus'),
        cat: {
          adventure: token('cat-adventure'),
          contemporary: token('cat-contemporary'),
          romance: token('cat-romance'),
          fantasy: token('cat-fantasy'),
          dystopian: token('cat-dystopian'),
          mystery: token('cat-mystery'),
        },
      },
      boxShadow: {
        cover: 'var(--shadow-cover)',
        'cover-lg': 'var(--shadow-cover-lg)',
        popover: 'var(--shadow-popover)',
      },
      aspectRatio: {
        cover: '2 / 3',
      },
      gridTemplateColumns: {
        books: 'repeat(auto-fill, minmax(10rem, 1fr))',
      },
    },
  },
};
