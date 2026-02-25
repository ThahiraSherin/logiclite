const Blog = require('../models/Blog');
const slugify = require('slugify');
const cloudinary = require('../config/cloudinary'); // Cloudinary config import

// ---------------- Helper Function ----------------
function extractPublicIdFromUrl(url) {
  if (!url) return null;
  const parts = url.split('/upload/');
  if (parts.length < 2) return null;
  let after = parts[1]; // "v12345/folder/name.jpg"
  after = after.replace(/^v\d+\//, ''); // remove version
  const lastDot = after.lastIndexOf('.');
  if (lastDot !== -1) after = after.substring(0, lastDot);
  return after; // returns "folder/name"
}

// ---------------- GET BLOGS WITH PAGINATION ----------------
const getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    let query = { status: 'published' };

    if (req.query.tag) {
      query.tags = { $in: [req.query.tag] };
    }

    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Blog.countDocuments(query);

    res.json({
      blogs,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalBlogs: total,
    });
  } catch (error) {
    console.error('Get blogs error:', error.message);
    res.status(500).json({ message: 'Server error while fetching blogs' });
  }
};

// ---------------- GET BLOG BY SLUG ----------------
const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      status: 'published',
    });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    blog.views += 1;
    await blog.save();

    res.json(blog);
  } catch (error) {
    console.error('Get blog error:', error.message);
    res.status(500).json({ message: 'Server error while fetching blog' });
  }
};

// ---------------- GET FEATURED BLOGS ----------------
const getFeaturedBlogs = async (req, res) => {
  try {
    const featuredBlogs = await Blog.find({
      status: 'published',
      isFeatured: true,
    })
      .limit(3)
      .sort({ createdAt: -1 });

    res.json(featuredBlogs);
  } catch (error) {
    console.error('Get featured blogs error:', error.message);
    res.status(500).json({ message: 'Server error while fetching featured blogs' });
  }
};

// ---------------- GET ADMIN BLOGS ----------------
const getAdminBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ authorId: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(blogs);
  } catch (error) {
    console.error('Get admin blogs error:', error.message);
    res.status(500).json({ message: 'Server error while fetching admin blogs' });
  }
};

// ---------------- CREATE BLOG ----------------
const createBlog = async (req, res) => {
  try {
    let { title, tags } = req.body;

    if (tags) {
      if (Array.isArray(tags)) {
        tags = tags.map((t) => t.trim());
      } else if (typeof tags === 'string') {
        try {
          const parsed = JSON.parse(tags);
          tags = Array.isArray(parsed) ? parsed : [parsed];
        } catch {
          tags = tags.split(',').map((t) => t.trim());
        }
      } else {
        tags = [];
      }
    } else {
      tags = [];
    }

    const blogData = {
      ...req.body,
      tags,
      slug: slugify(title, { lower: true, strict: true }),
      authorId: req.user._id,
      author: req.user.username,
    };

    if (req.file) {
      blogData.featuredImage = req.file.path; // Cloudinary URL
    }

    const blog = new Blog(blogData);
    await blog.save();

    res.status(201).json(blog);
  } catch (error) {
    console.error('Create blog error:', error.message);
    res.status(500).json({ message: 'Server error while creating blog' });
  }
};

// ---------------- UPDATE BLOG ----------------
const updateBlog = async (req, res) => {
  try {
    let { tags, title } = req.body;

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (
      blog.authorId.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized to update this blog' });
    }

    if (tags) {
      if (Array.isArray(tags)) {
        tags = tags.map((t) => t.trim());
      } else if (typeof tags === 'string') {
        try {
          const parsed = JSON.parse(tags);
          tags = Array.isArray(parsed) ? parsed : [parsed];
        } catch {
          tags = tags.split(',').map((t) => t.trim());
        }
      } else {
        tags = [];
      }
      req.body.tags = tags;
    }

    if (title && title !== blog.title) {
      req.body.slug = slugify(title, { lower: true, strict: true });
    }

    if (req.file) {
      if (blog.featuredImage) {
        const oldPublicId = extractPublicIdFromUrl(blog.featuredImage);
        if (oldPublicId) {
          await cloudinary.uploader.destroy(oldPublicId);
        }
      }
      req.body.featuredImage = req.file.path; // new Cloudinary URL
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updatedBlog);
  } catch (error) {
    console.error('Update blog error:', error.message);
    res.status(500).json({ message: 'Server error while updating blog' });
  }
};

// ---------------- DELETE BLOG ----------------
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (
      blog.authorId.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized to delete this blog' });
    }

    if (blog.featuredImage) {
      const oldPublicId = extractPublicIdFromUrl(blog.featuredImage);
      if (oldPublicId) {
        await cloudinary.uploader.destroy(oldPublicId);
      }
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Delete blog error:', error.message);
    res.status(500).json({ message: 'Server error while deleting blog' });
  }
};

// ---------------- INCREMENT VIEWS ----------------
const incrementViews = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    res.json(blog);
  } catch (error) {
    console.error('Error updating views:', error.message);
    res.status(500).json({ message: 'Error updating views' });
  }
};

// ---------------- INCREMENT LIKES ----------------
const incrementLikes = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.json(blog);
  } catch (error) {
    console.error('Error updating likes:', error.message);
    res.status(500).json({ message: 'Error updating likes' });
  }
};

module.exports = {
  getBlogs,
  getBlogBySlug,
  getFeaturedBlogs,
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  incrementViews,
  incrementLikes,
};