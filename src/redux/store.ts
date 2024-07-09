// store.ts faylida

import { configureStore } from "@reduxjs/toolkit";
import bookslice from "./bookslice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    book: bookslice,
    user: userSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
