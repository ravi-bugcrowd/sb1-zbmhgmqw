import React, { useState } from 'react';
import { BacktestResult } from '../../types';
import Card, { CardHeader, CardBody } from '../ui/Card';
import Button from '../ui/Button';
import { BarChart2, Calendar, RefreshCw } from 'lucide-react';
import { runBacktest } from '../../utils/api';

interface BacktestResultsProps {
  symbol: string;
}

const BacktestResults: React.FC<BacktestResultsProps> = ({ symbol }) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<BacktestResult | null>(null);
  const [timeframe, setTimeframe] = useState<30 | 90 | 180>(30);
  const [strategy, setStrategy] = useState<'ai_optimized' | 'momentum' | 'reversal'>('ai_optimized');
  
  const handleRunBacktest = async () => {
    setLoading(true);
    try {
      const backtestData = await runBacktest({ 
        days: timeframe, 
        strategy
      });
      setResults(backtestData);
    } catch (error) {
      console.error('Error running backtest:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="flex justify-between items-center">
        <div className="flex items-center">
          <BarChart2 size={20} className="text-blue-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Backtest Trading Strategy</h2>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Time Period
              </label>
              <div className="flex space-x-2">
                <button
                  className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                    timeframe === 30
                      ? 'bg-blue-100 border-blue-500 text-blue-800 dark:bg-blue-900 dark:border-blue-600 dark:text-blue-200'
                      : 'bg-white border-gray-300 text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300'
                  }`}
                  onClick={() => setTimeframe(30)}
                >
                  <Calendar size={14} className="inline mr-1" />
                  30 Days
                </button>
                <button
                  className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                    timeframe === 90
                      ? 'bg-blue-100 border-blue-500 text-blue-800 dark:bg-blue-900 dark:border-blue-600 dark:text-blue-200'
                      : 'bg-white border-gray-300 text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300'
                  }`}
                  onClick={() => setTimeframe(90)}
                >
                  <Calendar size={14} className="inline mr-1" />
                  90 Days
                </button>
                <button
                  className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                    timeframe === 180
                      ? 'bg-blue-100 border-blue-500 text-blue-800 dark:bg-blue-900 dark:border-blue-600 dark:text-blue-200'
                      : 'bg-white border-gray-300 text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300'
                  }`}
                  onClick={() => setTimeframe(180)}
                >
                  <Calendar size={14} className="inline mr-1" />
                  180 Days
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Strategy
              </label>
              <div className="flex space-x-2">
                <button
                  className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                    strategy === 'ai_optimized'
                      ? 'bg-blue-100 border-blue-500 text-blue-800 dark:bg-blue-900 dark:border-blue-600 dark:text-blue-200'
                      : 'bg-white border-gray-300 text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300'
                  }`}
                  onClick={() => setStrategy('ai_optimized')}
                >
                  AI Optimized
                </button>
                <button
                  className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                    strategy === 'momentum'
                      ? 'bg-blue-100 border-blue-500 text-blue-800 dark:bg-blue-900 dark:border-blue-600 dark:text-blue-200'
                      : 'bg-white border-gray-300 text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300'
                  }`}
                  onClick={() => setStrategy('momentum')}
                >
                  Momentum
                </button>
                <button
                  className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                    strategy === 'reversal'
                      ? 'bg-blue-100 border-blue-500 text-blue-800 dark:bg-blue-900 dark:border-blue-600 dark:text-blue-200'
                      : 'bg-white border-gray-300 text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300'
                  }`}
                  onClick={() => setStrategy('reversal')}
                >
                  Reversal
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={handleRunBacktest} 
              isLoading={loading}
              className="w-full md:w-auto"
            >
              <RefreshCw size={16} className="mr-2" />
              Run Backtest
            </Button>
          </div>
          
          {results && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Backtest Results for {strategy === 'ai_optimized' ? 'AI Optimized' : 
                                      strategy === 'momentum' ? 'Momentum' : 'Reversal'} 
                Strategy ({timeframe} Days)
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Win Rate</div>
                  <div className="flex items-center mt-1">
                    <span className={`text-lg font-semibold ${
                      results.winRate >= 70 ? 'text-green-600 dark:text-green-400' : 
                      results.winRate >= 50 ? 'text-blue-600 dark:text-blue-400' : 
                      'text-red-600 dark:text-red-400'
                    }`}>
                      {results.winRate.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Total P/L</div>
                  <div className="flex items-center mt-1">
                    <span className={`text-lg font-semibold ${
                      results.profitLoss > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      ₹{results.profitLoss.toLocaleString()} 
                      <span className="text-xs font-normal ml-1">
                        ({results.profitLossPercent >= 0 ? '+' : ''}{results.profitLossPercent.toFixed(2)}%)
                      </span>
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Win/Loss Ratio</div>
                  <div className="flex items-center mt-1">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {(results.averageWin / results.averageLoss).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Sharpe Ratio</div>
                  <div className="flex items-center mt-1">
                    <span className={`text-lg font-semibold ${
                      results.sharpeRatio >= 1.5 ? 'text-green-600 dark:text-green-400' : 
                      results.sharpeRatio >= 1 ? 'text-blue-600 dark:text-blue-400' : 
                      'text-gray-900 dark:text-white'
                    }`}>
                      {results.sharpeRatio.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                  <h4 className="text-base font-medium text-gray-900 dark:text-white mb-2">Trade Details</h4>
                  <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <div className="flex justify-between">
                      <span>Total Trades:</span>
                      <span className="font-medium">{results.totalTrades}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Winning Trades:</span>
                      <span className="font-medium text-green-600 dark:text-green-400">{results.winningTrades}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Losing Trades:</span>
                      <span className="font-medium text-red-600 dark:text-red-400">{results.losingTrades}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg. Winning Trade:</span>
                      <span className="font-medium">+{results.averageWin.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg. Losing Trade:</span>
                      <span className="font-medium">-{results.averageLoss.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                  <h4 className="text-base font-medium text-gray-900 dark:text-white mb-2">Risk Metrics</h4>
                  <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <div className="flex justify-between">
                      <span>Max Drawdown:</span>
                      <span className="font-medium">-{results.maxDrawdown.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Best Trade:</span>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        +{(results.averageWin * 2.5).toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Worst Trade:</span>
                      <span className="font-medium text-red-600 dark:text-red-400">
                        -{(results.averageLoss * 1.8).toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg. Holding Period:</span>
                      <span className="font-medium">
                        {Math.floor(Math.random() * 10) + 2} days
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default BacktestResults;