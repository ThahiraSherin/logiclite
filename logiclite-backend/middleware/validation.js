// middleware/validation.js

// Blog validation middleware
const validateBlog = (req, res, next) => {
  const { title, content, excerpt } = req.body;

  const errors = [];

  // Validate title
  if (!title || title.trim().length < 5) {
    errors.push('Title is required and should be at least 5 characters long.');
  }

  // Validate content
  if (!content || content.trim().length < 50) {
    errors.push('Content is required and should be at least 50 characters long.');
  }

  // Validate excerpt
  if (!excerpt || excerpt.trim().length < 10) {
    errors.push('Excerpt is required and should be at least 10 characters long.');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors,
    });
  }

  next();
};

module.exports = { validateBlog };
