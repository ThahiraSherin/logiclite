import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import {
  FaChartLine, FaCode, FaUsers, FaMobileAlt,
  FaChartBar, FaEnvelopeOpenText, FaCloudUploadAlt,
  FaTasks, FaSearchDollar,
  FaSearch, FaLightbulb, FaHandshake,
  FaChevronRight, FaChevronLeft, FaQuoteLeft, FaStar, FaCheckCircle,
  FaReact, FaNodeJs, FaAws, FaPython, FaDocker, FaFileInvoiceDollar
} from "react-icons/fa";
import { SiJavascript, SiMongodb } from "react-icons/si";
import { IoMdRocket } from "react-icons/io";
import "./Services.css";

// Image imports
import digitalMarketingImg from '../../assets/images/digital-marketing.png';
import webDevelopmentImg from '../../assets/images/web-development.png';
import staffAugmentationImg from '../../assets/images/staff-augmentation.png';
import appDevelopmentImg from '../../assets/images/app-development.png';
import customSoftwareImg from '../../assets/images/seo-services.png';
import taxComplianceImg from '../../assets/images/tax-compliance.png';
import ritikaImg from '../../assets/Testimonials/ritika.jpg';
import ahrazImg from '../../assets/Testimonials/ahraz.jpg';
import sunitImg from '../../assets/Testimonials/sunit.jpg';

// Process step images
import discoveryImg from '../../assets/process/discovery.jpg';
import planningImg from '../../assets/process/planning.jpg';
import executionImg from '../../assets/process/execution.jpg';
import deliveryImg from '../../assets/process/delivery.jpg';

const SERVICES = [
  {
    icon: <FaChartLine />,
    title: "Digital Marketing",
    description: "Comprehensive strategies including SEO, PPC, and content marketing to boost your visibility and drive conversions.",
    backgroundImage: digitalMarketingImg,
    highlightColor: "#4b6cb7",
    iconColor: "#4b6cb7"
  },
  {
    icon: <FaCode />,
    title: "Web Development",
    description: "Custom websites focused on user experience, performance, and achieving your business goals.",
    backgroundImage: webDevelopmentImg,
    highlightColor: "#3a7bd5",
    iconColor: "#3a7bd5"
  },
  {
    icon: <FaMobileAlt />,
    title: "Android & IOS App Development",
    description: "Engaging native and cross-platform mobile apps built with cutting-edge technology.",
    backgroundImage: appDevelopmentImg,
    highlightColor: "#6a11cb",
    iconColor: "#6a11cb"
  },
  {
    icon: <FaSearch />,
    title: "Custom Software Development",
    description: "Custom software development is the strategic design and creation of tailored software solutions to address the unique requirements and objectives of a business.",
    backgroundImage: customSoftwareImg,
    highlightColor: "#28a745",
    iconColor: "#28a745"
  },
  {
    icon: <FaUsers />,
    title: "Staff Augmentation",
    description: "Scale your team with our pre-vetted developers, designers, and marketing experts.",
    backgroundImage: staffAugmentationImg,
    highlightColor: "#00d2ff",
    iconColor: "#00d2ff"
  },
  {
    icon: <FaFileInvoiceDollar />,
    title: "Tax & Compliance Solutions",
    description: "We provide GST registration, returns, income tax, TDS, and account maintenance—ensuring timely, accurate compliance and support for your business's financial needs.",
    backgroundImage: taxComplianceImg,
    highlightColor: "#dc3545",
    iconColor: "#dc3545"
  }
];

const WHY_CHOOSE_US_POINTS = [
  { text: "Results-Driven Approach" },
  { text: "Transparent Communication" },
  { text: "Expert In-House Team" },
  { text: "Commitment to Quality" }
];

