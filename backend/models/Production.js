const mongoose = require('mongoose');

const productionSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  productionMT: { type: Number, required: true },
  stateBreakdown: [{
    state: String,
    productionMT: Number
  }],
  mineTypeBreakdown: {
    underground: Number,
    openCast: Number
  }
}, { timestamps: true });

module.exports = mongoose.model('Production', productionSchema);
