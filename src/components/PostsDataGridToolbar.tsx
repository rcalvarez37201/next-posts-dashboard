import DeleteIcon from "@mui/icons-material/Delete";
import { Alert, Box, Button, Collapse, Paper, Typography } from "@mui/material";

interface PostsDataGridToolbarProps {
  selectedCount: number;
  onBulkDelete: () => void;
  loading?: boolean;
}

/**
 * PostsDataGridToolbar component that shows bulk actions when posts are selected.
 * Displays selection count and bulk delete functionality.
 */
const PostsDataGridToolbar = ({
  selectedCount,
  onBulkDelete,
  loading = false,
}: PostsDataGridToolbarProps) => {
  if (selectedCount === 0) {
    return null;
  }

  return (
    <Collapse in={selectedCount > 0}>
      <Paper
        elevation={0}
        sx={{
          py: 1,
          px: 2,
          color: "primary.contrastText",
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ fontWeight: 500 }}
            >
              {selectedCount} post{selectedCount !== 1 ? "s" : ""} selected
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={onBulkDelete}
              disabled={loading}
              sx={{
                bgcolor: "error.main",
                "&:hover": {
                  bgcolor: "error.dark",
                },
              }}
            >
              {loading ? "Deleting..." : "Delete Selected"}
            </Button>
          </Box>
        </Box>

        {selectedCount > 5 && (
          <Alert
            severity="warning"
            sx={{
              mt: 1,
              "& .MuiAlert-message": {
                fontSize: "0.875rem",
              },
            }}
          >
            You are about to delete {selectedCount} posts. This action cannot be
            undone.
          </Alert>
        )}
      </Paper>
    </Collapse>
  );
};

export default PostsDataGridToolbar;
