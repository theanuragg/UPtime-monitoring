"use client"

import React from "react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from "recharts";

interface ChartData {
  time: string;
  value: number;
}

interface ResponseTimeChartProps {
  data: ChartData[];
  height?: number | string;
  showStats?: boolean;
  stats?: {
    high: string;
    low: string;
    avg: string;
  };
}

const ResponseTimeChart = ({ 
  data, 
  height = 250,
  showStats = false,
  stats = { high: "0ms", low: "0ms", avg: "0ms" } 
}: ResponseTimeChartProps) => {
  return (
    <div>
      {showStats && (
        <div className="text-xs text-gray-500 mb-2 text-right">
          <span>High: {stats.high}, Low: {stats.low}, Avg: {stats.avg}</span>
        </div>
      )}
      <div style={{ height: height, width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 10 }}
              tickLine={false}
            />
            <YAxis 
              domain={[0, 250]}
              ticks={[0, 50, 100, 150, 200, 250]}
              tick={{ fontSize: 10 }}
              tickLine={false}
              tickFormatter={(value) => `${value}ms`}
            />
            <Tooltip 
              formatter={(value) => [`${value}ms`, "Response Time"]}
              labelFormatter={(label) => `Time: ${label}`}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#3b82f6" 
              fillOpacity={1} 
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ResponseTimeChart;