import type { PresentationData } from "./dataUtils";
import type { Theme } from "./themes";

/**
 * Encode presentation data to URL-safe base64 string
 */
export function encodeDataToUrl(data: PresentationData, theme?: Theme): string {
  const payload = {
    data,
    themeId: theme?.id,
  };
  
  const jsonString = JSON.stringify(payload);
  const base64 = btoa(jsonString);
  // Make URL-safe by replacing characters
  const urlSafe = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  
  return urlSafe;
}

/**
 * Decode presentation data from URL parameter
 */
export function decodeDataFromUrl(encoded: string): { data: PresentationData; themeId?: string } | null {
  try {
    // Restore base64 format
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    // Add padding if needed
    while (base64.length % 4) {
      base64 += '=';
    }
    
    const jsonString = atob(base64);
    const payload = JSON.parse(jsonString);
    
    return payload;
  } catch (error) {
    console.error('Failed to decode URL data:', error);
    return null;
  }
}

/**
 * Generate shareable URL with encoded data
 */
export function generateShareableUrl(data: PresentationData, theme?: Theme): string {
  const encoded = encodeDataToUrl(data, theme);
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?share=${encoded}`;
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
}