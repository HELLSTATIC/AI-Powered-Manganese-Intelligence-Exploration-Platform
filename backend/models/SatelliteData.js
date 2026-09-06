const mongoose = require('mongoose');

const satelliteDataSchema = new mongoose.Schema({
  title: { type: String, required: true },
  sensor: { type: String, required: true },
  spatialResolution: { type: String, required: true },
  acquisitionDate: { type: String, required: true },
  cloudCoverPercent: { type: Number, default: 0.0 },
  studyArea: { type: String, required: true },
  mniMean: { type: Number, required: true },
  ndviMean: { type: Number, required: true },
  ioiMean: { type: Number, required: true },
  cmiMean: { type: Number, required: true },
  thumbnailUrl: { type: String },
  bandCombination: { type: String, default: 'SWIR2/SWIR1, VNIR/Red' }
}, { timestamps: true });

module.exports = mongoose.model('SatelliteData', satelliteDataSchema);
