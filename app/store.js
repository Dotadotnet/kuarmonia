
import authSlice from "@/features/auth/authSlice";
import bookingSlice from "@/features/booking/bookingSlice";
import filterSlice from "@/features/filter/filterSlice";
import rentSlice from "@/features/rent/rentSlice";
import adminSlice from "@/features/admin/adminSlice";
import userSlice from "@/features/user/userSlice";
import { kuarmoniaApi } from "@/services/kuarmonia";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    [kuarmoniaApi.reducerPath]: kuarmoniaApi.reducer,
    admin: adminSlice,
    user: userSlice,
    auth: authSlice,
    rent: rentSlice,
    booking: bookingSlice,
    filter: filterSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(kuarmoniaApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);
