import { motion, AnimatePresence } from "framer-motion";
import { Palette, X, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { themes, type Theme } from "@/lib/themes";

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export default function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Theme Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 z-40 p-4 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-2xl hover:shadow-purple-500/50 hover:scale-110 transition-all"
        title="Change theme"
      >
        <Palette className="w-6 h-6" />
      </motion.button>

      {/* Theme Selection Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-3xl p-8 max-w-4xl w-full shadow-2xl border border-border max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Palette className="w-8 h-8 text-primary" />
                  <h2 className="font-display text-3xl text-foreground">Choose Your Theme</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Theme Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {themes.map((theme) => (
                  <motion.button
                    key={theme.id}
                    onClick={() => {
                      onThemeChange(theme);
                      setIsOpen(false);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative p-6 rounded-2xl border-2 transition-all text-left ${
                      currentTheme.id === theme.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {/* Selected Indicator */}
                    {currentTheme.id === theme.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center"
                      >
                        <Check className="w-5 h-5 text-white" />
                      </motion.div>
                    )}

                    {/* Theme Preview */}
                    <div className="mb-4 h-24 rounded-lg overflow-hidden">
                      <div
                        className={`w-full h-full bg-gradient-to-r ${theme.gradients.intro} flex items-center justify-center`}
                      >
                        <div
                          className={`${theme.cardStyle.background} ${theme.cardStyle.border} px-6 py-3 rounded-lg`}
                        >
                          <p
                            className="font-bold text-2xl"
                            style={{
                              fontFamily: theme.fonts.display,
                              color: theme.colors.primary,
                            }}
                          >
                            {theme.name.split(" ")[0]}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Theme Info */}
                    <h3 className="font-display text-xl font-bold mb-2">{theme.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{theme.description}</p>

                    {/* Color Palette */}
                    <div className="flex gap-2">
                      <div
                        className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: theme.colors.primary }}
                      />
                      <div
                        className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: theme.colors.secondary }}
                      />
                      <div
                        className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: theme.colors.accent }}
                      />
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground text-center">
                  Theme changes apply immediately to your presentation
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
