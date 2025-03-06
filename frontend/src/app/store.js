import { configureStore } from "@reduxjs/toolkit";
import userRegistrationReducer from "../features/auth/userRegistrationSlice";
import authReducer from "../features/auth/authSlice";
import forgetPasswordReducer from "../features/auth/forgetPasswordSlice";
import resetPasswordReducer from "../features/auth/resetPasswordSlice";
import userEditReducer from "../features/auth/userEditSlice";
import getTransactionsReducer from "../features/transactions/getTransactionsSlice";
import addTransactionReducer from "../features/transactions/addTransactionSlice";
import editTransactionReducer from "../features/transactions/EditTransactionSlice";
import deleteTransactionReducer from "../features/transactions/deleteTransactionSlice";
import categoryReducer from "../features/categories/categoriesSlice";
import profilePicReducer from "../features/auth/userProfilePicSlice";
import { loadState, saveState } from "./storage";

const persistedState = loadState();

const store = configureStore({
  reducer: {
    userRegistration: userRegistrationReducer,
    auth: authReducer,
    forgetPassword: forgetPasswordReducer,
    resetPassword: resetPasswordReducer,
    profilePic: profilePicReducer,
    transactions: getTransactionsReducer,
    addTransaction: addTransactionReducer,
    editTransaction: editTransactionReducer,
    deleteTransaction: deleteTransactionReducer,
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
