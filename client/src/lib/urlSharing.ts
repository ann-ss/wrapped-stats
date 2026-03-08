import type { PresentationData } from "./dataUtils";
import type { Theme } from "./themes";

/**
 * Unicode-safe base64 encode: converts the string to UTF-8 bytes first,
 * then base64-encodes them. This prevents btoa() from throwing on any
 * characters outside the Latin-1 range (accented letters, emoji, etc.).
 */
function toBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

/**
 * Unicode-safe base64 decode: reverses toBase64().
 */
function fromBase64(b64: string): string {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

/**
 * Encode presentation data to a URL-safe base64 string.
 */
export function encodeDataToUrl(data: PresentationData, theme?: Theme): string {
  const payload = {
    data,
    themeId: theme?.id,
  };

  const jsonString = JSON.stringify(payload);
  const base64 = toBase64(jsonString);
  // Make URL-safe: replace + → -, / → _, strip padding =
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

/**
 * Decode presentation data from a URL parameter produced by encodeDataToUrl().
 */
export function decodeDataFromUrl(
  encoded: string
): { data: PresentationData; themeId?: string } | null {
  try {
    // Restore standard base64 format
    let base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    // Re-add padding
    while (base64.length % 4) {
      base64 += "=";
    }

    const jsonString = fromBase64(base64);
    const payload = JSON.parse(jsonString);
    return payload;
  } catch (error) {
    console.error("Failed to decode URL data:", error);
    return null;
  }
}

/**
 * Generate a shareable URL for the current presentation.
 *
 * Uses window.location.origin + window.location.pathname so the URL is
 * always correct regardless of whether the app is hosted at the root
 * (Manus) or under a sub-path (GitHub Pages /wrapped-stats/).
 */
export function generateShareableUrl(
  data: PresentationData,
  theme?: Theme
): string {
  const encoded = encodeDataToUrl(data, theme);
  // Strip any trailing slash from pathname for consistency
  const basePath = (window.location.origin + window.location.pathname).replace(
    /\/$/,
    ""
  );
  return `${basePath}?share=${encoded}`;
}

/**
 * Copy text to clipboard with a textarea fallback for older browsers.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return true;
    } catch {
      document.body.removeChild(textArea);
      return false;
    }
  }
}
