import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLaptopCode, FaUserTie, FaHandsHelping, FaRocket, FaChevronDown } from 'react-icons/fa';
import Navbar from '../Navbar';
import ApplicationForm from './ApplicationForm';
import './Careers.css';
import collaborating from '../../assets/career/Collaboration.png';
import celebration from '../../assets/career/Celebration.png';
import fun from '../../assets/career/Fun.png';

const COMPANY_NAME = "LogicLite Solutions";

const HERO_BACKGROUND_IMAGE = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80";

const Careers = () => {
    const [openPositions, setOpenPositions] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('https://logicallite-solutions-1.onrender.com/api/jobs');
                const data = await response.json();
                if (response.ok) {
                    setOpenPositions(data);
                }
            } catch (error) {
                console.error("Failed to fetch job posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();

        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
            setScrollProgress(scrollPercent);
            setIsScrolled(scrollTop > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleApplyClick = (job) => {
        setSelectedJob(job);
    };

    const handleCloseForm = () => {
        setSelectedJob(null);
    };

    const scrollToPositions = () => {
        document.getElementById('open-positions').scrollIntoView({
            behavior: 'smooth'
        });
    };

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    const staggerChildren = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="careers-page">
            <motion.div
                className="scroll-progress-bar"
                initial={{ width: 0 }}
                animate={{ width: `${scrollProgress}%` }}
                transition={{ duration: 0.2 }}
            />

            <Navbar scrolled={isScrolled} />

            <AnimatePresence>
                {selectedJob && (
                    <ApplicationForm job={selectedJob} onClose={handleCloseForm} />
                )}
            </AnimatePresence>

            {!selectedJob && (
                <>
                    <motion.header
                        className="careers-hero"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${HERO_BACKGROUND_IMAGE})`
                        }}
                    >
                        <div className="hero-content">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                Join Our <span className="gradient-text">Team</span>
                            </motion.h1>
                            <motion.p
                                className="lead"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                We're growing and looking for passionate people to join our journey.
                            </motion.p>
                            <motion.button
                                className="scroll-down-btn"
                                onClick={scrollToPositions}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <span>Explore Opportunities</span>
                                <FaChevronDown />
                            </motion.button>
                        </div>
                        <div className="hero-background-elements">
                            {[...Array(15)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="floating-shape"
                                    initial={{
                                        opacity: 0,
                                        scale: 0,
                                        rotate: Math.random() * 180 - 90
                                    }}
                                    animate={{
                                        opacity: [0, 0.5, 0],
                                        scale: [0, 1, 0],
                                        rotate: Math.random() * 360 - 180,
                                        x: Math.random() * 100 - 50,
                                        y: Math.random() * 100 - 50
                                    }}
                                    transition={{
                                        duration: Math.random() * 10 + 10,
                                        repeat: Infinity,
                                        delay: Math.random() * 5
                                    }}
                                />
                            ))}
                        </div>
                    </motion.header>

                    <motion.section
                        className="careers-section why-join-us"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerChildren}
                    >
                        <div className="container">
                            <motion.h2 variants={fadeIn}>Why Join Us? 🤔</motion.h2>
                            <div className="features-grid">
                                <motion.div
                                    className="feature-item"
                                    variants={fadeIn}
                                    whileHover={{
                                        y: -10,
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    <motion.div
                                        className="icon-wrapper"
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <FaRocket className="feature-icon" />
                                    </motion.div>
                                    <h3>Big Impact</h3>
                                    <p>Be part of a small team where your work directly contributes to our success and makes a real difference.</p>
                                </motion.div>
                                <motion.div
                                    className="feature-item"
                                    variants={fadeIn}
                                    whileHover={{
                                        y: -10,
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    <motion.div
                                        className="icon-wrapper"
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <FaLaptopCode className="feature-icon" />
                                    </motion.div>
                                    <h3>Growth & Learning</h3>
                                    <p>We invest in your professional development with continuous learning, mentorship, and career growth paths.</p>
                                </motion.div>
                                <motion.div
                                    className="feature-item"
                                    variants={fadeIn}
                                    whileHover={{
                                        y: -10,
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    <motion.div
                                        className="icon-wrapper"
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <FaHandsHelping className="feature-icon" />
                                    </motion.div>
                                    <h3>Friendly Culture</h3>
                                    <p>Enjoy a supportive, friendly, and open environment where collaboration and innovation thrive.</p>
                                </motion.div>
                                <motion.div
                                    className="feature-item"
                                    variants={fadeIn}
                                    whileHover={{
                                        y: -10,
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    <motion.div
                                        className="icon-wrapper"
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <FaUserTie className="feature-icon" />
                                    </motion.div>
                                    <h3>Flexible Work Style</h3>
                                    <p>We value work-life balance and offer flexible work arrangements to suit your personal needs.</p>
                                </motion.div>
                            </div>
                        </div>
                    </motion.section>

                    <motion.div
                        className="section-divider"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    />

                    <motion.section
                        id="open-positions"
                        className="careers-section open-positions"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerChildren}
                    >
                        <div className="container">
                            <motion.h2 className="section-title" variants={fadeIn}>Open Positions</motion.h2>
                            <motion.p className="section-subtitle" variants={fadeIn}>
                                Find your next opportunity and grow with us.
                            </motion.p>
                            {loading ? (
                                <p className="loading-message">Loading open positions...</p>
                            ) : (
                                <div className="positions-list">
                                    {openPositions.length > 0 ? (
                                        openPositions.map((position, index) => (
                                            <motion.div
                                                key={index}
                                                className="position-card"
                                                variants={fadeIn}
                                                whileHover={{
                                                    y: -5,
                                                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                                                }}
                                            >
                                                <h3>{position.title}</h3>
                                                <p>{position.description}</p>
                                                <p className="job-meta">
                                                    <strong>Location:</strong> {position.location}
                                                    {position.salaryRange && <span> | <strong>Salary:</strong> {position.salaryRange}</span>}
                                                </p>
                                                <motion.button
                                                    onClick={() => handleApplyClick(position)}
                                                    className="btn-apply"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Apply Now
                                                </motion.button>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <p className="no-positions">There are no open positions at this time. Please check back later!</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.section>

                    <motion.div
                        className="section-divider"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    />

                    <motion.section
                        className="careers-section life-at-company"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <div className="container">
                            <motion.h2
                                className="section-title"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                Life at {COMPANY_NAME}
                            </motion.h2>
                            <motion.p
                                className="text-center section-subtitle"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                Our work culture is built on a foundation of <strong>fun, collaboration, and mutual support</strong>. We believe a happy team is a productive team, and we foster an environment where every voice is heard and valued.
                            </motion.p>
                            <motion.div
                                className="life-images"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                <motion.div
                                    className="image-with-caption"
                                    whileHover={{ y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <img src={collaborating} alt="Team collaborating" />
                                    </motion.div>
                                    <p>Collaboration</p>
                                </motion.div>
                                <motion.div
                                    className="image-with-caption"
                                    whileHover={{ y: -10 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <img src={celebration} alt="Team celebration" />
                                    </motion.div>
                                    <p>Celebration</p>
                                </motion.div>
                                <motion.div
                                    className="image-with-caption"
                                    whileHover={{ y: -10 }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <img src={fun} alt="Fun at the office" />
                                    </motion.div>
                                    <p>Fun at the Office</p>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.section>

                    <motion.div
                        className="section-divider"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    />

                    <motion.section
                        className="careers-section call-to-action"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="container">
                            <h2>Excited to be part of our story?</h2>
                            <p className="cta-text">Apply today and start building a great career with us.</p>
                            <motion.a
                                href="#open-positions"
                                className="btn-cta"
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 5px 15px rgba(255, 255, 255, 0.2)"
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Explore Open Positions
                            </motion.a>
                        </div>
                    </motion.section>
                </>
            )}
        </div>
    );
};

export default Careers;