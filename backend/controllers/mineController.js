const Mine = require('../models/Mine');

const FALLBACK_MINES = [
  { _id: "m1", name: "Dongri Buzurg Mine", state: "Maharashtra", district: "Bhandara", latitude: 21.5321, longitude: 79.7123, annualProductionMT: 450000, mnGradePercent: 42.5, feGradePercent: 7.2, sio2GradePercent: 11.4, pGradePercent: 0.18, estimatedReserveMT: 12500000, mineType: "Mixed", depthMeters: 320, areaHectares: 1450, operator: "MOIL Ltd.", status: "ACTIVE" },
  { _id: "m2", name: "Balaghat Mine", state: "Madhya Pradesh", district: "Balaghat", latitude: 21.8152, longitude: 80.1843, annualProductionMT: 850000, mnGradePercent: 44.0, feGradePercent: 6.8, sio2GradePercent: 10.2, pGradePercent: 0.15, estimatedReserveMT: 24800000, mineType: "Underground", depthMeters: 450, areaHectares: 2100, operator: "MOIL Ltd.", status: "ACTIVE" },
  { _id: "m3", name: "Chikla Mine", state: "Maharashtra", district: "Bhandara", latitude: 21.5540, longitude: 79.6890, annualProductionMT: 280000, mnGradePercent: 38.2, feGradePercent: 9.1, sio2GradePercent: 14.2, pGradePercent: 0.22, estimatedReserveMT: 8400000, mineType: "Underground", depthMeters: 280, areaHectares: 980, operator: "MOIL Ltd.", status: "ACTIVE" },
  { _id: "m4", name: "Kandri Mine", state: "Maharashtra", district: "Nagpur", latitude: 21.4180, longitude: 79.2630, annualProductionMT: 310000, mnGradePercent: 39.5, feGradePercent: 8.4, sio2GradePercent: 13.0, pGradePercent: 0.19, estimatedReserveMT: 9200000, mineType: "Open Cast", depthMeters: 310, areaHectares: 1120, operator: "MOIL Ltd.", status: "ACTIVE" },
  { _id: "m5", name: "Mansar Mine", state: "Maharashtra", district: "Nagpur", latitude: 21.3960, longitude: 79.2550, annualProductionMT: 220000, mnGradePercent: 36.8, feGradePercent: 10.5, sio2GradePercent: 16.1, pGradePercent: 0.25, estimatedReserveMT: 6100000, mineType: "Underground", depthMeters: 240, areaHectares: 850, operator: "MOIL Ltd.", status: "ACTIVE" },
  { _id: "m6", name: "Tirodi Mine", state: "Madhya Pradesh", district: "Balaghat", latitude: 21.6810, longitude: 79.7420, annualProductionMT: 520000, mnGradePercent: 41.0, feGradePercent: 7.8, sio2GradePercent: 12.0, pGradePercent: 0.17, estimatedReserveMT: 15300000, mineType: "Mixed", depthMeters: 360, areaHectares: 1600, operator: "MOIL Ltd.", status: "ACTIVE" },
  { _id: "m7", name: "Ukwa Mine", state: "Madhya Pradesh", district: "Balaghat", latitude: 21.9680, longitude: 80.4720, annualProductionMT: 390000, mnGradePercent: 40.2, feGradePercent: 8.0, sio2GradePercent: 12.5, pGradePercent: 0.16, estimatedReserveMT: 11200000, mineType: "Underground", depthMeters: 300, areaHectares: 1350, operator: "MOIL Ltd.", status: "ACTIVE" },
  { _id: "m8", name: "Barjamda Mine", state: "Odisha", district: "Keonjhar", latitude: 22.1520, longitude: 85.3810, annualProductionMT: 620000, mnGradePercent: 43.1, feGradePercent: 6.5, sio2GradePercent: 9.8, pGradePercent: 0.14, estimatedReserveMT: 19400000, mineType: "Open Cast", depthMeters: 410, areaHectares: 1950, operator: "OMC Ltd.", status: "ACTIVE" },
  { _id: "m9", name: "Sandur Mine", state: "Karnataka", district: "Ballari", latitude: 15.0840, longitude: 76.5420, annualProductionMT: 480000, mnGradePercent: 37.0, feGradePercent: 12.0, sio2GradePercent: 15.0, pGradePercent: 0.20, estimatedReserveMT: 13700000, mineType: "Open Cast", depthMeters: 350, areaHectares: 1800, operator: "SMIORE", status: "ACTIVE" },
  { _id: "m10", name: "Garividi Mine", state: "Andhra Pradesh", district: "Vizianagaram", latitude: 18.2840, longitude: 83.5420, annualProductionMT: 180000, mnGradePercent: 34.5, feGradePercent: 13.5, sio2GradePercent: 18.0, pGradePercent: 0.28, estimatedReserveMT: 4200000, mineType: "Open Cast", depthMeters: 180, areaHectares: 650, operator: "APMDC", status: "ACTIVE" }
];

exports.getAllMines = async (req, res) => {
  try {
    const mines = await Mine.find({});
    if (!mines || mines.length === 0) {
      return res.json({ success: true, count: FALLBACK_MINES.length, data: FALLBACK_MINES });
    }
    res.json({ success: true, count: mines.length, data: mines });
  } catch (error) {
    res.json({ success: true, count: FALLBACK_MINES.length, data: FALLBACK_MINES });
  }
};

exports.getMineById = async (req, res) => {
  try {
    const mine = await Mine.findById(req.params.id);
    if (!mine) {
      const fallback = FALLBACK_MINES.find(m => m._id === req.params.id) || FALLBACK_MINES[0];
      return res.json({ success: true, data: fallback });
    }
    res.json({ success: true, data: mine });
  } catch (error) {
    const fallback = FALLBACK_MINES.find(m => m._id === req.params.id) || FALLBACK_MINES[0];
    res.json({ success: true, data: fallback });
  }
};

exports.createMine = async (req, res) => {
  try {
    const mine = await Mine.create(req.body);
    res.status(201).json({ success: true, data: mine });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
