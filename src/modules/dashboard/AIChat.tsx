import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Bell,
  ChartColumn,
  CircleHelp,
  Cog,
  GraduationCap,
  LayoutDashboard,
  Send,
  Sparkles,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const sideMenu = [
  { id: 'dashboard', label: 'Painel', icon: LayoutDashboard, to: '/dashboard' },
  { id: 'analisar', label: 'Analisar Ativo', icon: TrendingUp, to: '/dashboard' },
  { id: 'portfolio', label: 'Carteira', icon: Wallet, to: '/dashboard' },
  { id: 'ativos', label: 'Ativos', icon: ChartColumn, to: '/dashboard' },
  { id: 'aprendizado', label: 'Aprendizado', icon: GraduationCap, to: '/dashboard' },
  { id: 'chat-ia', label: 'Chat IA', icon: Sparkles, to: '/chat-ia', active: true },
  { id: 'configuracoes', label: 'Configurações', icon: Cog, to: '/configuracoes' },
];

const recentSessions = [
  { title: 'Análise REIT vs FII', time: 'Hoje, 10:45', active: true },
  { title: 'Rebalanceamento de Carteira', time: 'Ontem' },
  { title: 'Preparação para IR', time: 'há 2 dias' },
];

const suggestedTopics = ['O que são FIIs?', 'Como diversificar?', 'Eficiência fiscal', 'Perspectiva de mercado'];

