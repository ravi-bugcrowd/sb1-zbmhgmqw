import { Stock, TradeRecommendation, BacktestResult, PortfolioPosition, RiskAssessment } from '../types';

// Mock data for top NSE stocks
let MOCK_STOCKS: Stock[] = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    currentPrice: 2543.75,
    previousClose: 2538.20,
    change: 5.55,
    changePercent: 0.22,
    volume: 5423000,
    marketCap: 1720000000000,
    sector: 'Energy'
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services Ltd',
    currentPrice: 3456.80,
    previousClose: 3490.10,
    change: -33.3,
    changePercent: -0.95,
    volume: 1245000,
    marketCap: 1260000000000,
    sector: 'Technology'
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd',
    currentPrice: 1678.50,
    previousClose: 1665.75,
    change: 12.75,
    changePercent: 0.77,
    volume: 3567000,
    marketCap: 940000000000,
    sector: 'Finance'
  },
  {
    symbol: 'INFY',
    name: 'Infosys Ltd',
    currentPrice: 1432.25,
    previousClose: 1429.95,
    change: 2.3,
    changePercent: 0.16,
    volume: 2345000,
    marketCap: 610000000000,
    sector: 'Technology'
  },
  {
    symbol: 'ICICIBANK',
    name: 'ICICI Bank Ltd',
    currentPrice: 987.55,
    previousClose: 978.30,
    change: 9.25,
    changePercent: 0.95,
    volume: 4120000,
    marketCap: 690000000000,
    sector: 'Finance'
  },
  {
    symbol: 'TATAMOTORS',
    name: 'Tata Motors Ltd',
    currentPrice: 678.90,
    previousClose: 683.45,
    change: -4.55,
    changePercent: -0.67,
    volume: 7856000,
    marketCap: 223000000000,
    sector: 'Automobile'
  }
];

// Function to simulate price updates
const updateStockPrices = () => {
  MOCK_STOCKS = MOCK_STOCKS.map(stock => {
    const volatility = 0.002; // 0.2% volatility
    const change = stock.currentPrice * volatility * (Math.random() - 0.5);
    const newPrice = stock.currentPrice + change;
    const newChange = newPrice - stock.previousClose;
    const newChangePercent = (newChange / stock.previousClose) * 100;
    const volumeChange = Math.floor(Math.random() * 10000) - 5000;

    return {
      ...stock,
      currentPrice: newPrice,
      change: newChange,
      changePercent: newChangePercent,
      volume: stock.volume + volumeChange
    };
  });
};

// Start price updates
setInterval(updateStockPrices, 3000); // Update every 3 seconds

// Mock trade recommendations
const MOCK_RECOMMENDATIONS: TradeRecommendation[] = [
  {
    id: '1',
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    type: 'BUY',
    entryPrice: 2540.00,
    targetPrice: 2620.00,
    stopLoss: 2490.00,
    expectedDuration: '2-3 weeks',
    confidence: 85,
    reasoning: 'Bullish flag pattern formation with strong volume support. RSI showing positive divergence with price breaking above 20-day EMA.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    status: 'ACTIVE',
    tags: ['Technical', 'Momentum', 'Pattern']
  },
  {
    id: '2',
    symbol: 'TCS',
    name: 'Tata Consultancy Services Ltd',
    type: 'SELL',
    entryPrice: 3458.00,
    targetPrice: 3380.00,
    stopLoss: 3510.00,
    expectedDuration: '1 week',
    confidence: 82,
    reasoning: 'Double top formation on daily chart with MACD showing bearish crossover. Volume increasing on down days.',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    status: 'ACTIVE',
    tags: ['Technical', 'Reversal', 'Pattern']
  },
  {
    id: '3',
    symbol: 'INFY',
    name: 'Infosys Ltd',
    type: 'BUY',
    entryPrice: 1430.00,
    targetPrice: 1490.00,
    stopLoss: 1400.00,
    expectedDuration: '1-2 weeks',
    confidence: 88,
    reasoning: 'Cup and handle pattern completed with breakout above resistance. Fundamentals strong with positive Q2 results expectations.',
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    status: 'ACTIVE',
    tags: ['Technical', 'Fundamental', 'Earnings']
  },
  {
    id: '4',
    symbol: 'TATAMOTORS',
    name: 'Tata Motors Ltd',
    type: 'BUY',
    entryPrice: 675.00,
    targetPrice: 710.00,
    stopLoss: 655.00,
    expectedDuration: '1 week',
    confidence: 81,
    reasoning: 'Recent pullback to support level with positive divergence on RSI. Strong sales numbers and new EV initiative announcements expected.',
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    status: 'ACTIVE',
    tags: ['Technical', 'Fundamental', 'Support']
  },
  {
    id: '5',
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd',
    type: 'BUY',
    entryPrice: 1665.00,
    targetPrice: 1720.00,
    stopLoss: 1640.00,
    expectedDuration: '2 weeks',
    confidence: 84,
    reasoning: 'Ascending triangle pattern with increasing volume. Strong quarterly results showing growth in retail and corporate banking segments.',
    timestamp: new Date(Date.now() - 18000000).toISOString(),
    status: 'COMPLETED',
    actualResult: 1722.50,
    actualProfit: 3.45,
    tags: ['Technical', 'Fundamental', 'Pattern']
  }
];

