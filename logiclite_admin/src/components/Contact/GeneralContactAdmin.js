import React, { useState, useEffect } from 'react';
import { FaTrash, FaEnvelope, FaUser, FaPhone, FaRegEnvelope } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import './ContactAdmin.css';

const GeneralContactAdmin = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('https://logicallite-solutions-1.onrender.com/api/contact/admin/messages/general', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setMessages(data);
      } else {
        toast.error(data.message || 'Failed to fetch messages.');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Network error. Failed to fetch messages.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (messageId) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://logicallite-solutions-1.onrender.com/api/contact/admin/messages/general/${messageId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await response.json();
        if (response.ok) {
          toast.success(result.message);
          setMessages(prev => prev.filter(msg => msg._id !== messageId));
        } else {
          toast.error(result.message || 'Failed to delete message.');
        }
      } catch (error) {
        console.error('Error deleting message:', error);
        toast.error('Network error. Failed to delete message.');
      }
    }
  };

  return (
    <div className="contact-admin-page">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="content-header">
        <h2>General Contact Messages</h2>
      </div>
      {loading ? (
        <p>Loading messages...</p>
      ) : (
        <div className="messages-table">
          <div className="table-header">
            <div className="col-sender">Sender</div>
            <div className="col-subject">Subject</div>
            <div className="col-message">Message</div>
            <div className="col-date">Date</div>
            <div className="col-actions">Actions</div>
          </div>
          {messages.length > 0 ? (
            messages.map(msg => (
              <div key={msg._id} className="table-row">
                <div className="col-sender">
                  <div><FaUser /> {msg.name}</div>
                  <div><FaEnvelope /> {msg.email}</div>
                  {msg.phone && <div><FaPhone /> {msg.phone}</div>}
                </div>
                <div className="col-subject">{msg.subject || 'N/A'}</div>
                <div className="col-message">
                  {msg.message.length > 100 ? `${msg.message.substring(0, 100)}...` : msg.message}
                </div>
                <div className="col-date">{new Date(msg.createdAt).toLocaleDateString()}</div>
                <div className="col-actions">
                  <button className="btn-icon danger" onClick={() => handleDelete(msg._id)} title="Delete Message">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-messages">No general contact messages received yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GeneralContactAdmin;