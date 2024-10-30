import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { URI } from "./app.config";

export const apiService = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: URI }),
  endpoints: () => ({}),
});

export default apiService;
