import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaUsers, FaTrophy, FaHeart, FaStar } from 'react-icons/fa';
import { optimizeImage } from '../utils/performanceHelpers';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const stats = [
    { icon: FaUsers, value: '500+', label: 'Active Members' },
    { icon: FaTrophy, value: '10+', label: 'Years Experience' },
    { icon: FaHeart, value: '98%', label: 'Satisfaction Rate' },
    { icon: FaStar, value: '4.7', label: 'Google Rating' },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            About FitZone
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-normal">
            We're not just a gym, we're a community dedicated to helping you
            achieve your fitness goals with world-class facilities and expert
            trainers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src={optimizeImage("https://images.unsplash.com/photo-1534438327276-14e5300c3a48", 800, 600, 80)}
              alt="Gym interior"
              className="rounded-2xl shadow-lg"
              loading="lazy"
              width="800"
              height="600"
            />
            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-xl shadow-xl">
              <div className="text-3xl font-bold">10+</div>
              <div className="text-sm">Years Experience</div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
              Your Journey to Fitness Starts Here
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              At FitZone, we believe that fitness is a journey, not a
              destination. Our state-of-the-art facility is equipped with the
              latest equipment and staffed by certified trainers who are
              passionate about helping you succeed.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              Whether you're a beginner or an experienced athlete, we have
              programs tailored to your needs. Join our community and discover
              the difference that personalized attention and expert guidance can
              make.
            </p>
            <ul className="space-y-3">
              {[
                'Certified personal trainers',
                'Custom workout plans',
                'Nutrition guidance',
                'Flexible membership options',
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="flex items-center text-gray-700 font-medium"
                >
                  <span className="text-green-500 mr-3 text-xl font-bold">✓</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Stats */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center p-8 bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-blue-200 transition-all duration-300"
            >
              <stat.icon className="text-4xl text-blue-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
