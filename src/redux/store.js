import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../redux/cartSlice.js'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    }

})
export default store;