const TESTIMONIALS = [
  {
    quote: "Our organic traffic increased by 215% within 6 months. Truly remarkable results.",
    name: "Ritika Tiwari",
    company: "Marketing Director, TechStart",
    stars: 5,
    image: ritikaImg
  },
  {
    quote: "The e-commerce platform they developed boosted our conversion rate by 40%. The ROI was incredible.",
    name: "Ahraz Imtiyaz",
    company: "CEO, BrandVista",
    stars: 5,
    image: ahrazImg
  },
  {
    quote: "Their team integrated seamlessly with ours and helped us launch our new features three months ahead of schedule.",
    name: "Sunit Sharma",
    company: "CTO, Innovate Inc.",
    stars: 5,
    image: sunitImg
  }
];

const PROCESS_STEPS = [
  {
    icon: <FaLightbulb />,
    title: "Discovery",
    description: "We dive deep to understand your business goals, challenges, and target audience through comprehensive research and analysis.",
    image: discoveryImg,
    color: "#4b6cb7",
    imageAlt: "Team brainstorming session"
  },
  {
    icon: <FaChartLine />,
    title: "Planning",
    description: "We craft a customized strategy with clear milestones, KPIs, and a detailed roadmap tailored to your objectives.",
    image: planningImg,
    color: "#3a7bd5",
    imageAlt: "Planning documents and charts"
  },
  {
    icon: <FaCode />,
    title: "Execution",
    description: "Our expert team implements the solution with agile methodologies, ensuring quality and efficiency at every stage.",
    image: executionImg,
    color: "#6a11cb",
    imageAlt: "Developers working on code"
  },
  {
    icon: <FaHandshake />,
    title: "Delivery",
    description: "We deploy the final product with comprehensive documentation, training, and ongoing support for continuous improvement.",
    image: deliveryImg,
    color: "#00d2ff",
    imageAlt: "Team handshake meeting"
  }
];

const TECHNOLOGIES = [
  { icon: <FaReact style={{ color: '#61DAFB' }} />, name: "React" },
  { icon: <FaNodeJs style={{ color: '#68A063' }} />, name: "Node.js" },
  { icon: <FaAws style={{ color: '#FF9900' }} />, name: "AWS" },
  { icon: <SiJavascript style={{ color: '#F7DF1E' }} />, name: "JavaScript" },
  { icon: <FaPython style={{ color: '#3776AB' }} />, name: "Python" },
  { icon: <SiMongodb style={{ color: '#47A248' }} />, name: "MongoDB" },
  { icon: <FaDocker style={{ color: '#2496ED' }} />, name: "Docker" },
  { icon: <FaChartBar style={{ color: '#4285F4' }} />, name: "Google Analytics" },
  { icon: <FaSearchDollar style={{ color: '#4CAF50' }} />, name: "Google Ads" },
  { icon: <FaEnvelopeOpenText style={{ color: '#E53E2A' }} />, name: "Mailchimp" },
  { icon: <FaFileInvoiceDollar style={{ color: '#4A627A' }} />, name: "Financial Software" },
  { icon: <FaCloudUploadAlt style={{ color: '#007ACC' }} />, name: "E-Filing Systems" },
  { icon: <FaTasks style={{ color: '#E0A800' }} />, name: "Project Management" }
];

