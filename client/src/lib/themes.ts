export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
  };
  fonts: {
    display: string;
    stats: string;
    body: string;
  };
  gradients: {
    intro: string;
    finale: string;
  };
  cardStyle: {
    background: string;
    blur: string;
    border: string;
  };
  animation: {
    type: "spring" | "smooth" | "energetic";
    duration: number;
  };
}

export const themes: Theme[] = [
  {
    id: "vaporwave",
    name: "Vaporwave Dreams",
    description: "Retro-futuristic with holographic gradients",
    colors: {
      primary: "#FF6EC7",
      secondary: "#00F0FF",
      accent: "#FFD700",
      text: "#FFFFFF",
    },
    fonts: {
      display: "Righteous",
      stats: "Orbitron",
      body: "DM Sans",
    },
    gradients: {
      intro: "from-purple-900 via-pink-800 to-cyan-900",
      finale: "from-pink-900 via-purple-900 to-indigo-900",
    },
    cardStyle: {
      background: "bg-black/30 backdrop-blur-xl",
      blur: "backdrop-blur-xl",
      border: "border border-white/20",
    },
    animation: {
      type: "spring",
      duration: 0.6,
    },
  },
  {
    id: "minimal",
    name: "Minimal Elegance",
    description: "Clean, sophisticated, and timeless",
    colors: {
      primary: "#000000",
      secondary: "#666666",
      accent: "#FF4444",
      text: "#000000",
    },
    fonts: {
      display: "Playfair Display",
      stats: "Space Mono",
      body: "Inter",
    },
    gradients: {
      intro: "from-gray-50 via-white to-gray-100",
      finale: "from-gray-100 via-gray-50 to-white",
    },
    cardStyle: {
      background: "bg-white",
      blur: "",
      border: "border-2 border-black",
    },
    animation: {
      type: "smooth",
      duration: 0.4,
    },
  },
  {
    id: "neon",
    name: "Neon Nights",
    description: "Electric colors with cyberpunk vibes",
    colors: {
      primary: "#00FF41",
      secondary: "#FF00FF",
      accent: "#00D9FF",
      text: "#FFFFFF",
    },
    fonts: {
      display: "Audiowide",
      stats: "Electrolize",
      body: "Rajdhani",
    },
    gradients: {
      intro: "from-black via-purple-950 to-black",
      finale: "from-black via-green-950 to-black",
    },
    cardStyle: {
      background: "bg-black/80 backdrop-blur-md",
      blur: "backdrop-blur-md",
      border: "border-2 border-green-400 shadow-[0_0_20px_rgba(0,255,65,0.5)]",
    },
    animation: {
      type: "energetic",
      duration: 0.3,
    },
  },
  {
    id: "pastel",
    name: "Pastel Paradise",
    description: "Soft, dreamy, and whimsical",
    colors: {
      primary: "#FFB3D9",
      secondary: "#B3E5FC",
      accent: "#FFF9C4",
      text: "#5D4E6D",
    },
    fonts: {
      display: "Pacifico",
      stats: "Quicksand",
      body: "Nunito",
    },
    gradients: {
      intro: "from-pink-200 via-purple-200 to-blue-200",
      finale: "from-blue-200 via-pink-200 to-yellow-200",
    },
    cardStyle: {
      background: "bg-white/80 backdrop-blur-lg",
      blur: "backdrop-blur-lg",
      border: "border-2 border-purple-300 shadow-lg",
    },
    animation: {
      type: "smooth",
      duration: 0.5,
    },
  },
  {
    id: "brutalist",
    name: "Brutalist Bold",
    description: "Raw, bold, and unapologetic",
    colors: {
      primary: "#FF0000",
      secondary: "#000000",
      accent: "#FFFF00",
      text: "#000000",
    },
    fonts: {
      display: "Bebas Neue",
      stats: "Anton",
      body: "Roboto Condensed",
    },
    gradients: {
      intro: "from-white via-gray-200 to-white",
      finale: "from-red-100 via-white to-yellow-100",
    },
    cardStyle: {
      background: "bg-white",
      blur: "",
      border: "border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
    },
    animation: {
      type: "energetic",
      duration: 0.2,
    },
  },
];

export const getTheme = (themeId: string): Theme => {
  return themes.find((t) => t.id === themeId) || themes[0];
};

// Generate font import URLs for Google Fonts
export const getFontImports = (theme: Theme): string => {
  const fonts = [theme.fonts.display, theme.fonts.stats, theme.fonts.body];
  const uniqueFonts = Array.from(new Set(fonts));
  const fontParams = uniqueFonts
    .map((font) => font.replace(/ /g, "+") + ":wght@400;500;600;700")
    .join("&family=");
  return `https://fonts.googleapis.com/css2?family=${fontParams}&display=swap`;
};
