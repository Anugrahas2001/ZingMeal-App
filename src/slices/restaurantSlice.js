import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const restaurantData = JSON.parse(localStorage.getItem("restaurant")) || {};

const restuarentSlice = createSlice({
  name: "restuarent",
  initialState: restaurantData,
  reducers: {
    addRestaurant: (state, action) => {
      const { id, accessToken, refreshToken } = action.payload;
      state.id = id;

      localStorage.setItem("restaurant", JSON.stringify({ id }));
      Cookies.set("accessToken", accessToken, { expires: 1, secure: true });
      Cookies.set("refreshToken", refreshToken, { expires: 7, secure: true });
    },
    editResturant: (state, action) => {},
    removeRestaurant: (state) => {
      localStorage.removeItem("restaurant");
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      return {};
    },
  },
});

export const { addRestaurant, editRestaurant, removeRestaurant } =
  restuarentSlice.actions;
export default restuarentSlice.reducer;
