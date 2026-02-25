// src/components/Career/JobApplicationAdmin.js
import React, { useState, useEffect } from 'react';
import { FaDownload, FaEnvelope, FaUser, FaTrash, FaFileExcel } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import './JobApplicationAdmin.css';

const JobApplicationAdmin = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('https://logicallite-solutions-1.onrender.com/api/applications/admin/applications', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (resumePath) => {
    const url = `https://logicallite-solutions-1.onrender.com${resumePath}`;
    window.open(url, '_blank');
  };

  const handleDeleteApplication = async (applicationId) => {
    if (!window.confirm('Are you sure you want to delete this application? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://logicallite-solutions-1.onrender.com/api/applications/admin/applications/${applicationId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setApplications(prev => prev.filter(app => app._id !== applicationId));
        console.log('Application deleted successfully');
      } else {
        console.error('Failed to delete application');
        alert('Failed to delete application. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting application:', error);
      alert('Error deleting application. Please try again.');
    }
  };

  const exportToExcel = () => {
    // Prepare data for Excel export
    const excelData = applications.map(app => ({
      'Job Title': app.jobTitle,
      'Applicant Name': app.name,
      'Email': app.email,
      'Phone': app.phone || 'N/A',
      'Applied Date': new Date(app.createdAt).toLocaleDateString(),
      'Status': app.status,
      'Experience': app.experience || 'N/A',
      'Skills': app.skills ? app.skills.join(', ') : 'N/A',
      'Cover Letter': app.coverLetter || 'N/A'
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    
    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Job Applications');
    
    // Generate Excel file
    const fileName = `job-applications-${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className="job-applications-page">
      <div className="content-header">
        <h2>Manage Job Applications</h2>
        <button 
          className="btn-excel"
          onClick={exportToExcel}
          disabled={applications.length === 0}
          title="Download as Excel"
        >
          <FaFileExcel /> Export to Excel
        </button>
      </div>

      {loading ? (
        <p>Loading applications...</p>
      ) : (
        <div className="applications-table">
          <div className="table-header">
            <div className="col-job">Job Title</div>
            <div className="col-applicant">Applicant</div>
            <div className="col-date">Date</div>
            <div className="col-status">Status</div>
            <div className="col-actions">Actions</div>
          </div>

          {applications.map(app => (
            <div key={app._id} className="table-row">
              <div className="col-job">{app.jobTitle}</div>
              <div className="col-applicant">
                <div><FaUser /> {app.name}</div>
                <div><FaEnvelope /> {app.email}</div>
                {app.phone && <div>📞 {app.phone}</div>}
              </div>
              <div className="col-date">{new Date(app.createdAt).toLocaleDateString()}</div>
              <div className="col-status">
                <span className={`status-badge ${app.status}`}>{app.status}</span>
              </div>
              <div className="col-actions">
                <button
                  className="btn-icon"
                  onClick={() => handleDownload(app.resumePath)}
                  title="Download Resume"
                >
                  <FaDownload />
                </button>
                <button
                  className="btn-icon danger"
                  onClick={() => handleDeleteApplication(app._id)}
                  title="Delete Application"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
          
          {applications.length === 0 && <p className="no-applications">No applications submitted yet.</p>}
        </div>
      )}
    </div>
  );
};

export default JobApplicationAdmin;