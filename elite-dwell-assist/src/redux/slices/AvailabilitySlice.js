import { createSlice } from "@reduxjs/toolkit";

const AvailabilitySlice = createSlice({
  name: "availability",
  initialState: {
    availability: "All",
  },
  reducers: {
    setAvailability: (state, action) => {
      state.availability = action.payload;
    },
  },
});

export const { setAvailability } = AvailabilitySlice.actions;
export default AvailabilitySlice.reducer;
