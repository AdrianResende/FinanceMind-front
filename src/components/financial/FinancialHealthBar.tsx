import { cn } from '@/lib/utils'

interface FinancialHealthBarProps {
  score: number // 0-100
  className?: string
}

export function FinancialHealthBar({ score, className }: FinancialHealthBarProps) {
  const clampedScore = Math.max(0, Math.min(100, score))
  
  const getHealthStatus = (score: number) => {
    if (score >= 80) return { label: 'Excelente', color: 'bg-emerald-500', emoji: '🌟' }
    if (score >= 60) return { label: 'Boa', color: 'bg-green-500', emoji: '✅' }
    if (score >= 40) return { label: 'Regular', color: 'bg-yellow-500', emoji: '⚠️' }
    if (score >= 20) return { label: 'Precisa Atenção', color: 'bg-orange-500', emoji: '📊' }
    return { label: 'Crítica', color: 'bg-red-500', emoji: '🚨' }
  }

  const status = getHealthStatus(clampedScore)

  return (
    <div className={cn('rounded-xl bg-white p-6 shadow-card border border-gray-200', className)}>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Saúde Financeira</h3>
          <p className="text-sm text-gray-600">Indicador geral da sua situação</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{status.emoji}</span>
            <span className="text-3xl font-bold text-brand-teal-600">{clampedScore}</span>
          </div>
          <span className={cn('text-sm font-medium', 
            clampedScore >= 60 ? 'text-green-600' : 
            clampedScore >= 40 ? 'text-yellow-600' : 'text-red-600'
          )}>
            {status.label}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-1000 ease-out',
            status.color
          )}
          style={{ width: `${clampedScore}%` }}
        >
          <div className="h-full w-full animate-pulse bg-white/20" />
        </div>
      </div>

      {/* Indicators */}
      <div className="mt-4 grid grid-cols-4 gap-2 text-xs text-gray-500">
        <div className="text-center">
          <div className="h-1 w-full bg-red-200 rounded mb-1" />
          <span>0-25</span>
        </div>
        <div className="text-center">
          <div className="h-1 w-full bg-yellow-200 rounded mb-1" />
          <span>25-50</span>
        </div>
        <div className="text-center">
          <div className="h-1 w-full bg-green-200 rounded mb-1" />
          <span>50-75</span>
        </div>
        <div className="text-center">
          <div className="h-1 w-full bg-emerald-200 rounded mb-1" />
          <span>75-100</span>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        <MetricCard
          icon="💰"
          label="Patrimônio"
          value="R$ 45.280"
          trend="+12%"
          positive
        />
        <MetricCard
          icon="📊"
          label="Diversificação"
          value="8 ativos"
          trend="Ótimo"
          positive
        />
        <MetricCard
          icon="🎯"
          label="Meta Mensal"
          value="87%"
          trend="-13%"
          positive={false}
        />
      </div>
    </div>
  )
}

interface MetricCardProps {
  icon: string
  label: string
  value: string
  trend: string
  positive: boolean
}

function MetricCard({ icon, label, value, trend, positive }: MetricCardProps) {
  return (
    <div className="rounded-lg bg-gray-50 p-3 text-center">
      <div className="text-xl mb-1">{icon}</div>
      <div className="text-xs text-gray-600 mb-1">{label}</div>
      <div className="font-bold text-gray-900 text-sm mb-1">{value}</div>
      <div className={cn('text-xs font-medium', positive ? 'text-green-600' : 'text-red-600')}>
        {trend}
      </div>
    </div>
  )
}
