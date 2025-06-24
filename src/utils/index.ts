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
