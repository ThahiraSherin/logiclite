const JobApplication = require('../models/JobApplication');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '..', 'uploads', 'resumes');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Only PDF, DOC, and DOCX files are allowed!');
    }
  }
});

const submitApplication = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Resume file is required.' });
    }

    const { name, email, phone, jobId, jobTitle } = req.body;

    const newApplication = new JobApplication({
      jobPost: jobId,
      jobTitle,
      name,
      email,
      phone,
      resumePath: `/uploads/resumes/${req.file.filename}`,
    });

    await newApplication.save();
    res.status(201).json({ message: 'Application submitted successfully!' });
  } catch (error) {
    console.error('Submission error:', error);
    res.status(500).json({ message: 'Server error during application submission.', error: error.message });
  }
};

const getAllApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find({}).sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    console.error('Get applications error:', error.message);
    res.status(500).json({ message: 'Server error while fetching applications' });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await JobApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin rights required.' });
    }

    if (!['pending', 'reviewed', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status provided.' });
    }

    application.status = status;
    await application.save();

    res.json({ message: 'Application status updated successfully!', application });
  } catch (error) {
    console.error('Update status error:', error.message);
    res.status(500).json({ message: 'Server error while updating status' });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const application = await JobApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin rights required.' });
    }
    
    const resumePath = path.join(__dirname, '..', application.resumePath);
    if (fs.existsSync(resumePath)) {
      fs.unlinkSync(resumePath);
    }

    await JobApplication.findByIdAndDelete(req.params.id);
    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Delete application error:', error.message);
    res.status(500).json({ message: 'Server error while deleting application' });
  }
};

module.exports = { submitApplication, getAllApplications, updateApplicationStatus, deleteApplication, upload };