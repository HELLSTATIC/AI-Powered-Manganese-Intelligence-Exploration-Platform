import os
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_absolute_error
import joblib

def generate_and_train_reserve_model():
    print("Training Manganese Reserve Estimation Model...")
    np.random.seed(42)
    n_samples = 1000

    lats = np.random.uniform(14.0, 22.5, n_samples)
    lons = np.random.uniform(75.5, 86.0, n_samples)
    mn_percent = np.random.uniform(15.0, 48.0, n_samples)
    fe_percent = np.random.uniform(4.0, 22.0, n_samples)
    sio2_percent = np.random.uniform(8.0, 32.0, n_samples)
    p_percent = np.random.uniform(0.05, 0.45, n_samples)
    area_hectares = np.random.uniform(100, 3500, n_samples)
    depth_meters = np.random.uniform(30, 600, n_samples)

    # Reserve formula: Area * Depth * Specific Gravity (~4.2) * Grade factor
    grade_factor = mn_percent / 100.0
    estimated_reserve_mt = (
        area_hectares * 10000 * depth_meters * 0.15 * 3.8 * grade_factor / 1000
    ) + np.random.normal(0, 50000, n_samples)
    estimated_reserve_mt = np.maximum(estimated_reserve_mt, 10000)

    df = pd.DataFrame({
        'latitude': lats,
        'longitude': lons,
        'mn_percent': mn_percent,
        'fe_percent': fe_percent,
        'sio2_percent': sio2_percent,
        'p_percent': p_percent,
        'area_hectares': area_hectares,
        'depth_meters': depth_meters,
        'reserve_mt': estimated_reserve_mt
    })

    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    models_dir = os.path.join(base_dir, 'models')
    data_dir = os.path.join(base_dir, 'data')
    os.makedirs(models_dir, exist_ok=True)
    os.makedirs(data_dir, exist_ok=True)

    feature_cols = ['latitude', 'longitude', 'mn_percent', 'fe_percent', 'sio2_percent', 'p_percent', 'area_hectares', 'depth_meters']
    X = df[feature_cols]
    y = df['reserve_mt']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    model = RandomForestRegressor(n_estimators=150, max_depth=12, random_state=42)
    model.fit(X_train_scaled, y_train)

    preds = model.predict(X_test_scaled)
    r2 = r2_score(y_test, preds)
    mae = mean_absolute_error(y_test, preds)
    print(f"Random Forest Regressor R2 Score: {r2:.4f}, MAE: {mae:.2f} MT")

    model_path = os.path.join(models_dir, 'reserve_model.joblib')
    scaler_path = os.path.join(models_dir, 'reserve_scaler.joblib')
    joblib.dump(model, model_path)
    joblib.dump(scaler, scaler_path)
    print(f"Reserve model and scaler saved to {models_dir}")

    # Generate MOIL Reserve Predictions CSV
    moil_mines = [
        {"name": "Dongri Buzurg Mine", "state": "Maharashtra", "district": "Bhandara", "latitude": 21.5321, "longitude": 79.7123, "mn": 42.5, "fe": 7.2, "sio2": 11.4, "p": 0.18, "area": 1450, "depth": 320, "current_reserve": 12500000},
        {"name": "Balaghat Mine", "state": "Madhya Pradesh", "district": "Balaghat", "latitude": 21.8152, "longitude": 80.1843, "mn": 44.0, "fe": 6.8, "sio2": 10.2, "p": 0.15, "area": 2100, "depth": 450, "current_reserve": 24800000},
        {"name": "Chikla Mine", "state": "Maharashtra", "district": "Bhandara", "latitude": 21.5540, "longitude": 79.6890, "mn": 38.2, "fe": 9.1, "sio2": 14.2, "p": 0.22, "area": 980, "depth": 280, "current_reserve": 8400000},
        {"name": "Kandri Mine", "state": "Maharashtra", "district": "Nagpur", "latitude": 21.4180, "longitude": 79.2630, "mn": 39.5, "fe": 8.4, "sio2": 13.0, "p": 0.19, "area": 1120, "depth": 310, "current_reserve": 9200000},
        {"name": "Mansar Mine", "state": "Maharashtra", "district": "Nagpur", "latitude": 21.3960, "longitude": 79.2550, "mn": 36.8, "fe": 10.5, "sio2": 16.1, "p": 0.25, "area": 850, "depth": 240, "current_reserve": 6100000},
        {"name": "Tirodi Mine", "state": "Madhya Pradesh", "district": "Balaghat", "latitude": 21.6810, "longitude": 79.7420, "mn": 41.0, "fe": 7.8, "sio2": 12.0, "p": 0.17, "area": 1600, "depth": 360, "current_reserve": 15300000},
        {"name": "Ukwa Mine", "state": "Madhya Pradesh", "district": "Balaghat", "latitude": 21.9680, "longitude": 80.4720, "mn": 40.2, "fe": 8.0, "sio2": 12.5, "p": 0.16, "area": 1350, "depth": 300, "current_reserve": 11200000},
        {"name": "Gumgaon Mine", "state": "Maharashtra", "district": "Nagpur", "latitude": 21.3850, "longitude": 79.2010, "mn": 35.5, "fe": 11.2, "sio2": 17.5, "p": 0.28, "area": 720, "depth": 210, "current_reserve": 4800000},
        {"name": "Barjamda Mine", "state": "Odisha", "district": "Keonjhar", "latitude": 22.1520, "longitude": 85.3810, "mn": 43.1, "fe": 6.5, "sio2": 9.8, "p": 0.14, "area": 1950, "depth": 410, "current_reserve": 19400000},
        {"name": "Sandur Mine", "state": "Karnataka", "district": "Ballari", "latitude": 15.0840, "longitude": 76.5420, "mn": 37.0, "fe": 12.0, "sio2": 15.0, "p": 0.20, "area": 1800, "depth": 350, "current_reserve": 13700000}
    ]

    moil_df = pd.DataFrame(moil_mines)
    X_moil = moil_df[['latitude', 'longitude', 'mn', 'fe', 'sio2', 'p', 'area', 'depth']]
    X_moil.columns = feature_cols
    X_moil_scaled = scaler.transform(X_moil)
    moil_df['ml_predicted_reserve_mt'] = model.predict(X_moil_scaled).round(0)
    moil_df['delta_percent'] = (((moil_df['ml_predicted_reserve_mt'] - moil_df['current_reserve']) / moil_df['current_reserve']) * 100).round(2)

    moil_csv_path = os.path.join(data_dir, 'moil_reserve_predictions.csv')
    moil_df.to_csv(moil_csv_path, index=False)
    print(f"MOIL reserve predictions saved to {moil_csv_path}")

if __name__ == "__main__":
    generate_and_train_reserve_model()
