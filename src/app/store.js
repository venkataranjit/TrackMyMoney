import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import addTransactionReducer from "../features/addTransaction/addTransactionSlice";
import recentTransactionsReducer from "../features/transactions/recentTransactionsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    addTransaction: addTransactionReducer,
    recentTransactions: recentTransactionsReducer,
  },
});

export default store;
