# Manganese Intelligence & Exploration Platform

**Smart India Hackathon (SIH) Project**  
*Problem Statement:* "Using AI/ML, Space Technology, GIS and Data Analytics to identify manganese potential zones and help overcome manganese production shortfalls in India."

---

## 🌟 Executive Overview

The **Manganese Intelligence & Exploration Platform** is a complete, production-ready full-stack national mineral control center. It integrates spaceborne satellite spectral proxies (Manganese Index MNI, Iron Oxide Index IOI, Clay Mineral Index CMI), scikit-learn Random Forest Machine Learning microservices, interactive Leaflet GIS maps, mine production registries, demand-shortfall forecasting analytics, file upload pipelines, and automated executive report generation.

---

## 🏗️ System Architecture

```text
React 18 Frontend (Vite + Tailwind CSS + Leaflet + Recharts)
                       │
                       │ REST API (HTTP JSON)
                       ▼
Node.js + Express Backend (Port 5000)
       ├── MongoDB Database (Mongoose Models & Fallback Engine)
       └── HTTP Service Layer
                       │
                       │ REST API (HTTP JSON)
                       ▼
Python FastAPI ML Microservice (Port 8000)
       ├── RandomForestClassifier (Potential Zone Classifier)
       ├── RandomForestRegressor (Reserve Estimator)
       └── Candidate Exploration Recommendation Engine
```

---

## 📁 Repository Structure

```text
project-root/
│
├── frontend/                     # React + Vite + Tailwind GIS Frontend
│   ├── src/
│   │   ├── components/           # Navbar, Sidebar, MapComponent, StatCard, FeatureImportanceChart, DisclaimerBanner
│   │   ├── pages/                # LandingPage, Dashboard, ExplorationMap, AIAnalysis, SatelliteIntelligence, ProductionAnalytics, ShortfallAnalysis, MineIntelligence, GeologicalExplorer, DataUpload, Reports, DataSources, About, Login, Register
│   │   ├── services/             # Axios API clients (api.js, mlService.js)
│   │   ├── App.jsx               # React Router (15 Routes)
│   │   ├── main.jsx              # Application entry point
│   │   └── index.css             # Dark futuristic GIS styling
│   ├── .env                      # Environment Variables
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/                      # Node.js + Express + MongoDB Backend
│   ├── controllers/              # Auth, Dashboard, Mine, Production, Shortfall, Exploration, Geology, Satellite, Upload, Report, DataSource, ML controllers
│   ├── models/                   # Mongoose Schemas (User, Mine, Production, Demand, ExplorationZone, GeologicalRegion, SatelliteData, UploadedFile, Report, DataSource, MLPrediction)
│   ├── routes/                   # REST API routes
│   ├── middleware/               # Auth (JWT) & Upload (Multer) middleware
│   ├── seed/                     # Seed script populating realistic MOIL mine & exploration datasets
│   ├── uploads/                  # File upload directory
│   ├── server.js                 # Express server initialization
│   └── package.json
│
├── ml-service/                   # Python 3 + FastAPI ML Microservice
│   ├── app.py                    # FastAPI application & model inference endpoints
│   ├── models/                   # Trained joblib files (classification_model.joblib, classification_scaler.joblib, reserve_model.joblib, reserve_scaler.joblib)
│   ├── scripts/                  # Training & generation scripts (classification_model.py, reserve_model.py, map.py)
│   ├── data/                     # Datasets (training_data.csv, exploration_recommendations.csv, moil_reserve_predictions.csv)
│   └── requirements.txt
│
└── README.md                     # Platform Documentation
```

---

## 🚀 Installation & Quick Start Guide

### 1. Python ML Service Setup (Port 8000)

```bash
cd ml-service

# Create and activate virtual environment
python -m venv venv

# Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Train models and generate joblib & CSV assets
python scripts/classification_model.py
python scripts/reserve_model.py
python scripts/map.py

# Start FastAPI server
uvicorn app:app --reload --port 8000
```

### 2. Node.js Express Backend Setup (Port 5000)

```bash
cd backend

# Install dependencies
npm install

# Seed demo dataset into MongoDB (or standalone fallback engine)
npm run seed

# Run Backend Server
npm run dev
```

### 3. React Frontend Setup (Port 5173)

```bash
cd frontend

# Install dependencies
npm install

# Run Vite Dev Server
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## 🛠️ API Reference

### ML Microservice (`http://localhost:8000`)
- `GET /health`: Health status & loaded model check.
- `POST /predict/potential`: Classification model (HIGH, MEDIUM, LOW tiers + confidence).
- `POST /predict/reserve`: Regression model (Reserve MT + confidence range).
- `POST /predict/full-analysis`: Combined potential, reserve, feature importance & recommendations.
- `GET /recommendations`: Candidate exploration recommendations dataset.

### Node Express Backend (`http://localhost:5000/api`)
- `GET /api/dashboard`: Executive KPIs, production trends, demand gap, and state reserves.
- `GET /api/mines`: Searchable mine registry with grades, coordinates, and depths.
- `GET /api/production`: Year-wise & state-wise production statistics.
- `GET /api/shortfall`: Demand vs. Production gap calculation (`Shortfall = Demand - Production`) and solutions.
- `GET /api/exploration/zones`: Candidate exploration targets for GIS Leaflet map.
- `POST /api/ml/full-analysis`: Node proxy to FastAPI ML microservice.
- `POST /api/upload`: Multer file uploader for CSV/Excel data ingestion & row preview.
- `GET /api/reports` & `POST /api/reports`: Automated report generator & PDF print export.

---

## 🎬 Hackathon Demonstration Workflow

1. **Dashboard (`/dashboard`)**: Show 10 Active Mines, 114.4 Million MT National Reserve, 2.95 MT Current Yield vs. 4.05 MT Demand, and the **1.10 Million MT (27.16%) Deficit**.
2. **Exploration Map (`/exploration`)**: View CARTO Dark Matter GIS map showing active MOIL mines (pickaxe icons) and candidate exploration target circles in the Bhandara & Sausar belt. Click candidate targets to view MNI, NDVI, IOI, CMI values.
3. **AI Analysis (`/ai-analysis`)**: Enter Mn%, Fe%, SiO2%, P%, Area, and Depth. Click **Run Full AI Analysis** to execute the Python FastAPI RandomForest pipeline and render potential tier, confidence, reserve estimate, and horizontal feature importance chart.
4. **Shortfall Analysis (`/shortfall`)**: Review critical alert warnings and strategic mitigation solutions to close the production gap.
5. **Data Upload (`/data-upload`)**: Upload a CSV file and view detected columns and parsed table rows.
6. **Reports (`/reports`)**: Click **Generate New Report** and print/export an Executive Briefing PDF.

---

## ⚠️ Scientific & Geological Disclaimer

> "AI-generated exploration targets are prototype decision-support outputs and must be validated through geological surveys, field sampling, drilling and official resource estimation before being treated as confirmed mineral reserves."
>
> "Satellite spectral indicators are exploratory proxies and are not direct measurements of underground manganese reserves."

---

## 🔮 Future Roadmap

- Real-time satellite imagery streaming integration via Copernicus Open Access Hub.
- Live ISRO Bhuvan WMS/WMTS layer synchronization.
- Deep learning 3D Convolutional Neural Networks (3D-CNN) for subsurface ore body inversion.
- IoT telemetry sensor integration for real-time mine haulage tracking.
