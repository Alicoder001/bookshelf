import React from "react";
import {
  CardContent,
  Typography,
  Chip,
  Grid,
  Box,
  IconButton,
} from "@mui/material";
import { BookStatus } from "../types";
import { Delete, EditNotifications } from "@mui/icons-material";
import trash from "../assets/trash.svg";
import edit from "../assets/edit.svg";
const BookCard: React.FC<{ bookStatus: BookStatus }> = ({
  bookStatus,
}: {
  bookStatus: BookStatus;
}) => {
  const getStatusLabel = (status: number) => {
    switch (status) {
      case 0:
        return "New";
      case 1:
        return "Reading";
      case 2:
        return "Finished";
      default:
        return "";
    }
  };

  const getChipStyle = (status: number) => {
    switch (status) {
      case 0:
        return { backgroundColor: "#FF0000", color: "white" };
      case 1:
        return { backgroundColor: "#FFEC43", color: "white" };
      case 2:
        return { backgroundColor: "#00FF29", color: "white" };
      default:
        return {};
    }
  };

  return (
    <Grid
      sx={{
        padding: "32px",
        borderRadius: "12px",
        backgroundColor: "#FEFEFE",
        border: "1px solid #EBEBEB",
        width: "100%",
        boxShadow: "0px 4px 24px 0px rgba(51, 51, 51, 0.08)",
        position: "relative",
        ":hover .edit-delete": {
          display: "flex !important",
        },
      }}
    >
      <Box
        component={"div"}
        className="edit-delete"
        sx={{
          position: "absolute",
          top: "16px",
          right: "-33px",
          display: "none",
          flexDirection: "column",
          gap: "2px",
          zIndex: "10",
        }}
      >
        <IconButton
          sx={{
            backgroundColor: "#FF4D4F",
            color: "white",
            width: "32px",
            height: "32px",
            borderRadius: "6px 6px 6px 0px",
            opacity: "0.7",
            ":hover": {
              opacity: "1",
              backgroundColor: "#FF4D4F",
            },
          }}
        >
          <img src={trash} alt="trash" />
        </IconButton>
        <IconButton
          sx={{
            backgroundColor: "#6200EE",
            borderRadius: "0px 6px 6px 6px",
            color: "white",
            width: "32px",
            height: "32px",
            opacity: "0.7",
            ":hover": {
              opacity: "1",
              backgroundColor: "#6200EE",
            },
          }}
        >
          <img src={edit} alt="edit" />
        </IconButton>
      </Box>
      <Typography
        variant="h5"
        fontSize={"16px"}
        lineHeight={"normal"}
        color={"#151515"}
        fontWeight={600}
        fontFamily={'"Montserrat","Arial",sans-serif'}
        marginBottom={"6px"}
      >
        {bookStatus.book.title}
      </Typography>
      <Typography variant="body2">
        Cover:{" "}
        <a style={{ textDecoration: "none" }} href={bookStatus.book.cover}>
          {bookStatus.book.cover}
        </a>
      </Typography>
      <Typography variant="body2">Pages: {bookStatus.book.pages}</Typography>
      <Typography variant="body2">
        Published: {bookStatus.book.published}
      </Typography>
      <Typography variant="body2" marginBottom={"20px"}>
        ISBN: {bookStatus.book.isbn}
      </Typography>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography variant="body2">
          {bookStatus.book.author} / {bookStatus.book.published}
        </Typography>
        <Chip
          label={getStatusLabel(bookStatus.status)}
          sx={{
            ...getChipStyle(bookStatus.status),
            fontSize: "16px",
            lineHeight: 1,
            height: "24px !important",
            fontWeight: "700",
            borderRadius: "8.5px",
          }}
        />
      </Box>
    </Grid>
  );
};

export default BookCard;
