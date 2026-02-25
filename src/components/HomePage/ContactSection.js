import React, { useState } from 'react';
import './ContactSection.css';
import { Modal } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiMapPin, FiPhone, FiMail, FiCheckCircle } from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import ServiceSelect from './ServiceSelect';
import toast, { Toaster } from 'react-hot-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '',
    email: '', 
    service: '',
    message: '' 
  });
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFocus = (fieldName) => {
    setActiveField(fieldName);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.service || !formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://logicallite-solutions-1.onrender.com/api/contact/submit/project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (response.ok) {
        toast.success(result.message);
        setFormData({ name: '', phone: '', email: '', service: '', message: '' });
        setShowModal(true);
      } else {
        toast.error(result.message || 'Failed to submit inquiry.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => setShowModal(false);

  return (
    <section id="contact" className="contact-section">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="gradient-background"></div>
      <div className="particles">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              y: [0, -100],
              x: [0, Math.random() * 100 - 50]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
      <div className="container">
        <motion.div 
          className="contact-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="contact-grid">
            <div className="form-container">
              <motion.h2 
                className="section-titles"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Let's Connect
              </motion.h2>
              <motion.p 
                className="section-subtitles"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Have a project in mind or want to discuss opportunities? 
                Fill out the form and we'll get back to you within 24 hours.
              </motion.p>
              <form onSubmit={handleSubmit} className="contact-forms">
                <div className="form-groups">
                  <label className={`form-label ${activeField === 'name' || formData.name ? 'active' : ''}`}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    required
                  />
                  <div className="input-highlight"></div>
                </div>
                <div className="form-row">
                  <div className="form-groups">
                    <label className={`form-label ${activeField === 'email' || formData.email ? 'active' : ''}`}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-input"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      required
                    />
                    <div className="input-highlight"></div>
                  </div>
                  <div className="form-groups">
                    <label className={`form-label ${activeField === 'phone' || formData.phone ? 'active' : ''}`}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="form-input"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => handleFocus('phone')}
                      onBlur={handleBlur}
                      required
                    />
                    <div className="input-highlight"></div>
                  </div>
                </div>
                <ServiceSelect formData={formData} setFormData={setFormData} />
                <div className="form-groups">
                  <label className={`form-label ${activeField === 'message' || formData.message ? 'active' : ''}`}>
                    Your Message
                  </label>
                  <textarea
                    className="form-textarea"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={handleBlur}
                    required
                  />
                  <div className="input-highlight"></div>
                </div>
                <motion.button 
                  type="submit" 
                  className="submit-btns"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="spinner"></span>
                  ) : (
                    <>
                      Send Message <FiSend className="icon" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
            <div className="info-container">
              <div className="info-contents">
                <h3 className="info-title">Contact Information</h3>
                <div className="info-items">
                  <div className="info-icon">
                    <FiMail />
                  </div>
                  <div>
                    <h4>Email Us</h4>
                    <a href="mailto:info@logiclitesolutions.in">info@logiclitesolutions.in</a>
                  </div>
                </div>
                <div className="info-items">
                  <div className="info-icon">
                    <FiPhone />
                  </div>
                  <div>
                    <h4>Call Us</h4>
                    <a href="tel:+919352072936">+91 9352072936</a>
                  </div>
                </div>
                <div className="info-items">
                  <div className="info-icon">
                    <FiMapPin />
                  </div>
                  <div>
                    <h4>Visit Us</h4>
                    <p>43, Pashupathinath Nagar, Jaipur, Rajasthan 302031</p>
                  </div>
                </div>
                <div className="social-links">
                  <motion.a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                  >
                    <FaFacebookF />
                  </motion.a>
                  <motion.a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                  >
                    <FaTwitter />
                  </motion.a>
                  <motion.a 
                    href="https://www.linkedin.com/company/logiclite-solutions/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                  >
                    <FaLinkedinIn />
                  </motion.a>
                  <motion.a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                  >
                    <FaInstagram />
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {showModal && (
          <Modal 
            show={showModal} 
            onHide={handleClose} 
            centered
            className="success-modal"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <Modal.Body className="modal-body">
                <div className="success-icon">
                  <FiCheckCircle />
                </div>
                <h3>Message Sent!</h3>
                <p>We've received your inquiry and will respond within 24 hours.</p>
                <button 
                  onClick={handleClose}
                  className="modal-close-btn"
                >
                  Dismiss
                </button>
              </Modal.Body>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContactSection;