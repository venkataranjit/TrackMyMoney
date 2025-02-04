import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  transactions: [],
  isLoading: false,
  error: null,
};

export const getTransactions = createAsyncThunk(
  "transactions/get",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_JSON_SERVER_URL}/transactions`
      );
      const myTransactions = response.data.filter((t) => t.userId === userId);
      const sortedTransactions = myTransactions.sort(
        (a, b) => Number(b.createdAt) - Number(a.createdAt)
      );
      return sortedTransactions;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const getTransactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.transactions = [...action.payload];
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// export const { } = getTransactionsSlice.actions;

export default getTransactionsSlice.reducer;
