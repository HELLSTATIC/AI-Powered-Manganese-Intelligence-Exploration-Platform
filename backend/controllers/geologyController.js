const GeologicalRegion = require('../models/GeologicalRegion');

const FALLBACK_GEOLOGY = [
  { _id: "g1", name: "Sausar Group manganese Belt", beltGroup: "Sausar Group (Proterozoic)", states: ["Madhya Pradesh", "Maharashtra"], lithology: "Gondite, Manganese Ore, Quartzite, Schist, Marble", manganeseAssociation: "Syngenetic metamorphism of manganiferous sediments", structuralFeature: "Tight asymmetric folds & synclinal belts", latitude: 21.6000, longitude: 79.5000, resourcePotential: "HIGH" },
  { _id: "g2", name: "Iron Ore Supergroup Manganese Horizon", beltGroup: "Iron Ore Supergroup", states: ["Odisha", "Jharkhand"], lithology: "Shale, Banded Iron Formation, Chert, Manganese Oxide Lenses", manganeseAssociation: "Supergene oxide enrichment along weathered BIF caps", structuralFeature: "Overturned synclinal basin folds", latitude: 22.1000, longitude: 85.3000, resourcePotential: "HIGH" },
  { _id: "g3", name: "Sandur Schist Belt Manganese Deposit", beltGroup: "Dharwar Craton (Sandur Group)", states: ["Karnataka"], lithology: "Ferruginous Phyllite, Metagreywacke, Manganiferous Slate", manganeseAssociation: "Residual and syngenetic stratiform horizons", structuralFeature: "Faceted ridge anticlines", latitude: 15.1000, longitude: 76.5500, resourcePotential: "MEDIUM" },
  { _id: "g4", name: "Eastern Ghats Kodurite Horizon", beltGroup: "Khondalite Belt", states: ["Andhra Pradesh"], lithology: "Kodurite, Manganese Silicates, Charnockite, Garnet-Sillimanite Gneiss", manganeseAssociation: "Hydrothermal & metasomatic manganese silicate enrichment", structuralFeature: "Shear zone lineaments", latitude: 18.2500, longitude: 83.5000, resourcePotential: "MODERATE" }
];

exports.getGeologicalRegions = async (req, res) => {
  try {
    const regions = await GeologicalRegion.find({});
    if (!regions || regions.length === 0) {
      return res.json({ success: true, count: FALLBACK_GEOLOGY.length, data: FALLBACK_GEOLOGY });
    }
    res.json({ success: true, count: regions.length, data: regions });
  } catch (error) {
    res.json({ success: true, count: FALLBACK_GEOLOGY.length, data: FALLBACK_GEOLOGY });
  }
};
