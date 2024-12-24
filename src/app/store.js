import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import addTransactionReducer from "../features/addTransaction/addTransactionSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    addTransaction: addTransactionReducer,
  },
});

export default store;
