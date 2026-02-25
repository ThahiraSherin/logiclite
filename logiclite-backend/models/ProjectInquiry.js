const mongoose = require('mongoose');

const projectInquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  service: { type: String, required: true, trim: true },
  message: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('ProjectInquiry', projectInquirySchema);