

import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const typeSlice = createSlice({
  name: "type",
  initialState,
  reducers: {
    settype: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { settype } = typeSlice.actions;
export default typeSlice.reducer;
