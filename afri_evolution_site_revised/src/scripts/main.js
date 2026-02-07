/**
 * Afri Evolution - Main JavaScript Module
 * Consolidates all common functionality across pages
 */

// Import sub-modules
import './theme.js';
import './a11y.js';
import './skin.js';

/**
 * Product Interest Event Mapping
 * Maps product event names to their GA4 parameters
 */
const PRODUCT_INTEREST_MAP = {
  'launchpad_interest': {
    product_key: 'launchpad',
    section: 'services_page',
    cta_position: 'services_card'
  },
  'dcf_interest': {
    product_key: 'dcf',
    section: 'services_page',
    cta_position: 'services_card'
  },
  'flowstudio_interest': {
    product_key: 'flowstudio',
    section: 'services_page',
    cta_position: 'services_card'
  },
  'connectcrm_interest': {
    product_key: 'connectcrm',
    section: 'services_page',
    cta_position: 'services_card'
  },
  'chatboost_interest': {
    product_key: 'chatboost',
    section: 'services_page',
    cta_position: 'services_card'
  }
};

/**
 * GA4 CTA Tracking
 * Tracks all CTA interactions with gtag
 * Sends specific product interest events or generic cta_click events
 */
function trackCtaClick({ label, location = 'unknown' }) {
  // Safely check if gtag is available globally
  if (typeof window.gtag !== 'function') {
    return; // silently skip if gtag not available
  }

  // Check if this is a product interest event
  if (PRODUCT_INTEREST_MAP[label]) {
    const params = PRODUCT_INTEREST_MAP[label];
    window.gtag('event', label, {
      product_key: params.product_key,
      section: params.section,
      cta_position: params.cta_position,
      page_path: window.location.pathname
    });
  } else {
    // Fall back to generic cta_click event for other CTAs
    window.gtag('event', 'cta_click', {
      cta_label: label,
      cta_location: location,
      page_path: window.location.pathname
    });
  }
}

/**
 * Initialize CTA Tracking
 * Attaches click listeners to all elements with data-cta attribute
 */
export function initCtaTracking() {
  const ctaElements = document.querySelectorAll('[data-cta]');

  ctaElements.forEach(element => {
    element.addEventListener('click', () => {
      const label = element.getAttribute('data-cta');
      const location = element.getAttribute('data-cta-location');

      trackCtaClick({ label, location });
    });
  });
}

/**
 * Mobile Menu Toggle
 * Handles mobile menu open/close with proper ARIA attributes
 */
export function initMobileMenu() {
  const toggleBtn = document.querySelector('[data-toggle="mobile-menu"]');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (!toggleBtn || !mobileMenu) return;

  const menuIcon = toggleBtn.querySelector('.menu-icon');
  const closeIcon = toggleBtn.querySelector('.close-icon');

  // Toggle menu with icon animation
  function lockScroll(lock) {
    if (lock) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overscrollBehavior = 'contain';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overscrollBehavior = '';
    }
  }

  function toggleMenu() {
    const willOpen = !mobileMenu.classList.contains('open');

    if (willOpen) {
      mobileMenu.classList.remove('hidden');
      // force reflow to ensure transition
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      mobileMenu.offsetWidth;
      mobileMenu.classList.add('open');
    } else {
      mobileMenu.classList.remove('open');
      // after transition, hide to remove from flow
      setTimeout(() => mobileMenu.classList.add('hidden'), 260);
    }

    // Update accessibility
    toggleBtn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    mobileMenu.setAttribute('aria-hidden', willOpen ? 'false' : 'true');
    lockScroll(willOpen);

    // Animate icon switch
    if (willOpen) {
      menuIcon?.classList.add('hidden');
      closeIcon?.classList.remove('hidden');
    } else {
      menuIcon?.classList.remove('hidden');
      closeIcon?.classList.add('hidden');
    }
  }

  // Close menu
  function closeMenu() {
    mobileMenu.classList.remove('open');
    // hide after transition completes
    setTimeout(() => mobileMenu.classList.add('hidden'), 260);
    mobileMenu.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    lockScroll(false);
    menuIcon?.classList.remove('hidden');
    closeIcon?.classList.add('hidden');
  }

  // Event listeners
  toggleBtn.addEventListener('click', toggleMenu);

  // Close when clicking any link inside the mobile menu
  mobileMenu.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.closest && target.closest('a')) {
      closeMenu();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
      toggleBtn.focus();
    }
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('open')) {
      const withinMenu = mobileMenu.contains(e.target);
      const isToggle = toggleBtn.contains(e.target);
      if (!withinMenu && !isToggle) {
        closeMenu();
      }
    }
  });
}

/**
 * Scroll Animations
 * Observes elements and adds 'is-visible' class when they enter viewport
 */
export function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Stop observing once visible
      }
    });
  }, observerOptions);

  // Observe all elements with fade-in and reveal classes
  document.querySelectorAll('.fade-in, .fade-in-up, .reveal').forEach(element => {
    observer.observe(element);
  });
}

