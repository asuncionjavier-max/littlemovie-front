import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../config/axios";
import toast from "react-hot-toast";

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/wishlist");
      return response.data.data; // Array con las películas que retorna tu controller
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al cargar la wishlist",
      );
    }
  },
);

export const addToWishlistApi = createAsyncThunk(
  "wishlist/addToWishlistApi",
  async (movie, { rejectWithValue, dispatch }) => {
    const toastId = toast.loading("Añadiendo pelicula a la wishlist");
    try {
      const movieId = movie.id;
      await apiClient.post("/wishlist/", { movie: movieId });
      toast.success(`"${movie.title}" añadida a la wishlist`, { id: toastId });
      dispatch(fetchWishlist());
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error al añadir";
      toast.error(errorMessage, { id: toastId });
      return rejectWithValue(errorMessage);
    }
  },
);

export const removeFromWishlistApi = createAsyncThunk(
  "wishlist/removeFromWishlistApi",
  async (movie, { rejectWithValue, dispatch }) => {
    const toastId = toast.loading("Quitando pelicula de la wishlist");
    try {
      const movieId = movie.id;
      await apiClient.delete(`/wishlist/${movieId}`);

      toast.success(`"${movie.title}" eliminada de la wishlist`, {
        id: toastId,
      });
      dispatch(fetchWishlist());
      return movieId;
    } catch (error) {
      const message =
        error.response?.data?.message || "Error al eliminar de la wishlist";
      toast.error(message, { id: toastId });
      return rejectWithValue(message);
    }
  },
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
      })
      .addCase(removeFromWishlistApi.fulfilled, (state, action) => {
        const removedId = action.payload;
        state.items = state.items.filter(
          (item) => (item.id || item._id) !== removedId,
        );
      });
  },
});

export default wishlistSlice.reducer;
