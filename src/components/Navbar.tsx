import { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaDumbbell } from 'react-icons/fa';
import { smoothScrollTo } from '../utils/smoothScroll';
import DarkModeToggle from './DarkModeToggle';

const Navbar = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Facilities', href: '#facilities' },
    { name: 'Trainers', href: '#trainers' },
    { name: 'Plans', href: '#plans' },
    { name: 'Contact', href: '#contact' },
  ];

  // Track if we're handling a navigation to prevent double execution
  const isNavigatingRef = useRef(false);

  // Handle navigation click with smooth scroll
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement> | React.TouchEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
  
    if (isNavigatingRef.current) return;
    
    const sectionId = href.slice(1);
    
    // Immediately update active section for instant visual feedback
    setActiveSection(sectionId);
    setIsOpen(false);
    window.history.pushState(null, '', href);
    
    // Set navigation flag to prevent scroll listener interference
    isNavigatingRef.current = true;
  
    // Smooth scroll and resume tracking after complete
    smoothScrollTo(sectionId, () => {
      // Reduced delay to match faster scroll animation
      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 50); // Reduced from 100ms to 50ms
    });
  };
  

  useEffect(() => {
    let scrollTimeout: number;
    
    // Handle scroll effect with throttling
    const handleScroll = () => {
      // Don't update active section during navigation animation
      if (isNavigatingRef.current) return;
    
      setScrolled(window.scrollY > 20);
      
      // Throttle the active section updates to reduce interference
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        if (isNavigatingRef.current) return; // Double-check before updating
        
        const sections = ['home', 'about', 'facilities', 'trainers', 'plans', 'contact'];
        const scrollPosition = window.scrollY + 150; // Increased threshold for better detection
      
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = document.getElementById(sections[i]);
          if (section && section.offsetTop <= scrollPosition) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }, 50); // 50ms throttle
    };
    

    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home';
      setActiveSection(hash);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    handleScroll(); // Check on mount

    // Handle initial hash on page load
    if (window.location.hash) {
      const hash = window.location.hash.slice(1);
      setTimeout(() => smoothScrollTo(hash), 100);
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout); // Clean up timeout
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md'
          : 'bg-white dark:bg-gray-900'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-3"
          >
            <FaDumbbell className="text-blue-600 text-2xl" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">Tc fitness</span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const sectionId = item.href.slice(1);
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`${
                    isActive
                      ? 'text-blue-600 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  } transition-colors duration-200 font-medium cursor-pointer touch-manipulation relative group`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600"
                      initial={false}
                      transition={{ 
                        type: "spring", 
                        stiffness: 500, 
                        damping: 35,
                        mass: 0.8
                      }}
                    />
                  )}
                </a>
              );
            })}
            <motion.a
              href="#plans"
              onClick={(e) => handleNavClick(e, '#plans')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-200 cursor-pointer touch-manipulation font-semibold shadow-sm hover:shadow-md"
            >
              Join Now
            </motion.a>
            <DarkModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <DarkModeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 text-2xl"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navItems.map((item) => {
                const sectionId = item.href.slice(1);
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`block ${
                      isActive
                        ? 'text-blue-600 font-semibold'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    } transition-all duration-300 py-3 cursor-pointer touch-manipulation border-b border-gray-100 dark:border-gray-700 last:border-0`}
                  >
                    {item.name}
                  </a>
                );
              })}
              <a
                href="#plans"
                onClick={(e) => handleNavClick(e, '#plans')}
                className="block bg-blue-600 text-white px-6 py-3 rounded-lg text-center hover:bg-blue-700 transition-all duration-200 cursor-pointer touch-manipulation font-semibold"
              >
                Join Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
