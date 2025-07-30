import { useEffect } from 'react';

const CoreWebVitals = () => {
  useEffect(() => {
    // Core Web Vitals monitoring (simplified without external dependencies)
    const measurePerformance = () => {
      if ('performance' in window) {
        // Monitor LCP
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            console.log('Performance metric:', entry.name, entry.startTime);
          });
        });
        
        if ('observe' in observer) {
          observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
        }
      }
    };

    // Layout shift prevention
    const preventLayoutShift = () => {
      // Add explicit dimensions to images without them
      const images = document.querySelectorAll('img:not([width]):not([height])');
      images.forEach(img => {
        const htmlImg = img as HTMLImageElement;
        if (htmlImg.naturalWidth && htmlImg.naturalHeight) {
          htmlImg.width = htmlImg.naturalWidth;
          htmlImg.height = htmlImg.naturalHeight;
        }
      });

      // Reserve space for dynamic content
      const dynamicContainers = document.querySelectorAll('[data-dynamic-content]');
      dynamicContainers.forEach(container => {
        const htmlContainer = container as HTMLElement;
        if (!htmlContainer.style.minHeight) {
          htmlContainer.style.minHeight = '200px';
        }
      });
    };

    // Initialize optimizations
    measurePerformance();
    preventLayoutShift();
    
    const mutationObserver = new MutationObserver(preventLayoutShift);
    mutationObserver.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['src', 'width', 'height']
    });

    return () => {
      mutationObserver.disconnect();
    };
  }, []);

  return null;
};

export default CoreWebVitals;