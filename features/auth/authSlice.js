import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  admin: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    addAdmin: (state, action) => {
      state.admin = action.payload;
    },
  },
});

export const { addUser, addAdmin } = authSlice.actions;
export default authSlice.reducer;
