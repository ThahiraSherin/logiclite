const express = require('express');
const {
  getBlogs,
  getBlogBySlug,
  getFeaturedBlogs,
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  incrementViews,
  incrementLikes,
} = require('../controllers/blogController');
const { auth } = require('../middleware/auth');
const { validateBlog } = require('../middleware/validation');
const upload = require('../middleware/upload');

const router = express.Router();

// ---------------- PUBLIC ROUTES ----------------
router.get('/', getBlogs);
router.get('/featured', getFeaturedBlogs);
router.get('/:slug', getBlogBySlug);

// New public route to increment views
// This route is open to all users, so it does not need the 'auth' middleware.
router.post('/:id/view', incrementViews);

// New public route to increment likes
// The authentication check for this route is handled on the client-side, 
// so it does not need the 'auth' middleware on the backend.
router.post('/:id/like', incrementLikes);

// ---------------- PROTECTED ROUTES ----------------
router.get('/admin/blogs', auth, getAdminBlogs);

// Create a new blog
router.post(
  '/admin/blogs',
  auth,
  upload.single('featuredImage'),
  normalizeBlogData,
  validateBlog,
  createBlog
);

// Update a blog
router.put(
  '/admin/blogs/:id',
  auth,
  upload.single('featuredImage'),
  normalizeBlogData,
  validateBlog,
  updateBlog
);

// Delete a blog
router.delete('/admin/blogs/:id', auth, deleteBlog);

module.exports = router;

// ---------------- EXTRA MIDDLEWARE ----------------
function normalizeBlogData(req, res, next) {
  try {
    // Convert tags into array
    if (req.body.tags) {
      try {
        req.body.tags = JSON.parse(req.body.tags);
      } catch {
        req.body.tags = req.body.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0);
      }
    }

    // Convert isFeatured into boolean
    if (req.body.isFeatured !== undefined) {
      req.body.isFeatured =
        req.body.isFeatured === 'true' ||
        req.body.isFeatured === true ||
        req.body.isFeatured === 'on';
    }

    next();
  } catch (err) {
    console.error('Normalize blog data error:', err);
    res.status(400).json({ message: 'Invalid blog data format' });
  }
}