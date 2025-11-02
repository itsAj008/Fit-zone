import { Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingProvider } from './contexts/LoadingContext';
import { useMembershipStore } from './store/membershipStore';
import { Toaster } from 'react-hot-toast';
import { testContentfulConnection, testSpecificContentTypes } from './utils/contentfulTest';

function App() {
  const selectedPlan = useMembershipStore((state) => state.selectedPlan);

  const handleTestContentful = async () => {
    console.clear();
    console.log('🧪 Starting Contentful Tests...');
    await testContentfulConnection();
    await testSpecificContentTypes();
  };

  return (
    <ErrorBoundary>
      <LoadingProvider>
        <div className="min-h-screen">
          {/* Development Debug Panel */}
          {import.meta.env.DEV && (
            <div className="fixed top-4 right-4 z-50 bg-red-500 text-white p-2 rounded shadow-lg">
              <button 
                onClick={handleTestContentful}
                className="text-xs bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
              >
                🔍 Test CMS
              </button>
            </div>
          )}
          
          <Navbar />
          
          <main id="main-content" role="main">
            <Hero />
            <div className="py-20 bg-gray-50 text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                🎉 Components Loading Successfully!
              </h2>
              <p className="text-xl text-gray-600">
                Hero and Navbar are working. Let's add more components step by step.
              </p>
            </div>
          </main>
          
          {/* Toast notifications */}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </div>
      </LoadingProvider>
    </ErrorBoundary>
  );
}

export default App;
