import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  hideNotification,
  removeNotification,
} from "@/store/slices/notificationsSlice";
import { Alert, Box, Slide } from "@mui/material";
import { useCallback, useEffect } from "react";

/**
 * NotificationSystem component that displays multiple stacked notifications.
 * Each notification appears below the previous one with smooth animations.
 */
const NotificationSystem = () => {
  const dispatch = useAppDispatch();
  const { notifications } = useAppSelector((state) => state.notifications);

  // Filter only open notifications
  const openNotifications = notifications.filter(
    (notification) => notification.open
  );

  const handleClose = useCallback(
    (notificationId: string) => {
      return (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
          return;
        }
        dispatch(hideNotification(notificationId));
      };
    },
    [dispatch]
  );

  const handleExited = useCallback(
    (notificationId: string) => {
      return () => {
        dispatch(removeNotification(notificationId));
      };
    },
    [dispatch]
  );

  // Auto-hide notifications after their duration
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    openNotifications.forEach((notification) => {
      if (notification.autoHideDuration && notification.autoHideDuration > 0) {
        const timer = setTimeout(() => {
          dispatch(hideNotification(notification.id));
        }, notification.autoHideDuration);

        timers.push(timer);
      }
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [openNotifications.map((n) => n.id).join(","), dispatch]);

  if (openNotifications.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: 80, // Below the app bar
        right: 16,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        maxWidth: 400,
        width: "100%",
      }}
    >
      {openNotifications.map((notification, index) => (
        <Slide
          key={notification.id}
          in={notification.open}
          direction="left"
          timeout={{
            enter: 300 + index * 100, // Stagger the entrance
            exit: 200,
          }}
          onExited={handleExited(notification.id)}
          style={{
            transformOrigin: "top right",
          }}
        >
          <Alert
            onClose={handleClose(notification.id)}
            severity={notification.severity}
            variant="filled"
            sx={{
              width: "100%",
              fontWeight: 500,
              minWidth: 300,
              boxShadow: (theme) => theme.shadows[6],
              "& .MuiAlert-icon": {
                fontSize: "1.25rem",
              },
              "& .MuiAlert-action": {
                paddingTop: 0,
              },
            }}
          >
            {notification.message}
          </Alert>
        </Slide>
      ))}
    </Box>
  );
};

export default NotificationSystem;