const TechnologyMarquee = () => {
  const duplicatedTechnologies = [...TECHNOLOGIES, ...TECHNOLOGIES];
  
  return (
    <div className="marquee">
      <motion.div
        className="marquee-content"
        animate={{ x: ['0%', '-100%'] }}
        transition={{
          ease: 'linear',
          duration: 8,
          repeat: Infinity,
        }}
      >
        {duplicatedTechnologies.map((tech, index) => (
          <div key={index} className="tech-item">
            {tech.icon}
            <span>{tech.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const AnimatedServicesGrid = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const getCardAnimation = (title) => {
    switch(title) {
      case "Digital Marketing":
        return {
          hover: {
            y: -15,
            boxShadow: '0 20px 40px rgba(75, 108, 183, 0.2)',
            scale: 1.03
          },
          iconHover: {
            scale: 1.2,
            rotate: 360,
            color: '#fff',
          },
          textHover: {
            scale: 1.1,
            textShadow: '0 0 5px rgba(255,255,255,0.5)',
          }
        };
      case "Web Development":
        return {
          hover: {
            y: -15,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            scale: 1.03
          },
          iconHover: {
            scale: 1.2,
            rotate: 360,
            color: '#fff',
            transition: { duration: 1, repeat: Infinity, ease: "linear" }
          },
          textHover: {
            scale: 1.1,
            textShadow: '0 0 5px rgba(255,255,255,0.5)',
          }
        };
      case "Android & IOS App Development":
        return {
          hover: {
            y: -15,
            boxShadow: '0 20px 40px rgba(58, 123, 213, 0.2)',
            scale: 1.03
          },
          iconHover: {
            scale: 1.2,
            y: -10,
            color: '#fff',
            transition: { type: "spring", stiffness: 300, damping: 10 }
          },
          textHover: {
            scale: 1.1,
            textShadow: '0 0 5px rgba(255,255,255,0.5)',
          }
        };
      case "Custom Software Development":
        return {
          hover: {
            y: -15,
            boxShadow: '0 20px 40px rgba(40, 167, 69, 0.15)',
            scale: 1.03
          },
          iconHover: {
            scale: 1.2,
            color: '#fff',
            transition: {
              type: "spring", stiffness: 500, damping: 10
            }
          },
          textHover: {
            scale: 1.1,
            textShadow: '0 0 5px rgba(255,255,255,0.5)',
          }
        };
      case "Staff Augmentation":
        return {
          hover: {
            y: -15,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            scale: 1.03
          },
          iconHover: {
            scale: 1.1,
            y: -5,
            color: '#fff',
            transition: {
              type: "spring", stiffness: 500, damping: 10
            }
          },
          textHover: {
            scale: 1.1,
            textShadow: '0 0 5px rgba(255,255,255,0.5)',
          }
        };
      case "Tax & Compliance Solutions":
        return {
          hover: {
            y: -15,
            boxShadow: '0 20px 40px rgba(220, 53, 69, 0.1)',
            scale: 1.03
          },
          iconHover: {
            scale: 1.1,
            color: '#fff',
            rotate: 5,
            transition: { duration: 0.6 }
          },
          textHover: {
            scale: 1.1,
            textShadow: '0 0 5px rgba(255,255,255,0.5)',
          }
        };
      default:
        return {
          hover: { y: -15, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' },
          iconHover: { scale: 1.2, color: '#fff' },
          textHover: { scale: 1.05 }
        };
    }
  };

  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
      scale: 0.95
    },
    onscreen: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  const textVariants = {
    initial: { scale: 1 },
    hover: (custom) => custom.textHover,
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0, y: 0 },
    hover: (custom) => custom.iconHover,
  };

  return (
    <div className="services-grid-new">
      {SERVICES.map((service, index) => {
        const customAnimations = getCardAnimation(service.title);
        const isHovered = hoveredCard === index;

        return (
          <motion.div
            key={index}
            className="service-card-new"
            initial="offscreen"
            whileInView="onscreen"
            whileHover="hover"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            transition={{ delay: index * 0.1 }}
            custom={{ hover: customAnimations.hover }}
            onHoverStart={() => setHoveredCard(index)}
            onHoverEnd={() => setHoveredCard(null)}
            style={{
              background: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${service.backgroundImage}) center/cover no-repeat`
            }}
          >
            <motion.div
              className="service-highlight"
              style={{ backgroundColor: service.highlightColor }}
              animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            />
            
            <motion.div
              className="service-icon-new"
              variants={iconVariants}
              initial="initial"
              animate={isHovered ? "hover" : "initial"}
              custom={customAnimations}
              style={{ color: service.iconColor }}
            >
              {service.icon}
            </motion.div>

            <motion.div
              className="service-content-new"
            >
              <h3>{service.title}</h3>
              <motion.p
                variants={textVariants}
                custom={customAnimations}
                animate={isHovered ? "hover" : "initial"}
              >
                {service.description}
              </motion.p>
            </motion.div>

            <motion.div
              className="service-border-new"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              style={{ backgroundColor: service.highlightColor }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default function Services() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const heroRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = heroRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const processSectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: processSectionRef,
    offset: ['start center', 'end center']
  });

  const nextTestimonial = () => setCurrentTestimonial(prev => (prev + 1) % TESTIMONIALS.length);
  const prevTestimonial = () => setCurrentTestimonial(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 7000);
    return () => clearInterval(timer);
  }, []);

  const title = "Digital Solutions That Drive Growth";
  const titleWords = title.split(" ");

  const titleContainerVariants = {
    visible: { transition: { staggerChildren: 0.1 } }
  };
  const titleWordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } }
  };

  return (
    <div className="services-page-new">
      <motion.section
        className="hero-section-new"
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{ perspective: "1000px" }}
      >
        <motion.div
          className="hero-content-new"
          style={{ rotateX, rotateY }}
        >
          <motion.div
            initial={{ y: -50, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.5 }}
            className="hero-icon-rocket"
          >
            <IoMdRocket />
          </motion.div>
          <motion.h1
            variants={titleContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {titleWords.map((word, index) => (
              <motion.span key={index} variants={titleWordVariants} className={word === "Growth" ? "highlight" : ""}>
                {word}{" "}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p className="lead-new" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.5 }}>
            Your trusted IT partner for consulting, software development, and digital solutions that build a stronger online presence and accelerate business success.
          </motion.p>
          <motion.a href="#contact" className="btn btn-primary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.8 }}>
            Get Your Free Consultation <FaChevronRight />
          </motion.a>
        </motion.div>
      </motion.section>

      <section className="content-section-new">
        <div className="container">
          <div className="section-header-new">
            <h2>Our Core Services</h2>
            <p>We provide a wide range of services to help you succeed online.</p>
          </div>
          <AnimatedServicesGrid />
        </div>
      </section>

      <section className="content-section-new bg-dark">
        <div className="container">
          <div className="section-header-new">
            <h2 className="light-text">Technologies We Use</h2>
          </div>
          <TechnologyMarquee />
        </div>
      </section>

      <section className="content-section-new bg-light">
        <div className="container">
          <div className="section-header-new">
            <h2>Why Choose Us?</h2>
            <p>We combine strategy, technology, and execution to deliver unparalleled results.</p>
          </div>
          <div className="why-choose-us-grid">
            <motion.div className="why-choose-us-image" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Collaborative team working" />
            </motion.div>
            <div className="why-choose-us-content">
              <h3>Your Partner in Digital Excellence</h3>
              <p>We are more than just a service provider; we are your strategic partner. Our goal is to understand your business and deliver tailored solutions that generate real value and a positive return on investment.</p>
              <ul>
                {WHY_CHOOSE_US_POINTS.map((point, index) => (
                  <motion.li key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.2, duration: 0.5 }} viewport={{ once: true }}>
                    <FaCheckCircle className="check-icon" /> {point.text}
                  </motion.li>
                ))}
              </ul>
              <motion.a href="#process" className="btn btn-secondary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Our Process
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="content-section-new" ref={processSectionRef}>
        <div className="container">
        <div className="section-header-new">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              // Performance Improvement: Animate once when in view
              viewport={{ once: true }} 
            >
                Our Proven Process
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              // Performance Improvement: Animate once when in view
              viewport={{ once: true }}
            >
                A streamlined approach that guarantees clarity and delivers results.
            </motion.p>
        </div>
        
        <div className="process-timeline-container">
            {/* Keeping this as it's a good visual cue, Framer Motion handles it efficiently */}
            <motion.div 
              className="process-timeline-line" 
              style={{ scaleY: scrollYProgress }}
              initial={{ scaleY: 0 }}
            />
            
            <div className="process-steps-new">
      {PROCESS_STEPS.map((step, index) => (
        <motion.div
          key={index}
          className={`process-step-new ${index % 2 === 0 ? "left" : "right"}`}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.5 }}
          custom={index}
          variants={{
            offscreen: { opacity: 0, x: index % 2 === 0 ? -80 : 80 },
            onscreen: (i) => ({
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.6,
                ease: "easeOut",
                delay: i * 0.15, // stagger animations
              },
            }),
          }}
          whileHover={{
            y: -8,
            filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.15))", // GPU-friendly shadow
          }}
        >
          <div className="process-content-wrapper">
            {/* Icon */}
            <div className="process-icon-container">
              <div
                className="process-icon-new"
                style={{ backgroundColor: step.color }}
              >
                {step.icon}
              </div>
            </div>

            {/* Card Content */}
            <div className="process-card-content">
              {/* Image with overlay */}
              <div className="process-image-container">
                <img
                  src={step.image}
                  alt={step.imageAlt}
                  className="process-image"
                  loading="lazy"
                  decoding="sync"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/800x450?text=Process+Image";
                  }}
                />
                <motion.div
                  className="image-overlay"
                  initial={{ scaleY: 1 }}
                  whileInView={{ scaleY: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{
                    backgroundColor: step.color,
                    transformOrigin: "bottom",
                  }}
                  viewport={{ once: true, amount: 0.8 }}
                />
              </div>

              {/* Text Content */}
              <div className="process-text-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <div
                  className="step-number"
                  style={{ backgroundColor: step.color }}
                >
                  {index + 1}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
        </div>
    </div>
</section>

      <section className="content-section-new bg-light">
        <div className="container">
          <div className="section-header-new">
            <h2>What Our Clients Say</h2>
            <p>Don't just take our word for it. Read what our clients have to say.</p>
          </div>
          <div className="testimonial-slider-new">
            <AnimatePresence initial={false} mode="wait">
              <motion.div key={currentTestimonial} className="testimonial-card-new"
                initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                <FaQuoteLeft className="quote-icon-new" />
                <p className="quote-new" dangerouslySetInnerHTML={{ __html: `"${TESTIMONIALS[currentTestimonial].quote.replace(/(\d+%)/g, `<strong>$1</strong>`)}"` }} />
                <div className="client-info-new">
                  <div className="client-image">
                    <img src={TESTIMONIALS[currentTestimonial].image} alt={TESTIMONIALS[currentTestimonial].name} />
                  </div>
                  <div className="client-text-info">
                    <div className="stars-new">
                      {[...Array(TESTIMONIALS[currentTestimonial].stars)].map((_, i) => <FaStar key={i} />)}
                    </div>
                    <h4>{TESTIMONIALS[currentTestimonial].name}</h4>
                    <p>{TESTIMONIALS[currentTestimonial].company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="testimonial-nav-new">
              <button onClick={prevTestimonial} aria-label="Previous testimonial"><FaChevronLeft /></button>
              <button onClick={nextTestimonial} aria-label="Next testimonial"><FaChevronRight /></button>
            </div>
            <div className="testimonial-progress-bar">
              <motion.div
                key={currentTestimonial}
                className="testimonial-progress-bar-inner"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 7, ease: 'linear' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="cta-section-new">
        <div className="container">
          <motion.div className="cta-content-new" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <motion.div whileHover={{ scale: 1.2, rotate: 15 }} transition={{ type: 'spring' }}>
              <IoMdRocket />
            </motion.div>
            <h2>Ready to Start Your Project?</h2>
            <p>Let's talk about your business goals. Schedule a free, no-obligation consultation with our experts today.</p>
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
          </motion.div>
        </div>
      </section>
    </div>
  );
}