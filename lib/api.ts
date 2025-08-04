import { SearchResult, StockPrice, ChartData } from "@/types/stock";

const API_BASE_URL = "https://portal.tradebrains.in";

export async function searchStocks(
  keyword: string,
  length: number = 10
): Promise<SearchResult[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/assignment/search?keyword=${encodeURIComponent(
        keyword
      )}&length=${length}`
    );

    if (!response.ok) {
      throw new Error("Failed to search stocks");
    }

    const data: SearchResult[] = await response.json();
    return data.filter((item) => item.symbol !== null);
  } catch (error) {
    console.error("Search API error:", error);
    throw error;
  }
}

export async function getStockPrices(
  symbol: string,
  days: number = 1,
  type: string = "INTRADAY",
  limit: number = 100
): Promise<StockPrice[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/assignment/stock/${symbol}/prices?days=${days}&type=${type}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch stock prices");
    }

    const data: StockPrice[] = await response.json();
    return data;
  } catch (error) {
    console.error("Stock prices API error:", error);
    throw error;
  }
}

export function formatChartData(prices: StockPrice[]): ChartData[] {
  return prices.reverse().map((price) => ({
    time: new Date(price.date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    price: price.close,
    volume: price.volume,
  }));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-IN").format(value);
}
