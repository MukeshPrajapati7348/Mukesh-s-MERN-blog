import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
