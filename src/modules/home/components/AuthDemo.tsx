import { useAuthStore } from '@/stores';
import { Button } from '@/components/ui/button';

/**
 * Componente de demonstração para testar a Navbar
 * Permite fazer login/logout facilmente
 */
export function AuthDemo() {
  const { user, isAuthenticated, login, logout } = useAuthStore();

  const handleMockLogin = () => {
    const mockUser = {
      id: '1',
      name: 'João Silva',
      email: 'joao@financemind.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joao',
      role: 'user' as const,
    };
    const mockToken = 'mock-jwt-token';
    login(mockUser, mockToken);
  };

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">🔐 Demo de Autenticação</h2>
      
      {isAuthenticated && user ? (
        <div className="space-y-3">
          <div className="rounded bg-green-50 p-3 text-sm">
            <p className="font-medium text-green-900">✓ Autenticado</p>
            <p className="text-green-700 mt-1">Usuário: {user.name}</p>
          </div>
          <Button onClick={logout} variant="outline" className="w-full">
            Fazer Logout
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="rounded bg-gray-50 p-3 text-sm text-gray-600">
            Faça login para ver o menu de usuário na navbar
          </div>
          <Button onClick={handleMockLogin} className="w-full">
            Fazer Login (Demo)
          </Button>
        </div>
      )}
    </div>
  );
}
