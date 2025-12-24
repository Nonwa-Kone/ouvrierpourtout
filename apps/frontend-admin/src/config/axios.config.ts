import axios from 'axios';
import { env } from './app.config';

export const AxiosConfig = axios.create({
  baseURL: `${env.BASE_URL}${env.VERSION}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

AxiosConfig.interceptors.request.use(
  async (config) => {
    const token = sessionStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AxiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
