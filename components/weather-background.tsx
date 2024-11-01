"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface WeatherBackgroundProps {
  condition: string;
}

export default function WeatherBackground({ condition }: WeatherBackgroundProps) {
  const [background, setBackground] = useState("");
  const [particles, setParticles] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const getBackground = () => {
      switch (condition.toLowerCase()) {
        case "sunny":
          return "bg-gradient-to-b from-blue-400 to-blue-600";
        case "cloudy":
        case "partly cloudy":
          return "bg-gradient-to-b from-gray-300 to-gray-500";
        case "rainy":
          return "bg-gradient-to-b from-gray-600 to-gray-800";
        default:
          return "bg-gradient-to-b from-blue-400 to-blue-600";
      }
    };

    const generateParticles = () => {
      const items = [];
      const count = condition.toLowerCase().includes("cloudy") ? 8 : 20;

      for (let i = 0; i < count; i++) {
        const randomX = Math.random() * 100;
        const randomDelay = Math.random() * 2;
        const randomDuration = 15 + Math.random() * 10;

        items.push(
          <motion.div
            key={i}
            className={`absolute ${
              condition.toLowerCase().includes("cloudy")
                ? "bg-white/30 w-24 h-24 rounded-full blur-xl"
                : "bg-yellow-300/30 w-2 h-2 rounded-full blur-sm"
            }`}
            initial={{ x: `${randomX}vw`, y: -20 }}
            animate={{
              y: "120vh",
              x: `${randomX + (Math.random() * 20 - 10)}vw`,
            }}
            transition={{
              duration: randomDuration,
              repeat: Infinity,
              delay: randomDelay,
              ease: "linear",
            }}
          />
        );
      }
      return items;
    };

    setBackground(getBackground());
    setParticles(generateParticles());
  }, [condition]);

  return (
    <div className={`fixed inset-0 ${background} transition-colors duration-1000`}>
      <div className="absolute inset-0 bg-black/20" />
      {particles}
    </div>
  );
}