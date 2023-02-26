import axios from "axios";
import { toast } from "react-toastify";

export const baseURL = "http://localhost:8000/api";

const API = axios.create({
  baseURL,
  headers: {},
});

// API.interceptors.response.use(
//   (response) => {
//     return response?.data;
//   },
//   (error) => {
//     console.log('ERROR IN API CONFIG', error)
//     const status = error?.response ? error?.response?.status : null;

//     if (error?.response?.data?.success === '0') {
//       toast.error(error?.response?.data?.message)
//     }


//     if (error?.response?.data?.success === "3") {
//       localStorage.clear();

//       window.location.href = "/login";

//       Promise.reject(
//         (error?.response && error?.response) || "Something went wrong"
//       );
//     }

//     if (status === 403) {
//       localStorage.clear();
//       window.location.href = "/login";
//     }

//     // Promise.reject(
//     //   (error?.response && error?.response) || "Something went wrong"
//     // );

//     return error?.response ? error?.response : "Something went wrong";
//   }
// );

export default API;
