import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  hideNotification,
  removeNotification,
} from "@/store/slices/notificationsSlice";
import { Alert, Snackbar } from "@mui/material";
import { useEffect } from "react";

/**
 * NotificationSystem component that displays notifications using Material-UI Snackbar.
 * It automatically manages the display and hiding of notifications from the Redux store.
 */
const NotificationSystem = () => {
  const dispatch = useAppDispatch();
  const { notifications } = useAppSelector((state) => state.notifications);

  // Get the first notification to display (FIFO queue)
  const currentNotification = notifications[0];

  useEffect(() => {
    if (currentNotification && !currentNotification.open) {
      // Remove notification after animation completes
      const timer = setTimeout(() => {
        dispatch(removeNotification());
      }, 150); // Time for the exit animation

      return () => clearTimeout(timer);
    }
  }, [currentNotification, dispatch]);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideNotification());
  };

  if (!currentNotification) {
    return null;
  }

  return (
    <Snackbar
      open={currentNotification.open}
      autoHideDuration={currentNotification.autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{ mt: 8 }} // Add margin top to avoid overlapping with app bar
    >
      <Alert
        onClose={handleClose}
        severity={currentNotification.severity}
        variant="filled"
        sx={{
          width: "100%",
          fontWeight: 500,
          "& .MuiAlert-icon": {
            fontSize: "1.25rem",
          },
        }}
      >
        {currentNotification.message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationSystem;
