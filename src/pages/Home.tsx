import React, { useEffect, useState } from "react";
import { getBooks } from "../services/api";
import BookList from "../components/BookList";
import { BookStatus } from "../types";
import { Box, Container } from "@mui/material";
import booksData from "../data";

const Home: React.FC = () => {
  const [books, setBooks] = useState<BookStatus[]>([...booksData]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getBooks();
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

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
