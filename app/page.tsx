"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Cloud, CloudRain, Sun, Thermometer } from "lucide-react";
import { useState, useRef } from "react";
import WeatherBackground from "@/components/weather-background";
import LocationPrompt from "@/components/location-prompt";
import WeatherCard from "@/components/weather-card";
import ForecastChart from "@/components/forecast-chart";
import ForecastCard from "@/components/forecast-card";
import SearchBox from "@/components/search-box";
import LocationHeader from "@/components/location-header";

export default function Home() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showLocationPrompt, setShowLocationPrompt] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Smooth spring-based scroll values
  const springConfig = { stiffness: 100, damping: 30, bounce: 0 };
  const smoothScroll = useSpring(scrollY, springConfig);

  // Parallax transformations
  const headerScale = useTransform(smoothScroll, [0, 300], [1, 0.8]);
  const headerY = useTransform(smoothScroll, [0, 300], [0, -50]);
  const headerOpacity = useTransform(smoothScroll, [0, 300], [1, 0]);
  
  const contentScale = useTransform(smoothScroll, [0, 300], [0.95, 1.05]);
  const contentY = useTransform(smoothScroll, [0, 300], [100, 0]);
  const contentOpacity = useTransform(smoothScroll, [0, 300], [0.5, 1]);

  const mockForecastData = [
    { time: "00:00", temperature: 18 },
    { time: "03:00", temperature: 16 },
    { time: "06:00", temperature: 15 },
    { time: "09:00", temperature: 19 },
    { time: "12:00", temperature: 22 },
    { time: "15:00", temperature: 24 },
    { time: "18:00", temperature: 21 },
    { time: "21:00", temperature: 19 },
  ];

  const mockDailyForecast = [
    { day: "Mon", temp: 22, condition: "Sunny" },
    { day: "Tue", temp: 20, condition: "Partly Cloudy" },
    { day: "Wed", temp: 19, condition: "Cloudy" },
    { day: "Thu", temp: 18, condition: "Rainy" },
    { day: "Fri", temp: 21, condition: "Sunny" },
  ];

  const getWeatherByLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setWeather({
            temp: 24,
            condition: "Partly Cloudy",
            humidity: 70,
            windSpeed: 15,
            city: "Current Location",
            country: "Detected",
            date: new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          });
          setShowLocationPrompt(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setShowLocationPrompt(false);
        }
      );
    }
  };

  const getWeather = async (city: string) => {
    if (!city) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const [cityName, countryName] = city.split(", ");
      setWeather({
        temp: 22,
        condition: "Sunny",
        humidity: 65,
        windSpeed: 12,
        city: cityName,
        country: countryName,
        date: new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      <WeatherBackground condition={weather?.condition || "clear"} />
      
      <div ref={containerRef} className="relative z-10">
        {showLocationPrompt && (
          <LocationPrompt
            onAccept={getWeatherByLocation}
            onDecline={() => setShowLocationPrompt(false)}
          />
        )}

        <motion.div
          style={{ 
            y: headerY, 
            opacity: headerOpacity,
            scale: headerScale,
          }}
          className="container mx-auto px-4 py-16 relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Weather Forecast
            </h1>
            <p className="text-xl text-white/90 drop-shadow mb-8">
              Get real-time weather updates for any location
            </p>
            <SearchBox onSearch={getWeather} loading={loading} />
          </motion.div>
        </motion.div>

        {weather && (
          <motion.div
            style={{ 
              scale: contentScale,
              y: contentY,
              opacity: contentOpacity,
            }}
            className="container mx-auto px-4 pb-16 space-y-8"
          >
            <LocationHeader
              city={weather.city}
              country={weather.country}
              date={weather.date}
            />

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              <WeatherCard
                icon={<Thermometer className="w-8 h-8 text-orange-500" />}
                title="Temperature"
                value={`${weather.temp}°C`}
                delay={0}
              />
              <WeatherCard
                icon={<Sun className="w-8 h-8 text-yellow-500" />}
                title="Condition"
                value={weather.condition}
                delay={0.1}
              />
              <WeatherCard
                icon={<CloudRain className="w-8 h-8 text-blue-500" />}
                title="Humidity"
                value={`${weather.humidity}%`}
                delay={0.2}
              />
              <WeatherCard
                icon={<Cloud className="w-8 h-8 text-gray-500" />}
                title="Wind Speed"
                value={`${weather.windSpeed} km/h`}
                delay={0.3}
              />
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <ForecastChart data={mockForecastData} />
            </div>

            <div className="max-w-4xl mx-auto">
              <h3 className="text-lg font-semibold text-white mb-4">5-Day Forecast</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {mockDailyForecast.map((forecast, index) => (
                  <ForecastCard
                    key={forecast.day}
                    day={forecast.day}
                    temp={forecast.temp}
                    condition={forecast.condition}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}