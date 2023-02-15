import { configureStore } from "@reduxjs/toolkit";

import authSlice from './reducers/authSlice';
import loaderSlice from "./reducers/loaderSlice";
import modalSlice from "./reducers/modalSlice";

const store = configureStore({
  reducer: {
    auth : authSlice.reducer,
    modal : modalSlice.reducer,
    loader : loaderSlice.reducer
  },
});

export default store;
