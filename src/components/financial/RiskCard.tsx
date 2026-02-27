import { cn } from '@/lib/utils'

export type RiskLevel = 'low' | 'medium' | 'high'

export interface Investment {
  name: string
  description: string
  expectedReturn: string
  hasTerm?: boolean
}

interface RiskCardProps {
  level: RiskLevel
  title: string
  subtitle: string
  investments: readonly Investment[]
  className?: string
}

const RISK_CONFIG = {
  low: {
    color: 'risk-low',
    bgGradient: 'from-emerald-50 to-green-50',
    borderColor: 'border-risk-low',
    icon: '🛡️',
    badge: 'Segurança',
    badgeBg: 'bg-risk-low/10',
    badgeText: 'text-risk-low',
  },
  medium: {
    color: 'risk-medium',
    bgGradient: 'from-amber-50 to-orange-50',
    borderColor: 'border-risk-medium',
    icon: '⚖️',
    badge: 'Equilíbrio',
    badgeBg: 'bg-risk-medium/10',
    badgeText: 'text-risk-medium',
  },
  high: {
    color: 'risk-high',
    bgGradient: 'from-red-50 to-rose-50',
    borderColor: 'border-risk-high',
    icon: '🚀',
    badge: 'Crescimento',
    badgeBg: 'bg-risk-high/10',
    badgeText: 'text-risk-high',
  },
} as const

export function RiskCard({ level, title, subtitle, investments, className }: RiskCardProps) {
  const config = RISK_CONFIG[level]

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl border-2 bg-gradient-to-br p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1',
        config.bgGradient,
        config.borderColor,
        className
      )}
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-3xl">{config.icon}</span>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-600">{subtitle}</p>
            </div>
          </div>
        </div>
        <span
          className={cn(
            'rounded-full px-3 py-1 text-xs font-semibold',
            config.badgeBg,
            config.badgeText
          )}
        >
          {config.badge}
        </span>
      </div>

      {/* Investments List */}
      <div className="space-y-3">
        {investments.map((investment, index) => (
          <div
            key={index}
            className="rounded-lg bg-white/60 p-4 backdrop-blur-sm transition-all hover:bg-white/80"
          >
            <div className="mb-1 flex items-start justify-between">
              <h4 className="font-semibold text-gray-900">{investment.name}</h4>
              <span className="text-sm font-medium text-brand-teal-600">
                {investment.expectedReturn}
              </span>
            </div>
            <p className="text-sm text-gray-600">{investment.description}</p>
            {investment.hasTerm && (
              <span className="mt-2 inline-block text-xs text-gray-500">
                ⏱️ Pode ter prazo de resgate
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button
          className={cn(
            'w-full rounded-lg py-2 px-4 font-medium text-white transition-all hover:scale-[1.02] active:scale-[0.98]',
            {
              'bg-risk-low hover:bg-emerald-600': level === 'low',
              'bg-risk-medium hover:bg-amber-600': level === 'medium',
              'bg-risk-high hover:bg-red-600': level === 'high',
            }
          )}
        >
          Simular Investimento
        </button>
      </div>

      {/* Decorative Element */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
    </div>
  )
}

// Dados pré-configurados para as 3 categorias
export const RISK_CATEGORIES = {
  low: {
    title: 'Risco Mínimo',
    subtitle: 'Difícil de perder dinheiro',
    investments: [
      {
        name: 'Tesouro Direto Selic',
        description: 'Investimento mais seguro do Brasil, com liquidez diária e rentabilidade próxima da taxa Selic.',
        expectedReturn: '100% CDI',
      },
      {
        name: 'CDB com Liquidez Diária',
        description: 'Empréstimo ao banco garantido pelo FGC até R$ 250 mil. Resgate a qualquer momento.',
        expectedReturn: '95-100% CDI',
      },
      {
        name: 'LCI/LCA',
        description: 'Isentos de Imposto de Renda, mas podem ter prazo de carência.',
        expectedReturn: '85-95% CDI',
        hasTerm: true,
      },
    ],
  },
  medium: {
    title: 'Risco Médio',
    subtitle: 'Diversificação e dividendos',
    investments: [
      {
        name: 'Fundos Imobiliários (FIIs)',
        description: 'Receba "aluguel" mensal de imóveis comerciais. Dividendos isentos de IR para pessoa física.',
        expectedReturn: '6-10% a.a. + dividendos',
      },
      {
        name: 'Ações com Dividendos',
        description: 'Empresas consolidadas que distribuem lucros regularmente aos acionistas.',
        expectedReturn: '8-12% a.a. + Dividend Yield',
      },
      {
        name: 'Tesouro IPCA+',
        description: 'Proteja seu dinheiro da inflação e ainda ganhe uma taxa real de juros.',
        expectedReturn: 'IPCA + 5-6%',
        hasTerm: true,
      },
    ],
  },
  high: {
    title: 'Alto Risco',
    subtitle: 'Crescimento acelerado',
    investments: [
      {
        name: 'Ações de Crescimento',
        description: 'Empresas com potencial de valorização rápida. Maior volatilidade e oportunidades.',
        expectedReturn: '15-30% a.a.*',
      },
      {
        name: 'Fundos Multimercado',
        description: 'Gestores profissionais buscam as melhores oportunidades em diversos mercados.',
        expectedReturn: '12-20% a.a.*',
      },
      {
        name: 'ETFs Internacionais',
        description: 'Diversificação global com exposição a mercados internacionais.',
        expectedReturn: '10-25% a.a.*',
      },
    ],
  },
} as const
