(function(){
  // Accessibility helpers (skip-to-content)
  // Mobile menu behavior is handled in `src/scripts/main.js` to avoid duplicate handlers.

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


