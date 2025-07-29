/**
 * CTA Tracking and Analytics System
 * Tracks call-to-action interactions for performance measurement
 */

// CTA tracking configuration
const CTA_CONFIG = {
  analytics: {
    enabled: true,
    gtag: typeof gtag !== 'undefined',
    debug: false
  },
  actions: {
    consultation: {
      calendar_url: 'https://calendly.com/samehshihata/consultation',
      fallback_email: 'samehshihata@gmail.com?subject=Data Strategy Consultation Request'
    },
    portfolio: {
      download_url: '/assets/pdf/Sameh_Shehata_Data_Analyst_CV.pdf',
      portfolio_url: 'https://samehshi.github.io/portfolio/'
    }
  }
};

/**
 * Track CTA click events
 * @param {string} ctaType - Type of CTA (primary, secondary, etc.)
 * @param {string} context - Context where CTA was clicked (header, case-studies, etc.)
 */
function trackCTAClick(ctaType, context) {
  const eventData = {
    event_category: 'CTA',
    event_label: `${ctaType}_${context}`,
    value: 1
  };

  // Google Analytics tracking
  if (CTA_CONFIG.analytics.gtag && CTA_CONFIG.analytics.enabled) {
    gtag('event', 'cta_click', eventData);
  }

  // Console logging for debugging
  if (CTA_CONFIG.analytics.debug) {
    console.log('CTA Click Tracked:', {
      type: ctaType,
      context: context,
      timestamp: new Date().toISOString(),
      ...eventData
    });
  }

  // Local storage tracking for analytics dashboard
  trackCTAToLocalStorage(ctaType, context);
}

/**
 * Open calendar booking system
 * @param {string} ctaType - Type of CTA
 * @param {string} context - Context where CTA was clicked
 */
function openCalendarBooking(ctaType, context) {
  trackCTAClick(ctaType, context);
  
  // Track conversion event
  if (CTA_CONFIG.analytics.gtag && CTA_CONFIG.analytics.enabled) {
    gtag('event', 'conversion', {
      event_category: 'CTA',
      event_label: 'consultation_booking',
      value: 1
    });
  }

  // Open calendar booking or fallback to email
  const calendarUrl = CTA_CONFIG.actions.consultation.calendar_url;
  const fallbackEmail = `mailto:${CTA_CONFIG.actions.consultation.fallback_email}`;
  
  try {
    window.open(calendarUrl, '_blank', 'noopener,noreferrer');
  } catch (error) {
    console.warn('Calendar booking failed, falling back to email:', error);
    window.location.href = fallbackEmail;
  }
}

/**
 * Download portfolio or redirect to portfolio site
 * @param {string} ctaType - Type of CTA
 * @param {string} context - Context where CTA was clicked
 */
function downloadPortfolio(ctaType, context) {
  trackCTAClick(ctaType, context);
  
  // Track conversion event
  if (CTA_CONFIG.analytics.gtag && CTA_CONFIG.analytics.enabled) {
    gtag('event', 'conversion', {
      event_category: 'CTA',
      event_label: 'portfolio_download',
      value: 1
    });
  }

  // Download CV PDF or redirect to portfolio
  const downloadUrl = CTA_CONFIG.actions.portfolio.download_url;
  const portfolioUrl = CTA_CONFIG.actions.portfolio.portfolio_url;
  
  // Create temporary download link
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = 'Sameh_Shehata_Data_Analyst_CV.pdf';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Also open portfolio in new tab after short delay
  setTimeout(() => {
    window.open(portfolioUrl, '_blank', 'noopener,noreferrer');
  }, 1000);
}

/**
 * Store CTA tracking data in local storage for analytics
 * @param {string} ctaType - Type of CTA
 * @param {string} context - Context where CTA was clicked
 */
function trackCTAToLocalStorage(ctaType, context) {
  try {
    const storageKey = 'cta_analytics';
    const existingData = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    const newEntry = {
      type: ctaType,
      context: context,
      timestamp: new Date().toISOString(),
      session_id: getSessionId(),
      page_url: window.location.href,
      user_agent: navigator.userAgent.substring(0, 100) // Truncated for privacy
    };
    
    existingData.push(newEntry);
    
    // Keep only last 100 entries to prevent storage bloat
    if (existingData.length > 100) {
      existingData.splice(0, existingData.length - 100);
    }
    
    localStorage.setItem(storageKey, JSON.stringify(existingData));
  } catch (error) {
    console.warn('Failed to store CTA analytics:', error);
  }
}

/**
 * Get or create session ID for tracking
 * @returns {string} Session ID
 */
function getSessionId() {
  const sessionKey = 'cta_session_id';
  let sessionId = sessionStorage.getItem(sessionKey);
  
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem(sessionKey, sessionId);
  }
  
  return sessionId;
}

/**
 * Get CTA analytics data for dashboard
 * @returns {Array} Analytics data
 */
function getCTAAnalytics() {
  try {
    return JSON.parse(localStorage.getItem('cta_analytics') || '[]');
  } catch (error) {
    console.warn('Failed to retrieve CTA analytics:', error);
    return [];
  }
}

/**
 * Generate CTA performance report
 * @returns {Object} Performance metrics
 */
function getCTAPerformanceReport() {
  const data = getCTAAnalytics();
  const report = {
    total_clicks: data.length,
    clicks_by_type: {},
    clicks_by_context: {},
    clicks_by_day: {},
    recent_activity: data.slice(-10).reverse()
  };
  
  data.forEach(entry => {
    // Count by type
    report.clicks_by_type[entry.type] = (report.clicks_by_type[entry.type] || 0) + 1;
    
    // Count by context
    report.clicks_by_context[entry.context] = (report.clicks_by_context[entry.context] || 0) + 1;
    
    // Count by day
    const day = entry.timestamp.split('T')[0];
    report.clicks_by_day[day] = (report.clicks_by_day[day] || 0) + 1;
  });
  
  return report;
}

/**
 * Initialize CTA tracking system
 */
function initializeCTATracking() {
  // Set up global error handling for CTA functions
  window.addEventListener('error', function(event) {
    if (event.error && event.error.stack && event.error.stack.includes('CTA')) {
      console.warn('CTA tracking error:', event.error);
    }
  });
  
  // Track page load for context
  if (CTA_CONFIG.analytics.gtag && CTA_CONFIG.analytics.enabled) {
    gtag('event', 'page_view', {
      event_category: 'CV',
      event_label: 'cv_page_load'
    });
  }
  
  // Debug mode logging
  if (CTA_CONFIG.analytics.debug) {
    console.log('CTA Tracking System Initialized', {
      config: CTA_CONFIG,
      session_id: getSessionId(),
      analytics_enabled: CTA_CONFIG.analytics.enabled
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeCTATracking);
} else {
  initializeCTATracking();
}

// Export functions for console access and testing
window.CTATracking = {
  trackClick: trackCTAClick,
  openCalendar: openCalendarBooking,
  downloadPortfolio: downloadPortfolio,
  getAnalytics: getCTAAnalytics,
  getReport: getCTAPerformanceReport,
  config: CTA_CONFIG
};