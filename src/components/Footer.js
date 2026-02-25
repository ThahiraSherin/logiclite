// src/components/Footer.js
import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import './Footer.css';
import logo from '../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-col">
            <div className="footer-logo-container">
              <img src={logo} alt="LogicLite Solutions" className="footer-logo" />
            </div>
            <p className="footer-text">
              Transforming businesses with innovative digital solutions and cutting-edge technology.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaTwitter />
              </a>
              <a href="https://www.linkedin.com/company/logiclite-solutions/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaLinkedinIn />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/contact">Our Team</a></li>
              <li><a href="/careers">We're Hiring</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/blog">Blog</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h3 className="footer-heading">Services</h3>
            <ul className="footer-links">
              <li><a href="/services">Digital Marketing</a></li>
              <li><a href="/services">Web & App Development</a></li>
              <li><a href="/services">Staff Augmentation</a></li>
              <li><a href="/services">Tax & Compliance</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-col">
            <h3 className="footer-heading">Contact Us</h3>
            <div className="contact-info">
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <span>43, Pashupathinath Nagar,<br />Jaipur, Rajasthan 302031</span>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <a href="tel:+919352072936">+91 9352072936</a>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <a href="mailto:info@logiclitesolutions.in">info@logiclitesolutions.in</a>
              </div>
            </div>
          </div>
        </div>

        <div className="copyright">
          <p>
            &copy; {currentYear} LogicLite Solutions - All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;