import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
}

export const useAnalytics = () => {
  const location = useLocation();

  // Track page views
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  const trackPageView = (path: string) => {
    if (process.env.NODE_ENV === "development") {
      console.log("Page view tracked:", path);
    }

    // In production, send to analytics service
    // Example: Google Analytics, Mixpanel, or custom endpoint
    // gtag('config', 'GA_MEASUREMENT_ID', {
    //   page_path: path
    // });
  };

  const trackEvent = ({ name, properties }: AnalyticsEvent) => {
    if (process.env.NODE_ENV === "development") {
      console.log("Event tracked:", name, properties);
    }

    // In production, send to analytics service
    // gtag('event', name, properties);
  };

  // Predefined tracking functions for common events
  const trackPracticeStart = (topic: string) => {
    trackEvent({
      name: "practice_started",
      properties: { topic },
    });
  };

  const trackPracticeComplete = (topic: string, accuracy: number, duration: number) => {
    trackEvent({
      name: "practice_completed",
      properties: { topic, accuracy, duration },
    });
  };

  const trackConversationStart = (topic: string, difficulty: string) => {
    trackEvent({
      name: "conversation_started",
      properties: { topic, difficulty },
    });
  };

  const trackConversationComplete = (messageCount: number, duration: number) => {
    trackEvent({
      name: "conversation_completed",
      properties: { messageCount, duration },
    });
  };

  const trackFeatureUsed = (feature: string) => {
    trackEvent({
      name: "feature_used",
      properties: { feature },
    });
  };

  const trackUpgradeClick = () => {
    trackEvent({
      name: "upgrade_clicked",
      properties: {},
    });
  };

  return {
    trackEvent,
    trackPracticeStart,
    trackPracticeComplete,
    trackConversationStart,
    trackConversationComplete,
    trackFeatureUsed,
    trackUpgradeClick,
  };
};
