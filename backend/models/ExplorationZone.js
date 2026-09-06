const mongoose = require('mongoose');

const explorationZoneSchema = new mongoose.Schema({
  zoneId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  areaHectares: { type: Number, required: true },
  pixelCount: { type: Number, default: 1000 },
  meanMNI: { type: Number, required: true },
  meanNDVI: { type: Number, required: true },
  meanIOI: { type: Number, required: true },
  meanCMI: { type: Number, required: true },
  priority: { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'], required: true },
  recommendation: { type: String, required: true },
  supportingIndicators: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('ExplorationZone', explorationZoneSchema);
