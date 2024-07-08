import axios from "axios";
import { Book, User } from "../types";

const API_BASE_URL = "https://no23d.lavinad.tdech";

export const registerUser = async (user: Omit<User, "id">) => {
  const response = await axios.post(`${API_BASE_URL}/auth/signup`, user);
  return response.data;
};

export const addBook = async (book: Omit<Book, "id">) => {
  const response = await axios.post(`${API_BASE_URL}/books`, book);
  return response.data;
};

export const updateBook = async (id: number, book: Partial<Book>) => {
  const response = await axios.patch(`${API_BASE_URL}/books/${id}`, book);
  return response.data;
};

export const deleteBook = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/books/${id}`);
  return response.data;
};

export const getBooks = async () => {
  const response = await axios.get(`${API_BASE_URL}/books`);
  return response.data;
};
