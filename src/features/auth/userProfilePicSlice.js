import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  successMsg: null,
};

export const editProfilePic = createAsyncThunk(
  "user/profilePicEdit",
  async (userDetails, { rejectWithValue }) => {
    try {
      //   const user = await axios.get(
      //     `${import.meta.env.VITE_JSON_SERVER_URL}/users/${userDetails.id}`
      //   );
      //   const updatedUser = { ...user.data, profilePic: userDetails.profilePic };
      const { profilePic, id } = userDetails;
      const response = await axios.patch(
        `${import.meta.env.VITE_JSON_SERVER_URL}/users/${id}`,
        { profilePic }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const userProfilePicSlice = createSlice({
  name: "editUser",
  initialState,
  reducers: {
    clearMsg: (state, action) => {
      state.error = action.payload.error;
      state.successMsg = action.payload.successMsg;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editProfilePic.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMsg = null;
      })
      .addCase(editProfilePic.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.successMsg = "Profile Photo Updated";
        toast.success(state.successMsg);
      })
      .addCase(editProfilePic.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.successMsg = null;
        toast.error(state.error);
      });
  },
});

export const { clearMsg } = userProfilePicSlice.actions;

export default userProfilePicSlice.reducer;
