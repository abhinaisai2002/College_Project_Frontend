/// ACTION CREATORS

import axios from "axios";
import { baseURL } from "../../api/axiosConfig";
import API from "../../api/axiosConfig";

import { modalActions } from "../reducers/modalSlice";

export const signUpAction = (user) => {
  return async (dispatch) => {
    const signup = async () => {
      const response = await API({
        url: baseURL + "/auth/signup",
        method: "POST",
        data: user,
      });

      //   const response = await axios.post(
      //     `http://localhost:8000/api/auth/signup`,
      //     user,
      //     {
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   );
      const { data } = response;
      return data;
    };

    try {
      const data = await signup();
      dispatch(
        modalActions.showModal(
          "Your account is in pending state, consult your admin to activate your account"
        )
      );
    } catch (err) {
      const { message } = err.response.data;
      dispatch(modalActions.showModal(message));
    }
  };
};
