import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  successMsg: null,
};

export const editTransaction = createAsyncThunk(
  "transactions/edit",
  async (transactionDetails, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_JSON_SERVER_URL}/transactions/${
          transactionDetails.id
        }`,
        {
          ...transactionDetails,
          updatedAt: Date.now(),
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const editTransactionSlice = createSlice({
  name: "addTransaction",
  initialState,
  reducers: {
    editClearMsg: (state, action) => {
      state.error = action.payload.error;
      state.successMsg = action.payload.successMsg;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editTransaction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMsg = null;
      })
      .addCase(editTransaction.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.successMsg = "Transaction Updated";
        toast.success(state.successMsg);
      })
      .addCase(editTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.successMsg = null;
        toast.error(state.error);
      });
  },
});

export const { editClearMsg } = editTransactionSlice.actions;

export default editTransactionSlice.reducer;
