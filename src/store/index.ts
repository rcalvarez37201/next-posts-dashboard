import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import commentsReducer from "./slices/commentsSlice";
import notificationsReducer from "./slices/notificationsSlice";
import postsReducer from "./slices/postsSlice";
import themeReducer from "./slices/themeSlice";
import todosReducer from "./slices/todosSlice";
import albumsReducer from "./slices/albumsSlice";

/**
 * The main Redux store for the application.
 * It combines all the reducers from the different slices.
 */
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    theme: themeReducer,
    notifications: notificationsReducer,
    comments: commentsReducer,
    todos: todosReducer,
    albums: albumsReducer,
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
