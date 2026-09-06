const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Mine = require('../models/Mine');
const Production = require('../models/Production');
const Demand = require('../models/Demand');
const ExplorationZone = require('../models/ExplorationZone');
const GeologicalRegion = require('../models/GeologicalRegion');
const SatelliteData = require('../models/SatelliteData');
const DataSource = require('../models/DataSource');
const User = require('../models/User');

const seedMines = [
  { name: "Dongri Buzurg Mine", state: "Maharashtra", district: "Bhandara", latitude: 21.5321, longitude: 79.7123, annualProductionMT: 450000, mnGradePercent: 42.5, feGradePercent: 7.2, sio2GradePercent: 11.4, pGradePercent: 0.18, estimatedReserveMT: 12500000, mineType: "Mixed", depthMeters: 320, areaHectares: 1450, operator: "MOIL Ltd.", status: "ACTIVE" },
  { name: "Balaghat Mine", state: "Madhya Pradesh", district: "Balaghat", latitude: 21.8152, longitude: 80.1843, annualProductionMT: 850000, mnGradePercent: 44.0, feGradePercent: 6.8, sio2GradePercent: 10.2, pGradePercent: 0.15, estimatedReserveMT: 24800000, mineType: "Underground", depthMeters: 450, areaHectares: 2100, operator: "MOIL Ltd.", status: "ACTIVE" },
  { name: "Chikla Mine", state: "Maharashtra", district: "Bhandara", latitude: 21.5540, longitude: 79.6890, annualProductionMT: 280000, mnGradePercent: 38.2, feGradePercent: 9.1, sio2GradePercent: 14.2, pGradePercent: 0.22, estimatedReserveMT: 8400000, mineType: "Underground", depthMeters: 280, areaHectares: 980, operator: "MOIL Ltd.", status: "ACTIVE" },
  { name: "Kandri Mine", state: "Maharashtra", district: "Nagpur", latitude: 21.4180, longitude: 79.2630, annualProductionMT: 310000, mnGradePercent: 39.5, feGradePercent: 8.4, sio2GradePercent: 13.0, pGradePercent: 0.19, estimatedReserveMT: 9200000, mineType: "Open Cast", depthMeters: 310, areaHectares: 1120, operator: "MOIL Ltd.", status: "ACTIVE" },
  { name: "Mansar Mine", state: "Maharashtra", district: "Nagpur", latitude: 21.3960, longitude: 79.2550, annualProductionMT: 220000, mnGradePercent: 36.8, feGradePercent: 10.5, sio2GradePercent: 16.1, pGradePercent: 0.25, estimatedReserveMT: 6100000, mineType: "Underground", depthMeters: 240, areaHectares: 850, operator: "MOIL Ltd.", status: "ACTIVE" },
  { name: "Tirodi Mine", state: "Madhya Pradesh", district: "Balaghat", latitude: 21.6810, longitude: 79.7420, annualProductionMT: 520000, mnGradePercent: 41.0, feGradePercent: 7.8, sio2GradePercent: 12.0, pGradePercent: 0.17, estimatedReserveMT: 15300000, mineType: "Mixed", depthMeters: 360, areaHectares: 1600, operator: "MOIL Ltd.", status: "ACTIVE" },
  { name: "Ukwa Mine", state: "Madhya Pradesh", district: "Balaghat", latitude: 21.9680, longitude: 80.4720, annualProductionMT: 390000, mnGradePercent: 40.2, feGradePercent: 8.0, sio2GradePercent: 12.5, pGradePercent: 0.16, estimatedReserveMT: 11200000, mineType: "Underground", depthMeters: 300, areaHectares: 1350, operator: "MOIL Ltd.", status: "ACTIVE" },
  { name: "Barjamda Mine", state: "Odisha", district: "Keonjhar", latitude: 22.1520, longitude: 85.3810, annualProductionMT: 620000, mnGradePercent: 43.1, feGradePercent: 6.5, sio2GradePercent: 9.8, pGradePercent: 0.14, estimatedReserveMT: 19400000, mineType: "Open Cast", depthMeters: 410, areaHectares: 1950, operator: "OMC Ltd.", status: "ACTIVE" },
  { name: "Sandur Mine", state: "Karnataka", district: "Ballari", latitude: 15.0840, longitude: 76.5420, annualProductionMT: 480000, mnGradePercent: 37.0, feGradePercent: 12.0, sio2GradePercent: 15.0, pGradePercent: 0.20, estimatedReserveMT: 13700000, mineType: "Open Cast", depthMeters: 350, areaHectares: 1800, operator: "SMIORE", status: "ACTIVE" },
  { name: "Garividi Mine", state: "Andhra Pradesh", district: "Vizianagaram", latitude: 18.2840, longitude: 83.5420, annualProductionMT: 180000, mnGradePercent: 34.5, feGradePercent: 13.5, sio2GradePercent: 18.0, pGradePercent: 0.28, estimatedReserveMT: 4200000, mineType: "Open Cast", depthMeters: 180, areaHectares: 650, operator: "APMDC", status: "ACTIVE" }
];

