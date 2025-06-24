import api from "@/services/api";
import { Post } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Defines the shape of the state for the posts feature.
 */
interface PostsState {
  posts: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  deleteStatus: "idle" | "loading" | "succeeded" | "failed";
}

/**
 * The initial state for the posts slice.
 */
const initialState: PostsState = {
  posts: [],
  status: "idle",
  error: null,
  deleteStatus: "idle",
};

/**
 * An async thunk to fetch posts from the JSONPlaceholder API.
 * This handles the asynchronous logic of the API request.
 */
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await api.get<Post[]>("/posts");
  return response.data;
});

/**
 * An async thunk to fetch posts for a specific user from the JSONPlaceholder API.
 * This handles the asynchronous logic of the API request using the user-specific endpoint.
 */
export const fetchPostsByUser = createAsyncThunk(
  "posts/fetchPostsByUser",
  async (userId: number, { dispatch, rejectWithValue }) => {
    try {
      console.log(`🔄 Fetching posts for user ID: ${userId}`);
      const response = await api.get<Post[]>(`/users/${userId}/posts`);

      // Import here to avoid circular dependency
      const { showNotification } = await import("./notificationsSlice");

      dispatch(
        showNotification({
          message: `${response.data.length} posts have been loaded successfully.`,
          severity: "info",
          autoHideDuration: 3000,
        })
      );

      return response.data;
    } catch (error) {
      const { showNotification } = await import("./notificationsSlice");

      dispatch(
        showNotification({
          message: "Error loading posts. Please try again.",
          severity: "error",
          autoHideDuration: 5000,
        })
      );

      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

/**
 * An async thunk for deleting a post that shows notifications.
 */
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (post: Post, { dispatch, rejectWithValue }) => {
    try {
      console.log(`🗑️ Deleting post ID: ${post.id}`);
      await api.delete(`/posts/${post.id}`);

      // Import here to avoid circular dependency
      const { showNotification } = await import("./notificationsSlice");

      dispatch(
        showNotification({
          message: `Post #${post.id}: "${post.title}" has been deleted successfully.`,
          severity: "success",
          autoHideDuration: 3000,
        })
      );

      return post.id;
    } catch (error) {
      const { showNotification } = await import("./notificationsSlice");

      dispatch(
        showNotification({
          message: "Error deleting post. Please try again.",
          severity: "error",
          autoHideDuration: 5000,
        })
      );

      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

/**
 * An async thunk for deleting multiple posts that shows notifications.
 */
export const deleteMultiplePosts = createAsyncThunk(
  "posts/deleteMultiplePosts",
  async (postIds: number[], { dispatch, rejectWithValue }) => {
    try {
      console.log(`🗑️ Deleting ${postIds.length} posts:`, postIds);

      // Delete all posts in parallel
      const deletePromises = postIds.map((postId) =>
        api.delete(`/posts/${postId}`)
      );

      await Promise.all(deletePromises);

      // Import here to avoid circular dependency
      const { showNotification } = await import("./notificationsSlice");

      dispatch(
        showNotification({
          message: `${postIds.length} posts have been deleted successfully.`,
          severity: "success",
          autoHideDuration: 3000,
        })
      );

      return postIds;
    } catch (error) {
      const { showNotification } = await import("./notificationsSlice");

      dispatch(
        showNotification({
          message: "Error deleting posts. Please try again.",
          severity: "error",
          autoHideDuration: 5000,
        })
      );

      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

/**
 * The Redux slice for managing posts state.
 * It includes reducers for handling the different states of the `fetchPosts` async thunk.
 */
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(fetchPostsByUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchPostsByUser.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.status = "succeeded";
          state.posts = action.payload;
        }
      )
      .addCase(fetchPostsByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(deletePost.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.deleteStatus = "succeeded";
        // Remove the deleted post from the current posts array
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error =
          action.error.message || "Something went wrong deleting the post";
      })
      .addCase(deleteMultiplePosts.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(
        deleteMultiplePosts.fulfilled,
        (state, action: PayloadAction<number[]>) => {
          state.deleteStatus = "succeeded";
          // Remove the deleted posts from the current posts array
          state.posts = state.posts.filter(
            (post) => !action.payload.includes(post.id)
          );
        }
      )
      .addCase(deleteMultiplePosts.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error =
          action.error.message || "Something went wrong deleting the posts";
      });
  },
});

export default postsSlice.reducer;
