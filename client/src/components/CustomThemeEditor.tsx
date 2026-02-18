import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Palette } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Theme } from "@/lib/themes";

interface CustomThemeEditorProps {
  baseTheme: Theme;
  onSave: (theme: Theme) => void;
  onClose: () => void;
}

export default function CustomThemeEditor({
  baseTheme,
  onSave,
  onClose,
}: CustomThemeEditorProps) {
  const [customTheme, setCustomTheme] = useState<Theme>({
    ...baseTheme,
    id: `custom-${Date.now()}`,
    name: `Custom ${baseTheme.name}`,
  });

  const handleSave = () => {
    onSave(customTheme);
    onClose();
  };

  const updateColor = (key: keyof Theme["colors"], value: string) => {
    setCustomTheme({
      ...customTheme,
      colors: { ...customTheme.colors, [key]: value },
    });
  };

  const updateFont = (key: keyof Theme["fonts"], value: string) => {
    setCustomTheme({
      ...customTheme,
      fonts: { ...customTheme.fonts, [key]: value },
    });
  };

  const updateGradient = (key: keyof Theme["gradients"], value: string) => {
    setCustomTheme({
      ...customTheme,
      gradients: { ...customTheme.gradients, [key]: value },
    });
  };

  const updateAnimation = (type: "spring" | "smooth" | "energetic") => {
    const durations = { spring: 0.6, smooth: 0.4, energetic: 0.3 };
    setCustomTheme({
      ...customTheme,
      animation: { type, duration: durations[type] },
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
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
              <h2 className="font-display text-3xl text-foreground">
                Customize Theme
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Theme Name */}
          <div className="mb-6">
            <Label htmlFor="theme-name">Theme Name</Label>
            <Input
              id="theme-name"
              value={customTheme.name}
              onChange={(e) =>
                setCustomTheme({ ...customTheme, name: e.target.value })
              }
              className="mt-2"
            />
          </div>

          {/* Colors Section */}
          <div className="mb-6">
            <h3 className="font-display text-xl mb-4">Colors</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(customTheme.colors).map(([key, value]) => (
                <div key={key}>
                  <Label htmlFor={`color-${key}`} className="capitalize">
                    {key}
                  </Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id={`color-${key}`}
                      type="color"
                      value={value}
                      onChange={(e) =>
                        updateColor(
                          key as keyof Theme["colors"],
                          e.target.value
                        )
                      }
                      className="w-16 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={value}
                      onChange={(e) =>
                        updateColor(
                          key as keyof Theme["colors"],
                          e.target.value
                        )
                      }
                      className="flex-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fonts Section */}
          <div className="mb-6">
            <h3 className="font-display text-xl mb-4">Typography</h3>
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(customTheme.fonts).map(([key, value]) => (
                <div key={key}>
                  <Label htmlFor={`font-${key}`} className="capitalize">
                    {key} Font
                  </Label>
                  <Input
                    id={`font-${key}`}
                    value={value}
                    onChange={(e) =>
                      updateFont(key as keyof Theme["fonts"], e.target.value)
                    }
                    placeholder="e.g., Roboto, Inter, Playfair Display"
                    className="mt-2"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Gradients Section */}
          <div className="mb-6">
            <h3 className="font-display text-xl mb-4">Gradients</h3>
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(customTheme.gradients).map(([key, value]) => (
                <div key={key}>
                  <Label htmlFor={`gradient-${key}`} className="capitalize">
                    {key} Gradient
                  </Label>
                  <Input
                    id={`gradient-${key}`}
                    value={value}
                    onChange={(e) =>
                      updateGradient(
                        key as keyof Theme["gradients"],
                        e.target.value
                      )
                    }
                    placeholder="e.g., from-purple-900 via-pink-800 to-cyan-900"
                    className="mt-2"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Animation Section */}
          <div className="mb-6">
            <h3 className="font-display text-xl mb-4">Animation Style</h3>
            <Select
              value={customTheme.animation.type}
              onValueChange={(value) =>
                updateAnimation(value as "spring" | "smooth" | "energetic")
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spring">Spring (Bouncy)</SelectItem>
                <SelectItem value="smooth">Smooth (Elegant)</SelectItem>
                <SelectItem value="energetic">Energetic (Fast)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Preview */}
          <div className="mb-6">
            <h3 className="font-display text-xl mb-4">Preview</h3>
            <div
              className={`p-8 rounded-2xl bg-gradient-to-r ${customTheme.gradients.intro} flex items-center justify-center`}
            >
              <div
                className={`${customTheme.cardStyle.background} ${customTheme.cardStyle.border} px-8 py-6 rounded-xl text-center`}
              >
                <p
                  className="text-4xl font-bold mb-2"
                  style={{
                    fontFamily: customTheme.fonts.display,
                    color: customTheme.colors.primary,
                  }}
                >
                  Preview
                </p>
                <p
                  className="text-2xl"
                  style={{
                    fontFamily: customTheme.fonts.stats,
                    color: customTheme.colors.secondary,
                  }}
                >
                  12,345
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="gap-2">
              <Save className="w-4 h-4" />
              Save Custom Theme
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
