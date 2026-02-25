// components/Career/JobEditor.js
import React, { useState, useEffect } from 'react';
import { FaTimes, FaSave } from 'react-icons/fa';
import './JobEditor.css';

const JobEditor = ({ job, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salaryRange: '',
    applicationLink: '',
    isPublished: true,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || '',
        description: job.description || '',
        location: job.location || '',
        salaryRange: job.salaryRange || '',
        applicationLink: job.applicationLink || '',
        isPublished: job.isPublished || true,
      });
    }
  }, [job]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem('token');
      const url = job
        ? `https://logicallite-solutions-1.onrender.com/api/jobs/admin/${job._id}`
        : 'https://logicallite-solutions-1.onrender.com/api/jobs/admin';

      const method = job ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(job ? 'Job post updated successfully!' : 'Job post created successfully!');
        onClose();
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error saving job post');
      }
    } catch (error) {
      console.error('Error saving job:', error);
      alert('Error saving job post. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="job-editor-overlay">
      <div className="job-editor">
        <div className="editor-header">
          <h2>{job ? 'Edit Job Post' : 'Create New Job Post'}</h2>
          <button onClick={onClose} className="close-btn">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="editor-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="6"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="salaryRange">Salary Range (Optional)</label>
              <input
                type="text"
                id="salaryRange"
                name="salaryRange"
                value={formData.salaryRange}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="applicationLink">Application Link (Optional)</label>
            <input
              type="text"
              id="applicationLink"
              name="applicationLink"
              value={formData.applicationLink}
              onChange={handleInputChange}
              placeholder="e.g., mailto:hr@example.com"
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleInputChange}
              />
              Publish Job Post
            </label>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="btn-primary"
            >
              {saving ? 'Saving...' : 'Save Job'} <FaSave />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobEditor;