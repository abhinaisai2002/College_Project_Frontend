import { configureStore } from "@reduxjs/toolkit";

import authSlice from './reducers/authSlice';
import modalSlice from "./reducers/modalSlice";

const store = configureStore({
  reducer: {
    auth : authSlice.reducer,
    modal : modalSlice.reducer
  },
});

export default store;
