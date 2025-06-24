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
}

/**
 * The initial state for the posts slice.
 */
const initialState: PostsState = {
  posts: [],
  status: "idle",
  error: null,
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
      });
  },
});

export default postsSlice.reducer;
