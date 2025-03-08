import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: [],
  countries: [],
  priceRange: { min: 5, max: 500 },
  dateRange: { startDate: null, endDate: null },
   ratings: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setType: (state, action) => {
      state.type = action.payload;
    },
    setTradeType: (state, action) => {
      state.tradeType = action.payload;
    },

    setSaleType: (state, action) => {
      state.SaleType = action.payload;
    },


    setCountries: (state, action) => {
      state.countries = action.payload;
    },

    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },

    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },

    setRatings: (state, action) => {
      state.ratings = action.payload;
    },

    resetFilter: (state) => {
      state.type = [];
      state.tradeType = [];
      state.countries = [];
      state.priceRange = { min: 5, max: 500 };
      state.dateRange = { startDate: null, endDate: null };
      state.ratings = [];
    }
  }
});

export const {
  setType,
  setTradeType,
  setCountries,
  setPriceRange,
  setDateRange,
   setRatings,
 resetFilter,
} = filterSlice.actions;
export default filterSlice.reducer;
