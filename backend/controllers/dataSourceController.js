const DataSource = require('../models/DataSource');

const FALLBACK_SOURCES = [
  { _id: "ds1", name: "Geological Survey of India (GSI) Portal", category: "Government / Geological", provider: "GSI / Ministry of Mines", description: "Official spatial boundary mapping, lithological maps, and mineral occurrence records.", lastUpdated: "2025-10-01", usageInPlatform: "Geological belt boundaries and regional mineral occurrence ground-truth.", reliabilityRating: "High (Official)", isRealData: true },
  { _id: "ds2", name: "Indian Bureau of Mines (IBM) Statistics", category: "Mining Production", provider: "IBM Nagpur", description: "Annual production reports, reserve grades, and mine capacity metrics across states.", lastUpdated: "2025-12-15", usageInPlatform: "Mine production baselines, annual yield, and reserve capacity.", reliabilityRating: "High (Official)", isRealData: true },
  { _id: "ds3", name: "MOIL Limited Annual Mining Reports", category: "Mining Production", provider: "MOIL Ltd.", description: "Detailed mine-wise grade, depth, and underground reserve figures.", lastUpdated: "2025-11-30", usageInPlatform: "Mine Intelligence registry and MOIL reserve ML estimation comparisons.", reliabilityRating: "High (Official)", isRealData: true },
  { _id: "ds4", name: "Sentinel-2 & Landsat-9 Satellite Imagery", category: "Satellite / GIS", provider: "ESA Copernicus / USGS EROS", description: "SWIR / VNIR multispectral bands used for Manganese Index (MNI) and Iron Oxide Index (IOI) proxy calculations.", lastUpdated: "2026-01-20", usageInPlatform: "Remote sensing spectral indicators for candidate exploration target identification.", reliabilityRating: "High (Remote Sensing)", isRealData: true },
  { _id: "ds5", name: "SIH Bhandara Synthetic AI Dataset", category: "Prototype / Synthetic Data", provider: "Manganese Platform ML Engine", description: "Feature matrix combining synthetic geochemical assay ranges (Mn%, Fe%, SiO2%, P%) with spatial coordinates for RF Model prototyping.", lastUpdated: "2026-02-01", usageInPlatform: "AI Classification model training, reserve regression model, and candidate recommendations.", reliabilityRating: "Prototype / Simulated", isRealData: false }
];

exports.getDataSources = async (req, res) => {
  try {
    const sources = await DataSource.find({});
    if (!sources || sources.length === 0) {
      return res.json({ success: true, count: FALLBACK_SOURCES.length, data: FALLBACK_SOURCES });
    }
    res.json({ success: true, count: sources.length, data: sources });
  } catch (error) {
    res.json({ success: true, count: FALLBACK_SOURCES.length, data: FALLBACK_SOURCES });
  }
};
