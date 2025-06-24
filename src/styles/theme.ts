import { createTheme, ThemeOptions } from "@mui/material/styles";

/**
 * Base theme configuration shared between light and dark themes.
 */
const baseTheme: ThemeOptions = {
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h3: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
};

/**
 * Light theme configuration using updated custom palette.
 */
export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "light",
    primary: {
      main: "#673AB7", // Deep Purple 500
      dark: "#512DA8", // Deep Purple 700
      light: "#9575CD", // Deep Purple 300
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FF4081", // Pink A200
      light: "#FF80AB", // Pink A100
      dark: "#F50057", // Pink A400
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FAFAFA", // Grey 50
      paper: "#FFFFFF",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
    success: {
      main: "#7CB342", // Light Green 600
      light: "#8BC34A",
      dark: "#689F38",
    },
    error: {
      main: "#F44336", // Red 500
      light: "#EF5350",
      dark: "#D32F2F",
    },
    // Custom accent color
    info: {
      main: "#18FFFF", // Cyan A200 (used as accent)
      light: "#84FFFF",
      dark: "#00E5FF",
    },
  },
});

/**
 * Dark theme configuration using updated custom palette.
 */
export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "dark",
    primary: {
      main: "#B39DDB", // Deep Purple 200
      dark: "#9575CD", // Deep Purple 400
      light: "#D1C4E9", // Deep Purple 100
      contrastText: "#000000",
    },
    secondary: {
      main: "#FF80AB", // Pink A100
      light: "#FFB3BA", // Lighter pink
      dark: "#FF4081", // Pink A200
      contrastText: "#000000",
    },
    background: {
      default: "#121212", // Material Dark default
      paper: "#1E1E1E", // Material Dark surface
    },
    text: {
      primary: "#FAFAFA", // Almost white
      secondary: "#BDBDBD", // Grey 400
    },
    success: {
      main: "#9CCC65", // Light Green 400
      light: "#AED581",
      dark: "#8BC34A",
    },
    error: {
      main: "#E57373", // Red 300
      light: "#EF9A9A",
      dark: "#EF5350",
    },
    // Custom accent color
    info: {
      main: "#84FFFF", // Cyan A100 (used as accent)
      light: "#B2FEFA",
      dark: "#18FFFF",
    },
  },
});
