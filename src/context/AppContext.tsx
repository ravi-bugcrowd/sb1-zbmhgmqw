import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Stock, 
  TradeRecommendation, 
  PortfolioPosition, 
  BacktestResult, 
  RiskAssessment 
} from '../types';
import {
  fetchTopStocks,
  fetchTradeRecommendations,
  fetchPortfolio,
  fetchAllRiskAssessments
} from '../utils/api';

interface AppContextType {
  stocks: Stock[];
  recommendations: TradeRecommendation[];
  portfolio: PortfolioPosition[];
  riskAssessments: RiskAssessment[];
  loading: {
    stocks: boolean;
    recommendations: boolean;
    portfolio: boolean;
    riskAssessments: boolean;
  };
  activeView: 'dashboard' | 'details';
  selectedStock: string | null;
  setActiveView: (view: 'dashboard' | 'details') => void;
  setSelectedStock: (symbol: string | null) => void;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [recommendations, setRecommendations] = useState<TradeRecommendation[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioPosition[]>([]);
  const [riskAssessments, setRiskAssessments] = useState<RiskAssessment[]>([]);
  const [activeView, setActiveView] = useState<'dashboard' | 'details'>('dashboard');
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [loading, setLoading] = useState({
    stocks: true,
    recommendations: true,
    portfolio: true,
    riskAssessments: true
  });

  const fetchData = async () => {
    try {
      // Fetch stocks without loading state for real-time updates
      const stocksData = await fetchTopStocks();
      setStocks(stocksData);
      
      // Update portfolio with new stock prices
      const portfolioData = await fetchPortfolio();
      setPortfolio(portfolioData);
      
      // Less frequent updates for recommendations and risk assessments
      if (loading.recommendations || loading.riskAssessments) {
        setLoading(prev => ({ ...prev, recommendations: true, riskAssessments: true }));
        const [recommendationsData, riskData] = await Promise.all([
          fetchTradeRecommendations(),
          fetchAllRiskAssessments()
        ]);
        setRecommendations(recommendationsData);
        setRiskAssessments(riskData);
        setLoading(prev => ({ ...prev, recommendations: false, riskAssessments: false }));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading({
        stocks: false,
        recommendations: false,
        portfolio: false,
        riskAssessments: false
      });
    }
  };

  // Initial data load
  useEffect(() => {
    fetchData();
    
    // Real-time updates for stocks and portfolio
    const fastUpdateInterval = setInterval(() => {
      fetchTopStocks().then(setStocks);
      fetchPortfolio().then(setPortfolio);
    }, 3000);
    
    // Less frequent updates for recommendations and risk assessments
    const slowUpdateInterval = setInterval(() => {
      fetchTradeRecommendations().then(setRecommendations);
      fetchAllRiskAssessments().then(setRiskAssessments);
    }, 30000);
    
    return () => {
      clearInterval(fastUpdateInterval);
      clearInterval(slowUpdateInterval);
    };
  }, []);

  const refreshData = async () => {
    await fetchData();
  };

  const value = {
    stocks,
    recommendations,
    portfolio,
    riskAssessments,
    loading,
    activeView,
    selectedStock,
    setActiveView,
    setSelectedStock,
    refreshData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};