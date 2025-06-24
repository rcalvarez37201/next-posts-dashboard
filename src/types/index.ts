// src/types/index.ts

/**
 * Represents a blog post from the JSONPlaceholder API
 * @interface Post
 * @property {number} id - Unique identifier for the post
 * @property {number} userId - ID of the user who created the post
 * @property {string} title - Title of the blog post
 * @property {string} body - Main content/body of the blog post
 */
export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}
