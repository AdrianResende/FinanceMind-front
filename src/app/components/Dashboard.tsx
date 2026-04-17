import { AlertTriangle, ArrowUpRight, ShieldAlert, ShieldCheck, CandlestickChart } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface DashboardProps {
  onNavigateToAnalysis: () => void;
}

const riskCards = [
  {
    title: 'Baixo Risco',
    value: 12,
    description: 'Ativos defensivos e alta previsibilidade.',
    color: '#10B981',
    icon: ShieldCheck,
  },
  {
    title: 'Risco Médio',
    value: 28,
    description: 'Equilíbrio entre volatilidade e retorno.',
    color: '#F59E0B',
    icon: AlertTriangle,
  },
  {
    title: 'Alto Risco',
    value: 7,
    description: 'Oscilação elevada e potencial agressivo.',
    color: '#EF4444',
    icon: ShieldAlert,
  },
];

const stockOfTheDay = {
  ticker: 'PETR4',
  company: 'Petrobras PN',
  signal: 'Neutro para compra',
  support: 'R$ 36,40',
  resistance: 'R$ 39,10',
  summary:
    'O papel fechou o pregão com volatilidade controlada, volume acima da média e risco setorial moderado. O cenário do dia favorece acompanhamento de rompimento antes de nova entrada.',
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
        <p className="text-sm uppercase tracking-wider text-[#9CA3AF]">Painel de risco</p>
        <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Visão geral do mercado monitorado</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#D1D5DB] sm:text-base">
          Acompanhe o mapa de risco dos ativos e navegue para análises detalhadas com dados
          de volatilidade, liquidez e tendência de retorno.
        </p>
      </header>

      <div className="grid gap-4 xl:grid-cols-3">
        {riskCards.map((card) => {
          const Icon = card.icon;
          return (
            <article
              key={card.title}
              className="rounded-2xl border border-slate-800 bg-[#111827] p-5 shadow-xl shadow-black/10"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[#D1D5DB]">{card.title}</p>
                <Icon size={20} color={card.color} />
              </div>
              <p className="mt-4 text-4xl font-bold text-white">{card.value}</p>
              <p className="mt-2 text-sm text-[#9CA3AF]">{card.description}</p>
            </article>
          );
        })}
      </div>

      <div className="grid gap-4 2xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-2xl border border-slate-800 bg-[#111827] p-5 shadow-xl shadow-black/10">
          <h3 className="text-lg font-semibold text-white">Top movimentações de risco</h3>
          <ul className="mt-4 space-y-3 text-sm text-[#D1D5DB]">
            <li className="flex items-center justify-between rounded-md bg-slate-800/60 p-3">
              <span>PETR4</span>
              <span className="font-semibold text-[#10B981]">Risco caiu 8%</span>
            </li>
            <li className="flex items-center justify-between rounded-md bg-slate-800/60 p-3">
              <span>TSLA</span>
              <span className="font-semibold text-[#F59E0B]">Risco subiu 6%</span>
            </li>
            <li className="flex items-center justify-between rounded-md bg-slate-800/60 p-3">
              <span>BTC</span>
              <span className="font-semibold text-[#EF4444]">Risco subiu 14%</span>
            </li>
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-[#111827] p-5 shadow-xl shadow-black/10">
          <h3 className="text-lg font-semibold text-white">Próximos passos</h3>
          <p className="mt-3 text-sm text-[#9CA3AF]">
            Selecione um ativo para visualizar pontuação de risco, métricas técnicas e gráficos
            comparativos por janela temporal.
          </p>
          <button
            onClick={onNavigateToAnalysis}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#10B981] px-4 py-2 font-semibold text-white transition hover:brightness-110"
          >
            Ir para análise detalhada
            <ArrowUpRight size={16} />
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
              {stockOfTheDay.signal}
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
          <h3 className="text-lg font-semibold text-white">Leitura rápida</h3>
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

          <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-100">
            A leitura do dia não substitui gestão de risco. Use o gráfico intradiário para contexto e confirme a decisão na análise detalhada do ativo.
          </div>
        </article>
      </div>
    </section>
  );
}
