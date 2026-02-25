// components/Blog/BlogAdmin.js
import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import BlogEditor from './BlogEditor';
import './BlogAdmin.css';

const API_BASE = "https://logicallite-solutions-1.onrender.com";

const BlogAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, [showEditor]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/api/blogs/admin/blogs`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setShowEditor(true);
  };

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE}/api/blogs/admin/blogs/${blogId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          setBlogs(blogs.filter(blog => blog._id !== blogId));
          alert('Blog deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  if (showEditor) {
    return (
      <BlogEditor
        blog={editingBlog}
        onClose={() => {
          setShowEditor(false);
          setEditingBlog(null);
          fetchBlogs();
        }}
      />
    );
  }

  return (
    <div className="blogs-content">
      <div className="content-header">
        <h2>Manage Articles</h2>
        <button className="btn-primary" onClick={() => setShowEditor(true)}>
          <FaPlus /> New Article
        </button>
      </div>

      {loading ? (
        <p>Loading articles...</p>
      ) : (
        <div className="blogs-table">
          <div className="table-header">
            <div className="col-title">Title</div>
            <div className="col-status">Status</div>
            <div className="col-date">Date</div>
            <div className="col-actions">Actions</div>
          </div>

          {blogs.map(blog => (
            <div key={blog._id} className="table-row">
              <div className="col-title">
                <h4>{blog.title}</h4>
                <p>{blog.excerpt?.substring(0, 60)}...</p>
              </div>
              <div className="col-status">
                <span className={`status-badge ${blog.status}`}>{blog.status}</span>
              </div>
              <div className="col-date">{new Date(blog.createdAt).toLocaleDateString()}</div>
              <div className="col-actions">
                <button className="btn-icon" onClick={() => handleEdit(blog)}><FaEdit /></button>
                <button className="btn-icon danger" onClick={() => handleDelete(blog._id)}><FaTrash /></button>
              </div>
            </div>
          ))}

          {blogs.length === 0 && <p>No articles yet. Create one!</p>}
        </div>
      )}
    </div>
  );
};

export default BlogAdmin;