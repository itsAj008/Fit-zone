import { motion, useScroll, useTransform } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';
import { useRef, memo, useEffect, useState } from 'react';
import { smoothScrollTo } from '../utils/smoothScroll';
import { heroContent } from '../data/mockData';
import { useHeroContent } from '../hooks/useContentfulQuery';

const Hero = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  
  // Use React Query hook to fetch hero content when component mounts
  const { data: cmsData, isLoading, error } = useHeroContent();
  
  useEffect(() => {
    setMounted(true);
    
    // Log the CMS data for debugging
    console.log('🎯 Hero CMS data:', cmsData);
    console.log('⚡ Loading state:', isLoading);
    if (error) console.error('❌ CMS Error:', error);
  }, [cmsData, isLoading, error]);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Use CMS data if available, fallback to mock data
  const heroData = {
    title: cmsData?.title || heroContent.title,
    subtitle: cmsData?.subtitle || heroContent.subtitle,
    description: cmsData?.description || heroContent.description,
    ctaButtonText: cmsData?.ctaButtonText || heroContent.ctaButtonText,
    secondaryButtonText: cmsData?.secondaryButtonText || heroContent.secondaryButtonText
  };
   
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.slice(1);
    smoothScrollTo(sectionId);
    window.history.pushState(null, '', href);
  };

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
      className="relative min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 overflow-hidden"
    >
      {/* Clean Background with subtle pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-b from-blue-50/50 via-white to-white dark:from-gray-800/50 dark:via-gray-900 dark:to-gray-900" />
        {/* Grid pattern - more visible in both light and dark mode */}
        <div 
          className="absolute inset-0 opacity-[0.08] dark:opacity-0"
          style={{
            backgroundImage: 'linear-gradient(to right, rgb(0 0 0 / 0.8) 1px, transparent 1px), linear-gradient(to bottom, rgb(0 0 0 / 0.8) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
        {/* Alternative grid for dark mode */}
        <div 
          className="absolute inset-0 opacity-0 dark:opacity-[0.2] transition-opacity duration-300"
          style={{
            backgroundImage: 'linear-gradient(to right, rgb(255 255 255 / 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
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
            className="text-6xl md:text-8xl font-bold mb-6 text-gray-900 dark:text-white leading-tight"
          >
            {heroData.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 font-normal max-w-2xl mx-auto leading-relaxed"
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
              className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-10 py-4 rounded-lg text-lg font-semibold hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 cursor-pointer"
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
