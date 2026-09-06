const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  organization: { type: String, default: 'Geological Survey / Mining Corp' },
  role: { type: String, enum: ['Admin', 'Analyst', 'Viewer'], default: 'Analyst' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
