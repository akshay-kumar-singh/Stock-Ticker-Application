"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartData } from "@/types/stock";
import { formatCurrency } from "@/lib/api";

interface StockChartProps {
  data: ChartData[];
  symbol: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    [key: string]: unknown;
  }>;
  label?: string;
}

export default function StockChart({ data, symbol }: StockChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
        <p className="text-gray-400 font-medium">No chart data available</p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-xl backdrop-blur-sm bg-opacity-90">
          <p className="text-sm font-semibold text-gray-700">{label}</p>
          <p className="text-lg font-bold text-blue-600 mt-1">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  const prices = data.map((d) => d.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const padding = (maxPrice - minPrice) * 0.1;

  return (
    <div className="w-full bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          {symbol} Price Chart
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Last {data.length} data points • Updated in real-time
        </p>
      </div>

      <div className="h-80 lg:h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 50,
            }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#f3f4f6"
              vertical={false}
            />
            <XAxis
              dataKey="time"
              stroke="#9ca3af"
              tickMargin={10}
              tick={{ fontSize: 11 }}
              angle={-45}
              textAnchor="end"
              height={50}
              interval={Math.floor(data.length / 6)}
            />
            <YAxis
              stroke="#9ca3af"
              tick={{ fontSize: 11 }}
              domain={[minPrice - padding, maxPrice + padding]}
              tickFormatter={(value) => `₹${value.toFixed(1)}`}
              width={60}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#e5e7eb", strokeWidth: 1 }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#3b82f6"
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 6,
                stroke: "#1d4ed8",
                strokeWidth: 2,
                fill: "#ffffff",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 text-xs text-gray-400 text-center">
        <p>Data updates every 5 minutes during market hours</p>
      </div>
    </div>
  );
}
