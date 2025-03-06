import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  deletedTransaction: {},
  isLoading: false,
  error: null,
  successMsg: null,
};

export const deleteTransaction = createAsyncThunk(
  "transactions/delete",
  async (transactionId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_JSON_SERVER_URL}/transactions/${transactionId}`
      );
      return { id: transactionId };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const deleteTransactionSlice = createSlice({
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
      .addCase(deleteTransaction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMsg = null;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.successMsg = "Transaction Deleted Succesfully";
        state.deletedTransaction = action.payload;
        toast.success(state.successMsg);
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.successMsg = null;
        toast.error(state.error);
      });
  },
});

export const { clearMsg } = deleteTransactionSlice.actions;

export default deleteTransactionSlice.reducer;
