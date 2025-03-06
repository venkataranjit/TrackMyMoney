import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

const initialState = {
  user: {},
  isLoading: false,
  error: null,
  successMsg: null,
};

export const forgetPassword = createAsyncThunk(
  "user/forgetPassword",
  async (mailId, { rejectWithValue }) => {
    try {
      const users = await axios.get(
        `${import.meta.env.VITE_JSON_SERVER_URL}/users`
      );
      const user = users.data.find((u) => u.email === mailId);
      if (!user) {
        throw new Error("User Not Exist");
      }
      const token = nanoid();
      await axios.post(
        `${import.meta.env.VITE_PUBLIC_BACKEND_LINK}/request-resetPassword`,
        {
          email: mailId,
          token: token,
        }
      );
      await axios.patch(
        `${import.meta.env.VITE_JSON_SERVER_URL}/users/${user.id}`,
        { token: token }
      );

      return { user, token };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const forgetPasswordSlice = createSlice({
  name: "forget",
  initialState,
  reducers: {
    clearMsg: (state) => {
      state.error = null;
      state.successMsg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMsg = null;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.successMsg = "A password reset link is on its way to your email.";
        state.user = { ...action.payload.user, token: action.payload.token };
        toast.success(state.successMsg);
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.successMsg = null;
        toast.error(state.error);
      });
  },
});

export const { clearMsg } = forgetPasswordSlice.actions;

export default forgetPasswordSlice.reducer;
