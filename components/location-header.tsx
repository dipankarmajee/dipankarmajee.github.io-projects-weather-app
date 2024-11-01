"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

interface LocationHeaderProps {
  city: string;
  country?: string;
  date: string;
}

export default function LocationHeader({ city, country, date }: LocationHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-8"
    >
      <div className="flex items-center justify-center gap-2 mb-2">
        <MapPin className="w-6 h-6 text-white" />
        <h2 className="text-2xl font-semibold text-white">
          {city}{country && <span className="text-white/80">, {country}</span>}
        </h2>
      </div>
      <p className="text-white/70">{date}</p>
    </motion.div>
  );
}