/**
 * Security & Error Tracking Module for EASA College
 * 
 * 1. Inspect & DevTools:
 *    - Inspect, Right-Click, and DevTools shortcuts are enabled by default for development & debugging.
 *    - To optionally disable inspect in specific builds, set VITE_DISABLE_INSPECT=true in .env.
 * 
 * 2. Missing File & Error Logging:
 *    - Intercepts failed resources (missing images, scripts, stylesheets, media 404s).
 *    - Intercepts failed fetch/API requests (404 Not Found, 5xx).
 *    - Captures uncaught runtime errors and unhandled promise rejections with clear logs.
 */

export const isLocalEnvironment = () => {
  if (typeof window === 'undefined') return true;
  const host = window.location.hostname;
  return (
    import.meta.env.DEV ||
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host === '[::1]' ||
    host.endsWith('.local')
  );
};

export const setupInspectProtection = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  // Inspect and DevTools are enabled by default (right-click, F12, DevTools shortcuts)
  const isInspectDisabled = import.meta.env.VITE_DISABLE_INSPECT === 'true';

  if (!isInspectDisabled) {
    console.info('🛠️ DevTools and Inspect are enabled.');
    return;
  }

  console.info('🔒 Security protection active. Inspect and DevTools shortcuts disabled.');

  // 1. Disable right-click context menu
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  }, { capture: true });

  // 2. Disable DevTools and View Source keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // F12
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    const isCtrlOrCmd = e.ctrlKey || e.metaKey;

    // Ctrl+Shift+I / J / C (Inspect Element / DevTools / Console)
    if (isCtrlOrCmd && e.shiftKey) {
      const key = e.key ? e.key.toUpperCase() : '';
      if (key === 'I' || key === 'J' || key === 'C') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }

    // Ctrl+U (View Page Source)
    if (isCtrlOrCmd && (e.key === 'u' || e.key === 'U' || e.keyCode === 85)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+S (Save Page)
    if (isCtrlOrCmd && (e.key === 's' || e.key === 'S' || e.keyCode === 83)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, { capture: true });
};

export const setupErrorAndMissingFileTracker = () => {
  if (typeof window === 'undefined') return;

  // 1. Capture resource loading failures (images, audio, video, script, link tags)
  // MUST use capture: true because resource load errors do NOT bubble to window
  window.addEventListener(
    'error',
    (event) => {
      const target = event.target;
      if (target && target !== window && (target.tagName || target.src || target.href)) {
        const tag = target.tagName ? target.tagName.toUpperCase() : 'RESOURCE';
        const url = target.src || target.href || target.currentSrc || 'unknown URL';
        console.error(
          `🚨 [MISSING FILE / 404 RESOURCE]: Failed to load <${tag}> from:\n   ↳ ${url}`
        );
        return;
      }

      // Runtime JS errors
      if (event.message) {
        console.error(
          `🚨 [RUNTIME ERROR]: ${event.message}\n   ↳ Source: ${event.filename || 'unknown'}:${event.lineno || 0}:${event.colno || 0}`,
          event.error || ''
        );
      }
    },
    true
  );

  // 2. Capture Unhandled Promise Rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('🚨 [UNHANDLED PROMISE REJECTION]:', event.reason || event);
  });

  // 3. Monitor Fetch API for 404 Missing Files and Server Errors
  if (typeof window.fetch === 'function') {
    const originalFetch = window.fetch;
    window.fetch = async function (...args) {
      const requestUrl = typeof args[0] === 'string' ? args[0] : (args[0]?.url || 'unknown');
      try {
        const response = await originalFetch.apply(this, args);
        if (!response.ok) {
          if (response.status === 404) {
            console.error(
              `🚨 [MISSING FILE / 404 NOT FOUND]: Request to "${requestUrl}" returned 404 Not Found`
            );
          } else if (response.status >= 500) {
            console.error(
              `🚨 [SERVER ERROR ${response.status}]: Request to "${requestUrl}" failed with status ${response.status}`
            );
          }
        }
        return response;
      } catch (networkError) {
        console.error(
          `🚨 [NETWORK FAILURE]: Unable to reach or load "${requestUrl}":`,
          networkError.message
        );
        throw networkError;
      }
    };
  }
};

export const initProtectionAndTracking = () => {
  setupInspectProtection();
  setupErrorAndMissingFileTracker();
};

export default initProtectionAndTracking;
