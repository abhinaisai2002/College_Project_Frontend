import axios from "axios";

export const baseURL = "http://localhost:8000/api";

const API = axios.create({
  baseURL,
  headers: {},
});

API.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    const status = error?.response ? error?.response?.status : null;

    if (error?.response?.data?.success === "3") {
      localStorage.clear();

      window.location.href = "/login";

      Promise.reject(
        (error?.response && error?.response) || "Something went wrong"
      );
    }

    if (status === 403) {
      localStorage.clear();
      window.location.href = "/login";
    }

    Promise.reject(
      (error?.response && error?.response) || "Something went wrong"
    );

    return error?.response ? error?.response : "Something went wrong";
  }
);

export default API;
