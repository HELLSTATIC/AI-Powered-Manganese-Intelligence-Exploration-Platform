import os
import pandas as pd

def generate_exploration_recommendations():
    print("Generating exploration recommendations dataset for Bhandara & Central India...")
    zones = [
        {
            "zone_id": "BHN-ZONE-001",
            "name": "Dongri-Chikla North Corridor",
            "location": "Bhandara District, Maharashtra",
            "latitude": 21.5712,
            "longitude": 79.7345,
            "area_hectares": 1420,
            "pixel_count": 1580,
            "mean_mni": 0.78,
            "mean_ndvi": 0.42,
            "mean_ioi": 0.84,
            "mean_cmi": 0.65,
            "priority": "HIGH",
            "recommendation": "High priority shallow drilling and core assay recommended along Gondite strike.",
            "supporting_indicators": "Strong MNI spectral anomaly (0.78), elevated Iron Oxide Index (0.84), structural lineament intersection with Sausar metasediments."
        },
        {
            "zone_id": "BHN-ZONE-002",
            "name": "Tirodi Extension East",
            "location": "Balaghat-Bhandara Border",
            "latitude": 21.6980,
            "longitude": 79.7820,
            "area_hectares": 1850,
            "pixel_count": 2050,
            "mean_mni": 0.72,
            "mean_ndvi": 0.51,
            "mean_ioi": 0.79,
            "mean_cmi": 0.58,
            "priority": "HIGH",
            "recommendation": "Conduct detailed ground magnetic survey and exploratory borehole drilling.",
            "supporting_indicators": "Favorable manganese index (0.72), continuous quartzite-gondite ridge, low overburden thickness (<15m)."
        },
        {
            "zone_id": "BHN-ZONE-003",
            "name": "Kandri South Syncline",
            "location": "Nagpur District, Maharashtra",
            "latitude": 21.3890,
            "longitude": 79.2450,
            "area_hectares": 950,
            "pixel_count": 1050,
            "mean_mni": 0.64,
            "mean_ndvi": 0.38,
            "mean_ioi": 0.71,
            "mean_cmi": 0.52,
            "priority": "MEDIUM",
            "recommendation": "Geochemical stream sediment sampling and high-resolution gravity profiling.",
            "supporting_indicators": "Moderate MNI (0.64), fold hinge trap structure, adjacent to historical Kandri open pit mine."
        },
        {
            "zone_id": "BHN-ZONE-004",
            "name": "Mansar West Flank",
            "location": "Nagpur District, Maharashtra",
            "latitude": 21.4120,
            "longitude": 79.2210,
            "area_hectares": 810,
            "pixel_count": 900,
            "mean_mni": 0.58,
            "mean_ndvi": 0.45,
            "mean_ioi": 0.68,
            "mean_cmi": 0.49,
            "priority": "MEDIUM",
            "recommendation": "Pitting and trenching along inferred strike continuation.",
            "supporting_indicators": "Promising clay alteration signature, proximity to active Mansar underground mine workings."
        },
        {
            "zone_id": "BHN-ZONE-005",
            "name": "Ukwa North Plateau",
            "location": "Balaghat District, Madhya Pradesh",
            "latitude": 21.9850,
            "longitude": 80.4910,
            "area_hectares": 2200,
            "pixel_count": 2440,
            "mean_mni": 0.81,
            "mean_ndvi": 0.62,
            "mean_ioi": 0.88,
            "mean_cmi": 0.71,
            "priority": "HIGH",
            "recommendation": "Immediate G3 stage exploration block reservation and deep core drilling.",
            "supporting_indicators": "High grade manganese band exposure, MNI 0.81, stratigraphically equivalent to Balaghat ore horizon."
        },
        {
            "zone_id": "BHN-ZONE-006",
            "name": "Barjamda East Anomaly",
            "location": "Keonjhar District, Odisha",
            "latitude": 22.1850,
            "longitude": 85.4120,
            "area_hectares": 1600,
            "pixel_count": 1780,
            "mean_mni": 0.75,
            "mean_ndvi": 0.55,
            "mean_ioi": 0.82,
            "mean_cmi": 0.63,
            "priority": "HIGH",
            "recommendation": "Airborne hyperspectral ground-truthing and systematic trenching.",
            "supporting_indicators": "Strong manganese-iron oxide composite signature in Iron Ore Supergroup metasediments."
        },
        {
            "zone_id": "BHN-ZONE-007",
            "name": "Sandur North Ridge",
            "location": "Ballari District, Karnataka",
            "latitude": 15.1240,
            "longitude": 76.5650,
            "area_hectares": 1100,
            "pixel_count": 1220,
            "mean_mni": 0.49,
            "mean_ndvi": 0.29,
            "mean_ioi": 0.59,
            "mean_cmi": 0.41,
            "priority": "LOW",
            "recommendation": "Reconnaissance geological mapping prior to geophysical investigation.",
            "supporting_indicators": "Low-to-moderate MNI index (0.49), complex structural folding, ferruginous quartzite interbeds."
        },
        {
            "zone_id": "BHN-ZONE-008",
            "name": "Vizianagaram Garividi South",
            "location": "Vizianagaram District, Andhra Pradesh",
            "latitude": 18.2840,
            "longitude": 83.5420,
            "area_hectares": 750,
            "pixel_count": 830,
            "mean_mni": 0.52,
            "mean_ndvi": 0.41,
            "mean_ioi": 0.63,
            "mean_cmi": 0.44,
            "priority": "LOW",
            "recommendation": "Secondary geochemical survey to delineate kodurite rock associations.",
            "supporting_indicators": "Discontinuous manganese oxide lenses within Khondalite suite rocks."
        }
    ]

    df = pd.DataFrame(zones)
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_dir = os.path.join(base_dir, 'data')
    os.makedirs(data_dir, exist_ok=True)
    csv_path = os.path.join(data_dir, 'exploration_recommendations.csv')
    df.to_csv(csv_path, index=False)
    print(f"Exploration recommendations dataset saved to {csv_path}")

if __name__ == "__main__":
    generate_exploration_recommendations()
