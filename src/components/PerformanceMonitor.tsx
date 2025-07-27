import React, { useEffect } from 'react';

interface PerformanceMonitorProps {
  onMetrics?: (metrics: any) => void;
}

const PerformanceMonitor = ({ onMetrics }: PerformanceMonitorProps) => {
  useEffect(() => {
    // Monitor Core Web Vitals
    if ('web-vital' in window || 'PerformanceObserver' in window) {
      // First Contentful Paint (FCP)
      const observeFCP = () => {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.name === 'first-contentful-paint') {
              console.log('FCP:', entry.startTime);
              onMetrics?.({ type: 'FCP', value: entry.startTime });
            }
          });
        });
        observer.observe({ entryTypes: ['paint'] });
      };

      // Largest Contentful Paint (LCP)
      const observeLCP = () => {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            console.log('LCP:', entry.startTime);
            onMetrics?.({ type: 'LCP', value: entry.startTime });
          });
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      };

      // Cumulative Layout Shift (CLS)
      const observeCLS = () => {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          console.log('CLS:', clsValue);
          onMetrics?.({ type: 'CLS', value: clsValue });
        });
        observer.observe({ entryTypes: ['layout-shift'] });
      };

      // First Input Delay (FID)
      const observeFID = () => {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            console.log('FID:', entry.processingStart - entry.startTime);
            onMetrics?.({ type: 'FID', value: entry.processingStart - entry.startTime });
          });
        });
        observer.observe({ entryTypes: ['first-input'] });
      };

      // Time to Interactive (TTI)
      const measureTTI = () => {
        if (document.readyState === 'complete') {
          const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          const tti = navTiming.domInteractive - navTiming.fetchStart;
          console.log('TTI:', tti);
          onMetrics?.({ type: 'TTI', value: tti });
        }
      };

      // Initialize observers
      observeFCP();
      observeLCP();
      observeCLS();
      observeFID();
      
      // Measure TTI when page is loaded
      if (document.readyState === 'complete') {
        measureTTI();
      } else {
        window.addEventListener('load', measureTTI);
      }

      // Resource timing
      const logResourceTiming = () => {
        const resources = performance.getEntriesByType('resource');
        const slowResources = resources.filter((resource: any) => resource.duration > 1000);
        if (slowResources.length > 0) {
          console.warn('Slow loading resources:', slowResources);
          onMetrics?.({ type: 'SLOW_RESOURCES', value: slowResources.length });
        }
      };

      setTimeout(logResourceTiming, 2000);
    }

    // Monitor memory usage
    const monitorMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const memoryInfo = {
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit,
        };
        console.log('Memory usage:', memoryInfo);
        onMetrics?.({ type: 'MEMORY', value: memoryInfo });
      }
    };

    // Check memory every 30 seconds
    const memoryInterval = setInterval(monitorMemory, 30000);

    return () => {
      clearInterval(memoryInterval);
    };
  }, [onMetrics]);

  return null;
};

export default PerformanceMonitor;