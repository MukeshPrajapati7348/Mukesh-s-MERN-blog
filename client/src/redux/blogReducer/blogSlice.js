import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blog: null,
  loading: false,
  error: null,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    blogCreateStart: (state) => {
      (state.loading = true), (state.error = null);
    },
    blogCreateSuccess: (state, action) => {
      (state.loading = false), (state.error = null);
      state.blog = action.payload;
    },
    blogCreateFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
  },
});

export const { blogCreateStart, blogCreateSuccess, blogCreateFailure } =
  blogSlice.actions;

export default blogSlice.reducer;
