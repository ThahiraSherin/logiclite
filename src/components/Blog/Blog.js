import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCalendar,
  FaUser,
  FaEye,
  FaHeart,
  FaArrowRight,
  FaSearch,
  FaFilter,
  FaTimes,
  FaRocket,
  FaEnvelope,
  FaSpinner,
  FaBookmark,
  FaClock,
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import { FiShare2, FiBookmark } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import './Blog.css';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showBlogDetail, setShowBlogDetail] = useState(false);
  const [error, setError] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [savedBlogs, setSavedBlogs] = useState([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isHeroTransitioning, setIsHeroTransitioning] = useState(false);
  
  const API_BASE = process.env.REACT_APP_API_URL || 'https://logicallite-solutions-1.onrender.com/api';

  // Check if blog is saved
  const isBlogSaved = (blogId) => {
    return savedBlogs.includes(blogId);
  };

  // Toggle save blog
  const toggleSaveBlog = (blogId) => {
    if (isBlogSaved(blogId)) {
      setSavedBlogs(savedBlogs.filter(id => id !== blogId));
      toast.success('Removed from saved articles');
    } else {
      setSavedBlogs([...savedBlogs, blogId]);
      toast.success('Saved for later');
    }
  };

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      let url = `${API_BASE}/blogs?page=${currentPage}&limit=9`;
      
      if (selectedCategory) {
        url += `&tag=${encodeURIComponent(selectedCategory)}`;
      }
      
      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      setBlogs(data.blogs || []);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.currentPage || 1);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Failed to load blogs. Please try again later.');
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [API_BASE, currentPage, selectedCategory, searchTerm]);

  const fetchFeaturedBlogs = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/blogs/featured`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setFeaturedBlogs(data || []);
    } catch (error) {
      console.error('Error fetching featured blogs:', error);
      setFeaturedBlogs([]);
    }
  }, [API_BASE]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/blogs/tags`);
      
      if (response.ok) {
        const data = await response.json();
        setCategories(data.tags || []);
        return;
      }
      
      // Fallback if tags endpoint doesn't exist
      const blogResponse = await fetch(`${API_BASE}/blogs?limit=50`);
      
      if (!blogResponse.ok) {
        throw new Error(`HTTP error! status: ${blogResponse.status}`);
      }
      
      const blogData = await blogResponse.json();
      
      const allTags = blogData.blogs.reduce((tags, blog) => {
        if (blog.tags && Array.isArray(blog.tags)) {
          return [...tags, ...blog.tags];
        }
        return tags;
      }, []);
      
      const uniqueTags = [...new Set(allTags)].filter(tag => tag && tag.trim() !== '');
      setCategories(uniqueTags);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  }, [API_BASE]);

  useEffect(() => {
    fetchBlogs();
    fetchFeaturedBlogs();
    fetchCategories();
  }, [currentPage, selectedCategory, searchTerm, fetchBlogs, fetchFeaturedBlogs, fetchCategories]);

  // Hero carousel auto-rotation
  useEffect(() => {
    if (featuredBlogs.length > 0) {
      const interval = setInterval(() => {
        setCurrentHeroIndex((prevIndex) => 
          prevIndex === featuredBlogs.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Change slide every 5 seconds
      
      return () => clearInterval(interval);
    }
  }, [featuredBlogs.length]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setShowMobileFilters(false);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleReadMore = async (blog) => {
    try {
      await fetch(`${API_BASE}/blogs/${blog._id}/view`, { method: 'POST' });
      
      setBlogs(prevBlogs => prevBlogs.map(b => b._id === blog._id ? { ...b, views: (b.views || 0) + 1 } : b));
      setFeaturedBlogs(prevFeatured => prevFeatured.map(b => b._id === blog._id ? { ...b, views: (b.views || 0) + 1 } : b));
      
      setSelectedBlog({ ...blog, views: (blog.views || 0) + 1 });
      setShowBlogDetail(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error updating view count:', error);
      setSelectedBlog(blog);
      setShowBlogDetail(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handleLike = async (blog) => {
    try {
      const response = await fetch(`${API_BASE}/blogs/${blog._id}/like`, {
        method: 'POST'
      });
      
      if (response.ok) {
        const updatedBlog = await response.json();
        setBlogs(prevBlogs => prevBlogs.map(b => b._id === blog._id ? updatedBlog : b));
        setFeaturedBlogs(prevFeatured => prevFeatured.map(b => b._id === blog._id ? updatedBlog : b));
        if (selectedBlog && selectedBlog._id === blog._id) {
          setSelectedBlog(updatedBlog);
        }
        toast.success('You liked this post!');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to like post.');
      }
    } catch (error) {
      console.error('Error liking post:', error);
      toast.error('Network error. Failed to like post.');
    }
  };

  const handleShare = async (blog) => {
    const shareData = {
      title: blog.title,
      text: blog.excerpt,
      url: `${window.location.origin}/blog/${blog._id}`
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success('Blog post shared successfully!');
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast.success('Blog link copied to clipboard!');
      }
      
      // Track share event
      await fetch(`${API_BASE}/blogs/${blog._id}/share`, { method: 'POST' });
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error sharing:', error);
        toast.error('Failed to share.');
      }
    }
  };

  const handleBackToList = () => {
    setShowBlogDetail(false);
    setSelectedBlog(null);
  };

  const handleHeroNavigation = (direction) => {
    if (isHeroTransitioning) return;
    
    setIsHeroTransitioning(true);
    if (direction === 'next') {
      setCurrentHeroIndex(prev => 
        prev === featuredBlogs.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentHeroIndex(prev => 
        prev === 0 ? featuredBlogs.length - 1 : prev - 1
      );
    }
    
    // Reset transitioning state after animation completes
    setTimeout(() => setIsHeroTransitioning(false), 500);
  };

  const handleHeroDotClick = (index) => {
    if (isHeroTransitioning) return;
    
    setIsHeroTransitioning(true);
    setCurrentHeroIndex(index);
    
    // Reset transitioning state after animation completes
    setTimeout(() => setIsHeroTransitioning(false), 500);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const truncateText = (text, wordCount) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length > wordCount) {
      return words.slice(0, wordCount).join(' ') + '...';
    }
    return text;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  if (loading && blogs.length === 0) {
    return (
      <div className="blog-loading">
        <div className="loading-spinner">
          <FaSpinner className="spinner-icon" />
        </div>
        <p>Loading blogs...</p>
      </div>
    );
  }

  if (showBlogDetail && selectedBlog) {
    return (
      <div className="blog-detail">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="container">
          <motion.button 
            className="back-button"
            onClick={handleBackToList}
            whileHover={{ x: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <FaArrowLeft /> Back to Blogs
          </motion.button>
          
          <motion.article 
            className="blog-article"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <header className="article-header">
              <h1>{selectedBlog.title}</h1>
              <div className="article-meta">
                <span><FaCalendar /> {formatDate(selectedBlog.createdAt)}</span>
                <span><FaUser /> {selectedBlog.author || 'Admin'}</span>
                {selectedBlog.views !== undefined && (
                  <span><FaEye /> {selectedBlog.views.toLocaleString()} views</span>
                )}
                {selectedBlog.likes !== undefined && (
                  <span><FaHeart /> {selectedBlog.likes.toLocaleString()} likes</span>
                )}
                {selectedBlog.readingTime && (
                  <span><FaClock /> {selectedBlog.readingTime} min read</span>
                )}
              </div>
              {selectedBlog.tags && selectedBlog.tags.length > 0 && (
                <div className="article-tags">
                  {selectedBlog.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </header>
            
            {selectedBlog.featuredImage && (
              <div className="article-image">
                <img
                  src={selectedBlog.featuredImage}
                  alt={selectedBlog.title}
                  loading="lazy"
                />
              </div>
            )}
            
            <div className="article-content">
              <p>{selectedBlog.content}</p>
            </div>
            
            <footer className="article-footer">
              <div className="article-actions">
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className={`btn ${selectedBlog.liked ? 'btn-liked' : 'btn-primary'}`} 
                  onClick={() => handleLike(selectedBlog)}
                >
                  <FaHeart /> Like ({selectedBlog.likes || 0})
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-secondary" 
                  onClick={() => handleShare(selectedBlog)}
                >
                  <FiShare2 /> Share
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className={`btn ${isBlogSaved(selectedBlog._id) ? 'btn-saved' : 'btn-secondary'}`}
                  onClick={() => toggleSaveBlog(selectedBlog._id)}
                >
                  {isBlogSaved(selectedBlog._id) ? <FaBookmark /> : <FiBookmark />} 
                  {isBlogSaved(selectedBlog._id) ? 'Saved' : 'Save'}
                </motion.button>
              </div>
            </footer>
          </motion.article>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Hero Section with Carousel */}
      <section className="blog-hero">
        <div className="hero-background-pattern"></div>
        <div className="container">
          <div className="blog-hero-content">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              LogicLite <span className="highlight">Blog</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Insights, tutorials, and news from the world of technology and development
            </motion.p>
          </div>
          
          {/* Featured Articles Carousel */}
          {featuredBlogs.length > 0 && (
            <div className="hero-carousel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHeroIndex}
                  className="hero-carousel-item"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="hero-article">
                    <div className="hero-article-image">
                      <img
                        src={featuredBlogs[currentHeroIndex].featuredImage}
                        alt={featuredBlogs[currentHeroIndex].title}
                      />
                      <div className="hero-badge">Featured</div>
                    </div>
                    <div className="hero-article-content">
                      <div className="hero-article-meta">
                        <span><FaCalendar /> {formatDate(featuredBlogs[currentHeroIndex].createdAt)}</span>
                        <span><FaUser /> {featuredBlogs[currentHeroIndex].author || 'Admin'}</span>
                      </div>
                      <h2>{featuredBlogs[currentHeroIndex].title}</h2>
                      <p>{truncateText(featuredBlogs[currentHeroIndex].excerpt, 25)}</p>
                      <button 
                        onClick={() => handleReadMore(featuredBlogs[currentHeroIndex])} 
                        className="btn btn-primary"
                      >
                        Read Article <FaArrowRight />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Carousel Navigation */}
              {featuredBlogs.length > 1 && (
                <>
                  <button 
                    className="carousel-nav carousel-prev"
                    onClick={() => handleHeroNavigation('prev')}
                  >
                    <FaChevronLeft />
                  </button>
                  <button 
                    className="carousel-nav carousel-next"
                    onClick={() => handleHeroNavigation('next')}
                  >
                    <FaChevronRight />
                  </button>
                  
                  <div className="carousel-dots">
                    {featuredBlogs.map((_, index) => (
                      <button
                        key={index}
                        className={`carousel-dot ${index === currentHeroIndex ? 'active' : ''}`}
                        onClick={() => handleHeroDotClick(index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Rest of the component remains the same */}
      {/* Search and Filter Section */}
      <section className="blog-filters">
        <div className="container">
          <div className="filters-container">
            <motion.form 
              onSubmit={handleSearch} 
              className="search-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className={`search-input-group ${isSearchFocused ? 'focused' : ''}`}>
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                {searchTerm && (
                  <button 
                    type="button" 
                    className="clear-search"
                    onClick={() => setSearchTerm('')}
                  >
                    <FaTimes />
                  </button>
                )}
                <button type="submit" className="btn-search">Search</button>
              </div>
            </motion.form>
            
            <div className="filter-controls">
              <button 
                className="mobile-filter-toggle"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <FaFilter /> Filters
              </button>
              
              {(selectedCategory || searchTerm) && (
                <div className="active-filters">
                  {selectedCategory && (
                    <span className="active-filter">
                      Category: {selectedCategory}
                      <button onClick={() => setSelectedCategory('')}>
                        <FaTimes />
                      </button>
                    </span>
                  )}
                  {searchTerm && (
                    <span className="active-filter">
                      Search: {searchTerm}
                      <button onClick={() => setSearchTerm('')}>
                        <FaTimes />
                      </button>
                    </span>
                  )}
                  <button className="clear-filters-btn" onClick={clearFilters}>
                    Clear All
                  </button>
                </div>
              )}
            </div>
            
            <div className={`category-filters ${showMobileFilters ? 'mobile-visible' : ''}`}>
              <div className="mobile-filter-header">
                <h3>Categories</h3>
                <button onClick={() => setShowMobileFilters(false)}>
                  <FaTimes />
                </button>
              </div>
              
              <button
                className={!selectedCategory ? 'active' : ''}
                onClick={() => handleCategorySelect('')}
              >
                All Topics
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  className={selectedCategory === category ? 'active' : ''}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <motion.div 
          className="error-message"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="container">
            <p>{error}</p>
            <button onClick={fetchBlogs} className="btn btn-primary">
              Try Again
            </button>
          </div>
        </motion.div>
      )}

      {/* Featured Blogs */}
      {featuredBlogs.length > 0 && (
        <section id="featured" className="featured-blogs">
          <div className="container">
            <motion.div 
              className="section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="section-title">Featured Articles</h2>
              <p>Discover our most popular and insightful content</p>
            </motion.div>
            
            <motion.div 
              className="featured-blogs-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {featuredBlogs.map((blog, index) => (
                <motion.article
                  key={blog._id || index}
                  className="featured-blog-card"
                  variants={itemVariants}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                >
                  <div className="blog-image">
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      loading="lazy"
                    />
                    <div className="blog-badge">Featured</div>
                    <div className="blog-overlay"></div>
                    <button 
                      className={`save-button ${isBlogSaved(blog._id) ? 'saved' : ''}`}
                      onClick={() => toggleSaveBlog(blog._id)}
                    >
                      {isBlogSaved(blog._id) ? <FaBookmark /> : <FiBookmark />}
                    </button>
                  </div>
                  <div className="blog-content">
                    <div className="blog-meta">
                      <span><FaCalendar /> {formatDate(blog.createdAt)}</span>
                      <span><FaUser /> {blog.author || 'Admin'}</span>
                    </div>
                    <h3>{blog.title}</h3>
                    <p>{truncateText(blog.excerpt, 20)}</p>
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="blog-tags">
                        {blog.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>
                    )}
                    <div className="blog-stats">
                      <span><FaEye /> {blog.views?.toLocaleString() || '0'}</span>
                      <span><FaHeart /> {blog.likes?.toLocaleString() || '0'}</span>
                      {blog.readingTime && <span><FaClock /> {blog.readingTime} min</span>}
                    </div>
                    <button onClick={() => handleReadMore(blog)} className="read-more">
                      Read More <FaArrowRight />
                    </button>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* All Blogs */}
      <section className="all-blogs">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="section-title">Latest Articles</h2>
            <p>Explore our newest content on technology and development</p>
          </motion.div>
          
          {blogs.length === 0 && !loading ? (
            <motion.div 
              className="no-blogs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="no-blogs-icon">
                <FaSearch />
              </div>
              <h3>No articles found</h3>
              <p>Try adjusting your search or filter criteria</p>
              <button onClick={clearFilters} className="btn btn-primary">
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <>
              <motion.div 
                className="blogs-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                <AnimatePresence>
                  {blogs.map((blog, index) => (
                    <motion.article
                      key={blog._id || index}
                      className="blog-card"
                      variants={itemVariants}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      layout
                    >
                      <div className="blog-image">
                        <img
                          src={blog.featuredImage}
                          alt={blog.title}
                          loading="lazy"
                        />
                        <div className="blog-overlay"></div>
                        <button 
                          className={`save-button ${isBlogSaved(blog._id) ? 'saved' : ''}`}
                          onClick={() => toggleSaveBlog(blog._id)}
                        >
                          {isBlogSaved(blog._id) ? <FaBookmark /> : <FiBookmark />}
                        </button>
                      </div>
                      <div className="blog-content">
                        <div className="blog-meta">
                          <span><FaCalendar /> {formatDate(blog.createdAt)}</span>
                          <span><FaUser /> {blog.author || 'Admin'}</span>
                        </div>
                        <h3>{blog.title}</h3>
                        <p>{truncateText(blog.excerpt, 25)}</p>
                        {blog.tags && blog.tags.length > 0 && (
                          <div className="blog-tags">
                            {blog.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="tag">{tag}</span>
                            ))}
                          </div>
                        )}
                        <div className="blog-stats">
                          <span><FaEye /> {blog.views?.toLocaleString() || '0'}</span>
                          <span><FaHeart /> {blog.likes?.toLocaleString() || '0'}</span>
                          {blog.readingTime && <span><FaClock /> {blog.readingTime} min</span>}
                        </div>
                        <button onClick={() => handleReadMore(blog)} className="read-more">
                          Read More <FaArrowRight />
                        </button>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div 
                  className="pagination"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="pagination-btn"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    if (pageNum > 0 && pageNum <= totalPages) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                    return null;
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="pagination-btn"
                  >
                    Next
                  </button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="blog-newsletter">
        <div className="container">
          <motion.div 
            className="newsletter-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="newsletter-icon">
              <FaRocket />
            </div>
            <h2>Stay Updated with LogicLite</h2>
            <p>Subscribe to our newsletter to receive the latest articles, tutorials, and industry insights</p>
            <form className="newsletter-form">
              <div className="newsletter-input-group">
                <FaEnvelope className="newsletter-icon-input" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Subscribe Now</button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;