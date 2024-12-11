import axios, { AxiosError } from 'axios';

import { serverBaseUrl } from '@/config';

const api = axios.create({
  baseURL: serverBaseUrl
});

// Add token to all requests
api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError) {
    if (error.response?.status === 401) {
      // Clear token if unauthorized
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

export async function authenticateWithGoogle(token: string) {
  try {
    const response = await api.post('/auth/login', { googleIdToken: token });
    return response.data;
  } catch (error) {
    throw formatError(error);
  }
}

export async function logout() {
  try {
    const response = await api.post('/auth/logout');
    return response.data;
  } catch (error) {
    throw formatError(error);
  }
}

export async function getProfile() {
  try {
    const response = await api.get('/auth/profile');
    return response.data;
  } catch (error) {
    throw formatError(error);
  }
}

export async function checkHealth() {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw formatError(error);
  }
}

export async function checkAuthHealth() {
  try {
    const response = await api.get('/health/auth');
    return response.data;
  } catch (error) {
    throw formatError(error);
  }
}

// Helper function to format errors
function formatError(error: unknown) {
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
}

export default api;
