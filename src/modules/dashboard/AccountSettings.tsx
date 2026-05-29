import { useMemo, useState } from 'react';
import {
  Bell,
  Briefcase,
  ChartColumn,
  CheckCircle2,
  Cog,
  GraduationCap,
  Info,
  LayoutDashboard,
  Shield,
  Sparkles,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const desktopMenu = [
  { id: 'dashboard', label: 'Painel', icon: LayoutDashboard, to: '/dashboard' },
  { id: 'analisar', label: 'Analisar Ativo', icon: TrendingUp, to: '/dashboard' },
  { id: 'portfolio', label: 'Carteira', icon: Wallet, to: '/dashboard' },
  { id: 'ativos', label: 'Ativos', icon: ChartColumn, to: '/dashboard' },
  { id: 'aprendizado', label: 'Aprendizado', icon: GraduationCap, to: '/dashboard' },
  { id: 'chat-ia', label: 'Chat IA', icon: Sparkles, to: '/chat-ia' },
  { id: 'configuracoes', label: 'Configurações', icon: Cog, to: '/configuracoes', active: true },
];

const mobileMenu = [
  { id: 'dashboard', label: 'Dash', icon: LayoutDashboard, to: '/dashboard' },
  { id: 'analisar', label: 'Analise', icon: TrendingUp, to: '/dashboard' },
  { id: 'carteira', label: 'Carteira', icon: Briefcase, to: '/dashboard' },
  { id: 'ativos', label: 'Ativos', icon: ChartColumn, to: '/dashboard' },
  { id: 'aprender', label: 'Aprender', icon: GraduationCap, to: '/chat-ia' },
  { id: 'config', label: 'Config', icon: Cog, to: '/configuracoes', active: true },
];

const planBenefits = [
  {
    title: 'Rastreamento ilimitado de carteira',
    description: 'Sincronização em tempo real com mais de 50 instituições.',
  },
  {
    title: 'Análise avançada com IA',
    description: 'Modelagem de risco preditiva e colheita de prejuízos fiscais.',
  },
  {
    title: 'Centro de aprendizado institucional',
    description: 'Relatórios de mercado exclusivos de analistas experientes.',
  },
  {
    title: 'Suporte prioritário 24/7',
    description: 'Linha direta com consultores seniores de patrimônio.',
  },
];

const riskLevels = ['Defensivo', 'Conservador', 'Moderado', 'Crescimento', 'Crescimento Agressivo'];

export default function AccountSettings() {
  const [riskValue, setRiskValue] = useState(5);

  const riskLabel = useMemo(() => riskLevels[riskValue - 1], [riskValue]);

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] pb-20 md:pb-0">
      <nav className="md:hidden flex h-16 w-full items-center justify-between border-b border-[#c5c6cd] bg-[#f7f9fb] px-4">
        <span className="text-xl font-bold text-black">FinEdu</span>
        <div className="flex items-center gap-3">
          <Bell size={20} className="text-[#44474d]" />
          <img
            alt="Perfil"
            className="h-8 w-8 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&q=80"
          />
        </div>
      </nav>

      <div className="flex min-h-screen">
        <aside className="hidden">
          <div className="mb-4 flex items-center gap-2 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-black text-white">
              <Wallet size={18} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-black leading-none">FinEdu SaaS</h1>
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#44474d]">Riqueza &amp; Aprendizado</p>
            </div>
          </div>

          <nav className="flex flex-1 flex-col gap-1">
            {desktopMenu.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  to={item.to}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-xs uppercase tracking-[0.08em] transition-colors ${
                    item.active
                      ? 'bg-[#6cf8bb] text-[#005236] font-semibold'
                      : 'text-[#44474d] hover:bg-[#e6e8ea]'
                  }`}
                >
                  <Icon size={15} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto rounded-lg border border-[#c5c6cd] bg-white p-4">
            <p className="text-[10px] uppercase tracking-[0.14em] text-[#44474d]">Status do plano</p>
            <div className="mb-3 mt-2 flex items-center justify-between">
              <span className="font-semibold text-black">Plano Pro</span>
              <span className="rounded bg-[#006c49] px-2 py-0.5 text-[10px] font-bold uppercase text-white">Ativo</span>
            </div>
            <button className="w-full rounded-md bg-black py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white hover:opacity-90">
              Atualizar Agora
            </button>
          </div>
        </aside>

        <main className="mx-auto w-full max-w-screen-2xl px-4 py-10 md:ml-[280px] md:px-10">
          <header className="mb-8">
            <h2 className="text-4xl font-semibold text-black">Configurações da conta</h2>
            <p className="mt-1 text-sm text-[#44474d]">Gerencie seu perfil, preferências e detalhes da assinatura.</p>
          </header>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <section className="space-y-4 lg:col-span-4">
              <div className="rounded-xl border border-[#c5c6cd] bg-white p-6 shadow-sm">
                <div className="flex flex-col items-center text-center">
                  <div className="group relative cursor-pointer">
                    <img
                      alt="Perfil do Usuario"
                      className="mb-4 h-32 w-32 rounded-full border-4 border-white object-cover shadow-md transition-transform duration-200 group-hover:scale-105"
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=256&q=80"
                    />
                  </div>
                  <h3 className="text-4 font-semibold text-black">Alexander Sterling</h3>
                  <p className="mb-4 text-sm text-[#44474d]">a.sterling@privatewealth.com</p>

                  <div className="w-full space-y-2 text-left">
                    <div>
                      <label className="mb-1 block text-sm font-semibold text-[#191c1e]">Nome Completo</label>
                      <input
                        className="h-11 w-full rounded-md border border-[#c5c6cd] bg-[#f7f9fb] px-3 outline-none transition focus:border-black"
                        type="text"
                        defaultValue="Alexander Sterling"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-semibold text-[#191c1e]">E-mail</label>
                      <input
                        className="h-11 w-full rounded-md border border-[#c5c6cd] bg-[#f7f9fb] px-3 outline-none transition focus:border-black"
                        type="email"
                        defaultValue="a.sterling@privatewealth.com"
                      />
                    </div>
                    <button className="mt-2 w-full rounded-md bg-black py-3 text-xs font-semibold uppercase tracking-[0.08em] text-white hover:opacity-90">
                      Atualizar Perfil
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#c5c6cd] bg-white p-6 shadow-sm">
                <h4 className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-[#44474d]">
                  <Shield size={14} />
                  Status de Seguranca
                </h4>
                <div className="flex items-center justify-between rounded-lg bg-[#6cf8bb]/20 p-4">
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-[#006c49]" />
                    <span className="text-sm font-semibold">2FA Ativado</span>
                  </div>
                  <button className="text-xs font-semibold uppercase tracking-[0.08em] text-[#006c49]">Alterar</button>
                </div>
              </div>
            </section>

            <section className="space-y-4 lg:col-span-8">
              <div className="overflow-hidden rounded-xl border border-[#c5c6cd] bg-white shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#c5c6cd] bg-[#eceef0] p-6">
                  <div>
                    <h3 className="text-3 font-semibold text-black">Gerenciamento de assinatura</h3>
                    <p className="text-sm text-[#44474d]">Seu plano atual é o Plano Pro.</p>
                  </div>
                  <div className="rounded-md bg-[#0d1c32] px-4 py-2 text-sm font-semibold text-white">R$ 249,00 / mes</div>
                </div>

                <div className="p-6">
                  <h4 className="mb-4 text-xs uppercase tracking-[0.1em] text-[#44474d]">Benefícios do Plano Pro</h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {planBenefits.map((benefit) => (
                      <div key={benefit.title} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="mt-0.5 text-[#006c49]" />
                        <div>
                          <p className="text-sm font-semibold text-[#191c1e]">{benefit.title}</p>
                          <p className="text-sm text-[#44474d]">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3 border-t border-[#c5c6cd] pt-6">
                    <button className="rounded-md border border-black px-6 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-black hover:bg-[#eceef0]">
                      Gerenciar faturamento
                    </button>
                    <button className="px-6 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#44474d] hover:text-[#ba1a1a]">
                      Cancelar assinatura
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#c5c6cd] bg-white p-6 shadow-sm">
                <header className="mb-6 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-3 font-semibold text-black">Perfil de risco</h3>
                    <p className="text-sm text-[#44474d]">Configure como a IA avalia suas oportunidades de investimento.</p>
                  </div>
                  <Info size={16} className="text-[#44474d]" />
                </header>

                <div className="space-y-6">
                  <div>
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold">Nível de tolerância ao risco</span>
                      <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#006c49]">{riskLabel}</span>
                    </div>
                    <input
                      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#e6e8ea] accent-black"
                      min={1}
                      max={5}
                      type="range"
                      value={riskValue}
                      onChange={(event) => setRiskValue(Number(event.target.value))}
                    />
                    <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.08em] text-[#75777e]">
                      <span>Conservador</span>
                      <span>Moderado</span>
                      <span>Agressivo</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    <label className="cursor-pointer rounded-lg border border-[#c5c6cd] p-4 hover:border-black">
                      <input defaultChecked className="hidden" type="checkbox" />
                      <div className="flex flex-col gap-2">
                        <TrendingUp size={16} />
                        <span className="text-sm font-semibold">Alta Volatilidade OK</span>
                      </div>
                    </label>

                    <label className="cursor-pointer rounded-lg border border-[#c5c6cd] p-4 hover:border-black">
                      <input className="hidden" type="checkbox" />
                      <div className="flex flex-col gap-2">
                        <Briefcase size={16} />
                        <span className="text-sm font-semibold">Foco em Renda Fixa</span>
                      </div>
                    </label>

                    <label className="cursor-pointer rounded-lg border border-[#c5c6cd] p-4 hover:border-black">
                      <input defaultChecked className="hidden" type="checkbox" />
                      <div className="flex flex-col gap-2 text-[#006c49]">
                        <Sparkles size={16} />
                        <span className="text-sm font-semibold">Prioridade ESG</span>
                      </div>
                    </label>
                  </div>

                  <div className="rounded border-l-4 border-black bg-[#f2f4f6] p-4">
                    <p className="text-sm italic text-[#44474d]">
                      Sua configuracao atual prioriza ativos tecnologicos de alto crescimento e setores de energia renovavel,
                      mantendo 15% de protecao em ouro.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-[#c5c6cd] bg-[#f7f9fb] md:hidden">
        {mobileMenu.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              to={item.to}
              className={`flex flex-col items-center ${item.active ? 'font-semibold text-black' : 'text-[#44474d]'}`}
            >
              <Icon size={18} />
              <span className="mt-0.5 text-[10px] uppercase tracking-[0.06em]">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
