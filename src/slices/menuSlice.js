import { createSlice } from "@reduxjs/toolkit";

const menuSlicer = createSlice({
  name: "menu",
  initialState: [],
  reducers: {
    addMenu: (state, action) => {
      state.push({
        name: action.payload.name,
        category: action.payload.category,
        type: action.payload.type,
        price:action.payload.price,
        description:action.payload.description,
        ratings:1,
        image:action.payload.image
      });
    },
  },
});
export const { addMenu } = menuSlicer.actions;
export default menuSlicer.reducer;