export default function AIChat() {
  const [prompt, setPrompt] = useState('');
  const [riskCurrent] = useState(75);
  const [riskProposed] = useState(45);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [prompt]);

  const canSend = useMemo(() => prompt.trim().length > 0, [prompt]);

  const applySuggestion = (text: string) => {
    setPrompt(text);
    textareaRef.current?.focus();
  };

  const handleSend = () => {
    if (!canSend) return;
    setPrompt('');
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-[#f7f9fb] text-[#191c1e]">
      <div className="flex h-full w-full">
        <aside className="hidden">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#0d1c32] text-white">
              <Wallet size={18} />
            </div>
            <div>
              <h1 className="text-[30px] leading-none font-bold text-black">FinEdu SaaS</h1>
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#44474d]">Riqueza &amp; Ensino</p>
            </div>
          </div>

          <nav className="flex flex-1 flex-col gap-1">
            {sideMenu.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  to={item.to}
                  className={`flex items-center gap-3 rounded-md p-3 text-xs uppercase tracking-[0.08em] transition-colors ${
                    item.active
                      ? 'bg-[#6cf8bb] font-semibold text-[#005236]'
                      : 'text-[#44474d] hover:bg-[#e6e8ea]'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto rounded-xl border border-[#c5c6cd] bg-[#f2f4f6] p-4">
            <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-[#44474d]">Plano Pro</p>
            <p className="mb-4 text-sm text-[#191c1e]">Desbloqueie analise de IA avancada e otimizacao fiscal.</p>
            <button className="w-full rounded bg-black py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white hover:opacity-90">
              Atualizar agora
            </button>
          </div>
        </aside>

        <main className="relative flex h-full flex-grow flex-col bg-[#f7f9fb]">
          <header className="z-20 flex h-16 w-full items-center justify-between border-b border-[#c5c6cd] bg-[#f7f9fb] px-4 md:px-10">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-black">Mentor de IA</span>
              <span className="rounded bg-[#6cf8bb] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#005236]">
                Assistente ativo
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden items-center gap-2 md:flex">
                <button className="rounded-full p-2 text-[#44474d] hover:bg-[#eceef0]" aria-label="Notificações">
                  <Bell size={18} />
                </button>
                <button className="rounded-full p-2 text-[#44474d] hover:bg-[#eceef0]" aria-label="Ajuda">
                  <CircleHelp size={18} />
                </button>
              </div>

              <button className="hidden border border-black px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-black transition hover:bg-black hover:text-white md:block">
                Mudar plano
              </button>

              <img
                alt="Avatar do usuario"
                className="h-8 w-8 rounded-full border border-[#c5c6cd] object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&q=80"
              />
            </div>
          </header>

          <div className="relative flex flex-grow overflow-hidden">
            <div className="hidden w-[300px] flex-col overflow-y-auto border-r border-[#c5c6cd] bg-[#f2f4f6] p-4 lg:flex">
              <h3 className="mb-4 text-xs uppercase tracking-[0.1em] text-[#44474d]">Sessões recentes</h3>
              <div className="flex flex-col gap-1">
                {recentSessions.map((session) => (
                  <button
                    key={session.title}
                    className={`rounded-lg p-3 text-left transition ${
                      session.active
                        ? 'border-l-4 border-[#006c49] bg-[#e6e8ea]'
                        : 'text-[#44474d] hover:bg-[#e6e8ea]'
                    }`}
                  >
                    <span className="block truncate text-sm font-semibold text-[#191c1e]">{session.title}</span>
                    <span className="mt-1 block text-[10px] uppercase tracking-[0.08em] text-[#75777e]">{session.time}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mx-auto flex w-full max-w-[1000px] flex-grow flex-col">
              <div className="chat-scroll flex-grow space-y-10 overflow-y-auto p-4 md:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#006c49]/20 bg-[#6cf8bb] text-[#005236]">
                    <Sparkles size={16} />
                  </div>
                  <div className="max-w-[80%] space-y-2">
                    <div className="rounded-xl rounded-tl-none border border-[#c5c6cd] bg-white p-4 shadow-sm">
                      <p className="leading-relaxed text-[#191c1e]">
                        Olá! Eu sou seu Mentor de IA da FinEdu. Analisei sua carteira atual de R$ 42.500. Atualmente,
                        voce esta com 15% de exposicao excessiva em acoes de tecnologia.
                      </p>
                      <p className="mt-4 leading-relaxed text-[#191c1e]">
                        Como voce gostaria de prosseguir hoje? Podemos olhar para diversificacao em Fundos de Investimento
                        Imobiliario (FIIs) ou explorar alguns modulos educacionais sobre ciclos de mercado.
                      </p>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.08em] text-[#75777e]">Mentor IA • Agora</span>
                  </div>
                </div>

                <div className="flex flex-row-reverse items-start gap-4">
                  <img
                    alt="Usuario"
                    className="h-10 w-10 shrink-0 rounded-full border border-[#c5c6cd] object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&q=80"
                  />
                  <div className="max-w-[80%] space-y-2 text-right">
                    <div className="rounded-xl rounded-tr-none border border-[#0d1c32]/20 bg-[#0d1c32] p-4 text-left">
                      <p className="text-white">
                        Tenho interesse em FIIs. O que são FIIs exatamente e como eles diferem dos REITs americanos?
                      </p>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.08em] text-[#75777e]">Voce • ha 2 min</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#006c49]/20 bg-[#6cf8bb] text-[#005236]">
                    <Sparkles size={16} />
                  </div>
                  <div className="max-w-[80%] space-y-2">
                    <div className="rounded-xl rounded-tl-none border border-[#c5c6cd] bg-white p-5 shadow-sm">
                      <h4 className="mb-2 font-semibold text-[#006c49]">FIIs (Fundos de Investimento Imobiliario)</h4>
                      <p className="mb-4 leading-relaxed text-[#191c1e]">
                        Otima pergunta! Os FIIs sao a contraparte brasileira dos REITs, mas possuem algumas diferencas
                        tecnicas fundamentais:
                      </p>
                      <ul className="mb-4 space-y-2 border-l-2 border-[#006c49]/20 pl-4 text-sm text-[#191c1e]">
                        <li>
                          <strong>Dividendos:</strong> Geralmente pagos mensalmente, enquanto REITs costumam pagar
                          trimestralmente.
                        </li>
                        <li>
                          <strong>Estrutura:</strong> FIIs sao condominios fechados; REITs sao empresas (corporacoes).
                        </li>
                        <li>
                          <strong>Tributacao:</strong> Dividendos de FIIs costumam ser isentos de IR para pessoa fisica
                          sob condicoes especificas.
                        </li>
                      </ul>
                      <div className="rounded-lg border border-[#006c49]/10 bg-[#006c49]/5 p-4">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#006c49]">Dica do Mentor</p>
                        <p className="text-sm italic text-[#191c1e]">
                          Diversificar em FIIs pode reduzir a volatilidade da carteira devido ao fluxo de renda mensal.
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.08em] text-[#75777e]">Mentor IA • Digitando...</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#c5c6cd] bg-[#f7f9fb] p-4 md:p-6">
                <div className="mb-3 flex items-center gap-2 overflow-x-auto pb-1">
                  {suggestedTopics.map((topic) => (
                    <button
                      key={topic}
                      onClick={() => applySuggestion(topic)}
                      className="shrink-0 rounded-full border border-[#c5c6cd] bg-[#e6e8ea] px-3 py-1.5 text-sm transition hover:bg-[#6cf8bb] hover:text-[#005236]"
                    >
                      {topic}
                    </button>
                  ))}
                </div>

                <div className="rounded-xl border border-[#c5c6cd] bg-white p-2 shadow-sm">
                  <div className="mb-2 flex items-center gap-2 border-b border-[#c5c6cd]/50 px-2 py-1">
                    <button className="rounded p-1 text-[#44474d] hover:bg-[#eceef0]" aria-label="Negrito">
                      <strong>B</strong>
                    </button>
                    <button className="rounded p-1 text-[#44474d] hover:bg-[#eceef0]" aria-label="Italico">
                      <em>I</em>
                    </button>
                    <button className="rounded p-1 text-[#44474d] hover:bg-[#eceef0]" aria-label="Anexo">
                      +
                    </button>
                    <span className="mx-1 h-4 w-px bg-[#c5c6cd]" />
                    <button className="rounded p-1 text-[#44474d] hover:bg-[#eceef0]" aria-label="Analise">
                      <ChartColumn size={16} />
                    </button>
                  </div>

                  <div className="flex items-end gap-3 px-2 pb-1">
                    <textarea
                      ref={textareaRef}
                      value={prompt}
                      rows={1}
                      onChange={(event) => setPrompt(event.target.value)}
                      placeholder="Pergunte ao seu mentor sobre construção de riqueza..."
                      className="max-h-32 min-h-[40px] w-full resize-none bg-transparent py-2 text-sm text-[#191c1e] outline-none"
                    />

                    <button
                      onClick={handleSend}
                      disabled={!canSend}
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Enviar"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden w-[320px] flex-col gap-4 border-l border-[#c5c6cd] p-6 xl:flex">
              <div className="rounded-xl border border-[#c5c6cd] bg-[#f2f4f6] p-4">
                <h4 className="mb-4 text-xs uppercase tracking-[0.1em] text-[#44474d]">Impacto na carteira</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Risco Atual</span>
                    <span className="font-semibold text-[#ba1a1a]">Alto</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e0e3e5]">
                    <div className="h-full bg-[#ba1a1a]" style={{ width: `${riskCurrent}%` }} />
                  </div>

                  <div className="flex items-center justify-between pt-2 text-sm">
                    <span>Risco Proposto</span>
                    <span className="font-semibold text-[#006c49]">Moderado</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e0e3e5]">
                    <div className="h-full bg-[#006c49]" style={{ width: `${riskProposed}%` }} />
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#c5c6cd] bg-[#f2f4f6] p-4">
                <h4 className="mb-3 text-xs uppercase tracking-[0.1em] text-[#44474d]">Leitura recomendada</h4>
                <div className="space-y-2">
                  <a href="#" className="block rounded p-2 transition hover:bg-[#e6e8ea]">
                    <p className="text-sm font-semibold text-[#191c1e]">Dominando o Mercado de FIIs</p>
                    <p className="text-xs text-[#75777e]">4 min de leitura • Avancado</p>
                  </a>
                  <a href="#" className="block rounded p-2 transition hover:bg-[#e6e8ea]">
                    <p className="text-sm font-semibold text-[#191c1e]">Panorama Global dos REITs</p>
                    <p className="text-xs text-[#75777e]">6 min de leitura • Intermediario</p>
                  </a>
                </div>
              </div>

              <div className="group relative mt-auto h-[160px] cursor-pointer overflow-hidden rounded-xl">
                <img
                  alt="Market intelligence"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src="https://images.unsplash.com/photo-1549421263-4f3b1f5fd449?w=900&q=80"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#6cf8bb]">Insight Semanal</p>
                  <h5 className="text-sm font-semibold text-white">Previsao de Mercado 2024</h5>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
