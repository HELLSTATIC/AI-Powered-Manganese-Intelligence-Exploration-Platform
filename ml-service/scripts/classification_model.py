import os
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score
import joblib

def generate_and_train_classification_model():
    print("Generating manganese potential training data...")
    np.random.seed(42)
    n_samples = 1200

    # Realistic coordinate bounds for Central/Eastern India manganese belts (MP, MH, Odisha, AP, Karnataka)
    # E.g. Lat 14.0 to 22.5, Long 75.5 to 86.0
    lats = np.random.uniform(14.0, 22.5, n_samples)
    lons = np.random.uniform(75.5, 86.0, n_samples)

    # Chemical Composition % (Mn, Fe, SiO2, P)
    mn_percent = np.random.uniform(15.0, 48.0, n_samples)
    fe_percent = np.random.uniform(4.0, 22.0, n_samples)
    sio2_percent = np.random.uniform(8.0, 32.0, n_samples)
    p_percent = np.random.uniform(0.05, 0.45, n_samples)

    # Physical parameters
    area_hectares = np.random.uniform(100, 3500, n_samples)
    depth_meters = np.random.uniform(30, 600, n_samples)

    # Calculate potential score formula based on economic geology principles
    # High Mn (>32%), reasonable Fe/SiO2 ratio, deeper reserves & area
    score = (
        (mn_percent * 2.2) 
        - (fe_percent * 0.8) 
        - (sio2_percent * 0.5) 
        - (p_percent * 25.0) 
        + (area_hectares / 150.0) 
        + (depth_meters / 50.0)
        + np.random.normal(0, 5, n_samples)
    )

    potential_labels = []
    for s in score:
        if s > 72:
            potential_labels.append("HIGH")
        elif s > 50:
            potential_labels.append("MEDIUM")
        else:
            potential_labels.append("LOW")

    df = pd.DataFrame({
        'latitude': lats,
        'longitude': lons,
        'mn_percent': mn_percent,
        'fe_percent': fe_percent,
        'sio2_percent': sio2_percent,
        'p_percent': p_percent,
        'area_hectares': area_hectares,
        'depth_meters': depth_meters,
        'potential_level': potential_labels
    })

    # Ensure output dirs
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_dir = os.path.join(base_dir, 'data')
    models_dir = os.path.join(base_dir, 'models')
    os.makedirs(data_dir, exist_ok=True)
    os.makedirs(models_dir, exist_ok=True)

    csv_path = os.path.join(data_dir, 'training_data.csv')
    df.to_csv(csv_path, index=False)
    print(f"Training data saved to {csv_path}")

    # Feature Matrix & Target
    feature_cols = ['latitude', 'longitude', 'mn_percent', 'fe_percent', 'sio2_percent', 'p_percent', 'area_hectares', 'depth_meters']
    X = df[feature_cols]
    y = df['potential_level']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    model = RandomForestClassifier(n_estimators=150, max_depth=12, random_state=42)
    model.fit(X_train_scaled, y_train)

    preds = model.predict(X_test_scaled)
    acc = accuracy_score(y_test, preds)
    print(f"Random Forest Classifier Model Accuracy: {acc * 100:.2f}%")

    model_path = os.path.join(models_dir, 'classification_model.joblib')
    scaler_path = os.path.join(models_dir, 'classification_scaler.joblib')
    joblib.dump(model, model_path)
    joblib.dump(scaler, scaler_path)
    print(f"Classification model and scaler saved to {models_dir}")

if __name__ == "__main__":
    generate_and_train_classification_model()
