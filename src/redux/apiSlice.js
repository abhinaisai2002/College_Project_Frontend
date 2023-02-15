import axios from "axios";

import { createApi } from "@reduxjs/toolkit/query/react";

import { baseURL } from "../api/axiosConfig";
import API from "../api/axiosConfig";

axios.defaults.baseURL = baseURL;

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await API({
        url: baseURL + url,
        method,
        headers: {},
        params,
        data,
      });

      return { data: result };
    } catch (err) {
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
  endpoints: (builder) => ({}),
});


