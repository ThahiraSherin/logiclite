const express = require('express');
const {
  submitApplication,
  getAllApplications,
  updateApplicationStatus,
  deleteApplication,
  upload
} = require('../controllers/jobApplicationController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post('/apply', upload.single('resume'), submitApplication);
router.get('/admin/applications', auth, getAllApplications);
router.put('/admin/applications/:id', auth, updateApplicationStatus);
router.delete('/admin/applications/:id', auth, deleteApplication);

module.exports = router;