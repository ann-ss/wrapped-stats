/* Kinetic Maximalism: Bold progress bar with playful animations */

import { motion } from "framer-motion";

interface ProgressIndicatorProps {
  current: number;
  total: number;
  onNavigate?: (index: number) => void;
}

export default function ProgressIndicator({
  current,
  total,
  onNavigate,
}: ProgressIndicatorProps) {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Progress bar */}
      <motion.div
        className="h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: progress / 100 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        style={{ transformOrigin: "left" }}
      />

      {/* Dot indicators */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-3">
        {Array.from({ length: total }).map((_, index) => (
          <motion.button
            key={index}
            onClick={() => onNavigate?.(index)}
            className={`rounded-full transition-all ${
              index === current
                ? "w-12 h-3 bg-gradient-to-r from-pink-500 to-purple-500"
                : "w-3 h-3 bg-white/30 hover:bg-white/50"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          />
        ))}
      </div>
    </div>
  );
}
