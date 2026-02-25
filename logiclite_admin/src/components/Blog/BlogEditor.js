// components/Blog/BlogEditor.js
import React, { useState, useEffect } from 'react';
import { FaTimes, FaSave, FaImage } from 'react-icons/fa';
import './BlogEditor.css';

const API_BASE = "https://logicallite-solutions-1.onrender.com";

const BlogEditor = ({ blog, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    status: 'draft',
    isFeatured: false,
    featuredImage: null
  });
  const [previewImage, setPreviewImage] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || '',
        content: blog.content || '',
        excerpt: blog.excerpt || '',
        tags: blog.tags ? blog.tags.join(', ') : '',
        status: blog.status || 'draft',
        isFeatured: blog.isFeatured || false,
        featuredImage: null
      });
      if (blog.featuredImage) {
        setPreviewImage(blog.featuredImage); // Cloudinary ka full URL aayega
      }
    }
  }, [blog]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, featuredImage: file }));
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();

      Object.keys(formData).forEach(key => {
        if (key === 'tags') {
          formDataToSend.append(key, formData[key]);
        } else if (key === 'featuredImage' && formData[key]) {
          formDataToSend.append(key, formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      const url = blog 
        ? `${API_BASE}/api/blogs/admin/blogs/${blog._id}`
        : `${API_BASE}/api/blogs/admin/blogs`;
      
      const method = blog ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      if (response.ok) {
        alert(blog ? 'Blog updated successfully!' : 'Blog created successfully!');
        onClose();
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error saving blog');
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Error saving blog. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="blog-editor-overlay">
      <div className="blog-editor">
        <div className="editor-header">
          <h2>{blog ? 'Edit Article' : 'Create New Article'}</h2>
          <button onClick={onClose} className="close-btn">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="editor-form">
          {/* Title & Status */}
          <div className="form-row">
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
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          {/* Excerpt */}
          <div className="form-group">
            <label htmlFor="excerpt">Excerpt *</label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              rows="3"
              required
            />
          </div>

          {/* Content */}
          <div className="form-group">
            <label htmlFor="content">Content *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows="10"
              required
            />
          </div>

          {/* Tags + Featured */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tags">Tags (comma-separated)</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="Technology, Web Development, Design"
              />
            </div>
            
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                />
                Featured Article
              </label>
            </div>
          </div>

          {/* Image Upload */}
          <div className="form-group">
            <label htmlFor="featuredImage">Featured Image</label>
            <div className="image-upload">
              <input
                type="file"
                id="featuredImage"
                name="featuredImage"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
              />
              <label htmlFor="featuredImage" className="upload-btn">
                <FaImage /> Choose Image
              </label>
              
              {previewImage && (
                <div className="image-preview">
                  <img src={previewImage} alt="Preview" />
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
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
              {saving ? 'Saving...' : 'Save Article'} <FaSave />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogEditor;