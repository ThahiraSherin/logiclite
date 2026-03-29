// src/pages/HomePage.js
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomePage.css";

import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import PortfolioSection from "./PortfolioSection";
import TechStackSection from "./TechStackSection";
import ContactSection from "./ContactSection";
import TestimonialsSection from "./TestimonialsSection";

import digitalVideo from "../../assets/digital.mp4";
import softwareVideo from "../../assets/software.mp4";
import staffVideo from "../../assets/staff.mp4";
import taxVideo from "../../assets/tax.mp4";
import FloatingWhatsapp from "./FloatingWhatsapp";

const videoData = [
  {
    src: digitalVideo,
    title: "Grow Your Brand with Digital Marketing",
    subtitle: "Attract, engage, and convert customers using AI-driven strategies.",
    btn1: "Start Your Growth Journey",
    path1: "/contact",
    btn2: "View Our Work",
    path2: "/portfolio",
  },
  {
    src: softwareVideo,
    title: "Build Scalable Software & Apps",
    subtitle: "High-performance web & mobile solutions for growth.",
    btn1: "Start Your Project",
    path1: "/contact",
    btn2: "Explore Services",
    path2: "/services",
  },
  {
    src: staffVideo,
    title: "Scale Faster with Expert Talent",
    subtitle: "Hire skilled developers on demand.",
    btn1: "Hire Experts",
    path1: "/contact",
    btn2: "Learn More",
    path2: "/about",
  },
  {
    src: taxVideo,
    title: "Simplified Tax & Compliance",
    subtitle: "GST, tax filing & financial solutions made easy.",
    btn1: "Talk to an Expert",
    path1: "/contact",
    btn2: "Learn More",
    path2: "/about",
  },
];

const HomePage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const videoRef = useRef(null);

  useEffect(() => {
    const currentVideo = videoRef.current;
    if (currentVideo) {
      currentVideo.play().catch(() => {});
      const handleEnded = () => {
        setActiveIndex((prev) => (prev + 1) % videoData.length);
      };
      currentVideo.addEventListener("ended", handleEnded);
      return () => currentVideo.removeEventListener("ended", handleEnded);
    }
  }, [activeIndex]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  const current = videoData[activeIndex];

  return (
    <>
      {/* HERO VIDEO */}
      <div className="video-slider-container position-relative" style={{ paddingTop: "80px" }}>
        <video
          ref={videoRef}
          src={current.src}
          className="bg-video"
          muted
          autoPlay
          playsInline
        />

        <div className="overlay d-flex flex-column justify-content-center align-items-center text-center text-white">
          <div className="container">
            <h1 className="display-4 fw-bold">{current.title}</h1>
            <p className="lead">{current.subtitle}</p>

            <div className="d-flex justify-content-center gap-3 flex-wrap mt-4">
              <Link to={current.path1} className="btn btn-primary btn-lg">
                {current.btn1}
              </Link>
              <Link to={current.path2} className="btn btn-outline-light btn-lg">
                {current.btn2}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <section className="stats-section py-5 text-center">
        <div className="container">
          <div className="row g-3">

            <div className="col-4">
              <div className="stat-box">
                <h2>3+</h2>
                <p>Years Experience</p>
              </div>
            </div>

            <div className="col-4">
              <div className="stat-box">
                <h2>85+</h2>
                <p>Clients</p>
              </div>
            </div>

            <div className="col-4">
              <div className="stat-box">
                <h2>142+</h2>
                <p>Projects</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT */}
      <AboutSection />

      {/* SERVICES */}
      <ServicesSection />

      {/* PORTFOLIO */}
      <PortfolioSection />

      {/* TECH STACK */}
      <TechStackSection />

      {/* ✅ TESTIMONIALS */}
      <TestimonialsSection />

      {/* ✅ CTA SECTION */}
      <section className="cta-section text-center text-white py-5">
        <div className="container">
          <h2 className="mb-3">Ready to build your next project?</h2>
          <p className="mb-4">
            Let’s create something amazing together.
          </p>
          <Link to="/contact" className="btn btn-light btn-lg">
            Get Started
          </Link>
        </div>
      </section>
      

      {/* FLOATING WHATSAPP */}
      <FloatingWhatsapp />

      {/* CONTACT */}
      <ContactSection
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default HomePage;