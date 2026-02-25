const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  salaryRange: {
    type: String,
    trim: true,
  },
  applicationLink: {
    type: String,
    trim: true,
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  author: {
    type: String,
    required: true,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

jobPostSchema.index({ title: 1, location: 1 });
jobPostSchema.index({ isPublished: 1, createdAt: -1 });

module.exports = mongoose.model('JobPost', jobPostSchema);