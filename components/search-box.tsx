"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SearchBoxProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

// Mock data for suggestions (replace with real API data)
const mockCities = [
  "London, United Kingdom",
  "New York, United States",
  "Paris, France",
  "Tokyo, Japan",
  "Sydney, Australia",
  "Berlin, Germany",
  "Toronto, Canada",
  "Singapore",
  "Dubai, UAE",
  "Mumbai, India"
];

export default function SearchBox({ onSearch, loading }: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Filter cities based on query
    if (query.length > 1) {
      const filtered = mockCities.filter(city =>
        city.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  useEffect(() => {
    // Close suggestions when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (city: string) => {
    setQuery(city);
    setShowSuggestions(false);
    onSearch(city);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md mx-auto">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search for a city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-white/10 backdrop-blur-md text-white placeholder:text-white/70 border-0 pr-10"
            onFocus={() => query.length > 1 && setShowSuggestions(true)}
          />
          <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70" />
        </div>
        <Button
          onClick={() => onSearch(query)}
          disabled={!query || loading}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border-0 min-w-[100px]"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Search"
          )}
        </Button>
      </div>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute w-full mt-2 z-50"
          >
            <Card className="bg-white/10 backdrop-blur-lg border-0 overflow-hidden">
              <ul className="max-h-64 overflow-auto">
                {suggestions.map((city, index) => (
                  <motion.li
                    key={city}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSuggestionClick(city)}
                    className="px-4 py-2 hover:bg-white/10 cursor-pointer text-white/90 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4" />
                    {city}
                  </motion.li>
                ))}
              </ul>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}