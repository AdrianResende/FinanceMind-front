import { useUIStore } from '@/stores';

export default function Home() {
  const { openLoginModal } = useUIStore();

  return (
    <div className="bg-[#edf1f3] text-[#0d1726]">
      <header className="mx-auto flex w-full max-w-[1140px] items-center justify-between px-4 pb-4 pt-6 sm:px-6 lg:px-8">
        <div className="text-2xl font-black tracking-tight text-[#0a1322]">FinanceMind</div>

        <nav className="hidden items-center gap-7 text-sm font-medium text-[#445066] md:flex">
          <a href="#plataforma" className="border-b-2 border-emerald-400 pb-1 text-[#0a1322]">Plataforma</a>
          <a href="#mentoria" className="transition hover:text-[#0a1322]">Mentoria IA</a>
          <a href="#curriculo" className="transition hover:text-[#0a1322]">Trilha</a>
          <a href="#planos" className="transition hover:text-[#0a1322]">Planos</a>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={openLoginModal}
            className="hidden px-4 py-2 text-sm font-medium text-[#2f3a4e] transition hover:text-[#0a1322] sm:inline-flex"
          >
            Entrar
          </button>
          <button
            onClick={openLoginModal}
            className="inline-flex h-10 items-center rounded-md bg-[#07172e] px-4 text-sm font-semibold text-white shadow-md shadow-[#07172e]/20 transition hover:bg-[#0b2344]"
          >
            Começar
          </button>
        </div>
      </header>

      <section id="plataforma" className="mx-auto grid w-full max-w-[1140px] gap-10 px-4 pb-20 pt-5 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="self-center">
          <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
            IA educativa de próxima geração
          </span>
          <h1 className="mt-6 max-w-xl text-4xl font-black leading-tight tracking-tight text-[#061225] sm:text-5xl">
            Domine seu futuro financeiro com inteligência artificial
          </h1>
          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-[#4d586e]">
            Aprenda a investir, entenda o mercado e tome decisões seguras com a ajuda da nossa IA educativa desenvolvida para investidores modernos.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={openLoginModal}
              className="inline-flex h-11 items-center gap-2 rounded-md bg-[#071c38] px-5 text-sm font-semibold text-white shadow-md shadow-[#071c38]/25 transition hover:bg-[#0b2a50]"
            >
              Começar agora gratuitamente
              <span aria-hidden="true">-&gt;</span>
            </button>
            <a
              href="#demo"
              className="inline-flex h-11 items-center gap-2 rounded-md border border-[#c2c8d1] bg-[#f7f9fb] px-5 text-sm font-medium text-[#1a2438] transition hover:bg-[#edf1f3]"
            >
              Ver demonstração
            </a>
          </div>
        </div>

        <div id="demo" className="relative">
          <div className="relative overflow-hidden rounded-xl border-4 border-white bg-[#01172f] p-5 shadow-2xl shadow-[#021024]/35">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(13,148,136,0.32),transparent_60%)]" />
            <div className="relative rounded-lg border border-teal-400/20 bg-[#052037] p-4">
              <div className="mb-4 h-7 rounded-md bg-[#10314a]" />
              <div className="grid grid-cols-7 gap-1 opacity-90">
                {Array.from({ length: 63 }).map((_, index) => (
                  <span
                    key={index}
                    className="block rounded-sm bg-teal-300/20"
                    style={{ height: `${10 + ((index * 7) % 44)}px` }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 left-4 rounded-md border border-slate-700 bg-[#0b1220] px-4 py-2 shadow-lg shadow-slate-900/20">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#6a7589]">Análise de risco por IA</p>
            <p className="text-2xl font-bold text-emerald-400">Risco baixo</p>
          </div>
        </div>
      </section>

      <section className="bg-[#edf1f3] py-16">
        <div className="mx-auto w-full max-w-[1140px] px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-4xl font-black tracking-tight text-[#061225]">Inteligência a serviço do seu capital</h2>
          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-emerald-500" />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-[#d5dde5] bg-[#f7f9fb] p-6 shadow-sm">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#071a34] text-white">G</div>
              <h3 className="text-2xl font-bold text-[#09172b]">Glossário inteligente</h3>
              <p className="mt-3 text-sm leading-6 text-[#5a657a]">
                Chega de termos complexos do mercado. Traduzimos tudo para uma linguagem simples e acessível em tempo real.
              </p>
            </article>

            <article className="rounded-2xl border border-[#d5dde5] bg-[#f7f9fb] p-6 shadow-sm">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-emerald-700 text-white">I</div>
              <h3 className="text-2xl font-bold text-[#09172b]">Insights de IA</h3>
              <p className="mt-3 text-sm leading-6 text-[#5a657a]">
                Análise profunda de riscos e tendências de mercado baseada em milhões de pontos de dados processados instantaneamente.
              </p>
            </article>

            <article id="mentoria" className="rounded-2xl border border-[#d5dde5] bg-[#f7f9fb] p-6 shadow-sm">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#071a34] text-white">M</div>
              <h3 className="text-2xl font-bold text-[#09172b]">Mentoria 24/7</h3>
              <p className="mt-3 text-sm leading-6 text-[#5a657a]">
                Uma jornada educacional personalizada. Tire dúvidas a qualquer hora e receba orientações neutras baseadas em dados.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#021735] py-14">
        <div className="mx-auto grid w-full max-w-[1140px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="overflow-hidden rounded-xl border border-white/15 bg-[radial-gradient(circle_at_30%_25%,rgba(16,185,129,0.2),transparent_58%),linear-gradient(135deg,#021224,#04274b)] p-7">
            <div className="rounded-lg border border-[#3a536d] bg-[#0b253f] p-5 shadow-inner">
              <div className="mb-3 h-6 rounded bg-[#123757]" />
              <div className="grid grid-cols-12 gap-1">
                {Array.from({ length: 84 }).map((_, index) => (
                  <span
                    key={`screen-${index}`}
                    className="rounded-sm bg-cyan-200/20"
                    style={{ height: `${8 + ((index * 13) % 22)}px` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="text-white">
            <h2 className="text-4xl font-black leading-tight">Interface de nível institucional</h2>
            <ul className="mt-6 space-y-5 text-base text-cyan-100">
              <li>
                <span className="font-semibold text-emerald-300">Visualização de dados:</span> gráficos limpos que priorizam a clareza sobre o ruído visual.
              </li>
              <li>
                <span className="font-semibold text-emerald-300">Simulador de carteira:</span> teste estratégias em ambientes seguros antes de investir de verdade.
              </li>
              <li>
                <span className="font-semibold text-emerald-300">Feed de IA nativo:</span> resumo curado das notícias que realmente impactam seu bolso.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="curriculo" className="bg-[#edf1f3] py-16">
        <div className="mx-auto w-full max-w-[1140px] px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-4xl font-black text-[#061225]">Sua jornada rumo à liberdade</h2>
          <p className="mt-2 text-center text-sm text-[#6a7488]">Do básico ao avançado em 4 passos guiados</p>

          <div className="relative mt-12 grid gap-6 md:grid-cols-4">
            <div className="absolute left-0 right-0 top-7 hidden h-px bg-[#cdd3dc] md:block" />
            {[
              ['01', 'Fundamentos', 'Aprenda os conceitos-base com nossa IA interativa.'],
              ['02', 'Simulação', 'Pratique em tempo real sem risco ao seu patrimônio.'],
              ['03', 'Estratégia', 'Construa sua tese de investimento com suporte analítico.'],
              ['04', 'Gestão', 'Monitore e otimize sua carteira real com insights de IA.'],
            ].map(([step, title, description], index) => (
              <article key={step} className="relative z-10 text-center">
                <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl border text-sm font-semibold ${index === 3 ? 'border-emerald-300 bg-emerald-50 text-emerald-700' : 'border-[#d5dde5] bg-[#f7f9fb] text-[#1a2438]'}`}>
                  {step}
                </div>
                <h3 className="mt-4 text-lg font-bold text-[#0d1726]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#657186]">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="planos" className="bg-[#edf1f3] py-10 pb-24">
        <div className="mx-auto w-full max-w-[1140px] px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-4xl font-black text-[#061225]">Planos transparentes</h2>
          <p className="mt-2 text-center text-sm text-[#6a7488]">Escolha o nível de suporte ideal para sua evolução</p>

          <div className="mx-auto mt-10 grid max-w-4xl overflow-hidden rounded-2xl border border-[#cfd6df] bg-[#f7f9fb] shadow-xl md:grid-cols-2">
            <article className="p-8">
              <h3 className="text-3xl font-bold text-[#0d1726]">Gratuito</h3>
              <p className="mt-2 text-5xl font-black text-[#0d1726]">R$ 0<span className="text-base font-medium text-[#627088]">/mes</span></p>
              <p className="mt-4 text-sm text-[#5f6b80]">Para quem está começando a dar os primeiros passos.</p>
              <ul className="mt-6 space-y-2 text-sm text-[#273247]">
                <li>Acesso ao glossário básico</li>
                <li>Simulador de carteira (limitado)</li>
                <li>1 mentoria de IA por semana</li>
              </ul>
              <button
                onClick={openLoginModal}
                className="mt-8 inline-flex h-11 w-full items-center justify-center rounded-md border border-[#1c2941] text-sm font-semibold text-[#1c2941] transition hover:bg-[#f5f8fc]"
              >
                Começar agora
              </button>
            </article>

            <article className="bg-[#031734] p-8 text-white">
              <div className="mb-5 inline-flex rounded-full bg-emerald-500/25 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-300">
                Mais popular
              </div>
              <h3 className="text-3xl font-bold">Pro</h3>
              <p className="mt-2 text-5xl font-black">R$ 49<span className="text-base font-medium text-cyan-100">/mes</span></p>
              <p className="mt-4 text-sm text-cyan-100">Potencial máximo para investidores ativos.</p>
              <ul className="mt-6 space-y-2 text-sm text-cyan-50">
                <li>Insights de IA ilimitados</li>
                <li>Mentoria 24/7 ilimitada</li>
                <li>Análise de carteira real</li>
                <li>Relatórios de conformidade</li>
              </ul>
              <button
                onClick={openLoginModal}
                className="mt-8 inline-flex h-11 w-full items-center justify-center rounded-md bg-emerald-600 text-sm font-semibold text-white transition hover:bg-emerald-500"
              >
                Evoluir para Pro
              </button>
            </article>
          </div>
        </div>
      </section>

      <footer className="bg-[#041127] py-12 text-cyan-100">
        <div className="mx-auto grid w-full max-w-[1140px] gap-8 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <p className="text-2xl font-black text-white">FinanceMind</p>
            <p className="mt-3 text-sm text-cyan-200/80">2026 FinanceMind AI. Educação financeira para o investidor moderno.</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-cyan-300">Empresa</p>
            <ul className="mt-3 space-y-2 text-sm text-cyan-100/85">
              <li>Política de privacidade</li>
              <li>Termos de uso</li>
              <li>Conformidade</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-cyan-300">Suporte</p>
            <ul className="mt-3 space-y-2 text-sm text-cyan-100/85">
              <li>Fale com o suporte</li>
              <li>Documentação da API</li>
              <li>Relações com investidores</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
