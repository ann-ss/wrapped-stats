import { AnimatePresence, motion } from "framer-motion";
import { Award, Sparkles, Upload } from "lucide-react";
import { useState, useEffect, createElement } from "react";
import ConfettiEffect from "@/components/ConfettiEffect";
import DataUpload from "@/components/DataUpload";
import NavigationControls from "@/components/NavigationControls";
import ProgressIndicator from "@/components/ProgressIndicator";
import StatsCard from "@/components/StatsCard";
import StatsSlide from "@/components/StatsSlide";
import ThemeSelector from "@/components/ThemeSelector";
import { Button } from "@/components/ui/button";
import { 
  defaultData, 
  getIconComponent, 
  getBackgroundImage,
  type PresentationData 
} from "@/lib/dataUtils";
import { themes, getFontImports, type Theme } from "@/lib/themes";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [presentationData, setPresentationData] = useState<PresentationData>(defaultData);
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);

  // Total slides = intro + data slides + finale
  const totalSlides = presentationData.slides.length + 2;

  // Load theme fonts dynamically
  useEffect(() => {
    const fontLink = document.getElementById("theme-fonts") as HTMLLinkElement;
    if (fontLink) {
      fontLink.href = getFontImports(currentTheme);
    } else {
      const link = document.createElement("link");
      link.id = "theme-fonts";
      link.rel = "stylesheet";
      link.href = getFontImports(currentTheme);
      document.head.appendChild(link);
    }
  }, [currentTheme]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && currentSlide < totalSlides - 1) {
        handleNext();
      } else if (e.key === "ArrowLeft" && currentSlide > 0) {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, totalSlides]);

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
      if (currentSlide === totalSlides - 2) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 100);
      }
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNavigate = (index: number) => {
    setCurrentSlide(index);
  };

  const handleDataLoaded = (data: PresentationData) => {
    setPresentationData(data);
    setCurrentSlide(0); // Reset to intro slide
  };

  const renderSlide = (index: number) => {
    // Intro slide
    if (index === 0) {
      return (
        <StatsSlide key="intro" backgroundGradient={currentTheme.gradients.intro}>
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="text-8xl"
              style={{ color: currentTheme.colors.accent }}
            >
              <Sparkles className="w-32 h-32 mx-auto" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-6xl md:text-8xl drop-shadow-2xl ${
                currentTheme.id === "vaporwave" ? "text-holographic" : ""
              }`}
              style={{
                fontFamily: currentTheme.fonts.display,
                color: currentTheme.id === "vaporwave" ? undefined : currentTheme.colors.primary,
              }}
            >
              {presentationData.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-3xl md:text-5xl drop-shadow-lg"
              style={{
                fontFamily: currentTheme.fonts.stats,
                color: currentTheme.colors.text,
              }}
            >
              {presentationData.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                onClick={handleNext}
                size="lg"
                className="px-12 py-6 text-xl hover:scale-110 transition-transform"
                style={{
                  fontFamily: currentTheme.fonts.display,
                  background: `linear-gradient(to right, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
                  color: currentTheme.id === "minimal" || currentTheme.id === "brutalist" ? "#FFFFFF" : currentTheme.colors.text,
                }}
              >
                Let's Go! ✨
              </Button>
            </motion.div>
          </div>
        </StatsSlide>
      );
    }

    // Finale slide
    if (index === totalSlides - 1) {
      return (
        <StatsSlide key="finale" backgroundGradient={currentTheme.gradients.finale}>
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="text-8xl"
              style={{ color: currentTheme.colors.accent }}
            >
              <Award className="w-32 h-32 mx-auto" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-6xl md:text-8xl drop-shadow-2xl ${
                currentTheme.id === "vaporwave" ? "text-holographic" : ""
              }`}
              style={{
                fontFamily: currentTheme.fonts.display,
                color: currentTheme.id === "vaporwave" ? undefined : currentTheme.colors.primary,
              }}
            >
              You're Incredible!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl md:text-4xl drop-shadow-lg max-w-3xl"
              style={{
                fontFamily: currentTheme.fonts.body,
                color: currentTheme.colors.text,
              }}
            >
              Thanks for an amazing year!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-4 mt-8"
            >
              <Button
                onClick={() => setCurrentSlide(0)}
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg border-2 hover:scale-105 transition-transform"
                style={{
                  fontFamily: currentTheme.fonts.display,
                  borderColor: currentTheme.colors.primary,
                  color: currentTheme.colors.primary,
                }}
              >
                Replay
              </Button>
            </motion.div>
          </div>
        </StatsSlide>
      );
    }

    // Stat slides
    const slideData = presentationData.slides[index - 1];
    const IconComponent = getIconComponent(slideData.icon);
    const backgroundImage = getBackgroundImage(slideData.backgroundIndex);

    return (
      <StatsSlide key={`stat-${index}`} backgroundImage={backgroundImage}>
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="max-w-2xl w-full">
            <StatsCard
              title={slideData.title}
              value={slideData.value}
              subtitle={slideData.subtitle}
              icon={createElement(IconComponent, { className: "w-16 h-16" })}
              backgroundImage={backgroundImage}
              delay={0.2}
              theme={currentTheme}
            />
          </div>
        </div>
      </StatsSlide>
    );
  };

  return (
    <div className="relative">
      <ProgressIndicator
        current={currentSlide}
        total={totalSlides}
        onNavigate={handleNavigate}
      />

      <NavigationControls
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrevious={currentSlide > 0}
        hasNext={currentSlide < totalSlides - 1}
      />

      <AnimatePresence mode="wait">
        {renderSlide(currentSlide)}
      </AnimatePresence>

      <ConfettiEffect trigger={showConfetti} />

      {/* Theme Selector */}
      <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />

      {/* Upload Modal */}
      <AnimatePresence>
        {showUpload && (
          <DataUpload
            onDataLoaded={handleDataLoaded}
            onClose={() => setShowUpload(false)}
          />
        )}
      </AnimatePresence>

      {/* Floating Upload Button (bottom right) */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        onClick={() => setShowUpload(true)}
        className="fixed bottom-8 right-8 z-40 p-4 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-2xl hover:shadow-pink-500/50 hover:scale-110 transition-all"
        title="Upload your data"
      >
        <Upload className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
