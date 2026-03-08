import { AnimatePresence, motion } from "framer-motion";
import { Award, Sparkles, Heart, Upload, ImageIcon } from "lucide-react";
import { useState, useEffect, createElement } from "react";
import ConfettiEffect from "@/components/ConfettiEffect";
import DataUpload from "@/components/DataUpload";
import NavigationControls from "@/components/NavigationControls";
import PhotoUpload from "@/components/PhotoUpload";
import ProgressIndicator from "@/components/ProgressIndicator";
import ShareButton from "@/components/ShareButton";

import StatsCard from "@/components/StatsCard";
import StatsSlide from "@/components/StatsSlide";
import ThemeSelector from "@/components/ThemeSelector";
import TopRankingSlide from "@/components/TopRankingSlide";
import TimelineSlideComponent from "@/components/TimelineSlideComponent";
import PhotoCarouselSlideComponent from "@/components/PhotoCarouselSlideComponent";
import { Button } from "@/components/ui/button";
import {
  defaultData,
  getIconComponent,
  getBackgroundImage,
  type PresentationData,
  type StatSlide,
  type TopRankingSlide as TopRankingSlideData,
  type TimelineSlide,
  type PhotoCarouselSlide,
} from "@/lib/dataUtils";
import { themes, getFontImports, type Theme } from "@/lib/themes";
import {
  loadPresentationData,
  savePresentationData,
  loadTheme,
  saveTheme,
  loadCustomThemes,
  saveCustomThemes,
  loadUploadedPhotos,
  addUploadedPhoto,
  removeUploadedPhoto,
} from "@/lib/storage";
import { decodeDataFromUrl } from "@/lib/urlSharing";


