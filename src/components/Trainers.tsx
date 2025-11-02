import { motion } from 'framer-motion';
import { memo } from 'react';
import { useTrainers } from '../hooks/useContentful';
import { trainers as mockTrainers } from '../data/mockData';
import { FaStar } from 'react-icons/fa';
import { optimizeImage } from '../utils/performanceHelpers';

const Trainers = memo(() => {
  // Get trainers from Contentful or use mock data
  const { trainers: contentfulTrainers } = useTrainers();
  const trainers = contentfulTrainers.length > 0 ? contentfulTrainers : mockTrainers;
  return (
    <section id="trainers" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Meet Our Trainers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-normal">
            Expert trainers dedicated to helping you reach your fitness goals
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer, index) => {
            // Handle both mock data and CMS data structures
            const trainerImage = typeof trainer.image === 'string' 
              ? trainer.image 
              : trainer.image?.fields?.file?.url 
              ? `https:${trainer.image.fields.file.url}`
              : 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400';
            
            const trainerExperience = typeof trainer.experience === 'string' 
              ? trainer.experience 
              : `${trainer.experience} years`;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all duration-300"
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
                    <span className="text-gray-700 font-medium">
                      {trainerExperience}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
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

