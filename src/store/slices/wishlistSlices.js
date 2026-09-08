import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../config/axios";

// 1. Petición GET para traer la wishlist de la BD
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/wishlist");
      return response.data.data; // Array con las películas que retorna tu controller
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error al cargar la wishlist");
    }
  }
);

// 2. Petición POST para añadir una película
export const addToWishlistApi = createAsyncThunk(
  "wishlist/addToWishlistApi",
  async (movieId, { rejectWithValue, dispatch }) => {
    try {
      await apiClient.post("/wishlist", { movie: movieId });
      dispatch(fetchWishlist()); // Recargamos la lista actualizada
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error al añadir");
    }
  }
);

// 3. Petición DELETE para borrar una película
export const removeFromWishlistApi = createAsyncThunk(
  "wishlist/removeFromWishlistApi",
  async (movieId, { rejectWithValue, dispatch }) => {
    try {
      await apiClient.delete(`/wishlist/${movieId}`);
      dispatch(fetchWishlist()); // Recargamos la lista actualizada
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error al eliminar");
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default wishlistSlice.reducer;