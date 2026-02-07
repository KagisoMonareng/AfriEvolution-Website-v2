/**
 * Tailwind configuration mapped to CSS token variables.
 * Dark mode is class-based to align with theme.js.
 */
module.exports = {
  darkMode: 'class',
  content: [
    './*.html',
    './src/**/*.{html,js,ts}'
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)']
      },
      fontSize: {
        xs:   ['var(--text-xs)',   { lineHeight: 'var(--lh-xs)' }],
        sm:   ['var(--text-sm)',   { lineHeight: 'var(--lh-sm)' }],
        base: ['var(--text-base)', { lineHeight: 'var(--lh-base)' }],
        lg:   ['var(--text-lg)',   { lineHeight: 'var(--lh-lg)' }],
        xl:   ['var(--text-xl)',   { lineHeight: 'var(--lh-xl)' }],
        '2xl': ['var(--text-2xl)', { lineHeight: 'var(--lh-2xl)' }],
        '3xl': ['var(--text-3xl)', { lineHeight: 'var(--lh-3xl)' }],
        '4xl': ['var(--text-4xl)', { lineHeight: 'var(--lh-4xl)' }]
      },
      fontWeight: {
        regular: 'var(--weight-regular)',
        medium: 'var(--weight-medium)',
        semibold: 'var(--weight-semibold)',
        bold: 'var(--weight-bold)',
        xbold: 'var(--weight-xbold)'
      },
      colors: {
        bg: 'var(--bg)',
        fg: 'var(--fg)',
        subtle: 'var(--subtle)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        surface: { 1: 'var(--surface-1)', 2: 'var(--surface-2)', 3: 'var(--surface-3)' },

        primary: 'var(--primary)',
        primary600: 'var(--primary-600)',
        primaryFg: 'var(--primary-fg)',

        accent: { DEFAULT: 'var(--accent)', hover: 'var(--accent-hover)' },
        accentBg50: 'var(--accent-bg-50)',
        accent200: 'var(--accent-200)',
        taupe: 'var(--accent-taupe)',
        stone: 'var(--accent-stone)',

        success: { DEFAULT: 'var(--success)', fg: 'var(--success-fg)' },
        warning: { DEFAULT: 'var(--warning)', fg: 'var(--warning-fg)' },
        danger: { DEFAULT: 'var(--danger)', fg: 'var(--danger-fg)' },
        info: { DEFAULT: 'var(--info)', fg: 'var(--info-fg)' },

        hover: 'var(--hover)',
        focusRing: 'var(--focus-ring)'
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,.06)',
        md: '0 6px 16px rgba(0,0,0,.10)',
        lg: '0 12px 28px rgba(0,0,0,.16)'
      },
      borderRadius: { xl: '0.75rem', '2xl': '1rem' }
    }
  }
};


