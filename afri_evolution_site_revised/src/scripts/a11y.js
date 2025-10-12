(function(){
  // Mobile menu toggle
  const toggleBtn = document.querySelector('[data-toggle="mobile-menu"]');
  const mobileMenu = document.getElementById('mobile-menu');
  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', function(){
      const isOpen = mobileMenu.classList.toggle('hidden') === false;
      const expanded = !mobileMenu.classList.contains('hidden');
      toggleBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        toggleBtn.setAttribute('aria-expanded','false');
        toggleBtn.focus();
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.classList.contains('hidden')){
        const withinMenu = mobileMenu.contains(e.target);
        const isToggle = toggleBtn.contains(e.target);
        if (!withinMenu && !isToggle) {
          mobileMenu.classList.add('hidden');
          toggleBtn.setAttribute('aria-expanded','false');
        }
      }
    });
  }

  // Highlight active nav link by pathname
  try {
    const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('header a[href]').forEach(a => {
      const href = (a.getAttribute('href')||'').toLowerCase();
      if (href.endsWith(here)) {
        a.classList.add('text-primary','font-semibold','underline','underline-offset-8');
      }
    });
  } catch(_) {}

  // Skip to content: focus main when using skip links or loading with #main
  const main = document.getElementById('main');
  function focusMain(){
    if (!main) return;
    try {
      if (!main.hasAttribute('tabindex')) main.setAttribute('tabindex','-1');
      main.focus();
    } catch(_) {}
  }
  document.querySelectorAll('a[href="#main"]').forEach(link => {
    link.addEventListener('click', (e) => {
      // allow default scroll, then focus
      setTimeout(focusMain, 0);
    });
  });
  if (location.hash === '#main') {
    // If navigated directly with hash
    setTimeout(focusMain, 0);
  }
})();


