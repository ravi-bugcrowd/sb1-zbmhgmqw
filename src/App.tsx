import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import StockDetails from './pages/StockDetails';
import { Monitor, Moon, Sun, GitPullRequest } from 'lucide-react';
import { useState, useEffect } from 'react';

function AppContent() {
  const { activeView } = useAppContext();
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <GitPullRequest size={24} className="text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-xl font-bold">TradeGPT</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon size={20} className="text-gray-700 dark:text-gray-300" />
                ) : (
                  <Sun size={20} className="text-gray-700 dark:text-gray-300" />
                )}
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Monitor size={20} className="text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="pb-12">
        {activeView === 'dashboard' ? <Dashboard /> : <StockDetails />}
      </main>
      
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2025 TradeGPT | AI-Powered Trading Recommendations
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                Terms
              </a>
              <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                Privacy
              </a>
              <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                Help
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;