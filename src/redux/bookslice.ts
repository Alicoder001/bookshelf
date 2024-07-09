import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
};
export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBook: (state, action) => {
      state.books = action.payload;
    },
  },
});
export const { setBook } = bookSlice.actions;

export default bookSlice.reducer;
