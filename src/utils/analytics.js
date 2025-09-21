import ReactGA from "react-ga4";

// Configuration
const GA_MEASUREMENT_ID =
  process.env.REACT_APP_GA4_MEASUREMENT_ID || "G-09NVE6K239";
const isProduction = process.env.NODE_ENV === "production";

// Initialize GA4
export const initializeGA = () => {
  if (isProduction && GA_MEASUREMENT_ID && GA_MEASUREMENT_ID.startsWith("G-")) {
    ReactGA.initialize(GA_MEASUREMENT_ID, {
      debug: false,
      titleCase: false,
      gaOptions: {
        send_page_view: false, // We'll send page views manually
        cookie_flags: "SameSite=None;Secure",
        allow_ad_personalization_signals: false,
        allow_google_signals: false
      }
    });
    console.log("GA4 initialized successfully");
  } else {
    console.log("GA4 not initialized (development mode or missing ID)");
  }
};

// Track page views
export const trackPageView = (pagePath, pageTitle) => {
  if (isProduction && GA_MEASUREMENT_ID && GA_MEASUREMENT_ID.startsWith("G-")) {
    ReactGA.send({
      hitType: "pageview",
      page: pagePath,
      title: pageTitle
    });
  }
};

// Custom Events for Portfolio
export const trackEvent = (eventName, parameters = {}) => {
  if (isProduction && GA_MEASUREMENT_ID && GA_MEASUREMENT_ID.startsWith("G-")) {
    ReactGA.event(eventName, parameters);
  }
};

// Portfolio-specific event tracking functions
export const portfolioEvents = {
  // Section interactions
  viewSection: sectionName => {
    trackEvent("view_section", {
      section_name: sectionName,
      event_category: "engagement",
      event_label: "section_view"
    });
  },

  // Project interactions
  viewProject: (projectName, projectType = "portfolio") => {
    trackEvent("view_project", {
      project_name: projectName,
      project_type: projectType,
      event_category: "engagement",
      event_label: "project_view"
    });
  },

  clickProjectLink: (projectName, linkType, url) => {
    trackEvent("click_project_link", {
      project_name: projectName,
      link_type: linkType, // 'github', 'live_demo', 'kaggle', etc.
      url: url,
      event_category: "engagement",
      event_label: "project_link_click"
    });
  },

  // Social media interactions
  clickSocialLink: (platform, url) => {
    trackEvent("click_social_link", {
      platform: platform,
      url: url,
      event_category: "engagement",
      event_label: "social_link_click"
    });
  },

  // Contact interactions
  contactAction: actionType => {
    trackEvent("contact_action", {
      action_type: actionType, // 'email_click', 'phone_click', 'contact_form'
      event_category: "engagement",
      event_label: "contact_interaction"
    });
  },

  // Resume interactions
  downloadResume: (format = "pdf") => {
    trackEvent("download_resume", {
      file_format: format,
      event_category: "engagement",
      event_label: "resume_download",
      value: 1
    });
  },

  viewResume: (format = "pdf") => {
    trackEvent("view_resume", {
      file_format: format,
      event_category: "engagement",
      event_label: "resume_view"
    });
  },

  // Blog interactions
  clickBlogPost: (postTitle, platform) => {
    trackEvent("click_blog_post", {
      post_title: postTitle,
      platform: platform, // 'medium', 'dev.to', etc.
      event_category: "engagement",
      event_label: "blog_click"
    });
  },

  // Skills section interactions
  viewSkillDetails: skillCategory => {
    trackEvent("view_skill_details", {
      skill_category: skillCategory,
      event_category: "engagement",
      event_label: "skill_interaction"
    });
  },

  // Achievement interactions
  viewCertificate: (certificateName, issuer) => {
    trackEvent("view_certificate", {
      certificate_name: certificateName,
      issuer: issuer,
      event_category: "engagement",
      event_label: "certificate_view"
    });
  },

  // Theme interactions
  toggleTheme: newTheme => {
    trackEvent("toggle_theme", {
      theme: newTheme, // 'dark', 'light'
      event_category: "ui_interaction",
      event_label: "theme_change"
    });
  },

  // Navigation interactions
  scrollToSection: sectionName => {
    trackEvent("scroll_to_section", {
      section_name: sectionName,
      event_category: "navigation",
      event_label: "section_scroll"
    });
  },

  clickScrollToTop: () => {
    trackEvent("click_scroll_to_top", {
      event_category: "navigation",
      event_label: "scroll_to_top"
    });
  },

  // Search interactions (if applicable)
  search: (query, resultsCount) => {
    trackEvent("search", {
      search_term: query,
      results_count: resultsCount,
      event_category: "engagement",
      event_label: "portfolio_search"
    });
  },

  // Performance tracking
  trackTiming: (name, value, category = "performance") => {
    trackEvent("timing_complete", {
      name: name,
      value: value,
      event_category: category,
      event_label: "performance_timing"
    });
  },

  // Error tracking
  trackError: (errorMessage, errorLocation) => {
    trackEvent("exception", {
      description: errorMessage,
      fatal: false,
      location: errorLocation,
      event_category: "error",
      event_label: "javascript_error"
    });
  },

  // Engagement milestones
  sessionMilestone: milestone => {
    trackEvent("session_milestone", {
      milestone: milestone, // '30_seconds', '1_minute', '2_minutes', etc.
      event_category: "engagement",
      event_label: "session_duration"
    });
  },

  // Content interactions
  expandContent: (contentType, contentId) => {
    trackEvent("expand_content", {
      content_type: contentType,
      content_id: contentId,
      event_category: "engagement",
      event_label: "content_expansion"
    });
  },

  // External link tracking
  clickExternalLink: (url, linkText) => {
    trackEvent("click_external_link", {
      url: url,
      link_text: linkText,
      event_category: "engagement",
      event_label: "external_link_click"
    });
  }
};

// Utility function to track user engagement time
export const trackEngagementTime = () => {
  const startTime = Date.now();

  return {
    stop: () => {
      const engagementTime = Math.round((Date.now() - startTime) / 1000);
      trackEvent("engagement_time", {
        engagement_time_msec: engagementTime * 1000,
        event_category: "engagement",
        event_label: "time_on_page"
      });
      return engagementTime;
    }
  };
};

// Enhanced ecommerce tracking for portfolio "conversions"
export const trackConversion = (conversionType, value = 1) => {
  trackEvent("conversion", {
    conversion_type: conversionType,
    value: value,
    currency: "USD", // For value tracking
    event_category: "conversion",
    event_label: "portfolio_conversion"
  });
};

// User demographics tracking (optional, privacy-compliant)
export const trackUserInfo = userInfo => {
  if (userInfo.country) {
    ReactGA.set({country: userInfo.country});
  }
  if (userInfo.language) {
    ReactGA.set({language: userInfo.language});
  }
};

// Debug function for development
export const debugAnalytics = () => {
  if (!isProduction) {
    console.log("Analytics Debug Info:", {
      GA_MEASUREMENT_ID,
      isProduction,
      initialized: ReactGA.isInitialized
    });
  }
};

const analyticsUtils = {
  initialize: initializeGA,
  trackPageView,
  trackEvent,
  portfolioEvents,
  trackEngagementTime,
  trackConversion,
  trackUserInfo,
  debugAnalytics
};

export default analyticsUtils;
