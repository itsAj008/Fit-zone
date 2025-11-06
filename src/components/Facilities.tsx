import { motion } from 'framer-motion';
import { memo } from 'react';
import { useFacilities } from '../hooks/useContentfulQuery';
import { facilities as mockFacilities } from '../data/mockData';

const Facilities = memo(() => {
  // Use React Query hook to fetch facilities when component mounts
  const { data: cmsData, isLoading, error } = useFacilities();

  // Use CMS data with fallback to mock data
  const facilities = cmsData && cmsData.length > 0 ? cmsData : mockFacilities;

  // Show loading state
  if (isLoading) {
    return (
      <section id="facilities" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded mb-4 max-w-md mx-auto"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-8 max-w-2xl mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    console.error('Facilities CMS Error:', error);
  }
  
  return (
    <section id="facilities" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Our Facilities
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-normal">
            Everything you need to achieve your fitness goals under one roof
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {facilities.map((facility: any, index: number) => (
            <motion.div
              key={facility.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-[180px] sm:h-[240px] md:h-[280px] lg:h-[320px]"
            >
              {/* Background Image */}
              <img
                src={facility.backgroundImage}
                alt={facility.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onLoad={() => console.log('✅ Image loaded:', facility.name)}
                onError={() => console.error('❌ Image failed:', facility.name, facility.backgroundImage)}
              />
              
              {/* Simple dark overlay for text readability */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300"></div>
              
              {/* Text content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-base sm:text-lg font-bold mb-2">
                  {facility.name}
                </h3>
                <p className="text-sm opacity-90 line-clamp-2">
                  {facility.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

Facilities.displayName = 'Facilities';

export default Facilities;
