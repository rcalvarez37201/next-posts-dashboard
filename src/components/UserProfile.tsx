import { useAppSelector } from "@/store/hooks";
import { getAvatarColor, getInitials } from "@/utils";
import {
  AccountCircle as AccountCircleIcon,
  Business as BusinessIcon,
  Email as EmailIcon,
  Language as LanguageIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Person as PersonIcon,
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
} from "@mui/material";

/**
 * UserProfile component that displays detailed information about the active user.
 * Shows personal information, contact details, address, and company information.
 * Follows admin dashboard layout guidelines with Material UI components.
 */
const UserProfile = () => {
  const { activeUser } = useAppSelector((state) => state.auth);

  if (!activeUser) {
    return null;
  }

  const { name, username, email, phone, website, address, company } =
    activeUser;

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
            </CardContent>
          </Card>
        </Box>

        {/* Information Cards */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, sm: 3 },
            width: "100%",
            minWidth: 0, // Allows flex item to shrink below content size
          }}
        >
          {/* Contact Information Card */}
          <Card
            elevation={2}
            sx={{
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
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
                <PersonIcon color="primary" />
                Contact Information
              </Typography>

              <List sx={{ py: 0 }}>
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
            </CardContent>
          </Card>

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
                elevation={2}
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
                elevation={2}
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
      </Box>
    </Container>
  );
};

export default UserProfile;
