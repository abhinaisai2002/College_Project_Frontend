import { configureStore } from "@reduxjs/toolkit";

import authSlice from './reducers/authSlice';
import loaderSlice from "./reducers/loaderSlice";
import modalSlice from "./reducers/modalSlice";
import assignmentsSlice from "./reducers/assignmentSlice";

const store = configureStore({
  reducer: {
    auth : authSlice.reducer,
    modal : modalSlice.reducer,
    loader : loaderSlice.reducer,
    studentAssignments: assignmentsSlice.reducer
  },
});

export default store;
