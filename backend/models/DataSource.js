const mongoose = require('mongoose');

const dataSourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Government / Geological', 'Satellite / GIS', 'Mining Production', 'ML Dataset', 'Prototype / Synthetic Data'], required: true },
  provider: { type: String, required: true },
  description: { type: String, required: true },
  lastUpdated: { type: String, required: true },
  usageInPlatform: { type: String, required: true },
  reliabilityRating: { type: String, default: 'High' },
  isRealData: { type: Boolean, required: true }
}, { timestamps: true });

module.exports = mongoose.model('DataSource', dataSourceSchema);
