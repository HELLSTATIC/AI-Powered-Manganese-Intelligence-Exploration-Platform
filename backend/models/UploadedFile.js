const mongoose = require('mongoose');

const uploadedFileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalname: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  filepath: { type: String, required: true },
  rowCount: { type: Number, default: 0 },
  columns: [{ type: String }],
  previewRows: { type: Array, default: [] },
  status: { type: String, enum: ['PARSED', 'PROCESSED', 'FAILED'], default: 'PARSED' }
}, { timestamps: true });

module.exports = mongoose.model('UploadedFile', uploadedFileSchema);
