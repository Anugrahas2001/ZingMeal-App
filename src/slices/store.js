import { configureStore } from "@reduxjs/toolkit";
import cartItemReducer from './cartItemSlice'
import orderReducer from './orderSlice'
import menuReducer from './menuSlice'
import restuarentReducer from './restaurantSlice'
import userReducer from './userSlice'
import cartReducer from './cartSlice'

const store=configureStore({
    reducer:{
        cartItem:cartItemReducer,
        cart:cartReducer,
        order:orderReducer,
        menu:menuReducer,
        restuarent: restuarentReducer,
        user:userReducer
    }
})

export default store