import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteMultiplePosts,
  deletePost,
  fetchPostsByUser,
} from "@/store/slices/postsSlice";
import { Post } from "@/types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Alert,
  Box,
  CircularProgress,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import DeleteMultipleConfirmDialog from "./DeleteMultipleConfirmDialog";
import PostsDataGridToolbar from "./PostsDataGridToolbar";

interface PostsDataGridProps {
  onEdit?: (post: Post) => void;
  onView?: (post: Post) => void;
}

/**
 * PostsDataGrid component displays posts in a Material-UI DataGrid with enhanced features.
 * Includes single and bulk delete functionality with confirmation dialogs.
 */
const PostsDataGrid = ({ onEdit, onView }: PostsDataGridProps) => {
  const dispatch = useAppDispatch();
  const { posts, status, error, deleteStatus } = useAppSelector(
    (state) => state.posts
  );
  const { activeUser } = useAppSelector((state) => state.auth);
  const lastFetchedUserIdRef = useRef<number | null>(null);

  // Helper function to create safe HTML for rendering (removes dangerous tags)
  const createSafeHTML = (htmlContent: string): string => {
    // Remove script tags and other dangerous elements
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;

    // Remove dangerous elements
    const scriptsAndForms = tempDiv.querySelectorAll(
      "script, form, iframe, object, embed"
    );
    scriptsAndForms.forEach((el) => el.remove());

    return tempDiv.innerHTML;
  };

  const [deleteConfirmation, setDeleteConfirmation] = useState<Post | null>(
    null
  );
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>({ ids: new Set(), type: "include" });
  const [bulkDeleteConfirmation, setBulkDeleteConfirmation] = useState<Post[]>(
    []
  );

  useEffect(() => {
    if (activeUser && activeUser.id !== lastFetchedUserIdRef.current) {
      // Check if we already have posts for this user to avoid unnecessary requests
      const hasPostsForUser =
        posts.length > 0 && posts[0]?.userId === activeUser.id;

      if (!hasPostsForUser) {
        lastFetchedUserIdRef.current = activeUser.id;
        dispatch(fetchPostsByUser(activeUser.id));
      } else {
        // We already have posts for this user, just update the ref
        lastFetchedUserIdRef.current = activeUser.id;
      }
    } else if (!activeUser) {
      // Reset the ref when user logs out
      lastFetchedUserIdRef.current = null;
    }
  }, [activeUser, dispatch, posts]);

  // Get selected posts objects from IDs
  const getSelectedPostsObjects = (
    selectionModel: GridRowSelectionModel
  ): Post[] => {
    if (selectionModel.type === "include") {
      const selectedIds = Array.from(selectionModel.ids).map((id) =>
        Number(id)
      );
      return posts.filter((post) => selectedIds.includes(post.id));
    } else {
      // For 'exclude' type, get all posts except the excluded ones
      const excludedIds = Array.from(selectionModel.ids).map((id) =>
        Number(id)
      );
      return posts.filter((post) => !excludedIds.includes(post.id));
    }
  };

  // Get selection count for toolbar
  const selectedCount =
    rowSelectionModel.type === "include"
      ? rowSelectionModel.ids.size
      : posts.length - rowSelectionModel.ids.size;

  const handleBulkDelete = () => {
    const selectedPostsObjects = getSelectedPostsObjects(rowSelectionModel);
    setBulkDeleteConfirmation(selectedPostsObjects);
  };

  const handleRowSelectionModelChange = (
    newRowSelectionModel: GridRowSelectionModel
  ) => {
    setRowSelectionModel(newRowSelectionModel);
  };

  const handleBulkDeleteConfirm = (postsToDelete: Post[]) => {
    const postIds = postsToDelete.map((post) => post.id);
    dispatch(deleteMultiplePosts(postIds));
    setBulkDeleteConfirmation([]);
    setRowSelectionModel({ ids: new Set(), type: "include" }); // Clear selection after deletion
  };

  // Define columns for the DataGrid
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      type: "number",
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            py: 1,
            width: "100%",
          }}
        >
          <Tooltip
            title={params.value}
            arrow
            placement="top-start"
            componentsProps={{
              tooltip: {
                sx: {
                  maxWidth: 400,
                  fontSize: "0.875rem",
                  lineHeight: 1.4,
                  backgroundColor: "grey.900",
                  "& .MuiTooltip-arrow": {
                    color: "grey.900",
                  },
                },
              },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                cursor: "pointer",
                width: "100%",
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              {params.value}
            </Typography>
          </Tooltip>
        </Box>
      ),
    },
    {
      field: "body",
      headerName: "Content",
      flex: 2,
      minWidth: 300,
      renderCell: (params) => {
        const htmlContent = params.value || "";
        const safeHTML = createSafeHTML(htmlContent);

        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              py: 1,
              width: "100%",
            }}
          >
            <Tooltip
              title={
                <Box
                  sx={{
                    maxWidth: 400,
                    "& p": { margin: 0.5 },
                    "& ul, & ol": { margin: 0.5, paddingLeft: 2 },
                    "& li": { margin: 0.25 },
                    "& blockquote": {
                      borderLeft: "3px solid #ccc",
                      paddingLeft: 1,
                      margin: 0.5,
                      fontStyle: "italic",
                    },
                    "& code": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                      padding: "2px 4px",
                      borderRadius: 1,
                    },
                    "& strong": { fontWeight: 600 },
                    "& em": { fontStyle: "italic" },
                  }}
                  dangerouslySetInnerHTML={{ __html: safeHTML }}
                />
              }
              arrow
              placement="top-start"
              componentsProps={{
                tooltip: {
                  sx: {
                    maxWidth: 450,
                    fontSize: "0.875rem",
                    lineHeight: 1.4,
                    backgroundColor: "grey.900",
                    "& .MuiTooltip-arrow": {
                      color: "grey.900",
                    },
                  },
                },
              }}
            >
              <Box
                sx={{
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  whiteSpace: "normal",
                  lineHeight: 1.3,
                  wordBreak: "break-word",
                  cursor: "pointer",
                  width: "100%",
                  fontSize: "0.875rem",
                  color: "text.secondary",
                  "& p": { margin: 0 },
                  "& ul, & ol": { margin: "4px 0", paddingLeft: 2 },
                  "& li": { margin: "2px 0" },
                  "& blockquote": {
                    borderLeft: "3px solid",
                    borderColor: "primary.main",
                    paddingLeft: 1,
                    margin: "4px 0",
                    fontStyle: "italic",
                    opacity: 0.8,
                  },
                  "& code": {
                    backgroundColor: "action.hover",
                    padding: "1px 3px",
                    borderRadius: 0.5,
                    fontSize: "0.8em",
                  },
                  "& strong": { fontWeight: 600, color: "text.primary" },
                  "& em": { fontStyle: "italic" },
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
                dangerouslySetInnerHTML={{ __html: safeHTML }}
              />
            </Tooltip>
          </Box>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 120,
      getActions: (params: GridRowParams) => {
        const post = params.row as Post;
        const actions = [];

        if (onView) {
          actions.push(
            <GridActionsCellItem
              key="view"
              icon={
                <Tooltip title="View post">
                  <VisibilityIcon
                    sx={{
                      color: "info.main",
                      "&:hover": {
                        color: "info.dark",
                      },
                    }}
                  />
                </Tooltip>
              }
              label="View"
              onClick={() => onView(post)}
            />
          );
        }

        if (onEdit) {
          actions.push(
            <GridActionsCellItem
              key="edit"
              icon={
                <Tooltip title="Edit post">
                  <EditIcon
                    sx={{
                      color: "warning.main",
                      "&:hover": {
                        color: "warning.dark",
                      },
                    }}
                  />
                </Tooltip>
              }
              label="Edit"
              onClick={() => onEdit(post)}
            />
          );
        }

        // Always show delete button - uses internal delete functionality
        actions.push(
          <GridActionsCellItem
            key="delete"
            icon={
              <Tooltip title="Delete post">
                <DeleteIcon
                  sx={{
                    color: "error.main",
                    "&:hover": {
                      color: "error.dark",
                    },
                  }}
                />
              </Tooltip>
            }
            label="Delete"
            onClick={() => {
              setDeleteConfirmation(post);
            }}
          />
        );

        return actions;
      },
    },
  ];

  // Loading state
  if (status === "loading") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
        <Typography variant="body2" sx={{ ml: 2 }}>
          Loading posts...
        </Typography>
      </Box>
    );
  }

  // Error state
  if (status === "failed") {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Error loading posts: {error}
      </Alert>
    );
  }

  // No user selected
  if (!activeUser) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <Typography variant="h6" color="text.secondary">
          Please select a user to view their posts
        </Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ width: "100%" }}>
      <Box sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider" }}>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
          Posts by {activeUser.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {posts.length} posts found
        </Typography>
      </Box>

      <PostsDataGridToolbar
        selectedCount={selectedCount}
        onBulkDelete={handleBulkDelete}
        loading={deleteStatus === "loading"}
      />

      <DataGrid
        rows={posts}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        checkboxSelection
        disableRowSelectionOnClick
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={handleRowSelectionModelChange}
        getRowHeight={() => 80}
        autoHeight={false}
        density="comfortable"
        sx={{
          border: 0,
          minHeight: 500,
          "& .MuiDataGrid-cell": {
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            minHeight: "80px !important",
            maxHeight: "80px !important",
          },
          "& .MuiDataGrid-row": {
            minHeight: "80px !important",
            maxHeight: "80px !important",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "action.hover",
            borderColor: "divider",
          },
          "& .MuiDataGrid-virtualScroller": {
            minHeight: "400px !important",
          },
        }}
        slots={{
          noRowsOverlay: () => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: 1,
              }}
            >
              <Typography variant="body1" color="text.secondary">
                No posts found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This user hasn&apos;t created any posts yet
              </Typography>
            </Box>
          ),
        }}
      />

      {deleteConfirmation && (
        <DeleteConfirmDialog
          open={!!deleteConfirmation}
          post={deleteConfirmation}
          loading={deleteStatus === "loading"}
          onConfirm={(post) => {
            dispatch(deletePost(post));
            setDeleteConfirmation(null);
          }}
          onClose={() => setDeleteConfirmation(null)}
        />
      )}

      {bulkDeleteConfirmation.length > 0 && (
        <DeleteMultipleConfirmDialog
          open={bulkDeleteConfirmation.length > 0}
          posts={bulkDeleteConfirmation}
          loading={deleteStatus === "loading"}
          onConfirm={handleBulkDeleteConfirm}
          onClose={() => setBulkDeleteConfirmation([])}
        />
      )}
    </Paper>
  );
};

export default PostsDataGrid;
