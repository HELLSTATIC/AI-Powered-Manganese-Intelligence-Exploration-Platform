const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Uploads statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/mines', require('./routes/mineRoutes'));
app.use('/api/production', require('./routes/productionRoutes'));
app.use('/api/shortfall', require('./routes/shortfallRoutes'));
app.use('/api/exploration', require('./routes/explorationRoutes'));
app.use('/api/geology', require('./routes/geologyRoutes'));
app.use('/api/satellite', require('./routes/satelliteRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));
app.use('/api/data-sources', require('./routes/dataSourceRoutes'));
app.use('/api/ml', require('./routes/mlRoutes'));

// Health Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Express REST Backend',
    database: mongoose.connection.readyState === 1 ? 'CONNECTED' : 'STANDALONE_FALLBACK',
    timestamp: new Date()
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    platform: 'Manganese Intelligence & Exploration Platform Backend API',
    status: 'ACTIVE',
    version: '1.0.0'
  });
});

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/manganese_db';
mongoose.connect(MONGO_URI)
  .then(() => console.log(`MongoDB Connected successfully at ${MONGO_URI}`))
  .catch((err) => console.log(`MongoDB Connection Warning: ${err.message}. Operating in standalone demo mode.`));

app.listen(PORT, () => {
  console.log(`Express Backend Server running on http://localhost:${PORT}`);
});
