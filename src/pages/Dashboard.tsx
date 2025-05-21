import React from 'react';
import { useAppContext } from '../context/AppContext';
import StockTable from '../components/dashboard/StockTable';
import RecommendationCard from '../components/dashboard/RecommendationCard';
import PortfolioSummary from '../components/dashboard/PortfolioSummary';
import TradeLedger from '../components/dashboard/TradeLedger';
import { RefreshCw } from 'lucide-react';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';

const Dashboard: React.FC = () => {
  const { 
    stocks, 
    recommendations, 
    portfolio, 
    loading,
    setActiveView,
    setSelectedStock,
    refreshData
  } = useAppContext();
  
  const handleRefresh = async () => {
    await refreshData();
  };
  
  const handleViewStockDetails = (symbol: string) => {
    setSelectedStock(symbol);
    setActiveView('details');
  };
  
  const handleViewRecommendationDetails = (id: string) => {
    const recommendation = recommendations.find(rec => rec.id === id);
    if (recommendation) {
      setSelectedStock(recommendation.symbol);
      setActiveView('details');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          AI Stock Advisor
        </h1>
        <Button 
          onClick={handleRefresh} 
          variant="outline" 
          size="sm"
          isLoading={Object.values(loading).some(Boolean)}
        >
          <RefreshCw size={16} className="mr-1" />
          Refresh Data
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Latest Recommendations</h2>
          {loading.recommendations ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="h-64 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {recommendations.slice(0, 4).map((recommendation) => (
                <RecommendationCard
                  key={recommendation.id}
                  recommendation={recommendation}
                  onViewDetails={handleViewRecommendationDetails}
                />
              ))}
            </div>
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Your Portfolio</h2>
          <PortfolioSummary 
            portfolio={portfolio} 
            loading={loading.portfolio} 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 order-2 lg:order-1">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Trade Ledger</h2>
          <TradeLedger 
            recommendations={recommendations} 
            loading={loading.recommendations} 
          />
        </div>
        <div className="order-1 lg:order-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Market Overview</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="mb-4">
              <h3 className="text-base font-medium mb-2 text-gray-900 dark:text-white">Market Sentiment</h3>
              <div className="flex items-center space-x-4">
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Bullish (65%)</span>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-base font-medium mb-2 text-gray-900 dark:text-white">Sector Heatmap</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-xs p-2 rounded bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">Technology +2.3%</div>
                <div className="text-xs p-2 rounded bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">Finance +1.1%</div>
                <div className="text-xs p-2 rounded bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">Energy -0.8%</div>
                <div className="text-xs p-2 rounded bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">Healthcare +0.5%</div>
              </div>
            </div>
            <div>
              <h3 className="text-base font-medium mb-2 text-gray-900 dark:text-white">Market Movers</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>INFY</span>
                  <span className="text-green-600 dark:text-green-400">+3.2%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>TATAMOTORS</span>
                  <span className="text-green-600 dark:text-green-400">+2.8%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>RELIANCE</span>
                  <span className="text-red-600 dark:text-red-400">-1.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Top NSE Stocks</h2>
        <StockTable 
          stocks={stocks} 
          onSelectStock={handleViewStockDetails} 
          loading={loading.stocks}
        />
      </div>
    </div>
  );
};

export default Dashboard;