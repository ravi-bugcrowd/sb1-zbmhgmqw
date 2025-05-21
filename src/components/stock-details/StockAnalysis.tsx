import React, { useState } from 'react';
import { Stock, TradeRecommendation, RiskAssessment } from '../../types';
import Card, { CardHeader, CardBody } from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { 
  BarChart, 
  TrendingUp, 
  TrendingDown, 
  Layers, 
  AlertTriangle, 
  Target,
  ArrowRight,
  Activity,
  DollarSign,
  Scale
} from 'lucide-react';

interface StockAnalysisProps {
  stock?: Stock;
  recommendations: TradeRecommendation[];
  riskAssessment?: RiskAssessment;
  loading: boolean;
}

const StockAnalysis: React.FC<StockAnalysisProps> = ({ 
  stock, 
  recommendations, 
  riskAssessment,
  loading 
}) => {
  const [activeTab, setActiveTab] = useState<'technical' | 'fundamental' | 'risk'>('technical');
  
  if (loading || !stock) {
    return (
      <Card className="h-full">
        <CardBody className="h-64 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-36 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </CardBody>
      </Card>
    );
  }
  
  const relatedRecommendations = recommendations.filter(rec => rec.symbol === stock.symbol);
  
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              {stock.symbol}
              <span className="ml-2 text-lg font-normal text-gray-500 dark:text-gray-400">
                {stock.name}
              </span>
            </h2>
            <div className="mt-1 flex items-center">
              <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                ₹{stock.currentPrice.toFixed(2)}
              </span>
              <div className={`ml-2 flex items-center text-sm ${
                stock.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {stock.change >= 0 ? (
                  <TrendingUp size={16} className="mr-1" />
                ) : (
                  <TrendingDown size={16} className="mr-1" />
                )}
                <span>
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Activity size={16} className="mr-1" />
              Chart
            </Button>
            <Button variant="outline" size="sm">
              <Layers size={16} className="mr-1" />
              History
            </Button>
            {relatedRecommendations.length > 0 && relatedRecommendations[0].type === 'BUY' && (
              <Button variant="success" size="sm">
                <TrendingUp size={16} className="mr-1" />
                Buy
              </Button>
            )}
            {relatedRecommendations.length > 0 && relatedRecommendations[0].type === 'SELL' && (
              <Button variant="danger" size="sm">
                <TrendingDown size={16} className="mr-1" />
                Sell
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'technical'
                ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('technical')}
          >
            Technical Analysis
          </button>
          <button
            className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'fundamental'
                ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('fundamental')}
          >
            Fundamental Analysis
          </button>
          <button
            className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'risk'
                ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('risk')}
          >
            Risk Assessment
          </button>
        </div>
      </CardHeader>
      <CardBody>
        {activeTab === 'technical' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Technical Indicators</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">RSI (14)</div>
                  <div className="flex items-center mt-1">
                    <span className={`text-base font-medium ${
                      Math.random() > 0.5 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {(Math.random() * (70 - 30) + 30).toFixed(2)}
                    </span>
                    <Badge 
                      variant={Math.random() > 0.5 ? 'success' : 'danger'} 
                      size="sm"
                      className="ml-2"
                    >
                      {Math.random() > 0.5 ? 'Bullish' : 'Bearish'}
                    </Badge>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">MACD</div>
                  <div className="flex items-center mt-1">
                    <span className={`text-base font-medium ${
                      Math.random() > 0.5 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {(Math.random() * (5 - -5) + -5).toFixed(2)}
                    </span>
                    <Badge 
                      variant={Math.random() > 0.5 ? 'success' : 'danger'} 
                      size="sm"
                      className="ml-2"
                    >
                      {Math.random() > 0.5 ? 'Bullish' : 'Bearish'}
                    </Badge>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Moving Avg (50,200)</div>
                  <div className="flex items-center mt-1">
                    <span className="text-base font-medium text-green-600 dark:text-green-400">
                      Above MA
                    </span>
                    <Badge 
                      variant="success" 
                      size="sm"
                      className="ml-2"
                    >
                      Bullish
                    </Badge>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Bollinger Bands</div>
                  <div className="flex items-center mt-1">
                    <span className="text-base font-medium text-gray-900 dark:text-white">
                      Middle Band
                    </span>
                    <Badge 
                      variant="secondary" 
                      size="sm"
                      className="ml-2"
                    >
                      Neutral
                    </Badge>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Volume</div>
                  <div className="flex items-center mt-1">
                    <span className={`text-base font-medium ${
                      stock.volume > 3000000 ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'
                    }`}>
                      {stock.volume.toLocaleString()}
                    </span>
                    <Badge 
                      variant={stock.volume > 3000000 ? 'success' : 'secondary'} 
                      size="sm"
                      className="ml-2"
                    >
                      {stock.volume > 3000000 ? 'High' : 'Average'}
                    </Badge>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Support/Resistance</div>
                  <div className="flex items-center mt-1">
                    <span className="text-base font-medium text-gray-900 dark:text-white">
                      Near Support
                    </span>
                    <Badge 
                      variant="primary" 
                      size="sm"
                      className="ml-2"
                    >
                      Watch
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Pattern Recognition</h3>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                <div className="flex items-start">
                  <BarChart size={20} className="text-blue-500 mr-2 mt-0.5" />
                  <div>
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">Bullish Flag Pattern</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      The price has formed a bullish flag pattern after a strong uptrend. 
                      This continuation pattern suggests a potential breakout to the upside.
                      The pattern is supported by increasing volume on up days and decreasing volume on down days.
                    </p>
                    <div className="flex items-center mt-2">
                      <Badge variant="success" size="sm">High Reliability</Badge>
                      <Badge variant="primary" size="sm" className="ml-2">85% Confidence</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'fundamental' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Financial Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Market Cap</div>
                  <div className="flex items-center mt-1">
                    <span className="text-base font-medium text-gray-900 dark:text-white">
                      ₹{(stock.marketCap / 1000000000).toFixed(2)} B
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">P/E Ratio</div>
                  <div className="flex items-center mt-1">
                    <span className="text-base font-medium text-gray-900 dark:text-white">
                      {(Math.random() * (30 - 10) + 10).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">EPS (TTM)</div>
                  <div className="flex items-center mt-1">
                    <span className="text-base font-medium text-gray-900 dark:text-white">
                      ₹{(stock.currentPrice / (Math.random() * (25 - 10) + 10)).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Dividend Yield</div>
                  <div className="flex items-center mt-1">
                    <span className="text-base font-medium text-gray-900 dark:text-white">
                      {(Math.random() * (5 - 0.5) + 0.5).toFixed(2)}%
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">ROE</div>
                  <div className="flex items-center mt-1">
                    <span className="text-base font-medium text-gray-900 dark:text-white">
                      {(Math.random() * (25 - 5) + 5).toFixed(2)}%
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Debt to Equity</div>
                  <div className="flex items-center mt-1">
                    <span className="text-base font-medium text-gray-900 dark:text-white">
                      {(Math.random() * (2 - 0.1) + 0.1).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Quarterly Results</h3>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                <div className="flex items-start">
                  <DollarSign size={20} className="text-green-500 mr-2 mt-0.5" />
                  <div>
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">Q2 2025 Results</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Revenue: ₹{(Math.random() * (50000 - 10000) + 10000).toFixed(0)} Cr (+{(Math.random() * (25 - 5) + 5).toFixed(1)}% YoY)<br />
                      Net Profit: ₹{(Math.random() * (10000 - 1000) + 1000).toFixed(0)} Cr (+{(Math.random() * (30 - 5) + 5).toFixed(1)}% YoY)<br />
                      EBITDA Margin: {(Math.random() * (40 - 15) + 15).toFixed(1)}% ({(Math.random() * (5 - -2) + -2).toFixed(1)}% YoY)
                    </p>
                    <div className="flex items-center mt-2">
                      <Badge variant="success" size="sm">Beat Estimates</Badge>
                      <Badge variant="primary" size="sm" className="ml-2">Strong Growth</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'risk' && riskAssessment && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Risk Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Volatility (30D)</div>
                  <div className="flex items-center mt-1">
                    <span className={`text-base font-medium ${
                      riskAssessment.volatility > 20 ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'
                    }`}>
                      {riskAssessment.volatility.toFixed(1)}%
                    </span>
                    <Badge 
                      variant={riskAssessment.volatility > 20 ? 'danger' : 'secondary'} 
                      size="sm"
                      className="ml-2"
                    >
                      {riskAssessment.volatility > 20 ? 'High' : 'Moderate'}
                    </Badge>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Risk/Reward Ratio</div>
                  <div className="flex items-center mt-1">
                    <span className={`text-base font-medium ${
                      riskAssessment.riskRewardRatio >= 2 ? 'text-green-600 dark:text-green-400' : 
                      riskAssessment.riskRewardRatio >= 1.5 ? 'text-blue-600 dark:text-blue-400' : 
                      'text-gray-900 dark:text-white'
                    }`}>
                      {riskAssessment.riskRewardRatio.toFixed(1)}
                    </span>
                    <Badge 
                      variant={
                        riskAssessment.riskRewardRatio >= 2 ? 'success' : 
                        riskAssessment.riskRewardRatio >= 1.5 ? 'primary' : 
                        'secondary'
                      } 
                      size="sm"
                      className="ml-2"
                    >
                      {riskAssessment.riskRewardRatio >= 2 ? 'Excellent' : 
                       riskAssessment.riskRewardRatio >= 1.5 ? 'Good' : 'Adequate'}
                    </Badge>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Confidence Score</div>
                  <div className="flex items-center mt-1">
                    <span className={`text-base font-medium ${
                      riskAssessment.confidenceScore >= 85 ? 'text-green-600 dark:text-green-400' : 
                      riskAssessment.confidenceScore >= 75 ? 'text-blue-600 dark:text-blue-400' : 
                      'text-yellow-600 dark:text-yellow-400'
                    }`}>
                      {riskAssessment.confidenceScore}/100
                    </span>
                    <Badge 
                      variant={
                        riskAssessment.confidenceScore >= 85 ? 'success' : 
                        riskAssessment.confidenceScore >= 75 ? 'primary' : 
                        'warning'
                      } 
                      size="sm"
                      className="ml-2"
                    >
                      {riskAssessment.confidenceScore >= 85 ? 'High' : 
                       riskAssessment.confidenceScore >= 75 ? 'Moderate' : 'Low'}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Position Sizing</h3>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                <div className="flex items-start">
                  <Scale size={20} className="text-blue-500 mr-2 mt-0.5" />
                  <div>
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">Recommended Position</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      <span className="font-medium">Position Size:</span> {riskAssessment.recommendedPositionSize}% of Portfolio<br />
                      <span className="font-medium">Max Risk Amount:</span> ₹{riskAssessment.maxRiskAmount.toLocaleString()}<br />
                      <span className="font-medium">Risk Management:</span> Set stop loss at ₹{(stock.currentPrice * 0.95).toFixed(2)} to limit downside
                    </p>
                    <div className="flex items-center mt-2">
                      <Badge 
                        variant={
                          riskAssessment.recommendedPositionSize > 5 ? 'success' : 
                          riskAssessment.recommendedPositionSize > 3 ? 'primary' : 
                          'warning'
                        } 
                        size="sm"
                      >
                        {riskAssessment.recommendedPositionSize > 5 ? 'Confident Position' : 
                         riskAssessment.recommendedPositionSize > 3 ? 'Moderate Position' : 'Conservative Position'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default StockAnalysis;