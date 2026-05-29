import { useEffect } from 'react';
import { useAuthStore } from '@/stores';

/**
 * Hook utilitário para simular login (apenas para desenvolvimento/demonstração)
 * Remove isso em produção e use autenticação real
 */
export function useMockAuth() {
  const { login, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      console.log('Usuário não autenticado. Você pode usar o AuthDemo para fazer login.');
    }
  }, [isAuthenticated, login]);
}
