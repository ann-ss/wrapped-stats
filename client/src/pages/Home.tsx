/* Kinetic Maximalism: Full Spotify Wrapped-style stats presentation with playful animations and JSON upload */

import { AnimatePresence, motion } from "framer-motion";
import { Award, Sparkles, Upload } from "lucide-react";
import { useState, useEffect, createElement } from "react";
import ConfettiEffect from "@/components/ConfettiEffect";
import DataUpload from "@/components/DataUpload";
import NavigationControls from "@/components/NavigationControls";
import ProgressIndicator from "@/components/ProgressIndicator";
import StatsCard from "@/components/StatsCard";
import StatsSlide from "@/components/StatsSlide";
import { Button } from "@/components/ui/button";
import { 
  defaultData, 
  getIconComponent, 
  getBackgroundImage,
  type PresentationData 
} from "@/lib/dataUtils";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [presentationData, setPresentationData] = useState<PresentationData>(defaultData);

  // Total slides = intro + data slides + finale
  const totalSlides = presentationData.slides.length + 2;

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
        <StatsSlide key="intro" backgroundGradient="from-purple-900 via-pink-800 to-cyan-900">
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="text-8xl"
            >
              <Sparkles className="w-32 h-32 text-yellow-400 mx-auto" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-6xl md:text-8xl text-holographic drop-shadow-2xl"
            >
              {presentationData.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-stats text-3xl md:text-5xl text-white/90 drop-shadow-lg"
            >
              {presentationData.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-4"
            >
              <Button
                onClick={handleNext}
                size="lg"
                className="px-12 py-6 text-xl font-display bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:scale-110 transition-transform"
              >
                Let's Go! ✨
              </Button>
              <Button
                onClick={() => setShowUpload(true)}
                size="lg"
                variant="outline"
                className="px-8 py-6 text-xl font-display border-2 border-white text-white hover:bg-white hover:text-purple-900"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Data
              </Button>
            </motion.div>
          </div>
        </StatsSlide>
      );
    }

    // Finale slide
    if (index === totalSlides - 1) {
      return (
        <StatsSlide key="finale" backgroundGradient="from-pink-900 via-purple-900 to-indigo-900">
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="text-8xl"
            >
              <Award className="w-32 h-32 text-yellow-400 mx-auto" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-6xl md:text-8xl text-holographic drop-shadow-2xl"
            >
              You're Incredible!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-body text-2xl md:text-4xl text-white/90 drop-shadow-lg max-w-3xl"
            >
              Thanks for an amazing year of music
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
                className="px-8 py-6 text-lg font-display border-2 border-white text-white hover:bg-white hover:text-purple-900"
              >
                Replay
              </Button>
              <Button
                onClick={() => setShowUpload(true)}
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg font-display border-2 border-white text-white hover:bg-white hover:text-purple-900"
              >
                <Upload className="w-5 h-5 mr-2" />
                New Data
              </Button>
              <Button
                size="lg"
                className="px-8 py-6 text-lg font-display bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-110 transition-transform"
              >
                Share Your Stats 🎉
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
              icon={createElement(IconComponent, { className: "w-16 h-16 text-cyan-400" })}
              delay={0.2}
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

      {/* Upload Modal */}
      <AnimatePresence>
        {showUpload && (
          <DataUpload
            onDataLoaded={handleDataLoaded}
            onClose={() => setShowUpload(false)}
          />
        )}
      </AnimatePresence>

      {/* Floating Upload Button */}
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
