const mongoose = require('mongoose');

const geologicalRegionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  beltGroup: { type: String, required: true },
  states: [{ type: String }],
  lithology: { type: String, required: true },
  manganeseAssociation: { type: String, required: true },
  structuralFeature: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  resourcePotential: { type: String, enum: ['HIGH', 'MEDIUM', 'MODERATE', 'LOW'], default: 'HIGH' }
}, { timestamps: true });

module.exports = mongoose.model('GeologicalRegion', geologicalRegionSchema);
