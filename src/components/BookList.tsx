import React from "react";
import { Book, BookStatus } from "../types";
import { Box, Button, Card, Grid, List, Typography } from "@mui/material";
import BookCard from "./BookCard";

interface BookListProps {
  books: BookStatus[];
}

const BookList: React.FC<BookListProps> = ({
  books,
}: {
  books: BookStatus[];
}) => {
  return (
    <Box component={"section"}>
      <Box
        component={"header"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"start"}
        marginBottom={"36px"}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "36px",
              fontWeight: 700,
              lineHeight: "normal",
              color: "white",
              marginBottom: "12px",
            }}
          >
            You’ve got{" "}
            <Box component={"span"} color={"#6200EE"}>
              7 book
            </Box>
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 400,
              lineHeight: "normal",
              color: "white",
            }}
          >
            Your books today
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#6200EE",
            padding: "10px 24px",
            textTransform: "none!important",
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "normal",
            ":hover": {
              backgroundColor: "#8133F1",
            },
          }}
        >
          + Create a book
        </Button>
      </Box>
      <List>
        <Grid
          gridTemplateColumns={{
            xs: "repeat(auto-fill, minmax(300px, 1fr))",
            lg: "repeat(auto-fill, minmax(340px, 1fr))",
          }}
          display={"grid"}
          gap={"24px"}
        >
          {books.map((bookStatus, index) => (
            <BookCard key={index} bookStatus={bookStatus as BookStatus} />
          ))}
        </Grid>
      </List>
    </Box>
  );
};

export default BookList;
