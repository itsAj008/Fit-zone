import { motion, useInView } from 'framer-motion';
import { useRef, memo } from 'react';
import { optimizeImage } from '../utils/performanceHelpers';
import { useAboutContent } from "../hooks/useContentfulQuery";
import { aboutContent } from '../data/mockData';

const About = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Use React Query hook to fetch about content when component mounts
  const { data: cmsData } = useAboutContent();

  // Use CMS data with field-level fallbacks to mock data
  const aboutData = {
    title: cmsData?.title || aboutContent.title,
    subtitle: cmsData?.subtitle || aboutContent.subtitle,
    description: cmsData?.description || aboutContent.description,
    stats: cmsData?.stats || aboutContent.stats
  };

  // Normalize stats data structure (CMS uses 'number', mock data uses 'value')
  const stats = aboutData.stats.map((stat: any, index: number) => ({
    icon: stat.icon || aboutContent.stats[index % aboutContent.stats.length].icon,
    value: stat.value || stat.number, // Handle both CMS (number) and mock data (value)
    label: stat.label
  }));

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            {aboutData.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-normal">
            {aboutData.subtitle}
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
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Your Journey to Fitness Starts Here
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              {aboutData.description}
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
                  className="flex items-center text-gray-700 dark:text-gray-300 font-medium"
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
              className="text-center p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-400 transition-all duration-300"
            >
              <stat.icon className="text-4xl text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;
