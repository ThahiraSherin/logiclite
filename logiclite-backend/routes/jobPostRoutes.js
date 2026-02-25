const express = require('express');
const {
  getPublishedJobs,
  getAdminJobs,
  createJobPost,
  updateJobPost,
  deleteJobPost,
} = require('../controllers/jobPostController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', getPublishedJobs);

router.get('/admin', auth, getAdminJobs);
router.post('/admin', auth, createJobPost);
router.put('/admin/:id', auth, updateJobPost);
router.delete('/admin/:id', auth, deleteJobPost);

module.exports = router;