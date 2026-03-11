import React from "react";
import "./TechStackSection.css";

const technologies = [
  { name: "React", icon: "devicon-react-original colored" },
  { name: "Node.js", icon: "devicon-nodejs-plain colored" },
  { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
  { name: "AWS", icon: "devicon-amazonwebservices-plain-wordmark colored" },
  { name: "Docker", icon: "devicon-docker-plain colored" },
  { name: "Flutter", icon: "devicon-flutter-plain colored" },
];

const TechStackSection = () => {
  return (
    <section className="tech-section">
      <div className="container">
        <h2 className="text-center mb-5">Our Technology Stack</h2>

        <div className="row justify-content-center">
          {technologies.map((tech, index) => (
            <div className="col-6 col-md-2 mb-4 text-center" key={index}>
              
              <div className="tech-card">
                <i className={`${tech.icon} tech-icon`}></i>
                <p className="tech-name">{tech.name}</p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TechStackSection;