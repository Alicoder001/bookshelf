import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  refresh: false,
  loading: false,
  searchLoading: false,
};
export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBook: (state, action) => {
      state.books = action.payload;
    },
    setRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSearchLoading: (state, action) => {
      state.searchLoading = action.payload;
    },
  },
});
export const { setBook, setRefresh, setLoading, setSearchLoading } =
  bookSlice.actions;

export default bookSlice.reducer;
