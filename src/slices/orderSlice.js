import { createSlice } from "@reduxjs/toolkit";

const orderData = JSON.parse(localStorage.getItem("orderItems")) || [];

const orderSlice = createSlice({
  name: "order",
  initialState: orderData,
  reducers: {
    addOrder: (state, action) => {
      state.push({
id:action.payload
      })

      localStorage.setItem("orderItems", JSON.stringify(state));
    },
    cancelOrder: (state, action) => {
      const index = state.findIndex(
        (item) => item.orderId === action.payload.id
      );
      state.splice(index, 1);
      localStorage.setItem("orderItems", JSON.stringify(state));
    },
  },
});

export const { addOrder, cancelOrder } = orderSlice.actions;
export default orderSlice.reducer;

// [
//  {
//   id:--,
//   order:[{id,quantity},{id,quantity}],
//   status:" ",
//   totalPrice:--
//  },{
//   id:--,
//   order:[{id,quantity},{id,quantity}],
//   status:" ",
//   totalPrice:--
//  }
// ]
