/* Kinetic Maximalism: Full-screen slide with radial layouts and animated backgrounds */

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StatsSlideProps {
  children: ReactNode;
  backgroundImage?: string;
  backgroundGradient?: string;
  className?: string;
}

export default function StatsSlide({
  children,
  backgroundImage,
  backgroundGradient = "from-purple-900 via-pink-800 to-cyan-900",
  className = "",
}: StatsSlideProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen w-full relative flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* Background layer */}
      {backgroundImage ? (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ) : (
        <div className={`absolute inset-0 z-0 bg-gradient-to-br ${backgroundGradient}`}>
          {/* Animated gradient mesh overlay */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at 30% 50%, rgba(157, 78, 221, 0.6) 0%, transparent 50%),
                           radial-gradient(circle at 70% 50%, rgba(0, 245, 255, 0.6) 0%, transparent 50%)`,
            }}
          />
        </div>
      )}

      {/* Floating geometric shapes */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-20 w-24 h-24 border-4 border-pink-400 opacity-20"
        style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
      />
      <motion.div
        animate={{
          y: [0, 40, 0],
          x: [0, -30, 0],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-32 right-32 w-32 h-32 border-4 border-cyan-400 rounded-full opacity-20"
      />
      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 15, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-pink-500 opacity-10 blur-xl"
      />

      {/* Content layer */}
      <div className="relative z-10 w-full px-4 md:px-8 py-12">
        {children}
      </div>

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 z-20 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />
    </motion.div>
  );
}
