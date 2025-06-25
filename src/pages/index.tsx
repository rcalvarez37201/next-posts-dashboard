import AppHeader from "@/components/AppHeader";
import LoginPage from "@/components/LoginPage";
import PostFormModal from "@/components/PostFormModal";
import PostsDataGrid from "@/components/PostsDataGrid";
import PostDetailsDialog from "@/components/PostDetailsDialog";
import ThemeProvider from "@/components/ThemeProvider";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetSubmitStatus } from "@/store/slices/postsSlice";
import type { Post } from "@/types";
import { Add as AddIcon } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import Head from "next/head";
import { useState } from "react";

/**
 * Main application page component following SPA pattern.
 * Uses modals for post creation/editing instead of separate views.
 */
const HomePage = () => {
  const { activeUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
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
          <AppHeader />

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
              onView={(post) => {
                console.log("Opening post details for:", post);
                setSelectedPostForView(post);
              }}
            />
          </Container>

          {/* Post Form Modal */}
          <PostFormModal
            key={selectedPost ? `post-${selectedPost.id}` : `new-${modalKey}`}
            open={isFormModalOpen}
            onClose={handleCloseFormModal}
            post={selectedPost}
          />

          {/* Post Details Dialog */}
          <PostDetailsDialog
            open={!!selectedPostForView}
            post={selectedPostForView}
            onClose={() => setSelectedPostForView(null)}
          />
        </Box>
      </ThemeProvider>
    </>
  );
};

export default HomePage;
