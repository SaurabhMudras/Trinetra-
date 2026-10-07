import axiosInstance from './axios';

export const getDashboardStats = async () => {
  const response = await axiosInstance.get('/api/v1/admin/dashboard');
  return response.data;
};

export const getIncidents = async () => {
  const response = await axiosInstance.get('/api/v1/incidents/');
  return response.data;
};

export const getAlerts = async () => {
  const response = await axiosInstance.get('/api/v1/alerts/');
  return response.data;
};