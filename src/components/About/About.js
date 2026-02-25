import React, { useEffect, useState, useRef } from "react";
import { motion,  useInView, useScroll, useTransform } from "framer-motion";
import {
  FaBullhorn, FaBalanceScale, FaCode, FaUserTie,
  FaUsers, FaRocket, FaLightbulb, FaGlobe,
  FaChevronRight, FaLinkedin, FaEnvelope, 
 FaChartLine, FaHandshake, FaRegLightbulb
} from "react-icons/fa";
import { GiSpinningBlades } from "react-icons/gi";
import "bootstrap/dist/css/bootstrap.min.css";
import "./About.css";


import abhiImg from '../../assets/Team/abhi.jpg';
import nishImg from '../../assets/Team/nish.jpg';
import raulImg from '../../assets/Team/rahul.jpg';

const GRADIENT = "linear-gradient(135deg, #4b6cb7 0%, #182848 100%)";
const LIGHT_GRADIENT = "linear-gradient(135deg, #8993be 0%, #58698c 100%)";

// Enhanced Framer Motion animation variants
const fadeIn = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 0.77, 0.47, 0.97]
    },
  },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardHover = {
  hover: {
    y: -10,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  }
};

// Custom hook for count-up animation with spring physics
function useCountUp(target, durationMs = 1400) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView || !target || target <= 0) return;
    
    const startTimestamp = performance.now();
    const step = (timestamp) => {
      const progress = Math.min((timestamp - startTimestamp) / durationMs, 1);
      const easedProgress = 0.5 * (1 - Math.cos(Math.PI * progress)); // Smooth easing
      const currentValue = Math.floor(easedProgress * target);
      
      setValue(currentValue);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
    
    return () => cancelAnimationFrame(step);
  }, [target, durationMs, isInView]);

  return { value, ref };
}

// Enhanced Testimonial Carousel with 3D tilt effect  

