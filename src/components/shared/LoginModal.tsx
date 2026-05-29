import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuthStore, useUIStore } from '@/stores';
import { loginWithBackend } from '@/services';

export default function LoginModal() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuthStore();
  const { isLoginModalOpen, closeLoginModal } = useUIStore();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Fecha ao autenticar
  React.useEffect(() => {
    if (isAuthenticated && isLoginModalOpen) {
      closeLoginModal();
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, isLoginModalOpen, closeLoginModal, navigate]);

  // Fecha com ESC
  React.useEffect(() => {
    if (!isLoginModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLoginModal();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isLoginModalOpen, closeLoginModal]);

  // Trava scroll do body quando aberto
  React.useEffect(() => {
    document.body.style.overflow = isLoginModalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isLoginModalOpen]);

  if (!isLoginModalOpen) return null;

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setErrorMessage(null);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetForm();
    closeLoginModal();
  };

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
      const authData = await loginWithBackend({ email: cleanEmail, password: cleanPassword });
      login(authData.user, authData.token);
    } catch {
      setErrorMessage('Não foi possível autenticar. Verifique as credenciais ou use o acesso demo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Entrar na plataforma"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl shadow-2xl">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/20 text-white/80 transition hover:bg-black/40 hover:text-white"
          aria-label="Fechar"
        >
          ✕
        </button>

        <div className="grid md:grid-cols-2">
          {/* Formulário */}
          <section className="bg-white p-8">
            <h2 className="fm-display text-2xl font-bold text-gray-900">Entrar na plataforma</h2>
            <p className="mt-2 text-sm text-gray-500">
              Acesse simulações, análises e muito mais.
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="modal-email" className="mb-1.5 block text-sm font-medium text-gray-700">
                  E-mail
                </label>
                <input
                  id="modal-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voce@empresa.com"
                  autoComplete="email"
                  className="h-11 w-full rounded-lg border border-gray-300 px-3 text-gray-900 outline-none transition focus:border-brand-teal-500 focus:ring-2 focus:ring-brand-teal-200"
                />
              </div>

              <div>
                <label htmlFor="modal-password" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <input
                  id="modal-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  autoComplete="current-password"
                  className="h-11 w-full rounded-lg border border-gray-300 px-3 text-gray-900 outline-none transition focus:border-brand-teal-500 focus:ring-2 focus:ring-brand-teal-200"
                />
              </div>

              {errorMessage ? (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {errorMessage}
                </div>
              ) : null}

              <Button type="submit" variant="brand" disabled={isSubmitting} className="h-11 w-full disabled:opacity-70">
                {isSubmitting ? 'Entrando...' : 'Entrar'}
              </Button>

              <Button type="button" variant="brandOutline" onClick={loginInDemoMode} className="h-11 w-full">
                Entrar sem backend (demo)
              </Button>
            </form>
          </section>

          {/* Benefícios */}
          <section className="flex flex-col justify-center rounded-r-2xl bg-gradient-to-br from-brand-teal-600 to-brand-teal-800 p-8 text-white">
            <h3 className="text-xl font-bold">O que você desbloqueia</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/90">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-white/70">✓</span>
                Simulador de investimentos com comparação de cenários
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-white/70">✓</span>
                Análise de risco por ativo e carteira completa
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-white/70">✓</span>
                IA Insights ilimitados e mentoria financeira
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-white/70">✓</span>
                Glossário em linguagem simples, sem jargões
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
