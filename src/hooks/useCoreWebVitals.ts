import { useEffect } from 'react';

// Core Web Vitals tracking hook for performance optimization
export const useCoreWebVitals = () => {
  useEffect(() => {
    // Import web-vitals dynamically to avoid blocking
    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
      // Largest Contentful Paint (LCP) - should be < 2.5s
      onLCP((metric) => {
        console.log('LCP:', metric);
        // Report to analytics
        if (window.gtag) {
          window.gtag('event', 'LCP', {
            event_category: 'Web Vitals',
            value: Math.round(metric.value)
          });
        }
      });

      // Note: FID is deprecated in favor of INP

      // Interaction to Next Paint (INP) - should be < 200ms
      onINP((metric) => {
        console.log('INP:', metric);
        if (window.gtag) {
          window.gtag('event', 'INP', {
            event_category: 'Web Vitals',
            value: Math.round(metric.value)
          });
        }
      });

      // Cumulative Layout Shift (CLS) - should be < 0.1
      onCLS((metric) => {
        console.log('CLS:', metric);
        if (window.gtag) {
          window.gtag('event', 'CLS', {
            event_category: 'Web Vitals',
            value: Math.round(metric.value * 1000) / 1000
          });
        }
      });

      // First Contentful Paint (FCP) - should be < 1.8s
      onFCP((metric) => {
        console.log('FCP:', metric);
        if (window.gtag) {
          window.gtag('event', 'FCP', {
            event_category: 'Web Vitals',
            value: Math.round(metric.value)
          });
        }
      });

      // Time to First Byte (TTFB) - should be < 800ms
      onTTFB((metric) => {
        console.log('TTFB:', metric);
        if (window.gtag) {
          window.gtag('event', 'TTFB', {
            event_category: 'Web Vitals',
            value: Math.round(metric.value)
          });
        }
      });
    });
  }, []);
};

// Preload critical resources
export const preloadCriticalResources = () => {
  useEffect(() => {
    // Preload critical API endpoints
    const criticalEndpoints = [
      'https://api.exchangerate-api.com/v4/latest/USD',
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
    ];

    criticalEndpoints.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'fetch';
      link.href = url;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Preload critical fonts
    const criticalFonts = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
    ];

    criticalFonts.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = url;
      document.head.appendChild(link);
    });
  }, []);
};

// Performance monitoring
export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Monitor resource loading times
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          console.log('Navigation timing:', {
            domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
            loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
            firstByte: navEntry.responseStart - navEntry.requestStart
          });
        }
      });
    });

    observer.observe({ entryTypes: ['navigation', 'resource'] });

    return () => observer.disconnect();
  }, []);
};

// Add global type for gtag
declare global {
  interface Window {
    gtag?: (command: string, action: string, parameters?: any) => void;
  }
}