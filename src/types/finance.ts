// ---------------------------------------------------------------------------
// Tipos de domínio: mercado financeiro
// Mantidos separados de common.ts para não misturar domínio com infra.
// ---------------------------------------------------------------------------

export type RiskLevel = 'Baixo' | 'Médio' | 'Alto';

export type AssetClass = 'acao' | 'fii' | 'bdr' | 'cripto' | 'renda-fixa';

export interface Asset {
  ticker: string;
  name: string;
  sector: string;
  assetClass: AssetClass;
  risk: RiskLevel;
}

export interface Quote {
  ticker: string;
  price: number;
  change: number;        // variação absoluta no dia
  changePercent: number; // variação percentual no dia
  volume?: number;
  updatedAt: string;     // ISO 8601
}

export interface AssetRiskMetrics {
  ticker: string;
  riskLevel: RiskLevel;
  score: number;         // 0-100
  volatility: number;   // % anualizada
  beta: number;
  maxDrawdown: number;  // % (negativo)
  cvar95: number;       // Conditional VaR 95% (negativo)
}

export interface PortfolioPosition {
  asset: Asset;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  allocationPercent: number;
}

export interface Portfolio {
  id: string;
  name: string;
  positions: PortfolioPosition[];
  totalValue: number;
  totalCost: number;
  totalReturn: number;        // absoluto
  totalReturnPercent: number; // percentual
  updatedAt: string;
}

export interface MarketSummary {
  ibovespa: number;
  ibovespaDailyChange: number;
  dollar: number;
  interestRate: number; // Selic %
}
