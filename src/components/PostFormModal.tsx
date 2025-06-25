import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createPost, updatePost } from "@/store/slices/postsSlice";
import { Post } from "@/types";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TiptapEditor from "./TiptapEditor";

interface PostFormData {
  title: string;
  body: string;
}

interface PostFormModalProps {
  open: boolean;
  onClose: () => void;
  post?: Post | null; // If provided, it's edit mode; if null/undefined, it's create mode
}

/**
 * PostFormModal component that provides a modal dialog for creating and editing posts.
 * Uses React Hook Form for form management and validation.
 * Handles both create and update operations based on whether a post is provided.
 * Now includes a WYSIWYG editor for rich text content creation.
 */
const PostFormModal = ({ open, onClose, post }: PostFormModalProps) => {
  const dispatch = useAppDispatch();
  const { submitStatus } = useAppSelector((state) => state.posts);
  const { activeUser } = useAppSelector((state) => state.auth);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = !!post;
  const isLoading = submitStatus === "loading" || isSubmitting;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PostFormData>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      title: post?.title || "",
      body: post?.body || "",
    },
  });

  // Close modal automatically on successful submission
  useEffect(() => {
    if (submitStatus === "succeeded") {
      onClose();
    }
  }, [submitStatus, onClose]);

  const onSubmit = async (data: PostFormData) => {
    if (isLoading) return;
    setIsSubmitting(true);

    try {
      if (isEditMode && post) {
        await dispatch(
          updatePost({
            id: post.id,
            title: data.title.trim(),
            body: data.body.trim(),
            userId: activeUser!.id, // activeUser is checked by the disabled button state
          })
        ).unwrap();
      } else {
        await dispatch(
          createPost({
            title: data.title.trim(),
            body: data.body.trim(),
            userId: activeUser!.id, // activeUser is checked by the disabled button state
          })
        ).unwrap();
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="post-form-dialog-title"
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle
        id="post-form-dialog-title"
        sx={{
          pb: 1,
          fontSize: "1.25rem",
          fontWeight: 600,
        }}
      >
        {isEditMode ? "Edit Post" : "Create New Post"}
      </DialogTitle>

      <Divider />

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ py: 3 }}>
          <Stack spacing={3}>
            {/* User Information Display */}
            {activeUser && (
              <Box
                sx={{
                  p: 2,
                  borderRadius: 1,
                  bgcolor: "action.hover",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  <strong>Author:</strong> {activeUser.name} ({activeUser.email}
                  )
                </Typography>
              </Box>
            )}

            {/* Title Field */}
            <Controller
              name="title"
              control={control}
              rules={{
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters long",
                },
                maxLength: {
                  value: 100,
                  message: "Title must not exceed 100 characters",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Post Title"
                  fullWidth
                  variant="outlined"
                  error={!!errors.title}
                  helperText={
                    errors.title?.message ||
                    "Enter a descriptive title for your post"
                  }
                  disabled={isLoading}
                  autoFocus={!isEditMode}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                    },
                  }}
                />
              )}
            />

            {/* Body Field with WYSIWYG Editor */}
            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Post Content *
              </Typography>
              <Controller
                name="body"
                control={control}
                rules={{
                  required: "Post content is required",
                  minLength: {
                    value: 10,
                    message: "Post content must be at least 10 characters long",
                  },
                  maxLength: {
                    value: 5000,
                    message: "Post content must not exceed 5000 characters",
                  },
                }}
                render={({ field }) => (
                  <Box>
                    <TiptapEditor
                      placeholder="Write the main content of your post... Use the toolbar to add formatting, lists, quotes, and more!"
                      onChange={field.onChange}
                      initialContent={field.value || ""}
                      error={!!errors.body}
                      disabled={isLoading}
                    />
                    {errors.body ? (
                      <Typography
                        variant="caption"
                        color="error"
                        sx={{ mt: 0.75, display: "block" }}
                      >
                        {errors.body.message}
                      </Typography>
                    ) : (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 0.75, display: "block" }}
                      >
                        💡 Use the toolbar to format your content. You can add{" "}
                        <strong>bold</strong>, <em>italic</em>, lists, quotes,
                        and more to make your post engaging!
                      </Typography>
                    )}
                  </Box>
                )}
              />
            </Box>
          </Stack>
        </DialogContent>

        <Divider />

        <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
          <Button onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!isValid || isLoading || !activeUser}
            variant="contained"
            color="primary"
            startIcon={isLoading ? <CircularProgress size={16} /> : null}
          >
            {isLoading
              ? isEditMode
                ? "Updating..."
                : "Creating..."
              : isEditMode
              ? "Update Post"
              : "Create Post"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PostFormModal;
