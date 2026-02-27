import { WelcomeCard, AuthDemo } from './components';

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Bem-vindo ao FinanceMind
        </h1>
        <p className="text-gray-600">
          Gerencie suas finanças de forma inteligente e organizada.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <WelcomeCard />
        
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">📊 Dashboard</h2>
          <p className="text-sm text-gray-600">
            Visualize seus gastos e receitas
          </p>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">💰 Transações</h2>
          <p className="text-sm text-gray-600">
            Registre suas movimentações financeiras
          </p>
        </div>
      </div>

      <AuthDemo />
    </div>
  );
}

