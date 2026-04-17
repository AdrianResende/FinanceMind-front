import * as React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores';
import { loginWithBackend } from '@/services';

type LoginLocationState = {
  from?: string;
};

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useAuthStore();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const redirectTo = (location.state as LoginLocationState | null)?.from ?? '/dashboard';

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const loginInDemoMode = () => {
    login(
      {
        id: 'demo-user',
        name: 'Usuário Demo',
        email: email.trim().toLowerCase() || 'demo@financemind.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FinanceMindDemo',
        role: 'user',
      },
      'demo-token'
    );

    navigate(redirectTo, { replace: true });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setErrorMessage('Preencha e-mail e senha para entrar.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const authData = await loginWithBackend({
        email: cleanEmail,
        password: cleanPassword,
      });

      login(authData.user, authData.token);
      navigate(redirectTo, { replace: true });
    } catch {
      setErrorMessage('Não foi possível autenticar com o backend. Verifique as credenciais e a API.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid w-full gap-8 lg:grid-cols-2">
        <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-card">
          <h1 className="text-3xl font-bold text-gray-900">Entrar na plataforma</h1>
          <p className="mt-3 text-gray-600">
            Faça login para desbloquear o simulador e as explicações detalhadas de cada tema financeiro.
          </p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="voce@empresa.com"
                className="h-11 w-full rounded-lg border border-gray-300 px-3 text-gray-900 outline-none transition focus:border-brand-teal-500 focus:ring-2 focus:ring-brand-teal-200"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Sua senha"
                className="h-11 w-full rounded-lg border border-gray-300 px-3 text-gray-900 outline-none transition focus:border-brand-teal-500 focus:ring-2 focus:ring-brand-teal-200"
              />
            </div>

            {errorMessage ? (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {errorMessage}
              </div>
            ) : null}

            <Button type="submit" disabled={isSubmitting} className="h-11 w-full bg-brand-teal-600 hover:bg-brand-teal-700 disabled:opacity-70">
              {isSubmitting ? 'Entrando...' : 'Entrar e liberar conteúdo'}
            </Button>

            <Button type="button" variant="outline" onClick={loginInDemoMode} className="h-11 w-full">
              Entrar sem backend por enquanto
            </Button>
          </form>

          <p className="mt-4 text-sm text-gray-500">
            O formulário segue preparado para backend em VITE_API_URL + VITE_AUTH_LOGIN_PATH, mas você pode usar o acesso temporário de demonstração enquanto a API não estiver pronta.
          </p>
        </section>

        <section className="rounded-2xl bg-gradient-to-br from-brand-teal-600 to-brand-teal-800 p-8 text-white shadow-xl">
          <h2 className="text-2xl font-bold">O que você desbloqueia ao entrar</h2>
          <ul className="mt-5 space-y-3 text-white/90">
            <li>Simulador de investimentos com comparação de cenários.</li>
            <li>Explicação prática de risco, liquidez e rentabilidade.</li>
            <li>Glossário financeiro com termos em linguagem simples.</li>
          </ul>
          <div className="mt-8 rounded-xl border border-white/25 bg-white/10 p-4 text-sm text-white/95">
            Quer conhecer antes de entrar? Volte para a visão pública e veja como a plataforma funciona.
            <div className="mt-3">
              <Link to="/" className="font-semibold text-white underline underline-offset-4">
                Ver dashboard pública
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}