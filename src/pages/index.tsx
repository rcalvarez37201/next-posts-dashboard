import AppHeader from "@/components/AppHeader";
import LoginPage from "@/components/LoginPage";
import PostsDataGrid from "@/components/PostsDataGrid";
import ThemeProvider from "@/components/ThemeProvider";
import { useAppSelector } from "@/store/hooks";
import type { AppView, Post } from "@/types";
import { Add as AddIcon } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import Head from "next/head";
import { useState } from "react";

/**
 * Main application page component following SPA pattern.
 * Handles view switching between login, post list, and other views
 * without using Next.js routing.
 */
const HomePage = () => {
  const { activeUser } = useAppSelector((state) => state.auth);
  const [view, setView] = useState<AppView>("list");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // If no user is active, show login page
  if (!activeUser) {
    return (
      <ThemeProvider>
        <LoginPage />
      </ThemeProvider>
    );
  }

  // Main dashboard content when user is logged in
  const renderMainContent = () => {
    switch (view) {
      case "list":
        return (
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
              <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
                Posts Management
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {
                  setSelectedPost(null);
                  setView("form");
                }}
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
              onEdit={(post) => {
                setSelectedPost(post);
                setView("form");
              }}
              onView={(post) => {
                setSelectedPost(post);
                setView("details");
              }}
              onDelete={(post) => {
                // TODO: Implement delete functionality
                console.log("Delete post:", post);
              }}
            />
          </Container>
        );

      case "form":
        return (
          <Container maxWidth="md" sx={{ py: 3 }}>
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography variant="h5" gutterBottom>
                {selectedPost ? "Edit Post" : "Create New Post"}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Post form component will be implemented here
              </Typography>
              <Button
                variant="outlined"
                onClick={() => setView("list")}
                sx={{ textTransform: "none" }}
              >
                Back to Posts
              </Button>
            </Box>
          </Container>
        );

      case "details":
        return (
          <Container maxWidth="md" sx={{ py: 3 }}>
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography variant="h5" gutterBottom>
                Post Details
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                {selectedPost?.title || "No post selected"}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Post details component will be implemented here
              </Typography>
              <Button
                variant="outlined"
                onClick={() => setView("list")}
                sx={{ textTransform: "none" }}
              >
                Back to Posts
              </Button>
            </Box>
          </Container>
        );

      default:
        return null;
    }
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
          <AppHeader />
          {renderMainContent()}
        </Box>
      </ThemeProvider>
    </>
  );
};

export default HomePage;
