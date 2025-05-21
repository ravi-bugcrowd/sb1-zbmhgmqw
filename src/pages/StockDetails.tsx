import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Stock, RiskAssessment } from '../types';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import Button from '../components/ui/Button';
import StockAnalysis from '../components/stock-details/StockAnalysis';
import BacktestResults from '../components/stock-details/BacktestResults';
import StockChart from '../components/stock-details/StockChart';
import { fetchStockDetails, fetchRiskAssessment, fetchChartData } from '../utils/api';

const StockDetails: React.FC = () => {
  const { 
    selectedStock, 
    setActiveView, 
    recommendations 
  } = useAppContext();
  
  const [stock, setStock] = useState<Stock | undefined>(undefined);
  const [riskAssessment, setRiskAssessment] = useState<RiskAssessment | undefined>(undefined);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      if (selectedStock) {
        setLoading(true);
        try {
          const [stockData, riskData, historicalData] = await Promise.all([
            fetchStockDetails(selectedStock),
            fetchRiskAssessment(selectedStock),
            fetchChartData(selectedStock)
          ]);
          
          setStock(stockData);
          setRiskAssessment(riskData);
          setChartData(historicalData);
        } catch (error) {
          console.error('Error fetching stock details:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchData();
  }, [selectedStock]);
  
  const handleBackToDashboard = () => {
    setActiveView('dashboard');
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleBackToDashboard}
            className="mr-4"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Stock Analysis
          </h1>
        </div>
        <Button 
          variant="outline" 
          size="sm"
        >
          <RefreshCw size={16} className="mr-1" />
          Refresh Data
        </Button>
      </div>
      
      {stock && !loading && (
        <div className="mb-8">
          <StockChart stock={stock} data={chartData} />
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-8 mb-8">
        <StockAnalysis 
          stock={stock}
          recommendations={recommendations}
          riskAssessment={riskAssessment}
          loading={loading}
        />
      </div>
      
      {selectedStock && (
        <div className="grid grid-cols-1 gap-8">
          <BacktestResults symbol={selectedStock} />
        </div>
      )}
    </div>
  );
};

export default StockDetails;