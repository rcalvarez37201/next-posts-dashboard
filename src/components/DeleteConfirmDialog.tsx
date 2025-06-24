import { Post } from "@/types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface DeleteConfirmDialogProps {
  open: boolean;
  post: Post | null;
  onClose: () => void;
  onConfirm: (post: Post) => void;
  loading?: boolean;
}

/**
 * DeleteConfirmDialog component that shows a confirmation dialog before deleting a post.
 * Displays post details and requires user confirmation.
 */
const DeleteConfirmDialog = ({
  open,
  post,
  onClose,
  onConfirm,
  loading = false,
}: DeleteConfirmDialogProps) => {
  const handleConfirm = () => {
    if (post) {
      onConfirm(post);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="delete-dialog-title" sx={{ pb: 1 }}>
        Confirm Post Deletion
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="delete-dialog-description" sx={{ mb: 2 }}>
          Are you sure you want to delete this post with ID: <b>#{post?.id}</b>{" "}
          and title: <b>&quot;{post?.title}&quot;</b>? This action cannot be
          undone.
        </DialogContentText>
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
          disabled={loading}
          variant="contained"
          color="error"
          autoFocus
        >
          {loading ? "Deleting..." : "Delete Post"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
