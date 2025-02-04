import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

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
      const response = await axios.post(
        `${import.meta.env.VITE_JSON_SERVER_URL}/users`,
        {
          ...userDetails,
          id: uuidv4(),
        }
      );
      return response.data;
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
        state.successMsg = "User Registered";
      })
      .addCase(userRegistration.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.successMsg = null;
      });
  },
});

export const { clearMsg } = userRegistrationSlice.actions;

export default userRegistrationSlice.reducer;
