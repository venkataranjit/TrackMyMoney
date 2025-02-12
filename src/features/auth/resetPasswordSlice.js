import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import bcrypt from "bcryptjs";

const initialState = {
  user: {},
  isLoading: false,
  error: null,
  successMsg: null,
};

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (userDetails, { rejectWithValue }) => {
    try {
      const users = await axios.get(
        `${import.meta.env.VITE_JSON_SERVER_URL}/users`
      );
      const user = users.data.find(
        (u) => u.email === userDetails.email && u.token === userDetails.token
      );
      if (!user) {
        throw new Error(
          "The password reset link is invalid or has expired. Please request a new one."
        );
      }
      const hashedPassword = await bcrypt.hash(userDetails.password, 10);
      await axios.patch(
        `${import.meta.env.VITE_JSON_SERVER_URL}/users/${user.id}`,
        { password: hashedPassword, token: "" }
      );

      return { user };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const resetPasswordSlice = createSlice({
  name: "reset",
  initialState,
  reducers: {
    clearMsg: (state) => {
      state.error = null;
      state.successMsg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMsg = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.successMsg = "Your password has been changed successfully!";
        state.user = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.successMsg = null;
      });
  },
});

export const { clearMsg } = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
