import { Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Facilities from './components/Facilities';
import Trainers from './components/Trainers';
import MembershipPlans from './components/MembershipPlans';
// import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Payment from './components/Payment';
import SEO from './components/SEO';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingProvider } from './contexts/LoadingContext';
import { useMembershipStore } from './store/membershipStore';
import { Toaster } from 'react-hot-toast';
import { lazyLoad } from './utils/performanceHelpers';

// Lazy load contact form since it's at the bottom
const LazyContactEnhanced = lazyLoad(() => import('./components/ContactEnhanced'));

function App() {
  const selectedPlan = useMembershipStore((state) => state.selectedPlan);

  return (
    <ErrorBoundary>
      <LoadingProvider>
        <SEO page="home" />
        <div className="min-h-screen">
          {/* Skip navigation link for accessibility */}
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50 focus:z-50"
          >
            Skip to main content
          </a>
          
          <Navbar />
          
          <main id="main-content" role="main">
            <Hero />
            <About />
            <Facilities />
            <Trainers />
            <MembershipPlans />
            {/* <Testimonials /> */}
            <Suspense fallback={<div className="h-32 flex items-center justify-center">Loading contact form...</div>}>
              <LazyContactEnhanced />
            </Suspense>
          </main>
          
          <Footer />
          
          {selectedPlan && <Payment />}
          
          {/* Toast notifications */}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                style: {
                  background: '#10B981',
                },
              },
              error: {
                style: {
                  background: '#EF4444',
                },
              },
            }}
          />
        </div>
      </LoadingProvider>
    </ErrorBoundary>
  );
}

export default App;
