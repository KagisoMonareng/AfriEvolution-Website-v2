(function(){
  const tablist = document.querySelector('#tablist');
  if (!tablist) return;
  const tabs = [...document.querySelectorAll('#tablist .tab')];
  const panels = [...document.querySelectorAll('.panel')];

  function setSelected(btn, on){
    btn.setAttribute('aria-selected', on ? 'true' : 'false');
    btn.setAttribute('tabindex', on ? '0' : '-1');
    if (on) {
      // Active tab: primary color, bold, on white/surface-1 background
      btn.classList.add('bg-surface-1', 'text-primary', 'font-semibold');
      btn.classList.remove('text-subtle', 'text-bg/80', 'font-medium');
    } else {
      // Inactive tab: subtle color, medium weight
      btn.classList.remove('bg-surface-1', 'text-primary', 'font-semibold');
      btn.classList.add('text-subtle', 'font-medium');
    }
  }

  function activate(id, push=true, focusBtn=false){
    let activeBtn = null;
    tabs.forEach(btn => {
      const on = btn.dataset.tab === id;
      setSelected(btn, on);
      if (on) activeBtn = btn;
    });
    panels.forEach(p => p.classList.toggle('hidden', p.id !== id));
    if (push){
      const url = new URL(window.location);
      url.hash = `services?t=${id}`;
      history.replaceState(null, '', url);
    }
    if (focusBtn && activeBtn) activeBtn.focus();
    try { window.dispatchEvent(new CustomEvent('tab_view', {detail:{service: id}})); } catch(e){}
  }

  // Init ARIA
  tabs.forEach((t, i) => {
    t.setAttribute('role', 'tab');
    t.setAttribute('aria-controls', t.dataset.tab);
    t.setAttribute('tabindex', i === 0 ? '0' : '-1');
    t.addEventListener('click', (e) => { e.preventDefault(); activate(t.dataset.tab); });
  });
  tablist.setAttribute('role','tablist');

  // Keyboard navigation (roving tabindex)
  tablist.addEventListener('keydown', (e) => {
    const currentIndex = tabs.findIndex(t => t.getAttribute('tabindex') === '0');
    if (currentIndex < 0) return;
    let nextIndex = currentIndex;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % tabs.length;
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      e.preventDefault();
    } else if (e.key === 'Home') {
      nextIndex = 0; e.preventDefault();
    } else if (e.key === 'End') {
      nextIndex = tabs.length - 1; e.preventDefault();
    } else if (e.key === 'Enter' || e.key === ' ') {
      const focused = tabs[currentIndex];
      activate(focused.dataset.tab, true, true);
      e.preventDefault();
      return;
    } else {
      return;
    }
    tabs.forEach((t, i) => setSelected(t, i === nextIndex));
    tabs[nextIndex].focus();
  });

  // Sync with hash changes (e.g., back/forward navigation)
  window.addEventListener('hashchange', () => {
    const m = /t=(t[0-4])/.exec(new URL(window.location).hash);
    if (m) activate(m[1], false);
  });

  const hash = new URL(window.location).hash;
  const m = /t=(t[0-4])/.exec(hash);
  const initial = m ? m[1] : (tabs[0]?.dataset.tab || 't0');
  activate(initial, false);
})();


