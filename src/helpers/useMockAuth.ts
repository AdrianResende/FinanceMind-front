import { useEffect } from 'react';
import { useAuthStore } from '@/stores';

/**
 * Hook utilitário para simular login (apenas para desenvolvimento/demonstração)
 * Remove isso em produção e use autenticação real
 */
export function useMockAuth() {
  const { login, isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Simular login automático apenas para demonstração
    // Descomentar as linhas abaixo para ativar
    if (!isAuthenticated) {
      console.log('Usuário não autenticado. Você pode usar o AuthDemo para fazer login.');
    }
    
    // Exemplo de uso:
    // const mockUser = {
    //   id: '1',
    //   name: 'Usuário Demo',
    //   email: 'demo@financemind.com',
    //   avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo',
    //   role: 'user' as const,
    // };
    // const mockToken = 'mock-jwt-token-demo';
    // login(mockUser, mockToken);
  }, [isAuthenticated, login]);
}
