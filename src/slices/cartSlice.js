import { createSlice } from "@reduxjs/toolkit";

const cartSlicer=createSlice({
    name:"cart",
    initialState:{
        cartIds:[],
        quantity:0
    },
   reducers:{
    addToCart:(state,action)=>{  
        state.cartIds.push(action.payload)
        state.quantity=1  
    },
    updateCart:(state,action)=>{
        const find=state.cartIds.some((item)=>item===action.payload.id);
        console.log(find,"find element")
        if(find>=0)
        {
            action.payload.value==1?(state.quantity+=1):state.quantity[find]-=1;
        }
    }
   }
})

export const {addToCart,updateCart}=cartSlicer.actions
export default cartSlicer.reducer