import axios from "axios";

import { createApi } from "@reduxjs/toolkit/query/react";

import { baseURL } from "../api/axiosConfig";
// import API from "../api/axiosConfig";
import { toast } from "react-toastify";

axios.defaults.baseURL = baseURL;

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({
        url: baseURL + url,
        method,
        headers: {
          Authorization: `bearer ${localStorage.getItem("access")}`,
        },
        params,
        data,
      });

      return result
    } catch (err) {
      console.log('ERROR', err)
      const errorMsg =
        err?.response?.data?.message ||
        err?.response?.data?.detail ||
        err?.message ||
        err?.response?.data;
      return {
        error: {
          status: err.response?.status,
          message: errorMsg,
        },
      };
    }
  };

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: baseURL,
  }),
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (params) => ({
        url: "/auth/profile",
        method: "GET",
        params
      })
    })
  }),
});


export const {useGetProfileQuery} = apiSlice