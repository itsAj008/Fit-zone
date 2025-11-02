import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'
import { performanceMonitor } from './utils/performanceHelpers'

// Start performance tracking
performanceMonitor.startTiming('app-initialization');

// Preload critical resources
const preloadCriticalResources = () => {
  // Preload hero image
  const heroImg = new Image();
  heroImg.src = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&q=80&auto=format';
  
  // Preload fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap';
  fontLink.as = 'style';
  document.head.appendChild(fontLink);
};

// Initialize preloading
preloadCriticalResources();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)

// End performance tracking after app loads
window.addEventListener('load', () => {
  performanceMonitor.endTiming('app-initialization');
  
  // Track total page load time
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  if (navigation) {
    console.log('Page Load Performance:', {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      totalTime: navigation.loadEventEnd - navigation.fetchStart
    });
  }
});
