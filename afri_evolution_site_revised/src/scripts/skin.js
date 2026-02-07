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
   * Set glass variant directly from panel selection
   */
  window.aeSetGlassVariant = (variantKey) => {
    let next;
    
    if (variantKey === 'off') {
      next = VARIANTS[0]; // Off
    } else if (variantKey === 'v-subtle') {
      next = VARIANTS[1]; // Subtle
    } else if (variantKey === 'standard') {
      next = VARIANTS[2]; // Standard
    } else if (variantKey === 'v-bold') {
      next = VARIANTS[3]; // Bold
    } else {
      return;
    }
    
    console.log(`Glass: Selecting ${next.label}`);
    
    // Apply variant
    if (next.skin) {
      body.setAttribute("data-skin", next.skin);
      if (next.variant) {
        body.setAttribute("data-glass-variant", next.variant);
      } else {
        body.removeAttribute("data-glass-variant");
      }
      console.log(`Glass ${next.label} ENABLED`);
    } else {
      body.removeAttribute("data-skin");
      body.removeAttribute("data-glass-variant");
      console.log('Glass effect OFF');
    }
    
    // Save to localStorage
    try {
      localStorage.setItem(KEY_SKIN, next.skin);
      localStorage.setItem(KEY_VARIANT, next.variant);
    } catch (e) {
      console.warn('Glass skin: Could not save preference', e);
    }
    
    // Update panel active state
    updateGlassPanelActive(variantKey);
    
    // Update toggle button
    const toggleBtn = document.getElementById('glass-toggle');
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-pressed', next.skin === "glass" ? 'true' : 'false');
      try {
        const sr = toggleBtn.querySelector('.sr-only');
        if (sr) {
          sr.textContent = `Glass: ${next.label}`;
        } else {
          toggleBtn.setAttribute('aria-label', `Toggle glass effect (currently ${next.label})`);
        }
      } catch (e) {
        toggleBtn.setAttribute('aria-label', `Toggle glass effect (currently ${next.label})`);
      }
    }
    
    window.dispatchEvent(new CustomEvent('skinChanged', { 
      detail: { skin: next.skin || 'default', variant: next.variant, label: next.label } 
    }));
  };
  
  /**
   * Update glass panel active item
   */
  function updateGlassPanelActive(variantKey) {
    const panel = document.getElementById('glass-panel');
    if (!panel) return;
    
    panel.querySelectorAll('.panel-item').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-variant') === variantKey) {
        item.classList.add('active');
      }
    });
  }
  
  /**
   * Cycle through glass variants (old behavior, kept for backward compatibility)
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
    
    console.log(`Glass cycle: ${VARIANTS[currentIndex].label} → ${next.label}`);
    
    // Determine variant key for panel update
    let variantKey = 'off';
    if (next.skin === 'glass' && next.variant === 'v-subtle') variantKey = 'v-subtle';
    else if (next.skin === 'glass' && !next.variant) variantKey = 'standard';
    else if (next.skin === 'glass' && next.variant === 'v-bold') variantKey = 'v-bold';
    
    // Use the new setVariant function
    window.aeSetGlassVariant(variantKey);
    
    // Toggle panel open/close
    const panel = document.getElementById('glass-panel');
    if (panel) {
      panel.classList.toggle('open');
      panel.setAttribute('aria-hidden', panel.classList.contains('open') ? 'false' : 'true');
    }
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
   * Initialize glass panel on DOMContentLoaded
   */
  document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('glass-toggle');
    const panel = document.getElementById('glass-panel');
    
    // Initialize toggle button state
    if (toggleBtn) {
      const currentSkin = body.getAttribute("data-skin") || "";
      const currentVariant = body.getAttribute("data-glass-variant") || "";
      const current = VARIANTS.find(v => v.skin === currentSkin && v.variant === currentVariant) || VARIANTS[0];
      
      toggleBtn.setAttribute('aria-pressed', currentSkin === "glass" ? 'true' : 'false');
      try {
        const sr = toggleBtn.querySelector('.sr-only');
        if (sr) sr.textContent = `Glass: ${current.label}`;
        else toggleBtn.setAttribute('aria-label', `Toggle glass effect (currently ${current.label})`);
      } catch (e) {
        toggleBtn.setAttribute('aria-label', `Toggle glass effect (currently ${current.label})`);
      }
    }
    
    // Initialize glass panel items and attach click handlers
    if (panel) {
      const panelItems = panel.querySelectorAll('.panel-item');
      
      panelItems.forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          const variantKey = item.getAttribute('data-variant');
          window.aeSetGlassVariant(variantKey);
          // Close panel after selection
          panel.classList.remove('open');
          panel.setAttribute('aria-hidden', 'true');
        });
      });
      
      // Set initial active state
      const currentSkin = body.getAttribute("data-skin") || "";
      const currentVariant = body.getAttribute("data-glass-variant") || "";
      let activeVariant = 'off';
      if (currentSkin === 'glass' && currentVariant === 'v-subtle') activeVariant = 'v-subtle';
      else if (currentSkin === 'glass' && !currentVariant) activeVariant = 'standard';
      else if (currentSkin === 'glass' && currentVariant === 'v-bold') activeVariant = 'v-bold';
      
      updateGlassPanelActive(activeVariant);
      
      // Close panel when clicking outside
      document.addEventListener('click', (e) => {
        if (panel.classList.contains('open')) {
          const isInPanel = panel.contains(e.target);
          const isToggle = toggleBtn && toggleBtn.contains(e.target);
          if (!isInPanel && !isToggle) {
            panel.classList.remove('open');
            panel.setAttribute('aria-hidden', 'true');
          }
        }
      });
    }
  });
  
  // Log glass skin status for debugging
  const initialSkin = body.getAttribute("data-skin") || "";
  const initialVariant = body.getAttribute("data-glass-variant") || "";
  const initialState = VARIANTS.find(v => v.skin === initialSkin && v.variant === initialVariant) || VARIANTS[0];
  console.log(`🎨 Glass skin module loaded: ${initialState.label}`);
  console.log('Click glass toggle to cycle: Off → Subtle → Standard → Bold');
})();

