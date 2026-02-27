import * as React from 'react'
import { cn } from '@/lib/utils'

interface FinancialTooltipProps {
  term: string
  definition: string
  children: React.ReactNode
  className?: string
}

export function FinancialTooltip({ term, definition, children, className }: FinancialTooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const [position, setPosition] = React.useState({ top: 0, left: 0 })
  const triggerRef = React.useRef<HTMLSpanElement>(null)

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX + rect.width / 2,
      })
    }
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    setIsVisible(false)
  }

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsVisible(!isVisible)}
        className={cn(
          'cursor-help border-b-2 border-dotted border-brand-teal-400 text-brand-teal-600 font-medium transition-colors hover:text-brand-teal-700 hover:border-brand-teal-500',
          className
        )}
      >
        {children}
      </span>

      {isVisible && (
        <div
          className="fixed z-50 -translate-x-1/2 animate-in fade-in-0 zoom-in-95"
          style={{ top: position.top, left: position.left }}
        >
          <div className="relative bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-xs">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-gray-200 rotate-45" />
            <div className="relative">
              <p className="text-sm font-semibold text-gray-900 mb-1">{term}</p>
              <p className="text-sm text-gray-600">{definition}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Componente auxiliar para facilitar o uso com termos financeiros comuns
interface FinancialTermProps {
  term: keyof typeof FINANCIAL_TERMS
  children?: React.ReactNode
}

export const FINANCIAL_TERMS = {
  CDI: 'Certificado de Depósito Interbancário - É a taxa de juros que os bancos usam para emprestar dinheiro entre si. Serve como referência para vários investimentos.',
  SELIC: 'Taxa básica de juros da economia brasileira, definida pelo Banco Central. Influencia todos os outros juros do país.',
  FII: 'Fundos Imobiliários - São fundos que investem em imóveis ou títulos do setor imobiliário. Você recebe dividendos mensais.',
  'Dividend Yield': 'Indica quanto uma empresa paga em dividendos em relação ao preço da ação. Quanto maior, mais você recebe de "aluguel" da ação.',
  'Tesouro Direto': 'Programa do governo para você emprestar dinheiro ao Brasil e receber juros. É um dos investimentos mais seguros.',
  'Renda Fixa': 'Investimentos onde você sabe ou tem uma boa previsão de quanto vai ganhar. Exemplos: CDB, LCI, LCA.',
  'Renda Variável': 'Investimentos onde o retorno não é garantido e pode variar bastante. Exemplos: ações, fundos de ações.',
  'Liquidez Diária': 'Significa que você pode resgatar seu dinheiro a qualquer dia útil, sem perder rentabilidade.',
  CDB: 'Certificado de Depósito Bancário - É um empréstimo que você faz ao banco, e ele te paga juros por isso.',
  LCI: 'Letra de Crédito Imobiliário - Investimento isento de IR que financia o setor imobiliário.',
  LCA: 'Letra de Crédito do Agronegócio - Similar ao LCI, mas financia o agronegócio. Também isento de IR.',
  'Índice de Sharpe': 'Mede se o risco de um investimento está valendo a pena pelo retorno que ele dá.',
  'Diversificação': 'Distribuir seu dinheiro em diferentes tipos de investimento para reduzir riscos.',
  'Inflação': 'Aumento geral dos preços. Seus investimentos precisam render mais que a inflação para você realmente ganhar dinheiro.',
  IPCA: 'Índice que mede a inflação oficial do Brasil. É a "carestia" que afeta seu bolso.',
} as const

export function FinancialTerm({ term, children }: FinancialTermProps) {
  return (
    <FinancialTooltip term={term} definition={FINANCIAL_TERMS[term]}>
      {children || term}
    </FinancialTooltip>
  )
}
