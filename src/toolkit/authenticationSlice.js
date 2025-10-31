import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  authenticated: false,
  user: null,
  meetings: null,
};
const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setMeetings: (state, action) => {
      state.meetings = action.payload;
    },
  },
});
export default authSlice.reducer;
export const {
  setAuthenticated,
  setUserMail,
  setuserId,
  setName,
  setUser,
  setMeetings,
} = authSlice.actions;
