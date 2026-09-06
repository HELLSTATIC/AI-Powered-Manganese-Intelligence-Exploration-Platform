import api from './api';

export const predictPotential = async (data) => {
  const res = await api.post('/ml/predict-potential', data);
  return res.data;
};

export const predictReserve = async (data) => {
  const res = await api.post('/ml/predict-reserve', data);
  return res.data;
};

export const predictFullAnalysis = async (data) => {
  const res = await api.post('/ml/full-analysis', data);
  return res.data;
};
