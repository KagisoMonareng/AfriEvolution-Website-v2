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
})();

window.aeToggleTheme = () => {
  const el = document.documentElement;
  const isDark = el.classList.toggle('dark');
  try { localStorage.setItem('ae-theme', isDark ? 'dark' : 'light'); } catch (_) {}
};


