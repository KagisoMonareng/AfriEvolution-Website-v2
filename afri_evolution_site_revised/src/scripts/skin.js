/**
 * Afri Evolution - Glass Skin Toggle
 * Cycles through glass variants: Off → Subtle → Standard → Bold → Off
 */

(() => {
  const KEY_SKIN = "ae-skin";
  const KEY_VARIANT = "ae-glass-variant";
  const body = document.body;
  
  // Glass variants in cycle order
  const VARIANTS = [
    { skin: "", variant: "", label: "Off" },
    { skin: "glass", variant: "v-subtle", label: "Subtle" },
    { skin: "glass", variant: "", label: "Standard" },
    { skin: "glass", variant: "v-bold", label: "Bold" }
  ];
  
  // Restore saved preferences
  try {
    const savedSkin = localStorage.getItem(KEY_SKIN);
    const savedVariant = localStorage.getItem(KEY_VARIANT);
    if (savedSkin === "glass") {
      body.setAttribute("data-skin", "glass");
      if (savedVariant) {
        body.setAttribute("data-glass-variant", savedVariant);
      }
    }
  } catch (e) {
    console.warn('Glass skin: localStorage unavailable', e);
  }
  
  /**
   * Cycle through glass variants
   * Persists preference to localStorage
   */
  window.aeToggleSkin = () => {
    const currentSkin = body.getAttribute("data-skin") || "";
    const currentVariant = body.getAttribute("data-glass-variant") || "";
    
    // Find current state in variants array
    let currentIndex = VARIANTS.findIndex(v => v.skin === currentSkin && v.variant === currentVariant);
    if (currentIndex === -1) currentIndex = 0;
    
    // Move to next variant (cycle back to start after last)
    const nextIndex = (currentIndex + 1) % VARIANTS.length;
    const next = VARIANTS[nextIndex];
    
    console.log(`🎨 Glass cycle: ${VARIANTS[currentIndex].label} → ${next.label}`);
    
    // Apply new variant
    if (next.skin) {
      body.setAttribute("data-skin", next.skin);
      if (next.variant) {
        body.setAttribute("data-glass-variant", next.variant);
      } else {
        body.removeAttribute("data-glass-variant");
      }
      console.log(`✨ Glass ${next.label} ENABLED`);
    } else {
      body.removeAttribute("data-skin");
      body.removeAttribute("data-glass-variant");
      console.log('❌ Glass effect OFF');
    }
    
    // Save to localStorage
    try {
      localStorage.setItem(KEY_SKIN, next.skin);
      localStorage.setItem(KEY_VARIANT, next.variant);
    } catch (e) {
      console.warn('Glass skin: Could not save preference', e);
    }
    
    // Update toggle button
    const toggleBtn = document.getElementById('glass-toggle');
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-pressed', next.skin === "glass" ? 'true' : 'false');
      // Update button text to show current variant
      const textNode = toggleBtn.childNodes[0];
      if (textNode && textNode.nodeType === Node.TEXT_NODE) {
        toggleBtn.childNodes[0].textContent = `✨ Glass: ${next.label}`;
      }
      console.log(`🔘 Toggle button: ${next.label}`);
    }
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('skinChanged', { 
      detail: { skin: next.skin || 'default', variant: next.variant, label: next.label } 
    }));
    
    console.log('📋 Body attributes:', body.getAttribute('data-skin'), body.getAttribute('data-glass-variant'));
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
      const currentSkin = body.getAttribute("data-skin") || "";
      const currentVariant = body.getAttribute("data-glass-variant") || "";
      const current = VARIANTS.find(v => v.skin === currentSkin && v.variant === currentVariant) || VARIANTS[0];
      
      toggleBtn.setAttribute('aria-pressed', currentSkin === "glass" ? 'true' : 'false');
      
      // Update button text to show current variant
      const textNode = toggleBtn.childNodes[0];
      if (textNode && textNode.nodeType === Node.TEXT_NODE) {
        toggleBtn.childNodes[0].textContent = `✨ Glass: ${current.label}`;
      }
    }
  });
  
  // Log glass skin status for debugging
  const initialSkin = body.getAttribute("data-skin") || "";
  const initialVariant = body.getAttribute("data-glass-variant") || "";
  const initialState = VARIANTS.find(v => v.skin === initialSkin && v.variant === initialVariant) || VARIANTS[0];
  console.log(`🎨 Glass skin module loaded: ${initialState.label}`);
  console.log('Click glass toggle to cycle: Off → Subtle → Standard → Bold');
})();

