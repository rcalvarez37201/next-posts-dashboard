import api from "@/services/api";
import { Comment } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Defines the shape of the state for the comments feature.
 */
interface CommentsState {
  comments: Comment[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentPostId: number | null;
}

/**
 * The initial state for the comments slice.
 */
const initialState: CommentsState = {
  comments: [],
  status: "idle",
  error: null,
  currentPostId: null,
};

/**
 * An async thunk to fetch comments for a specific post from the JSONPlaceholder API.
 */
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postId: number) => {
    const response = await api.get<Comment[]>(`/posts/${postId}/comments`);
    return { comments: response.data, postId };
  }
);

/**
 * The Redux slice for managing comments state.
 */
const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    /**
     * Clears all comments from the state.
     */
    clearComments: (state) => {
      state.comments = [];
      state.currentPostId = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchComments.fulfilled,
        (
          state,
          action: PayloadAction<{ comments: Comment[]; postId: number }>
        ) => {
          state.status = "succeeded";
          state.comments = action.payload.comments;
          state.currentPostId = action.payload.postId;
        }
      )
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Something went wrong fetching comments";
      });
  },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
