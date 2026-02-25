import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const ApplicationForm = ({ job, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        resume: null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, resume: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const applicationData = new FormData();
        applicationData.append('name', formData.name);
        applicationData.append('email', formData.email);
        applicationData.append('phone', formData.phone);
        applicationData.append('jobId', job._id);
        applicationData.append('jobTitle', job.title);
        applicationData.append('resume', formData.resume);

        try {
            const response = await fetch('https://logicallite-solutions-1.onrender.com/api/applications/apply', {
                method: 'POST',
                body: applicationData,
            });

            const result = await response.json();

            if (response.ok) {
                toast.success(result.message);
                onClose();
            } else {
                toast.error(result.message || 'Application submission failed.');
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="application-form-overlay">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="application-form-container">
                <div className="form-header">
                    <h2>Apply for {job.title}</h2>
                    <button onClick={onClose} className="close-btn">
                        <FaTimes />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name*</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email*</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="resume">Resume/CV*</label>
                        <input type="file" id="resume" name="resume" onChange={handleFileChange} required accept=".pdf,.doc,.docx" />
                        <small className="file-info">File types: .pdf, .doc, .docx</small>
                    </div>
                    <button type="submit" disabled={isSubmitting} className="submit-btn">
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ApplicationForm;