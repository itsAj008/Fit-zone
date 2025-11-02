/**
 * Example usage of Performance Helpers in FitZone Gym Landing Page
 * This file demonstrates how to use the performance utilities
 */

import { lazyLoad, optimizeImage, debounce, throttle, performanceMonitor } from '../utils/performanceHelpers';

// ========================================
// 1. LAZY LOADING COMPONENTS
// ========================================

// Lazy load heavy components that are not immediately visible
export const LazyTestimonials = lazyLoad(() => 
  import('../components/TestimonialsEnhanced')
);

// export const LazyPricingCalculator = lazyLoad(() => 
//   import('../components/PricingCalculator')
// );

// export const LazyGallery = lazyLoad(() => 
//   import('../components/Gallery')
// );

// ========================================
// 2. IMAGE OPTIMIZATION
// ========================================

// Optimize trainer profile images
export const getOptimizedTrainerImage = (originalSrc: string) => {
  return optimizeImage(originalSrc, 400, 400, 80);
};

// Optimize hero background images
export const getOptimizedHeroImage = (originalSrc: string) => {
  return optimizeImage(originalSrc, 1920, 1080, 75);
};

// Optimize facility images for cards
export const getOptimizedFacilityImage = (originalSrc: string) => {
  return optimizeImage(originalSrc, 600, 400, 80);
};

// ========================================
// 3. PERFORMANCE MONITORING
// ========================================

// Monitor contact form submission performance
export const trackContactFormSubmission = async (formData: any) => {
  performanceMonitor.startTiming('contact-form-submission');
  
  try {
    // Your form submission logic here
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
    
    performanceMonitor.endTiming('contact-form-submission');
    return response;
  } catch (error) {
    performanceMonitor.endTiming('contact-form-submission');
    throw error;
  }
};

// Monitor page navigation performance
export const trackPageNavigation = (sectionId: string) => {
  performanceMonitor.startTiming(`navigation-to-${sectionId}`);
  
  // Your smooth scroll logic here
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    
    // End timing when scroll completes
    setTimeout(() => {
      performanceMonitor.endTiming(`navigation-to-${sectionId}`);
    }, 500);
  }
};

// ========================================
// 4. DEBOUNCED SEARCH FUNCTIONALITY
// ========================================

// Debounced search for trainers or classes
export const createDebouncedSearch = () => {
  return debounce((searchTerm: string) => {
    console.log('Searching for:', searchTerm);
    // Your search logic here
    // This will only execute 300ms after the user stops typing
  }, 300);
};

// Usage example:
// const debouncedSearch = createDebouncedSearch();
// debouncedSearch('personal training'); // Will only search after 300ms delay

// ========================================
// 5. THROTTLED SCROLL HANDLER
// ========================================

// Throttled scroll handler for navbar transparency effect
export const createThrottledScrollHandler = () => {
  return throttle(() => {
    const scrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
      if (scrollY > 100) {
        navbar.classList.add('bg-opacity-95');
      } else {
        navbar.classList.remove('bg-opacity-95');
      }
    }
  }, 16); // ~60fps
};

// Usage example:
// const throttledScrollHandler = createThrottledScrollHandler();
// window.addEventListener('scroll', throttledScrollHandler);

// ========================================
// 6. PERFORMANCE MONITORING SETUP
// ========================================

// Initialize performance monitoring for the gym app
export const initializePerformanceMonitoring = () => {
  // Track initial page load
  performanceMonitor.startTiming('page-load');
  
  window.addEventListener('load', () => {
    performanceMonitor.endTiming('page-load');
    
    // Log memory usage every 30 seconds in development
    if (import.meta.env.DEV) {
      setInterval(() => {
        performanceMonitor.measureRender('memory-check', () => {
          if ('memory' in performance) {
            const memory = (performance as any).memory;
            console.log('Memory Usage:', {
              used: `${(memory.usedJSHeapSize / 1048576).toFixed(2)}MB`,
              total: `${(memory.totalJSHeapSize / 1048576).toFixed(2)}MB`
            });
          }
        });
      }, 30000);
    }
  });
};

// ========================================
// 7. COMPONENT PERFORMANCE TRACKING
// ========================================

// Example of tracking component render performance
export const trackComponentPerformance = (componentName: string) => {
  return {
    onMount: () => performanceMonitor.startTiming(`${componentName}-mount`),
    onUnmount: () => performanceMonitor.endTiming(`${componentName}-mount`),
    onRender: () => performanceMonitor.startTiming(`${componentName}-render`),
    onRenderComplete: () => performanceMonitor.endTiming(`${componentName}-render`)
  };
};

// ========================================
// 8. USAGE IN REACT COMPONENTS
// ========================================

/*
// Example usage in a React component:

import { useEffect } from 'react';
import { trackComponentPerformance } from './performanceExamples';

const MyComponent = () => {
  const perf = trackComponentPerformance('MyComponent');
  
  useEffect(() => {
    perf.onMount();
    return perf.onUnmount;
  }, []);
  
  useEffect(() => {
    perf.onRender();
    perf.onRenderComplete();
  });
  
  return <div>My Component</div>;
};
*/

// ========================================
// 9. PERFORMANCE BUDGETS
// ========================================

export const PERFORMANCE_BUDGETS = {
  // Maximum acceptable loading times (in ms)
  PAGE_LOAD: 3000,
  COMPONENT_MOUNT: 100,
  FORM_SUBMISSION: 2000,
  IMAGE_LOAD: 1500,
  
  // Memory usage thresholds (in MB)
  MEMORY_WARNING: 50,
  MEMORY_CRITICAL: 100
};

// Check if performance meets budget
export const checkPerformanceBudget = (metric: string, value: number) => {
  const budget = PERFORMANCE_BUDGETS[metric as keyof typeof PERFORMANCE_BUDGETS];
  
  if (budget && value > budget) {
    console.warn(`Performance budget exceeded for ${metric}: ${value}ms (budget: ${budget}ms)`);
    return false;
  }
  
  return true;
};

export default {
  LazyTestimonials,
//   LazyPricingCalculator,
//   LazyGallery,
  getOptimizedTrainerImage,
  getOptimizedHeroImage,
  getOptimizedFacilityImage,
  trackContactFormSubmission,
  trackPageNavigation,
  createDebouncedSearch,
  createThrottledScrollHandler,
  initializePerformanceMonitoring,
  trackComponentPerformance,
  checkPerformanceBudget,
  PERFORMANCE_BUDGETS
};
