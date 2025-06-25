import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Alert,
  Box,
  Button,
  Collapse,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";

interface PostsDataGridToolbarProps {
  selectedCount: number;
  onBulkDelete: () => void;
  loading?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

/**
 * PostsDataGridToolbar component that shows search functionality and bulk actions when posts are selected.
 * Displays search field, selection count and bulk delete functionality.
 */
const PostsDataGridToolbar = ({
  selectedCount,
  onBulkDelete,
  loading = false,
  searchValue = "",
  onSearchChange,
}: PostsDataGridToolbarProps) => {
  const [localSearchValue, setLocalSearchValue] = useState(searchValue);

  useEffect(() => {
    setLocalSearchValue(searchValue);
  }, [searchValue]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocalSearchValue(value);
    onSearchChange?.(value);
  };

  const handleClearSearch = () => {
    setLocalSearchValue("");
    onSearchChange?.("");
  };

  return (
    <Box>
      {/* Search Bar - Always visible */}
      <Paper
        elevation={0}
        sx={{
          py: 1.5,
          px: 2,
          borderRadius: 1,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <TextField
            size="small"
            placeholder="Search in title and content..."
            value={localSearchValue}
            onChange={handleSearchChange}
            sx={{
              flexGrow: 1,
              maxWidth: 400,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "background.paper",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: localSearchValue && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={handleClearSearch}
                    edge="end"
                    aria-label="clear search"
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Paper>

      {/* Bulk Actions - Only visible when posts are selected */}
      <Collapse in={selectedCount > 0}>
        <Paper
          elevation={0}
          sx={{
            py: 1,
            px: 2,
            backgroundColor: "action.hover",
            borderRadius: 0,
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
                {selectedCount} post{selectedCount !== 1 ? "s" : ""}{" "}
                seleccionado{selectedCount !== 1 ? "s" : ""}
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
                {loading ? "Eliminando..." : "Eliminar Seleccionados"}
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
              Estás a punto de eliminar {selectedCount} posts. Esta acción no se
              puede deshacer.
            </Alert>
          )}
        </Paper>
      </Collapse>
    </Box>
  );
};

export default PostsDataGridToolbar;
