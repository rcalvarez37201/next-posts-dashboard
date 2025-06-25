import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUserTodos, toggleTodo } from "@/store/slices/todosSlice";
// Albums functionality moved to PhotoGallery component
import { getAvatarColor, getInitials } from "@/utils";
import PhotoGallery from "./PhotoGallery";
import {
  AccountCircle as AccountCircleIcon,
  Business as BusinessIcon,
  Email as EmailIcon,
  Language as LanguageIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Person as PersonIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  PhotoLibrary as PhotoLibraryIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  Tabs,
  Tab,
  Alert,
  Skeleton,
  IconButton,
  LinearProgress,
} from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `profile-tab-${index}`,
    "aria-controls": `profile-tabpanel-${index}`,
  };
}

/**
 * UserProfile component that displays detailed information about the active user.
 * Shows personal information, contact details, address, company information, user todos, and photo gallery.
 * Follows admin dashboard layout guidelines with Material UI components.
 */
const UserProfile = () => {
  const dispatch = useAppDispatch();
  const { activeUser } = useAppSelector((state) => state.auth);
  const {
    todos,
    loading: todosLoading,
    error: todosError,
  } = useAppSelector((state) => state.todos);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (activeUser?.id) {
      dispatch(fetchUserTodos(activeUser.id));
    }
  }, [dispatch, activeUser?.id]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleToggleTodo = (todoId: number, completed: boolean) => {
    dispatch(toggleTodo({ id: todoId, completed: !completed }));
  };

  if (!activeUser) {
    return null;
  }

  const { name, username, email, phone, website, address, company } =
    activeUser;

  const completedTodos = todos.filter((todo) => todo.completed).length;
  const totalTodos = todos.length;
  const completionPercentage =
    totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 2, sm: 3 },
        px: { xs: 2, sm: 3 },
      }}
    >
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 600,
            color: "text.primary",
            mb: 1,
          }}
        >
          User Profile
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            fontSize: "1.1rem",
          }}
        >
          Manage your profile information and settings
        </Typography>
      </Box>

      {/* Main Content Layout */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: { xs: 2, sm: 3 },
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        {/* Profile Overview Card */}
        <Box
          sx={{
            width: { xs: "100%", lg: "350px" },
            flexShrink: 0,
          }}
        >
          <Card
            elevation={2}
            sx={{
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              width: "100%",
            }}
          >
            <CardContent sx={{ textAlign: "center", pt: 4, pb: 3 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: getAvatarColor(name),
                  color: "white",
                  fontSize: "2rem",
                  fontWeight: 600,
                  mx: "auto",
                  mb: 2,
                  boxShadow: 3,
                }}
              >
                {getInitials(name)}
              </Avatar>

              <Typography
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: 600,
                  color: "text.primary",
                  mb: 0.5,
                }}
              >
                {name}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  mb: 2,
                  fontSize: "1rem",
                }}
              >
                @{username}
              </Typography>

              <Chip
                icon={<AccountCircleIcon />}
                label="Active User"
                color="primary"
                variant="filled"
                sx={{
                  fontWeight: 500,
                  "& .MuiChip-icon": {
                    color: "inherit",
                  },
                }}
              />

              {/* Task Summary */}
              <Divider sx={{ my: 3 }} />
              <Box sx={{ textAlign: "left" }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Task Summary
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Progress
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {completedTodos}/{totalTodos}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={completionPercentage}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: "action.hover",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 4,
                      },
                    }}
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 0.5, display: "block" }}
                  >
                    {Math.round(completionPercentage)}% completed
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Information Cards with Tabs */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, sm: 3 },
            width: "100%",
            minWidth: 0,
          }}
        >
          {/* Tabs */}
          <Card
            elevation={2}
            sx={{
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              width: "100%",
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="profile tabs"
                sx={{
                  "& .MuiTab-root": {
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "1rem",
                  },
                }}
              >
                <Tab
                  icon={<PersonIcon />}
                  iconPosition="start"
                  label="Personal Information"
                  {...a11yProps(0)}
                />
                <Tab
                  icon={<AssignmentIcon />}
                  iconPosition="start"
                  label="Tasks"
                  {...a11yProps(1)}
                />
                <Tab
                  icon={<PhotoLibraryIcon />}
                  iconPosition="start"
                  label="Gallery"
                  {...a11yProps(2)}
                />
              </Tabs>
            </Box>

            {/* Tab Panel 1: Personal Information */}
            <TabPanel value={tabValue} index={0}>
              <Box sx={{ p: 3 }}>
                {/* Contact Information */}
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: "text.primary",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <PersonIcon color="primary" />
                  Contact Information
                </Typography>

                <List sx={{ py: 0, mb: 3 }}>
                  <ListItem sx={{ px: 0, py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <EmailIcon color="action" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email"
                      secondary={email}
                      primaryTypographyProps={{
                        variant: "body2",
                        fontWeight: 600,
                        color: "text.secondary",
                      }}
                      secondaryTypographyProps={{
                        variant: "body1",
                        color: "text.primary",
                        fontWeight: 500,
                      }}
                    />
                  </ListItem>

                  <ListItem sx={{ px: 0, py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <PhoneIcon color="action" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Phone"
                      secondary={phone}
                      primaryTypographyProps={{
                        variant: "body2",
                        fontWeight: 600,
                        color: "text.secondary",
                      }}
                      secondaryTypographyProps={{
                        variant: "body1",
                        color: "text.primary",
                        fontWeight: 500,
                      }}
                    />
                  </ListItem>

                  <ListItem sx={{ px: 0, py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <LanguageIcon color="action" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Website"
                      secondary={website}
                      primaryTypographyProps={{
                        variant: "body2",
                        fontWeight: 600,
                        color: "text.secondary",
                      }}
                      secondaryTypographyProps={{
                        variant: "body1",
                        color: "primary.main",
                        fontWeight: 500,
                        sx: { textDecoration: "underline", cursor: "pointer" },
                      }}
                    />
                  </ListItem>
                </List>

                {/* Address and Company Information */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: { xs: 2, sm: 3 },
                    width: "100%",
                  }}
                >
                  {/* Address Information */}
                  <Box sx={{ flex: 1, width: "100%", minWidth: 0 }}>
                    <Card
                      elevation={1}
                      sx={{
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "divider",
                        height: "100%",
                        width: "100%",
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Typography
                          variant="h6"
                          component="h3"
                          sx={{
                            fontWeight: 600,
                            mb: 2,
                            color: "text.primary",
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <LocationIcon color="primary" />
                          Address
                        </Typography>

                        <Box sx={{ color: "text.primary" }}>
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: 500, mb: 0.5 }}
                          >
                            {address.street}, {address.suite}
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 0.5 }}>
                            {address.city}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            ZIP: {address.zipcode}
                          </Typography>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            fontWeight: 600,
                            mb: 1,
                          }}
                        >
                          Coordinates
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            fontFamily: "monospace",
                            display: "block",
                          }}
                        >
                          Lat: {address.geo.lat}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            fontFamily: "monospace",
                          }}
                        >
                          Lng: {address.geo.lng}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>

                  {/* Company Information */}
                  <Box sx={{ flex: 1, width: "100%", minWidth: 0 }}>
                    <Card
                      elevation={1}
                      sx={{
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "divider",
                        height: "100%",
                        width: "100%",
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Typography
                          variant="h6"
                          component="h3"
                          sx={{
                            fontWeight: 600,
                            mb: 2,
                            color: "text.primary",
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <BusinessIcon color="primary" />
                          Company
                        </Typography>

                        <Box>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 600,
                              color: "text.primary",
                              mb: 1,
                            }}
                          >
                            {company.name}
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{
                              color: "text.secondary",
                              fontStyle: "italic",
                              mb: 2,
                            }}
                          >
                            &ldquo;{company.catchPhrase}&rdquo;
                          </Typography>

                          <Paper
                            elevation={0}
                            sx={{
                              bgcolor: "action.hover",
                              p: 2,
                              borderRadius: 1,
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{
                                color: "text.secondary",
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: 0.5,
                                display: "block",
                                mb: 0.5,
                              }}
                            >
                              Business Focus
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: "text.primary",
                                fontWeight: 500,
                              }}
                            >
                              {company.bs}
                            </Typography>
                          </Paper>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </Box>
              </Box>
            </TabPanel>

            {/* Tab Panel 2: User Todos */}
            <TabPanel value={tabValue} index={1}>
              <Box sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: "text.primary",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <AssignmentIcon color="primary" />
                  User Tasks
                </Typography>

                {todosError && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {todosError}
                  </Alert>
                )}

                {todosLoading ? (
                  <Box>
                    {[...Array(5)].map((_, index) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Skeleton
                          variant="rectangular"
                          height={60}
                          sx={{ borderRadius: 1 }}
                        />
                      </Box>
                    ))}
                  </Box>
                ) : todos.length > 0 ? (
                  <List sx={{ py: 0 }}>
                    {todos.map((todo, index) => (
                      <Box key={todo.id}>
                        <ListItem
                          sx={{
                            px: 0,
                            py: 2,
                            borderRadius: 1,
                            "&:hover": {
                              bgcolor: "action.hover",
                            },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <IconButton
                              onClick={() =>
                                handleToggleTodo(todo.id, todo.completed)
                              }
                              size="small"
                              sx={{
                                color: todo.completed
                                  ? "success.main"
                                  : "action.disabled",
                                "&:hover": {
                                  bgcolor: todo.completed
                                    ? "success.light"
                                    : "action.hover",
                                },
                              }}
                            >
                              {todo.completed ? (
                                <CheckCircleIcon />
                              ) : (
                                <RadioButtonUncheckedIcon />
                              )}
                            </IconButton>
                          </ListItemIcon>
                          <ListItemText
                            primary={todo.title}
                            primaryTypographyProps={{
                              variant: "body1",
                              fontWeight: 500,
                              color: todo.completed
                                ? "text.secondary"
                                : "text.primary",
                              sx: {
                                textDecoration: todo.completed
                                  ? "line-through"
                                  : "none",
                              },
                            }}
                          />
                          <Chip
                            label={todo.completed ? "Completed" : "Pending"}
                            size="small"
                            color={todo.completed ? "success" : "default"}
                            variant={todo.completed ? "filled" : "outlined"}
                          />
                        </ListItem>
                        {index < todos.length - 1 && <Divider />}
                      </Box>
                    ))}
                  </List>
                ) : (
                  <Box
                    sx={{
                      textAlign: "center",
                      py: 4,
                      color: "text.secondary",
                    }}
                  >
                    <AssignmentIcon
                      sx={{ fontSize: 48, mb: 2, opacity: 0.5 }}
                    />
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      No tasks available
                    </Typography>
                    <Typography variant="body2">
                      This user has no assigned tasks.
                    </Typography>
                  </Box>
                )}
              </Box>
            </TabPanel>

            {/* Tab Panel 3: Photo Gallery */}
            <TabPanel value={tabValue} index={2}>
              <Box sx={{ p: 3 }}>
                <PhotoGallery userId={activeUser.id} />
              </Box>
            </TabPanel>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default UserProfile;
