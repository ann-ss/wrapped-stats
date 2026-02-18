import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import type { TimelineSlide } from "@/lib/dataUtils";
import type { Theme } from "@/lib/themes";

interface TimelineSlideProps {
  data: TimelineSlide;
  theme: Theme;
}

export default function TimelineSlideComponent({
  data,
  theme,
}: TimelineSlideProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="mb-4" style={{ color: theme.colors.accent }}>
            <Calendar className="w-16 h-16 mx-auto" />
          </div>
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

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div
            className="absolute left-8 top-0 bottom-0 w-1"
            style={{ backgroundColor: theme.colors.secondary }}
          />

          {/* Events */}
          <div className="space-y-8">
            {data.events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.15 }}
                className="relative flex items-start gap-6"
              >
                {/* Date Circle */}
                <div
                  className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-sm font-bold z-10"
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: theme.id === "minimal" || theme.id === "brutalist" ? "#FFFFFF" : theme.colors.text,
                    fontFamily: theme.fonts.stats,
                  }}
                >
                  {event.date}
                </div>

                {/* Content Card */}
                <div
                  className={`flex-1 ${theme.cardStyle.background} ${theme.cardStyle.border} rounded-2xl p-6`}
                >
                  <h3
                    className="text-xl md:text-2xl font-bold mb-2"
                    style={{
                      fontFamily: theme.fonts.body,
                      color: theme.colors.text,
                    }}
                  >
                    {event.title}
                  </h3>
                  {event.description && (
                    <p
                      className="text-sm md:text-base"
                      style={{
                        fontFamily: theme.fonts.body,
                        color: theme.colors.secondary,
                      }}
                    >
                      {event.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
