"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { searchStocks } from "@/lib/api";
import { SearchResult } from "@/types/stock";
import { useDebounce } from "@/hook/useDebounce";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query.trim(), 300);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigatingSymbol, setNavigatingSymbol] = useState<string | null>(null);

  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery.length >= 1) {
        setIsLoading(true);
        try {
          const searchResults = await searchStocks(debouncedQuery);
          setResults(searchResults);
          setShowResults(true);
        } catch (error) {
          console.error("Search failed:", error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
        setShowResults(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  const handleStockSelect = (symbol: string) => {
    setQuery("");
    setShowResults(false);
    setNavigatingSymbol(symbol);
    setIsNavigating(true);

    setTimeout(() => {
      router.push(`/stock/${symbol}`);
    }, 300);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search stocks..."
          className="w-full px-5 py-3 pl-12 pr-5 text-gray-800 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-md transition-all duration-200 hover:shadow-lg"
          onFocus={() => query.length >= 1 && setShowResults(true)}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-4">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {isLoading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      {isNavigating && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 flex flex-col items-center justify-center w-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-blue-700 text-sm font-semibold text-center">
              Loading <span className="font-bold">{navigatingSymbol}</span>{" "}
              details...
            </p>
          </div>
        </div>
      )}
      {showResults && (
        <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-80 overflow-y-auto backdrop-blur-sm bg-opacity-95">
          {results.length > 0 ? (
            results.map((stock, index) => (
              <button
                key={index}
                onClick={() => handleStockSelect(stock.symbol!)}
                className="w-full px-5 py-3 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors duration-150 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex justify-between items-center">
                  <div className="truncate">
                    <div className="font-semibold text-gray-900 truncate">
                      {stock.symbol}
                    </div>
                    <div className="text-sm text-gray-600 truncate">
                      {stock.company}
                    </div>
                  </div>
                  <div className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full whitespace-nowrap ml-2">
                    {stock.type}
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="px-5 py-4 text-gray-500 text-center">
              {debouncedQuery.length < 1
                ? "Search for stocks by symbol or company"
                : "No matching stocks found"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
