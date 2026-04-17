import { ArrowLeft, TriangleAlert, Shield, Gauge } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from 'recharts';

interface RiskAnalysisProps {
  ticker: string;
  onBack: () => void;
}

type RiskLevel = 'Baixo' | 'Médio' | 'Alto';

interface AssetRiskData {
  ticker: string;
  name: string;
  sector: string;
  riskLevel: RiskLevel;
  score: number;
  volatility: number;
  beta: number;
  maxDrawdown: number;
  cvar95: number;
  monthlyTrend: Array<{ month: string; risk: number; price: number }>;
  riskBreakdown: Array<{ factor: string; value: number }>;
}

const mockData: Record<string, AssetRiskData> = {
  PETR4: {
    ticker: 'PETR4',
    name: 'Petrobras PN',
    sector: 'Energia',
    riskLevel: 'Médio',
    score: 61,
    volatility: 22.1,
    beta: 1.14,
    maxDrawdown: -27.5,
    cvar95: -6.2,
    monthlyTrend: [
      { month: 'Jan', risk: 58, price: 37 },
      { month: 'Fev', risk: 60, price: 36 },
      { month: 'Mar', risk: 62, price: 34 },
      { month: 'Abr', risk: 63, price: 35 },
      { month: 'Mai', risk: 61, price: 36 },
      { month: 'Jun', risk: 61, price: 38 },
    ],
    riskBreakdown: [
      { factor: 'Mercado', value: 64 },
      { factor: 'Liquidez', value: 48 },
      { factor: 'Setorial', value: 57 },
      { factor: 'Câmbio', value: 73 },
    ],
  },
  VALE3: {
    ticker: 'VALE3',
    name: 'Vale ON',
    sector: 'Mineração',
    riskLevel: 'Médio',
    score: 66,
    volatility: 24.7,
    beta: 1.21,
    maxDrawdown: -29.1,
    cvar95: -6.8,
    monthlyTrend: [
      { month: 'Jan', risk: 63, price: 71 },
      { month: 'Fev', risk: 64, price: 69 },
      { month: 'Mar', risk: 67, price: 66 },
      { month: 'Abr', risk: 68, price: 65 },
      { month: 'Mai', risk: 66, price: 67 },
      { month: 'Jun', risk: 66, price: 68 },
    ],
    riskBreakdown: [
      { factor: 'Mercado', value: 67 },
      { factor: 'Liquidez', value: 45 },
      { factor: 'Setorial', value: 69 },
      { factor: 'Câmbio', value: 71 },
    ],
  },
  ITUB4: {
    ticker: 'ITUB4',
    name: 'Itaú Unibanco PN',
    sector: 'Financeiro',
    riskLevel: 'Baixo',
    score: 34,
    volatility: 15.8,
    beta: 0.92,
    maxDrawdown: -18.2,
    cvar95: -3.4,
    monthlyTrend: [
      { month: 'Jan', risk: 38, price: 29 },
      { month: 'Fev', risk: 36, price: 30 },
      { month: 'Mar', risk: 35, price: 31 },
      { month: 'Abr', risk: 33, price: 32 },
      { month: 'Mai', risk: 34, price: 32 },
      { month: 'Jun', risk: 34, price: 33 },
    ],
    riskBreakdown: [
      { factor: 'Mercado', value: 36 },
      { factor: 'Liquidez', value: 29 },
      { factor: 'Setorial', value: 37 },
      { factor: 'Câmbio', value: 31 },
    ],
  },
  WEGE3: {
    ticker: 'WEGE3',
    name: 'WEG ON',
    sector: 'Industrial',
    riskLevel: 'Baixo',
    score: 39,
    volatility: 17.9,
    beta: 0.88,
    maxDrawdown: -19.4,
    cvar95: -3.7,
    monthlyTrend: [
      { month: 'Jan', risk: 44, price: 40 },
      { month: 'Fev', risk: 42, price: 41 },
      { month: 'Mar', risk: 40, price: 42 },
      { month: 'Abr', risk: 39, price: 44 },
      { month: 'Mai', risk: 39, price: 45 },
      { month: 'Jun', risk: 39, price: 46 },
    ],
    riskBreakdown: [
      { factor: 'Mercado', value: 38 },
      { factor: 'Liquidez', value: 35 },
      { factor: 'Setorial', value: 42 },
      { factor: 'Câmbio', value: 41 },
    ],
  },
  MGLU3: {
    ticker: 'MGLU3',
    name: 'Magazine Luiza ON',
    sector: 'Varejo',
    riskLevel: 'Alto',
    score: 81,
    volatility: 38.4,
    beta: 1.71,
    maxDrawdown: -52.3,
    cvar95: -11.6,
    monthlyTrend: [
      { month: 'Jan', risk: 76, price: 11 },
      { month: 'Fev', risk: 78, price: 10 },
      { month: 'Mar', risk: 82, price: 9 },
      { month: 'Abr', risk: 84, price: 9 },
      { month: 'Mai', risk: 82, price: 10 },
      { month: 'Jun', risk: 81, price: 10 },
    ],
    riskBreakdown: [
      { factor: 'Mercado', value: 84 },
      { factor: 'Liquidez', value: 71 },
      { factor: 'Setorial', value: 87 },
      { factor: 'Câmbio', value: 63 },
    ],
  },
  TSLA: {
    ticker: 'TSLA',
    name: 'Tesla Inc',
    sector: 'Tecnologia',
    riskLevel: 'Alto',
    score: 79,
    volatility: 41.2,
    beta: 1.93,
    maxDrawdown: -49.8,
    cvar95: -12.4,
    monthlyTrend: [
      { month: 'Jan', risk: 72, price: 244 },
      { month: 'Fev', risk: 74, price: 233 },
      { month: 'Mar', risk: 77, price: 218 },
      { month: 'Abr', risk: 80, price: 210 },
      { month: 'Mai', risk: 79, price: 222 },
      { month: 'Jun', risk: 79, price: 227 },
    ],
    riskBreakdown: [
      { factor: 'Mercado', value: 88 },
      { factor: 'Liquidez', value: 52 },
      { factor: 'Setorial', value: 83 },
      { factor: 'Câmbio', value: 64 },
    ],
  },
  AAPL: {
    ticker: 'AAPL',
    name: 'Apple Inc',
    sector: 'Tecnologia',
    riskLevel: 'Baixo',
    score: 32,
    volatility: 14.4,
    beta: 0.97,
    maxDrawdown: -15.5,
    cvar95: -2.8,
    monthlyTrend: [
      { month: 'Jan', risk: 35, price: 187 },
      { month: 'Fev', risk: 34, price: 189 },
      { month: 'Mar', risk: 33, price: 191 },
      { month: 'Abr', risk: 32, price: 194 },
      { month: 'Mai', risk: 32, price: 197 },
      { month: 'Jun', risk: 32, price: 199 },
    ],
    riskBreakdown: [
      { factor: 'Mercado', value: 34 },
      { factor: 'Liquidez', value: 19 },
      { factor: 'Setorial', value: 37 },
      { factor: 'Câmbio', value: 39 },
    ],
  },
  BTC: {
    ticker: 'BTC',
    name: 'Bitcoin',
    sector: 'Cripto',
    riskLevel: 'Alto',
    score: 89,
    volatility: 54.7,
    beta: 2.42,
    maxDrawdown: -63.9,
    cvar95: -18.7,
    monthlyTrend: [
      { month: 'Jan', risk: 84, price: 66500 },
      { month: 'Fev', risk: 86, price: 64800 },
      { month: 'Mar', risk: 90, price: 60100 },
      { month: 'Abr', risk: 92, price: 58400 },
      { month: 'Mai', risk: 90, price: 61200 },
      { month: 'Jun', risk: 89, price: 62500 },
    ],
    riskBreakdown: [
      { factor: 'Mercado', value: 91 },
      { factor: 'Liquidez', value: 66 },
      { factor: 'Setorial', value: 94 },
      { factor: 'Câmbio', value: 78 },
    ],
  },
};

