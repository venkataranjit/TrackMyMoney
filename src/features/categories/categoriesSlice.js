import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
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
      const myCategories = response.data
        .filter((t) => t.userId === userId || t.userId === "admin")
        .sort((a, b) => a.name.localeCompare(b.name));
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

export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_JSON_SERVER_URL}/categories/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const editCategory = createAsyncThunk(
  "categories/edit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_JSON_SERVER_URL}/categories/${data.id}`,
        {
          name: data.name,
        }
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
  reducers: {
    clearMsg: (state, action) => {
      state.error = action.payload.error;
      state.successMsg = action.payload.successMsg;
    },
  },
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
        toast.success(state.successMsg);
      })
      .addCase(postCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.successMsg = null;
        state.error = action.payload;
        toast.error(state.error);
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMsg = null;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.successMsg = "Category Deleted";
        toast.success(state.successMsg);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.successMsg = null;
        state.error = action.payload;
        toast.error(state.error);
      })
      .addCase(editCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMsg = null;
      })
      .addCase(editCategory.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.successMsg = "Category Edited";
        toast.success(state.successMsg);
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.successMsg = null;
        state.error = action.payload;
        toast.error(state.error);
      });
  },
});

export const { clearMsg } = categoriesSlice.actions;

export default categoriesSlice.reducer;
