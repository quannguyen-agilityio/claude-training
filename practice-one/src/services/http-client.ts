/* eslint-disable func-names */
import axios from 'axios';
import { API_URLS } from './app-config';

// Create a new instance of axios
const axiosClient = axios.create({
  baseURL: API_URLS.ROOT_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Transform data for all responses
    return response.data;
  },

  function (error) {
    if (!error.response) {
      throw new Error('Network error. Please try again later.');
    }
    throw new Error(error.message);
  },
);

export { axiosClient };
