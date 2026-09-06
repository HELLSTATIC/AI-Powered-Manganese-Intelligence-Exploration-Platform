const mongoose = require('mongoose');

const demandSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  demandMT: { type: Number, required: true },
  steelIndustryConsumptionMT: { type: Number, required: true },
  batteryIndustryConsumptionMT: { type: Number, required: true },
  exportOtherConsumptionMT: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Demand', demandSchema);
