const mongoose = require('mongoose');

const mlPredictionSchema = new mongoose.Schema({
  inputFeatures: {
    latitude: Number,
    longitude: Number,
    mn_percent: Number,
    fe_percent: Number,
    sio2_percent: Number,
    p_percent: Number,
    area_hectares: Number,
    depth_meters: Number
  },
  predictionType: { type: String, enum: ['potential', 'reserve', 'full-analysis'], required: true },
  potentialLevel: { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'] },
  confidence: { type: Number },
  predictedReserveMT: { type: Number },
  recommendation: { type: String },
  modelVersion: { type: String, default: 'Random Forest v1.2' }
}, { timestamps: true });

module.exports = mongoose.model('MLPrediction', mlPredictionSchema);
