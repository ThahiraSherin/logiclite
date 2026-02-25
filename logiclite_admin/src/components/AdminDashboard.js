import React, { useState, useEffect, useCallback } from 'react';
import {
  FaEye, FaChartLine, FaFileAlt, FaSignOutAlt, FaHeart, FaBriefcase, FaListAlt,
  FaRegEnvelope, FaEnvelopeOpenText, FaUser, FaEnvelope, FaTrash, FaPhone
} from 'react-icons/fa';
import BlogAdmin from './Blog/BlogAdmin';
import JobAdmin from './Career/JobAdmin';
import JobApplicationAdmin from './Career/JobApplicationAdmin';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeContactSubTab, setActiveContactSubTab] = useState('general');
  const [blogs, setBlogs] = useState([]);
  const [generalMessages, setGeneralMessages] = useState([]);
  const [projectInquiries, setProjectInquiries] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [loadingGeneralMessages, setLoadingGeneralMessages] = useState(true);
  const [loadingProjectInquiries, setLoadingProjectInquiries] = useState(true);

  const [stats, setStats] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    totalViews: 0,
    totalLikes: 0,
    totalGeneralMessages: 0,
    totalProjectInquiries: 0
  });

  const calculateBlogStats = useCallback(() => {
    const totalBlogs = blogs.length;
    const publishedBlogs = blogs.filter(blog => blog.status === 'published').length;
    const draftBlogs = blogs.filter(blog => blog.status === 'draft').length;
    const totalViews = blogs.reduce((sum, blog) => sum + (blog.views || 0), 0);
    const totalLikes = blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0);
    setStats(prevStats => ({ ...prevStats, totalBlogs, publishedBlogs, draftBlogs, totalViews, totalLikes }));
  }, [blogs]);

  const calculateContactStats = useCallback(() => {
    setStats(prevStats => ({ 
      ...prevStats, 
      totalGeneralMessages: generalMessages.length,
      totalProjectInquiries: projectInquiries.length
    }));
  }, [generalMessages, projectInquiries]);

  useEffect(() => {
    if (activeTab === 'dashboard') {
      fetchBlogs();
      fetchGeneralMessages();
      fetchProjectInquiries();
    }
  }, [activeTab]);

  useEffect(() => {
    if (blogs.length > 0) {
      calculateBlogStats();
    }
  }, [blogs, calculateBlogStats]);
  
  useEffect(() => {
    calculateContactStats();
  }, [generalMessages, projectInquiries, calculateContactStats]);

  const fetchBlogs = async () => {
    try {
      setLoadingBlogs(true);
      const token = localStorage.getItem('token');
      const response = await fetch('https://logicallite-solutions-1.onrender.com/api/blogs/admin/blogs', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoadingBlogs(false);
    }
  };

  const fetchGeneralMessages = async () => {
    try {
      setLoadingGeneralMessages(true);
      const token = localStorage.getItem('token');
      const response = await fetch('https://logicallite-solutions-1.onrender.com/api/contact/admin/messages/general', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setGeneralMessages(data);
      } else {
        console.error('Failed to fetch general messages');
      }
    } catch (error) {
      console.error('Error fetching general messages:', error);
    } finally {
      setLoadingGeneralMessages(false);
    }
  };
  
  const fetchProjectInquiries = async () => {
    try {
      setLoadingProjectInquiries(true);
      const token = localStorage.getItem('token');
      const response = await fetch('https://logicallite-solutions-1.onrender.com/api/contact/admin/messages/project', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setProjectInquiries(data);
      } else {
        console.error('Failed to fetch project inquiries');
      }
    } catch (error) {
      console.error('Error fetching project inquiries:', error);
    } finally {
      setLoadingProjectInquiries(false);
    }
  };

  const deleteGeneralMessage = async (messageId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://logicallite-solutions-1.onrender.com/api/contact/admin/messages/general/${messageId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        setGeneralMessages(prev => prev.filter(msg => msg._id !== messageId));
        console.log('Message deleted successfully');
      } else {
        console.error('Failed to delete message');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const deleteProjectInquiry = async (inquiryId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://logicallite-solutions-1.onrender.com/api/contact/admin/messages/project/${inquiryId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        setProjectInquiries(prev => prev.filter(inq => inq._id !== inquiryId));
        console.log('Inquiry deleted successfully');
      } else {
        console.error('Failed to delete inquiry');
      }
    } catch (error) {
      console.error('Error deleting inquiry:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const renderDashboard = () => (
    <div className="dashboard-content">
      <h2>Dashboard Overview</h2>
      {loadingBlogs || loadingGeneralMessages || loadingProjectInquiries ? (
        <p>Loading...</p>
      ) : (
        <div className="stats-grid">
          <div className="stat-card"><FaFileAlt /><h3>{stats.totalBlogs}</h3><p>Total Articles</p></div>
          <div className="stat-card"><FaEye /><h3>{stats.publishedBlogs}</h3><p>Published</p></div>
          <div className="stat-card"><FaFileAlt /><h3>{stats.draftBlogs}</h3><p>Drafts</p></div>
          <div className="stat-card"><FaChartLine /><h3>{stats.totalViews}</h3><p>Total Views</p></div>
          <div className="stat-card"><FaHeart /><h3>{stats.totalLikes}</h3><p>Total Likes</p></div>
          <div className="stat-card"><FaRegEnvelope /><h3>{stats.totalGeneralMessages}</h3><p>General Messages</p></div>
          <div className="stat-card"><FaEnvelopeOpenText /><h3>{stats.totalProjectInquiries}</h3><p>Project Inquiries</p></div>
        </div>
      )}
    </div>
  );

  const renderGeneralContactAdmin = () => (
    <div className="contact-admin-page">
      <div className="content-header">
        <h2>General Contact Messages</h2>
      </div>
      {loadingGeneralMessages ? (
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
          {generalMessages.length > 0 ? (
            generalMessages.map(msg => (
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
                  <button 
                    className="btn-icon danger" 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this message?')) {
                        deleteGeneralMessage(msg._id);
                      }
                    }} 
                    title="Delete Message"
                  >
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

  const renderProjectInquiryAdmin = () => (
    <div className="contact-admin-page">
      <div className="content-header">
        <h2>Project Inquiries</h2>
      </div>
      {loadingProjectInquiries ? (
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
          {projectInquiries.length > 0 ? (
            projectInquiries.map(inq => (
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
                  <button 
                    className="btn-icon danger" 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this inquiry?')) {
                        deleteProjectInquiry(inq._id);
                      }
                    }} 
                    title="Delete Inquiry"
                  >
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

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="sidebar-header"><h2>LogicLite Admin</h2></div>
        <nav className="sidebar-nav">
          <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}><FaChartLine /> Dashboard</button>
          <button className={activeTab === 'blogs' ? 'active' : ''} onClick={() => setActiveTab('blogs')}><FaFileAlt /> Articles</button>
          <button className={activeTab === 'jobs' ? 'active' : ''} onClick={() => setActiveTab('jobs')}><FaBriefcase /> Job Posts</button>
          <button className={activeTab === 'applications' ? 'active' : ''} onClick={() => setActiveTab('applications')}><FaListAlt /> Applications</button>
          <button className={activeTab === 'contact' ? 'active' : ''} onClick={() => setActiveTab('contact')}><FaRegEnvelope /> Contact</button>
        </nav>
        <div className="sidebar-footer"><button onClick={handleLogout}><FaSignOutAlt /> Logout</button></div>
      </div>

      <div className="admin-main">
        <header className="admin-header">
          <h1>{
            activeTab === 'dashboard' ? 'Dashboard' :
            activeTab === 'blogs' ? 'Article Management' :
            activeTab === 'jobs' ? 'Job Management' :
            activeTab === 'applications' ? 'Applications' :
            'Contact'
          }</h1>
          <div className="user-info"><span>Welcome, Admin</span></div>
        </header>
        <div className="admin-content">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'blogs' && <BlogAdmin />}
          {activeTab === 'jobs' && <JobAdmin />}
          {activeTab === 'applications' && <JobApplicationAdmin />}
          {activeTab === 'contact' && (
            <>
              <div className="contact-sub-menu">
                <button
                  className={activeContactSubTab === 'general' ? 'sub-active' : ''}
                  onClick={() => setActiveContactSubTab('general')}
                >
                  General Messages
                </button>
                <button
                  className={activeContactSubTab === 'projects' ? 'sub-active' : ''}
                  onClick={() => setActiveContactSubTab('projects')}
                >
                  Project Inquiries
                </button>
              </div>
              {activeContactSubTab === 'general' && renderGeneralContactAdmin()}
              {activeContactSubTab === 'projects' && renderProjectInquiryAdmin()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;