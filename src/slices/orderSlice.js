import { createSlice } from "@reduxjs/toolkit";


const orderData =
  localStorage.getItem("orderItems") != 0
    ? JSON.parse(localStorage.getItem("orderItems"))
    : [];

const orderSlicer = createSlice({
  name: "order",
  initialState: orderData,
  reducers: {
    addOrder: (state, action) => {
      state.push({
        orderId: Math.floor(Math.random() * (200 - 10 + 1)) + 10,
        order: action.payload.order,
        totalPrice: action.payload.price,
        status: "Pending",
      });

      localStorage.setItem("orderItems", JSON.stringify(state));
    },
    cancelOrder: (state, action) => {
      const index = state.findIndex((item) => item.id == action.payload.id);
      state.splice(index, 1);
      localStorage.setItem("orderItems", state);
    },
  },
});

export const { addOrder, cancelOrder } = orderSlicer.actions;
export default orderSlicer.reducer;

// [
// {
//         id:16728
//         order:[ids],---->cartSlice(quantity),
//         status
//         totalPrice:"price",
//     }
// ]