const seedProduction = [
  { year: 2020, productionMT: 2350000, stateBreakdown: [{ state: "Madhya Pradesh", productionMT: 820000 }, { state: "Maharashtra", productionMT: 710000 }, { state: "Odisha", productionMT: 480000 }, { state: "Karnataka", productionMT: 220000 }, { state: "Others", productionMT: 120000 }], mineTypeBreakdown: { underground: 1450000, openCast: 900000 } },
  { year: 2021, productionMT: 2480000, stateBreakdown: [{ state: "Madhya Pradesh", productionMT: 870000 }, { state: "Maharashtra", productionMT: 750000 }, { state: "Odisha", productionMT: 510000 }, { state: "Karnataka", productionMT: 230000 }, { state: "Others", productionMT: 120000 }], mineTypeBreakdown: { underground: 1520000, openCast: 960000 } },
  { year: 2022, productionMT: 2620000, stateBreakdown: [{ state: "Madhya Pradesh", productionMT: 930000 }, { state: "Maharashtra", productionMT: 790000 }, { state: "Odisha", productionMT: 540000 }, { state: "Karnataka", productionMT: 240000 }, { state: "Others", productionMT: 120000 }], mineTypeBreakdown: { underground: 1610000, openCast: 1010000 } },
  { year: 2023, productionMT: 2750000, stateBreakdown: [{ state: "Madhya Pradesh", productionMT: 980000 }, { state: "Maharashtra", productionMT: 820000 }, { state: "Odisha", productionMT: 570000 }, { state: "Karnataka", productionMT: 250000 }, { state: "Others", productionMT: 130000 }], mineTypeBreakdown: { underground: 1690000, openCast: 1060000 } },
  { year: 2024, productionMT: 2840000, stateBreakdown: [{ state: "Madhya Pradesh", productionMT: 1020000 }, { state: "Maharashtra", productionMT: 850000 }, { state: "Odisha", productionMT: 590000 }, { state: "Karnataka", productionMT: 250000 }, { state: "Others", productionMT: 130000 }], mineTypeBreakdown: { underground: 1740000, openCast: 1100000 } },
  { year: 2025, productionMT: 2950000, stateBreakdown: [{ state: "Madhya Pradesh", productionMT: 1070000 }, { state: "Maharashtra", productionMT: 880000 }, { state: "Odisha", productionMT: 620000 }, { state: "Karnataka", productionMT: 250000 }, { state: "Others", productionMT: 130000 }], mineTypeBreakdown: { underground: 1810000, openCast: 1140000 } }
];

const seedDemand = [
  { year: 2020, demandMT: 3100000, steelIndustryConsumptionMT: 2720000, batteryIndustryConsumptionMT: 230000, exportOtherConsumptionMT: 150000 },
  { year: 2021, demandMT: 3280000, steelIndustryConsumptionMT: 2870000, batteryIndustryConsumptionMT: 250000, exportOtherConsumptionMT: 160000 },
  { year: 2022, demandMT: 3450000, steelIndustryConsumptionMT: 3010000, batteryIndustryConsumptionMT: 270000, exportOtherConsumptionMT: 170000 },
  { year: 2023, demandMT: 3620000, steelIndustryConsumptionMT: 3140000, batteryIndustryConsumptionMT: 300000, exportOtherConsumptionMT: 180000 },
  { year: 2024, demandMT: 3800000, steelIndustryConsumptionMT: 3280000, batteryIndustryConsumptionMT: 330000, exportOtherConsumptionMT: 190000 },
  { year: 2025, demandMT: 4050000, steelIndustryConsumptionMT: 3480000, batteryIndustryConsumptionMT: 370000, exportOtherConsumptionMT: 200000 }
];

