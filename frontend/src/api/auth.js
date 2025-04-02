import axios from 'axios';
import { auth } from '../firebase/firebase';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercept requests to add auth token
api.interceptors.request.use(async (config) => {
  try {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return Promise.reject(error);
  }
});

export const authenticateUser = async () => {
  try {
    const response = await api.post('/auth');
    return response.data;
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};