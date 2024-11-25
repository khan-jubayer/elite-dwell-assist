import { setMaids, selectMaids, setSelectedLocation } from "./maidSlice";

// Fetch maid data from your API (you can use Axios or another library)
export const fetchMaids = () => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:5000/maid");
    const data = await response.json();
    dispatch(setMaids(data));
  } catch (error) {
    console.error("Error fetching maid data:", error);
  }
};

// Filter maids based on the selected location
export const filterMaidsByLocation = (location) => (dispatch, getState) => {
  const allMaids = selectMaids(getState());
  let filteredMaids = allMaids;

  if (location !== "All") {
    filteredMaids = allMaids.filter((maid) => maid.location.includes(location));
  }

  dispatch(setSelectedLocation(location));
  dispatch(setMaids(filteredMaids));
};
