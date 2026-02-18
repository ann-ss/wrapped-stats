/* Kinetic Maximalism: Playful navigation buttons with spring animations */

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationControlsProps {
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

export default function NavigationControls({
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}: NavigationControlsProps) {
  return (
    <>
      {/* Previous button */}
      {hasPrevious && (
        <motion.button
          onClick={onPrevious}
          className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 p-4 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-2xl hover:shadow-pink-500/50"
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
      )}

      {/* Next button */}
      {hasNext && (
        <motion.button
          onClick={onNext}
          className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 p-4 rounded-full bg-gradient-to-br from-cyan-600 to-purple-600 text-white shadow-2xl hover:shadow-cyan-500/50"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      )}
    </>
  );
}
