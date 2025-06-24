import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleTheme } from "@/store/slices/themeSlice";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { IconButton, Tooltip } from "@mui/material";

/**
 * A component that provides a toggle button for switching between light and dark themes.
 */
const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.theme.mode);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <Tooltip
      title={`Switch to ${themeMode === "light" ? "dark" : "light"} mode`}
    >
      <IconButton onClick={handleToggleTheme} color="inherit">
        {themeMode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
