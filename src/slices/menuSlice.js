import { createSlice } from "@reduxjs/toolkit";

const menuData =
  localStorage.getItem("menuItem") != 0
    ? JSON.parse(localStorage.getItem("menuItem"))
    : [];

const menuSlicer = createSlice({
  name: "menu",
  initialState: [],
  reducers: {
    addMenu: (state, action) => {
      state.push({
        name: action.payload.foodName,
        category: action.payload.foodCategory,
        type: action.payload.isVeg ? "Veg" : "Non-Veg",
        price: action.payload.price,
        description: action.payload.description,
        ratings: 1,
        // image: action.payload.imageFile
      });

      localStorage.setItem("menuItem", JSON.stringify(state));
    },
  },
});
export const { addMenu } = menuSlicer.actions;
export default menuSlicer.reducer;
