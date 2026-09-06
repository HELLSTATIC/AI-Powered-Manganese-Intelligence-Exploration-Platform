const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sih_manganese_secret_key_2026');
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Unauthorized - Invalid or expired token' });
    }
  }

  // Allow guest access if no token provided in demo mode
  req.user = { id: 'demo_user', name: 'Demo Analyst', role: 'Analyst' };
  next();
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (req.user && !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: `Role ${req.user.role} is not authorized` });
    }
    next();
  };
};

module.exports = { protect, authorize };
