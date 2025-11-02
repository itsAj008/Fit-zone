import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaDumbbell } from 'react-icons/fa';
import { smoothScrollTo } from '../utils/smoothScroll';

const Navbar = () => {
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
    isNavigatingRef.current = true;
  
    const sectionId = href.slice(1);
    setActiveSection(sectionId); // 👈 underline moves instantly
    setIsOpen(false);
    window.history.pushState(null, '', href);
  
    // Smooth scroll and resume tracking after complete
    smoothScrollTo(sectionId, () => {
      isNavigatingRef.current = false;
    });
  };
  

  useEffect(() => {
    // Handle scroll effect
    const handleScroll = () => {
      if (isNavigatingRef.current) return; // 👈 pause updates during animation
    
      setScrolled(window.scrollY > 20);
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
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-white'
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
            <span className="text-2xl font-bold text-gray-900">Tc fitness</span>
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
                      : 'text-gray-700 hover:text-blue-600'
                  } transition-colors duration-200 font-medium cursor-pointer touch-manipulation relative group`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
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
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 text-2xl"
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
            className="md:hidden bg-white border-t border-gray-200"
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
                        : 'text-gray-700 hover:text-blue-600'
                    } transition-all duration-300 py-3 cursor-pointer touch-manipulation border-b border-gray-100 last:border-0`}
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
};

export default Navbar;
