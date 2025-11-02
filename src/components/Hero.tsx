import { motion, useScroll, useTransform } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';
import { useRef, memo, useEffect, useState } from 'react';
import { smoothScrollTo } from '../utils/smoothScroll';
import { useHeroContent } from '../hooks/useContentful';
import { heroContent } from '../data/mockData';

const Hero = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Use useScroll only after component is mounted to avoid hydration issues
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Get hero content from Contentful with proper fallback handling
  const { content: heroContentData, loading, error } = useHeroContent();
  
  // Use Contentful data if available, otherwise use mock data
  const heroData = heroContentData && Object.keys(heroContentData).length > 0 
    ? heroContentData 
    : heroContent;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.slice(1);
    smoothScrollTo(sectionId);
    window.history.pushState(null, '', href);
  };

  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 rounded mb-4"></div>
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="h-6 bg-gray-300 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.warn('Hero content error:', error);
  }

  if (!mounted) {
    return (
      <section
        ref={sectionRef}
        id="home"
        className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden"
      >
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-gray-900 leading-tight">
              {heroData.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 font-normal max-w-2xl mx-auto leading-relaxed">
              {heroData.subtitle}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden"
    >
      {/* Clean Background with subtle pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-white" />
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 container mx-auto px-4 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-bold mb-6 text-gray-900 leading-tight"
          >
            {heroData.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="text-xl md:text-2xl text-gray-600 mb-12 font-normal max-w-2xl mx-auto leading-relaxed"
          >
            {heroData.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="#plans"
              onClick={(e) => handleNavClick(e, '#plans')}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg"
            >
              {heroData.ctaButtonText}
            </motion.a>
            <motion.a
              href="#about"
              onClick={(e) => handleNavClick(e, '#about')}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="border-2 border-gray-300 text-gray-700 px-10 py-4 rounded-lg text-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
            >
              {heroData.secondaryButtonText}
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.a
          href="#about"
          onClick={(e) => handleNavClick(e, '#about')}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-gray-400 text-2xl cursor-pointer hover:text-gray-600 transition-colors"
        >
          <FaArrowDown />
        </motion.a>
      </motion.div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
