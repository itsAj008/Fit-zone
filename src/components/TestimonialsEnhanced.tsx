import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { testimonials } from '../data/mockData';

const TestimonialsEnhanced = memo(() => {
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
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
            Real stories from real people who transformed their lives at FitZone
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
              role="article"
              aria-labelledby={`testimonial-${testimonial.id}-name`}
            >
              <div className="flex items-center mb-4" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500 mr-1" aria-hidden="true" />
                ))}
              </div>
              
              <blockquote className="text-gray-600 mb-6 leading-relaxed">
                "{testimonial.comment}"
              </blockquote>
              
              <div className="flex items-center">
                {testimonial.image && (
                  <img
                    src={testimonial.image}
                    alt=""
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                    loading="lazy"
                  />
                )}
                <div>
                  <h3 
                    id={`testimonial-${testimonial.id}-name`}
                    className="font-semibold text-gray-900"
                  >
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500">{testimonial.plan} Member</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

TestimonialsEnhanced.displayName = 'TestimonialsEnhanced';

export default TestimonialsEnhanced;
