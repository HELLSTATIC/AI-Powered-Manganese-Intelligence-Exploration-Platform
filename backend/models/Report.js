const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  reportType: { type: String, enum: ['Executive Summary', 'Exploration Recommendation', 'Shortfall Analysis', 'Mine Reserve Assessment'], default: 'Executive Summary' },
  targetRegion: { type: String, default: 'National / Central India' },
  executiveSummary: { type: String, required: true },
  productionStats: { type: Object },
  shortfallData: { type: Object },
  explorationRecommendations: { type: Array },
  mlPredictionsSummary: { type: Object },
  author: { type: String, default: 'System Analyst' },
  status: { type: String, default: 'GENERATED' }
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
