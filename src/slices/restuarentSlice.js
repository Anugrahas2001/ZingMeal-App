import { createSlice } from "@reduxjs/toolkit";

const restuarentSlice = createSlice({
  name: "restuarent",
  initialState: [],
  reducers: {
    addRestuarent: (state, action) => {
      state.push({ resturent: action.payload, ratings: 1 });
    },
    editResturant: (state, action) => {
      // we need id
    },
  },
});

export const { addRestuarent, editResturant } = restuarentSlice.actions;
export default restuarentSlice.reducer;
