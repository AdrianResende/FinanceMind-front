import { Search, TrendingUp } from 'lucide-react';
import { useMemo, useState } from 'react';

interface AssetSelectorProps {
  onSelect: (ticker: string) => void;
  selectedTicker?: string;
}

interface AssetItem {
  ticker: string;
  name: string;
  sector: string;
  risk: 'Baixo' | 'Médio' | 'Alto';
}

const assets: AssetItem[] = [
  { ticker: 'PETR4', name: 'Petrobras PN', sector: 'Energia', risk: 'Médio' },
  { ticker: 'VALE3', name: 'Vale ON', sector: 'Mineração', risk: 'Médio' },
  { ticker: 'ITUB4', name: 'Itaú Unibanco PN', sector: 'Financeiro', risk: 'Baixo' },
  { ticker: 'WEGE3', name: 'WEG ON', sector: 'Industrial', risk: 'Baixo' },
  { ticker: 'MGLU3', name: 'Magazine Luiza ON', sector: 'Varejo', risk: 'Alto' },
  { ticker: 'TSLA', name: 'Tesla Inc', sector: 'Tecnologia', risk: 'Alto' },
  { ticker: 'AAPL', name: 'Apple Inc', sector: 'Tecnologia', risk: 'Baixo' },
  { ticker: 'BTC', name: 'Bitcoin', sector: 'Cripto', risk: 'Alto' },
];

const riskBadge = {
  Baixo: 'bg-[#10B981]/20 text-[#10B981]',
  Médio: 'bg-[#F59E0B]/20 text-[#F59E0B]',
  Alto: 'bg-[#EF4444]/20 text-[#EF4444]',
};

export function AssetSelector({ onSelect, selectedTicker }: AssetSelectorProps) {
  const [query, setQuery] = useState('');

  const filteredAssets = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return assets;
    }

    return assets.filter(
      (asset) =>
        asset.ticker.toLowerCase().includes(q) ||
        asset.name.toLowerCase().includes(q) ||
        asset.sector.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <section className="space-y-6">
      <header className="rounded-2xl border border-slate-800 bg-[#111827] p-6 shadow-2xl shadow-black/20 sm:p-8">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">Selecionar ativo</h2>
        <p className="mt-2 text-sm leading-7 text-[#9CA3AF] sm:text-base">Busque por ticker, nome da empresa ou setor para iniciar a análise.</p>

        <div className="relative mt-5">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ex: PETR4, Tesla, tecnologia..."
            className="h-11 w-full rounded-lg border border-slate-600 bg-slate-900 pl-10 pr-3 text-white outline-none transition focus:border-[#10B981]"
          />
        </div>
      </header>

      <div className="grid gap-3 xl:grid-cols-2">
        {filteredAssets.map((asset) => (
          <button
            key={asset.ticker}
            onClick={() => onSelect(asset.ticker)}
            className={`flex flex-col gap-4 rounded-2xl border p-4 text-left transition sm:flex-row sm:items-center sm:justify-between ${
              selectedTicker === asset.ticker
                ? 'border-[#10B981] bg-[#10B981]/10 shadow-lg shadow-emerald-500/5'
                : 'border-slate-800 bg-[#111827] hover:border-slate-500'
            }`}
          >
            <div>
              <p className="font-semibold text-white">{asset.ticker}</p>
              <p className="text-sm text-[#D1D5DB]">{asset.name}</p>
              <p className="mt-1 text-xs text-[#9CA3AF]">{asset.sector}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${riskBadge[asset.risk]}`}>
                {asset.risk}
              </span>
              <TrendingUp size={18} className="text-[#9CA3AF]" />
            </div>
          </button>
        ))}
      </div>

      {filteredAssets.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-[#111827] p-10 text-center text-slate-400">
          Nenhum ativo encontrado para essa busca.
        </div>
      ) : null}
    </section>
  );
}
