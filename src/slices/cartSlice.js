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
        const find=state.cartIds.findIndex((item)=>item===action.payload.id);
        console.log(find,"find element")
        if(find)
        {
            console.log(action.payload.value==1?(state.quantity+=1):(state.quantity>0?state.quantity-=1:0));
        }
    },
    removeFromCart:(state,action)=>{
        state.cartIds=action.payload.value==0||state.quantity==0?state.cartIds.filter(item=>item!=action.payload.id):0;
    }
   }
})

export const {addToCart,updateCart,removeFromCart}=cartSlicer.actions
export default cartSlicer.reducer