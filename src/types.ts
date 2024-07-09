export interface User {
  id: number;
  name: string;
  email: string;
  key?: string;
  secret?: string;
}

// types.ts
export interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  isbn: string;
  pages: number;
  published: number;
}

export interface BookStatus {
  book: Book | Partial<Book>;
  status?: number;
}

export type RegisterValues = Omit<User, "id">;
