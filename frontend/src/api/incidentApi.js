import axiosInstance from './axios';

export const getIncidents = async () => {
  const response = await axiosInstance.get('/api/v1/incidents/');
  return response.data;
};

export const getIncidentById = async (incidentId) => {
  const response = await axiosInstance.get(`/api/v1/incidents/${incidentId}`);
  return response.data;
};

export const createIncident = async (incidentData) => {
  const response = await axiosInstance.post('/api/v1/incidents/', incidentData);
  return response.data;
};

export const updateIncident = async (incidentId, incidentData) => {
  const response = await axiosInstance.patch(`/api/v1/incidents/${incidentId}`, incidentData);
  return response.data;
};

export const deleteIncident = async (incidentId) => {
  const response = await axiosInstance.delete(`/api/v1/incidents/${incidentId}`);
  return response.data;
};
