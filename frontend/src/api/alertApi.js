import axiosInstance from './axios';

export const getAlerts = async () => {
  const response = await axiosInstance.get('/api/v1/alerts/');
  return response.data;
};

export const getAlertById = async (alertId) => {
  const response = await axiosInstance.get(`/api/v1/alerts/${alertId}`);
  return response.data;
};

export const createAlert = async (alertData) => {
  const response = await axiosInstance.post('/api/v1/alerts/', alertData);
  return response.data;
};

export const updateAlert = async (alertId, alertData) => {
  const response = await axiosInstance.patch(`/api/v1/alerts/${alertId}`, alertData);
  return response.data;
};

export const deleteAlert = async (alertId) => {
  const response = await axiosInstance.delete(`/api/v1/alerts/${alertId}`);
  return response.data;
};
