const ContactMessage = require('../models/ContactMessage');
const ProjectInquiry = require('../models/ProjectInquiry');

const submitContactMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }
    const newContactMessage = new ContactMessage({ name, email, phone, subject, message });
    await newContactMessage.save();
    res.status(201).json({ message: 'Thank you for your message! We\'ll get back to you soon.' });
  } catch (error) {
    console.error('Contact form submission error:', error.message);
    res.status(500).json({ message: 'Server error during form submission.' });
  }
};

const submitProjectInquiry = async (req, res) => {
  try {
    const { name, phone, email, service, message } = req.body;
    if (!name || !phone || !email || !service || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const newProjectInquiry = new ProjectInquiry({ name, phone, email, service, message });
    await newProjectInquiry.save();
    res.status(201).json({ message: 'Project inquiry submitted successfully. We will contact you shortly!' });
  } catch (error) {
    console.error('Project inquiry submission error:', error.message);
    res.status(500).json({ message: 'Server error during form submission.' });
  }
};

const getAllContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error.message);
    res.status(500).json({ message: 'Server error while fetching contact messages.' });
  }
};

const getAllProjectInquiries = async (req, res) => {
  try {
    const inquiries = await ProjectInquiry.find({}).sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    console.error('Error fetching project inquiries:', error.message);
    res.status(500).json({ message: 'Server error while fetching project inquiries.' });
  }
};

const deleteContactMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found.' });
    }
    res.json({ message: 'Message deleted successfully.' });
  } catch (error) {
    console.error('Error deleting contact message:', error.message);
    res.status(500).json({ message: 'Server error while deleting message.' });
  }
};

const deleteProjectInquiry = async (req, res) => {
  try {
    const inquiry = await ProjectInquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found.' });
    }
    res.json({ message: 'Inquiry deleted successfully.' });
  } catch (error) {
    console.error('Error deleting project inquiry:', error.message);
    res.status(500).json({ message: 'Server error while deleting inquiry.' });
  }
};

module.exports = {
  submitContactMessage,
  submitProjectInquiry,
  getAllContactMessages,
  getAllProjectInquiries,
  deleteContactMessage,
  deleteProjectInquiry,
};