/**
 * Active Navigation Highlighting
 * Highlights current page in navigation
 */
export function highlightActiveNav() {
  try {
    const currentPage = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    
    // Clear any existing aria-current
    document.querySelectorAll('header a[aria-current], #mobile-menu a[aria-current]').forEach(link => {
      link.removeAttribute('aria-current');
    });

    // Set aria-current on matching links in both desktop and mobile menus
    document.querySelectorAll('header a[href], #mobile-menu a[href]').forEach(link => {
      const href = (link.getAttribute('href') || '').toLowerCase();
      if (href === currentPage || href.endsWith(currentPage)) {
        link.setAttribute('aria-current', 'page');
      }
    });
  } catch (e) {
    console.error('Error highlighting active nav:', e);
  }
}

/**
 * Form Validation
 * Enhanced form validation with accessibility
 */
export function initFormValidation(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  function showError(inputId, show) {
    const errorEl = document.getElementById(`err-${inputId}`);
    const inputEl = document.getElementById(inputId);
    
    if (errorEl) {
      errorEl.classList.toggle('hidden', !show);
    }
    if (inputEl) {
      inputEl.setAttribute('aria-invalid', show ? 'true' : 'false');
      if (show) {
        inputEl.classList.add('border-danger');
      } else {
        inputEl.classList.remove('border-danger');
      }
    }
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    let isValid = true;

    // Validate name
    const nameInput = document.getElementById('name');
    if (nameInput && !nameInput.value.trim()) {
      showError('name', true);
      isValid = false;
    } else if (nameInput) {
      showError('name', false);
    }

    // Validate email
    const emailInput = document.getElementById('email');
    if (emailInput && !validateEmail(emailInput.value)) {
      showError('email', true);
      isValid = false;
    } else if (emailInput) {
      showError('email', false);
    }

    // Validate message
    const messageInput = document.getElementById('message');
    if (messageInput && !messageInput.value.trim()) {
      showError('message', true);
      isValid = false;
    } else if (messageInput) {
      showError('message', false);
    }

    if (!isValid) return;

    // Submit to Formspree if valid
    if (form.action.includes('formspree.io')) {
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        const messageEl = document.getElementById('form-message');
        if (response.ok) {
          if (messageEl) {
            messageEl.classList.remove('hidden');
            messageEl.classList.add('show');
          }
          form.reset();
        } else {
          alert('There was a problem submitting the form. Please try again.');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        alert('There was a problem submitting the form. Please try again.');
      }
    }
  });
}

/**
 * Accordion Functionality
 * For FAQ sections
 */
export function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const icon = this.querySelector('span');

      if (content.classList.contains('active')) {
        content.classList.remove('active');
        content.style.maxHeight = '0';
        icon.innerHTML = '<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
      } else {
        // Close all other accordions
        document.querySelectorAll('.accordion-content.active').forEach(item => {
          item.classList.remove('active');
          item.style.maxHeight = '0';
          item.previousElementSibling.querySelector('span').innerHTML = '<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
        });

        content.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.innerHTML = '<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus"><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
      }
    });
  });
}

/**
 * Auto-Hide Header on Scroll
 * Hides header when scrolling down, shows when scrolling up
 * Always visible when near top of page
 */
export function initStickyHeader() {
  const header = document.querySelector('header');
  if (!header) return;
  
  let lastScrollY = window.scrollY;
  let ticking = false;
  const scrollThreshold = 100; // Minimum scroll before hiding
  const scrollDelta = 5; // Minimum scroll delta to trigger hide/show
  
  function updateHeader() {
    const currentScrollY = window.scrollY;
    const scrollDifference = currentScrollY - lastScrollY;
    
    // Near top - always show
    if (currentScrollY < scrollThreshold) {
      header.classList.remove('nav-hidden');
      header.classList.remove('scrolled');
    } 
    // Scrolling down - hide
    else if (scrollDifference > scrollDelta && currentScrollY > scrollThreshold) {
      header.classList.add('nav-hidden');
      header.classList.add('scrolled');
    } 
    // Scrolling up - show
    else if (scrollDifference < -scrollDelta) {
      header.classList.remove('nav-hidden');
      header.classList.add('scrolled');
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick, { passive: true });
}

/**
 * Initialize all common functionality
 * Call this on DOMContentLoaded
 */
export function init() {
  initMobileMenu();
  initScrollAnimations();
  highlightActiveNav();
  initAccordions();
  initStickyHeader();
  initCtaTracking();
  
  // Initialize form validation if contact form exists
  if (document.getElementById('contactForm')) {
    initFormValidation('contactForm');
  }
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for manual initialization if needed
window.AfriEvolution = {
  init,
  initMobileMenu,
  initScrollAnimations,
  highlightActiveNav,
  initFormValidation,
  initAccordions,
  initCtaTracking
};

