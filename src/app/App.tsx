import { Menu } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { AssetSelector } from './components/AssetSelector';
import { RiskAnalysis } from './components/RiskAnalysis';

export default function RiskApp() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const handleSelectAsset = (ticker: string) => {
    setSelectedTicker(ticker);
    setSidebarOpen(false);
  };

  const handleNavigate = (view: string) => {
    setActiveView(view);
    setSelectedTicker(null);
    setSidebarOpen(false);
  };

  const renderContent = () => {
    if (selectedTicker) {
      return <RiskAnalysis ticker={selectedTicker} onBack={() => setSelectedTicker(null)} />;
    }

    switch (activeView) {
      case 'dashboard':
        return <Dashboard onNavigateToAnalysis={() => setActiveView('analisar')} />;
      case 'analisar':
        return <AssetSelector onSelect={handleSelectAsset} selectedTicker={selectedTicker || undefined} />;
      case 'carteira':
        return (
          <div className="rounded-xl border border-slate-700 bg-[#1F2937] py-20 text-center">
            <h2 className="mb-4 text-2xl font-bold text-white">Carteira</h2>
            <p className="text-gray-400">Funcionalidade em desenvolvimento</p>
          </div>
        );
      case 'alertas':
        return (
          <div className="rounded-xl border border-slate-700 bg-[#1F2937] py-20 text-center">
            <h2 className="mb-4 text-2xl font-bold text-white">Alertas</h2>
            <p className="text-gray-400">Funcionalidade em desenvolvimento</p>
          </div>
        );
      default:
        return <Dashboard onNavigateToAnalysis={() => setActiveView('analisar')} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-white">
      <Sidebar activeView={activeView} onNavigate={handleNavigate} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="min-h-screen lg:pl-60">
        <header className="sticky top-0 z-20 border-b border-slate-800 bg-[#0B1220]/95 backdrop-blur">
          <div className="flex min-h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-[#111827] text-slate-200 lg:hidden"
                aria-label="Abrir menu"
              >
                <Menu size={18} />
              </button>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Painel protegido</p>
                <h1 className="text-lg font-semibold text-white">Análise de risco de investimentos</h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden rounded-full border border-slate-700 bg-[#111827] px-3 py-1 text-sm text-slate-300 sm:block">
                Ambiente autenticado
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-slate-700 bg-[#111827] px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-slate-500 hover:bg-slate-800"
              >
                Sair
              </button>
            </div>
          </div>
        </header>

        <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">{renderContent()}</div>
      </main>
    </div>
  );
}
