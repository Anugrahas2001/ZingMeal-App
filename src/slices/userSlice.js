import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const userData = JSON.parse(localStorage.getItem("user")) || {};

const userSlice = createSlice({
  name: "user",
  initialState: userData,
  reducers: {
    addUser: (state, action) => {
      const { id, accessToken, refreshToken } = action.payload;

      state.id = id;

      localStorage.setItem("user", JSON.stringify({ id }));

      Cookies.set("accessToken", accessToken, { expires: 1, secure: true });
      Cookies.set("refreshToken", refreshToken, { expires: 7, secure: true });
    },
    removeUser: (state) => {
      localStorage.removeItem("user");
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      return {};
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
