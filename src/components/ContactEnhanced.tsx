import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { LoadingButton } from '../contexts/LoadingContext';
import { 
  AppErrorHandler, 
  validateEmail, 
  validatePhone, 
  validateName, 
  validateMessage,
  retryOperation 
} from '../utils/errorHandler';
import { 
  addErrorToInput, 
  removeErrorFromInput, 
  announceToScreenReader 
} from '../utils/accessibilityHelpers';

const ContactEnhanced = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [retryCount, setRetryCount] = useState(0);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    const nameError = validateName(formData.name);
    if (nameError) errors.name = nameError;
    
    const emailError = validateEmail(formData.email);
    if (emailError) errors.email = emailError;
    
    const phoneError = validatePhone(formData.phone);
    if (phoneError) errors.phone = phoneError;
    
    const messageError = validateMessage(formData.message);
    if (messageError) errors.message = messageError;
    
    setValidationErrors(errors);
    
    // Update accessibility attributes
    Object.keys(errors).forEach(field => {
      addErrorToInput(`contact-${field}`, errors[field]);
    });
    
    // Remove errors for valid fields
    Object.keys(formData).forEach(field => {
      if (!errors[field]) {
        removeErrorFromInput(`contact-${field}`);
      }
    });
    
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      announceToScreenReader('Please correct the form errors and try again.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await retryOperation(async () => {
        // Simulate form submission
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            if (Math.random() > 0.8 && retryCount < 2) {
              reject(new Error('Network timeout'));
            } else {
              resolve(true);
            }
          }, 1000);
        });
      }, 3, 1000);

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setValidationErrors({});
      setRetryCount(0);
      
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      announceToScreenReader('Your message has been sent successfully. We will get back to you soon.');
      
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      const appError = AppErrorHandler.handleNetworkError(error);
      const userMessage = AppErrorHandler.getUserFriendlyMessage(appError);
      
      setSubmitStatus('error');
      setRetryCount(prev => prev + 1);
      
      toast.error(userMessage);
      announceToScreenReader(`Error: ${userMessage}`);
      
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
      removeErrorFromInput(`contact-${name}`);
    }
  };

  const handleRetry = () => {
    setSubmitStatus('idle');
    setRetryCount(0);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 p-3 rounded-lg" aria-hidden="true">
                    <FaMapMarkerAlt className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                    <address className="text-gray-600 not-italic">
                      Jaga Jyothi, Old LIC Building,<br />
                      Bangalore - Honnavar Hwy, Tarikere,<br />
                      Karnataka 577228
                    </address>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 p-3 rounded-lg" aria-hidden="true">
                    <FaPhone className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                    <a 
                      href="tel:+15551234567" 
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                      aria-label="Call us at +1 (555) 123-4567"
                    >
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 p-3 rounded-lg" aria-hidden="true">
                    <FaEnvelope className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <a 
                      href="mailto:info@fitzone.com" 
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                      aria-label="Email us at info@fitzone.com"
                    >
                      info@fitzone.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="pt-8 border-t">
              <h4 className="font-semibold text-gray-900 mb-4">Quick Contact</h4>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="https://wa.me/15551234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  aria-label="Contact us on WhatsApp"
                >
                  <FaWhatsapp className="text-xl" aria-hidden="true" />
                  <span>WhatsApp</span>
                </motion.a>
                <motion.a
                  href="tel:+15551234567"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Call us now"
                >
                  <FaPhone aria-hidden="true" />
                  <span>Call Now</span>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <fieldset disabled={isSubmitting}>
                <legend className="sr-only">Contact Form</legend>
                
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Name <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-invalid={validationErrors.name ? 'true' : 'false'}
                    aria-describedby={validationErrors.name ? 'contact-name-error' : undefined}
                    className={`w-full px-4 py-3 border rounded-lg outline-none transition-all ${
                      validationErrors.name
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                    }`}
                    placeholder="Your full name"
                  />
                  {validationErrors.name && (
                    <div
                      id="contact-name-error"
                      className="text-red-600 text-sm mt-1"
                      role="alert"
                      aria-live="polite"
                    >
                      {validationErrors.name}
                    </div>
                  )}
                </div>
                
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-invalid={validationErrors.email ? 'true' : 'false'}
                    aria-describedby={validationErrors.email ? 'contact-email-error' : undefined}
                    className={`w-full px-4 py-3 border rounded-lg outline-none transition-all ${
                      validationErrors.email
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {validationErrors.email && (
                    <div
                      id="contact-email-error"
                      className="text-red-600 text-sm mt-1"
                      role="alert"
                      aria-live="polite"
                    >
                      {validationErrors.email}
                    </div>
                  )}
                </div>
                
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-invalid={validationErrors.phone ? 'true' : 'false'}
                    aria-describedby={validationErrors.phone ? 'contact-phone-error' : undefined}
                    className={`w-full px-4 py-3 border rounded-lg outline-none transition-all ${
                      validationErrors.phone
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                    }`}
                    placeholder="Your phone number"
                  />
                  {validationErrors.phone && (
                    <div
                      id="contact-phone-error"
                      className="text-red-600 text-sm mt-1"
                      role="alert"
                      aria-live="polite"
                    >
                      {validationErrors.phone}
                    </div>
                  )}
                </div>
                
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-invalid={validationErrors.message ? 'true' : 'false'}
                    aria-describedby={validationErrors.message ? 'contact-message-error' : undefined}
                    rows={5}
                    className={`w-full px-4 py-3 border rounded-lg outline-none transition-all resize-vertical ${
                      validationErrors.message
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                    }`}
                    placeholder="Tell us about your fitness goals or any questions you have..."
                  />
                  {validationErrors.message && (
                    <div
                      id="contact-message-error"
                      className="text-red-600 text-sm mt-1"
                      role="alert"
                      aria-live="polite"
                    >
                      {validationErrors.message}
                    </div>
                  )}
                </div>
              </fieldset>

              {/* Form Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 border border-green-200 rounded-lg"
                  role="alert"
                  aria-live="polite"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-green-800 font-medium">
                      Message sent successfully! We'll get back to you soon.
                    </span>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border border-red-200 rounded-lg"
                  role="alert"
                  aria-live="polite"
                >
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <span className="text-red-800 font-medium">
                        Failed to send message. Please try again.
                      </span>
                      {retryCount > 0 && (
                        <p className="text-red-700 text-sm mt-1">
                          Attempt {retryCount + 1} of 3. We'll keep trying...
                        </p>
                      )}
                      <button
                        type="button"
                        onClick={handleRetry}
                        className="text-red-700 underline text-sm mt-1 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 rounded"
                      >
                        Try again
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              <LoadingButton
                type="submit"
                isLoading={isSubmitting}
                loadingText="Sending message..."
                className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                aria-describedby="submit-button-description"
              >
                Send Message
              </LoadingButton>
              
              <p id="submit-button-description" className="text-sm text-gray-500 text-center">
                We'll respond within 24 hours during business days.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactEnhanced;
