import axiosInstance from './axios';

export const loginUser = async (email, password) => {
  const formData = new URLSearchParams();

  formData.append('username', email);
  formData.append('password', password);

  const response = await axiosInstance.post(
    '/api/v1/auth/login',
    formData,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axiosInstance.post(
    '/api/v1/auth/register',
    userData
  );

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get('/api/v1/auth/me');
  return response.data;
};