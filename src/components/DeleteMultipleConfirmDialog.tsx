import { Post } from "@/types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

interface DeleteMultipleConfirmDialogProps {
  open: boolean;
  posts: Post[];
  onClose: () => void;
  onConfirm: (posts: Post[]) => void;
  loading?: boolean;
}

/**
 * DeleteMultipleConfirmDialog component that shows a confirmation dialog before deleting multiple posts.
 * Displays the count and list of posts to be deleted.
 */
const DeleteMultipleConfirmDialog = ({
  open,
  posts,
  onClose,
  onConfirm,
  loading = false,
}: DeleteMultipleConfirmDialogProps) => {
  const handleConfirm = () => {
    if (posts.length > 0) {
      onConfirm(posts);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-multiple-dialog-title"
      aria-describedby="delete-multiple-dialog-description"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle id="delete-multiple-dialog-title" sx={{ pb: 1 }}>
        Confirm Multiple Posts Deletion
      </DialogTitle>

      <DialogContent>
        <DialogContentText
          id="delete-multiple-dialog-description"
          sx={{ mb: 2 }}
        >
          Are you sure you want to delete <strong>{posts.length}</strong> post
          {posts.length !== 1 ? "s" : ""}? This action cannot be undone.
        </DialogContentText>

        {posts.length > 0 && (
          <>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Posts to be deleted:</strong>
            </Typography>
            <List
              dense
              sx={{
                maxHeight: 300,
                overflow: "auto",
                bgcolor: "action.hover",
                borderRadius: 1,
                mt: 1,
              }}
            >
              {posts.map((post) => (
                <ListItem key={post.id} divider>
                  <ListItemText
                    primary={
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        #{post.id}: {post.title}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          mt: 0.5,
                        }}
                      >
                        {post.body}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          disabled={loading}
          variant="outlined"
          color="inherit"
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={loading || posts.length === 0}
          variant="contained"
          color="error"
          autoFocus
        >
          {loading
            ? "Deleting..."
            : `Delete ${posts.length} Post${posts.length !== 1 ? "s" : ""}`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteMultipleConfirmDialog;
