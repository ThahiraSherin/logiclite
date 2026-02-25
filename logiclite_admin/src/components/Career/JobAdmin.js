import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import './JobAdmin.css';
import JobEditor from './JobEditor';

const JobAdmin = () => {
  const [jobs, setJobs] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, [showEditor]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('https://logicallite-solutions-1.onrender.com/api/jobs/admin', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setShowEditor(true);
  };

  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job post?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://logicallite-solutions-1.onrender.com/api/jobs/admin/${jobId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          setJobs(jobs.filter(job => job._id !== jobId));
          alert('Job post deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  if (showEditor) {
    return (
      <JobEditor
        job={editingJob}
        onClose={() => {
          setShowEditor(false);
          setEditingJob(null);
          fetchJobs();
        }}
      />
    );
  }

  return (
    <div className="job-admin-page">
      <div className="content-header">
        <h2>Manage Job Posts</h2>
        <button className="btn-primary" onClick={() => setShowEditor(true)}>
          <FaPlus /> New Job Post
        </button>
      </div>

      {loading ? (
        <p>Loading job posts...</p>
      ) : (
        <div className="job-posts-table">
          <div className="table-header">
            <div className="col-title">Title</div>
            <div className="col-location">Location</div>
            <div className="col-status">Status</div>
            <div className="col-date">Date</div>
            <div className="col-actions">Actions</div>
          </div>

          {jobs.map(job => (
            <div key={job._id} className="table-row">
              <div className="col-title">{job.title}</div>
              <div className="col-location">{job.location}</div>
              <div className="col-status">
                <span className={`status-badge ${job.isPublished ? 'published' : 'draft'}`}>
                  {job.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>
              <div className="col-date">{new Date(job.createdAt).toLocaleDateString()}</div>
              <div className="col-actions">
                <button className="btn-icon" onClick={() => handleEdit(job)}><FaEdit /></button>
                <button className="btn-icon danger" onClick={() => handleDelete(job._id)}><FaTrash /></button>
              </div>
            </div>
          ))}

          {jobs.length === 0 && <p>No job posts yet. Create one!</p>}
        </div>
      )}
    </div>
  );
};

export default JobAdmin;