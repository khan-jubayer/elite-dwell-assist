// searchSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskSalaryFilters: {},
  timeSlotFilters: {},
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    toggleTimeSlotFilter: (state, action) => {
      const { timeSlot } = action.payload;
      state.timeSlotFilters[timeSlot] = !state.timeSlotFilters[timeSlot];
    },
  },
});

export const { toggleTimeSlotFilter } = searchSlice.actions;
export default searchSlice.reducer;
