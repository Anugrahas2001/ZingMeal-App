import { createSlice } from "@reduxjs/toolkit";

const restuarentSlice = createSlice({
  name: "restuarent",
  initialState: [],
  reducers: {
    addRestaurant: (state, action) => {
      state.push({ restaurant: action.payload });
    },
    editResturant: (state, action) => {},
  },
});

export const { addRestaurant, editRestaurant } = restuarentSlice.actions;
export default restuarentSlice.reducer;
