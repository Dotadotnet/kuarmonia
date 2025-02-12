

import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setcategory: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setcategory } = categorySlice.actions;
export default categorySlice.reducer;
