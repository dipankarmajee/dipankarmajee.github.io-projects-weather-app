"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ForecastChartProps {
  data: Array<{
    time: string;
    temperature: number;
  }>;
}

export default function ForecastChart({ data }: ForecastChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="w-full h-[300px] p-6 bg-white/10 backdrop-blur-lg rounded-lg"
    >
      <h3 className="text-lg font-semibold text-white mb-4">Temperature Forecast</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="time"
            stroke="#ffffff60"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#ffffff60"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}°C`}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white/10 backdrop-blur-lg p-2 rounded-lg border border-white/20">
                    <p className="text-white text-sm">
                      {payload[0].payload.time}
                    </p>
                    <p className="text-white font-bold">
                      {payload[0].value}°C
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#ffffff"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}