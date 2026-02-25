const express = require('express');
const {
  submitContactMessage,
  submitProjectInquiry,
  getAllContactMessages,
  getAllProjectInquiries,
  deleteContactMessage,
  deleteProjectInquiry,
} = require('../controllers/contactController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Public routes for submitting messages
router.post('/submit/general', submitContactMessage);
router.post('/submit/project', submitProjectInquiry);

// Protected routes for admin management
router.get('/admin/messages/general', auth, getAllContactMessages);
router.get('/admin/messages/project', auth, getAllProjectInquiries);
router.delete('/admin/messages/general/:id', auth, deleteContactMessage);
router.delete('/admin/messages/project/:id', auth, deleteProjectInquiry);

module.exports = router;