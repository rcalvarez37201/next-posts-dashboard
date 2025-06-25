const AVATAR_COLORS = [
  "#F44336", // red
  "#E91E63", // pink
  "#673AB7", // deep purple
  "#3F51B5", // indigo
  "#2196F3", // blue
  "#03A9F4", // light blue
  "#00BCD4", // cyan
  "#009688", // teal
  "#4CAF50", // green
  "#8BC34A", // light green
  "#CDDC39", // lime
  "#FFEB3B", // yellow
  "#FFC107", // amber
  "#FF9800", // orange
  "#FF5722", // deep orange
  "#795548", // brown
  "#9E9E9E", // gray
  "#607D8B", // blue gray
];

/**
 * Generates a consistent avatar color based on a username.
 * Uses a simple hash function to ensure the same username always gets the same color.
 *
 * @param username - The username to generate a color for
 * @returns A hex color string
 */
export function getAvatarColor(username: string): string {
  if (!username) return AVATAR_COLORS[0];

  // Limit the username length to 15 characters for consistency
  const limitedUsername = username.slice(0, 15);

  // Calculate a consistent index based on the username
  const hash = limitedUsername
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

/**
 * Extracts initials from a full name, taking the first letter of the first two words.
 * If only one word is provided, returns just that initial.
 * If no name is provided, returns a default "U" for "User".
 *
 * @param name - The full name to extract initials from
 * @returns A string with 1-2 uppercase initials
 *
 * @example
 * getInitials("John Doe") // returns "JD"
 * getInitials("Jane Smith Johnson") // returns "JS"
 * getInitials("Madonna") // returns "M"
 * getInitials("") // returns "U"
 */
export function getInitials(name: string): string {
  if (!name || name.trim().length === 0) {
    return "U"; // Default for empty names
  }

  // Split the name into words, filter out empty strings, and take first 2 words
  const words = name
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);

  if (words.length === 0) {
    return "U";
  }

  // Take the first letter of the first word
  let initials = words[0].charAt(0).toUpperCase();

  // If there's a second word, add its first letter
  if (words.length > 1) {
    initials += words[1].charAt(0).toUpperCase();
  }

  return initials;
}

/**
 * Truncates a string to a maximum length and adds ellipsis if needed.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
}

/**
 * Generates an array of vibrant colors for photo placeholders
 */
const PLACEHOLDER_COLORS = [
  "FF6B6B", // Coral Red
  "4ECDC4", // Teal
  "45B7D1", // Sky Blue
  "96CEB4", // Mint Green
  "FECA57", // Sunny Yellow
  "FF9FF3", // Pink
  "54A0FF", // Bright Blue
  "5F27CD", // Purple
  "FF6348", // Orange Red
  "1DD1A1", // Green
  "F0932B", // Orange
  "EB4D4B", // Red
  "6C5CE7", // Lavender
  "FDA7DF", // Light Pink
  "A3CB38", // Lime Green
];

/**
 * Generates a consistent color based on photo ID
 */
export function getPhotoColor(photoId: number): string {
  return PLACEHOLDER_COLORS[photoId % PLACEHOLDER_COLORS.length];
}

/**
 * Extracts hex color from JSONPlaceholder photo URL
 * URLs are like: https://via.placeholder.com/600/92c952
 */
export function extractColorFromPhotoUrl(url: string): string {
  const match = url.match(/\/([a-fA-F0-9]{6})(?:\/|$)/);
  return match ? match[1] : getPhotoColor(1); // fallback to generated color
}
