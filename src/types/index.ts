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

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface Album {
  id: number;
  userId: number;
  title: string;
}

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

/**
 * Defines the different views available in the SPA.
 * Used for state-based navigation instead of routing.
 */
export type AppView = "posts" | "profile" | "postDetails";
