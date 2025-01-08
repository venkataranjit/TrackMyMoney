import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const getCategory = createAsyncThunk(
  "transactions/recent",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_JSON_SERVER_URL}/categories`
      );
      const myCategories = response.data.filter(
        (t) => t.userId === userId || t.userId === "admin"
      );
      return myCategories;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: "recentTransactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.categories = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;
