import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState } from "react";
import type { Theme } from "@/lib/themes";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  backgroundImage?: string;
  delay?: number;
  theme: Theme;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  backgroundImage,
  delay = 0,
  theme,
}: StatsCardProps) {
  const [revealed, setRevealed] = useState(false);

  const getAnimationConfig = () => {
    switch (theme.animation.type) {
      case "spring":
        return {
          type: "spring" as const,
          stiffness: 200,
          damping: 20,
        };
      case "energetic":
        return {
          type: "tween" as const,
          duration: theme.animation.duration,
          ease: "backOut" as const,
        };
      case "smooth":
      default:
        return {
          type: "tween" as const,
          duration: theme.animation.duration,
          ease: "easeOut" as const,
        };
    }
  };

  const isVaporwave = theme.id === "vaporwave";
  const textColor = backgroundImage ? "#FFFFFF" : theme.colors.text;
  const primaryColor = backgroundImage
    ? isVaporwave
      ? undefined
      : "#FFFFFF"
    : theme.colors.primary;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateZ: -5 }}
      animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
      transition={{
        ...getAnimationConfig(),
        delay,
      }}
      whileHover={{
        scale: 1.05,
        rotateZ: 2,
        transition: { type: "spring", stiffness: 300, damping: 15 },
      }}
      className={`relative overflow-hidden rounded-3xl p-8 shadow-2xl ${
        !backgroundImage ? theme.cardStyle.background : ""
      }`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient overlay for better text contrast when using background images */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60" />
      )}

      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4">
        {icon && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              ...getAnimationConfig(),
              delay: delay + 0.2,
            }}
            className="text-6xl"
            style={{ color: backgroundImage ? "#FFFFFF" : theme.colors.accent }}
          >
            {icon}
          </motion.div>
        )}

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.3 }}
          className="text-2xl md:text-3xl drop-shadow-lg"
          style={{
            fontFamily: theme.fonts.body,
            color: textColor,
          }}
        >
          {title}
        </motion.h3>

        {/* Tap-to-reveal stat value */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            ...getAnimationConfig(),
            delay: delay + 0.4,
          }}
          className="relative cursor-pointer select-none"
          onClick={(e) => {
            e.stopPropagation();
            setRevealed(true);
          }}
          title={revealed ? undefined : "Tap to reveal"}
        >
          <AnimatePresence mode="wait">
            {!revealed ? (
              /* Blurred / masked placeholder */
              <motion.div
                key="hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className={`text-6xl md:text-8xl font-bold drop-shadow-2xl blur-3xl pointer-events-none ${
                    backgroundImage && isVaporwave ? "text-holographic" : ""
                  }`}
                  style={{
                    fontFamily: theme.fonts.stats,
                    color: primaryColor,
                  }}
                >
                  {value}
                </div>
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-sm md:text-base font-medium tracking-widest uppercase"
                  style={{ color: backgroundImage ? "rgba(255,255,255,0.7)" : theme.colors.secondary }}
                >
                  Tap to reveal
                </motion.span>
              </motion.div>
            ) : (
              /* Revealed value with pop animation */
              <motion.div
                key="revealed"
                initial={{ opacity: 0, scale: 0.4, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className={`text-6xl md:text-8xl font-bold drop-shadow-2xl ${
                  backgroundImage && isVaporwave ? "text-holographic" : ""
                }`}
                style={{
                  fontFamily: theme.fonts.stats,
                  color: primaryColor,
                }}
              >
                {value}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.5 }}
            className="text-lg md:text-xl drop-shadow-md"
            style={{
              fontFamily: theme.fonts.body,
              color: backgroundImage ? "rgba(255,255,255,0.9)" : theme.colors.secondary,
            }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Decorative floating shapes - only for vaporwave theme */}
      {isVaporwave && (
        <>
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
        </>
      )}
    </motion.div>
  );
}
