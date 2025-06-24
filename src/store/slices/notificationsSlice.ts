import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NotificationState {
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
        message: action.payload.message,
        severity: action.payload.severity,
        open: true,
        autoHideDuration: action.payload.autoHideDuration || 4000,
      };
      state.notifications.push(newNotification);
    },
    hideNotification: (state) => {
      if (state.notifications.length > 0) {
        state.notifications[0].open = false;
      }
    },
    removeNotification: (state) => {
      state.notifications.shift();
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