const seedExplorationZones = [
  { zoneId: "BHN-ZONE-001", name: "Dongri-Chikla North Corridor", location: "Bhandara District, Maharashtra", latitude: 21.5712, longitude: 79.7345, areaHectares: 1420, pixelCount: 1580, meanMNI: 0.78, meanNDVI: 0.42, meanIOI: 0.84, meanCMI: 0.65, priority: "HIGH", recommendation: "High priority shallow drilling and core assay recommended along Gondite strike.", supportingIndicators: "Strong MNI spectral anomaly (0.78), elevated Iron Oxide Index (0.84), structural lineament intersection." },
  { zoneId: "BHN-ZONE-002", name: "Tirodi Extension East", location: "Balaghat-Bhandara Border", latitude: 21.6980, longitude: 79.7820, areaHectares: 1850, pixelCount: 2050, meanMNI: 0.72, meanNDVI: 0.51, meanIOI: 0.79, meanCMI: 0.58, priority: "HIGH", recommendation: "Conduct detailed ground magnetic survey and exploratory borehole drilling.", supportingIndicators: "Favorable manganese index (0.72), continuous quartzite-gondite ridge, low overburden." },
  { zoneId: "BHN-ZONE-003", name: "Kandri South Syncline", location: "Nagpur District, Maharashtra", latitude: 21.3890, longitude: 79.2450, areaHectares: 950, pixelCount: 1050, meanMNI: 0.64, meanNDVI: 0.38, meanIOI: 0.71, meanCMI: 0.52, priority: "MEDIUM", recommendation: "Geochemical stream sediment sampling and high-resolution gravity profiling.", supportingIndicators: "Moderate MNI (0.64), fold hinge trap structure, adjacent to Kandri open pit." },
  { zoneId: "BHN-ZONE-004", name: "Mansar West Flank", location: "Nagpur District, Maharashtra", latitude: 21.4120, longitude: 79.2210, areaHectares: 810, pixelCount: 900, meanMNI: 0.58, meanNDVI: 0.45, meanIOI: 0.68, meanCMI: 0.49, priority: "MEDIUM", recommendation: "Pitting and trenching along inferred strike continuation.", supportingIndicators: "Promising clay alteration signature, proximity to active Mansar underground mine workings." },
  { zoneId: "BHN-ZONE-005", name: "Ukwa North Plateau", location: "Balaghat District, Madhya Pradesh", latitude: 21.9850, longitude: 80.4910, areaHectares: 2200, pixelCount: 2440, meanMNI: 0.81, meanNDVI: 0.62, meanIOI: 0.88, meanCMI: 0.71, priority: "HIGH", recommendation: "Immediate G3 stage exploration block reservation and deep core drilling.", supportingIndicators: "High grade manganese band exposure, MNI 0.81, stratigraphically equivalent to Balaghat ore horizon." },
  { zoneId: "BHN-ZONE-006", name: "Barjamda East Anomaly", location: "Keonjhar District, Odisha", latitude: 22.1850, longitude: 85.4120, areaHectares: 1600, pixelCount: 1780, meanMNI: 0.75, meanNDVI: 0.55, meanIOI: 0.82, meanCMI: 0.75, priority: "HIGH", recommendation: "Airborne hyperspectral ground-truthing and systematic trenching.", supportingIndicators: "Strong manganese-iron oxide composite signature in Iron Ore Supergroup metasediments." }
];

const seedGeologicalRegions = [
  { name: "Sausar Group manganese Belt", beltGroup: "Sausar Group (Proterozoic)", states: ["Madhya Pradesh", "Maharashtra"], lithology: "Gondite, Manganese Ore, Quartzite, Schist, Marble", manganeseAssociation: "Syngenetic metamorphism of manganiferous sediments", structuralFeature: "Tight asymmetric folds & synclinal belts", latitude: 21.6000, longitude: 79.5000, resourcePotential: "HIGH" },
  { name: "Iron Ore Supergroup Manganese Horizon", beltGroup: "Iron Ore Supergroup", states: ["Odisha", "Jharkhand"], lithology: "Shale, Banded Iron Formation, Chert, Manganese Oxide Lenses", manganeseAssociation: "Supergene oxide enrichment along weathered BIF caps", latitude: 22.1000, longitude: 85.3000, resourcePotential: "HIGH" },
  { name: "Sandur Schist Belt Manganese Deposit", beltGroup: "Dharwar Craton (Sandur Group)", states: ["Karnataka"], lithology: "Ferruginous Phyllite, Metagreywacke, Manganiferous Slate", manganeseAssociation: "Residual and syngenetic stratiform horizons", latitude: 15.1000, longitude: 76.5500, resourcePotential: "MEDIUM" },
  { name: "Eastern Ghats Kodurite Horizon", beltGroup: "Khondalite Belt", states: ["Andhra Pradesh"], lithology: "Kodurite, Manganese Silicates, Charnockite, Garnet-Sillimanite Gneiss", manganeseAssociation: "Hydrothermal & metasomatic manganese silicate enrichment", latitude: 18.2500, longitude: 83.5000, resourcePotential: "MODERATE" }
];