// Enhanced Floating background shapes with more dynamic movement
function FloatingShapes() {
  return (
    <>
      <motion.div
        className="floating-shape shape-1"
        initial={{ y: 0, x: 0 }}
        animate={{ 
          y: [0, 40, 0],
          x: [0, 20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="floating-shape shape-2"
        initial={{ y: 0, x: 0 }}
        animate={{ 
          y: [0, -30, 0],
          x: [0, -15, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      <motion.div
        className="floating-shape shape-3"
        initial={{ y: 0, x: 0 }}
        animate={{ 
          y: [0, 50, 0],
          x: [0, -25, 0],
          rotate: [0, 15, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div
        className="floating-shape shape-4"
        initial={{ y: 0, x: 0 }}
        animate={{ 
          y: [0, -20, 0],
          x: [0, 15, 0],
          rotate: [0, -8, 0]
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />
    </>
  );
}

// Particle background for hero section
function ParticleBackground() {
  const particles = Array.from({ length: 20 });
  
  return (
    <div className="particle-container">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="particle"
          initial={{ 
            y: Math.random() * 100 - 50,
            x: Math.random() * 100 - 50,
            opacity: 0
          }}
          animate={{ 
            y: [0, Math.random() * 100 - 50],
            x: [0, Math.random() * 100 - 50],
            opacity: [0, 0.4, 0],
            transition: {
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5
            }
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            borderRadius: `${Math.random() * 50}%`
          }}
        />
      ))}
    </div>
  );
}

// Main About component with enhanced animations
export default function About() {
  const { value: clients, ref: clientsRef } = useCountUp(85);
  const { value: projects, ref: projectsRef } = useCountUp(142);
  const { value: retention, ref: retentionRef } = useCountUp(95);

  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredMemberIndex, setHoveredMemberIndex] = useState(null);

  // Parallax scroll effects
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const coreValues = [
    {
      icon: <FaUsers />,
      title: "Customer Focus",
      description: "We prioritize understanding your business needs to deliver personalized, impactful solutions that help you achieve your goals."
    },
    {
      icon: <FaLightbulb />,
      title: "Innovation & Excellence",
      description: "We embrace cutting-edge technologies and innovative strategies to deliver high-quality digital marketing, web development, and staffing services that set you apart."
    },
    {
      icon: <FaHandshake />,
      title: "Integrity & Transparency",
      description: "Honesty and open communication form the foundation of all our client relationships, ensuring trust and accountability."
    },
    {
      icon: <FaRocket />,
      title: "Agility & Responsiveness",
      description: "Our flexible approach allows us to quickly adapt to changing market trends and client requirements for timely, effective solutions."
    },
    {
      icon: <FaChartLine />,
      title: "Accountability & Results-Driven",
      description: "We take full responsibility for our work and focus on delivering measurable outcomes that drive your business growth."
    },
    {
      icon: <FaGlobe />,
      title: "Collaboration & Partnership",
      description: "We work closely with you as a dedicated partner, fostering teamwork and shared success in every project."
    }
  ];

  const services = [
    
    {
      icon: <FaBullhorn />,
      title: "Digital Marketing ",
      description: "Connect with your audience and grow your brand across popular social platforms like Facebook, Instagram, and LinkedIn. We create engaging campaigns and manage your community to build brand loyalty.",
      link: "/services/social-media"
    },
    
    {
      icon: <FaCode />,
      title: "Web & Software Development",
      description: "Create a powerful digital presence with websites and applications built for performance. We design and develop responsive, secure, and visually appealing corporate websites, e-commerce platforms, and custom web applications.",
      link: "/services/web-development"
    },
    {
      icon: <FaUserTie />,
      title: "Staff Augmentation & IT Recruitment",
      description: "Scale your team seamlessly with the right professionals at your fingertips. We provide businesses with dedicated IT staff and flexible hiring models to meet changing business demands efficiently.",
      link: "/services/staffing"
    },{
      icon: <FaBalanceScale />,
      title: "Tax & Compliance Solutions",
      description: "We take care of your business's paperwork. This includes GST and Income Tax filings, as well as other important tasks like business compliance management and filings with the ROC & MCA. We also handle TDS, PF, and ESI paperwork to keep your company running smoothly.",
      link: "/services/tax-compliance"
    }
  ];

 const team = [
  {
    name: "Abhishek sharma",
    role: "Head of marketing",
    img: abhiImg,
    bio: "Leading marketing with vision, creativity, and measurable impact."  
  },
  {
    name: "Rahul Sharma",
    role: "Operations Head",
    img: raulImg,
    bio: "Oversees project execution and ensures seamless service delivery."
  },
  {
    name: "Nisha Lavaniya",
    role: "Lead Developer",
    img: nishImg,
    bio: "Expert in creating scalable web applications with modern technologies."
  },
];
 

  return (
    <div className="about-root">
      <FloatingShapes />

      {/* Hero Section with enhanced animations */}
      <header
        className="about-hero"
        style={{
          backgroundImage:
            "linear-gradient(rgba(8,10,20,0.85), rgba(8,10,20,0.65)), url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1600&q=80')",
        }}
        role="banner"
        ref={heroRef}
      >
        <ParticleBackground />
        
        <motion.div
          className="hero-inner"
          initial={{ opacity: 0, y: 40 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 0.77, 0.47, 0.97] }}
        >
          
          
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Transforming Businesses Through <span className="gradient-text">Digital Excellence</span>
          </motion.h1>
          
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            At Logiclite Solutions, we combine strategic thinking with technical expertise to deliver measurable results.
            Founded in 2023, we've quickly become a trusted partner for businesses seeking to enhance their digital presence.
          </motion.p>
          
          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.a
              href="/services"
              className="btn-ctas"
              style={{ background: GRADIENT }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(75, 108, 183, 0.6)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Explore Services <FaChevronRight style={{ marginLeft: 8 }} />
            </motion.a>
            <motion.a
              href="#contact"  
              className="btn-ctas outline"
              aria-label="Contact us"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Get Free Consultation
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-shape"
          aria-hidden
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={isHeroInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ delay: 0.8, duration: 1.2 }}
        />
        <motion.div
          className="hero-shape-2"
          aria-hidden
          initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
          animate={isHeroInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ delay: 0.9, duration: 1.2 }}
        />
        
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={isHeroInView ? {
            opacity: 1,
            y: [0, 15, 0]
          } : {}}
          transition={{
            delay: 1.2,
            y: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
        </motion.div>
      </header>

      {/* Animated wave divider */}
      <motion.div
        className="wave-divider"
        dangerouslySetInnerHTML={{
          __html:
            `<svg viewBox="0 0 1200 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M0,64 C300,120 900,0 1200,64 L1200,0 L0,0 Z" fill="#f5f8fc"></path></svg>`
        }}
        initial={{ opacity: 0 }}
        animate={isHeroInView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
      />

      <main>
        {/* Stats Bar Section with enhanced animations */}
        <section className="stats-bar">
          <div className="container">
            <motion.div 
              className="stats-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.3
                  }
                }
              }}
            >
              <motion.div
                className="stat-box"
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <div className="stat-number" ref={clientsRef}>{clients}+</div>
                <div className="stat-label">Satisfied Clients</div>
              </motion.div>
              <motion.div
                className="stat-box"
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
              >
                <div className="stat-number" ref={projectsRef}>{projects}+</div>
                <div className="stat-label">Successful Projects</div>
              </motion.div>
              <motion.div
                className="stat-box"
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              >
                <div className="stat-number" ref={retentionRef}>{retention}%</div>
                <div className="stat-label">Client Retention</div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Mission Section with parallax effect */}
        <motion.section 
          className="section mission-section"
          style={{ y: parallaxY }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <motion.h2
                  className="section-title center"
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  Our Mission
                </motion.h2>
                <motion.p
                  className="lead"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  To fuel your business growth by delivering innovative, customized digital solutions that truly make a difference. We're passionate about helping you:
                </motion.p>
                <motion.ul
                  className="mission-list"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4, staggerChildren: 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  {["Boost your online presence and visibility", "Attract and engage your target audience", "Convert visitors into loyal customers", "Scale operations with the right talent"].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
              <div className="col-lg-6">
                <motion.div
                  className="mission-image"
                  initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzaW5lc3MlMjBtZWV0aW5nfGVufDB8fDB8fHww"
                    alt="Team meeting"
                    className="img-fluid rounded-lg"
                  />
                  <motion.div 
                    className="mission-badge"
                    whileHover={{ scale: 1.05 }}
                  >
                    <FaHandshake className="mr-2" /> Partnering for Success
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Core Values Section with interactive cards */}
       {/* Core Values Section with enhanced premium design */}
{/* Ultra-Premium Core Values Section */}
<section className="section bg-soft">
  <div className="container">
    <motion.div
      className="text-center mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      
      <motion.h2
        className="section-title-premium center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        Our Core Values
      </motion.h2>
      <motion.p
        className="text-center mb-5 section-subtitle-premium"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        The foundational principles that drive our success and yours
      </motion.p>
    </motion.div>
    
    <div className="row justify-content-center">
      {coreValues.map((value, index) => (
        <motion.div
          key={index}
          className="col-md-6 col-lg-4 mb-5"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
          viewport={{ once: true, margin: "-100px" }}
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <motion.div
            className="ultra-premium-card"
            variants={cardHover}
            animate={hoveredCard === index ? "hover" : "initial"}
            whileHover="hover"
          >
            {/* Card background elements */}
            <div className="card-bg-pattern"></div>
            <div className="card-glow-effect"></div>
            
            {/* Top decoration */}
            <div className="card-top-decoration">
              <div className="decoration-line"></div>
              <div className="decoration-dot"></div>
              <div className="decoration-line"></div>
            </div>
            
            {/* Main content */}
            <div className="card-content-wrapper">
              <div className="card-header-ultra">
                <motion.div
                  className="ultra-icon-container"
                  animate={{
                    rotate: hoveredCard === index ? 5 : 0,
                    scale: hoveredCard === index ? 1.1 : 1
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="icon-bg-orb"></div>
                  <div className="icon-bg-shape"></div>
                  <div className="ultra-value-icon">
                    {value.icon}
                  </div>
                </motion.div>
                
                <div className="ultra-badges">
                  <div className="ultra-badge premium-mark">
                    <span>Premium</span>
                    <div className="badge-glow"></div>
                  </div>
                  <div className="ultra-badge featured-mark">
                    <span>Featured</span>
                  </div>
                </div>
              </div>
              
              <h5 className="ultra-card-title">{value.title}</h5>
              <p className="ultra-card-description">{value.description}</p>
              
              <div className="ultra-card-footer">
                <div className="value-meta">
                  <div className="meta-item">
                    <div className="meta-icon">✓</div>
                    <span>Core Principle</span>
                  </div>
                  <div className="meta-item">
                    <div className="meta-icon">◉</div>
                    <span>Essential</span>
                  </div>
                </div>
                
                <div className="value-rating">
                  <div className="stars-container">
                    <div className="star"><span>★</span></div>
                    <div className="star"><span>★</span></div>
                    <div className="star"><span>★</span></div>
                    <div className="star"><span>★</span></div>
                    <div className="star"><span>★</span></div>
                  </div>
                  <span className="rating-value">5.0</span>
                </div>
              </div>
            </div>
            
            {/* Hover effects */}
            <div className="card-hover-shine"></div>
            <div className="card-edge-glow"></div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

        {/* Services Section unified */}
       <section id="services" className="section services-section-premium">
  <div className="container">
    <div className="section-header-center">
      <motion.span
        className="section-badge"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        Our Expertise
      </motion.span>
      <motion.h2
        className="section-title center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        Premium Services
      </motion.h2>
      <motion.p
        className="section-subtitle"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        Comprehensive digital solutions meticulously crafted for your business success
      </motion.p>
    </div>
    
    <motion.div 
      className="services-grid"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
    >
      {services.map((service, index) => (
        <motion.div
          key={index}
          className="service-item"
          variants={fadeIn}
        >
          <motion.a
            href={service.link}
            className="service-card-premium"
            whileHover="hover"
            variants={{
              hover: {
                y: -15,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 15
                }
              }
            }}
          >
            <div className="card-edge"></div>
            <div className="service-card-inner">
              <div className="service-icon-container">
                <div className="icon-bg-effect"></div>
                <div className="service-icon-wrapper">
                  {service.icon}
                </div>
              </div>
              
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
              
              <div className="service-cta">
                <span className="cta-text">Explore Service</span>
                <div className="cta-arrow">
                  <FaChevronRight />
                </div>
              </div>
            </div>
            
            <div className="card-hover-effect"></div>
          </motion.a>
        </motion.div>
      ))}
    </motion.div>
    
    <motion.div 
      className="services-cta-container"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <p className="cta-texts">Have a specific project in mind?</p>
      <motion.a
        href="contact"
        className="cta-button"
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 10px 25px rgba(75, 108, 183, 0.4)"
        }}
        whileTap={{ scale: 0.95 }}
      >
        <span>Discuss Your Project</span>
        <FaChevronRight />
      </motion.a>
    </motion.div>
  </div>
</section>

        {/* Team Section with 3D tilt effect */}
        <section className="section">
          <div className="container">
            <motion.h2
              className="section-title center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Meet Our Team
            </motion.h2>
            <motion.p
              className="text-center mb-5 muted"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              The passionate professionals behind your success
            </motion.p>
            <motion.div className="row"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
            >
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  className="col-md-6 col-lg-4 mb-4"
                  variants={fadeIn}
                  onMouseEnter={() => setHoveredMemberIndex(index)}
                  onMouseLeave={() => setHoveredMemberIndex(null)}
                >
                  <motion.div
                    className="team-card"
                    animate={{
                      rotateX: hoveredMemberIndex === index ? -15 : 0,
                      rotateY: hoveredMemberIndex === index ? 15 : 0,
                      transition: { type: "spring", stiffness: 300, damping: 15 }
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                      transformPerspective: 1000
                    }}
                  >
                    <div className="team-image">
                      <motion.img 
                        src={member.img} 
                        alt={member.name}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="team-content">
                      <h5>{member.name}</h5>
                      <p className="team-role">{member.role}</p>
                      <p className="small muted">{member.bio}</p>
                      <div className="team-social">
                        <motion.a 
                          href="#" 
                          whileHover={{ y: -3, color: '#4b6cb7' }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <FaLinkedin />
                        </motion.a>
                        <motion.a 
                          href="#" 
                          whileHover={{ y: -3, color: '#4b6cb7' }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <FaEnvelope />
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        

        {/* Enhanced CTA Section with floating elements */}
        <section id="contact" className="section cta-section" style={{ background: LIGHT_GRADIENT }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <motion.h2
                  className="section-title center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  Ready to transform your digital presence?
                </motion.h2>
                <motion.p
                  className="mb-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  Let's discuss how we can help your business grow. Contact us today for a free consultation.
                </motion.p>
                <motion.div
                  className="cta-buttons"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <motion.a
                    href="/contact"
                    className="btn btn-light btn-lg mr-3"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 30px rgba(75, 108, 183, 0.6)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    Get Started
                  </motion.a>
                  <motion.a
                    href="tel:+919352072936"
                    className="btn btn-outline-light btn-lg"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(255, 255, 255, 0.1)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    Call Us Now
                  </motion.a>
                </motion.div>
                <motion.div
                  className="mt-5 small"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <p>Email: info@logiclitesolutions.in</p>
                  <p>Phone: +91 9352072936</p>
                  <p>Address: 43, Pashupathinath Nagar,
Jaipur, Rajasthan 302031</p>
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Floating elements in CTA */}
          <motion.div 
            className="cta-floating-icon"
            animate={{
              y: [0, 15, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <GiSpinningBlades />
          </motion.div>
          <motion.div 
            className="cta-floating-icon-2"
            animate={{
              y: [0, -20, 0],
              rotate: [0, -10, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            <FaRegLightbulb />
          </motion.div>
        </section>
      </main>
    </div>
  );
}