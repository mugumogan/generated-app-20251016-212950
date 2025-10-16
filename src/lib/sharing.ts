export interface ShareableState {
  appId: string;
  configuration: Record<string, any>;
  selectedFeatures: string[];
}
/**
 * Encodes the application state into a URL-safe Base64 string.
 * @param state The state object to encode.
 * @returns A URL-safe Base64 string.
 */
export function encodeState(state: ShareableState): string {
  try {
    const jsonString = JSON.stringify(state);
    // Use btoa for simplicity in browser environments.
    // For server-side or more robust encoding, consider Buffer.
    return btoa(jsonString);
  } catch (error) {
    console.error("Failed to encode state:", error);
    return "";
  }
}
/**
 * Decodes a URL-safe Base64 string back into the application state.
 * @param encodedState The Base64 string to decode.
 * @returns The decoded state object or null if decoding fails.
 */
export function decodeState(encodedState: string): ShareableState | null {
  try {
    const jsonString = atob(encodedState);
    const state = JSON.parse(jsonString);
    // Basic validation to ensure the decoded object has the expected shape
    if (state && typeof state.appId === 'string' && typeof state.configuration === 'object' && Array.isArray(state.selectedFeatures)) {
      return state as ShareableState;
    }
    return null;
  } catch (error) {
    console.error("Failed to decode state:", error);
    return null;
  }
}