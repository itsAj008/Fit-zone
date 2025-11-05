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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white dark:bg-gray-700 p-8 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-400 transition-all duration-300"
            >
              <div className="text-5xl mb-4">{facility.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {facility.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{facility.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

Facilities.displayName = 'Facilities';

export default Facilities;