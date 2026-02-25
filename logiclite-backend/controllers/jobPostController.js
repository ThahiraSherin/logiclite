const JobPost = require('../models/JobPost');
const slugify = require('slugify');

const getPublishedJobs = async (req, res) => {
  try {
    const jobs = await JobPost.find({ isPublished: true }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error('Get jobs error:', error.message);
    res.status(500).json({ message: 'Server error while fetching job posts' });
  }
};

const getAdminJobs = async (req, res) => {
  try {
    const jobs = await JobPost.find({ authorId: req.user._id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error('Get admin jobs error:', error.message);
    res.status(500).json({ message: 'Server error while fetching admin job posts' });
  }
};

const createJobPost = async (req, res) => {
  try {
    const jobData = {
      ...req.body,
      authorId: req.user._id,
      author: req.user.username,
    };

    const jobPost = new JobPost(jobData);
    await jobPost.save();

    res.status(201).json(jobPost);
  } catch (error) {
    console.error('Create job error:', error.message);
    res.status(500).json({ message: 'Server error while creating job post' });
  }
};

const updateJobPost = async (req, res) => {
  try {
    const jobPost = await JobPost.findById(req.params.id);

    if (!jobPost) {
      return res.status(404).json({ message: 'Job post not found' });
    }

    if (
      jobPost.authorId.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized to update this job post' });
    }

    const updatedJob = await JobPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedJob);
  } catch (error) {
    console.error('Update job error:', error.message);
    res.status(500).json({ message: 'Server error while updating job post' });
  }
};

const deleteJobPost = async (req, res) => {
  try {
    const jobPost = await JobPost.findById(req.params.id);

    if (!jobPost) {
      return res.status(404).json({ message: 'Job post not found' });
    }

    if (
      jobPost.authorId.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized to delete this job post' });
    }

    await JobPost.findByIdAndDelete(req.params.id);

    res.json({ message: 'Job post deleted successfully' });
  } catch (error) {
    console.error('Delete job error:', error.message);
    res.status(500).json({ message: 'Server error while deleting job post' });
  }
};

module.exports = {
  getPublishedJobs,
  getAdminJobs,
  createJobPost,
  updateJobPost,
  deleteJobPost,
};