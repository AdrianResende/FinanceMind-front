import { ArrowRight, CandlestickChart, TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface DashboardProps {
  onNavigateToAnalysis: () => void;
}

const ibovespaSeries = [
  { month: 'Jan', value: 112000 },
  { month: 'Fev', value: 114300 },
  { month: 'Mar', value: 111900 },
  { month: 'Abr', value: 115800 },
  { month: 'Mai', value: 117400 },
  { month: 'Jun', value: 118050 },
];

const featuredAssets = [
  { ticker: 'PETR4', risk: 'Moderado', price: 'R$ 38.45', change: '+2.3%', changeColor: 'text-emerald-400' },
  { ticker: 'ITUB4', risk: 'Baixo', price: 'R$ 28.90', change: '+0.8%', changeColor: 'text-emerald-400' },
  { ticker: 'MGLU3', risk: 'Alto', price: 'R$ 5.85', change: '-2.8%', changeColor: 'text-rose-400' },
  { ticker: 'WEGE3', risk: 'Baixo', price: 'R$ 42.60', change: '+1.9%', changeColor: 'text-emerald-400' },
];

const stockOfTheDay = {
  ticker: 'PETR4',
  company: 'Petrobras PN',
  support: 'R$ 36,40',
  resistance: 'R$ 39,10',
  summary:
    'PETR4 sustenta viés positivo no intraday, com fechamento acima da média curta e fluxo comprador consistente. O papel segue interessante, mas ainda pede confirmação acima da resistência para ampliar posição.',
  points: [
    { time: '10h', price: 36.9 },
    { time: '11h', price: 37.2 },
    { time: '12h', price: 36.8 },
    { time: '13h', price: 37.4 },
    { time: '14h', price: 37.1 },
    { time: '15h', price: 37.6 },
    { time: '16h', price: 37.3 },
    { time: '17h', price: 37.8 },
  ],
};

export function Dashboard({ onNavigateToAnalysis }: DashboardProps) {
  return (
    <section className="space-y-6">
      <header className="rounded-2xl border border-slate-800 bg-[#111827] p-6 shadow-2xl shadow-black/20 sm:p-8">
        <p className="text-sm uppercase tracking-wider text-[#9CA3AF]">Painel de mercado</p>
        <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Dashboard estratégico do investidor</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#D1D5DB] sm:text-base">
          Veja o comportamento recente do Ibovespa, os principais riscos do cenário atual e os ativos que merecem atenção no pregão.
        </p>
      </header>

      <div className="grid gap-4 2xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-2xl border border-slate-800 bg-[#111827] p-5 shadow-xl shadow-black/10 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-400">Índice Bovespa - 6 meses</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-3xl font-bold text-white">+5.4%</span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-400">
                  Tendência positiva
                </span>
              </div>
            </div>
            <TrendingUp size={20} className="text-emerald-400" />
          </div>

          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ibovespaSeries}>
                <defs>
                  <linearGradient id="ibovGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.32} />
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" domain={[0, 120000]} tickFormatter={(value) => String(value)} />
                <Tooltip contentStyle={{ background: '#111827', border: '1px solid #374151' }} />
                <Area type="monotone" dataKey="value" stroke="#10B981" fill="url(#ibovGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-[#111827] p-5 shadow-xl shadow-black/10 sm:p-6">
          <h3 className="text-xl font-semibold text-white">Resumo do Mercado</h3>

          <div className="mt-6 space-y-6">
            <div>
              <p className="text-sm font-semibold text-emerald-400">Possíveis Ganhos</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li>• Dividendos atrativos</li>
                <li>• Setor bancário estável</li>
                <li>• Exportadoras em alta</li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-rose-400">Riscos</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li>• Volatilidade global</li>
                <li>• Cenário político incerto</li>
                <li>• Inflação elevada</li>
              </ul>
            </div>
          </div>

          <button
            onClick={onNavigateToAnalysis}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#10B981] px-4 py-2 font-semibold text-white transition hover:brightness-110"
          >
            Analisar Ativo
            <ArrowRight size={16} />
          </button>
        </article>
      </div>

      <div className="grid gap-4 2xl:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-2xl border border-slate-800 bg-[#111827] p-5 shadow-xl shadow-black/10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                <CandlestickChart size={16} />
                Ação do dia
              </div>
              <h3 className="mt-2 text-2xl font-bold text-white">{stockOfTheDay.ticker}</h3>
              <p className="text-sm text-[#D1D5DB]">{stockOfTheDay.company}</p>
            </div>

            <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-400">
              Viés positivo
            </div>
          </div>

          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stockOfTheDay.points}>
                <defs>
                  <linearGradient id="stockGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" domain={['dataMin - 0.5', 'dataMax + 0.5']} />
                <Tooltip contentStyle={{ background: '#111827', border: '1px solid #374151' }} />
                <Area type="monotone" dataKey="price" stroke="#10B981" fill="url(#stockGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-[#111827] p-5 shadow-xl shadow-black/10">
          <h3 className="text-lg font-semibold text-white">Ativos em Destaque</h3>
          <div className="mt-4 space-y-3">
            {featuredAssets.map((asset) => (
              <div key={asset.ticker} className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-white">{asset.ticker}</p>
                    <p className="text-sm text-slate-400">{asset.risk}</p>
                  </div>
                  <p className={`text-sm font-semibold ${asset.changeColor}`}>{asset.change}</p>
                </div>
                <p className="mt-3 text-xl font-bold text-white">{asset.price}</p>
              </div>
            ))}
          </div>

          <h4 className="mt-6 text-base font-semibold text-white">Leitura rápida</h4>
          <p className="mt-3 text-sm leading-7 text-[#9CA3AF]">{stockOfTheDay.summary}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Suporte</p>
              <p className="mt-2 text-xl font-semibold text-white">{stockOfTheDay.support}</p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Resistência</p>
              <p className="mt-2 text-xl font-semibold text-white">{stockOfTheDay.resistance}</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
