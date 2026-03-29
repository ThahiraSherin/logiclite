import React from "react";
import "./FloatingWhatsapp.css";

const FloatingWhatsapp = () => {
  return (
    <div className="whatsapp-container">
      <a
        href="https://wa.me/9352072936"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-link"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
          alt="WhatsApp"
          className="whatsapp-icon"
        />
      </a>
    </div>
  );
};

export default FloatingWhatsapp;