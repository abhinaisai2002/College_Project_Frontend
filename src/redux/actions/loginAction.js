/// ACTION CREATORS

import axios from "axios";
import { toast } from "react-toastify";

import API from "../../api/axiosConfig";
import { baseURL } from "../../api/axiosConfig";

import { authActions } from "../reducers/authSlice";
import { modalActions } from "../reducers/modalSlice";

export const loginAction = (user) => {
  return async (dispatch) => {
    const login = async () => {
      const response = await API({
        url: baseURL + "/auth/login",
        method: "POST",
        data: user,
      });

      // const response = await axios.post(
      //   `http://localhost:8000/api/auth/login`,
      //   user,

      // );
      const { data } = response;
      return data;
    };

    try {
      const data = await login();
      dispatch(authActions.login(data));
      toast.success("Login successfully");
    } catch (err) {
      const { message } = err.response.data;
      dispatch(modalActions.showModal(message));
    }
  };
};

export const getNewTokens = (refreshToken) => {
  return async (dispatch) => {
    const token = {
      refresh: refreshToken,
    };
    const getToken = async () => {
      const response = await API({
        url: baseURL + "/auth/o/token",
        method: "POST",
        data: token,
      });

      // const response = await axios.post(
      //   "http://localhost:8000/api/auth/o/token",
      //   token,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      const { data } = response;
      return data;
    };

    try {
      const data = await getToken();
      dispatch(authActions.getNewToken(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const logOut = (refresh) => {
  return async (dispatch) => {
    const logout = async () => {
      const response = await API({
        url: baseURL + "/auth/logout",
        method: "POST",
        data: { refresh },
      });
      // const response = await axios.post(
      //   "http://127.0.0.1:8000/api/auth/logout",
      //   {
      //     refresh,
      //   },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      const { data } = response;
      return data;
    };

    try {
      const data = await logOut();
      dispatch(authActions.logout());
    } catch (err) {
      toast.warning("Something went wrong");
    }
  };
};
