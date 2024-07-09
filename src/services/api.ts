import axios from "axios";
import { User } from "../types";
import CryptoJS from "crypto-js";

const API_BASE_URL = "https://no23.lavina.tech";

const api = axios.create({ baseURL: API_BASE_URL });

api.interceptors.request.use(
  (config) => {
    const key = localStorage.getItem("key") || "";
    const secret = localStorage.getItem("secret") || "";
    const urlPathname = new URL(config.url || "", API_BASE_URL).pathname;

    if (urlPathname === "/signup") {
      // config.data = JSON.parse(config.data);
      localStorage.setItem("key", config.data.key);
      localStorage.setItem("secret", config.data.secret);
    } else {
      const dataString = config.data ? JSON.stringify(config.data) : "";
      const method = config.method ? config.method.toUpperCase() : "GET";
      const signStr = method + config.url + dataString + secret;
      const sign = CryptoJS.MD5(signStr).toString();
      config.headers["Key"] = key;
      config.headers["Sign"] = sign;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

export const registerUser = async (user: Omit<User, "id">) => {
  const response = await api.post(`/signup`, user);
  return response.data;
};

export const addBook = async (isbn: string) => {
  const response = await api.post(`/books`, { isbn });

  return response.data;
};

export const updateBook = async ({
  statusId,
  id,
}: {
  statusId: number;
  id: number;
}) => {
  const response = await api.patch(`/books/${id}`, { status: statusId });
  return response.data;
};

export const deleteBook = async (id: number) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};

export const getBooks = async () => {
  const response = await api.get(`/books`);

  return response.data;
};
export const getUser = async () => {
  const response = await api.get(`/myself`);
  return response.data;
};
export const searchBook = async (title: string) => {
  const response = await api.get(`/books/${title}`);
  return response.data;
};
