export interface Stock {
  symbol: string;
  name: string;
  currentPrice: number;
  previousClose: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  sector: string;
}

export interface TradeRecommendation {
  id: string;
  symbol: string;
  name: string;
  type: 'BUY' | 'SELL';
  entryPrice: number;
  targetPrice: number;
  stopLoss: number;
  expectedDuration: string;
  confidence: number;
  reasoning: string;
  timestamp: string;
  status: 'ACTIVE' | 'COMPLETED' | 'STOPPED';
  actualResult?: number;
  actualProfit?: number;
  tags: string[];
}

export interface PortfolioPosition {
  id: string;
  symbol: string;
  name: string;
  entryPrice: number;
  quantity: number;
  currentPrice: number;
  totalInvestment: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercent: number;
  entryDate: string;
}

export interface BacktestResult {
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  profitLoss: number;
  profitLossPercent: number;
  maxDrawdown: number;
  averageWin: number;
  averageLoss: number;
  sharpeRatio: number;
  trades: TradeRecommendation[];
}

export interface RiskAssessment {
  symbol: string;
  volatility: number;
  recommendedPositionSize: number;
  maxRiskAmount: number;
  riskRewardRatio: number;
  confidenceScore: number;
}