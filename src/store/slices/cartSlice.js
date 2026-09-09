import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../config/axios";


export const fetchCartApi = createAsyncThunk(
    "cart/fetchCart",
    async (_, { rejectWithValue }) => {
    try {
        const response = await apiClient.get("/cart");
            return response.data.data; 
    } catch (error) {
            return rejectWithValue( error.response?.data?.message || "Error al obtener el carrito");
        }
    }
);


export const addToCartApi = createAsyncThunk(
    "cart/addToCart",
    async (movieId, { rejectWithValue }) => {
    try {
        const response = await apiClient.post("/cart", { movieId });
            return response.data.data;
    } catch (error) {
    return rejectWithValue(error.response?.data?.message || "No se pudo añadir al carrito");
        }
    }
);


export const removeFromCartApi = createAsyncThunk(
    "cart/removeFromCart",
    async (movieId, { rejectWithValue }) => {
    try {
        await apiClient.delete("/cart", { data: { movieId } });
            return movieId;
    } catch (error) {
    return rejectWithValue( error.response?.data?.message || "No se pudo eliminar del carrito");
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
    builder
        .addCase(fetchCartApi.pending, (state) => {
            state.loading = true;
            state.error = null;
    })
        .addCase(fetchCartApi.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload || [];
    })
        .addCase(fetchCartApi.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
    })
    
        .addCase(addToCartApi.fulfilled, (state, action) => {
            if (action.payload) {
            const exists = state.items.some(
            (item) => item.id === action.payload._id
        );
        if (!exists) {
            state.items.push(action.payload);
            }
        }
    })
    
    .addCase(removeFromCartApi.fulfilled, (state, action) => {
        state.items = state.items.filter(
        (item) => (item.id !== action.payload)
        );
    });
},
});

export default cartSlice.reducer;