// Mock portfolio positions
const MOCK_PORTFOLIO: PortfolioPosition[] = [
  {
    id: '1',
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    entryPrice: 2510.25,
    quantity: 10,
    currentPrice: 2543.75,
    totalInvestment: 25102.50,
    currentValue: 25437.50,
    profitLoss: 335.00,
    profitLossPercent: 1.33,
    entryDate: new Date(Date.now() - 604800000).toISOString()
  },
  {
    id: '2',
    symbol: 'INFY',
    name: 'Infosys Ltd',
    entryPrice: 1410.50,
    quantity: 15,
    currentPrice: 1432.25,
    totalInvestment: 21157.50,
    currentValue: 21483.75,
    profitLoss: 326.25,
    profitLossPercent: 1.54,
    entryDate: new Date(Date.now() - 1209600000).toISOString()
  },
  {
    id: '3',
    symbol: 'TATAMOTORS',
    name: 'Tata Motors Ltd',
    entryPrice: 680.15,
    quantity: 25,
    currentPrice: 678.90,
    totalInvestment: 17003.75,
    currentValue: 16972.50,
    profitLoss: -31.25,
    profitLossPercent: -0.18,
    entryDate: new Date(Date.now() - 432000000).toISOString()
  }
];

// Mock backtesting results
const MOCK_BACKTEST_RESULT: BacktestResult = {
  totalTrades: 50,
  winningTrades: 38,
  losingTrades: 12,
  winRate: 76.0,
  profitLoss: 128500,
  profitLossPercent: 12.85,
  maxDrawdown: 3.2,
  averageWin: 4.2,
  averageLoss: 2.1,
  sharpeRatio: 1.8,
  trades: [
    ...MOCK_RECOMMENDATIONS
  ]
};

// Mock risk assessments
const MOCK_RISK_ASSESSMENTS: RiskAssessment[] = [
  {
    symbol: 'RELIANCE',
    volatility: 18.5,
    recommendedPositionSize: 5.0,
    maxRiskAmount: 7500,
    riskRewardRatio: 1.5,
    confidenceScore: 85
  },
  {
    symbol: 'TCS',
    volatility: 15.8,
    recommendedPositionSize: 7.5,
    maxRiskAmount: 10000,
    riskRewardRatio: 2.0,
    confidenceScore: 82
  },
  {
    symbol: 'INFY',
    volatility: 16.2,
    recommendedPositionSize: 7.0,
    maxRiskAmount: 9000,
    riskRewardRatio: 1.8,
    confidenceScore: 88
  },
  {
    symbol: 'TATAMOTORS',
    volatility: 22.5,
    recommendedPositionSize: 4.0,
    maxRiskAmount: 6000,
    riskRewardRatio: 1.2,
    confidenceScore: 81
  },
  {
    symbol: 'HDFCBANK',
    volatility: 14.5,
    recommendedPositionSize: 8.0,
    maxRiskAmount: 12000,
    riskRewardRatio: 2.2,
    confidenceScore: 84
  }
];

// API mock functions
export const fetchTopStocks = async (): Promise<Stock[]> => {
  // No artificial delay for real-time data
  return [...MOCK_STOCKS];
};

export const fetchTradeRecommendations = async (): Promise<TradeRecommendation[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [...MOCK_RECOMMENDATIONS];
};

export const fetchStockDetails = async (symbol: string): Promise<Stock | undefined> => {
  // No artificial delay for real-time data
  return MOCK_STOCKS.find(stock => stock.symbol === symbol);
};

export const fetchRecommendationDetails = async (id: string): Promise<TradeRecommendation | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return MOCK_RECOMMENDATIONS.find(rec => rec.id === id);
};

export const fetchPortfolio = async (): Promise<PortfolioPosition[]> => {
  // Update portfolio values based on current stock prices
  const updatedPortfolio = MOCK_PORTFOLIO.map(position => {
    const stock = MOCK_STOCKS.find(s => s.symbol === position.symbol);
    if (!stock) return position;

    const currentValue = position.quantity * stock.currentPrice;
    const profitLoss = currentValue - position.totalInvestment;
    const profitLossPercent = (profitLoss / position.totalInvestment) * 100;

    return {
      ...position,
      currentPrice: stock.currentPrice,
      currentValue,
      profitLoss,
      profitLossPercent
    };
  });

  return updatedPortfolio;
};

export const runBacktest = async (params: { days: number; strategy: string }): Promise<BacktestResult> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return {...MOCK_BACKTEST_RESULT};
};

export const fetchRiskAssessment = async (symbol: string): Promise<RiskAssessment | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_RISK_ASSESSMENTS.find(risk => risk.symbol === symbol);
};

export const fetchAllRiskAssessments = async (): Promise<RiskAssessment[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return [...MOCK_RISK_ASSESSMENTS];
};

export const fetchChartData = async (symbol: string, timeframe: string = '1D') => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Generate mock historical data for the past 30 days
  const now = new Date();
  const data = [];
  let basePrice = MOCK_STOCKS.find(s => s.symbol === symbol)?.currentPrice || 1000;
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Generate realistic-looking OHLC data
    const volatility = 0.02;
    const change = basePrice * volatility * (Math.random() - 0.5);
    const open = basePrice;
    const close = basePrice + change;
    const high = Math.max(open, close) + Math.abs(change) * Math.random();
    const low = Math.min(open, close) - Math.abs(change) * Math.random();
    const volume = Math.floor(Math.random() * 1000000) + 500000;
    
    data.push({
      time: date.toISOString().split('T')[0],
      open,
      high,
      low,
      close,
      volume
    });
    
    basePrice = close;
  }
  
  return data;
};