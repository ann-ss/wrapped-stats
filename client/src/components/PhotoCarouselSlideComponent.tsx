import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import type { PhotoCarouselSlide } from "@/lib/dataUtils";
import type { Theme } from "@/lib/themes";

interface PhotoCarouselSlideProps {
  data: PhotoCarouselSlide;
  theme: Theme;
  uploadedPhotos: Record<string, string>;
}

export default function PhotoCarouselSlideComponent({
  data,
  theme,
  uploadedPhotos,
}: PhotoCarouselSlideProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const photos = data.photos
    .map((photoId) => uploadedPhotos[photoId])
    .filter(Boolean);

  const handlePrevious = () => {
    setCurrentPhotoIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const handleNext = () => {
    setCurrentPhotoIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h2
            className="text-4xl md:text-6xl font-bold mb-2"
            style={{
              fontFamily: theme.fonts.display,
              color: theme.colors.primary,
            }}
          >
            {data.title}
          </h2>
          {data.subtitle && (
            <p
              className="text-xl md:text-2xl"
              style={{
                fontFamily: theme.fonts.body,
                color: theme.colors.secondary,
              }}
            >
              {data.subtitle}
            </p>
          )}
        </motion.div>

        {/* Carousel */}
        {photos.length > 0 ? (
          <div className="relative">
            {/* Photo Display */}
            <div 
              className="relative rounded-3xl overflow-hidden flex items-center justify-center"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                minHeight: '400px',
                maxHeight: '70vh'
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentPhotoIndex}
                  src={photos[currentPhotoIndex]}
                  alt={`Photo ${currentPhotoIndex + 1}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              </AnimatePresence>

              {/* Navigation Buttons */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={handlePrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Photo Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
                {currentPhotoIndex + 1} / {photos.length}
              </div>
            </div>

            {/* Thumbnail Dots */}
            {photos.length > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {photos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPhotoIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentPhotoIndex
                        ? "w-8"
                        : "opacity-50 hover:opacity-75"
                    }`}
                    style={{
                      backgroundColor:
                        index === currentPhotoIndex
                          ? theme.colors.primary
                          : theme.colors.secondary,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div
            className={`${theme.cardStyle.background} ${theme.cardStyle.border} rounded-3xl p-12 text-center`}
          >
            <ImageIcon
              className="w-24 h-24 mx-auto mb-4 opacity-50"
              style={{ color: theme.colors.secondary }}
            />
            <p
              className="text-lg"
              style={{
                fontFamily: theme.fonts.body,
                color: theme.colors.secondary,
              }}
            >
              No photos available for this slide
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