export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [presentationData, setPresentationData] = useState<PresentationData>(defaultData);
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [customThemes, setCustomThemes] = useState<Theme[]>([]);
  const [uploadedPhotos, setUploadedPhotos] = useState<Record<string, string>>({});

  // Load data from URL or local storage on mount
  useEffect(() => {
    // Check for shared data in URL
    const urlParams = new URLSearchParams(window.location.search);
    const sharedData = urlParams.get('share');
    
    if (sharedData) {
      const decoded = decodeDataFromUrl(sharedData);
      if (decoded) {
        setPresentationData(decoded.data);
        
        // Load shared theme if specified
        if (decoded.themeId) {
          const sharedTheme = themes.find(t => t.id === decoded.themeId);
          if (sharedTheme) {
            setCurrentTheme(sharedTheme);
          }
        }
        
        // Don't save shared data to local storage automatically
        return;
      }
    }
    
    // Load from local storage if no shared data
    const savedData = loadPresentationData();
    if (savedData) {
      setPresentationData(savedData);
    }

    const savedTheme = loadTheme();
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }

    const savedCustomThemes = loadCustomThemes();
    setCustomThemes(savedCustomThemes);

    const savedPhotos = loadUploadedPhotos();
    setUploadedPhotos(savedPhotos);
  }, []);

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

  // Keyboard navigation
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

  // Touch/swipe navigation
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleSwipe = () => {
      const swipeThreshold = 50; // Minimum distance for swipe
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && currentSlide < totalSlides - 1) {
          // Swipe left - go to next
          handleNext();
        } else if (diff < 0 && currentSlide > 0) {
          // Swipe right - go to previous
          handlePrevious();
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
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
    savePresentationData(data);
    setCurrentSlide(0);
  };

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    saveTheme(theme);
  };

  const handleCustomThemeAdd = (theme: Theme) => {
    const updatedThemes = [...customThemes.filter((t) => t.id !== theme.id), theme];
    setCustomThemes(updatedThemes);
    saveCustomThemes(updatedThemes);
    setCurrentTheme(theme);
    saveTheme(theme);
  };

  const handleCustomThemeDelete = (themeId: string) => {
    const updatedThemes = customThemes.filter((t) => t.id !== themeId);
    setCustomThemes(updatedThemes);
    saveCustomThemes(updatedThemes);
    if (currentTheme.id === themeId) {
      setCurrentTheme(themes[0]);
      saveTheme(themes[0]);
    }
  };

  const handlePhotoAdd = (id: string, dataUrl: string) => {
    addUploadedPhoto(id, dataUrl);
    setUploadedPhotos(loadUploadedPhotos());
  };

  const handlePhotoDelete = (id: string) => {
    removeUploadedPhoto(id);
    setUploadedPhotos(loadUploadedPhotos());
  };

  const renderSlide = (index: number) => {
    // Intro slide
    if (index === 0) {
      return (
        <StatsSlide key="intro" backgroundGradient={currentTheme.gradients.intro} theme={currentTheme}>
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="text-8xl"
              style={{ color: currentTheme.colors.accent }}
            >
              <Heart className="w-32 h-32 mx-auto" />
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
                  color:
                    currentTheme.id === "minimal" || currentTheme.id === "brutalist"
                      ? "#FFFFFF"
                      : currentTheme.colors.text,
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
        <StatsSlide key="finale" backgroundGradient={currentTheme.gradients.finale} theme={currentTheme}>
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="text-8xl"
              style={{ color: currentTheme.colors.accent }}
            >
              <Heart className="w-32 h-32 mx-auto" />
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
              Thanks for an amazing year! 
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
              Here's to another (even better) one :)
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

    // Data slides
    const slideData = presentationData.slides[index - 1];

    // Stat slide
    if (slideData.type === "stat") {
      const statSlide = slideData as StatSlide;
      const IconComponent = getIconComponent(statSlide.icon);
      // Custom user photo always takes priority.
      // Built-in background images are only used for the vaporwave theme;
      // all other themes use their own gradient so the slide feels cohesive.
      const backgroundImage = statSlide.customPhoto
        ? uploadedPhotos[statSlide.customPhoto]
        : currentTheme.id === "vaporwave" && statSlide.backgroundIndex !== undefined
        ? getBackgroundImage(statSlide.backgroundIndex)
        : undefined;

      return (
        <StatsSlide
          key={`stat-${index}`}
          backgroundImage={backgroundImage}
          backgroundGradient={currentTheme.gradients.intro}
          theme={currentTheme}
        >
          <div className="flex items-center justify-center min-h-[80vh]">
            <div className="max-w-2xl w-full">
              <StatsCard
                key={`card-${index}`}
                title={statSlide.title}
                value={statSlide.value}
                subtitle={statSlide.subtitle}
                icon={createElement(IconComponent, { className: "w-16 h-16" })}
                backgroundImage={backgroundImage}
                delay={0.2}
                theme={currentTheme}
              />
            </div>
          </div>
        </StatsSlide>
      );
    }

    // Top ranking slide
    if (slideData.type === "top-ranking") {
      return (
        <StatsSlide key={`ranking-${index}`} backgroundGradient={currentTheme.gradients.intro} theme={currentTheme}>
          <TopRankingSlide data={slideData as TopRankingSlideData} theme={currentTheme} />
        </StatsSlide>
      );
    }

    // Timeline slide
    if (slideData.type === "timeline") {
      return (
        <StatsSlide key={`timeline-${index}`} backgroundGradient={currentTheme.gradients.intro} theme={currentTheme}>
          <TimelineSlideComponent data={slideData as TimelineSlide} theme={currentTheme} />
        </StatsSlide>
      );
    }

    // Photo carousel slide
    if (slideData.type === "photo-carousel") {
      return (
        <StatsSlide key={`carousel-${index}`} backgroundGradient={currentTheme.gradients.intro} theme={currentTheme}>
          <PhotoCarouselSlideComponent
            data={slideData as PhotoCarouselSlide}
            theme={currentTheme}
            uploadedPhotos={uploadedPhotos}
          />
        </StatsSlide>
      );
    }

    return null;
  };

  // Handle tap zones (left/right sides of screen)
  const handleTapZone = (e: React.MouseEvent<HTMLDivElement>) => {
    const screenWidth = window.innerWidth;
    const clickX = e.clientX;
    const tapZoneWidth = screenWidth * 0.3; // 30% of screen on each side

    if (clickX < tapZoneWidth && currentSlide > 0) {
      handlePrevious();
    } else if (clickX > screenWidth - tapZoneWidth && currentSlide < totalSlides - 1) {
      handleNext();
    }
  };

  return (
    <div className="relative" onClick={handleTapZone}>
      <ProgressIndicator current={currentSlide} total={totalSlides} onNavigate={handleNavigate} />

      <NavigationControls
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrevious={currentSlide > 0}
        hasNext={currentSlide < totalSlides - 1}
      />

      <AnimatePresence mode="wait">{renderSlide(currentSlide)}</AnimatePresence>

      <ConfettiEffect trigger={showConfetti} />

      {/* Theme Selector */}
      <ThemeSelector
        currentTheme={currentTheme}
        customThemes={customThemes}
        onThemeChange={handleThemeChange}
        onCustomThemeAdd={handleCustomThemeAdd}
        onCustomThemeDelete={handleCustomThemeDelete}
      />

      {/* Data Upload Modal */}
      <AnimatePresence>
        {showUpload && (
          <DataUpload onDataLoaded={handleDataLoaded} onClose={() => setShowUpload(false)} />
        )}
      </AnimatePresence>

      {/* Photo Upload Modal */}
      <AnimatePresence>
        {showPhotoUpload && (
          <PhotoUpload
            photos={uploadedPhotos}
            onPhotoAdd={handlePhotoAdd}
            onPhotoDelete={handlePhotoDelete}
            onClose={() => setShowPhotoUpload(false)}
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

      {/* Floating Photo Button (bottom right, above upload) */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1 }}
        onClick={() => setShowPhotoUpload(true)}
        className="fixed bottom-24 right-8 z-40 p-4 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-2xl hover:shadow-cyan-500/50 hover:scale-110 transition-all"
        title="Manage photos"
      >
        <ImageIcon className="w-6 h-6" />
      </motion.button>

      {/* Share Button */}
      <ShareButton data={presentationData} theme={currentTheme} />

    </div>
  );
}
