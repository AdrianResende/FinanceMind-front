import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// AuthUser é o subconjunto necessário em runtime (sessão client-side).
// O tipo completo User (com createdAt/updatedAt) fica em @/types/common.
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: 'admin' | 'user';
}

// Mantido para compatibilidade com importações existentes de @/stores/authStore.
/** @deprecated Use AuthUser. O alias será removido futuramente. */
export type User = AuthUser;

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user: AuthUser, token: string) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;
