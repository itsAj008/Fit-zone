import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaDumbbell } from 'react-icons/fa';
import { smoothScrollTo } from '../utils/smoothScroll';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement> | React.TouchEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Prevent double execution
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    
    const sectionId = href.slice(1);
    
    // Close mobile menu immediately
    setIsOpen(false);
    
    // Update URL hash
    window.history.pushState(null, '', href);
    setActiveSection(sectionId);
    
    // Scroll to section (with delay to ensure menu closes and DOM is ready)
    setTimeout(() => {
      smoothScrollTo(sectionId);
      // Reset navigation flag after scroll completes
      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 300);
    }, 50);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home';
      setActiveSection(hash);
    };

    // Set initial active section
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Listen for scroll to detect section in view
    const handleScroll = () => {
      const sections = ['home', 'about', 'facilities', 'trainers', 'plans', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount

    // Handle initial hash on page load
    if (window.location.hash) {
      const hash = window.location.hash.slice(1);
      setTimeout(() => smoothScrollTo(hash), 100);
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/10 shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="relative">
              <FaDumbbell className="text-3xl text-transparent bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-clip-text" />
              <div className="absolute inset-0 blur-xl opacity-50">
                <FaDumbbell className="text-3xl text-indigo-500" />
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white via-indigo-100 to-purple-100 bg-clip-text text-transparent">
              FitZone
            </span>
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
                      ? 'text-transparent bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text font-semibold'
                      : 'text-gray-300 hover:text-white'
                  } transition-all duration-300 font-medium cursor-pointer touch-manipulation relative group`}
                >
                  {item.name}
                </a>
              );
            })}
            <motion.a
              href="#plans"
              onClick={(e) => handleNavClick(e, '#plans')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 cursor-pointer touch-manipulation font-semibold"
            >
              Join Now
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white text-2xl"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-dark border-t border-white/10"
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
                        ? 'text-transparent bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text font-semibold'
                        : 'text-gray-300 hover:text-white'
                    } transition-all duration-300 py-3 cursor-pointer touch-manipulation`}
                  >
                    {item.name}
                  </a>
                );
              })}
              <a
                href="#plans"
                onClick={(e) => handleNavClick(e, '#plans')}
                className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl text-center hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 cursor-pointer touch-manipulation font-semibold"
              >
                Join Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

