import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  error: null,
  successMsg: null,
};

export const userEdit = createAsyncThunk(
  "user/edit",
  async (userDetails, { rejectWithValue }) => {
    try {
      const user = await axios.get(
        `${import.meta.env.VITE_JSON_SERVER_URL}/users/${userDetails.id}`
      );
      const updatedUser = { ...user.data, ...userDetails };
      const response = await axios.put(
        `${import.meta.env.VITE_JSON_SERVER_URL}/users/${userDetails.id}`,
        updatedUser
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const userEditSlice = createSlice({
  name: "editUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userEdit.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMsg = null;
      })
      .addCase(userEdit.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.successMsg = "User Updated";
      })
      .addCase(userEdit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.successMsg = null;
      });
  },
});

export const {} = userEditSlice.actions;

export default userEditSlice.reducer;
