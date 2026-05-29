import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AssetSelector } from './components/AssetSelector';
import { Dashboard } from './components/Dashboard';
import { RiskAnalysis } from './components/RiskAnalysis';

export default function RiskApp() {
  const location = useLocation();
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);

  useEffect(() => {
    const view = new URLSearchParams(location.search).get('view') || 'dashboard';
    setActiveView(view);
    setSelectedTicker(null);
  }, [location.pathname, location.search]);

  const handleSelectAsset = (ticker: string) => {
    setSelectedTicker(ticker);
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
          <div className="fm-surface-soft py-20 text-center">
            <h2 className="mb-4 text-2xl font-bold text-white">Carteira</h2>
            <p className="fm-shell-muted">Funcionalidade em desenvolvimento</p>
          </div>
        );
      case 'alertas':
        return (
          <div className="fm-surface-soft py-20 text-center">
            <h2 className="mb-4 text-2xl font-bold text-white">Alertas</h2>
            <p className="fm-shell-muted">Funcionalidade em desenvolvimento</p>
          </div>
        );
      default:
        return <Dashboard onNavigateToAnalysis={() => setActiveView('analisar')} />;
    }
  };

  return (
    <section className="space-y-6">{renderContent()}</section>
  );
}
