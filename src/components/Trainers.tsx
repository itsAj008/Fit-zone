import { motion } from 'framer-motion';
import { memo } from 'react';
import { useTrainers } from '../hooks/useContentfulQuery';
import { trainers as mockTrainers } from '../data/mockData';
import { FaStar } from 'react-icons/fa';
import { optimizeImage } from '../utils/performanceHelpers';

const Trainers = memo(() => {
  // Use React Query hook to fetch trainers when component mounts
  const { data: cmsData, isLoading, error } = useTrainers();

  // Use CMS data with fallback to mock data
  const trainers = cmsData && cmsData.length > 0 ? cmsData : mockTrainers;

  // Show loading state
  if (isLoading) {
    return (
      <section id="trainers" className="py-20 bg-white dark:bg-gray-900">
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
    console.error('Trainers CMS Error:', error);
  }
  return (
    <section id="trainers" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Meet Our Trainers
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-normal">
            Expert trainers dedicated to helping you reach your fitness goals
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer: any, index: number) => {
            // Handle both CMS and mock data structure
            const trainerImage = typeof trainer.image === 'string' ? trainer.image : trainer.image?.fields?.file?.url || '/api/placeholder/400/300';
            const trainerExperience = `${trainer.experience} years`;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-400 transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={optimizeImage(trainerImage, 400, 300, 80)}
                    alt={trainer.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width="400"
                    height="300"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">{trainer.name}</h3>
                    <p className="text-sm text-gray-200">
                      {trainer.specialization}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <FaStar className="text-yellow-500 mr-1" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {trainerExperience}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Specialized in {trainer.specialization.toLowerCase()} with
                    proven track record of success.
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

Trainers.displayName = 'Trainers';

export default Trainers;

