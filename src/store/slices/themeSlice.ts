import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Defines the possible theme modes.
 */
export type ThemeMode = "light" | "dark";

/**
 * Defines the shape of the state for the theme feature.
 */
interface ThemeState {
  mode: ThemeMode;
}

/**
 * Gets the initial theme mode from localStorage or defaults to 'light'.
 */
const getInitialThemeMode = (): ThemeMode => {
  if (typeof window !== "undefined") {
    const savedMode = localStorage.getItem("themeMode") as ThemeMode;
    if (savedMode === "light" || savedMode === "dark") {
      return savedMode;
    }
  }
  return "light";
};

/**
 * The initial state for the theme slice.
 */
const initialState: ThemeState = {
  mode: getInitialThemeMode(),
};

/**
 * The Redux slice for managing theme state.
 * It includes actions for toggling between light and dark modes.
 */
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    /**
     * Toggles between light and dark theme modes.
     */
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        localStorage.setItem("themeMode", state.mode);
      }
    },
    /**
     * Sets a specific theme mode.
     */
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("themeMode", state.mode);
      }
    },
  },
});

export const { toggleTheme, setThemeMode } = themeSlice.actions;
export default themeSlice.reducer;
