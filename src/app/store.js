import { configureStore } from "@reduxjs/toolkit";
import userRegistrationReducer from "../features/auth/userRegistrationSlice";
import authReducer from "../features/auth/authSlice";
import addTransactionReducer from "../features/addTransaction/addTransactionSlice";
import recentTransactionsReducer from "../features/transactions/recentTransactionsSlice";

const store = configureStore({
  reducer: {
    userRegistration: userRegistrationReducer,
    auth: authReducer,
    addTransaction: addTransactionReducer,
    recentTransactions: recentTransactionsReducer,
  },
});

export default store;
