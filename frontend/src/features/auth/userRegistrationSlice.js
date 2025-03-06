import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { nanoid } from "nanoid";

const initialState = {
  user: {},
  isLoading: false,
  error: null,
  successMsg: null,
};

export const userRegistration = createAsyncThunk(
  "user/registration",
  async (userDetails, { rejectWithValue }) => {
    try {
      const users = await axios.get(
        `${import.meta.env.VITE_JSON_SERVER_URL}/users`
      );
      const isEmailRegistered = users.data.some(
        (u) => u.email === userDetails.email
      );
      if (isEmailRegistered) {
        throw new Error("User Already Registered");
      }
      const token = nanoid();
      const randomOTP = Math.floor(1000 + Math.random() * 9000);
      await axios.post(
        `${import.meta.env.VITE_PUBLIC_BACKEND_LINK}/account-activation`,
        {
          email: userDetails.email,
          token: token,
          otp: randomOTP,
        }
      );
      const response = await axios.post(
        `${import.meta.env.VITE_JSON_SERVER_URL}/users`,
        {
          ...userDetails,
          id: uuidv4(),
          token: token,
          otp: randomOTP,
          verification: "pending",
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const accountActivation = createAsyncThunk(
  "user/activation",
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
          "Account Activation Link is invalid. Please Check Your Email for Verified Link."
        );
      }
      if (user.otp !== userDetails.otp) {
        throw new Error("Enter Valid OTP");
      }
      await axios.patch(
        `${import.meta.env.VITE_JSON_SERVER_URL}/users/${user.id}`,
        { verification: "success", token: "", otp: "" }
      );
      return user;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const userRegistrationSlice = createSlice({
  name: "userRegistration",
  initialState,
  reducers: {
    clearMsg: (state, action) => {
      state.error = action.payload.error;
      state.successMsg = action.payload.successMsg;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegistration.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMsg = null;
      })
      .addCase(userRegistration.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.successMsg = "Account Activation Link Sent to Mail";
        toast.success(state.successMsg);
      })
      .addCase(userRegistration.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.successMsg = null;
        toast.error(state.error);
      })
      .addCase(accountActivation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMsg = null;
      })
      .addCase(accountActivation.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.successMsg = "Account Activated";
        toast.success(state.successMsg);
      })
      .addCase(accountActivation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.successMsg = null;
        toast.error(state.error);
      });
  },
});

export const { clearMsg } = userRegistrationSlice.actions;

export default userRegistrationSlice.reducer;
