const mongoose = require('mongoose');

const mineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  annualProductionMT: { type: Number, required: true },
  mnGradePercent: { type: Number, required: true },
  feGradePercent: { type: Number, default: 8.0 },
  sio2GradePercent: { type: Number, default: 12.0 },
  pGradePercent: { type: Number, default: 0.18 },
  estimatedReserveMT: { type: Number, required: true },
  mineType: { type: String, enum: ['Underground', 'Open Cast', 'Mixed'], default: 'Underground' },
  depthMeters: { type: Number, default: 300 },
  areaHectares: { type: Number, default: 1200 },
  operator: { type: String, default: 'MOIL Ltd.' },
  status: { type: String, enum: ['ACTIVE', 'INACTIVE', 'DEVELOPMENT'], default: 'ACTIVE' }
}, { timestamps: true });

module.exports = mongoose.model('Mine', mineSchema);
