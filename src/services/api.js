import axios from 'axios';

const clearAuthState = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('lastActiveMenu');
};

const api = axios.create({
  baseURL: 'https://scentvault-api.my.id/api/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      clearAuthState();
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
