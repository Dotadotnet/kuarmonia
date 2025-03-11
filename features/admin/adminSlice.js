

import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setUser } = adminSlice.actions;
export default adminSlice.reducer;
