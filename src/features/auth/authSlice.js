import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "Ranjit",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isLogin: (state, action) => {
      state = action.payload;
    },
  },
});

export const { isLogin } = authSlice.actions;

export default authSlice.reducer;
