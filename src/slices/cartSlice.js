import { createSlice } from "@reduxjs/toolkit";
// import { UPDATE_CART_REMOVE } from '../constants/constants'

const items =
  localStorage.getItem("cartItems") != 0
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const cartSlicer = createSlice({
  name: "cart",
  initialState: items,
  reducers: {
    addToCart: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload);
      if (index < 0) state.push({ id: action.payload, quantity: 1 });
      else state[index].quantity += 1;

      localStorage.setItem("cartItems", JSON.stringify(state));
    },
    updateCart: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index < 0) return;
      state[index].quantity += action.payload.value;
      if (
        state[index].quantity <= 0 ||
        action.payload.value == 0
      ) {
        state.splice(index, 1);
      }
      localStorage.setItem("cartItems", JSON.stringify(state));
    },
  },
});

export const { addToCart, updateCart, getTotalQuantity } = cartSlicer.actions;

export const selectTotalQuantity = (state) => {
  return state.cart.reduce((total, item) => total + item.quantity, 0);
};

export default cartSlicer.reducer;

// Number-11 -->{}
// string-"anu" {0: 'a', 1: 'n', 2: 'u'}
// boolean-false {}
// array-["anu"]  {0: 'a', 1: 'b'}
// object-{
//     id:1,
//     name:"anu"
// }
