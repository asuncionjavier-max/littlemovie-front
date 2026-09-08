import { createSlice } from "@reduxjs/toolkit";

const savedCart = localStorage.getItem("cart")
const cartSlice = createSlice({
    name: "cart",
    initialState: savedCart ? JSON.stringify(savedCart) : [],

    reducers:{
        addToCart: (state, action) =>{
            const movie = action.payload
            const exists = state.items.some((item) => item.id === movieId )
            if(!exists){
                state.items.push(movie)
                localStorage.setItem("cart", JSON.stringify(state.items) )
            }
        },
        removeToCart: (state, action) =>{
            const movieId = action.payload
            state.items = state.items.filter((item) => item.id !== movieId);
            localStorage.setItem("cart", JSON.stringify(state.item))
        },
        clearCart: (state) =>{
            state.items = []
            localStorage.removeItem("cart")
        },
    },
});

export const {addToCart, removeToCart, clearCart} = cartSlice.actions;

export default cartSlice.reducer;