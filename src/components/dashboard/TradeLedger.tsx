import React, { useState } from 'react';
import { TradeRecommendation } from '../../types';
import Badge from '../ui/Badge';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface TradeLedgerProps {
  recommendations: TradeRecommendation[];
  loading: boolean;
}

const TradeLedger: React.FC<TradeLedgerProps> = ({ recommendations, loading }) => {
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'COMPLETED' | 'STOPPED'>('ALL');
  
  const filteredRecommendations = recommendations.filter(rec => {
    if (filter === 'ALL') return true;
    return rec.status === filter;
  });
  
  const statusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'STOPPED':
        return <XCircle size={16} className="text-red-500" />;
      case 'ACTIVE':
        return <Clock size={16} className="text-blue-500" />;
      default:
        return null;
    }
  };
  
  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Trade Ledger</h2>
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                filter === 'ALL'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setFilter('ALL')}
            >
              All
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                filter === 'ACTIVE'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setFilter('ACTIVE')}
            >
              Active
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                filter === 'COMPLETED'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setFilter('COMPLETED')}
            >
              Completed
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                filter === 'STOPPED'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setFilter('STOPPED')}
            >
              Stopped
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Symbol
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Entry Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Target
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Stop Loss
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Result
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredRecommendations.map((rec) => (
              <tr key={rec.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {statusIcon(rec.status)}
                    <span className="ml-1.5 text-sm text-gray-700 dark:text-gray-300">
                      {rec.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{rec.symbol}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{rec.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge
                    variant={rec.type === 'BUY' ? 'success' : 'danger'}
                    size="sm"
                  >
                    {rec.type}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  ₹{rec.entryPrice.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">
                  ₹{rec.targetPrice.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 dark:text-red-400">
                  ₹{rec.stopLoss.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {rec.status === 'COMPLETED' && rec.actualResult && rec.actualProfit ? (
                    <div className={`text-sm ${rec.actualProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      ₹{rec.actualResult.toFixed(2)}
                      <span className="ml-1">
                        ({rec.actualProfit >= 0 ? '+' : ''}{rec.actualProfit.toFixed(2)}%)
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500 dark:text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {new Date(rec.timestamp).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradeLedger;