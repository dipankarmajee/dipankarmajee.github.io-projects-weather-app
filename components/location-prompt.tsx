"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface LocationPromptProps {
  onAccept: () => void;
  onDecline: () => void;
}

export default function LocationPrompt({ onAccept, onDecline }: LocationPromptProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6 shadow-lg max-w-md mx-4">
          <div className="flex items-center gap-4 mb-4">
            <MapPin className="w-6 h-6 text-white" />
            <h3 className="text-lg font-semibold text-white">
              Enable Location Services
            </h3>
          </div>
          <p className="text-white/90 mb-6">
            Allow us to detect your location for accurate weather information
          </p>
          <div className="flex gap-4">
            <Button
              onClick={onAccept}
              className="flex-1 bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              Allow
            </Button>
            <Button
              onClick={onDecline}
              variant="outline"
              className="flex-1 border-white/30 text-white hover:bg-white/10"
            >
              Not Now
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}