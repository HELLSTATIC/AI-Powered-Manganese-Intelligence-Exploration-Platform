import axios from 'axios';

// Get API base URL from environment variable or fallback to production Render backend URL
const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL;
  if (envUrl) {
    let url = envUrl.trim();
    if (!url.endsWith('/api') && !url.endsWith('/api/')) {
      url = url.replace(/\/+$/, '') + '/api';
    }
    return url.replace(/\/+$/, '');
  }
  
  // Default fallbacks
  if (import.meta.env.MODE === 'production') {
    return 'https://manganese-backend-s3jt.onrender.com/api';
  }
  
  return '/api';
};

const API_BASE_URL = getApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sih_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;

