const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const multer = require('multer');

const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');
const jobPostRoutes = require('./routes/jobPostRoutes');
const jobApplicationRoutes = require('./routes/jobApplicationRoutes');
const contactRoutes = require('./routes/contactRoutes');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/jobs', jobPostRoutes);
app.use('/api/applications', jobApplicationRoutes);
app.use('/api/contact', contactRoutes);

app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running successfully!' });
});

app.use((error, req, res, next) => {
  console.error(error);
  
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      errors: Object.values(error.errors).map(e => e.message)
    });
  }
  
  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  
  if (error instanceof multer.MulterError) {
    return res.status(400).json({ message: 'File upload error: ' + error.message });
  }

  res.status(500).json({ message: 'Server Error', error: error.message });
});

app.use('*', (req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});