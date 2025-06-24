import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPostsByUser } from "@/store/slices/postsSlice";
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
} from "@mui/x-data-grid";
import { useEffect } from "react";

interface PostsDataGridProps {
  onEdit?: (post: Post) => void;
  onView?: (post: Post) => void;
  onDelete?: (post: Post) => void;
}

/**
 * A modern data grid component for displaying posts using Material-UI DataGrid.
 * Provides advanced features like sorting, filtering, pagination, and row selection.
 */
const PostsDataGrid = ({ onEdit, onView, onDelete }: PostsDataGridProps) => {
  const dispatch = useAppDispatch();
  const { posts, status, error } = useAppSelector((state) => state.posts);
  const { activeUser } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (activeUser) {
      dispatch(fetchPostsByUser(activeUser.id));
    }
  }, [activeUser, dispatch]);

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
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            py: 1,
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
              color="text.secondary"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                whiteSpace: "normal",
                lineHeight: 1.2,
                wordBreak: "break-word",
                cursor: "pointer",
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

        if (onDelete) {
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
              onClick={() => onDelete(post)}
            />
          );
        }

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
    </Paper>
  );
};

export default PostsDataGrid;
