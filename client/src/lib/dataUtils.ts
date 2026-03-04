import {
  Music,
  TrendingUp,
  Clock,
  Award,
  Sparkles,
  Heart,
  Trophy,
  Star,
  Calendar,
  PlaneTakeoff,
  MessageCircle,
  Phone,
  Footprints,
  Utensils,
  HeartCrack,
  Image as ImageIcon,
} from "lucide-react";

export interface StatSlide {
  type: "stat";
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  backgroundIndex?: number;
  customPhoto?: string; // Photo ID from uploaded photos
}

export interface TopRankingItem {
  rank: number;
  title: string;
  value: string | number;
  subtitle?: string;
}

export interface TopRankingSlide {
  type: "top-ranking";
  title: string;
  items: TopRankingItem[];
  icon?: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description?: string;
}

export interface TimelineSlide {
  type: "timeline";
  title: string;
  events: TimelineEvent[];
}

export interface PhotoCarouselSlide {
  type: "photo-carousel";
  title: string;
  subtitle?: string;
  photos: string[]; // Array of photo IDs
}

export type SlideData =
  | StatSlide
  | TopRankingSlide
  | TimelineSlide
  | PhotoCarouselSlide;

export interface PresentationData {
  title: string;
  subtitle: string;
  slides: SlideData[];
}

// Map icon names to Lucide React components
export const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, any> = {
    clock: Clock,
    music: Music,
    sparkles: Sparkles,
    trending: TrendingUp,
    heart: Heart,
    award: Award,
    trophy: Trophy,
    star: Star,
    calendar: Calendar,
    phone: Phone,
    plane: PlaneTakeoff,
    message: MessageCircle,
    image: ImageIcon,
    steps: Footprints,
    utensils: Utensils,
    heartbreak: HeartCrack,
  };

  return iconMap[iconName] || Sparkles;
};

