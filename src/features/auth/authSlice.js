import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import bcrypt from "bcryptjs";
import { toast } from "react-toastify";

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
      const unVerifiedUser = user.verification === "pending";
      const isPasswordValid = await bcrypt.compare(
        userDetails.password,
        user.password
      );
      if (!isPasswordValid) {
        throw new Error("Invalid Credentials");
      }
      if (unVerifiedUser) {
        throw new Error("Account Not Activated");
      }
      return user;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const themeSwitcher = createAsyncThunk(
  "user/colorTheme",
  async (color, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const userId = state.auth.user.id;
      console.log(userId, color);
      await axios.patch(
        `${import.meta.env.VITE_JSON_SERVER_URL}/users/${userId}`,
        { theme: color }
      );
      return color;
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
      toast.success("Logout Succesful");
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    activatedUserLogin: (state, action) => {
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
        const capitalize = (str) =>
          str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        toast.success(
          `Hey  ${capitalize(state.user.firstName)},  Welcome Back 😊`
        );
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.successMsg = null;
        toast.error(state.error);
      })
      .addCase(themeSwitcher.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMsg = null;
      })
      .addCase(themeSwitcher.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.successMsg = null;
        state.user.theme = action.payload;
      })
      .addCase(themeSwitcher.rejected, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.successMsg = null;
      });
  },
});

export const { clearMsg, logout, updateUser, activatedUserLogin } =
  authSlice.actions;

export default authSlice.reducer;
