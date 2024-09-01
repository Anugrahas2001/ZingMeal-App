import { createSlice } from "@reduxjs/toolkit";

const cartData = JSON.parse(localStorage.getItem("cart")) || {};

const cartSlicer = createSlice({
  name: "cart",
  initialState: cartData,
  reducers: {
    createCart: (state, action) => {
      const { id } = action.payload;
      state.id = id;
      localStorage.setItem("cart", JSON.stringify({ id }));
    },
    clearCart: (state) => {
      localStorage.setItem("cart", JSON.stringify({}));
    },
  },
});

export const { createCart, clearCart } = cartSlicer.actions;
export default cartSlicer.reducer;
