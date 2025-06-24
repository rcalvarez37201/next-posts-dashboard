import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NotificationState {
  id: string;
  message: string;
  severity: "success" | "error" | "warning" | "info";
  open: boolean;
  autoHideDuration?: number;
}

interface NotificationsState {
  notifications: NotificationState[];
}

const initialState: NotificationsState = {
  notifications: [],
};

export interface ShowNotificationPayload {
  message: string;
  severity: "success" | "error" | "warning" | "info";
  autoHideDuration?: number;
}

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<ShowNotificationPayload>
    ) => {
      const newNotification: NotificationState = {
        id: `notification-${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 9)}`,
        message: action.payload.message,
        severity: action.payload.severity,
        open: true,
        autoHideDuration: action.payload.autoHideDuration || 4000,
      };
      state.notifications.push(newNotification);
    },
    hideNotification: (state, action: PayloadAction<string | undefined>) => {
      const notificationId = action.payload;
      if (notificationId) {
        // Hide specific notification
        const notification = state.notifications.find(
          (n) => n.id === notificationId
        );
        if (notification) {
          notification.open = false;
        }
      } else {
        // Hide first notification (backward compatibility)
        if (state.notifications.length > 0) {
          state.notifications[0].open = false;
        }
      }
    },
    removeNotification: (state, action: PayloadAction<string | undefined>) => {
      const notificationId = action.payload;
      if (notificationId) {
        // Remove specific notification
        state.notifications = state.notifications.filter(
          (n) => n.id !== notificationId
        );
      } else {
        // Remove first notification (backward compatibility)
        state.notifications.shift();
      }
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  showNotification,
  hideNotification,
  removeNotification,
  clearAllNotifications,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
