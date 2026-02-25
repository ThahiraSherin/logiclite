import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaChartLine, FaCode, FaUsers, FaArrowRight, FaGlobe, FaLightbulb, FaClock } from 'react-icons/fa';
import { loadSlim } from '@tsparticles/slim';
import Particles from '@tsparticles/react';
// import './AbSection.css';
// import "./Absection.css"; // Ensure this file exists with the necessary styles
import './AboutSection.css'; // Ensure this file exists with the necessary styles
import { Link } from 'react-router-dom';

const AboutSection = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const [isTouched, setIsTouched] = useState(false);

  const stats = [
    { value: "146+", label: "Projects", icon: <FaGlobe /> },
    { value: "100%", label: "Satisfaction", icon: <FaLightbulb /> },
    { value: "24/7", label: "Support", icon: <FaClock /> }
  ];

  const services = [
    {
      title: "Digital Marketing",
      description: "SEO, PPC, social media to drive visibility and growth.",
      icon: <FaChartLine className="service-icons" />
    },
    {
      title: "Web & Software Development",
      description: "Building clean, scalable digital products.",
      icon: <FaCode className="service-icons" />
    },
    {
      title: "Staff Augmentation",
      description: "Providing skilled IT professionals.",
      icon: <FaUsers className="service-icons" />
    }
  ];

  return (
    <section id="about" className="about-section">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false, zIndex: 0 },
          background: { color: "transparent" },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: { enable: true, mode: "push" },
              onHover: {
                enable: true,
                mode: "bubble",
                parallax: { enable: true, force: 60, smooth: 10 }
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 200,
                size: 15,
                duration: 2,
                opacity: 0.8,
                speed: 3
              },
              push: { quantity: 4 },
              repulse: { distance: 150, duration: 0.4 },
            },
          },
          particles: {
            color: { value: ["#3a7bd5", "#00d2ff", "#00c6ff"] },
            links: {
              color: "#3a7bd5",
              distance: 120,
              enable: true,
              opacity: 0.5,
              width: 1.5,
            },
            collisions: { enable: true },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "bounce" },
              random: true,
              speed: 1.5,
              straight: false,
              trail: {
                enable: true,
                length: 10,
                fillColor: "#3a7bd5"
              }
            },
            number: {
              density: { enable: true, area: 800 },
              value: 80,
            },
            opacity: { value: { min: 0.2, max: 0.5 } },
            shape: { 
              type: ["circle", "triangle", "star"],
              options: {
                star: {
                  sides: 5,
                  fill: true
                }
              }
            },
            size: { 
              value: { min: 2, max: 8 },
              animation: {
                enable: true,
                speed: 5,
                sync: false
              }
            },
            wobble: {
              enable: true,
              distance: 10,
              speed: 5
            }
          },
          detectRetina: true,
        }}
      />

      <div className="container">
        <div className="section-header text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="section-titles"
          >
            About <span className="highlight">LogicLite Solutions</span>
          </motion.h2>
          
          <motion.p
            className="section-subtitles"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Empowering businesses through innovative technology solutions
          </motion.p>
        </div>

        <div className="floating-cards">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              className="floating-card"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                rotate: Math.random() * 360,
                transition: {
                  duration: 20 + Math.random() * 20,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
            />
          ))}
        </div>

        <div className="row g-5 align-items-center">
          <div className="col-lg-6 visual-column">
            <motion.div 
              className="floating-logo"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              animate={{
                y: [0, 15, 0],
                rotate: [0, 5, -5, 0],
                transition: {
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 20px rgba(58, 123, 213, 0.7)",
                transition: { duration: 0.3 }
              }}
            >
              <span className="logo-text">LogicLite</span>
              <span className="logo-text">Solutions</span>
            </motion.div>

            <motion.div 
              className="company-cards"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.4 }
              }}
              animate={{
                x: [0, 50, 0, -50, 0],
                y: [0, 30, 0, -30, 0],
                rotate: [0, 10, 0, -10, 0],
                transition: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
              whileHover={{ 
                scale: window.innerWidth > 768 ? 1.03 : 1,
                boxShadow: "0 20px 50px -10px rgba(58, 123, 213, 0.4)",
                transition: { duration: 0.3 }
              }}
              drag={window.innerWidth > 768}
              dragConstraints={{
                top: -50,
                left: -50,
                right: 50,
                bottom: 50,
              }}
              dragTransition={{ bounceStiffness: 400, bounceDamping: 15 }}
              dragElastic={0.3}
            >
              <div className="card-header">
                <motion.div 
                  className="icon-wrapper"
                  onTouchStart={() => setIsTouched(true)}
                  onTouchEnd={() => setIsTouched(false)}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  whileTap={{ rotate: 360, scale: 1.1 }}
                  animate={isTouched ? { rotate: 360, scale: 1.1 } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <FaRocket className="rocket-icons" />
                </motion.div>
                <h3>LogicLite Solutions</h3>
                <p>Jaipur, India • Since 2023</p>
              </div>
              
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index} 
                    className="stat-item"
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    whileHover={{ 
                      scale: 1.05,
                      y: -5,
                      boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
                    }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div className="stat-icon">{stat.icon}</div>
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <svg className="connection-lines" viewBox="0 0 500 500" preserveAspectRatio="none">
              <motion.path
                d="M100,200 Q250,100 400,300"
                stroke="#3a7bd5"
                strokeWidth="2"
                fill="transparent"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <motion.path
                d="M150,350 Q250,250 350,150"
                stroke="#00d2ff"
                strokeWidth="2"
                fill="transparent"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
              />
            </svg>
          </div>

          <div className="col-lg-6 content-column">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.p
                className="content-paragraph"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                At LogicLite Solutions, we are passionate about empowering businesses through smart technology, creative marketing, and reliable talent support. Founded in 2023 and based in <strong>Jaipur, India</strong>, we are a growing IT services and consulting firm committed to delivering performance-driven solutions with a client-first approach.
              </motion.p>

              <Link to="/about" className="btn btn-primary mt-3 learn-more-btn">
                Learn More
              </Link>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <h3 className="services-title">We specialize in:</h3>
                <div className="services-list">
                  {services.map((service, index) => (
                    <motion.div 
                      key={index}
                      className="services-cards"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { delay: 0.7 + index * 0.1 }
                      }}
                      whileHover={{ 
                        y: -10,
                        boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
                        backgroundColor: "rgba(255,255,255,0.95)"
                      }}
                    >
                      <motion.div 
                        className="service-icon-container"
                        whileHover={{ rotate: 15, scale: 1.2 }}
                      >
                        {service.icon}
                      </motion.div>
                      <div className="service-contents">
                        <h4>{service.title}</h4>
                        <p>{service.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="content-paragraph highlight-paragraph"
              >
                With a focus on <span className="highlight-text">innovation</span>, <span className="highlight-text">speed</span>, and <span className="highlight-text">transparency</span>, our mission is to help brands grow faster, connect better, and scale smarter. Whether you're a startup or a growing enterprise, LogicLite Solutions is your partner in progress.
              </motion.p>
              
              <motion.div 
                className="cta-buttons"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <Link
                  to="/contact"
                  className="btn btn-primary"
                >
                  <motion.span
                    whileHover={{ 
                      x: 5,
                      transition: { duration: 0.3 }
                    }}
                    className="btn-content"
                  >
                    Contact Us <FaArrowRight className="btn-icon" />
                  </motion.span>
                </Link>
                <Link
                  to="/services"
                  className="btn btn-outline-primary"
                >
                  <motion.span
                    whileHover={{ 
                      x: 5,
                      transition: { duration: 0.3 }
                    }}
                    className="btn-content"
                  >
                    Our Services <FaArrowRight className="btn-icon" />
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;