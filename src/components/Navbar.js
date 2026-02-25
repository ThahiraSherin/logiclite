import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css"; // Import the CSS file

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleToggle = () => setExpanded(!expanded);
  const closeMenu = () => setExpanded(false);

  const menuItems = [
    !isHome && { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
    { name: "Careers", path: "/careers" },
    { name: "Blog", path: "/blogs" },
  ].filter(Boolean);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow fixed-top" style={{ backgroundColor: '#0a192f' }}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/" onClick={closeMenu}>
          <img src={logo} alt="LogicLite" height="50" className="me-2 navbar-logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggle}
          aria-expanded={expanded}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${expanded ? "show" : ""}`}>
          <ul className="navbar-nav w-100 justify-content-center justify-content-lg-end text-center mb-2 mb-lg-0">
            {menuItems.map(({ name, path }) => (
              <li className="nav-item mx-1 mx-lg-2" key={name}>
                <Link
                  className={`nav-link text-white ${location.pathname === path ? "active" : ""}`}
                  to={path}
                  onClick={closeMenu}
                  aria-current={location.pathname === path ? "page" : undefined}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;