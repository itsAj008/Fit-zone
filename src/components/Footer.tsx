import { memo } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaDumbbell } from 'react-icons/fa';

const Footer = memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaDumbbell className="text-red-600 text-2xl" />
              <span className="text-2xl font-bold">Tc fitness</span>
            </div>
            <p className="text-gray-400 mb-4">
              Transform your body, transform your life. Join us on your fitness journey today.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                aria-label="Facebook"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                aria-label="Twitter"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-red-600 transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-red-600 transition-colors duration-200">
                  About
                </a>
              </li>
              <li>
                <a href="#facilities" className="text-gray-400 hover:text-red-600 transition-colors duration-200">
                  Facilities
                </a>
              </li>
              <li>
                <a href="#trainers" className="text-gray-400 hover:text-red-600 transition-colors duration-200">
                  Trainers
                </a>
              </li>
            </ul>
          </div>

          {/* Membership */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Membership</h3>
            <ul className="space-y-2">
              <li>
                <a href="#plans" className="text-gray-400 hover:text-red-600 transition-colors duration-200">
                  Plans & Pricing
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-red-600 transition-colors duration-200">
                  Contact Us
                </a>
              </li>
              {/* <li>
                <a href="#" className="text-gray-400 hover:text-red-600 transition-colors duration-200">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-600 transition-colors duration-200">
                  Terms & Conditions
                </a>
              </li> */}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Jaga Jyothi, Old LIC Building,</li>
              <li>Bangalore - Honnavar Hwy, Tarikere,</li>
              <li>Karnataka 577228</li> 
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Tc fitness. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;

