import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  InputAdornment,
  CircularProgress,
  FormControl,
} from "@mui/material";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import { registerUser } from "../services/api";
import { RegisterValues } from "../types";
import {
  Person,
  Email,
  Lock,
  CheckCircle,
  ErrorOutline,
} from "@mui/icons-material";

const Register: React.FC = () => {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const initialValues: RegisterValues = {
    username: "",
    email: "",
    password: "",
  };

  const textFieldSx = (error: boolean, loading: boolean, success: boolean) => ({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: error
          ? "#D32F2F"
          : success
          ? "#4CAF50"
          : loading
          ? "#6200EE"
          : "#BDBDBD",
      },
      "&:hover fieldset": {
        borderColor: error
          ? "#D32F2F"
          : success
          ? "#4CAF50"
          : loading
          ? "#6200EE"
          : "#757575",
      },
      "&.Mui-focused fieldset": {
        borderColor: error
          ? "#D32F2F"
          : success
          ? "#4CAF50"
          : loading
          ? "#6200EE"
          : "#6200EE",
      },
    },
  });

  const labelSx = (error: boolean, success: boolean) => ({
    color: error ? "#D32F2F" : success ? "#4CAF50" : "inherit",
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ padding: 2 }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          maxWidth: 430,
          width: "100%",
          backgroundColor: "white",
          "@media (min-width: 1200px)": {
            width: 430,
          },
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Register
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            username: Yup.string().required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string().required("Required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitError(null);
            try {
              await registerUser(values);
              alert("Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi");
            } catch (error) {
              setSubmitError(
                "Foydalanuvchini ro'yxatdan o'tkazishda xatolik yuz berdi"
              );
              console.error("Ro'yxatdan o'tkazishda xatolik:", error);
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, isValid }) => (
            <Form style={{ width: "100%" }}>
              <Field name="username">
                {({ field, meta }: FieldProps) => (
                  <FormControl fullWidth margin="normal">
                    <Typography
                      variant="caption"
                      sx={labelSx(!!meta.error, meta.touched && !meta.error)}
                    >
                      Username
                    </Typography>
                    <TextField
                      {...field}
                      placeholder="Enter your username"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person />
                          </InputAdornment>
                        ),
                        endAdornment: isSubmitting ? (
                          <InputAdornment position="end">
                            <CircularProgress size={20} />
                          </InputAdornment>
                        ) : meta.touched && !!meta.error ? (
                          <InputAdornment position="end">
                            <ErrorOutline color="error" />
                          </InputAdornment>
                        ) : meta.touched && !meta.error ? (
                          <InputAdornment position="end">
                            <CheckCircle color="success" />
                          </InputAdornment>
                        ) : null,
                      }}
                      error={meta.touched && !!meta.error}
                      sx={textFieldSx(
                        !!meta.error,
                        isSubmitting,
                        meta.touched && !meta.error
                      )}
                    />
                  </FormControl>
                )}
              </Field>
              <Field name="email">
                {({ field, meta }: FieldProps) => (
                  <FormControl fullWidth margin="normal">
                    <Typography
                      variant="caption"
                      sx={labelSx(!!meta.error, meta.touched && !meta.error)}
                    >
                      Email
                    </Typography>
                    <TextField
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email />
                          </InputAdornment>
                        ),
                        endAdornment: isSubmitting ? (
                          <InputAdornment position="end">
                            <CircularProgress size={20} />
                          </InputAdornment>
                        ) : meta.touched && !!meta.error ? (
                          <InputAdornment position="end">
                            <ErrorOutline color="error" />
                          </InputAdornment>
                        ) : meta.touched && !meta.error ? (
                          <InputAdornment position="end">
                            <CheckCircle color="success" />
                          </InputAdornment>
                        ) : null,
                      }}
                      error={meta.touched && !!meta.error}
                      sx={textFieldSx(
                        !!meta.error,
                        isSubmitting,
                        meta.touched && !meta.error
                      )}
                    />
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, meta }: FieldProps) => (
                  <FormControl fullWidth margin="normal">
                    <Typography
                      variant="caption"
                      sx={labelSx(!!meta.error, meta.touched && !meta.error)}
                    >
                      Password
                    </Typography>
                    <TextField
                      {...field}
                      type="password"
                      placeholder="Enter your password"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock />
                          </InputAdornment>
                        ),
                        endAdornment: isSubmitting ? (
                          <InputAdornment position="end">
                            <CircularProgress size={20} />
                          </InputAdornment>
                        ) : meta.touched && !!meta.error ? (
                          <InputAdornment position="end">
                            <ErrorOutline color="error" />
                          </InputAdornment>
                        ) : meta.touched && !meta.error ? (
                          <InputAdornment position="end">
                            <CheckCircle color="success" />
                          </InputAdornment>
                        ) : null,
                      }}
                      error={meta.touched && !!meta.error}
                      sx={textFieldSx(
                        !!meta.error,
                        isSubmitting,
                        meta.touched && !meta.error
                      )}
                    />
                  </FormControl>
                )}
              </Field>
              {submitError && (
                <Typography variant="body2" color="error" align="center">
                  {submitError}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  mt: 2,
                  backgroundColor: "#6200EE",
                  ":hover": {
                    backgroundColor: "#8133F1",
                  },
                  ":disabled": {
                    backgroundColor: "grey",
                  },
                }}
                disabled={isSubmitting || !isValid}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default Register;
