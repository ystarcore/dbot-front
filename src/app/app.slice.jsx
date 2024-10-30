import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: !!localStorage.getItem("token"),
  user: {},
};

export const appSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuth = true;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.isAuth = false;
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = appSlice.actions;

export default appSlice.reducer;
