import { lazy, Suspense, useRef, useEffect, createElement } from 'react';
import type { ComponentType, ReactElement } from 'react';

/**
 * Performance utilities for the FitZone gym landing page
 * Includes lazy loading, performance monitoring, and optimization tools
 */

// Lazy loading utility with error boundary
/**
 * Creates a lazy-loaded component with Suspense wrapper
 * @param componentImport - Dynamic import function for the component
 * @param fallback - Optional fallback component to show while loading
 * @returns Lazy-loaded component with Suspense wrapper
 * 
 * @example
 * const LazyTestimonials = lazyLoad(() => import('./Testimonials'));
 */
export const lazyLoad = <T extends Record<string, any>>(
  componentImport: () => Promise<{ default: ComponentType<T> }>,
  fallback?: ComponentType
) => {
  const LazyComponent = lazy(componentImport);
  
  return (props: T): ReactElement => {
    const fallbackElement = fallback ? createElement(fallback) : createElement('div', { 
      className: 'animate-pulse bg-gray-200 rounded h-48 w-full',
      'aria-label': 'Loading content...'
    });
    
    return createElement(
      Suspense,
      { fallback: fallbackElement },
      createElement(LazyComponent, props)
    );
  };
};

// Image optimization utility
/**
 * Optimizes image URLs with size and quality parameters
 * Currently supports Unsplash images
 * @param src - Original image source URL
 * @param width - Desired width in pixels
 * @param height - Desired height in pixels
 * @param quality - Image quality (1-100, default: 75)
 * @returns Optimized image URL
 * 
 * @example
 * const optimizedSrc = optimizeImage(
 *   'https://images.unsplash.com/photo-123',
 *   800, 600, 80
 * );
 */
export const optimizeImage = (src: string, width?: number, height?: number, quality = 75) => {
  // For Unsplash images, we can add optimization parameters
  if (src.includes('unsplash.com')) {
    const params = new URLSearchParams();
    if (width) params.append('w', width.toString());
    if (height) params.append('h', height.toString());
    params.append('q', quality.toString());
    params.append('auto', 'format');
    
    return src.includes('?') ? `${src}&${params}` : `${src}?${params}`;
  }
  
  return src;
};

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit
) => {
  const targetRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      callback(entry);
    }, options);
    
    observer.observe(target);
    
    return () => {
      observer.unobserve(target);
    };
  }, [callback, options]);
  
  return targetRef;
};

// Performance monitoring utility
export const performanceMonitor = {
  startTiming: (label: string) => {
    performance.mark(`${label}-start`);
  },
  
  endTiming: (label: string) => {
    performance.mark(`${label}-end`);
    performance.measure(label, `${label}-start`, `${label}-end`);
    
    const measure = performance.getEntriesByName(label)[0];
    console.log(`${label}: ${measure.duration.toFixed(2)}ms`);
    
    // Clean up marks
    performance.clearMarks(`${label}-start`);
    performance.clearMarks(`${label}-end`);
    performance.clearMeasures(label);
  },
  
  measureRender: (componentName: string, renderFn: () => void) => {
    performanceMonitor.startTiming(`${componentName}-render`);
    renderFn();
    performanceMonitor.endTiming(`${componentName}-render`);
  }
};

// Bundle size analyzer (development only)
export const analyzeBundleSize = () => {
  if (import.meta.env.DEV) {
    const scripts = Array.from(document.scripts);
    let totalSize = 0;
    
    scripts.forEach(script => {
      if (script.src) {
        fetch(script.src)
          .then(response => response.blob())
          .then(blob => {
            totalSize += blob.size;
            console.log(`Script ${script.src}: ${(blob.size / 1024).toFixed(2)}KB`);
          })
          .catch(() => {
            // Ignore CORS errors for external scripts
          });
      }
    });
    
    setTimeout(() => {
      console.log(`Total bundle size: ${(totalSize / 1024).toFixed(2)}KB`);
    }, 1000);
  }
};

// Memory usage monitoring
export const monitorMemoryUsage = () => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    console.log('Memory Usage:', {
      used: `${(memory.usedJSHeapSize / 1048576).toFixed(2)}MB`,
      total: `${(memory.totalJSHeapSize / 1048576).toFixed(2)}MB`,
      limit: `${(memory.jsHeapSizeLimit / 1048576).toFixed(2)}MB`
    });
  }
};

// Debounce utility for performance optimization
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility for performance optimization
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Image lazy loading with intersection observer
export const createImageLazyLoader = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;
          if (src) {
            img.src = src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    return {
      observe: (img: HTMLImageElement) => imageObserver.observe(img),
      disconnect: () => imageObserver.disconnect()
    };
  }
  
  return null;
};

// Preload critical resources
export const preloadResource = (href: string, as: string, type?: string) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  
  document.head.appendChild(link);
  
  return () => {
    if (link.parentNode) {
      link.parentNode.removeChild(link);
    }
  };
};

// Measure component render performance
export const withPerformanceTracking = <P extends Record<string, any>>(
  Component: ComponentType<P>,
  componentName: string
) => {
  return (props: P): ReactElement => {
    useEffect(() => {
      performanceMonitor.startTiming(`${componentName}-mount`);
      return () => {
        performanceMonitor.endTiming(`${componentName}-mount`);
      };
    }, []);

    return createElement(Component, props);
  };
};

// Web Vitals tracking
export const trackWebVitals = () => {
  // This would typically use the web-vitals library
  // For now, we'll use basic performance API
  
  window.addEventListener('load', () => {
    // Largest Contentful Paint
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    });
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
    
    // First Input Delay
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        // Cast to any to access processingStart property
        const eventEntry = entry as any;
        if (eventEntry.processingStart) {
          console.log('FID:', eventEntry.processingStart - entry.startTime);
        }
      });
    }).observe({ entryTypes: ['first-input'] });
  });
};
