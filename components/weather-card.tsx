"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface WeatherCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  delay: number;
}

export default function WeatherCard({ icon, title, value, delay }: WeatherCardProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="h-full"
    >
      <Card className="p-6 bg-white/10 backdrop-blur-lg border-0 hover:bg-white/20 transition-colors h-full">
        <div className="flex flex-col items-center gap-4">
          {icon}
          <h3 className="text-lg font-semibold text-white">
            {title}
          </h3>
          <p className="text-2xl font-bold text-white">
            {value}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}