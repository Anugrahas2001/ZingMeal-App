import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const userData = JSON.parse(localStorage.getItem("user")) || [];

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    addUser: (state, action) => {
      const {id,accessToken,refreshToken}=action.payload;
      state.push({
        id
      });

      localStorage.setItem("user", JSON.stringify(state)); 
      Cookies.set("accessToken", accessToken, { expires: 1, secure: true });
      Cookies.set("refreshToken", refreshToken, { expires: 7, secure: true });
    
    },
    removeUser: () => {
      localStorage.removeItem("user");
      Cookies.remove("token");
      return [];
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
