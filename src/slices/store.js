import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'
import orderReducer from './orderSlice'
import menuReducer from './menuSlice'
import restuarentReducer from './restuarentSlice'

const store=configureStore({
    reducer:{
        cart:cartReducer,
        order:orderReducer,
        menu:menuReducer,
        restuarent: restuarentReducer
    }
})

export default store