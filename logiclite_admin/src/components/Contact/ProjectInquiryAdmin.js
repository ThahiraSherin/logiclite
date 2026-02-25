import React, { useState, useEffect } from 'react';
import { FaTrash, FaEnvelope, FaUser, FaPhone, FaRegEnvelope, FaToolbox } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import './ContactAdmin.css';

const ProjectInquiryAdmin = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('https://logicallite-solutions-1.onrender.com/api/contact/admin/messages/project', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setInquiries(data);
      } else {
        toast.error(data.message || 'Failed to fetch inquiries.');
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast.error('Network error. Failed to fetch inquiries.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (inquiryId) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://logicallite-solutions-1.onrender.com/api/contact/admin/messages/project/${inquiryId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await response.json();
        if (response.ok) {
          toast.success(result.message);
          setInquiries(prev => prev.filter(inq => inq._id !== inquiryId));
        } else {
          toast.error(result.message || 'Failed to delete inquiry.');
        }
      } catch (error) {
        console.error('Error deleting inquiry:', error);
        toast.error('Network error. Failed to delete inquiry.');
      }
    }
  };

  return (
    <div className="contact-admin-page">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="content-header">
        <h2>Project Inquiries</h2>
      </div>
      {loading ? (
        <p>Loading inquiries...</p>
      ) : (
        <div className="messages-table">
          <div className="table-header">
            <div className="col-sender">Sender</div>
            <div className="col-subject">Service</div>
            <div className="col-message">Message</div>
            <div className="col-date">Date</div>
            <div className="col-actions">Actions</div>
          </div>
          {inquiries.length > 0 ? (
            inquiries.map(inq => (
              <div key={inq._id} className="table-row">
                <div className="col-sender">
                  <div><FaUser /> {inq.name}</div>
                  <div><FaEnvelope /> {inq.email}</div>
                  {inq.phone && <div><FaPhone /> {inq.phone}</div>}
                </div>
                <div className="col-subject">{inq.service || 'N/A'}</div>
                <div className="col-message">
                  {inq.message.length > 100 ? `${inq.message.substring(0, 100)}...` : inq.message}
                </div>
                <div className="col-date">{new Date(inq.createdAt).toLocaleDateString()}</div>
                <div className="col-actions">
                  <button className="btn-icon danger" onClick={() => handleDelete(inq._id)} title="Delete Inquiry">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-messages">No project inquiries received yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectInquiryAdmin;