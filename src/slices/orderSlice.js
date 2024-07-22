import { createSlice } from "@reduxjs/toolkit";

const orderSlicer=createSlice({
    name:"order",
    initialState:[],
    reducers:{
        addOrder:(state,action) => {
            state.push({orderId: action.payload.order , totalPrice: action.payload.price});
        }
    }
})

export const {addOrder} = orderSlicer.actions;
export default orderSlicer.reducer


// [
//     {
//         id:[ids],---->cartSlice(quantity),
//         status
//         totalPrice:"price",
//     }
// ]