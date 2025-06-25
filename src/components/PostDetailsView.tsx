import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchComments, clearComments } from "@/store/slices/commentsSlice";
import { Post } from "@/types";
import {
  Article as ArticleIcon,
  CalendarToday as CalendarTodayIcon,
  Comment as CommentIcon,
  Email as EmailIcon,
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
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { getAvatarColor, getInitials } from "@/utils";

interface PostDetailsViewProps {
  post: Post | null;
}

/**
 * PostDetailsView component displays full post details with comments.
 * Shows title, content, author information and all comments in a clean layout.
 * Follows admin dashboard design guidelines.
 */
const PostDetailsView = ({ post }: PostDetailsViewProps) => {
  const dispatch = useAppDispatch();
  const { activeUser } = useAppSelector((state) => state.auth);
  const {
    comments,
    status: commentsStatus,
    error,
  } = useAppSelector((state) => state.comments);

  useEffect(() => {
    if (post) {
      dispatch(fetchComments(post.id));
    }

    // Cleanup when component unmounts or post changes
    return () => {
      dispatch(clearComments());
    };
  }, [dispatch, post]);

  if (!post || !activeUser) {
    return null;
  }

  // Helper function to create safe HTML for rendering
  const createSafeHTML = (htmlContent: string): string => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;

    // Remove dangerous elements
    const scriptsAndForms = tempDiv.querySelectorAll(
      "script, form, iframe, object, embed"
    );
    scriptsAndForms.forEach((el) => el.remove());

    return tempDiv.innerHTML;
  };

  const safeHTML = createSafeHTML(post.body || "");

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3 } }}>
      {/* Post Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 600,
            color: "text.primary",
            mb: 2,
            lineHeight: 1.3,
          }}
        >
          {post.title}
        </Typography>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
          <Chip
            icon={<ArticleIcon />}
            label={`Post ID: ${post.id}`}
            size="small"
            variant="outlined"
            color="primary"
            sx={{
              px: 1.5,
              py: 0.5,
              height: "auto",
              "& .MuiChip-label": {
                px: 1,
                py: 0.25,
                fontSize: "0.75rem",
                fontWeight: 500,
              },
            }}
          />

          <Chip
            icon={<PersonIcon />}
            label={activeUser.name}
            size="small"
            variant="outlined"
            color="secondary"
            sx={{
              px: 1.5,
              py: 0.5,
              height: "auto",
              "& .MuiChip-label": {
                px: 1,
                py: 0.25,
                fontSize: "0.75rem",
                fontWeight: 500,
              },
            }}
          />

          <Chip
            icon={<CalendarTodayIcon />}
            label="Published"
            size="small"
            variant="outlined"
            color="success"
            sx={{
              px: 1.5,
              py: 0.5,
              height: "auto",
              "& .MuiChip-label": {
                px: 1,
                py: 0.25,
                fontSize: "0.75rem",
                fontWeight: 500,
              },
            }}
          />
        </Box>
      </Box>

      {/* Post Content */}
      <Card
        elevation={2}
        sx={{
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          mb: 4,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="subtitle2"
            sx={{
              mb: 3,
              color: "text.secondary",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <ArticleIcon fontSize="small" />
            Content
          </Typography>

          <Box
            sx={{
              "& p": {
                mb: 2,
                lineHeight: 1.7,
                color: "text.primary",
                fontSize: "1rem",
              },
              "& p:last-child": {
                mb: 0,
              },
              "& h1, & h2, & h3, & h4, & h5, & h6": {
                fontWeight: 600,
                mb: 2,
                color: "text.primary",
              },
              "& strong": {
                fontWeight: 600,
              },
              "& em": {
                fontStyle: "italic",
              },
              "& ul, & ol": {
                pl: 3,
                mb: 2,
              },
              "& li": {
                mb: 0.5,
                lineHeight: 1.7,
              },
            }}
            dangerouslySetInnerHTML={{ __html: safeHTML }}
          />
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card
        elevation={2}
        sx={{
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 600,
              color: "text.primary",
              mb: 3,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <CommentIcon color="primary" />
            Comments ({commentsStatus === "succeeded" ? comments.length : "..."}
            )
          </Typography>

          {commentsStatus === "loading" && (
            <Box>
              {Array.from({ length: 3 }).map((_, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Box sx={{ flex: 1 }}>
                      <Skeleton variant="text" width="30%" height={20} />
                      <Skeleton variant="text" width="20%" height={16} />
                    </Box>
                  </Box>
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="80%" />
                </Box>
              ))}
            </Box>
          )}

          {commentsStatus === "failed" && (
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: "error.light",
                borderRadius: 1,
                border: "1px solid",
                borderColor: "error.main",
              }}
            >
              <Typography color="error.main" sx={{ fontWeight: 500 }}>
                Error loading comments: {error}
              </Typography>
            </Paper>
          )}

          {commentsStatus === "succeeded" && comments.length === 0 && (
            <Paper
              elevation={0}
              sx={{
                p: 4,
                bgcolor: "grey.50",
                borderRadius: 1,
                textAlign: "center",
              }}
            >
              <CommentIcon sx={{ fontSize: 48, color: "grey.400", mb: 2 }} />
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", fontWeight: 500 }}
              >
                No comments yet. Be the first to comment!
              </Typography>
            </Paper>
          )}

          {commentsStatus === "succeeded" && comments.length > 0 && (
            <List sx={{ py: 0 }}>
              {comments.map((comment, index) => (
                <Box key={comment.id}>
                  <ListItem
                    alignItems="flex-start"
                    sx={{
                      px: 0,
                      py: 2,
                      flexDirection: "column",
                      alignItems: "stretch",
                    }}
                  >
                    {/* Comment Header */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 2,
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: getAvatarColor(comment.name),
                          color: "white",
                          fontSize: "0.875rem",
                          fontWeight: 600,
                        }}
                      >
                        {getInitials(comment.name)}
                      </Avatar>

                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            color: "text.primary",
                            mb: 0.25,
                          }}
                        >
                          {comment.name}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <EmailIcon
                            sx={{ fontSize: 14, color: "text.secondary" }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              color: "text.secondary",
                              fontSize: "0.75rem",
                            }}
                          >
                            {comment.email}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* Comment Content */}
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        bgcolor: "grey.50",
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "grey.200",
                        ml: 7, // Align with avatar + gap
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          lineHeight: 1.6,
                          color: "text.primary",
                        }}
                      >
                        {comment.body}
                      </Typography>
                    </Paper>
                  </ListItem>

                  {index < comments.length - 1 && (
                    <Divider sx={{ my: 1, ml: 7 }} />
                  )}
                </Box>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default PostDetailsView;
