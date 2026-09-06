const Demand = require('../models/Demand');
const Production = require('../models/Production');

exports.getShortfallAnalysis = async (req, res) => {
  try {
    const historical = [
      { year: 2020, demandMT: 3100000, productionMT: 2350000, shortfallMT: 750000, shortfallPercent: 24.19 },
      { year: 2021, demandMT: 3280000, productionMT: 2480000, shortfallMT: 800000, shortfallPercent: 24.39 },
      { year: 2022, demandMT: 3450000, productionMT: 2620000, shortfallMT: 830000, shortfallPercent: 24.06 },
      { year: 2023, demandMT: 3620000, productionMT: 2750000, shortfallMT: 870000, shortfallPercent: 24.03 },
      { year: 2024, demandMT: 3800000, productionMT: 2840000, shortfallMT: 960000, shortfallPercent: 25.26 },
      { year: 2025, demandMT: 4050000, productionMT: 2950000, shortfallMT: 1100000, shortfallPercent: 27.16 }
    ];

    const projected = [
      { year: 2026, demandMT: 4320000, estimatedProductionMT: 3080000, projectedShortfallMT: 1240000, riskLevel: "HIGH" },
      { year: 2027, demandMT: 4610000, estimatedProductionMT: 3220000, projectedShortfallMT: 1390000, riskLevel: "CRITICAL" },
      { year: 2028, demandMT: 4950000, estimatedProductionMT: 3380000, projectedShortfallMT: 1570000, riskLevel: "CRITICAL" },
      { year: 2029, demandMT: 5320000, estimatedProductionMT: 3550000, projectedShortfallMT: 1770000, riskLevel: "CRITICAL" },
      { year: 2030, demandMT: 5750000, estimatedProductionMT: 3750000, projectedShortfallMT: 2000000, riskLevel: "CRITICAL" }
    ];

    const currentShortfallMT = 1100000;
    const currentDemandMT = 4050000;
    const currentProductionMT = 2950000;
    const shortfallPercent = 27.16;

    const solutions = [
      { title: "Prioritize High-Potential Exploration Blocks", description: "Accelerate G3/G2 stage exploration in Dongri-Chikla & Tirodi East corridors to add 1.5 MT annual capacity by 2027.", impact: "+450,000 MT/year" },
      { title: "Optimize Extraction at Reserve-Rich Active Mines", description: "Deepen shaft workings at Balaghat and Barjamda mines to tap underlying high-grade ore horizons.", impact: "+350,000 MT/year" },
      { title: "Improve Ore Beneficiation & Mineral Recovery", description: "Deploy optical ore sorting and gravity separation to convert low-grade (<30% Mn) sub-economic dumps into ferro-grade ore.", impact: "+200,000 MT/year" },
      { title: "Streamline Environmental & Mining Lease Approvals", description: "Fast-track clearance for high-priority brownfield expansion projects in Sausar belt.", impact: "+180,000 MT/year" },
      { title: "Adopt AI/ML Predictive Deep Target Identification", description: "Use spaceborne MNI spectral proxy maps and satellite analytics to reduce exploration targeting failure rates.", impact: "High Efficiency" }
    ];

    res.json({
      success: true,
      data: {
        alertMessage: "CRITICAL ALERT: Manganese production shortfall of 1.10 Million Tonnes detected for current operational cycle (27.16% gap).",
        currentMetrics: {
          demandMT: currentDemandMT,
          productionMT: currentProductionMT,
          shortfallMT: currentShortfallMT,
          shortfallPercentage: shortfallPercent,
          requiredAdditionalProductionMT: currentShortfallMT,
          riskStatus: "HIGH RISK"
        },
        historical,
        projected,
        solutions
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
