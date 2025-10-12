/**
 * Afri Evolution - Glass Skin Toggle
 * Provides persistent glass effect toggle with performance optimizations
 */

(() => {
  const KEY = "ae-skin";
  const body = document.body;
  
  // Restore saved skin preference
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "glass") {
      body.setAttribute("data-skin", "glass");
    }
  } catch (e) {
    console.warn('Glass skin: localStorage unavailable', e);
  }
  
  /**
   * Toggle glass skin on/off
   * Persists preference to localStorage
   */
  window.aeToggleSkin = () => {
    const current = body.getAttribute("data-skin");
    const next = current === "glass" ? "" : "glass";
    
    if (next) {
      body.setAttribute("data-skin", next);
    } else {
      body.removeAttribute("data-skin");
    }
    
    try {
      localStorage.setItem(KEY, next);
    } catch (e) {
      console.warn('Glass skin: Could not save preference', e);
    }
    
    // Update toggle button ARIA state if it exists
    const toggleBtn = document.getElementById('glass-toggle');
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-pressed', next === "glass" ? 'true' : 'false');
    }
    
    // Dispatch custom event for other scripts to react
    window.dispatchEvent(new CustomEvent('skinChanged', { 
      detail: { skin: next || 'default' } 
    }));
  };
  
  /**
   * Optional: Detect scrolling for mobile performance optimization
   * Adds 'scrolling' class to body during scroll
   * This allows CSS to temporarily reduce blur complexity
   */
  if (window.matchMedia('(max-width: 768px)').matches) {
    let scrollTimeout;
    let isScrolling = false;
    
    window.addEventListener('scroll', () => {
      if (!isScrolling) {
        body.classList.add('scrolling');
        isScrolling = true;
      }
      
      clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        body.classList.remove('scrolling');
        isScrolling = false;
      }, 150); // Wait 150ms after scroll stops
      
    }, { passive: true }); // Passive for better scroll performance
  }
  
  /**
   * Initialize toggle button state on page load
   */
  document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('glass-toggle');
    if (toggleBtn) {
      const currentSkin = body.getAttribute("data-skin");
      toggleBtn.setAttribute('aria-pressed', currentSkin === "glass" ? 'true' : 'false');
    }
  });
  
  // Log glass skin status for debugging
  if (body.getAttribute("data-skin") === "glass") {
    console.log('✨ Glass skin active');
  }
})();

