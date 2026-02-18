/* Kinetic Maximalism: Full Spotify Wrapped-style stats presentation with playful animations */

import { AnimatePresence, motion } from "framer-motion";
import { Music, TrendingUp, Clock, Award, Sparkles, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import ConfettiEffect from "@/components/ConfettiEffect";
import NavigationControls from "@/components/NavigationControls";
import ProgressIndicator from "@/components/ProgressIndicator";
import StatsCard from "@/components/StatsCard";
import StatsSlide from "@/components/StatsSlide";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // Sample data - users can customize this
  const slides = [
    {
      type: "intro",
      title: "Your Year in Stats",
      subtitle: "2024 Wrapped",
    },
    {
      type: "stat",
      title: "Total Listening Time",
      value: "52,847",
      subtitle: "minutes of pure vibes",
      icon: <Clock className="w-16 h-16 text-cyan-400" />,
      backgroundImage: "https://private-us-east-1.manuscdn.com/sessionFile/KxKLXfEYcB3KvVbxY6xAHt/sandbox/NN4psFdqTiJkTwKnmc1Dhu-img-1_1771442505000_na1fn_aGVyby1ncmFkaWVudC1tZXNo.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvS3hLTFhmRVljQjNLdlZieFk2eEFIdC9zYW5kYm94L05ONHBzRmRxVGlKa1R3S25tYzFEaHUtaW1nLTFfMTc3MTQ0MjUwNTAwMF9uYTFmbl9hR1Z5YnkxbmNtRmthV1Z1ZEMxdFpYTm8ucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=VFVxJ0PNf08DIJylisNVIGkz-q2BrHEkgpXwllUnK8aBgq4LyJEYzKb2tFKZnlaMVL51qBeUOcmi-Kr7oWMiu12RCwtGNR8uC2W8awKW-D98zrrLF3uDzcf6X6JcRF9jDvUE1ljc43ljlaG~fnm9rLeXcrSZ28fSPBzHw47Ivc7X7Nh9IadjWZEaSdJetFPlbabbKQX~TWHRqHo-FvAW77cXmiqYDmVvlxr9GKzn~VjC8E5EUcJi4oWSz9SQ05a2ywONI4Zs7oomlBCNhkk0fqtt6NW2PjOo5GlXGKXz6mQR2jHc3mMankDH5F4UYphAR7EESPAW~h2cfkqQkeKBNQ__",
    },
    {
      type: "stat",
      title: "Top Genre",
      value: "Indie Pop",
      subtitle: "You're a trendsetter",
      icon: <Music className="w-16 h-16 text-pink-400" />,
      backgroundImage: "https://private-us-east-1.manuscdn.com/sessionFile/KxKLXfEYcB3KvVbxY6xAHt/sandbox/NN4psFdqTiJkTwKnmc1Dhu-img-2_1771442489000_na1fn_c3RhdHMtY2FyZC1iZy0x.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvS3hLTFhmRVljQjNLdlZieFk2eEFIdC9zYW5kYm94L05ONHBzRmRxVGlKa1R3S25tYzFEaHUtaW1nLTJfMTc3MTQ0MjQ4OTAwMF9uYTFmbl9jM1JoZEhNdFkyRnlaQzFpWnkweC5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=U0xkEntYN-P94~jsDoMDT2oRs0n3ug76uPNrJHPTEZ1qoytxgmNjnT4rdJ9hHZKVRmeJSAbmRzywKSI1cVExfdiDk3whikL9O7asgIvih203Yv8ANda1h-dAf2WuqO9E9gGH30-6gbfEVYnpECIAV9bxt0apXx1H6eE2N1XI1kzQZXO~4zX7YCq9AUTYTAvoH7mncWXtJXe2X4BCz2IZdiWkB7VbMOP-YP8ddZFclWl8yW4UKV-jmTkxfusxGGBKiCB3~dVYTLvXnQhjV-uS0qI7HiqDAA~LfyOH6cParqfx3KOA3cD6BS4wUAyumEVTblrtQnYmaMbPafe08eM9UQ__",
    },
    {
      type: "stat",
      title: "Songs Discovered",
      value: "1,247",
      subtitle: "New tracks added to your library",
      icon: <Sparkles className="w-16 h-16 text-yellow-400" />,
      backgroundImage: "https://private-us-east-1.manuscdn.com/sessionFile/KxKLXfEYcB3KvVbxY6xAHt/sandbox/NN4psFdqTiJkTwKnmc1Dhu-img-3_1771442493000_na1fn_c3RhdHMtY2FyZC1iZy0y.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvS3hLTFhmRVljQjNLdlZieFk2eEFIdC9zYW5kYm94L05ONHBzRmRxVGlKa1R3S25tYzFEaHUtaW1nLTNfMTc3MTQ0MjQ5MzAwMF9uYTFmbl9jM1JoZEhNdFkyRnlaQzFpWnkweS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=NS-wxbi2uOvL11thvbTzP1rhX4qzsPFbK1pWBHvDynT0mLcxnaqUfXzvdN9WJ3F7kFceIE1BKUtDURA735EY4iH5nITRkE4YAkegVzxd9MneBlsy0OWoKZHCaQyQTsrwOjL6~N9Jgf5AukOkhzKMnUe4-ZGtKC7Q~wRB983Mr2jmkGtUl904Jf~TXnzaJYQK71Hkz~Vh4yDJvN~UHRfjVyg0AxyUEuKJzA05rZFjIi9sjncZYx0HV5f4BSCf8tqPd0wiNWEngBnLf74OBeOLaULL5IQ2dZPuLDM1Ek5MYjLS72xl10bgP-OLJd8N2iNYLJHfFB1BVrgDZi8~B-h4Lw__",
    },
    {
      type: "stat",
      title: "Listening Streak",
      value: "287",
      subtitle: "consecutive days",
      icon: <TrendingUp className="w-16 h-16 text-green-400" />,
      backgroundImage: "https://private-us-east-1.manuscdn.com/sessionFile/KxKLXfEYcB3KvVbxY6xAHt/sandbox/NN4psFdqTiJkTwKnmc1Dhu-img-4_1771442486000_na1fn_c3RhdHMtY2FyZC1iZy0z.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvS3hLTFhmRVljQjNLdlZieFk2eEFIdC9zYW5kYm94L05ONHBzRmRxVGlKa1R3S25tYzFEaHUtaW1nLTRfMTc3MTQ0MjQ4NjAwMF9uYTFmbl9jM1JoZEhNdFkyRnlaQzFpWnkwei5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=N~yzEEK-GaMru79piVWCafdDzuvBY0YUl09wlmGJ3-5SE21kt-B-UAdDPsvEmnQytV0-Qdl9uAe-PofbdtWhV72xKbjRbw25S5gP6~mFuXY~pBUpR3EPeIpskMT-5L89T5218IEhiO8rJBAFzgn6q0tEBTTYJmfCcuzMNnBtfC3xDjikI-gu5x4KLSbz0rTvHCRRE~iEJAiHrMg8QOW6vhTE3GEhAVwuTGIZGA5NqjJoM2EEePFy7tsx7o4o9cX4MpFslQJhlRmgOt7WNhky8ZRO6t3Yt6h5A8Xn-ZNmk8IcNUJZEWpsAc23V8rzzAAOwItCIMaq00blrt1Tg9b~~A__",
    },
    {
      type: "stat",
      title: "Most Played Song",
      value: "342",
      subtitle: "times you played 'Midnight Dreams'",
      icon: <Heart className="w-16 h-16 text-red-400" />,
      backgroundImage: "https://private-us-east-1.manuscdn.com/sessionFile/KxKLXfEYcB3KvVbxY6xAHt/sandbox/NN4psFdqTiJkTwKnmc1Dhu-img-2_1771442489000_na1fn_c3RhdHMtY2FyZC1iZy0x.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvS3hLTFhmRVljQjNLdlZieFk2eEFIdC9zYW5kYm94L05ONHBzRmRxVGlKa1R3S25tYzFEaHUtaW1nLTJfMTc3MTQ0MjQ4OTAwMF9uYTFmbl9jM1JoZEhNdFkyRnlaQzFpWnkweC5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=U0xkEntYN-P94~jsDoMDT2oRs0n3ug76uPNrJHPTEZ1qoytxgmNjnT4rdJ9hHZKVRmeJSAbmRzywKSI1cVExfdiDk3whikL9O7asgIvih203Yv8ANda1h-dAf2WuqO9E9gGH30-6gbfEVYnpECIAV9bxt0apXx1H6eE2N1XI1kzQZXO~4zX7YCq9AUTYTAvoH7mncWXtJXe2X4BCz2IZdiWkB7VbMOP-YP8ddZFclWl8yW4UKV-jmTkxfusxGGBKiCB3~dVYTLvXnQhjV-uS0qI7HiqDAA~LfyOH6cParqfx3KOA3cD6BS4wUAyumEVTblrtQnYmaMbPafe08eM9UQ__",
    },
    {
      type: "finale",
      title: "You're Incredible!",
      subtitle: "Thanks for an amazing year of music",
    },
  ];

  const totalSlides = slides.length;

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
  }, [currentSlide]);

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

  const renderSlide = (slide: typeof slides[0], index: number) => {
    if (slide.type === "intro") {
      return (
        <StatsSlide key={index} backgroundGradient="from-purple-900 via-pink-800 to-cyan-900">
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
              {slide.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-stats text-3xl md:text-5xl text-white/90 drop-shadow-lg"
            >
              {slide.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                onClick={handleNext}
                size="lg"
                className="mt-8 px-12 py-6 text-xl font-display bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:scale-110 transition-transform"
              >
                Let's Go! ✨
              </Button>
            </motion.div>
          </div>
        </StatsSlide>
      );
    }

    if (slide.type === "finale") {
      return (
        <StatsSlide key={index} backgroundGradient="from-pink-900 via-purple-900 to-indigo-900">
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
              {slide.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-body text-2xl md:text-4xl text-white/90 drop-shadow-lg max-w-3xl"
            >
              {slide.subtitle}
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

    return (
      <StatsSlide key={index} backgroundImage={slide.backgroundImage}>
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="max-w-2xl w-full">
            <StatsCard
              title={slide.title}
              value={slide.value!}
              subtitle={slide.subtitle}
              icon={slide.icon}
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
        {renderSlide(slides[currentSlide], currentSlide)}
      </AnimatePresence>

      <ConfettiEffect trigger={showConfetti} />
    </div>
  );
}
