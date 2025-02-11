import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { nanoid } from "nanoid";
// import nodemailer from "nodemailer";

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
      const token = nanoid(32);
      const transporter = nodemailer.createTransport({
        host: "smtp.relay.brevo.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: "8578ec001@smtp-brevo.com",
          pass: "U4KnwAVaXLyB1GOz",
        },
      });
      const content = `Click here to Reset Password <a href="http://localhost:5173/#/resetPassword"></a>`;
      const resetLink = {
        from: '"Track My Money" <victoryranjit@gmail.com>', // sender address
        to: user.email, // list of receivers
        subject: "Password Reset Link", // Subject line
        text: "New Password", // plain text body
        html: content, // html body`
      };
      const info = await transporter.sendMail(resetLink);
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
    clearMsg: (state, action) => {
      state.error = action.payload.error;
      state.successMsg = action.payload.successMsg;
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
        state.successMsg = "User Exist";
        state.user = action.payload.user;
        state.user.token = action.payload.token;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.successMsg = null;
      });
  },
});

export const { clearMsg } = forgetPasswordSlice.actions;

export default forgetPasswordSlice.reducer;
