import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { URI } from "./app.config";

const getToken = () => {
  return localStorage.getItem("token");
};

export const apiService = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: URI,
    prepareHeaders: (headers) => {
      const token = getToken();

      if (token) headers.set("Authorization", `Bearer ${token}`);

      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default apiService;
