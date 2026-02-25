import { motion } from 'framer-motion'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBullhorn,
  faCode,
  faUsers,
  faBalanceScale
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Using your existing GIF assets
import marketing1 from '../../assets/marketing1.gif';
import marketing2 from '../../assets/marketing2.gif';
import dev1 from '../../assets/dev1.gif';
import dev2 from '../../assets/dev2.gif';
import staff1 from '../../assets/staff1.gif';
import staff2 from '../../assets/staff2.gif';
import tax1 from '../../assets/tax1.gif';
import tax2 from '../../assets/tax2.gif';

const services = [
  {
    icon: faBullhorn,
    title: "Digital Marketing",
    desc: [
      "Search Engine Optimization",
      "Social Media Marketing",
      "Pay-Per-Click Advertising",
      "Video & YouTube Marketing",
      "Performance Marketing"
    ],
    color: "bg-gradient-purple",
    image1: marketing1,
    image2: marketing2,
    link: "/services"
  },
  {
    icon: faCode,
    title: "Web & Software Development",
    desc: [
      "Custom Website Development",
      "CMS Development (WordPress, Shopify, etc.)",
      "Mobile App Development (Android & iOS)",
      "Full Stack Development",
      "Website Maintenance & Support",
      "Cross-Platform App Development",
       ],
    color: "bg-gradient-blue",
    image1: dev1,
    image2: dev2,
    link: "/services"
  },
  {
    icon: faUsers,
    title: "Staff Augmentation",
    desc: [
      "On-demand tech talent",
      "Remote & onsite developers",
      "Flexible hiring models",
      "Fast onboarding",
      "Scalable team support"
    ],
    color: "bg-gradient-green",
    image1: staff1,
    image2: staff2,
    link: "/services"
  },
  {
    icon: faBalanceScale,
    title: "Tax & Compliance",
    desc: [
      "GST registration & filing",
      "Income tax return filing",
      "Business compliance management",
      "ROC & MCA filings",
      "TDS & PF/ESI compliance"
    ],
    color: "bg-gradient-yellow",
    image1: tax1,
    image2: tax2,
    link: "/services"
  },
];

const ServicesSection = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [clickTimer, setClickTimer] = useState(null);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
      if (clickTimer) clearTimeout(clickTimer);
    };
  }, [clickTimer]);

  const handleTouchStart = (index) => {
    if (isMobile) {
      setActiveCard(index);
    }
  };

  const handleTouchEnd = () => {
    if (isMobile) {
      const timer = setTimeout(() => {
        setActiveCard(null);
      }, 3000);
      setClickTimer(timer);
    }
  };

  const handleCardClick = (link, index) => {
    if (clickTimer) {
      clearTimeout(clickTimer);
      setClickTimer(null);
    }
    
    if (activeCard !== index) {
      setActiveCard(index);
      return;
    }
    
    navigate(link);
  };

  return (
    <section id="services" className="services-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="fw-bold display-5 mb-3 gradient-heading"
          >
            Our Services
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
            className="mx-auto bg-primary"
            style={{ width: '80px', height: '3px' }}
          />
        </div>

        <div className="row g-4">
          {services.map((service, index) => (
            <div key={index} className="col-sm-12 col-md-6 col-lg-3 d-flex justify-content-center">
              <div className="card-container">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  onMouseEnter={!isMobile ? () => setActiveCard(index) : undefined}
                  onMouseLeave={!isMobile ? () => setActiveCard(null) : undefined}
                >
                  <motion.div
                    className={`card text-white border-0 shadow-sm cursor-pointer ${activeCard === index ? 'active-card' : ''}`}
                    whileHover={!isMobile ? {
                      scale: 1.05,
                      y: -10,
                      zIndex: 10,
                    } : {}}
                    whileTap={isMobile ? { scale: 0.98 } : {}}
                    transition={{ duration: 0.3 }}
                    onClick={() => handleCardClick(service.link, index)}
                    onTouchStart={() => handleTouchStart(index)}
                    onTouchEnd={handleTouchEnd}
                    style={{
                      backgroundImage: `url(${activeCard === index ? service.image2 : service.image1})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      height: isMobile ? '300px' : '350px',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <div className="overlay-background" style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      backdropFilter: 'blur(2px)'
                    }} />
                    
                    <div className="overlay-content p-4 d-flex flex-column justify-content-end h-100" style={{ 
                      position: 'relative',
                      zIndex: 1,
                      background: activeCard === index 
                        ? 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)'
                        : 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 70%, transparent 100%)'
                    }}>
                      <div
                        className={`card-icon mb-3 ${service.color} d-flex align-items-center justify-content-center`}
                        style={{ width: isMobile ? '50px' : '60px', height: isMobile ? '50px' : '60px' }}
                      >
                        <motion.div
                          animate={activeCard === index ? { rotate: 360 } : { rotate: 0 }}
                          transition={{ duration: 0.8, ease: "easeInOut" }}
                        >
                          <FontAwesomeIcon icon={service.icon} size="lg" />
                        </motion.div>
                      </div>

                      <motion.h5
                        className="card-title fw-bold text-white mb-3"
                        style={{ 
                          fontSize: isMobile ? '1.3rem' : '1.5rem', 
                          textShadow: '0 2px 4px rgba(0,0,0,0.5)' 
                        }}
                      >
                        {service.title}
                      </motion.h5>

                      {activeCard === index && (
                        <motion.ul
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-white list-unstyled mt-2 service-desc"
                          style={{ fontSize: isMobile ? '0.85rem' : '0.95rem', textShadow: '0 1px 2px rgba(0,0,0,0.7)' }}
                        >
                          {service.desc.map((point, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="mb-2 d-flex align-items-start"
                            >
                              <span className="me-2" style={{ color: service.color.includes('purple') ? '#a78bfa' : 
                                                              service.color.includes('blue') ? '#93c5fd' :
                                                              service.color.includes('green') ? '#86efac' : 
                                                              '#fcd34d' }}>•</span>
                              <span>{point}</span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx="true">{`
        .gradient-heading {
          background: linear-gradient(360deg, #3a7bd5, #00d2ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .services-section {
          background: linear-gradient(-45deg, #e0f7fa, #ffffff, #d1f2eb, #f0f4c3);
          background-size: 400% 400%;
          animation: animatedGradient 15s ease infinite;
        }

        @keyframes animatedGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .card-container {
          width: 100%;
          max-width: 400px;
        }

        .card-icon {
          border-radius: 15px;
          font-size: 1.2rem;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }

        .bg-gradient-purple {
          background: linear-gradient(135deg, #6a11cb, #2575fc);
        }

        .bg-gradient-blue {
          background: linear-gradient(135deg, #1d2b64, #f8cdda);
        }

        .bg-gradient-green {
          background: linear-gradient(135deg, #56ab2f, #a8e063);
        }

        .bg-gradient-yellow {
          background: linear-gradient(135deg, #f7971e, #ffd200);
        }

        .cursor-pointer {
          cursor: pointer;
        }

        .service-desc li {
          line-height: 1.1;
        }

        .active-card {
          box-shadow: 0 10px 25px rgba(0,0,0,0.3) !important;
        }

        @media (max-width: 768px) {
          .card-container {
            max-width: 100%;
          }
          
          .card-icon {
            width: 50px;
            height: 50px;
            font-size: 1rem;
          }
          
          .card-title {
            font-size: 1.3rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;