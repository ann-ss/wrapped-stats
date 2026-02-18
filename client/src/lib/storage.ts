import type { PresentationData } from "./dataUtils";
import type { Theme } from "./themes";

const STORAGE_KEYS = {
  PRESENTATION_DATA: "wrapped-stats-presentation-data",
  THEME: "wrapped-stats-theme",
  CUSTOM_THEMES: "wrapped-stats-custom-themes",
  UPLOADED_PHOTOS: "wrapped-stats-uploaded-photos",
} as const;

// Save presentation data to local storage
export function savePresentationData(data: PresentationData): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PRESENTATION_DATA, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save presentation data:", error);
  }
}

// Load presentation data from local storage
export function loadPresentationData(): PresentationData | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PRESENTATION_DATA);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to load presentation data:", error);
    return null;
  }
}

// Clear presentation data from local storage
export function clearPresentationData(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.PRESENTATION_DATA);
  } catch (error) {
    console.error("Failed to clear presentation data:", error);
  }
}

// Save current theme to local storage
export function saveTheme(theme: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(theme));
  } catch (error) {
    console.error("Failed to save theme:", error);
  }
}

// Load theme from local storage
export function loadTheme(): Theme | null {
  try {
    const theme = localStorage.getItem(STORAGE_KEYS.THEME);
    return theme ? JSON.parse(theme) : null;
  } catch (error) {
    console.error("Failed to load theme:", error);
    return null;
  }
}

// Save custom themes to local storage
export function saveCustomThemes(themes: Theme[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_THEMES, JSON.stringify(themes));
  } catch (error) {
    console.error("Failed to save custom themes:", error);
  }
}

// Load custom themes from local storage
export function loadCustomThemes(): Theme[] {
  try {
    const themes = localStorage.getItem(STORAGE_KEYS.CUSTOM_THEMES);
    return themes ? JSON.parse(themes) : [];
  } catch (error) {
    console.error("Failed to load custom themes:", error);
    return [];
  }
}

// Save uploaded photos to local storage (as base64)
export function saveUploadedPhotos(photos: Record<string, string>): void {
  try {
    localStorage.setItem(STORAGE_KEYS.UPLOADED_PHOTOS, JSON.stringify(photos));
  } catch (error) {
    console.error("Failed to save uploaded photos:", error);
  }
}

// Load uploaded photos from local storage
export function loadUploadedPhotos(): Record<string, string> {
  try {
    const photos = localStorage.getItem(STORAGE_KEYS.UPLOADED_PHOTOS);
    return photos ? JSON.parse(photos) : {};
  } catch (error) {
    console.error("Failed to load uploaded photos:", error);
    return {};
  }
}

// Add a single uploaded photo
export function addUploadedPhoto(id: string, dataUrl: string): void {
  const photos = loadUploadedPhotos();
  photos[id] = dataUrl;
  saveUploadedPhotos(photos);
}

// Remove a single uploaded photo
export function removeUploadedPhoto(id: string): void {
  const photos = loadUploadedPhotos();
  delete photos[id];
  saveUploadedPhotos(photos);
}

// Clear all uploaded photos
export function clearUploadedPhotos(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.UPLOADED_PHOTOS);
  } catch (error) {
    console.error("Failed to clear uploaded photos:", error);
  }
}

// Clear all stored data
export function clearAllData(): void {
  clearPresentationData();
  clearUploadedPhotos();
}
