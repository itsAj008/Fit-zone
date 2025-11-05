import { motion } from 'framer-motion';
import { memo } from 'react';
import { useTestimonials } from '../hooks/useContentfulQuery';
import { testimonials as mockTestimonials } from '../data/mockData';
import { FaStar } from 'react-icons/fa';

const Testimonials = memo(() => {
  // Use React Query hook to fetch testimonials when component mounts
  const { data: cmsData, isLoading, error } = useTestimonials();

  // Use CMS data with fallback to mock data
  const testimonials = cmsData && cmsData.length > 0 ? cmsData : mockTestimonials;

  // Show loading state
  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 rounded mb-4 max-w-md mx-auto"></div>
            <div className="h-6 bg-gray-300 rounded mb-8 max-w-2xl mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    console.error('Testimonials CMS Error:', error);
  }
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Members Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real members who transformed their lives
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "{testimonial.comment}"
              </p>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-500">{testimonial.plan} Member</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

Testimonials.displayName = 'Testimonials';

export default Testimonials;