const seedSatelliteData = [
  { title: "Bhandara SWIR MNI Spectral Composite", sensor: "Sentinel-2 MSI", spatialResolution: "10m", acquisitionDate: "2025-11-14", cloudCoverPercent: 1.2, studyArea: "Bhandara - Nagpur Belt", mniMean: 0.74, ndviMean: 0.44, ioiMean: 0.81, cmiMean: 0.62 },
  { title: "Balaghat Ore Ridge Multispectral Scene", sensor: "Landsat 9 OLI-2", spatialResolution: "30m", acquisitionDate: "2025-12-02", cloudCoverPercent: 0.5, studyArea: "Balaghat Syncline", mniMean: 0.79, ndviMean: 0.58, ioiMean: 0.85, cmiMean: 0.68 },
  { title: "Keonjhar Barjamda Remote Sensing Grid", sensor: "ISRO Resourcesat-2 LISS IV", spatialResolution: "5.8m", acquisitionDate: "2026-01-10", cloudCoverPercent: 2.1, studyArea: "North Odisha Manganese Zone", mniMean: 0.71, ndviMean: 0.52, ioiMean: 0.78, cmiMean: 0.59 }
];

const seedDataSources = [
  { name: "Geological Survey of India (GSI) Portal", category: "Government / Geological", provider: "GSI / Ministry of Mines", description: "Official spatial boundary mapping, lithological maps, and mineral occurrence records.", lastUpdated: "2025-10-01", usageInPlatform: "Geological belt boundaries and regional mineral occurrence ground-truth.", isRealData: true },
  { name: "Indian Bureau of Mines (IBM) Statistics", category: "Mining Production", provider: "IBM Nagpur", description: "Annual production reports, reserve grades, and mine capacity metrics across states.", lastUpdated: "2025-12-15", usageInPlatform: "Mine production baselines, annual yield, and reserve capacity.", isRealData: true },
  { name: "MOIL Limited Annual Mining Reports", category: "Mining Production", provider: "MOIL Ltd.", description: "Detailed mine-wise grade, depth, and underground reserve figures.", lastUpdated: "2025-11-30", usageInPlatform: "Mine Intelligence registry and MOIL reserve ML estimation comparisons.", isRealData: true },
  { name: "Sentinel-2 & Landsat-9 Satellite Imagery", category: "Satellite / GIS", provider: "ESA Copmicus / USGS EROS", description: "SWIR / VNIR multispectral bands used for Manganese Index (MNI) and Iron Oxide Index (IOI) proxy calculations.", lastUpdated: "2026-01-20", usageInPlatform: "Remote sensing spectral indicators for candidate exploration target identification.", isRealData: true },
  { name: "SIH Bhandara Synthetic AI Dataset", category: "Prototype / Synthetic Data", provider: "Manganese Platform ML Engine", description: "Feature matrix combining synthetic geochemical assay ranges (Mn%, Fe%, SiO2%, P%) with spatial coordinates for RF Model prototyping.", lastUpdated: "2026-02-01", usageInPlatform: "AI Classification model training, reserve regression model, and candidate recommendations.", isRealData: false }
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/manganese_db';
    console.log(`Connecting to MongoDB at ${mongoUri}...`);
    await mongoose.connect(mongoUri);

    console.log("Clearing existing database collections...");
    await Mine.deleteMany({});
    await Production.deleteMany({});
    await Demand.deleteMany({});
    await ExplorationZone.deleteMany({});
    await GeologicalRegion.deleteMany({});
    await SatelliteData.deleteMany({});
    await DataSource.deleteMany({});

    console.log("Seeding Mines...");
    await Mine.insertMany(seedMines);

    console.log("Seeding Production...");
    await Production.insertMany(seedProduction);

    console.log("Seeding Demand...");
    await Demand.insertMany(seedDemand);

    console.log("Seeding Exploration Zones...");
    await ExplorationZone.insertMany(seedExplorationZones);

    console.log("Seeding Geological Regions...");
    await GeologicalRegion.insertMany(seedGeologicalRegions);

    console.log("Seeding Satellite Data...");
    await SatelliteData.insertMany(seedSatelliteData);

    console.log("Seeding Data Sources...");
    await DataSource.insertMany(seedDataSources);

    console.log("Database successfully seeded with realistic Manganese Platform demo data!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding warning/error:", error.message);
    process.exit(0);
  }
};

seedDatabase();
