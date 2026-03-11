import React from "react";
import "./PortfolioSection.css";

const projects = [
  {
    name: "E-Commerce Website",
    tech: "React • Node.js • MongoDB",
    image: "https://picsum.photos/500/300?random=1",
    link: "#",
  },
  {
    name: "Digital Marketing Dashboard",
    tech: "React • Chart.js • API",
    image: "https://picsum.photos/500/300?random=2",
    link: "#",
  },
  {
    name: "Business Website",
    tech: "React • Bootstrap",
    image: "https://picsum.photos/500/300?random=3",
    link: "#",
  },
  {
    name: "Online Booking System",
    tech: "React • Firebase",
    image: "https://picsum.photos/500/300?random=4",
    link: "#",
  },
  {
    name: "CRM Management System",
    tech: "React • Node.js • MySQL",
    image: "https://picsum.photos/500/300?random=5",
    link: "#",
  },
  {
    name: "Mobile App Landing Page",
    tech: "React • Tailwind",
    image: "https://picsum.photos/500/300?random=6",
    link: "#",
  },
];

const PortfolioSection = () => {
  return (
    <section className="portfolio-section">
      <div className="container">
        <h2 className="text-center mb-5">Our Projects</h2>

        <div className="row">
          {projects.map((project, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="project-card">

                <img
                  src={project.image}
                  alt={project.name}
                  className="project-image"
                />

                <div className="project-card-body">
                  <h5 className="project-title">{project.name}</h5>
                  <p className="project-tech">{project.tech}</p>

                  <a href={project.link} className="project-btn">
                    View Project
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PortfolioSection;