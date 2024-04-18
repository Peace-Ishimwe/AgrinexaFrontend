import axios, { AxiosInstance } from 'axios';
import { getData } from './storage';

const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL;
const commonHeaders = {
  'Content-Type': 'application/json',
};

const unauthorizedAxiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: commonHeaders,
});


const authorizedAxiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: commonHeaders,
});

authorizedAxiosInstance.interceptors.request.use(
  async (config) => {
    const token =await  getData('token');
    console.log(token)
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const unauthorizedAPI = unauthorizedAxiosInstance;
export const authorizedAPI = authorizedAxiosInstance;
