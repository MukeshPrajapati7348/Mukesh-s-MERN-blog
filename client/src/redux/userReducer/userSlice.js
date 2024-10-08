import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      (state.loading = true), (state.error = null);
    },
    signInSuccess: (state, action) => {
      (state.loading = false), (state.error = null);
      state.currentUser = action.payload;
    },
    signInFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    updateUserStart: (state) => {
      (state.loading = true), (state.error = null);
    },
    updateUserSuccess: (state, action) => {
      (state.loading = false), (state.error = null);
      state.currentUser = action.payload;
    },
    updateUserFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    deleteUserStart: (state) => {
      (state.loading = true), (state.error = null);
    },
    deleteUserSuccess: (state) => {
      (state.loading = false), (state.error = null);
      state.currentUser = null;
    },
    deleteUserFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    SignoutUserSuccess: (state) => {
      (state.loading = false), (state.error = null);
      state.currentUser = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  SignoutUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
