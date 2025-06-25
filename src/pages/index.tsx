import AppHeader from "@/components/AppHeader";
import LoginPage from "@/components/LoginPage";
import PostFormModal from "@/components/PostFormModal";
import PostsDataGrid from "@/components/PostsDataGrid";
import PostDetailsView from "@/components/PostDetailsView";
import ThemeProvider from "@/components/ThemeProvider";
import UserProfile from "@/components/UserProfile";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetSubmitStatus } from "@/store/slices/postsSlice";
import type { Post } from "@/types";
import {
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import Head from "next/head";
import { useState } from "react";

type AppView = "posts" | "profile" | "postDetails";

/**
 * Main application page component following SPA pattern.
 * Uses modals for post creation/editing and views for post details and profile.
 * Implements view-based navigation for posts, user profile, and post details.
 */
const HomePage = () => {
  const { activeUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [currentView, setCurrentView] = useState<AppView>("posts");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [modalKey, setModalKey] = useState(Date.now()); // State for unique key
  const [selectedPostForView, setSelectedPostForView] = useState<Post | null>(
    null
  );

  // If no user is active, show login page
  if (!activeUser) {
    return (
      <ThemeProvider>
        <LoginPage />
      </ThemeProvider>
    );
  }

  const handleNavigateToProfile = () => {
    setCurrentView("profile");
  };

  const handleNavigateToPosts = () => {
    setCurrentView("posts");
    setSelectedPostForView(null); // Clear selected post when going back to posts
  };

  const handleNavigateToPostDetails = (post: Post) => {
    setSelectedPostForView(post);
    setCurrentView("postDetails");
  };

  const handleNewPost = () => {
    dispatch(resetSubmitStatus());
    setSelectedPost(null);
    setModalKey(Date.now()); // Update key to force remount
    setIsFormModalOpen(true);
  };

  const handleEditPost = (post: Post) => {
    dispatch(resetSubmitStatus());
    setSelectedPost(post);
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <>
      <Head>
        <title>Next.js Posts Dashboard</title>
        <meta
          name="description"
          content="A posts dashboard with simulated user authentication"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider>
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
          <AppHeader onNavigateToProfile={handleNavigateToProfile} />

          {/* Profile View */}
          {currentView === "profile" && (
            <>
              {/* Back Navigation */}
              <Container maxWidth="lg" sx={{ pt: 2, pb: 0 }}>
                <Box sx={{ mb: 2 }}>
                  <IconButton
                    onClick={handleNavigateToPosts}
                    sx={{
                      mr: 1,
                      color: "primary.main",
                      "&:hover": {
                        backgroundColor: "primary.main",
                        color: "primary.contrastText",
                      },
                    }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{
                      color: "text.secondary",
                      cursor: "pointer",
                      "&:hover": { color: "primary.main" },
                    }}
                    onClick={handleNavigateToPosts}
                  >
                    Back to Posts
                  </Typography>
                </Box>
              </Container>
              <UserProfile />
            </>
          )}

          {/* Posts List View */}
          {currentView === "posts" && (
            <Container maxWidth="lg" sx={{ py: 3 }}>
              {/* Page Header */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{ fontWeight: 600 }}
                >
                  Posts Management
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleNewPost}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 500,
                  }}
                >
                  New Post
                </Button>
              </Box>

              {/* Posts DataGrid */}
              <PostsDataGrid
                onEdit={handleEditPost}
                onView={handleNavigateToPostDetails}
              />
            </Container>
          )}

          {/* Post Details View */}
          {currentView === "postDetails" && (
            <>
              {/* Back Navigation */}
              <Container maxWidth="lg" sx={{ pt: 2, pb: 0 }}>
                <Box sx={{ mb: 2 }}>
                  <IconButton
                    onClick={handleNavigateToPosts}
                    sx={{
                      mr: 1,
                      color: "primary.main",
                      "&:hover": {
                        backgroundColor: "primary.main",
                        color: "primary.contrastText",
                      },
                    }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{
                      color: "text.secondary",
                      cursor: "pointer",
                      "&:hover": { color: "primary.main" },
                    }}
                    onClick={handleNavigateToPosts}
                  >
                    Back to Posts
                  </Typography>
                </Box>
              </Container>
              <PostDetailsView post={selectedPostForView} />
            </>
          )}

          {/* Post Form Modal */}
          <PostFormModal
            key={selectedPost ? `post-${selectedPost.id}` : `new-${modalKey}`}
            open={isFormModalOpen}
            onClose={handleCloseFormModal}
            post={selectedPost}
          />
        </Box>
      </ThemeProvider>
    </>
  );
};

export default HomePage;
