import { configureStore } from "@reduxjs/toolkit";

import appReducer from "./app.slice";
import { apiService } from "./app.service";

export const store = configureStore({
  reducer: {
    app: appReducer,
    [apiService.reducerPath]: apiService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
});
