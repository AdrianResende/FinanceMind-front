import axios from 'axios';
import type { AxiosError, AxiosInstance } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Instância configurada do Axios
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor de request - adiciona token
 */
apiClient.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config: any) => {
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      try {
        const { state } = JSON.parse(authStorage);
        if (state?.token) {
          config.headers.Authorization = `Bearer ${state.token}`;
        }
      } catch (error) {
        console.error('Error parsing auth token:', error);
      }
    }
    return config;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error: any) => Promise.reject(error)
);

/**
 * Interceptor de response - trata erros
 */
apiClient.interceptors.response.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (response: any) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido - redireciona para login
      localStorage.removeItem('auth-storage');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
