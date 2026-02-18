import { motion } from "framer-motion";
import { createElement } from "react";
import type { TopRankingSlide as TopRankingSlideData } from "@/lib/dataUtils";
import { getIconComponent } from "@/lib/dataUtils";
import type { Theme } from "@/lib/themes";

interface TopRankingSlideProps {
  data: TopRankingSlideData;
  theme: Theme;
}

export default function TopRankingSlide({ data, theme }: TopRankingSlideProps) {
  const IconComponent = data.icon ? getIconComponent(data.icon) : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="max-w-3xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          {IconComponent && (
            <div className="mb-4" style={{ color: theme.colors.accent }}>
              {createElement(IconComponent, { className: "w-16 h-16 mx-auto" })}
            </div>
          )}
          <h2
            className="text-4xl md:text-6xl font-bold"
            style={{
              fontFamily: theme.fonts.display,
              color: theme.colors.primary,
            }}
          >
            {data.title}
          </h2>
        </motion.div>

        {/* Ranking List */}
        <div className="space-y-4">
          {data.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`${theme.cardStyle.background} ${theme.cardStyle.border} rounded-2xl p-6 flex items-center gap-6`}
            >
              {/* Rank Badge */}
              <div
                className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold"
                style={{
                  fontFamily: theme.fonts.stats,
                  backgroundColor: theme.colors.primary,
                  color: theme.id === "minimal" || theme.id === "brutalist" ? "#FFFFFF" : theme.colors.text,
                }}
              >
                {item.rank}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3
                  className="text-xl md:text-2xl font-bold mb-1"
                  style={{
                    fontFamily: theme.fonts.body,
                    color: theme.colors.text,
                  }}
                >
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p
                    className="text-sm md:text-base"
                    style={{
                      fontFamily: theme.fonts.body,
                      color: theme.colors.secondary,
                    }}
                  >
                    {item.subtitle}
                  </p>
                )}
              </div>

              {/* Value */}
              <div
                className="text-2xl md:text-4xl font-bold"
                style={{
                  fontFamily: theme.fonts.stats,
                  color: theme.colors.accent,
                }}
              >
                {item.value}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
