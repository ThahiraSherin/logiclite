import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import icons for the chevron

export default function ServiceSelect({ formData, setFormData }) {
  const serviceOptions = [
    { value: "", label: "Select a service", disabled: true }, // Updated placeholder option
    { value: "Career", label: "Career" },
    {
      value: "Digital Marketing Services",
      label: "Digital Marketing Services",
    },
    { value: "IT Solutions", label: "IT Solutions" },
    { value: "Schedule a Demo", label: "Schedule a Demo" },
    { value: "Collaboration", label: "Collaboration" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    setFormData((prev) => ({ ...prev, service: value }));
    setIsOpen(false);
  };

  const selectedLabel = formData.service
    ? serviceOptions.find((opt) => opt.value === formData.service)?.label
    : "Select a service";

  return (
    <div className="form-group">
      <label className="form-label">Service*</label>
      
      {/* Custom Dropdown */}
      <div className={`dropdown-container ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen((prev) => !prev)}>
        <div className="dropdown-selected">
          {selectedLabel}
        </div>
        <div className="dropdown-chevron">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>

      {isOpen && (
        <div className="dropdown-options">
          {serviceOptions.map((option, index) => (
            <div
              key={index}
              className={`dropdown-option ${option.disabled ? 'disabled' : ''} ${option.value === formData.service ? 'selected' : ''}`}
              onClick={() => !option.disabled && handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}