import apiClient from './api';
import type { User } from '@/stores/authStore';

export interface LoginPayload {
  email: string;
  password: string;
}

interface LoginApiResponse {
  token: string;
  user: {
    id: string | number;
    name: string;
    email: string;
    avatar?: string;
    role?: 'admin' | 'user';
  };
}

const LOGIN_PATH = import.meta.env.VITE_AUTH_LOGIN_PATH || '/auth/login';

export async function loginWithBackend(payload: LoginPayload): Promise<{ user: User; token: string }> {
  const response = await apiClient.post<LoginApiResponse>(LOGIN_PATH, payload);
  const { user, token } = response.data;

  return {
    token,
    user: {
      id: String(user.id),
      name: user.name,
      email: user.email,
      avatar: user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.email)}`,
      role: user.role || 'user',
    },
  };
}