import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Clear token if unauthorized
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

export const authenticateWithGoogle = async (token: string) => {
  try {
    const response = await api.post('/api/v1/auth/login', { googleIdToken: token });
    return response.data;
  } catch (error) {
    throw formatError(error);
  }
};

export const logout = async () => {
  try {
    const response = await api.post('/api/v1/auth/logout');
    return response.data;
  } catch (error) {
    throw formatError(error);
  }
};

export const getProfile = async () => {
  try {
    const response = await api.get('/api/v1/auth/profile');
    return response.data;
  } catch (error) {
    throw formatError(error);
  }
};

export const checkHealth = async () => {
  try {
    const response = await api.get('/api/v1/health');
    return response.data;
  } catch (error) {
    throw formatError(error);
  }
};

export const checkAuthHealth = async () => {
  try {
    const response = await api.get('/api/v1/health/auth');
    return response.data;
  } catch (error) {
    throw formatError(error);
  }
};

// Helper function to format errors
const formatError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.error || error.message;
    
    if (status === 401) {
      return new Error('Unauthorized: Please log in again');
    }
    
    if (status === 403) {
      return new Error('Forbidden: You do not have permission to access this resource');
    }
    
    if (status === 404) {
      return new Error('Not Found: The requested resource was not found');
    }
    
    return new Error(`Request failed: ${message}`);
  }
  
  return error instanceof Error ? error : new Error('An unknown error occurred');
};

export default api;
