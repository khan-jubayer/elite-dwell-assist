import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  maids: [], // Your maid data will be stored here
  selectedLocation: "All", // Initial selected location
};

const MaidSlice = createSlice({
  name: "maid",
  initialState,
  reducers: {
    setMaids: (state, action) => {
      state.maids = action.payload;
    },
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload;
    },
  },
});

export const { setMaids, setSelectedLocation } = MaidSlice.actions;
export const selectMaids = (state) => state.maid.maids;
export const selectSelectedLocation = (state) => state.maid.selectedLocation;

export default MaidSlice.reducer;
