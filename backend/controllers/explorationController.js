const ExplorationZone = require('../models/ExplorationZone');

const FALLBACK_ZONES = [
  { zoneId: "BHN-ZONE-001", name: "Dongri-Chikla North Corridor", location: "Bhandara District, Maharashtra", latitude: 21.5712, longitude: 79.7345, areaHectares: 1420, pixelCount: 1580, meanMNI: 0.78, meanNDVI: 0.42, meanIOI: 0.84, meanCMI: 0.65, priority: "HIGH", recommendation: "High priority shallow drilling and core assay recommended along Gondite strike.", supportingIndicators: "Strong MNI spectral anomaly (0.78), elevated Iron Oxide Index (0.84), structural lineament intersection." },
  { zoneId: "BHN-ZONE-002", name: "Tirodi Extension East", location: "Balaghat-Bhandara Border", latitude: 21.6980, longitude: 79.7820, areaHectares: 1850, pixelCount: 2050, meanMNI: 0.72, meanNDVI: 0.51, meanIOI: 0.79, meanCMI: 0.58, priority: "HIGH", recommendation: "Conduct detailed ground magnetic survey and exploratory borehole drilling.", supportingIndicators: "Favorable manganese index (0.72), continuous quartzite-gondite ridge, low overburden." },
  { zoneId: "BHN-ZONE-003", name: "Kandri South Syncline", location: "Nagpur District, Maharashtra", latitude: 21.3890, longitude: 79.2450, areaHectares: 950, pixelCount: 1050, meanMNI: 0.64, meanNDVI: 0.38, meanIOI: 0.71, meanCMI: 0.52, priority: "MEDIUM", recommendation: "Geochemical stream sediment sampling and high-resolution gravity profiling.", supportingIndicators: "Moderate MNI (0.64), fold hinge trap structure, adjacent to Kandri open pit." },
  { zoneId: "BHN-ZONE-004", name: "Mansar West Flank", location: "Nagpur District, Maharashtra", latitude: 21.4120, longitude: 79.2210, areaHectares: 810, pixelCount: 900, meanMNI: 0.58, meanNDVI: 0.45, meanIOI: 0.68, meanCMI: 0.49, priority: "MEDIUM", recommendation: "Pitting and trenching along inferred strike continuation.", supportingIndicators: "Promising clay alteration signature, proximity to active Mansar underground mine workings." },
  { zoneId: "BHN-ZONE-005", name: "Ukwa North Plateau", location: "Balaghat District, Madhya Pradesh", latitude: 21.9850, longitude: 80.4910, areaHectares: 2200, pixelCount: 2440, meanMNI: 0.81, meanNDVI: 0.62, meanIOI: 0.88, meanCMI: 0.71, priority: "HIGH", recommendation: "Immediate G3 stage exploration block reservation and deep core drilling.", supportingIndicators: "High grade manganese band exposure, MNI 0.81, stratigraphically equivalent to Balaghat ore horizon." },
  { zoneId: "BHN-ZONE-006", name: "Barjamda East Anomaly", location: "Keonjhar District, Odisha", latitude: 22.1850, longitude: 85.4120, areaHectares: 1600, pixelCount: 1780, meanMNI: 0.75, meanNDVI: 0.55, meanIOI: 0.82, meanCMI: 0.75, priority: "HIGH", recommendation: "Airborne hyperspectral ground-truthing and systematic trenching.", supportingIndicators: "Strong manganese-iron oxide composite signature in Iron Ore Supergroup metasediments." },
  { zoneId: "BHN-ZONE-007", name: "Sandur North Ridge", location: "Ballari District, Karnataka", latitude: 15.1240, longitude: 76.5650, areaHectares: 1100, pixelCount: 1220, meanMNI: 0.49, meanNDVI: 0.29, meanIOI: 0.59, meanCMI: 0.41, priority: "LOW", recommendation: "Reconnaissance geological mapping prior to geophysical investigation.", supportingIndicators: "Low-to-moderate MNI index (0.49), complex structural folding, ferruginous quartzite interbeds." },
  { zoneId: "BHN-ZONE-008", name: "Vizianagaram Garividi South", location: "Vizianagaram District, Andhra Pradesh", latitude: 18.2840, longitude: 83.5420, areaHectares: 750, pixelCount: 830, meanMNI: 0.52, meanNDVI: 0.41, meanIOI: 0.63, meanCMI: 0.44, priority: "LOW", recommendation: "Secondary geochemical survey to delineate kodurite rock associations.", supportingIndicators: "Discontinuous manganese oxide lenses within Khondalite suite rocks." }
];

exports.getExplorationZones = async (req, res) => {
  try {
    const zones = await ExplorationZone.find({});
    if (!zones || zones.length === 0) {
      return res.json({ success: true, count: FALLBACK_ZONES.length, data: FALLBACK_ZONES });
    }
    res.json({ success: true, count: zones.length, data: zones });
  } catch (error) {
    res.json({ success: true, count: FALLBACK_ZONES.length, data: FALLBACK_ZONES });
  }
};

exports.getRecommendations = async (req, res) => {
  try {
    res.json({
      success: true,
      count: FALLBACK_ZONES.length,
      recommendations: FALLBACK_ZONES
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
