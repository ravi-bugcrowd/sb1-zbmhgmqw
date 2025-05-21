import React from 'react';
import { PortfolioPosition } from '../../types';
import Card, { CardHeader, CardBody } from '../ui/Card';
import { TrendingUp, TrendingDown, DollarSign, Briefcase, PieChart } from 'lucide-react';

interface PortfolioSummaryProps {
  portfolio: PortfolioPosition[];
  loading: boolean;
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ portfolio, loading }) => {
  if (loading) {
    return (
      <Card>
        <CardBody className="h-40 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-36 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </CardBody>
      </Card>
    );
  }

  // Calculate portfolio metrics
  const totalInvestment = portfolio.reduce((sum, position) => sum + position.totalInvestment, 0);
  const currentValue = portfolio.reduce((sum, position) => sum + position.currentValue, 0);
  const totalProfitLoss = currentValue - totalInvestment;
  const profitLossPercent = totalInvestment > 0 ? (totalProfitLoss / totalInvestment) * 100 : 0;
  
  // Count up/down positions
  const upPositions = portfolio.filter(p => p.profitLoss > 0).length;
  const downPositions = portfolio.filter(p => p.profitLoss < 0).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <Briefcase className="mr-2 text-blue-500" size={20} />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Portfolio Summary</h2>
        </div>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Investment</p>
            <div className="flex items-center">
              <DollarSign size={18} className="text-gray-600 dark:text-gray-300" />
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                ₹{totalInvestment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Current Value</p>
            <div className="flex items-center">
              <DollarSign size={18} className="text-gray-600 dark:text-gray-300" />
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                ₹{currentValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Profit/Loss</p>
          <div className="flex items-center">
            {totalProfitLoss >= 0 ? (
              <TrendingUp size={18} className="text-green-500 mr-1" />
            ) : (
              <TrendingDown size={18} className="text-red-500 mr-1" />
            )}
            <p className={`text-xl font-semibold ${
              totalProfitLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {totalProfitLoss >= 0 ? '+' : ''}
              ₹{totalProfitLoss.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              <span className="text-sm font-normal ml-1">
                ({profitLossPercent >= 0 ? '+' : ''}{profitLossPercent.toFixed(2)}%)
              </span>
            </p>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-1.5"></div>
            <p className="text-sm text-gray-600 dark:text-gray-300">{upPositions} Gaining</p>
          </div>
          <div className="flex items-center">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-1.5"></div>
            <p className="text-sm text-gray-600 dark:text-gray-300">{downPositions} Losing</p>
          </div>
          <div className="flex items-center">
            <PieChart size={16} className="text-blue-500 mr-1.5" />
            <p className="text-sm text-gray-600 dark:text-gray-300">{portfolio.length} Total</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default PortfolioSummary;