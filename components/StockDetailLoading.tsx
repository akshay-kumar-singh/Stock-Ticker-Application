"use client";

import { useState, useEffect } from "react";

const loadingMessages = [
  "Fetching real-time market data...",
  "Analyzing price trends...",
  "Preparing visualizations...",
  "Finalizing insights...",
  "Almost there...",
];

export default function Loading() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.random() * 10, 95));
    }, 300);

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center animate-pulse">
            <div className="w-6 h-6 bg-gray-200 rounded-full mr-3"></div>
            <div className="w-32 h-4 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <svg
                className="w-10 h-10 text-white animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-ping opacity-20"></div>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Loading Market Data
          </h2>
          <p className="text-lg text-gray-600 mb-8 h-8 transition-opacity duration-500">
            {loadingMessages[messageIndex]}
          </p>

          <div className="max-w-lg mx-auto">
            <div className="bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-3 font-medium">
              {Math.round(progress)}% loaded
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/30 to-transparent -skew-x-12 animate-shimmer"></div>

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
                <div>
                  <div className="w-24 h-8 bg-gray-200 rounded-full mb-3 animate-pulse"></div>
                  <div className="w-56 h-4 bg-gray-100 rounded-full animate-pulse"></div>
                </div>
                <div className="text-right">
                  <div className="w-36 h-10 bg-gray-200 rounded-full mb-3 animate-pulse"></div>
                  <div className="flex items-center justify-end space-x-3">
                    <div className="w-24 h-5 bg-blue-100 rounded-full animate-pulse"></div>
                    <div className="w-6 h-6 bg-blue-100 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 py-6 border-t border-gray-200">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="text-center">
                    <div
                      className="w-16 h-4 bg-gray-100 rounded-full mx-auto mb-3 animate-pulse"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    ></div>
                    <div
                      className="w-20 h-6 bg-gray-200 rounded-full mx-auto animate-pulse"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    ></div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-200 space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div
                      className="w-28 h-4 bg-gray-100 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    ></div>
                    <div
                      className="w-24 h-4 bg-gray-200 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-50/20 to-transparent -skew-x-12 animate-shimmer"></div>

            <div className="relative z-10">
              <div className="mb-6">
                <div className="w-56 h-6 bg-gray-200 rounded-full mb-3 animate-pulse"></div>
                <div className="w-72 h-4 bg-gray-100 rounded-full animate-pulse"></div>
              </div>

              <div className="h-80 lg:h-96 w-full bg-gray-50 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-12 gap-px">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-gray-100/50 relative overflow-hidden"
                    >
                      <div
                        className="absolute bottom-0 w-full bg-gradient-to-t from-blue-400 to-blue-300 animate-pulse"
                        style={{
                          height: `${Math.random() * 70 + 15}%`,
                          animationDelay: `${i * 0.05}s`,
                        }}
                      ></div>
                    </div>
                  ))}
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-5 shadow-sm z-10">
                  <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-spin">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    Rendering interactive chart
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-full shadow-xl flex items-center space-x-3">
          <div className="relative flex-shrink-0">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div>
            <div className="text-sm font-medium">
              Loading {progress < 50 ? "market data" : "analytics"}
            </div>
            <div className="text-xs opacity-90">{Math.round(progress)}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
