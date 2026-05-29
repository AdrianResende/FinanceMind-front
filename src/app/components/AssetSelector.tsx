import { Search, TrendingUp } from 'lucide-react';
import { useMemo, useState } from 'react';
import { RiskPill, Surface } from '@/components/shared';

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

const riskToPillLevel = {
  Baixo: 'low',
  Médio: 'medium',
  Alto: 'high',
} as const;

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
      <Surface className="p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">Selecionar ativo</h2>
        <p className="fm-shell-muted mt-2 text-sm leading-7 sm:text-base">Busque por ticker, nome da empresa ou setor para iniciar a analise.</p>

        <div className="relative mt-5">
          <Search className="fm-shell-muted pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ex: PETR4, Tesla, tecnologia..."
            className="h-11 w-full rounded-lg border border-[#d7dde5] bg-white pl-10 pr-3 text-[#191c1e] outline-none transition placeholder:text-[#8a9099] focus:border-[#10B981]"
          />
        </div>
      </Surface>

      <div className="grid gap-3 xl:grid-cols-2">
        {filteredAssets.map((asset) => (
          <button
            key={asset.ticker}
            onClick={() => onSelect(asset.ticker)}
            className={`flex flex-col gap-4 rounded-2xl border p-4 text-left transition sm:flex-row sm:items-center sm:justify-between ${
              selectedTicker === asset.ticker
                ? 'border-[#10B981] bg-[#ecfdf5] shadow-lg shadow-emerald-500/5'
                : 'border-white bg-[#f7f9fb] hover:border-[#dfe6ee]'
            }`}
          >
            <div>
              <p className="font-semibold text-[#191c1e]">{asset.ticker}</p>
              <p className="text-sm text-[#44474d]">{asset.name}</p>
              <p className="fm-shell-muted mt-1 text-xs">{asset.sector}</p>
            </div>

            <div className="flex items-center gap-3">
              <RiskPill level={riskToPillLevel[asset.risk]} label={asset.risk} />
              <TrendingUp size={18} className="fm-shell-muted" />
            </div>
          </button>
        ))}
      </div>

      {filteredAssets.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#d7dde5] bg-[#f7f9fb] p-10 text-center text-[#75777e]">
          Nenhum ativo encontrado para essa busca.
        </div>
      ) : null}
    </section>
  );
}
