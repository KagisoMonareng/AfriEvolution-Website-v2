// DEV-ONLY: tweakcn live preview loader — remove before production
// Purpose: Inject `https://tweakcn.com/live-preview.min.js` when running locally
// Gating: localhost, 127.0.0.1, ::1 (IPv6)
(function enableTweakcnPreviewDevOnly() {
  try {
    var host = (window.location && window.location.hostname) || '';
    var isLocal = host === 'localhost' || host === '127.0.0.1' || host === '::1';
    if (!isLocal) return; // no-op on non-local hosts

    if (window.__tweakcnPreviewLoaded) return; // guard against duplicates
    if (document.querySelector('script[src*="tweakcn.com/live-preview"]')) return;

    var s = document.createElement('script');
    s.src = 'https://tweakcn.com/live-preview.min.js';
    s.crossOrigin = 'anonymous';
    s.referrerPolicy = 'no-referrer';
    s.onload = function () { window.__tweakcnPreviewLoaded = true; };
    document.head.appendChild(s);

    if (console && console.info) {
      console.info('[tweakcn] Live Preview enabled (dev-only).');
    }
  } catch (err) {
    if (console && console.warn) console.warn('[tweakcn] Preview loader error:', err);
  }
})();


