/**
 * ==============================================================================
 * SIGNATURE AURA FIRST-PARTY ATTRIBUTION & CONVERSION PIXEL (omnitrack)
 * Version: 2026.1.0 · Lightweight Zero-Dependency Client Telemetry (<4KB)
 * ==============================================================================
 */
(function (window, document) {
  'use strict';

  var STORAGE_KEY = '__omnitrack_events';
  var CONSENT_KEY = '__omnitrack_consent';
  var SESSION_KEY = '__omnitrack_sid';
  var UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];

  // Session ID Generator (per tab lifecycle)
  function getSessionId() {
    try {
      var sid = sessionStorage.getItem(SESSION_KEY);
      if (!sid) {
        sid = 'sa_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
        sessionStorage.setItem(SESSION_KEY, sid);
      }
      return sid;
    } catch (e) {
      return 'sa_anonymous';
    }
  }

  // Extract campaign parameters from query string
  function getCampaignParams() {
    var params = {};
    try {
      var urlParams = new URLSearchParams(window.location.search);
      UTM_PARAMS.forEach(function (param) {
        if (urlParams.has(param)) {
          params[param] = urlParams.get(param);
        }
      });
    } catch (e) {}
    return params;
  }

  // Consent Management Gate
  var consent = {
    isGranted: function () {
      try {
        var status = localStorage.getItem(CONSENT_KEY);
        return status !== 'denied'; // Default to true (first-party essential analytics)
      } catch (e) {
        return true;
      }
    },
    grant: function () {
      try {
        localStorage.setItem(CONSENT_KEY, 'granted');
        window.dispatchEvent(new CustomEvent('omnitrack:consent', { detail: { consent: 'granted' } }));
      } catch (e) {}
    },
    deny: function () {
      try {
        localStorage.setItem(CONSENT_KEY, 'denied');
        window.dispatchEvent(new CustomEvent('omnitrack:consent', { detail: { consent: 'denied' } }));
      } catch (e) {}
    }
  };

  // Event Dispatcher & Storage
  function track(eventName, eventProps) {
    if (!consent.isGranted()) return;

    var payload = {
      event: eventName,
      timestamp: new Date().toISOString(),
      sessionId: getSessionId(),
      path: window.location.pathname,
      title: document.title,
      referrer: document.referrer || 'direct',
      campaign: getCampaignParams(),
      properties: eventProps || {}
    };

    // 1. Dispatch custom DOM event for active components/listeners
    try {
      var customEvt = new CustomEvent('omnitrack:event', { detail: payload });
      window.dispatchEvent(customEvt);
    } catch (e) {}

    // 2. Persist to localStorage queue (capped at last 50 events)
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var queue = raw ? JSON.parse(raw) : [];
      queue.unshift(payload);
      if (queue.length > 50) queue.length = 50;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
    } catch (e) {}

    // 3. Optional Beacon endpoint if configured
    if (window.OMNITRACK_ENDPOINT && navigator.sendBeacon) {
      try {
        navigator.sendBeacon(window.OMNITRACK_ENDPOINT, JSON.stringify(payload));
      } catch (e) {}
    }
  }

  // Auto-Capture Pageviews for Single Page Applications (Next.js router changes)
  var lastTrackedPath = '';
  function trackPageView() {
    var currentPath = window.location.pathname + window.location.search;
    if (currentPath === lastTrackedPath) return;
    lastTrackedPath = currentPath;
    track('page_view', {
      url: window.location.href,
      path: window.location.pathname
    });
  }

  // Intercept history.pushState and history.replaceState for SPA transitions
  var origPushState = history.pushState;
  if (origPushState) {
    history.pushState = function () {
      origPushState.apply(this, arguments);
      setTimeout(trackPageView, 50);
    };
  }
  var origReplaceState = history.replaceState;
  if (origReplaceState) {
    history.replaceState = function () {
      origReplaceState.apply(this, arguments);
      setTimeout(trackPageView, 50);
    };
  }
  window.addEventListener('popstate', function () {
    setTimeout(trackPageView, 50);
  });

  // Auto-Capture High-Intent Click Conversions
  document.addEventListener('click', function (e) {
    var target = e.target.closest('a, button');
    if (!target) return;

    var href = target.getAttribute('href') || '';
    var text = (target.textContent || '').trim().substring(0, 60);

    // 1. WhatsApp Redirections
    if (href.indexOf('wa.me') !== -1 || href.indexOf('whatsapp.com') !== -1) {
      track('conversion_whatsapp_click', {
        href: href,
        buttonText: text,
        source: window.location.pathname
      });
      return;
    }

    // 2. Telephone Hotline Clicks
    if (href.indexOf('tel:') === 0) {
      track('conversion_phone_call', {
        phone: href.replace('tel:', ''),
        buttonText: text
      });
      return;
    }

    // 3. Email Inquiries
    if (href.indexOf('mailto:') === 0) {
      track('conversion_email_click', {
        email: href.replace('mailto:', '')
      });
      return;
    }

    // 4. Document / Brochure Downloads
    if (href.match(/\.(pdf|zip|docx|xlsx)($|\?)/i) || target.getAttribute('data-download') === 'true') {
      track('brochure_download', {
        fileUrl: href,
        fileName: text
      });
    }
  }, true);

  // Expose global omnitrack API
  window.omnitrack = {
    track: track,
    page: trackPageView,
    consent: consent,
    getRecentEvents: function () {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      } catch (e) {
        return [];
      }
    }
  };

  // Initial trigger
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    trackPageView();
  } else {
    document.addEventListener('DOMContentLoaded', trackPageView);
  }

})(window, document);
