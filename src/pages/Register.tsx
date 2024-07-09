import React, { useEffect, useState } from "react";
import {
  Snackbar,
  Alert,
  Typography,
  FormControl,
  InputAdornment,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { registerUser } from "../services/api";
import { RegisterValues } from "../types";
import cancelIcon from "../assets/trash-input.svg";
import checkIcon from "../assets/allow.svg";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const navigate = useNavigate();
  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  const handleCloseError = () => {
    setOpenError(false);
  };

  const initialValues: RegisterValues = {
    name: "",
    email: "",
  };
  useEffect(() => {
    const key = localStorage.getItem("key");
    if (key) {
      navigate("/");
    }
  });
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        component={"div"}
        className="form-container"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
          borderRadius: "8px",
          maxWidth: {
            xs: "350px",
            sm: "430px",
          },
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Register
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
          })}
          onSubmit={async (values, { setSubmitting, validateForm }) => {
            const errors = await validateForm(values);
            if (Object.keys(errors).length === 0) {
              const submissionData = {
                ...values,
                key: uuidv4(),
                secret: "MySecret",
              };
              try {
                await registerUser(submissionData);
                setOpenSuccess(true);
                navigate("/");
              } catch (error) {
                console.error("Error registering user:", error);
                setOpenError(true);
              }
            }
            setSubmitting(false);
          }}
        >
          {({ errors, touched }) => (
            <Form style={{ width: "100%" }}>
              <Field name="name">
                {({ field }: FieldProps) => (
                  <FormControl fullWidth margin="dense">
                    <Typography
                      variant="caption"
                      className="input-label"
                      sx={{
                        fontSize: "14px",
                        fontFamily: "Mulish, sans-serif",
                        color: touched.name
                          ? errors.name
                            ? "red"
                            : "green"
                          : "inherit",
                        marginBottom: "2px",
                      }}
                    >
                      Name
                    </Typography>
                    <TextField
                      {...field}
                      placeholder="Enter your name"
                      fullWidth
                      error={touched.name && !!errors.name}
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
                            borderColor: touched.name
                              ? errors.name
                                ? "red"
                                : "green"
                              : "#EBEBEB",
                            boxShadow:
                              "0px 4px 18px 0px rgba(51, 51, 51, 0.04)",
                          },
                          "&:hover fieldset": {
                            borderColor: touched.name
                              ? errors.name
                                ? "red"
                                : "green"
                              : "#EBEBEB",
                            boxShadow:
                              "0px 4px 18px 0px rgba(51, 51, 51, 0.08)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: touched.name
                              ? errors.name
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
                            {touched.name &&
                              (errors.name ? (
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
              <Field name="email">
                {({ field }: FieldProps) => (
                  <FormControl fullWidth margin="dense">
                    <Typography
                      variant="caption"
                      className="input-label"
                      sx={{
                        fontSize: "14px",
                        fontFamily: "Mulish, sans-serif",
                        color: touched.email
                          ? errors.email
                            ? "red"
                            : "green"
                          : "inherit",
                        marginBottom: "2px",
                      }}
                    >
                      Email
                    </Typography>
                    <TextField
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                      fullWidth
                      error={touched.email && !!errors.email}
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
                            borderColor: touched.email
                              ? errors.email
                                ? "red"
                                : "green"
                              : "#EBEBEB",
                            boxShadow:
                              "0px 4px 18px 0px rgba(51, 51, 51, 0.04)",
                          },
                          "&:hover fieldset": {
                            borderColor: touched.email
                              ? errors.email
                                ? "red"
                                : "green"
                              : "#EBEBEB",
                            boxShadow:
                              "0px 4px 18px 0px rgba(51, 51, 51, 0.08)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: touched.email
                              ? errors.email
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
                            {touched.email &&
                              (errors.email ? (
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

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  marginTop: "36px",
                  backgroundColor: "#6200ee",
                  "&:hover": {
                    backgroundColor: "#8133f1",
                  },
                }}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>

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
            User registered successfully!
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
            Error registering user!
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
};

export default Register;
