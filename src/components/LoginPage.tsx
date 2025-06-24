import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUsers, setActiveUser } from "@/store/slices/authSlice";
import { getAvatarColor, getInitials } from "@/utils";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

/**
 * A full-page login component that displays a professional admin dashboard login interface.
 * Users can select from a list of available users to simulate authentication.
 */
const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { users, status, error } = useAppSelector((state) => state.auth);
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleUserChange = (event: SelectChangeEvent<string>) => {
    setSelectedUserId(event.target.value);
  };

  const handleLogin = () => {
    const selectedUser = users.find(
      (user) => user.id.toString() === selectedUserId
    );
    if (selectedUser) {
      dispatch(setActiveUser(selectedUser));
    }
  };

  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
      {/* Theme Toggle - Floating in top right corner */}
      <Box
        sx={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <ThemeToggle />
      </Box>

      <Container maxWidth="sm">
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: 3,
          }}
        >
          <Paper
            elevation={8}
            sx={{
              p: 4,
              width: "100%",
              maxWidth: 480,
              textAlign: "center",
            }}
          >
            {/* Logo and Title */}
            <Box sx={{ mb: 4 }}>
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: "primary.main",
                  mx: "auto",
                  mb: 2,
                }}
              >
                <AdminPanelSettingsIcon sx={{ fontSize: 32 }} />
              </Avatar>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                Posts Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Select a user to access the administration panel
              </Typography>
            </Box>

            <Divider sx={{ mb: 4 }} />

            {/* Login Form */}
            <Box sx={{ mb: 3 }}>
              {status === "loading" && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    py: 4,
                  }}
                >
                  <CircularProgress />
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    Loading users...
                  </Typography>
                </Box>
              )}

              {status === "failed" && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  Error loading users: {error}
                </Alert>
              )}

              {status === "succeeded" && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <FormControl fullWidth>
                    <InputLabel id="login-user-select-label">
                      Select User Account
                    </InputLabel>
                    <Select
                      labelId="login-user-select-label"
                      id="login-user-select"
                      value={selectedUserId}
                      label="Select User Account"
                      onChange={handleUserChange}
                    >
                      {users.map((user) => (
                        <MenuItem key={user.id} value={user.id.toString()}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              width: "100%",
                            }}
                          >
                            <Avatar
                              sx={{
                                width: 32,
                                height: 32,
                                bgcolor: getAvatarColor(user.name),
                                color: "white",
                                fontSize: "0.875rem",
                                fontWeight: 600,
                              }}
                            >
                              {getInitials(user.name)}
                            </Avatar>
                            <Box sx={{ textAlign: "left" }}>
                              <Typography
                                variant="body2"
                                sx={{ fontWeight: 500 }}
                              >
                                {user.name}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                @{user.username} • {user.email}
                              </Typography>
                            </Box>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleLogin}
                    disabled={!selectedUserId}
                    fullWidth
                    sx={{ py: 1.5 }}
                  >
                    Access Dashboard
                  </Button>
                </Box>
              )}
            </Box>

            {/* Footer */}
            <Typography variant="caption" color="text.secondary">
              This is a simulated login for demonstration purposes
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