const riskStyle: Record<RiskLevel, { text: string; bg: string; border: string }> = {
  Baixo: { text: '#10B981', bg: 'rgba(16, 185, 129, 0.16)', border: '#10B981' },
  Médio: { text: '#F59E0B', bg: 'rgba(245, 158, 11, 0.16)', border: '#F59E0B' },
  Alto: { text: '#EF4444', bg: 'rgba(239, 68, 68, 0.16)', border: '#EF4444' },
};

export function RiskAnalysis({ ticker, onBack }: RiskAnalysisProps) {
  const asset = mockData[ticker] ?? mockData.PETR4;
  const style = riskStyle[asset.riskLevel];

  return (
    <section className="space-y-6">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-[#111827] px-4 py-2 text-sm font-medium text-white transition hover:border-slate-500"
      >
        <ArrowLeft size={16} />
        Voltar para seleção
      </button>

      <header className="rounded-2xl border border-slate-800 bg-[#111827] p-6 shadow-2xl shadow-black/20 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">{asset.ticker}</h2>
            <p className="mt-1 text-[#D1D5DB]">{asset.name} • {asset.sector}</p>
          </div>
          <span
            className="rounded-full border px-3 py-1 text-sm font-semibold"
            style={{ color: style.text, borderColor: style.border, background: style.bg }}
          >
            Risco {asset.riskLevel}
          </span>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
        <article className="rounded-2xl border border-slate-800 bg-[#111827] p-4 shadow-xl shadow-black/10">
          <div className="mb-2 flex items-center gap-2 text-[#9CA3AF]">
            <Gauge size={16} />
            Score de Risco
          </div>
          <p className="text-3xl font-bold text-white">{asset.score}</p>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-[#111827] p-4 shadow-xl shadow-black/10">
          <div className="mb-2 flex items-center gap-2 text-[#9CA3AF]">
            <TriangleAlert size={16} />
            Volatilidade
          </div>
          <p className="text-3xl font-bold text-white">{asset.volatility.toFixed(1)}%</p>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-[#111827] p-4 shadow-xl shadow-black/10">
          <div className="mb-2 flex items-center gap-2 text-[#9CA3AF]">
            <Shield size={16} />
            Beta
          </div>
          <p className="text-3xl font-bold text-white">{asset.beta.toFixed(2)}</p>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-[#111827] p-4 shadow-xl shadow-black/10">
          <p className="mb-2 text-[#9CA3AF]">Drawdown Máximo</p>
          <p className="text-3xl font-bold text-white">{asset.maxDrawdown.toFixed(1)}%</p>
          <p className="mt-1 text-xs text-[#9CA3AF]">CVaR 95%: {asset.cvar95.toFixed(1)}%</p>
        </article>
      </div>

      <div className="grid gap-4 2xl:grid-cols-2">
        <article className="rounded-2xl border border-slate-800 bg-[#111827] p-5 shadow-xl shadow-black/10">
          <h3 className="mb-4 text-lg font-semibold text-white">Evolução do risco (6 meses)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={asset.monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ background: '#111827', border: '1px solid #374151' }} />
                <Line type="monotone" dataKey="risk" stroke="#10B981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-[#111827] p-5 shadow-xl shadow-black/10">
          <h3 className="mb-4 text-lg font-semibold text-white">Preço médio no período</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={asset.monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ background: '#111827', border: '1px solid #374151' }} />
                <Area type="monotone" dataKey="price" stroke="#60A5FA" fill="#60A5FA33" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>
      </div>

      <article className="rounded-2xl border border-slate-800 bg-[#111827] p-5 shadow-xl shadow-black/10">
        <h3 className="mb-4 text-lg font-semibold text-white">Composição dos fatores de risco</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={asset.riskBreakdown}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="factor" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" domain={[0, 100]} />
              <Tooltip contentStyle={{ background: '#111827', border: '1px solid #374151' }} />
              <Bar dataKey="value" fill="#F59E0B" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>
    </section>
  );
}
