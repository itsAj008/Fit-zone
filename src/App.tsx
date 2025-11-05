import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Facilities from './components/Facilities';
import Trainers from './components/Trainers';
import MembershipPlans from './components/MembershipPlans';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingProvider } from './contexts/LoadingContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from 'react-hot-toast';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <ThemeProvider>
          <LoadingProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Navbar />
            
            <main id="main-content" role="main">
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 dark:border-red-400"></div>
                </div>
              }>
                <Hero />
                <About />
                <Facilities />
                <Trainers />
                <MembershipPlans />
                <Contact />
              </Suspense>
            </main>
          
          <Footer />
          
          {/* Toast notifications */}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--toast-bg)',
                color: 'var(--toast-color)',
              },
              className: 'dark:bg-gray-800 dark:text-white bg-white text-gray-900',
            }}
          />
        </div>
      </LoadingProvider>
        </ThemeProvider>
    </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
