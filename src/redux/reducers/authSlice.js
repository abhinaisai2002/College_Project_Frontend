import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    // access: null,
    // refresh: null,
    // user: null,
    // isAuthenticated: false,

    access: 'hello',
    refresh: 'hello',
    user: {email: "19bq1a05i7@vvit.net", user_type: "teacher"},
    isAuthenticated: true,
  },
  reducers: {
    signup(state, data) {
      localStorage.setItem("access", data.payload.access);
      localStorage.setItem("refresh", data.payload.refresh);
      localStorage.setItem("user", JSON.stringify(data.payload.user));
      state.access = data.payload.access;
      state.refresh = data.payload.refresh;
      state.isAuthenticated = true;
      state.user = data.payload.user;
    },
    loginDataFromLocal(state, data) {
      state.access = data.payload.access;
      state.refresh = data.payload.refresh;
      state.isAuthenticated = true;
      state.user = data.payload.user;
    },
    login(state, data) {
      localStorage.setItem("access", data.payload.access);
      localStorage.setItem("refresh", data.payload.refresh);
      localStorage.setItem("user", JSON.stringify(data.payload.user));
      state.access = data.payload.access;
      state.refresh = data.payload.refresh;
      state.isAuthenticated = true;
      state.user = data.payload.user;
      console.log(data.payload);
    },
    logout(state) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");

      state.isAuthenticated = false;
      state.access = null;
      state.refresh = null;
      state.user = null;
    },
    getNewToken(state, { payload }) {
      localStorage.setItem("access", payload.access);
      localStorage.setItem("access", payload.refresh);

      state.access = payload.access;
      state.refresh = payload.refresh;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
