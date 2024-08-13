import { createSlice } from "@reduxjs/toolkit";

const items = JSON.parse(localStorage.getItem("cartItems")) || [];

const cartItemSlice = createSlice({
  name: "cartItem",
  initialState: items,
  reducers: {
    addToCart: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload);
      console.log(action.payload,"payloadddd")
      if (index < 0) {
        state.push({ Id: action.payload, quantity: 1 });
      } else {
        state[index].quantity += 1;
      }

      localStorage.setItem("cartItems", JSON.stringify([]));
    },
    updateCart: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.cartItemId);
    
      if (index < 0) return;

      state[index].quantity += action.payload.value;
    
      if (state[index].quantity <= 0 || action.payload.value === 0) {
        state.splice(index, 1);
      }
    
    },
    clearCartItems: (state) => {
      localStorage.setItem("cartItems", JSON.stringify(state));
    },
  },
});

export const { addToCart, updateCart, clearCartItems } = cartItemSlice.actions;

export const selectTotalQuantity = (state) => {
  return state.cartItem.reduce((total, item) => total + item.quantity, 0);
};

export default cartItemSlice.reducer;
