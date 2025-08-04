'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getStockPrices, searchStocks } from '@/lib/api';
import { StockPrice } from '@/types/stock';
import { formatCurrency } from '@/lib/api';

const featuredSymbols = ['RELIANCE', 'TCS', 'INFY', 'HDFCBANK', 'UPL', 'HINDALCO'];

export default function StockSlider() {
  const [stocks, setStocks] = useState<{
    symbol: string;
    company: string;
    data: StockPrice | null;
  }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigatingSymbol, setNavigatingSymbol] = useState<string | null>(null);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const startSlider = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === stocks.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
  };

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const stockData = await Promise.all(
          featuredSymbols.map(async (symbol) => {
            const [prices, searchResults] = await Promise.all([
              getStockPrices(symbol, 1, 'INTRADAY', 1),
              searchStocks(symbol, 1)
            ]);

            const company = searchResults.find(s => s.symbol === symbol)?.company || symbol;
            const latest = prices[0] || null;

            return {
              symbol,
              company,
              data: latest
            };
          })
        );

        setStocks(stockData);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStockData();
  }, []);

  useEffect(() => {
    if (stocks.length > 0 && !isNavigating) {
      startSlider();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [stocks.length, isNavigating]);

  const handleStockClick = async (symbol: string, e: React.MouseEvent) => {
    e.preventDefault();
    
    setIsNavigating(true);
    setNavigatingSymbol(symbol);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setTimeout(() => {
      router.push(`/stock/${symbol}`);
    }, 300);
  };

  const visibleStocks = [
    stocks[currentIndex],
    stocks[(currentIndex + 1) % stocks.length],
    stocks[(currentIndex + 2) % stocks.length]
  ].filter(Boolean);

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 shadow-sm animate-pulse">
        <div className="flex justify-center items-center h-48">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-blue-700 font-medium">Loading market data...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-xl p-6 relative overflow-hidden">
      {isNavigating && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
            <p className="text-blue-700 font-medium">
              Loading {navigatingSymbol} details...
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">📈 Market Movers</h2>
          <p className="text-sm text-gray-600 mt-1">Live stock prices and trends</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium flex items-center">
            <span className="relative flex h-2 w-2 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
            </span>
            LIVE
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex transition-transform duration-700 ease-in-out">
          {visibleStocks.map((stock) => (
            <div
              key={stock.symbol}
              className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-2"
            >
              <div 
                onClick={(e) => handleStockClick(stock.symbol, e)}
                className={`bg-white rounded-xl p-5 border border-gray-200 h-full cursor-pointer transition-all duration-300 ${
                  isNavigating && navigatingSymbol === stock.symbol
                    ? 'scale-105 shadow-xl ring-2 ring-blue-500'
                    : 'hover:shadow-xl hover:-translate-y-1'
                } ${isNavigating && navigatingSymbol !== stock.symbol ? 'opacity-60' : ''}`}
              >
                {stock.data ? (
                  <>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{stock.symbol}</h3>
                        <p className="text-xs text-gray-500 truncate max-w-[150px]">
                          {stock.company}
                        </p>
                      </div>
                      <div
                        className={`flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                          stock.data.change >= 0
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        <span className="mr-1">
                          {stock.data.change >= 0 ? '▲' : '▼'}
                        </span>
                        {stock.data.percent.toFixed(2)}%
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {formatCurrency(stock.data.close)}
                      </div>
                      <div className={`text-sm font-medium ${
                        stock.data.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stock.data.change >= 0 ? '+' : ''}{formatCurrency(stock.data.change)}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="text-center bg-gray-50 rounded-lg py-2">
                        <p className="text-gray-500 font-medium">High</p>
                        <p className="text-gray-900 font-semibold">{formatCurrency(stock.data.high)}</p>
                      </div>
                      <div className="text-center bg-gray-50 rounded-lg py-2">
                        <p className="text-gray-500 font-medium">Low</p>
                        <p className="text-gray-900 font-semibold">{formatCurrency(stock.data.low)}</p>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 font-medium text-xs">Volume</span>
                        <span className="text-gray-900 font-semibold text-xs">
                          {new Intl.NumberFormat('en-IN', {
                            notation: 'compact',
                            maximumFractionDigits: 1
                          }).format(stock.data.volume)}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                    <div className="text-4xl mb-2">📊</div>
                    <div className="text-sm font-medium">{stock.symbol}</div>
                    <div className="text-xs">Data unavailable</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`flex justify-center gap-3 mt-8 transition-opacity duration-300 ${
        isNavigating ? 'opacity-50' : 'opacity-100'
      }`}>
        {stocks.map((stock, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            disabled={isNavigating}
            className={`transition-all duration-300 ${
              index === currentIndex 
                ? 'w-8 h-2 rounded-full bg-blue-600 shadow-md' 
                : 'w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-400'
            } ${isNavigating ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            aria-label={`Go to ${stock.symbol}`}
            title={stock.symbol}
          />
        ))}
      </div>

      <div className="text-center mt-4">
        <p className="text-xs text-gray-500">
          {isNavigating 
            ? `Loading ${navigatingSymbol} detailed analysis...`
            : 'Click on any stock card to view detailed analysis and charts'
          }
        </p>
      </div>
    </div>
  );
}