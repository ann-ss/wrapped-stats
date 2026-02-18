/* Kinetic Maximalism: Playful card component with spring animations and vibrant gradients */

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  backgroundImage?: string;
  delay?: number;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  backgroundImage,
  delay = 0,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateZ: -5 }}
      animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay,
      }}
      whileHover={{
        scale: 1.05,
        rotateZ: 2,
        transition: { type: "spring", stiffness: 300, damping: 15 },
      }}
      className="relative overflow-hidden rounded-3xl p-8 shadow-2xl"
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4">
        {icon && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: delay + 0.2,
            }}
            className="text-6xl"
          >
            {icon}
          </motion.div>
        )}

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.3 }}
          className="font-display text-2xl md:text-3xl text-white drop-shadow-lg"
        >
          {title}
        </motion.h3>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 12,
            delay: delay + 0.4,
          }}
          className="font-stats text-6xl md:text-8xl font-bold text-holographic drop-shadow-2xl"
        >
          {value}
        </motion.div>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.5 }}
            className="font-body text-lg md:text-xl text-white/90 drop-shadow-md"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Decorative floating shapes */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 opacity-40 blur-sm"
      />
      <motion.div
        animate={{
          y: [0, 15, 0],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-6 left-6 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 opacity-30 blur-sm"
      />
    </motion.div>
  );
}
