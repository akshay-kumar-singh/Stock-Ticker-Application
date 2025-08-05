import { Metadata } from "next";
import Link from "next/link";
import { getStockPrices, formatChartData, searchStocks } from "@/lib/api";
import StockCard from "@/components/StockCard";
import StockChart from "@/components/StockChart";

interface PageProps {
  params: Promise<{ symbol: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { symbol } = await params;

  try {
    const searchResults = await searchStocks(symbol, 1);
    const stockInfo = searchResults.find((s) => s.symbol === symbol);
    const companyName = stockInfo?.company || `${symbol} Stock`;

    const prices = await getStockPrices(symbol);
    const latestPrice = prices[0];
    const change = latestPrice ? latestPrice.change : 0;
    const changeText =
      change >= 0 ? `+${change.toFixed(2)}` : change.toFixed(2);

    return {
      title: `${symbol} - ${companyName} | Stock Ticker`,
      description: `View ${companyName} (${symbol}) live stock price, charts, and market data. Current price: ₹${latestPrice?.close.toFixed(
        2
      )}, Change: ${changeText} (${latestPrice?.percent.toFixed(2)}%)`,
      keywords: [
        symbol,
        companyName,
        "stock",
        "share price",
        "NSE",
        "BSE",
        "Indian stocks",
        "stock market",
        "investment",
        "trading",
      ].join(", "),
      openGraph: {
        title: `${symbol} - ${companyName}`,
        description: `Live stock price and charts for ${companyName}`,
        type: "website",
      },
      twitter: {
        card: "summary",
        title: `${symbol} - ${companyName}`,
        description: `Current price: ₹${latestPrice?.close.toFixed(
          2
        )}, Change: ${changeText}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: `${symbol} - Stock Information | Stock Ticker`,
      description: `View ${symbol} stock price, charts, and market data`,
      keywords: `${symbol}, stock, share price, Indian stocks`,
    };
  }
}

export default async function StockDetailPage({ params }: PageProps) {
  const { symbol } = await params;

  try {
    const [prices, searchResults] = await Promise.all([
      getStockPrices(symbol.toUpperCase(), 1, "INTRADAY", 100),
      searchStocks(symbol, 5),
    ]);

    if (!prices || prices.length === 0) {
      return <StockNotFound symbol={symbol} />;
    }

    const stockInfo = searchResults.find(
      (s) => s.symbol === symbol.toUpperCase()
    );
    const companyName = stockInfo?.company || `${symbol.toUpperCase()} Stock`;
    const latestPrice = prices[0];
    const chartData = formatChartData(prices);

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="bg-white shadow-lg border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium group"
            >
              <svg
                className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Search
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            <StockCard
              symbol={symbol.toUpperCase()}
              company={companyName}
              latestPrice={latestPrice}
            />

            <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100 transition-all hover:shadow-2xl">
              <StockChart data={chartData} symbol={symbol.toUpperCase()} />
            </div>

            <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100 transition-all hover:shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Market Statistics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-100 hover:shadow-md transition-shadow">
                  <p className="text-sm text-blue-600 mb-1 font-medium">
                    Day&apos;s Range
                  </p>
                  <p className="font-bold text-gray-900 text-xl">
                    ₹{latestPrice.low.toFixed(2)} - ₹
                    {latestPrice.high.toFixed(2)}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-100 hover:shadow-md transition-shadow">
                  <p className="text-sm text-green-600 mb-1 font-medium">
                    Total Volume
                  </p>
                  <p className="font-bold text-gray-900 text-xl">
                    {new Intl.NumberFormat("en-IN").format(latestPrice.volume)}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-100 hover:shadow-md transition-shadow">
                  <p className="text-sm text-purple-600 mb-1 font-medium">
                    Market Value
                  </p>
                  <p className="font-bold text-gray-900 text-xl">
                    ₹
                    {new Intl.NumberFormat("en-IN", {
                      notation: "compact",
                      maximumFractionDigits: 2,
                    }).format(latestPrice.value)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return <StockNotFound symbol={symbol} />;
  }
}

function StockNotFound({ symbol }: { symbol: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 transform transition-all hover:scale-[1.02]">
        <div className="text-6xl text-gray-400 mb-4">📈</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
          Stock Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          We couldn&apos;t find any data for stock symbol &quot;
          {symbol.toUpperCase()}&quot;. Please check the symbol and try again.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Search
        </Link>
      </div>
    </div>
  );
}
