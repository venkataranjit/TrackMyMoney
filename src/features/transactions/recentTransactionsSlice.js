import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  recentTransactions: [],
  isLoading: false,
  error: null,
};

export const recentTransactions = createAsyncThunk(
  "transactions/recent",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_JSON_SERVER_URL}/transactions`
      );
      const myTransactions = response.data.filter((t) => t.userId === userId);
      const sortedTransactions = myTransactions.sort(
        (a, b) => Number(b.updatedAt) - Number(a.updatedAt)
      );
      return sortedTransactions;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const recentTransactionsSlice = createSlice({
  name: "recentTransactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(recentTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(recentTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.recentTransactions = [...action.payload];
      })
      .addCase(recentTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// export const {} = recentTransactionsSlice.actions;

export default recentTransactionsSlice.reducer;
