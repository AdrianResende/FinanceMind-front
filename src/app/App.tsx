import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AssetSelector } from './components/AssetSelector';
import { Dashboard } from './components/Dashboard';
import { RiskAnalysis } from './components/RiskAnalysis';

function FeaturePlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-[#d7dde5] bg-[#f7f9fb] py-20 text-center shadow-[0_10px_24px_-14px_rgba(3,18,37,0.22)]">
      <h2 className="mb-4 text-2xl font-bold text-[#191c1e]">{title}</h2>
      <p className="mx-auto max-w-2xl text-sm text-[#5f6671]">{description}</p>
    </div>
  );
}

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
      case 'ativos':
        return <Dashboard onNavigateToAnalysis={() => setActiveView('analisar')} variant="assets" />;
      case 'aprendizado':
        return (
          <FeaturePlaceholder
            title="Centro de aprendizado"
            description="Explore trilhas guiadas de educacao financeira, fundamentos de risco e leitura de mercado sem misturar esta area com o Chat IA."
          />
        );
      case 'carteira':
        return (
          <FeaturePlaceholder title="Carteira" description="Funcionalidade em desenvolvimento" />
        );
      case 'alertas':
        return (
          <FeaturePlaceholder title="Alertas" description="Funcionalidade em desenvolvimento" />
        );
      default:
        return <Dashboard onNavigateToAnalysis={() => setActiveView('analisar')} />;
    }
  };

  return (
    <section className="space-y-6">{renderContent()}</section>
  );
}
