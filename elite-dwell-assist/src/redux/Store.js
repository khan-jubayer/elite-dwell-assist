import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./slices/CartSlices";
import maidReducer from "./slices/MaidSlice";
import searchReducer from "./slices/searchSlice";
import AvailabilitySlice from "./slices/AvailabilitySlice";
import notificationsReducer from "./slices/notificationsSlice";

const Store = configureStore({
  reducer: {
    cart: CartSlice,
    availability: AvailabilitySlice,
    maid: maidReducer,
    search: searchReducer,
    notifications: notificationsReducer,
  },
});

export default Store;
