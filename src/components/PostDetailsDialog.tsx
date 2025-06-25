import { Post } from "@/types";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArticleIcon from "@mui/icons-material/Article";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Box,
  Chip,
  Divider,
  Paper,
} from "@mui/material";
import { useAppSelector } from "@/store/hooks";

interface PostDetailsDialogProps {
  open: boolean;
  post: Post | null;
  onClose: () => void;
}

/**
 * PostDetailsDialog component displays full post details in a modal dialog.
 * Shows title, content, author information and metadata in a clean layout.
 */
const PostDetailsDialog = ({ open, post, onClose }: PostDetailsDialogProps) => {
  const { activeUser } = useAppSelector((state) => state.auth);

  if (!post) {
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
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      disableEnforceFocus
      disableAutoFocus
      disableRestoreFocus
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: "85vh",
          zIndex: 1300, // Ensure it's above other components
        },
      }}
      sx={{
        zIndex: 1300, // Ensure it's above other components
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          pb: 1,
          pr: 1,
        }}
      >
        <Box sx={{ flex: 1, pr: 2 }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 600,
              lineHeight: 1.3,
              mb: 1,
              color: "text.primary",
            }}
          >
            {post.title}
          </Typography>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
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

            {activeUser && (
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
            )}

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

        <IconButton
          onClick={onClose}
          sx={{
            color: "grey.500",
            "&:hover": {
              backgroundColor: "grey.100",
            },
          }}
          aria-label="close dialog"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 3, pb: 3 }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            backgroundColor: "grey.50",
            borderRadius: 2,
            border: "1px solid",
            borderColor: "grey.200",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              mb: 2,
              color: "text.secondary",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              fontWeight: 600,
            }}
          >
            Content
          </Typography>

          <Box
            sx={{
              "& p": {
                mb: 2,
                lineHeight: 1.7,
                fontSize: "1rem",
                color: "text.primary",
              },
              "& p:last-child": { mb: 0 },
              "& ul, & ol": {
                mb: 2,
                paddingLeft: 3,
                lineHeight: 1.7,
              },
              "& li": { mb: 0.5 },
              "& blockquote": {
                borderLeft: "4px solid",
                borderColor: "primary.main",
                paddingLeft: 2,
                margin: "16px 0",
                fontStyle: "italic",
                backgroundColor: "grey.50",
                py: 1,
                borderRadius: "0 4px 4px 0",
              },
              "& code": {
                backgroundColor: "grey.200",
                padding: "2px 6px",
                borderRadius: 1,
                fontFamily: "monospace",
                fontSize: "0.875rem",
              },
              "& pre": {
                backgroundColor: "grey.100",
                padding: 2,
                borderRadius: 1,
                overflow: "auto",
                mb: 2,
              },
              "& strong": {
                fontWeight: 700,
                color: "text.primary",
              },
              "& em": {
                fontStyle: "italic",
                color: "text.secondary",
              },
              "& h1, & h2, & h3, & h4, & h5, & h6": {
                fontWeight: 600,
                mb: 1.5,
                mt: 2,
                color: "text.primary",
              },
              "& h1": { fontSize: "1.5rem" },
              "& h2": { fontSize: "1.25rem" },
              "& h3": { fontSize: "1.125rem" },
              "& a": {
                color: "primary.main",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              },
            }}
            dangerouslySetInnerHTML={{ __html: safeHTML }}
          />
        </Paper>

        {/* Post metadata section */}
        <Box sx={{ mt: 3 }}>
          <Typography
            variant="subtitle2"
            sx={{
              mb: 2,
              color: "text.secondary",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              fontWeight: 600,
            }}
          >
            Post Information
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
              gap: 2,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 2,
                backgroundColor: "background.paper",
                border: "1px solid",
                borderColor: "grey.200",
                borderRadius: 1,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Post ID
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                #{post.id}
              </Typography>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 2,
                backgroundColor: "background.paper",
                border: "1px solid",
                borderColor: "grey.200",
                borderRadius: 1,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                User ID
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                #{post.userId}
              </Typography>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 2,
                backgroundColor: "background.paper",
                border: "1px solid",
                borderColor: "grey.200",
                borderRadius: 1,
                gridColumn: { xs: "1", sm: "1 / -1" },
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Author
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {activeUser?.name || `User ${post.userId}`}
                {activeUser?.email && (
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 1 }}
                  >
                    ({activeUser.email})
                  </Typography>
                )}
              </Typography>
            </Paper>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PostDetailsDialog;
