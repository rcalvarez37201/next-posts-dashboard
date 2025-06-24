import api from "@/services/api";
import { User } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Defines the shape of the state for the authentication feature.
 */
interface AuthState {
  users: User[];
  activeUser: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

/**
 * The initial state for the auth slice.
 */
const initialState: AuthState = {
  users: [],
  activeUser: null,
  status: "idle",
  error: null,
};

/**
 * An async thunk to fetch users from the JSONPlaceholder API.
 * This fetches all available users for the simulated login.
 */
export const fetchUsers = createAsyncThunk("auth/fetchUsers", async () => {
  const response = await api.get<User[]>("/users");
  return response.data;
});

/**
 * The Redux slice for managing authentication state.
 * It includes the active user selection and user management.
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Sets the active user for the simulated authentication.
     */
    setActiveUser: (state, action: PayloadAction<User>) => {
      state.activeUser = action.payload;
    },
    /**
     * Clears the active user (logout simulation).
     */
    clearActiveUser: (state) => {
      state.activeUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Something went wrong fetching users";
      });
  },
});

export const { setActiveUser, clearActiveUser } = authSlice.actions;
export default authSlice.reducer;
