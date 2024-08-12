import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

const restaurantData = JSON.parse(localStorage.getItem("restaurant")) || [];

const restuarentSlice = createSlice({
  name: "restuarent",
  initialState: restaurantData,
  reducers: {
    addRestaurant: (state, action) => {
      const { id, accessToken, refreshToken } = action.payload;
      state.push({
        id,
      });

      localStorage.setItem("restaurant", JSON.stringify(state));
      Cookies.set("accessToken", accessToken, { expires: 1, secure: true });
      Cookies.set("refreshToken", refreshToken, { expires: 7, secure: true });
    },
    editResturant: (state, action) => {},
  },
});

export const { addRestaurant, editRestaurant } = restuarentSlice.actions;
export default restuarentSlice.reducer;
