/**
 * Tailwind configuration mapped to CSS token variables.
 * Dark mode is class-based to align with theme.js.
 */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './**/*.html',
    './src/**/*.{js,ts}'
  ],
  theme: {
    extend: {
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


