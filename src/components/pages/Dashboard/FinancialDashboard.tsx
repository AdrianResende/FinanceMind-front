import * as React from 'react'
import { useAuthStore } from '@/stores'
import {
  FinancialHealthBar,
  RiskCard,
  RISK_CATEGORIES,
  InvestmentSimulator,
  FinancialTerm,
} from '@/components/financial'

export default function FinancialDashboard() {
  const { user, isAuthenticated } = useAuthStore()

  // Simula score de saúde financeira (em produção viria da API)
  const [healthScore] = React.useState(72)

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-slate-50 via-white to-brand-teal-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-teal-500 to-brand-teal-600 shadow-lg">
              <span className="text-3xl">💰</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isAuthenticated && user 
                  ? `Olá, ${user.name.split(' ')[0]}! 👋` 
                  : 'Bem-vindo ao FinanceMind'}
              </h1>
              <p className="text-gray-600">
                Sua jornada para a educação financeira e investimentos inteligentes
              </p>
            </div>
          </div>
        </div>

        {/* Financial Health Bar */}
        <div className="mb-8">
          <FinancialHealthBar score={healthScore} />
        </div>

        {/* Educational Intro */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow-card border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            📚 Entenda Investimentos de Forma Simples
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Investir não precisa ser complicado! Aqui você aprenderá sobre diferentes tipos 
            de investimento organizados por <strong>risco</strong>. Termos como{' '}
            <FinancialTerm term="CDI" />, <FinancialTerm term="SELIC" /> e{' '}
            <FinancialTerm term="Dividend Yield" /> ficam mais fáceis de entender com 
            nossas explicações interativas.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Passe o mouse sobre os termos sublinhados para entender o que significam em 
            linguagem simples! 🎓
          </p>
        </div>

        {/* Risk Categories Section */}
        <div className="mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              🎯 Escolha Seu Perfil de Investimento
            </h2>
            <p className="text-gray-600">
              Quanto mais risco, maior o potencial de ganho (e de perda). Diversificar 
              é a chave! Aprenda sobre <FinancialTerm term="Diversificação" />.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <RiskCard
              level="low"
              title={RISK_CATEGORIES.low.title}
              subtitle={RISK_CATEGORIES.low.subtitle}
              investments={RISK_CATEGORIES.low.investments}
            />
            <RiskCard
              level="medium"
              title={RISK_CATEGORIES.medium.title}
              subtitle={RISK_CATEGORIES.medium.subtitle}
              investments={RISK_CATEGORIES.medium.investments}
            />
            <RiskCard
              level="high"
              title={RISK_CATEGORIES.high.title}
              subtitle={RISK_CATEGORIES.high.subtitle}
              investments={RISK_CATEGORIES.high.investments}
            />
          </div>
        </div>

        {/* Investment Simulator */}
        <div className="mb-8">
          <InvestmentSimulator />
        </div>

        {/* Educational Tips */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <div className="rounded-xl bg-gradient-to-br from-brand-teal-500 to-brand-teal-600 p-6 text-white shadow-lg">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              💡 Dica para Iniciantes
            </h3>
            <p className="text-white/90 leading-relaxed mb-4">
              Comece pelo <strong>Risco Mínimo</strong> para criar sua reserva de emergência. 
              Ela deve cobrir 6 meses das suas despesas e ficar em investimentos com{' '}
              <strong>liquidez diária</strong>, como Tesouro Selic ou CDB.
            </p>
            <p className="text-white/80 text-sm">
              Só depois pense em investimentos de maior risco!
            </p>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 p-6 text-white shadow-lg">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              ⚡ Regra de Ouro
            </h3>
            <p className="text-white/90 leading-relaxed mb-4">
              <strong>Nunca invista em algo que você não entende!</strong> Use nossos 
              tooltips informativos para aprender sobre cada termo antes de investir.
            </p>
            <p className="text-white/80 text-sm">
              Conhecimento é o melhor investimento que você pode fazer.
            </p>
          </div>
        </div>

        {/* Glossary Teaser */}
        <div className="rounded-xl bg-white p-6 shadow-card border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            📖 Glossário de Termos Financeiros
          </h2>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {([
              'CDI',
              'SELIC',
              'FII',
              'Tesouro Direto',
              'Renda Fixa',
              'Renda Variável',
              'Liquidez Diária',
              'Diversificação',
              'IPCA',
            ] as const).map((term) => (
              <div
                key={term}
                className="rounded-lg bg-gray-50 p-3 hover:bg-brand-teal-50 transition-colors"
              >
                <FinancialTerm term={term}>
                  <span className="text-sm font-medium">{term}</span>
                </FinancialTerm>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-600 text-center">
            👆 Clique ou passe o mouse sobre qualquer termo para ver a explicação
          </p>
        </div>

        {/* CTA Section */}
        <div className="mt-8 rounded-xl bg-gradient-to-r from-brand-teal-600 to-brand-teal-700 p-8 text-center text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-3">
            Pronto para começar sua jornada financeira? 🚀
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Use o simulador acima para ver quanto você pode ganhar. Lembre-se: 
            consistência e educação são mais importantes que timing perfeito!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="rounded-lg bg-white px-6 py-3 font-semibold text-brand-teal-700 hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-lg">
              Abrir Conta de Investimentos
            </button>
            <button className="rounded-lg border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10 transition-all">
              Saber Mais Sobre Investimentos
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