// Background image URLs
export const backgroundImages = [
  "https://private-us-east-1.manuscdn.com/sessionFile/KxKLXfEYcB3KvVbxY6xAHt/sandbox/NN4psFdqTiJkTwKnmc1Dhu-img-1_1771442505000_na1fn_aGVyby1ncmFkaWVudC1tZXNo.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvS3hLTFhmRVljQjNLdlZieFk2eEFIdC9zYW5kYm94L05ONHBzRmRxVGlKa1R3S25tYzFEaHUtaW1nLTFfMTc3MTQ0MjUwNTAwMF9uYTFmbl9hR1Z5YnkxbmNtRmthV1Z1ZEMxdFpYTm8ucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=VFVxJ0PNf08DIJylisNVIGkz-q2BrHEkgpXwllUnK8aBgq4LyJEYzKb2tFKZnlaMVL51qBeUOcmi-Kr7oWMiu12RCwtGNR8uC2W8awKW-D98zrrLF3uDzcf6X6JcRF9jDvUE1ljc43ljlaG~fnm9rLeXcrSZ28fSPBzHw47Ivc7X7Nh9IadjWZEaSdJetFPlbabbKQX~TWHRqHo-FvAW77cXmiqYDmVvlxr9GKzn~VjC8E5EUcJi4oWSz9SQ05a2ywONI4Zs7oomlBCNhkk0fqtt6NW2PjOo5GlXGKXz6mQR2jHc3mMankDH5F4UYphAR7EESPAW~h2cfkqQkeKBNQ__",
  "https://private-us-east-1.manuscdn.com/sessionFile/KxKLXfEYcB3KvVbxY6xAHt/sandbox/NN4psFdqTiJkTwKnmc1Dhu-img-2_1771442489000_na1fn_c3RhdHMtY2FyZC1iZy0x.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvS3hLTFhmRVljQjNLdlZieFk2eEFIdC9zYW5kYm94L05ONHBzRmRxVGlKa1R3S25tYzFEaHUtaW1nLTJfMTc3MTQ0MjQ4OTAwMF9uYTFmbl9jM1JoZEhNdFkyRnlaQzFpWnkweC5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=U0xkEntYN-P94~jsDoMDT2oRs0n3ug76uPNrJHPTEZ1qoytxgmNjnT4rdJ9hHZKVRmeJSAbmRzywKSI1cVExfdiDk3whikL9O7asgIvih203Yv8ANda1h-dAf2WuqO9E9gGH30-6gbfEVYnpECIAV9bxt0apXx1H6eE2N1XI1kzQZXO~4zX7YCq9AUTYTAvoH7mncWXtJXe2X4BCz2IZdiWkB7VbMOP-YP8ddZFclWl8yW4UKV-jmTkxfusxGGBKiCB3~dVYTLvXnQhjV-uS0qI7HiqDAA~LfyOH6cParqfx3KOA3cD6BS4wUAyumEVTblrtQnYmaMbPafe08eM9UQ__",
  "https://private-us-east-1.manuscdn.com/sessionFile/KxKLXfEYcB3KvVbxY6xAHt/sandbox/NN4psFdqTiJkTwKnmc1Dhu-img-3_1771442493000_na1fn_c3RhdHMtY2FyZC1iZy0y.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvS3hLTFhmRVljQjNLdlZieFk2eEFIdC9zYW5kYm94L05ONHBzRmRxVGlKa1R3S25tYzFEaHUtaW1nLTNfMTc3MTQ0MjQ5MzAwMF9uYTFmbl9jM1JoZEhNdFkyRnlaQzFpWnkweS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=NS-wxbi2uOvL11thvbTzP1rhX4qzsPFbK1pWBHvDynT0mLcxnaqUfXzvdN9WJ3F7kFceIE1BKUtDURA735EY4iH5nITRkE4YAkegVzxd9MneBlsy0OWoKZHCaQyQTsrwOjL6~N9Jgf5AukOkhzKMnUe4-ZGtKC7Q~wRB983Mr2jmkGtUl904Jf~TXnzaJYQK71Hkz~Vh4yDJvN~UHRfjVyg0AxyUEuKJzA05rZFjIi9sjncZYx0HV5f4BSCf8tqPd0wiNWEngBnLf74OBeOLaULL5IQ2dZPuLDM1Ek5MYjLS72xl10bgP-OLJd8N2iNYLJHfFB1BVrgDZi8~B-h4Lw__",
  "https://private-us-east-1.manuscdn.com/sessionFile/KxKLXfEYcB3KvVbxY6xAHt/sandbox/NN4psFdqTiJkTwKnmc1Dhu-img-4_1771442486000_na1fn_c3RhdHMtY2FyZC1iZy0z.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvS3hLTFhmRVljQjNLdlZieFk2eEFIdC9zYW5kYm94L05ONHBzRmRxVGlKa1R3S25tYzFEaHUtaW1nLTRfMTc3MTQ0MjQ4NjAwMF9uYTFmbl9jM1JoZEhNdFkyRnlaQzFpWnkwei5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=N~yzEEK-GaMru79piVWCafdDzuvBY0YUl09wlmGJ3-5SE21kt-B-UAdDPsvEmnQytV0-Qdl9uAe-PofbdtWhV72xKbjRbw25S5gP6~mFuXY~pBUpR3EPeIpskMT-5L89T5218IEhiO8rJBAFzgn6q0tEBTTYJmfCcuzMNnBtfC3xDjikI-gu5x4KLSbz0rTvHCRRE~iEJAiHrMg8QOW6vhTE3GEhAVwuTGIZGA5NqjJoM2EEePFy7tsx7o4o9cX4MpFslQJhlRmgOt7WNhky8ZRO6t3Yt6h5A8Xn-ZNmk8IcNUJZEWpsAc23V8rzzAAOwItCIMaq00blrt1Tg9b~~A__",
];

export const getBackgroundImage = (index: number): string => {
  return backgroundImages[index] || backgroundImages[0];
};

// Default data for initial load
export const defaultData: PresentationData = {
  title: "Your Year in Stats",
  subtitle: "2024 Wrapped",
  slides: [
    {
      type: "stat",
      title: "Total Listening Time",
      value: "52,847",
      subtitle: "minutes of pure vibes",
      icon: "clock",
      backgroundIndex: 0,
    },
    {
      type: "stat",
      title: "Top Genre",
      value: "Indie Pop",
      subtitle: "You're a trendsetter",
      icon: "music",
      backgroundIndex: 1,
    },
    {
      type: "stat",
      title: "Songs Discovered",
      value: "1,247",
      subtitle: "New tracks added to your library",
      icon: "sparkles",
      backgroundIndex: 2,
    },
    {
      type: "stat",
      title: "Listening Streak",
      value: "287",
      subtitle: "consecutive days",
      icon: "trending",
      backgroundIndex: 3,
    },
    {
      type: "stat",
      title: "Most Played Song",
      value: "342",
      subtitle: "times you played 'Midnight Dreams'",
      icon: "heart",
      backgroundIndex: 1,
    },
  ],
};
