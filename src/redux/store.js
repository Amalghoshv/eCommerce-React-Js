import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart"
import wishlistReducer from "./wishlist";

export const store = configureStore({
    reducer:{
        cart: cartReducer ,
        wishlist: wishlistReducer
        
    }
})