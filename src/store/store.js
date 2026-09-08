import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlices";
import wishlistReducer from "./slices/wishlistSlices"
export const store = configureStore ({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        wishlist: wishlistReducer
    }
})
