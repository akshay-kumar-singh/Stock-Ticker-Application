export interface SearchResult {
  type: string;
  symbol: string | null;
  company: string;
}

export interface StockPrice {
  open: number;
  high: number;
  close: number;
  low: number;
  date: string;
  volume: number;
  value: number;
  change: number;
  percent: number;
  prev_close: number;
}

export interface ChartData {
  time: string;
  price: number;
  volume: number;
}