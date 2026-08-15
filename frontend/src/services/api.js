import axios from 'axios';
import keycloak from '../keycloak';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    if (keycloak.token) {
      config.headers.Authorization = `Bearer ${keycloak.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await keycloak.updateToken(30);
        error.config.headers.Authorization = `Bearer ${keycloak.token}`;
        return api.request(error.config);
      } catch (refreshError) {
        keycloak.login();
      }
    }
    return Promise.reject(error);
  }
);

export default api;