import { motion } from 'framer-motion';
import { FaHeart, FaUsers, FaTrophy, FaStar } from 'react-icons/fa';

const About = () => {
  const stats = [
    { icon: FaUsers, value: '500+', label: 'Active Members' },
    { icon: FaTrophy, value: '10+', label: 'Years Experience' },
    { icon: FaHeart, value: '98%', label: 'Satisfaction Rate' },
    { icon: FaStar, value: '4.7', label: 'Google Ratings' },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About FitZone
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're not just a gym, we're a community dedicated to helping you
            achieve your fitness goals with world-class facilities and expert
            trainers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800"
              alt="Gym interior"
              className="rounded-lg shadow-2xl"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-gray-900">
              Your Journey to Fitness Starts Here
            </h3>
            <p className="text-gray-600 leading-relaxed">
              At FitZone, we believe that fitness is a journey, not a
              destination. Our state-of-the-art facility is equipped with the
              latest equipment and staffed by certified trainers who are
              passionate about helping you succeed.
            </p>
            <p className="text-gray-600 leading-relaxed">
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
                <li key={index} className="flex items-center text-gray-700">
                  <span className="text-red-600 mr-3">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center p-6 bg-gray-50 rounded-lg"
            >
              <stat.icon className="text-4xl text-red-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;

