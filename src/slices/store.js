import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'
import orderReducer from './orderSlice'
import menuReducer from './menuSlice'
import restuarentReducer from './restuarentSlice'
import userReducer from './userSlice'

const store=configureStore({
    reducer:{
        cart:cartReducer,
        order:orderReducer,
        menu:menuReducer,
        restuarent: restuarentReducer,
        user:userReducer
    }
})

export default store