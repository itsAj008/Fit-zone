import { motion } from 'framer-motion';
import { memo } from 'react';
import { useFacilities } from '../hooks/useContentful';
import { facilities as mockFacilities } from '../data/mockData';

const Facilities = memo(() => {
  // Get facilities from Contentful or use mock data
  const { facilities: contentfulFacilities } = useFacilities();
  const facilities = contentfulFacilities.length > 0 ? contentfulFacilities : mockFacilities;
  return (
    <section id="facilities" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Our Facilities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-normal">
            Everything you need to achieve your fitness goals under one roof
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300"
            >
              <div className="text-5xl mb-4">{facility.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {facility.name}
              </h3>
              <p className="text-gray-600">{facility.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

Facilities.displayName = 'Facilities';

export default Facilities;