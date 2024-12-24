import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  transactions: [],
  isLoading: false,
  error: null,
  successMsg: null,
};

export const addTransaction = createAsyncThunk(
  "transactions/add",
  async (transactionDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_JSON_SERVER_URL}/transactions`,
        {
          ...transactionDetails,
          id: uuidv4(),
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const addTransactionSlice = createSlice({
  name: "addTransaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTransaction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMsg = null;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.successMsg = "Transaction Successful";
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.successMsg = null;
      });
  },
});

// export const {} = addTransactionSlice.actions;

export default addTransactionSlice.reducer;