import React, { useEffect } from "react";
import { getBooks } from "../services/api";
import BookList from "../components/BookList";
import { Box, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setBook } from "../redux/bookslice";
import { RootState } from "../redux/store";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state: RootState) => state.book);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetchedBooks = await getBooks();
        if (fetchedBooks?.data.length > 0) {
          dispatch(setBook(fetchedBooks?.data));
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [dispatch]);

  return (
    <Box>
      <Container
        sx={{
          maxWidth: "1440px!important",
          width: "100%",
        }}
      >
        <BookList books={books} />
      </Container>
    </Box>
  );
};

export default Home;
