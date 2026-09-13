import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("user");
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: savedUser ? JSON.parse(savedUser) : null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const selectIsAdmin = (state) => {
  return state.auth.user?.role === "admin";
};

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
