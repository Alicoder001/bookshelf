import React, { useState } from "react";
import {
  Typography,
  Chip,
  Grid,
  Box,
  IconButton,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { BookStatus } from "../types";
import trash from "../assets/trash.svg";
import edit from "../assets/edit.svg";
import ModalUnstyled from "./Modal";
import { deleteBook, updateBook } from "../services/api";
import MultipleSelect from "./Select";

const BookCard: React.FC<{ bookStatus: BookStatus }> = ({ bookStatus }) => {
  const getStatusLabel = (status?: number) => {
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

  const getChipStyle = (status?: number) => {
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

  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [openSuccess, setOpenSuccess] = useState({
    isOpen: false,
    message: "",
  });
  const [openError, setOpenError] = useState({
    isOpen: false,
    message: "",
  });

  const handleCloseError = () => {
    setOpenError({ isOpen: false, message: "" });
  };
  const handleCloseSuccess = () => {
    setOpenSuccess({ isOpen: false, message: "" });
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteBook(id);
      console.log(response.data);
      setOpenSuccess({ isOpen: true, message: "Book Deleted Successfully!" });
    } catch (error) {
      setOpenError({ isOpen: true, message: "Book didn't delete!" });
    }
  };

  const handleStatus = async (statusId: number) => {
    try {
      const response = await updateBook({
        statusId,
        id: bookStatus.book.id as number,
      });
      setOpenSuccess({ isOpen: true, message: "Book Status Updated!" });
      console.log(response.data);
    } catch (error) {
      setOpenError({ isOpen: true, message: "Book status didn't update!" });
    }
  };

  return (
    <>
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
            onClick={() => {
              setDeleteModal(true);
            }}
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
            onClick={() => {
              setEditModal(true);
            }}
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
          {bookStatus.book.title || "N/A"}
        </Typography>
        <Typography variant="body2">
          Cover:{" "}
          <a
            style={{ textDecoration: "none" }}
            href={bookStatus.book.cover || "#"}
          >
            {(bookStatus.book.cover || "").slice(0, 30) + "..."}
          </a>
        </Typography>
        <Typography variant="body2">
          Pages: {bookStatus.book.pages || "N/A"}
        </Typography>
        <Typography variant="body2">
          Published: {bookStatus.book.published || "N/A"}
        </Typography>
        <Typography variant="body2" marginBottom={"20px"}>
          ISBN: {bookStatus.book.isbn || "N/A"}
        </Typography>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="body2">
            {bookStatus.book.author || "Unknown"} /{" "}
            {bookStatus.book.published || "Unknown"}
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
        <ModalUnstyled setOpen={setDeleteModal} open={deleteModal}>
          <Box
            sx={{
              width: "400px",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              flexDirection={"column"}
              mb={2}
            >
              <Typography variant="h6" marginBottom={"20px"}>
                Are you sure you want to{" "}
                <Box component={"b"} color={"#FF4D4F"}>
                  delete
                </Box>{" "}
                the book "<b>{bookStatus.book.title}</b>
                "?
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap={2}
              >
                <Button
                  onClick={() => {
                    setDeleteModal(false);
                  }}
                  fullWidth
                  variant="outlined"
                  sx={{
                    borderColor: "#6200EE",
                    color: "#6200EE",
                    ":hover": {
                      borderColor: "#8133F1",
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    handleDelete(bookStatus.book.id as number);
                  }}
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "#6200EE",
                    ":hover": {
                      backgroundColor: "#8133F1",
                    },
                  }}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </Box>
        </ModalUnstyled>
        <ModalUnstyled setOpen={setEditModal} open={editModal}>
          <Box
            sx={{
              width: "400px",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              flexDirection={"column"}
              mb={2}
            >
              <Typography variant="h4" marginBottom={"20px"}>
                Select one of the statuses
              </Typography>
              <MultipleSelect handleStatus={handleStatus} />
            </Box>
          </Box>
        </ModalUnstyled>
        <Snackbar
          open={openSuccess.isOpen}
          autoHideDuration={6000}
          onClose={handleCloseSuccess}
        >
          <Alert
            onClose={handleCloseSuccess}
            severity="success"
            sx={{ width: "100%" }}
          >
            {openSuccess.message}
          </Alert>
        </Snackbar>
        <Snackbar
          open={openError.isOpen}
          autoHideDuration={6000}
          onClose={handleCloseError}
        >
          <Alert
            onClose={handleCloseError}
            severity="error"
            sx={{ width: "100%" }}
          >
            {openError.message}
          </Alert>
        </Snackbar>
      </Grid>
    </>
  );
};

export default BookCard;
