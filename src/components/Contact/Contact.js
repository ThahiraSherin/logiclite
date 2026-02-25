import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { MdOutlineSupportAgent } from 'react-icons/md';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import './Contact.css';
import contactImage from '../../assets/contact_side.jpeg';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const HERO_BACKGROUND_IMAGE = "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await fetch('https://logicallite-solutions-1.onrender.com/api/contact/submit/general', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        if (response.ok) {
          toast.success(result.message);
          setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
          setErrors({});
        } else {
          toast.error(result.message || 'Failed to send message.');
        }
      } catch (error) {
        console.error('Submission error:', error);
        toast.error('Network error. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast.error('Please fill in all required fields correctly.');
    }
  };

  return (
    <div className="contact-page">
      <Toaster position="top-center" reverseOrder={false} />
      
      <section 
        className="contact-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${HERO_BACKGROUND_IMAGE})`
        }}
      >
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get in<span className="gradient-text">Touch</span> 
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We'd love to hear from you. Contact us for inquiries, support, or partnership opportunities.
          </motion.p>
        </div>
      </section>

      <section className="contact-main-content">
        <div className="contact-grid">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="contact-form-container"
          >
            <h2>Send us a message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email*</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message*</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? 'error' : ''}
                />
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="contact-image-wrapper"
          >
            <img src={contactImage} alt="Contact Illustration" />
          </motion.div>
        </div>
      </section>

      <section className="contact-info-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="contact-info-container"
        >
          <h2>Contact Information</h2>
          <div className="info-grid">
            <div className="info-section">
              <div className="info-item">
                <MdOutlineSupportAgent />
                <div>
                  <h3>Customer Support</h3>
                  <p>Our team is here to answer your questions and help with any issues.</p>
                </div>
              </div>
              <div className="info-item">
                <FaPhone />
                <div>
                  <h4>Phone</h4>
                  <a href="tel:+919352072936">+91 9352072936</a>
                </div>
              </div>
              <div className="info-item">
                <FaEnvelope />
                <div>
                  <h4>Email</h4>
                  <a href="mailto:info@logiclitesolutions.in">info@logiclitesolutions.in</a>
                </div>
              </div>
            </div>
            <div className="info-section">
              <div className="info-item">
                <div>
                  <h4>Business Hours</h4>
                  <ul>
                    <li>Monday - Saturday: 9:30 AM - 6:30 PM</li>
                    <li>Sunday: Closed</li>
                  </ul>
                </div>
              </div>
              <div className="info-item">
                <FaMapMarkerAlt />
                <div>
                  <h4>Office</h4>
                  <p>43, Pashupathinath Nagar<br />Jaipur, Rajasthan 302031</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="contact-map-section">
        <div className="map-container">
          <iframe
            title="LogicLite Solutions Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.9485123924734!2d75.7946153749729!3d26.868725961626017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db421d09e743d%3A0xa69d51f7d526e06b!2s43%2C%20Pashupatinath%20Nagar%2C%20Brahmpuri%2C%20Jaipur%2C%20Rajasthan%20302031!5e0!3m2!1sen!2sin!4v1718525044436!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
};

export default Contact;