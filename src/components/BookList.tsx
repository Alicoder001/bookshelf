import React, { useState } from "react";
import { BookStatus } from "../types";
import {
  Box,
  Button,
  Card,
  Grid,
  List,
  Typography,
  Modal,
  FormControl,
  InputAdornment,
  TextField,
  Alert,
  Snackbar,
} from "@mui/material";
import BookCard from "./BookCard";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import cancelIcon from "../assets/trash-input.svg";
import checkIcon from "../assets/allow.svg";
import closeIcon from "../assets/x-circle.svg"; // assuming you have a close icon
import { addBook } from "../services/api";

interface BookListProps {
  books: BookStatus[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  const handleCloseError = () => {
    setOpenError(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const initialValues = { isbn: "" };

  return (
    <>
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
                7 books
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
            onClick={() => {
              setOpen(true);
            }}
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
      <Modal open={open} onClose={handleClose}>
        <Card
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h5">Create a book</Typography>
            <img
              src={closeIcon}
              alt="close"
              onClick={handleClose}
              style={{ cursor: "pointer" }}
            />
          </Box>
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
              isbn: Yup.number().required("Required"),
            })}
            onSubmit={async (values, { setSubmitting, validateForm }) => {
              const errors = await validateForm(values);
              if (Object.keys(errors).length === 0) {
                try {
                  const response = await addBook(values.isbn);
                  console.log(response.data);
                  setOpenSuccess(true);
                } catch (error) {
                  console.error("Error registering user:", error);
                  setOpenError(true);
                }
              }

              setSubmitting(false);
              handleClose();
            }}
          >
            {({ errors, touched }) => (
              <Form style={{ width: "100%" }}>
                <Field name="isbn">
                  {({ field }: FieldProps) => (
                    <FormControl fullWidth margin="dense">
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: "14px",
                          fontFamily: "Mulish, sans-serif",
                          color: touched.isbn
                            ? errors.isbn
                              ? "red"
                              : "green"
                            : "inherit",
                          marginBottom: "2px",
                        }}
                      >
                        ISBN
                      </Typography>
                      <TextField
                        {...field}
                        placeholder="Enter ISBN"
                        fullWidth
                        error={touched.isbn && !!errors.isbn}
                        sx={{
                          margin: "2px 0",
                          "& .MuiOutlinedInput-root": {
                            color: "#151515",
                            fontSize: "16px",
                            lineHeight: 1.2,
                            fontFamily: "Mulish, Arial, sans-serif",
                            letterSpacing: "0.5px",
                            fontWeight: 500,
                            "& fieldset": {
                              borderColor: touched.isbn
                                ? errors.isbn
                                  ? "red"
                                  : "green"
                                : "#EBEBEB",
                              boxShadow:
                                "0px 4px 18px 0px rgba(51, 51, 51, 0.04)",
                            },
                            "&:hover fieldset": {
                              borderColor: touched.isbn
                                ? errors.isbn
                                  ? "red"
                                  : "green"
                                : "#EBEBEB",
                              boxShadow:
                                "0px 4px 18px 0px rgba(51, 51, 51, 0.08)",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: touched.isbn
                                ? errors.isbn
                                  ? "red"
                                  : "green"
                                : "#6200EE",
                            },
                          },
                          "& .MuiInputBase-input::placeholder": {
                            color: "rgba(0, 0, 0, 0.54)",
                          },
                        }}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {touched.isbn &&
                                (errors.isbn ? (
                                  <img src={cancelIcon} alt="cancel" />
                                ) : (
                                  <img src={checkIcon} alt="check" />
                                ))}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </FormControl>
                  )}
                </Field>
                <Box display="flex" justifyContent="space-between" mt={4}>
                  <Button
                    variant="outlined"
                    onClick={handleClose}
                    sx={{
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "normal",
                      color: "#6200EE",
                      borderColor: "#6200EE",
                      padding: "10px 24px",
                      textTransform: "none!important",
                      ":hover": {
                        backgroundColor: "#f3e5f5",
                        borderColor: "#6200EE",
                      },
                    }}
                  >
                    Close
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "#6200EE",
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "normal",
                      padding: "10px 24px",
                      textTransform: "none!important",
                      ":hover": {
                        backgroundColor: "#8133F1",
                      },
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Card>
      </Modal>
      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          sx={{ width: "100%" }}
        >
          Book Created successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          Error creating Book!
        </Alert>
      </Snackbar>
    </>
  );
};

export default BookList;
