export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface Book {
  id: number;
  isbn: string;
  title: string;
  cover: string;
  author: string;
  published: number;
  pages: number;
}
export interface BookStatus {
  book: Book;
  status: 0 | 1 | 2;
}

export type RegisterValues = Omit<User, "id">;
