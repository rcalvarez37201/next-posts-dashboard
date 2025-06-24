import { useAppSelector } from "@/store/hooks";
import { darkTheme, lightTheme } from "@/styles/theme";
import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * A custom theme provider that wraps the application with the appropriate
 * Material-UI theme based on the current theme mode from Redux state.
 */
const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const themeMode = useAppSelector((state) => state.theme.mode);
  const theme = themeMode === "light" ? lightTheme : darkTheme;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
