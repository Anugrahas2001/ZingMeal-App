import { createSlice } from "@reduxjs/toolkit";

const items = JSON.parse(localStorage.getItem("cartItems")) || [];

const cartItemSlice = createSlice({
  name: "cartItem",
  initialState: items,
  reducers: {
    addToCart: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload);
      if (index < 0) {
        state.push({ id: action.payload, quantity: 1 });
      } else {
        state[index].quantity += 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state));
    },
    updateCart: (state, action) => {
      const index = state.findIndex(
        (item) => item.id === action.payload.cartItemId
      );
      if (index < 0) return;

      state[index].quantity += action.payload.value;

      if (state[index].quantity <= 0 || action.payload.value === 0) {
        state.splice(index, 1);
      }

      localStorage.setItem("cartItems", JSON.stringify(state));
    },
    cartItemCounter: (state, action) => {
      const count = action.payload;
      localStorage.setItem("cartItemCounter", JSON.stringify(count));
    },
    clearCartItems: (state) => {
      return [];
    },
  },
});

export const { addToCart, updateCart, clearCartItems, cartItemCounter } =
  cartItemSlice.actions;

export const selectTotalQuantity = (state) => {
  return state.cartItem.reduce((total, item) => total + item.quantity, 0);
};

export default cartItemSlice.reducer;
