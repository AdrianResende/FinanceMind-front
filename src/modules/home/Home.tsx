import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { WelcomeCard } from './components';

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-br from-brand-teal-50 via-white to-brand-teal-100 p-8 shadow-card border border-brand-teal-100">
        <p className="mb-3 inline-flex rounded-full bg-brand-teal-600/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-teal-700">
          Dashboard Pública
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Educação financeira clara para você investir com confiança
        </h1>
        <p className="mt-4 max-w-3xl text-gray-700 leading-relaxed">
          A FinanceMind existe para tornar finanças simples na prática: mostramos conceitos,
          organizamos trilhas de aprendizado e, depois do login, liberamos simulações para você
          testar cenários antes de tomar decisões.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild className="bg-brand-teal-600 hover:bg-brand-teal-700">
            <Link to="/login">Entrar e liberar simulação</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/dashboard">Ir para área protegida</Link>
          </Button>
        </div>
      </section>

      <section id="quem-somos" className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">Quem somos</h2>
        <p className="mt-3 text-gray-700 leading-relaxed">
          Somos uma plataforma focada em educação financeira aplicada. Em vez de jargões,
          você aprende com exemplos reais, linguagem simples e visão comparativa de opções
          de investimento para o seu momento atual.
        </p>
      </section>

      <section id="como-funciona" className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">Como funciona</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-gray-100 bg-gray-50 p-4">
            <h3 className="text-lg font-semibold text-gray-900">1. Explore a base</h3>
            <p className="mt-2 text-sm text-gray-600">
              Veja esta dashboard pública para entender o método, os objetivos e os módulos.
            </p>
          </article>
          <article className="rounded-xl border border-gray-100 bg-gray-50 p-4">
            <h3 className="text-lg font-semibold text-gray-900">2. Faça login</h3>
            <p className="mt-2 text-sm text-gray-600">
              Com acesso autenticado, liberamos conteúdos práticos e ferramentas interativas.
            </p>
          </article>
          <article className="rounded-xl border border-gray-100 bg-gray-50 p-4">
            <h3 className="text-lg font-semibold text-gray-900">3. Simule e aprenda</h3>
            <p className="mt-2 text-sm text-gray-600">
              Compare estratégias, entenda risco/liquidez e veja explicações de cada parte financeira.
            </p>
          </article>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <WelcomeCard />

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">🔓 Área liberada após login</h2>
          <p className="text-sm text-gray-600">
            Simulador de investimentos com retorno projetado e visão de risco.
          </p>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">📚 Explicações financeiras</h2>
          <p className="text-sm text-gray-600">
            Conceitos como CDI, SELIC, renda fixa, renda variável e diversificação.
          </p>
        </div>
      </section>

      <section className="rounded-2xl bg-gray-900 p-6 text-white">
        <h2 className="text-2xl font-bold">Pronto para começar?</h2>
        <p className="mt-2 text-gray-300">
          Entre agora para desbloquear a simulação e o conteúdo completo da plataforma.
        </p>
        <Button asChild className="mt-5 bg-white text-gray-900 hover:bg-gray-100">
          <Link to="/login">Acessar minha conta</Link>
        </Button>
      </section>
    </div>
  );
}

