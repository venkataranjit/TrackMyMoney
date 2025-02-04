import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import bcrypt from "bcryptjs";

const initialState = {
  user: {},
  isLoading: false,
  error: null,
  successMsg: null,
};

export const userLogin = createAsyncThunk(
  "user/login",
  async (userDetails, { rejectWithValue }) => {
    try {
      const users = await axios.get(
        `${import.meta.env.VITE_JSON_SERVER_URL}/users`
      );
      const user = users.data.find((u) => u.email === userDetails.email);
      if (!user) {
        throw new Error("User Not Registered");
      }

      const isPasswordValid = await bcrypt.compare(
        userDetails.password,
        user.password
      );
      if (!isPasswordValid) {
        throw new Error("Invalid Credentials");
      }
      return user;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearMsg: (state, action) => {
      state.error = action.payload.error;
      state.successMsg = action.payload.successMsg;
    },
    logout: (state) => {
      state.user = {};
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMsg = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.successMsg = "Login Succesfull";
        state.user = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.successMsg = null;
      });
  },
});

export const { clearMsg, logout, updateUser } = authSlice.actions;

export default authSlice.reducer;
