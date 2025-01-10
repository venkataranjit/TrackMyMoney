import { configureStore } from "@reduxjs/toolkit";
import userRegistrationReducer from "../features/auth/userRegistrationSlice";
import authReducer from "../features/auth/authSlice";
import userEditReducer from "../features/auth/userEditSlice";
import addTransactionReducer from "../features/addTransaction/addTransactionSlice";
import recentTransactionsReducer from "../features/transactions/recentTransactionsSlice";
import categoryReducer from "../features/categories/categoriesSlice";
import { loadState, saveState } from "./storage";

const persistedState = loadState();

const store = configureStore({
  reducer: {
    userRegistration: userRegistrationReducer,
    auth: authReducer,
    addTransaction: addTransactionReducer,
    recentTransactions: recentTransactionsReducer,
    userEdit: userEditReducer,
    categories: categoryReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
  });
});

export default store;
