import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CandlestickChart, Send, Sparkles, TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { RiskPill, SectionHeading, Surface } from '@/components/shared';

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

const mentorMessages = [
  {
    role: 'assistant',
    label: 'Assistente',
    time: 'Agora',
    title: 'Resumo da carteira',
    message:
      'A carteira segue com viés positivo, mas a concentração em tecnologia ainda pede ajuste. Posso sugerir uma redistribuição entre renda variável, FIIs e caixa estratégico.',
  },
  {
    role: 'user',
    label: 'Você',
    time: 'Há 2 min',
    title: 'Quero reduzir risco',
    message: 'Quais ativos devo revisar primeiro para sair de uma exposição mais agressiva?',
  },
];

const suggestedTopics = [
  'Como reduzir risco agora?',
  'Quais FIIs fazem sentido?',
  'Onde está a concentração da carteira?',
  'Monte um plano de rebalanceamento',
];

export function Dashboard({ onNavigateToAnalysis }: DashboardProps) {
  const [prompt, setPrompt] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [prompt]);

  const canSend = prompt.trim().length > 0;

  const applySuggestion = (text: string) => {
    setPrompt(text);
    textareaRef.current?.focus();
  };

  const handleSend = () => {
    if (!canSend) return;
    setPrompt('');
  };

  return (
    <section className="space-y-6">
      <Surface className="p-6 sm:p-8">
        <SectionHeading
          kicker="Painel de mercado"
          title="Painel estratégico do investidor"
          description="Veja o comportamento recente do Ibovespa, os principais riscos do cenário atual e os ativos que merecem atenção no pregão."
        />
      </Surface>

      <div className="grid gap-4 2xl:grid-cols-[1.2fr_0.8fr]">
        <Surface className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="fm-shell-muted text-sm font-medium">Índice Bovespa - 6 meses</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-3xl font-bold text-white">+5.4%</span>
                <RiskPill level="low" label="Tendência positiva" />
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
        </Surface>

        <Surface className="p-5 sm:p-6">
          <h3 className="text-xl font-semibold text-white">Resumo do mercado</h3>

          <div className="mt-6 space-y-6">
            <div>
              <p className="text-sm font-semibold text-emerald-400">Possíveis ganhos</p>
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
            className="fm-btn-primary mt-8 gap-2"
          >
            Analisar ativo
            <ArrowRight size={16} />
          </button>
        </Surface>
      </div>

      <div className="grid gap-4 2xl:grid-cols-[1.15fr_0.85fr]">
        <Surface className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="fm-shell-muted flex items-center gap-2 text-sm">
                <CandlestickChart size={16} />
                Ação do dia
              </div>
              <h3 className="mt-2 text-2xl font-bold text-white">{stockOfTheDay.ticker}</h3>
              <p className="fm-shell-muted text-sm">{stockOfTheDay.company}</p>
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
        </Surface>

        <Surface className="p-5">
          <h3 className="text-lg font-semibold text-white">Ativos em destaque</h3>
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
          <p className="fm-shell-muted mt-3 text-sm leading-7">{stockOfTheDay.summary}</p>

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
        </Surface>
      </div>

      <Surface className="overflow-hidden p-0">
        <div className="grid gap-0 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="border-b border-slate-800 p-5 sm:p-6 lg:border-b-0 lg:border-r">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="fm-shell-muted text-sm uppercase tracking-[0.2em]">Assistente financeiro</p>
                <h3 className="mt-2 text-2xl font-bold text-white">Painel e chat no mesmo fluxo</h3>
                <p className="fm-shell-muted mt-2 max-w-2xl text-sm leading-7">
                  Use o assistente para transformar os dados do painel em próximos passos práticos sem sair da tela.
                </p>
              </div>

              <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-400">
                Consulta inteligente
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {mentorMessages.map((item) => (
                <div key={item.title} className={`flex ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-3xl rounded-2xl border p-4 ${item.role === 'user' ? 'border-slate-700 bg-slate-950/70' : 'border-emerald-500/20 bg-emerald-500/10'}`}>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                      {item.role === 'assistant' ? <Sparkles size={14} className="text-emerald-400" /> : null}
                      <span>{item.label}</span>
                      <span className="text-slate-600">•</span>
                      <span>{item.time}</span>
                    </div>
                    <p className="mt-3 text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{item.message}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {suggestedTopics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => applySuggestion(topic)}
                  className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-sm text-slate-300 transition hover:border-emerald-500/40 hover:text-white"
                >
                  {topic}
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950/60 p-3">
              <div className="flex items-end gap-3">
                <textarea
                  ref={textareaRef}
                  value={prompt}
                  rows={1}
                  onChange={(event) => setPrompt(event.target.value)}
                  placeholder="Pergunte ao mentor sobre risco, rebalanceamento ou FIIs..."
                  className="max-h-32 min-h-[44px] w-full resize-none bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-slate-500"
                />

                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!canSend}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Enviar mensagem"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-5 sm:p-6">
            <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Impacto esperado</p>
              <div className="mt-4 space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">Risco atual</span>
                    <span className="font-semibold text-rose-400">Alto</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full bg-rose-500" style={{ width: '75%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">Risco proposto</span>
                    <span className="font-semibold text-emerald-400">Moderado</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full bg-emerald-500" style={{ width: '45%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Próximo passo sugerido</p>
              <h4 className="mt-3 text-lg font-semibold text-white">Rebalancear sem perder renda</h4>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Combine uma redução gradual em ativos mais voláteis com entrada em FIIs e caixa para manter flexibilidade.
              </p>

              <button type="button" className="fm-btn-primary mt-5 gap-2">
                Abrir análise detalhada
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </Surface>
    </section>
  );
}
