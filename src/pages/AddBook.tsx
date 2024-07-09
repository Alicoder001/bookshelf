import React from "react";
import { TextField, Button, Container } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { addBook } from "../services/api";

interface FormValues {
  title: string;
  author: string;
}

const AddBook: React.FC = () => {
  return (
    <Container>
      <h1>Add Book</h1>
      <Formik
        initialValues={{ title: "", author: "" }}
        validationSchema={Yup.object({
          title: Yup.string().required("Required"),
          author: Yup.string().required("Required"),
        })}
        onSubmit={async (values: FormValues, { setSubmitting }) => {
          try {
            // @ts-expect-error
            await addBook(values);
            alert("Book added successfully");
          } catch (error) {
            console.error("Error adding book:", error);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="title" as={TextField} label="Title" fullWidth />
            <Field name="author" as={TextField} label="Author" fullWidth />
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AddBook;
