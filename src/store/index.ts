import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/postsSlice";

/**
 * The main Redux store for the application.
 * It combines all the reducers from the different slices.
 */
export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

/**
 * The type representing the entire state of the Redux store.
 * Inferred from the store itself.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * The type for the dispatch function of the Redux store.
 * Used for dispatching actions, including thunks.
 */
export type AppDispatch = typeof store.dispatch;
