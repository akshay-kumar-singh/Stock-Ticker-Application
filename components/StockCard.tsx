"use client";

import { StockPrice } from "@/types/stock";
import { formatCurrency, formatNumber } from "@/lib/api";

interface StockCardProps {
  symbol: string;
  company: string;
  latestPrice: StockPrice;
}

export default function StockCard({
  symbol,
  company,
  latestPrice,
}: StockCardProps) {
  const isPositive = latestPrice.change >= 0;
  const changeColor = isPositive ? "text-green-500" : "text-red-500";
  const changeBg = isPositive ? "bg-green-50" : "bg-red-50";

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-5">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-gray-900 truncate">
            {symbol}
          </h1>
          <p className="text-gray-500 text-sm mt-1 truncate">{company}</p>
        </div>
        <div className="w-full sm:w-auto text-right">
          <div className="text-3xl font-bold text-gray-900">
            {formatCurrency(latestPrice.close)}
          </div>
          <div
            className={`inline-flex items-center justify-end mt-2 px-3 py-1 rounded-full ${changeColor} ${changeBg}`}
          >
            <span className="text-sm font-medium">
              {isPositive ? "+" : ""}
              {formatCurrency(latestPrice.change)}
            </span>
            <span className="text-sm font-medium mx-1">
              ({isPositive ? "+" : ""}
              {latestPrice.percent.toFixed(2)}%)
            </span>
            <svg
              className={`w-4 h-4 ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 4.414 6.707 7.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-t border-gray-100">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Open
          </p>
          <p className="font-semibold text-gray-900 mt-1">
            {formatCurrency(latestPrice.open)}
          </p>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <p className="text-xs font-medium text-green-500 uppercase tracking-wider">
            High
          </p>
          <p className="font-semibold text-green-600 mt-1">
            {formatCurrency(latestPrice.high)}
          </p>
        </div>
        <div className="text-center p-3 bg-red-50 rounded-lg">
          <p className="text-xs font-medium text-red-500 uppercase tracking-wider">
            Low
          </p>
          <p className="font-semibold text-red-600 mt-1">
            {formatCurrency(latestPrice.low)}
          </p>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <p className="text-xs font-medium text-blue-500 uppercase tracking-wider">
            Volume
          </p>
          <p className="font-semibold text-blue-600 mt-1">
            {formatNumber(latestPrice.volume)}
          </p>
        </div>
      </div>

      <div className="mt-5 pt-5 border-t border-gray-100 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">
            Previous Close
          </span>
          <span className="text-sm font-medium text-gray-900">
            {formatCurrency(latestPrice.prev_close)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">
            Market Value
          </span>
          <span className="text-sm font-medium text-gray-900">
            {formatCurrency(latestPrice.value)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">
            Last Updated
          </span>
          <span className="text-sm font-medium text-gray-900">
            {new Date(latestPrice.date).toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </div>
  );
}
