// store.ts faylida

import { configureStore } from "@reduxjs/toolkit";
import bookslice from "./bookslice";

const store = configureStore({
  reducer: {
    book: bookslice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
