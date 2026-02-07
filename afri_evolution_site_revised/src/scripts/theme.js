(function() {
  const KEY = 'ae-theme';
  let stored = null;
  try { stored = localStorage.getItem(KEY); } catch (_) {}
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const next = stored ?? (prefersDark ? 'dark' : 'light');
  const el = document.documentElement;
  el.classList.toggle('dark', next === 'dark');
  if (!stored) {
    try { localStorage.setItem(KEY, next); } catch (_) {}
  }
  // Keep the theme-toggle button in sync (aria-pressed + label)
  function updateThemeToggle() {
    try {
      const btn = document.getElementById('theme-toggle');
      if (!btn) return;
      const isDark = document.documentElement.classList.contains('dark');
      btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      btn.setAttribute('aria-label', `Toggle dark mode (currently ${isDark ? 'on' : 'off'})`);
    } catch (_) {}
  }

  // Initialize toggle state when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateThemeToggle);
  } else {
    updateThemeToggle();
  }

})();

window.aeToggleTheme = () => {
  const el = document.documentElement;
  const isDark = el.classList.toggle('dark');
  try { localStorage.setItem('ae-theme', isDark ? 'dark' : 'light'); } catch (_) {}
  try { const btn = document.getElementById('theme-toggle'); if (btn) { btn.setAttribute('aria-pressed', isDark ? 'true' : 'false'); btn.setAttribute('aria-label', `Toggle dark mode (currently ${isDark ? 'on' : 'off'})`); } } catch (_) {}
};


