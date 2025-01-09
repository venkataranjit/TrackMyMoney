import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  categories: [],
  isLoading: false,
  error: null,
  successMsg: null,
};

export const getCategory = createAsyncThunk(
  "categories/get",
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

export const postCategory = createAsyncThunk(
  "categories/post",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_JSON_SERVER_URL}/categories`,
        { id: uuidv4(), ...data }
      );
      return response.data;
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
      })
      .addCase(postCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMsg = null;
      })
      .addCase(postCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.successMsg = "Category Added";
        state.categories = state.categories.push(action.payload);
      })
      .addCase(postCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.successMsg = null;
        state.error = action.payload;
      });
  },
});

// export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;
