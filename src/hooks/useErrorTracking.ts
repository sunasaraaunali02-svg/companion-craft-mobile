import { useEffect } from "react";

interface ErrorEvent {
  message: string;
  stack?: string;
  timestamp: Date;
  userAgent: string;
  url: string;
}

export const useErrorTracking = () => {
  useEffect(() => {
    // Global error handler
    const handleError = (event: ErrorEvent) => {
      const errorData: ErrorEvent = {
        message: event.message || "Unknown error",
        stack: (event as any).error?.stack,
        timestamp: new Date(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      };

      // Log to console in development
      if (process.env.NODE_ENV === "development") {
        console.error("Error tracked:", errorData);
      }

      // In production, this would send to an error tracking service
      // Example: Sentry, LogRocket, or custom endpoint
      // sendToErrorTrackingService(errorData);
    };

    // Global unhandled promise rejection handler
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const errorData: ErrorEvent = {
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        timestamp: new Date(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      };

      if (process.env.NODE_ENV === "development") {
        console.error("Unhandled rejection tracked:", errorData);
      }

      // sendToErrorTrackingService(errorData);
    };

    window.addEventListener("error", handleError as any);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleError as any);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, []);

  // Manual error tracking function
  const trackError = (error: Error, context?: Record<string, any>) => {
    const errorData = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      context,
    };

    if (process.env.NODE_ENV === "development") {
      console.error("Manual error tracked:", errorData);
    }

    // sendToErrorTrackingService(errorData);
  };

  return { trackError };
};
