const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  content: { 
    type: String, 
    required: true 
  },
  excerpt: { 
    type: String, 
    required: true,
    maxlength: 200
  },
  author: { 
    type: String, 
    required: true 
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  featuredImage: { 
    type: String 
  },
  tags: [{
    type: String,
    trim: true
  }],
  slug: { 
    type: String,
    index: true   // ✅ no unique constraint
  },
  views: { 
    type: Number, 
    default: 0 
  },
  likes: { 
    type: Number, 
    default: 0 
  },
  status: { 
    type: String, 
    enum: ['draft', 'published'], 
    default: 'draft' 
  },
  isFeatured: { 
    type: Boolean, 
    default: false 
  },
  metaDescription: {
    type: String,
    maxlength: 160
  },
  readingTime: {
    type: Number, // in minutes
    default: 0
  },
  featuredImagePublicId: { 
    type: String
  }
}, { 
  timestamps: true 
});

// Pre-save hook
blogSchema.pre('save', async function(next) {
  // Generate slug from title if modified
  if (this.isModified('title')) {
    let baseSlug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    let slug = baseSlug;
    let counter = 1;

    // Ensure unique slug
    const Blog = mongoose.model('Blog', blogSchema);
    while (await Blog.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    this.slug = slug;
  }

  // Trim excerpt if too long
  if (this.excerpt && this.excerpt.length > 200) {
    this.excerpt = this.excerpt.substring(0, 200);
  }

  // Calculate reading time (200 words/minute)
  if (this.isModified('content')) {
    const words = this.content.split(/\s+/).length;
    this.readingTime = Math.ceil(words / 200);
  }

  next();
});

// Indexes
blogSchema.index({ title: 'text', content: 'text' });
blogSchema.index({ status: 1, createdAt: -1 });
blogSchema.index({ authorId: 1, createdAt: -1 });

module.exports = mongoose.model('Blog', blogSchema);
