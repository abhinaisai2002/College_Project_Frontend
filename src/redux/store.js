import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./apiSlice";

import authSlice from "./reducers/authSlice";
import loaderSlice from "./reducers/loaderSlice";
import modalSlice from "./reducers/modalSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice.reducer,
    modal: modalSlice.reducer,
    loader: loaderSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
