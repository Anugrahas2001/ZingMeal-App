import { createSlice } from "@reduxjs/toolkit";

const cartSlicer = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    quantity: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
      state.quantity = 1;
    },
    updateCart: (state, action) => {
      const index = state.cart.findIndex(
        (item) => item.id == action.payload.id
      );
      if (index >= 0) {
        action.payload.value == 1
          ? (state.cart[index].quantity += 1)
          : (state.cart[index].quantity>0?(state.cart[index].quantity -= 1):0);
      }
    },
    removeFromCart: (state, action) => {
        state.cart=action.payload.value == 0
        ? state.cart.filter((item) => item.id != action.payload.id)
        : 0;
    },
  },
});

export const {addToCart,updateCart,removeFromCart}=cartSlicer.actions
export default cartSlicer.reducer