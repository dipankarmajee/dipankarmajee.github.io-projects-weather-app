"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Sun, Cloud, CloudRain } from "lucide-react";

interface ForecastCardProps {
  day: string;
  temp: number;
  condition: string;
  index: number;
}

export default function ForecastCard({ day, temp, condition, index }: ForecastCardProps) {
  const getIcon = () => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="w-6 h-6 text-yellow-500" />;
      case "cloudy":
      case "partly cloudy":
        return <Cloud className="w-6 h-6 text-gray-400" />;
      case "rainy":
        return <CloudRain className="w-6 h-6 text-blue-400" />;
      default:
        return <Sun className="w-6 h-6 text-yellow-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="w-full"
    >
      <Card className="p-4 bg-white/10 backdrop-blur-lg border-0 hover:bg-white/20 transition-colors h-full">
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/80 text-sm">{day}</span>
          {getIcon()}
          <span className="text-white font-bold">{temp}°C</span>
          <span className="text-white/80 text-sm">{condition}</span>
        </div>
      </Card>
    </motion.div>
  );
}