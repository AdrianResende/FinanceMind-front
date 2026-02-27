import * as React from 'react'
import { cn } from '@/lib/utils'
import type { RiskLevel } from './RiskCard'

interface InvestmentSimulatorProps {
  className?: string
}

interface SimulationResult {
  period: string
  years: number
  low: number
  medium: number
  high: number
}

export function InvestmentSimulator({ className }: InvestmentSimulatorProps) {
  const [amount, setAmount] = React.useState<string>('10000')
  const [selectedRisk, setSelectedRisk] = React.useState<RiskLevel | 'all'>('all')

  const numericAmount = parseFloat(amount.replace(/\D/g, '')) || 0

  const calculateReturn = (principal: number, annualRate: number, years: number): number => {
    // Juros compostos: M = C * (1 + i)^t
    return principal * Math.pow(1 + annualRate, years)
  }

  const simulations: SimulationResult[] = [
    {
      period: '1 ano',
      years: 1,
      low: calculateReturn(numericAmount, 0.11, 1), // 11% ao ano (100% CDI aproximado)
      medium: calculateReturn(numericAmount, 0.14, 1), // 14% ao ano
      high: calculateReturn(numericAmount, 0.20, 1), // 20% ao ano
    },
    {
      period: '5 anos',
      years: 5,
      low: calculateReturn(numericAmount, 0.11, 5),
      medium: calculateReturn(numericAmount, 0.14, 5),
      high: calculateReturn(numericAmount, 0.20, 5),
    },
    {
      period: '10 anos',
      years: 10,
      low: calculateReturn(numericAmount, 0.11, 10),
      medium: calculateReturn(numericAmount, 0.14, 10),
      high: calculateReturn(numericAmount, 0.20, 10),
    },
  ]

  const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  const formatInput = (value: string): string => {
    const numeric = value.replace(/\D/g, '')
    if (!numeric) return ''
    return parseFloat(numeric).toLocaleString('pt-BR')
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    setAmount(value)
  }

  return (
    <div className={cn('rounded-xl bg-white p-6 shadow-card border border-gray-200', className)}>
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Simulador de Investimentos 📈
        </h3>
        <p className="text-gray-600">
          Veja quanto seu dinheiro pode render em diferentes perfis de risco
        </p>
      </div>

      {/* Input Amount */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quanto você quer investir?
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
            R$
          </span>
          <input
            type="text"
            value={formatInput(amount)}
            onChange={handleAmountChange}
            placeholder="0"
            className="w-full rounded-lg border-2 border-gray-300 bg-gray-50 pl-12 pr-4 py-3 text-2xl font-bold text-gray-900 focus:border-brand-teal-500 focus:bg-white focus:outline-none transition-all"
          />
        </div>
        <div className="mt-2 flex gap-2">
          {[1000, 5000, 10000, 50000].map((preset) => (
            <button
              key={preset}
              onClick={() => setAmount(preset.toString())}
              className="rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-brand-teal-100 hover:text-brand-teal-700 transition-colors"
            >
              {formatCurrency(preset)}
            </button>
          ))}
        </div>
      </div>

      {/* Risk Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filtrar por perfil
        </label>
        <div className="flex gap-2">
          {(['all', 'low', 'medium', 'high'] as const).map((risk) => (
            <button
              key={risk}
              onClick={() => setSelectedRisk(risk)}
              className={cn(
                'flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all',
                selectedRisk === risk
                  ? 'bg-brand-teal-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {risk === 'all' && 'Todos'}
              {risk === 'low' && '🛡️ Seguro'}
              {risk === 'medium' && '⚖️ Médio'}
              {risk === 'high' && '🚀 Arrojado'}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {simulations.map((sim) => (
          <div
            key={sim.period}
            className="rounded-lg bg-gradient-to-r from-gray-50 to-white p-4 border border-gray-200"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">{sim.period}</span>
              <span className="text-sm text-gray-600">Projeção de rendimento</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {(selectedRisk === 'all' || selectedRisk === 'low') && (
                <ResultCard
                  title="Risco Mínimo"
                  icon="🛡️"
                  amount={sim.low}
                  profit={sim.low - numericAmount}
                  color="emerald"
                />
              )}
              {(selectedRisk === 'all' || selectedRisk === 'medium') && (
                <ResultCard
                  title="Risco Médio"
                  icon="⚖️"
                  amount={sim.medium}
                  profit={sim.medium - numericAmount}
                  color="amber"
                />
              )}
              {(selectedRisk === 'all' || selectedRisk === 'high') && (
                <ResultCard
                  title="Alto Risco"
                  icon="🚀"
                  amount={sim.high}
                  profit={sim.high - numericAmount}
                  color="red"
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mt-6 rounded-lg bg-amber-50 border border-amber-200 p-4">
        <div className="flex gap-2">
          <span className="text-amber-600">⚠️</span>
          <div>
            <p className="text-sm text-amber-900 font-medium mb-1">
              Simulação com fins educacionais
            </p>
            <p className="text-xs text-amber-800">
              Os valores apresentados são estimativas baseadas em médias históricas. 
              Rentabilidade passada não é garantia de retorno futuro. Considere a inflação 
              e os custos de operação ao investir.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ResultCardProps {
  title: string
  icon: string
  amount: number
  profit: number
  color: 'emerald' | 'amber' | 'red'
}

function ResultCard({ title, icon, amount, profit, color }: ResultCardProps) {
  const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  const colorClasses = {
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    amber: 'bg-amber-50 border-amber-200 text-amber-700',
    red: 'bg-red-50 border-red-200 text-red-700',
  }

  const profitColorClasses = {
    emerald: 'text-emerald-600',
    amber: 'text-amber-600',
    red: 'text-red-600',
  }

  return (
    <div className={cn('rounded-lg border-2 p-3', colorClasses[color])}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{icon}</span>
        <span className="text-xs font-semibold">{title}</span>
      </div>
      <div className="font-bold text-lg text-gray-900 mb-1">
        {formatCurrency(amount)}
      </div>
      <div className={cn('text-xs font-medium', profitColorClasses[color])}>
        +{formatCurrency(profit)} de lucro
      </div>
    </div>
  )
}
