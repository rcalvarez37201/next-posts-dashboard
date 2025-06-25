import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearActiveUser } from "@/store/slices/authSlice";
import { getAvatarColor, getInitials } from "@/utils";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

/**
 * The application header component that contains the main navigation and user info.
 * Follows admin dashboard layout guidelines with user info display.
 * Only shows when a user is logged in.
 */
interface AppHeaderProps {
  onNavigateToProfile?: () => void;
}

const AppHeader = ({ onNavigateToProfile }: AppHeaderProps) => {
  const dispatch = useAppDispatch();
  const { activeUser } = useAppSelector((state) => state.auth);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(
    null
  );

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    dispatch(clearActiveUser());
    handleUserMenuClose();
  };

  const handleViewProfile = () => {
    if (onNavigateToProfile) {
      onNavigateToProfile();
    }
    handleUserMenuClose();
  };

  // Don't render header if no user is active
  if (!activeUser) {
    return null;
  }

  return (
    <AppBar
      position="static"
      elevation={2}
      sx={{
        backgroundColor: "primary.main",
        color: "primary.contrastText",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
            color: "primary.contrastText",
          }}
        >
          Posts Dashboard
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* User Info */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                lineHeight: 1.2,
                color: "primary.contrastText",
              }}
            >
              {activeUser.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                lineHeight: 1,
                color: "primary.contrastText",
                opacity: 0.9,
                fontWeight: 500,
              }}
            >
              @{activeUser.username}
            </Typography>
          </Box>

          {/* User Avatar with menu */}
          <IconButton
            onClick={handleUserMenuOpen}
            size="small"
            sx={{
              p: 0.5,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
            aria-controls={userMenuAnchor ? "user-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={userMenuAnchor ? "true" : undefined}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: getAvatarColor(activeUser.name),
                color: "white",
                fontSize: "0.875rem",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              {getInitials(activeUser.name)}
            </Avatar>
          </IconButton>

          {/* User Menu */}
          <Menu
            id="user-menu"
            anchorEl={userMenuAnchor}
            open={Boolean(userMenuAnchor)}
            onClose={handleUserMenuClose}
            onClick={handleUserMenuClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            slotProps={{
              paper: {
                sx: {
                  minWidth: 200,
                  mt: 0,
                  "& .MuiList-root": {
                    py: 0,
                  },
                },
              },
            }}
          >
            {/* User Info Header - Custom styled instead of disabled MenuItem */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                px: 2,
                py: 1.5,
                backgroundColor: "action.hover",
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <AccountCircleIcon
                  fontSize="small"
                  sx={{ color: getAvatarColor(activeUser.name) }}
                />
              </ListItemIcon>
              <Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "text.primary" }}
                >
                  {activeUser.name}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {activeUser.email}
                </Typography>
              </Box>
            </Box>

            <MenuItem onClick={handleViewProfile}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>View Profile</ListItemText>
            </MenuItem>

            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>

          {/* Theme Toggle with proper styling */}
          <Box
            sx={{
              "& .MuiIconButton-root": {
                color: "primary.contrastText",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              },
            }}
          >
            <ThemeToggle />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
