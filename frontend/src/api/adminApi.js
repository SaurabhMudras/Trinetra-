import axiosInstance from './axios';

export const getAdminDashboard = async () => {
  const response = await axiosInstance.get('/api/v1/admin/dashboard');
  return response.data;
};

export const getUsers = async () => {
  const response = await axiosInstance.get('/api/v1/admin/users');
  return response.data;
};

export const getUserById = async (userId) => {
  const response = await axiosInstance.get(`/api/v1/admin/users/${userId}`);
  return response.data;
};

export const updateUserRole = async (userId, role) => {
  const response = await axiosInstance.patch(`/api/v1/admin/users/${userId}/role`, { role });
  return response.data;
};

export const updateUserStatus = async (userId, isActive) => {
  const response = await axiosInstance.patch(`/api/v1/admin/users/${userId}/status`, { is_active: isActive });
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await axiosInstance.delete(`/api/v1/admin/users/${userId}`);
  return response.data;
};
