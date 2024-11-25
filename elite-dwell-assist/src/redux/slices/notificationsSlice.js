import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: [],
  reducers: {
    addNotification: (state, action) => {
      state.push(action.payload);
    },
    clearNotifications: (state) => {
      state.length = 0; // Clear all notifications
    },
  },
});

export const { addNotification, clearNotifications } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
