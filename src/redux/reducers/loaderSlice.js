import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    showLoader: true,
  },
  reducers: {
    showLoading(state) {
      state.showLoader = true;
    },
    stopLoading(state) {
      state.showLoader = false;
    },
  },
});

export const loaderActions = loaderSlice.actions;

export default loaderSlice;
