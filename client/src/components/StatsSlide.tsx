/* Kinetic Maximalism: Full-screen slide with radial layouts and animated backgrounds */

import { motion } from "framer-motion";
import { ReactNode } from "react";
import type { Theme } from "@/lib/themes";

interface StatsSlideProps {
  children: ReactNode;
  backgroundImage?: string;
  backgroundGradient?: string;
  className?: string;
  theme?: Theme;
}

export default function StatsSlide({
  children,
  backgroundImage,
  backgroundGradient = "from-purple-900 via-pink-800 to-cyan-900",
  className = "",
  theme,
}: StatsSlideProps) {
  const isNautical = theme?.id === "nautical";

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
          {isNautical ? (
            /* Nautical: animated water shimmer and subtle wave overlay */
            <>
              <motion.div
                animate={{ x: [0, 40, 0], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 40% at 50% 80%, rgba(168,216,234,0.25) 0%, transparent 70%)",
                }}
              />
              <motion.div
                animate={{ x: [0, -30, 0], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 30% at 30% 60%, rgba(244,200,66,0.12) 0%, transparent 60%)",
                }}
              />
            </>
          ) : (
            /* Default vaporwave animated gradient mesh overlay */
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
          )}
        </div>
      )}

      {/* Decorative elements — theme-specific */}
      {isNautical ? (
        <>
          {/* Compass rose hint — top right */}
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-12 right-12 w-28 h-28 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' stroke='%23F4C842' stroke-width='2' fill='none'/%3E%3Cpolygon points='50,4 54,46 50,50 46,46' fill='%23F4C842'/%3E%3Cpolygon points='50,96 54,54 50,50 46,54' fill='%23A8D8EA'/%3E%3Cpolygon points='4,50 46,46 50,50 46,54' fill='%23A8D8EA'/%3E%3Cpolygon points='96,50 54,46 50,50 54,54' fill='%23F4C842'/%3E%3Ccircle cx='50' cy='50' r='5' fill='%23F4C842'/%3E%3C/svg%3E")`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          />
          {/* Rope knot circle — bottom left */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-16 left-16 w-40 h-40 rounded-full border-4 border-yellow-400/15 opacity-40 pointer-events-none"
          />
          {/* Horizon line */}
          <div className="absolute bottom-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/20 to-transparent pointer-events-none" />
          {/* Subtle wave lines */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ x: [0, 20, 0] }}
              transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
              className="absolute left-0 right-0 h-px opacity-10 pointer-events-none"
              style={{
                top: `${62 + i * 4}%`,
                background: "linear-gradient(to right, transparent, #A8D8EA 30%, #A8D8EA 70%, transparent)",
              }}
            />
          ))}
        </>
      ) : (
        /* Default floating geometric shapes */
        <>
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
        </>
      )}

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
