import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../config/axios";
import toast from "react-hot-toast";

export const fetchCartApi = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/cart");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al obtener el carrito",
      );
    }
  },
);

export const addToCartApi = createAsyncThunk(
  "cart/addToCart",
  async (movie, { rejectWithValue }) => {
    const movieId = movie.id;
    const toastId = toast.loading("Añadiendo al carrito...");
    try {
      const response = await apiClient.post("/cart", { movieId });
      toast.success(`Añadido al carrito`, { id: toastId });
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "No se pudo añadir al carrito";
      toast.error(errorMessage, { id: toastId });
      return rejectWithValue(errorMessage);
    }
  },
);

export const removeFromCartApi = createAsyncThunk(
  "cart/removeFromCart",
  async (movie, { rejectWithValue }) => {
    const movieId = movie.id;
    const toastId = toast.loading("Eliminando del carrito...");
    try {
      await apiClient.delete("/cart", { data: { movieId } });
      toast.success(` Eliminado del carrito`, { id: toastId });
      return movieId;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "No se pudo eliminar del carrito";
      toast.error(errorMessage, { id: toastId });
      return rejectWithValue(errorMessage);
    }
  },
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
            (item) => item.id === action.payload._id,
          );
          if (!exists) {
            state.items.push(action.payload);
          }
        }
      })

      .addCase(removeFromCartApi.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default cartSlice.reducer;
