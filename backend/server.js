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

// Dynamic CORS configuration allowing Vercel deployment origins and local development
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:4173',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000'
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL.trim());
}

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app') ||
      process.env.NODE_ENV !== 'production'
    ) {
      return callback(null, origin);
    }
    return callback(null, origin);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

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
const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/manganese_db';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected successfully.'))
  .catch((err) => console.log(`MongoDB Connection Warning: ${err.message}. Operating in standalone fallback mode.`));

app.listen(PORT, () => {
  console.log(`Express Backend Server running on port ${PORT}`);
});

