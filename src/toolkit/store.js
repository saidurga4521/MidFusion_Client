import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authenticationSlice";
export const store = configureStore({
  reducer: { authSlice },
});
