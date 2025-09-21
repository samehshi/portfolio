import React, {useEffect} from "react";
import {HelmetProvider} from "react-helmet-async";
import "./App.scss";
import Main from "./containers/Main";
import Analytics from "./utils/analytics";

function App() {
  useEffect(() => {
    // Initialize Google Analytics 4
    Analytics.initialize();

    // Track initial page view
    Analytics.trackPageView(window.location.pathname, document.title);

    // Track engagement time
    const engagementTimer = Analytics.trackEngagementTime();

    // Track session milestones
    const milestones = [30000, 60000, 120000, 300000]; // 30s, 1m, 2m, 5m
    const timers = milestones.map(time =>
      setTimeout(() => {
        const milestone =
          time < 60000 ? `${time / 1000}_seconds` : `${time / 60000}_minutes`;
        Analytics.portfolioEvents.sessionMilestone(milestone);
      }, time)
    );

    // Track page visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        engagementTimer.stop();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Track unload to get final engagement time
    const handleBeforeUnload = () => {
      engagementTimer.stop();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Error tracking
    const handleError = event => {
      Analytics.portfolioEvents.trackError(
        event.error?.message || "Unknown error",
        event.filename || "Unknown location"
      );
    };

    const handleUnhandledRejection = event => {
      Analytics.portfolioEvents.trackError(
        event.reason?.message || "Unhandled promise rejection",
        "Promise rejection"
      );
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    // Performance tracking
    if ("performance" in window && "getEntriesByType" in performance) {
      window.addEventListener("load", () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType("navigation")[0];
          if (perfData) {
            Analytics.portfolioEvents.trackTiming(
              "page_load_time",
              Math.round(perfData.loadEventEnd - perfData.fetchStart),
              "performance"
            );
          }
        }, 0);
      });
    }

    // Cleanup function
    return () => {
      timers.forEach(timer => clearTimeout(timer));
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("error", handleError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
    };
  }, []);

  return (
    <HelmetProvider>
      <div>
        <Main />
      </div>
    </HelmetProvider>
  );
}

export default App;
