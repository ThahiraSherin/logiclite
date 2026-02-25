// src/pages/HomePage.js
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomePage.css"; // Ensure you have this CSS file
import AboutSection from "./AboutSection"; // Adjust path as needed
import ServicesSection from "./ServicesSection"; // Adjust path as needed
import ContactSection from "./ContactSection"; // Adjust path as needed

import digitalVideo from "../../assets/digital.mp4";
import softwareVideo from "../../assets/software.mp4";
import staffVideo from "../../assets/staff.mp4";
import taxVideo from "../../assets/tax.mp4";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

const videoData = [
  {
    src: digitalVideo,
    title: "Grow Your Brand with Digital Marketing",
    subtitle: "Attract, engage, and convert customers using data-driven and AI-powered marketing strategies.",
    btn1: "Start Your Growth Journey",
    path1: "/contact",
    btn2: "View Our Work",
    path2: "/about",
  },
  {
    src: softwareVideo,
    title: "Build Scalable Software & Mobile Apps",
    subtitle: "We turn your ideas into high-performance web and mobile solutions built for growth.",
    btn1: "Start Your Project",
    path1: "/services",
    btn2: "Explore Solutions",
    path2: "/services",
  },
  {
    src: staffVideo,
    title: "Scale Faster with Expert Talent",
    subtitle: "Access skilled developers and tech professionals to strengthen your team on demand.",
    btn1: "Hire Experts",
    path1: "/contact",
    btn2: "How It Works",
    path2: "/about",
  },
  {
    src: taxVideo,
    title: "Simplified Tax & Compliance Solutions",
    subtitle: "Stay compliant with hassle-free GST, tax filing, and financial management services.",
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
    console.log("Form submitted:", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  const current = videoData[activeIndex];

  return (
    <>
      {/* VIDEO HERO */}
      <div
        className="video-slider-container position-relative"
        style={{ paddingTop: "80px" }}
      >
        <video
          ref={videoRef}
          src={current.src}
          className="bg-video"
          muted
          autoPlay
          loop={false}
          playsInline
        />
        <div className="overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-center text-white px-4">
          <div className="container">
            <h1 className="display-4 fw-bold mb-3">{current.title}</h1>
            <p className="lead mb-4">{current.subtitle}</p>
            <div className="d-flex justify-content-center flex-wrap gap-3">
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

      {/* ABOUT */}
      <AboutSection />

      {/* SERVICES */}
      <ServicesSection />

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